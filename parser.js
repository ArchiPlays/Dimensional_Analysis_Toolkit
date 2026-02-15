// Expression parser with dimensional analysis
class ExpressionParser {
    constructor() {
        this.tokens = [];
        this.position = 0;
    }

    // Tokenize the input expression
    tokenize(expression) {
        const tokens = [];
        let i = 0;
        const expr = expression.replace(/\s+/g, '');

        while (i < expr.length) {
            // Numbers
            if (/\d/.test(expr[i]) || (expr[i] === '.' && /\d/.test(expr[i + 1]))) {
                let num = '';
                while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === '.')) {
                    num += expr[i];
                    i++;
                }
                tokens.push({ type: 'NUMBER', value: parseFloat(num) });
                continue;
            }

            // Identifiers (variable names)
            if (/[a-zA-Z]/.test(expr[i])) {
                let name = '';
                while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) {
                    name += expr[i];
                    i++;
                }
                tokens.push({ type: 'IDENTIFIER', value: name });
                continue;
            }

            // Operators and parentheses
            const char = expr[i];
            if (char === '+') tokens.push({ type: 'PLUS' });
            else if (char === '-') tokens.push({ type: 'MINUS' });
            else if (char === '*') tokens.push({ type: 'MULTIPLY' });
            else if (char === '/') tokens.push({ type: 'DIVIDE' });
            else if (char === '^') tokens.push({ type: 'POWER' });
            else if (char === '(') tokens.push({ type: 'LPAREN' });
            else if (char === ')') tokens.push({ type: 'RPAREN' });
            else {
                throw new Error(`Unknown character: ${char}`);
            }
            i++;
        }

        return tokens;
    }

    // Parse expression
    parse(expression) {
        this.tokens = this.tokenize(expression);
        this.position = 0;
        return this.parseAddSub();
    }

    // Current token
    current() {
        return this.tokens[this.position];
    }

    // Advance to next token
    advance() {
        this.position++;
    }

    // Check if current token matches type
    match(type) {
        return this.current() && this.current().type === type;
    }

    // Parse addition and subtraction (lowest precedence)
    parseAddSub() {
        let left = this.parseMulDiv();

        while (this.match('PLUS') || this.match('MINUS')) {
            const op = this.current().type;
            this.advance();
            const right = this.parseMulDiv();

            // Check dimensional compatibility for addition/subtraction
            if (!left.dimension.equals(right.dimension)) {
                throw new Error(
                    `Cannot ${op === 'PLUS' ? 'add' : 'subtract'} quantities with different dimensions: ` +
                    `${left.dimension.toReadableString()} and ${right.dimension.toReadableString()}`
                );
            }

            left = {
                dimension: left.dimension,
                expression: `(${left.expression} ${op === 'PLUS' ? '+' : '-'} ${right.expression})`
            };
        }

        return left;
    }

    // Parse multiplication and division
    parseMulDiv() {
        let left = this.parsePower();

        while (this.match('MULTIPLY') || this.match('DIVIDE')) {
            const op = this.current().type;
            this.advance();
            const right = this.parsePower();

            if (op === 'MULTIPLY') {
                left = {
                    dimension: left.dimension.multiply(right.dimension),
                    expression: `(${left.expression} * ${right.expression})`
                };
            } else {
                left = {
                    dimension: left.dimension.divide(right.dimension),
                    expression: `(${left.expression} / ${right.expression})`
                };
            }
        }

        return left;
    }

    // Parse power operations
    parsePower() {
        let left = this.parseUnary();

        if (this.match('POWER')) {
            this.advance();
            const right = this.parseUnary();

            // Exponent must be dimensionless
            if (!right.dimension.isDimensionless()) {
                throw new Error('Exponent must be dimensionless');
            }

            // For simplicity, we'll assume the exponent is a constant
            // In a real implementation, we'd need to evaluate it
            left = {
                dimension: left.dimension.power(2), // Simplified - would need actual exponent value
                expression: `(${left.expression} ^ ${right.expression})`
            };
        }

        return left;
    }

    // Parse unary operations
    parseUnary() {
        if (this.match('MINUS')) {
            this.advance();
            const operand = this.parseUnary();
            return {
                dimension: operand.dimension,
                expression: `(-${operand.expression})`
            };
        }

        return this.parsePrimary();
    }

    // Parse primary expressions (numbers, identifiers, function calls, parentheses)
    parsePrimary() {
        // Parentheses
        if (this.match('LPAREN')) {
            this.advance();
            const result = this.parseAddSub();
            if (!this.match('RPAREN')) {
                throw new Error('Expected closing parenthesis');
            }
            this.advance();
            return result;
        }

        // Numbers (dimensionless)
        if (this.match('NUMBER')) {
            const value = this.current().value;
            this.advance();
            return {
                dimension: Dimensions.dimensionless(),
                expression: value.toString()
            };
        }

        // Identifiers (variables or functions)
        if (this.match('IDENTIFIER')) {
            const name = this.current().value;
            this.advance();

            // Check if it's a function call
            if (this.match('LPAREN')) {
                return this.parseFunction(name);
            }

            // Look up the variable in the database
            const dimension = getDimensionByName(name);
            if (dimension === null) {
                throw new Error(`Unknown quantity: ${name}`);
            }

            return {
                dimension: dimension,
                expression: name
            };
        }

        throw new Error('Unexpected token');
    }

    // Parse function calls
    parseFunction(name) {
        this.advance(); // skip '('
        const args = [];

        if (!this.match('RPAREN')) {
            args.push(this.parseAddSub());

            while (this.match('COMMA')) {
                this.advance();
                args.push(this.parseAddSub());
            }
        }

        if (!this.match('RPAREN')) {
            throw new Error('Expected closing parenthesis in function call');
        }
        this.advance();

        // Define which functions require dimensionless arguments
        const dimensionlessFunctions = [
            'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
            'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh',
            'exp', 'log', 'ln', 'log10', 'log2'
        ];

        const lowerName = name.toLowerCase();

        // Check if function requires dimensionless arguments
        if (dimensionlessFunctions.includes(lowerName)) {
            for (const arg of args) {
                if (!arg.dimension.isDimensionless()) {
                    throw new Error(
                        `Function ${name} requires dimensionless argument, ` +
                        `but got ${arg.dimension.toReadableString()}`
                    );
                }
            }
            return {
                dimension: Dimensions.dimensionless(),
                expression: `${name}(${args.map(a => a.expression).join(', ')})`
            };
        }

        // sqrt - argument can have any dimension, result has half the dimension
        if (lowerName === 'sqrt') {
            if (args.length !== 1) {
                throw new Error('sqrt requires exactly one argument');
            }
            return {
                dimension: args[0].dimension.power(0.5),
                expression: `sqrt(${args[0].expression})`
            };
        }

        // abs - preserves dimension
        if (lowerName === 'abs') {
            if (args.length !== 1) {
                throw new Error('abs requires exactly one argument');
            }
            return {
                dimension: args[0].dimension,
                expression: `abs(${args[0].expression})`
            };
        }

        throw new Error(`Unknown function: ${name}`);
    }

    // Add comma support for function arguments
    tokenize(expression) {
        const tokens = [];
        let i = 0;
        const expr = expression.replace(/\s+/g, '');

        while (i < expr.length) {
            // Numbers
            if (/\d/.test(expr[i]) || (expr[i] === '.' && /\d/.test(expr[i + 1]))) {
                let num = '';
                while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === '.')) {
                    num += expr[i];
                    i++;
                }
                tokens.push({ type: 'NUMBER', value: parseFloat(num) });
                continue;
            }

            // Identifiers (variable names)
            if (/[a-zA-Z]/.test(expr[i])) {
                let name = '';
                while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) {
                    name += expr[i];
                    i++;
                }
                tokens.push({ type: 'IDENTIFIER', value: name });
                continue;
            }

            // Operators and parentheses
            const char = expr[i];
            if (char === '+') tokens.push({ type: 'PLUS' });
            else if (char === '-') tokens.push({ type: 'MINUS' });
            else if (char === '*') tokens.push({ type: 'MULTIPLY' });
            else if (char === '/') tokens.push({ type: 'DIVIDE' });
            else if (char === '^') tokens.push({ type: 'POWER' });
            else if (char === '(') tokens.push({ type: 'LPAREN' });
            else if (char === ')') tokens.push({ type: 'RPAREN' });
            else if (char === ',') tokens.push({ type: 'COMMA' });
            else {
                throw new Error(`Unknown character: ${char}`);
            }
            i++;
        }

        return tokens;
    }
}

// Main analysis function
function analyzeDimensions(expression) {
    try {
        const parser = new ExpressionParser();
        const result = parser.parse(expression);
        
        return {
            success: true,
            dimension: result.dimension,
            expression: result.expression
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
