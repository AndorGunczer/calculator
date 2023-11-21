const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./index.html");

const index_js_functions = require("./index");

const evaluate_expression = index_js_functions.evaluate_expression;
const calculate = index_js_functions.calculate;

describe('operate', () => {
    test("works with addition", () => {
        expect(evaluate_expression("3+5")).toEqual(8);
    });
    test("works with substraction", () => {
        expect(evaluate_expression("128-29")).toEqual(99);
    });
    test("works with multiplication", () => {
        expect(evaluate_expression("25*5")).toEqual(125);
    });
    test("works with division", () => {
        expect(evaluate_expression("990/99")).toEqual(10);
    });
    test("works with negative numebrs", () => {
        expect(evaluate_expression("-2+-4")).toEqual(-6);
    });
    test("double - case (--)", () => {
        expect(evaluate_expression("-2--4")).toEqual(2);
    });
    test("division 0 is handled", () => {
        expect(() => evaluate_expression("5/0")).toThrow('Division by zero');
    });
});