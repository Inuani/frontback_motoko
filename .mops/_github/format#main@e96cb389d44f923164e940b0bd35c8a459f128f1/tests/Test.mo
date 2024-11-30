import Debug "mo:base/Debug";

import ActorSpec "./utils/ActorSpec";
import F "../src/lib";

let {
    assertTrue; assertFalse; assertAllTrue; describe; it; skip; pending; run
} = ActorSpec;

let success = run([
    describe("Test Variant Types", [
        it("Nat to Text", do {
            let str = F.format("{}", [#num(23)]);
            assertTrue( str == "23")
        }),
        it("Nat Expression", do {
            let str = F.format("{} * {} = {}", [#num(2), #num(2), #num(4)]);
            assertTrue( str == "2 * 2 = 4")
        }),
        it("Floating Points", do {
            let str = F.format("{}", [#float(2.347)]);
            assertTrue( str == "2.35")
        }),
        it("Objects with the toText()", do {
            let point = object{
                public let x = 23;
                public let y = 34;
                
                public func toText(): Text {
                    F.format("({}, {})", [#num(x), #num(y)])
                };
            };

            let str = F.format("{}", [#obj(point)]);
            assertTrue( str == "(23, 34)")
        }),
        it("debug_show", do {
            Debug.print(debug_show( 1.234));

            let point:Any = object{
                public let x = 23;
                public let y = 34;
                
                public func toText(): Text {
                    F.format("({}, {})", [#num(x), #num(y)])
                };
            };
            // Debug.print(debug_show (point['x']));

            let notPoint:Any = 2;
            assertTrue( point == notPoint)
        })
    ])
]);

if(success == false){
  Debug.trap("Tests failed");
}else{
    Debug.print("\1b[23;45;64m Success!");
}