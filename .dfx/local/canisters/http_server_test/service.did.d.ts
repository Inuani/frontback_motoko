import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AssetDetails {
  'key' : Key,
  'encodings' : Array<AssetEncodingDetails>,
  'content_type' : string,
}
export interface AssetEncodingDetails {
  'modified' : Time,
  'sha256' : [] | [Uint8Array | number[]],
  'length' : bigint,
  'content_encoding' : string,
}
export type BatchId = bigint;
export type BatchOperationKind = { 'CreateAsset' : CreateAssetArguments } |
  { 'UnsetAssetContent' : UnsetAssetContentArguments } |
  { 'DeleteAsset' : DeleteAssetArguments } |
  { 'SetAssetContent' : SetAssetContentArguments } |
  { 'Clear' : ClearArguments };
export interface CallbackStrategy {
  'token' : Token,
  'callback' : [Principal, string],
}
export type ChunkId = bigint;
export type ClearArguments = {};
export interface CommitBatchArguments {
  'batch_id' : BatchId,
  'operations' : Array<BatchOperationKind>,
}
export type Contents = Uint8Array | number[];
export interface CreateAssetArguments { 'key' : Key, 'content_type' : string }
export interface DeleteAssetArguments { 'key' : Key }
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'upgrade' : [] | [boolean],
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type Key = string;
export type Key__1 = string;
export type Path = string;
export interface SetAssetContentArguments {
  'key' : Key,
  'sha256' : [] | [Uint8Array | number[]],
  'chunk_ids' : Array<ChunkId>,
  'content_encoding' : string,
}
export interface StreamingCallbackHttpResponse {
  'token' : [] | [Token],
  'body' : Uint8Array | number[],
}
export interface StreamingCallbackHttpResponse__1 {
  'token' : [] | [StreamingCallbackToken__1],
  'body' : Uint8Array | number[],
}
export interface StreamingCallbackToken {
  'key' : string,
  'sha256' : [] | [Uint8Array | number[]],
  'index' : bigint,
  'content_encoding' : string,
}
export interface StreamingCallbackToken__1 {
  'key' : string,
  'sha256' : [] | [Uint8Array | number[]],
  'index' : bigint,
  'content_encoding' : string,
}
export type StreamingStrategy = { 'Callback' : CallbackStrategy };
export type Time = bigint;
export interface Token { 'arbitrary_data' : string }
export interface UnsetAssetContentArguments {
  'key' : Key,
  'content_encoding' : string,
}
export interface _anon_class_8_1 {
  'authorize' : ActorMethod<[Principal], undefined>,
  'clear' : ActorMethod<[ClearArguments], undefined>,
  'commit_batch' : ActorMethod<[CommitBatchArguments], undefined>,
  'create_asset' : ActorMethod<[CreateAssetArguments], undefined>,
  'create_batch' : ActorMethod<[{}], { 'batch_id' : BatchId }>,
  'create_chunk' : ActorMethod<
    [{ 'content' : Uint8Array | number[], 'batch_id' : BatchId }],
    { 'chunk_id' : ChunkId }
  >,
  'delete_asset' : ActorMethod<[DeleteAssetArguments], undefined>,
  'get' : ActorMethod<
    [{ 'key' : Key, 'accept_encodings' : Array<string> }],
    {
      'content' : Uint8Array | number[],
      'sha256' : [] | [Uint8Array | number[]],
      'content_type' : string,
      'content_encoding' : string,
      'total_length' : bigint,
    }
  >,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'http_request_streaming_callback' : ActorMethod<
    [StreamingCallbackToken],
    StreamingCallbackHttpResponse__1
  >,
  'http_request_update' : ActorMethod<[HttpRequest], HttpResponse>,
  'invalidate_cache' : ActorMethod<[], undefined>,
  'list' : ActorMethod<[{}], Array<AssetDetails>>,
  'retrieve' : ActorMethod<[Path], Contents>,
  'set_asset_content' : ActorMethod<[SetAssetContentArguments], undefined>,
  'store' : ActorMethod<
    [
      {
        'key' : Key__1,
        'content' : Uint8Array | number[],
        'sha256' : [] | [Uint8Array | number[]],
        'content_type' : string,
        'content_encoding' : string,
      },
    ],
    undefined
  >,
  'unset_asset_content' : ActorMethod<[UnsetAssetContentArguments], undefined>,
  'whoAmI' : ActorMethod<[], Principal>,
}
export interface _SERVICE extends _anon_class_8_1 {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
