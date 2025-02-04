// @generated by protobuf-ts 2.4.0 with parameter long_type_string,client_grpc1,generate_dependencies,// @generated from protobuf file "indykite/knowledge_graph/v1beta1/schema.proto" (package "indykite.knowledge_graph.v1beta1", syntax proto3),// tslint:disable
//
// Copyright (c) 2022 IndyKite AS.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message indykite.knowledge_graph.v1beta1.Schema
 */
export interface Schema {
    /**
     * @generated from protobuf field: repeated indykite.knowledge_graph.v1beta1.Schema.Entity entities = 2;
     */
    entities: Schema_Entity[];
    /**
     * @generated from protobuf field: repeated indykite.knowledge_graph.v1beta1.Schema.Relationship relationships = 3;
     */
    relationships: Schema_Relationship[];
}
/**
 * @generated from protobuf message indykite.knowledge_graph.v1beta1.Schema.Entity
 */
export interface Schema_Entity {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: repeated string labels = 2;
     */
    labels: string[]; // todo: 649 will implement properties after aligning with policies and ingest mappings
    //    repeated string properties = 3 [(validate.rules).repeated = {
    //      min_items: 0,
    //      max_items: 32,
    //      items: {string: {min_len: 1, max_len: 256}}
    //    }];
}
/**
 * @generated from protobuf message indykite.knowledge_graph.v1beta1.Schema.Relationship
 */
export interface Schema_Relationship {
    /**
     * @generated from protobuf field: string source = 1;
     */
    source: string;
    /**
     * @generated from protobuf field: string target = 2;
     */
    target: string;
    /**
     * @generated from protobuf field: string type = 3;
     */
    type: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class Schema$Type extends MessageType<Schema> {
    constructor() {
        super("indykite.knowledge_graph.v1beta1.Schema", [
            { no: 2, name: "entities", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Schema_Entity, options: { "validate.rules": { repeated: { minItems: "1", maxItems: "50" } } } },
            { no: 3, name: "relationships", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Schema_Relationship, options: { "validate.rules": { repeated: { minItems: "0", maxItems: "50" } } } }
        ]);
    }
    create(value?: PartialMessage<Schema>): Schema {
        const message = { entities: [], relationships: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Schema>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Schema): Schema {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated indykite.knowledge_graph.v1beta1.Schema.Entity entities */ 2:
                    message.entities.push(Schema_Entity.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated indykite.knowledge_graph.v1beta1.Schema.Relationship relationships */ 3:
                    message.relationships.push(Schema_Relationship.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Schema, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated indykite.knowledge_graph.v1beta1.Schema.Entity entities = 2; */
        for (let i = 0; i < message.entities.length; i++)
            Schema_Entity.internalBinaryWrite(message.entities[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* repeated indykite.knowledge_graph.v1beta1.Schema.Relationship relationships = 3; */
        for (let i = 0; i < message.relationships.length; i++)
            Schema_Relationship.internalBinaryWrite(message.relationships[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message indykite.knowledge_graph.v1beta1.Schema
 */
export const Schema = new Schema$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Schema_Entity$Type extends MessageType<Schema_Entity> {
    constructor() {
        super("indykite.knowledge_graph.v1beta1.Schema.Entity", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "validate.rules": { string: { minLen: "2", maxLen: "50" } } } },
            { no: 2, name: "labels", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/, options: { "validate.rules": { repeated: { minItems: "1", maxItems: "32", items: { string: { minLen: "2", maxLen: "50", pattern: "^(?:[A-Z][a-z]+)+$" } } } } } }
        ]);
    }
    create(value?: PartialMessage<Schema_Entity>): Schema_Entity {
        const message = { id: "", labels: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Schema_Entity>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Schema_Entity): Schema_Entity {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string id */ 1:
                    message.id = reader.string();
                    break;
                case /* repeated string labels */ 2:
                    message.labels.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Schema_Entity, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string id = 1; */
        if (message.id !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.id);
        /* repeated string labels = 2; */
        for (let i = 0; i < message.labels.length; i++)
            writer.tag(2, WireType.LengthDelimited).string(message.labels[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message indykite.knowledge_graph.v1beta1.Schema.Entity
 */
export const Schema_Entity = new Schema_Entity$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Schema_Relationship$Type extends MessageType<Schema_Relationship> {
    constructor() {
        super("indykite.knowledge_graph.v1beta1.Schema.Relationship", [
            { no: 1, name: "source", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "validate.rules": { string: { minLen: "2", maxLen: "50" } } } },
            { no: 2, name: "target", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "validate.rules": { string: { minLen: "2", maxLen: "50" } } } },
            { no: 3, name: "type", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "validate.rules": { string: { minLen: "2", maxLen: "50", pattern: "^[A-Z]+(?:_[A-Z]+)*$" } } } }
        ]);
    }
    create(value?: PartialMessage<Schema_Relationship>): Schema_Relationship {
        const message = { source: "", target: "", type: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Schema_Relationship>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Schema_Relationship): Schema_Relationship {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string source */ 1:
                    message.source = reader.string();
                    break;
                case /* string target */ 2:
                    message.target = reader.string();
                    break;
                case /* string type */ 3:
                    message.type = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Schema_Relationship, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string source = 1; */
        if (message.source !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.source);
        /* string target = 2; */
        if (message.target !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.target);
        /* string type = 3; */
        if (message.type !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.type);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message indykite.knowledge_graph.v1beta1.Schema.Relationship
 */
export const Schema_Relationship = new Schema_Relationship$Type();
