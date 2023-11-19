const index_js_functions = require("./index");

const operate = index_js_functions.operate;
const divide = index_js_functions.divide;

describe('operate', () => {
    test("works with addition", () => {
        expect(operate(3, '+', 5)).toEqual(8);
    });
    test("works with substraction", () => {
        expect(operate(128, '-', 29)).toEqual(99);
    });
    test("works with multiplication", () => {
        expect(operate(25, "*", 5)).toEqual(125);
    });
    test("works with division", () => {
        expect(operate(990, "/", 99)).toEqual(10);
    });
    test("division 0 is handled", () => {
        expect(operate(5, "/", 0)).toBe("ERROR");
    });
});