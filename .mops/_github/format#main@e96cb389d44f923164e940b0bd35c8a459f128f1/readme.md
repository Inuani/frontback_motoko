# Format.mo
A text formatter for motoko

- primitive data types
```motoko
    F.format("Hello, {}!", [#text("World")])  // -> Hello, World!
    F.format("{} * {} = {}", 
        [#num(2), #num(2), #num(4)])          // -> 2 * 2 = 4
    F.format("array: {}", 
        [#numArray([1, 1, 2])])               // -> array: [1, 1, 2]
```

- formatting objects 
> The object needs to implement the `toText: ()->Text` method
```motoko
    let point = object{
        public let x = 23;
        public let y = 34;
        
        public func toText(): Text {
            F.format("({}, {})", [#num(x), #num(y)])
        };
    };

    F.format("{}", [#obj(point)]); // (23, 34)
```

## Variant Types

`#bool` - Bool

`#num` - Nat or Int

`#numArray` - Nat or Int array

`#natArrayMut` - Mutable Nat array

`#intArrayMut` - Mutable Int array

`#float` - Float

`#floatArray` - Float array

`#char` - Char  

`#charArray` - Char array

`#charArrayMut` - Mutable Char array


`#text` - Text

`#textArray` - Text array

`#textArrayMut` - Mutable Text array

`#obj` - Any object with the toText() method