let start = true;

function append_to_display(value) {
    if (start == false)
        document.getElementById('display').value += value;
    else {
        document.getElementById('display').value = value;
        start = false;
    };
};

function clear_display() {
    document.getElementById('display').value = '';
    start = true;
};

function calculate() {
    try {
        const expression = document.getElementById('display').value;
        console.log(expression);
        const result = evaluate_expression(expression);
        document.getElementById('display').value = result;
        document.getElementById('current_value').textContent = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
};

function evaluate_expression(expression) {
    const tokens = expression.match(/([0-9]+|\+|\-|\*|\/)/g);

    detect_negative_numbers(tokens);
    return shunting_yard(tokens);
};

function detect_negative_numbers(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == '-') {
            if (i == 0 && isNaN(tokens[i + 1])) {
                tokens.splice(i, 2, (tokens[i + 1] * -1));
            } else if (isNaN(tokens[i - 1]) && !isNaN(tokens[i + 1])) {
                tokens.splice(i, 2, (tokens[i + 1] * -1));
            }
        }
    }
};

function shunting_yard(tokens) {
    const output_queue = [];
    const operator_stack = [];
    const operators = { '+': 1, '-': 1, '*': 2, '/': 2 };

    tokens.forEach(token => {
        if (!isNaN(token)) {
            output_queue.push(parseFloat(token));
        } else if (token in operators) {
            while (
                operator_stack.length > 0 &&
                operators[token] <= operators[operator_stack[operator_stack.length - 1]]
            ) {
                output_queue.push(operator_stack.pop());
            }
            operator_stack.push(token);
        } else {
            throw new Error('Invalid expression');
        }
    });

    while (operator_stack.length > 0) {
        output_queue.push(operator_stack.pop());
    }

    const result_stack = [];
    output_queue.forEach(token => {
        if (!isNaN(token)) {
            result_stack.push(token);
        } else {
            const b = result_stack.pop();
            const a = result_stack.pop();
            switch (token) {
                case '+':
                    result_stack.push(a + b);
                    break;
                case '-':
                    result_stack.push(a - b);
                    break;
                case '*':
                    result_stack.push(a * b);
                    break;
                case '/':
                    if (b === 0) {
                        throw new Error('Division by zero');
                    }
                    result_stack.push(a / b);
                    break;
                default:
                    throw new Error('Invalid operator');
            }
        }
    });

    if (result_stack.length !== 1) {
        throw new Error('Invalid expression');
    }

    return result_stack[0];
}

// module.exports.evaluate_expression = evaluate_expression;
// module.exports.calculate = calculate;