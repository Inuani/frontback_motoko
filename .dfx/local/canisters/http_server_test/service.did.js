export const idlFactory = ({ IDL }) => {
  const ClearArguments = IDL.Record({});
  const BatchId = IDL.Nat;
  const Key = IDL.Text;
  const CreateAssetArguments = IDL.Record({
    'key' : Key,
    'content_type' : IDL.Text,
  });
  const UnsetAssetContentArguments = IDL.Record({
    'key' : Key,
    'content_encoding' : IDL.Text,
  });
  const DeleteAssetArguments = IDL.Record({ 'key' : Key });
  const ChunkId = IDL.Nat;
  const SetAssetContentArguments = IDL.Record({
    'key' : Key,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'chunk_ids' : IDL.Vec(ChunkId),
    'content_encoding' : IDL.Text,
  });
  const BatchOperationKind = IDL.Variant({
    'CreateAsset' : CreateAssetArguments,
    'UnsetAssetContent' : UnsetAssetContentArguments,
    'DeleteAsset' : DeleteAssetArguments,
    'SetAssetContent' : SetAssetContentArguments,
    'Clear' : ClearArguments,
  });
  const CommitBatchArguments = IDL.Record({
    'batch_id' : BatchId,
    'operations' : IDL.Vec(BatchOperationKind),
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const Token = IDL.Record({ 'arbitrary_data' : IDL.Text });
  const StreamingCallbackHttpResponse = IDL.Record({
    'token' : IDL.Opt(Token),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const CallbackStrategy = IDL.Record({
    'token' : Token,
    'callback' : IDL.Func([Token], [StreamingCallbackHttpResponse], ['query']),
  });
  const StreamingStrategy = IDL.Variant({ 'Callback' : CallbackStrategy });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'upgrade' : IDL.Opt(IDL.Bool),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const StreamingCallbackToken = IDL.Record({
    'key' : IDL.Text,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'index' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const StreamingCallbackToken__1 = IDL.Record({
    'key' : IDL.Text,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'index' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const StreamingCallbackHttpResponse__1 = IDL.Record({
    'token' : IDL.Opt(StreamingCallbackToken__1),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const Time = IDL.Int;
  const AssetEncodingDetails = IDL.Record({
    'modified' : Time,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'length' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const AssetDetails = IDL.Record({
    'key' : Key,
    'encodings' : IDL.Vec(AssetEncodingDetails),
    'content_type' : IDL.Text,
  });
  const Path = IDL.Text;
  const Contents = IDL.Vec(IDL.Nat8);
  const Key__1 = IDL.Text;
  const _anon_class_8_1 = IDL.Service({
    'authorize' : IDL.Func([IDL.Principal], [], []),
    'clear' : IDL.Func([ClearArguments], [], []),
    'commit_batch' : IDL.Func([CommitBatchArguments], [], []),
    'create_asset' : IDL.Func([CreateAssetArguments], [], []),
    'create_batch' : IDL.Func(
        [IDL.Record({})],
        [IDL.Record({ 'batch_id' : BatchId })],
        [],
      ),
    'create_chunk' : IDL.Func(
        [IDL.Record({ 'content' : IDL.Vec(IDL.Nat8), 'batch_id' : BatchId })],
        [IDL.Record({ 'chunk_id' : ChunkId })],
        [],
      ),
    'delete_asset' : IDL.Func([DeleteAssetArguments], [], []),
    'get' : IDL.Func(
        [IDL.Record({ 'key' : Key, 'accept_encodings' : IDL.Vec(IDL.Text) })],
        [
          IDL.Record({
            'content' : IDL.Vec(IDL.Nat8),
            'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
            'content_type' : IDL.Text,
            'content_encoding' : IDL.Text,
            'total_length' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'http_request_streaming_callback' : IDL.Func(
        [StreamingCallbackToken],
        [StreamingCallbackHttpResponse__1],
        ['query'],
      ),
    'http_request_update' : IDL.Func([HttpRequest], [HttpResponse], []),
    'invalidate_cache' : IDL.Func([], [], []),
    'list' : IDL.Func([IDL.Record({})], [IDL.Vec(AssetDetails)], ['query']),
    'retrieve' : IDL.Func([Path], [Contents], ['query']),
    'set_asset_content' : IDL.Func([SetAssetContentArguments], [], []),
    'store' : IDL.Func(
        [
          IDL.Record({
            'key' : Key__1,
            'content' : IDL.Vec(IDL.Nat8),
            'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
            'content_type' : IDL.Text,
            'content_encoding' : IDL.Text,
          }),
        ],
        [],
        [],
      ),
    'unset_asset_content' : IDL.Func([UnsetAssetContentArguments], [], []),
    'whoAmI' : IDL.Func([], [IDL.Principal], ['query']),
  });
  return _anon_class_8_1;
};
export const init = ({ IDL }) => { return []; };
