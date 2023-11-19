function operate(num1, operator, num2) {
    switch(operator) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "*": return num1 * num2;
        case "/": return divide(num1, num2);
    }
}

function divide(num1, num2) {
    if (num2 === 0)
        return "ERROR";

    return num1 / num2;
}

module.exports.operate = operate;
module.exports.divide = divide;