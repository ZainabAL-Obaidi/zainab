function calculate() 
{
    var expression = document.getElementById('expression').value;
    try {
        // Call evaluateExpression function to calculate the result
        var result = evaluateExpression(expression);
        // Display the result
        document.getElementById('result').textContent = result;
    } catch (e) {
        // Display error message if expression is invalid
        document.getElementById('result').textContent = "Ungültiger Ausdruck";
    }
}

    // Function to handle parentheses in the expression
    function evaluateParentheses(expr) {
        // Loop until all parentheses are resolved
        while (expr.includes('(')) {
            // Replace each innermost parentheses with its result
            expr = expr.replace(/\([^()]*\)/g, function(subExpr) {
                // Evaluate the sub-expression without parentheses
                return evaluateBasicExpression(subExpr.slice(1, -1));
            });
        }
        // Evaluate the remaining expression after resolving all parentheses
        return evaluateBasicExpression(expr);
    }

    // Function to handle basic arithmetic operations (multiplication, division, addition, subtraction)
    function evaluateBasicExpression(expr) 
    {
        // Remove white spaces from the expression
        expr = expr.replace(/\s+/g, '');

        // Handle multiplication and division first
        let parts = expr.split(/([+\-])/); // Split at + and -
        for (let i = 0; i < parts.length; i++) {
            // Check if the part contains multiplication or division
            if (parts[i].includes('*') || parts[i].includes('/')) {
                // Split the part at * and / to handle individual operations
                let subParts = parts[i].split(/(\*|\/)/);
                for (let j = 1; j < subParts.length; j += 2) {
                    let left = parseFloat(subParts[j - 1]);
                    let operator = subParts[j];
                    let right = parseFloat(subParts[j + 1]);
                    let result;
                    // Perform multiplication or division operation
                    if (operator === '*') {
                        result = left * right;
                    } else if (operator === '/') {
                        result = left / right;
                    }
                    // Replace the operation with its result
                    subParts.splice(j - 1, 3, result.toString());
                    j -= 2;
                }
                // Replace the part with the result of multiplication/division
                parts[i] = subParts[0];
            }
        }

        // Handle addition and subtraction
        let result = parseFloat(parts[0]); // Initialize result with the first number
        for (let i = 1; i < parts.length; i += 2) {
            let operator = parts[i];
            let nextValue = parseFloat(parts[i + 1]);
            // Perform addition or subtraction operation
            if (operator === '+') {
                result += nextValue;
            } else if (operator === '-') {
                result -= nextValue;
            }
        }

        // Return the final result
        return result;
    }

    // Start by evaluating parentheses in the expression
    return evaluateParentheses(expr);

