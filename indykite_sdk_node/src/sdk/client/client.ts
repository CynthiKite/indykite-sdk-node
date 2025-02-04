import {
  Metadata,
  credentials,
  ChannelCredentials,
  ClientOptions,
  InterceptorOptions,
  CallCredentials,
} from '@grpc/grpc-js';
import { InterceptingCall, NextCall } from '@grpc/grpc-js/build/src/client-interceptors';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { readFileSync } from 'fs';

import { SdkErrorCode, SdkError } from '../error';
import { LIB_VERSION } from '../../version';
import { IdentityManagementAPIClient } from '../../grpc/indykite/identity/v1beta2/identity_management_api.grpc-client';
import { ConfigManagementAPIClient } from '../../grpc/indykite/config/v1beta1/config_management_api.grpc-client';
import { IngestAPIClient } from '../../grpc/indykite/ingest/v1beta1/ingest_api.grpc-client';
import { ApplicationCredential } from '../utils/application_credential';
import { ServiceAccountCredential } from '../utils/service_account_credential';

type ClientType = IdentityManagementAPIClient | ConfigManagementAPIClient | IngestAPIClient;
type ClientConstructor = new (
  endpoint: string,
  channelCredential: ChannelCredentials,
  options: ClientOptions,
) => ClientType;

export class SdkClient {
  callCredential: CallCredentials;
  client: ClientType;
  getNewCallCredential: () => Promise<CallCredentials>;

  private constructor(
    c: ClientConstructor,
    endpoint: string,
    channelCredential: ChannelCredentials,
    callCredential: CallCredentials,
    getNewCallCredential: () => Promise<CallCredentials>,
  ) {
    this.client = new c(endpoint, channelCredential, {
      interceptors: [this.getCredentialsInterceptor(), this.getUnauthenticatedStatusInterceptor()],
    });
    this.getNewCallCredential = getNewCallCredential;
    this.callCredential = callCredential;
  }

  private static newChannelCredentials() {
    return credentials.createSsl();
  }

  private static newCallCredentials(token: string) {
    return credentials.createFromMetadataGenerator((params, callback) => {
      const md = new Metadata();
      md.set('authorization', 'Bearer ' + token);
      md.set('iksdk-version', LIB_VERSION);
      callback(null, md);
    });
  }

  private static getApplicationCredential(appCredential?: string | unknown): ApplicationCredential {
    if (appCredential) {
      if (typeof appCredential === 'string') {
        return ApplicationCredential.fromString(appCredential);
      } else {
        return ApplicationCredential.fromObject(appCredential);
      }
    } else if (process.env.INDYKITE_APPLICATION_CREDENTIALS) {
      const token = process.env.INDYKITE_APPLICATION_CREDENTIALS;
      return ApplicationCredential.fromString(token);
    } else if (process.env.INDYKITE_APPLICATION_CREDENTIALS_FILE) {
      const token = readFileSync(process.env.INDYKITE_APPLICATION_CREDENTIALS_FILE);
      return ApplicationCredential.fromBuffer(token);
    } else {
      throw new SdkError(SdkErrorCode.SDK_CODE_1, 'missing application credentials');
    }
  }

  private static getServiceAccountCredential(
    serviceCredential?: string | unknown,
  ): ServiceAccountCredential {
    if (serviceCredential) {
      if (typeof serviceCredential === 'string') {
        return ServiceAccountCredential.fromString(serviceCredential);
      } else {
        return ServiceAccountCredential.fromObject(serviceCredential);
      }
    } else if (process.env.INDYKITE_SERVICE_ACCOUNT_CREDENTIALS) {
      const token = process.env.INDYKITE_SERVICE_ACCOUNT_CREDENTIALS;
      return ServiceAccountCredential.fromString(token);
    } else if (process.env.INDYKITE_SERVICE_ACCOUNT_CREDENTIALS_FILE) {
      const token = readFileSync(process.env.INDYKITE_SERVICE_ACCOUNT_CREDENTIALS_FILE);
      return ServiceAccountCredential.fromBuffer(token);
    } else {
      throw new SdkError(SdkErrorCode.SDK_CODE_1, 'missing service account credentials');
    }
  }

  private getCredentialsInterceptor() {
    return (options: InterceptorOptions, nextCall: NextCall): InterceptingCall => {
      const optionsWithCredentials = {
        ...options,
        credentials: this.callCredential,
      };
      return new InterceptingCall(nextCall(optionsWithCredentials), {});
    };
  }

  private getUnauthenticatedStatusInterceptor() {
    return (options: InterceptorOptions, nextCall: NextCall): InterceptingCall => {
      let originalMessage: unknown;
      let savedMessageNext: (message: unknown) => void;
      return new InterceptingCall(nextCall(options), {
        start: (metadata, listener, next) => {
          next(metadata, {
            onReceiveMessage: (message, next) => {
              if (message === null) {
                savedMessageNext = next;
              } else {
                next(message);
              }
            },
            onReceiveStatus: async (status, next) => {
              if (status.code === Status.UNAUTHENTICATED) {
                await this.refreshCallCredentials();
                const newOptions = {
                  ...options,
                  credentials: this.callCredential,
                };
                const newCall = nextCall(newOptions);
                newCall.start(metadata, {
                  onReceiveMessage: (message) => {
                    if (savedMessageNext) {
                      savedMessageNext(message);
                    }
                  },
                  onReceiveStatus: (status) => {
                    next(status);
                  },
                });
                newCall.sendMessage(originalMessage);
                newCall.halfClose();
              } else {
                if (savedMessageNext) {
                  // if the received message was `null`, but it was not caused by UNAUTHENTICATED status
                  // (it happens usually when response has no content)
                  // in this case we need to process the `null` message
                  savedMessageNext(null);
                }
                next(status);
              }
            },
          });
        },
        sendMessage: (message, next) => {
          originalMessage = message;
          next(message);
        },
      });
    };
  }

  private async refreshCallCredentials() {
    this.callCredential = await this.getNewCallCredential();
  }

  static async createIdentityInstance(
    c: ClientConstructor,
    appCredential?: string | unknown,
  ): Promise<SdkClient> {
    const credential = SdkClient.getApplicationCredential(appCredential);

    const createCallCredential = async () => {
      const builtCredential = await credential.buildToken();
      return SdkClient.newCallCredentials(builtCredential.token);
    };

    return new SdkClient(
      c,
      credential.getEndpoint(),
      this.newChannelCredentials(),
      await createCallCredential(),
      createCallCredential,
    );
  }

  static async createServiceInstance(
    c: ClientConstructor,
    serviceAccountCredential?: string | unknown,
  ): Promise<SdkClient> {
    const credential = SdkClient.getServiceAccountCredential(serviceAccountCredential);

    const createCallCredential = async () => {
      const builtCredential = await credential.buildToken();
      return SdkClient.newCallCredentials(builtCredential.token);
    };

    return new SdkClient(
      c,
      credential.getEndpoint(),
      this.newChannelCredentials(),
      await createCallCredential(),
      createCallCredential,
    );
  }
}
