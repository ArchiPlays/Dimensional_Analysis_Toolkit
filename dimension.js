// Dimension class to represent physical dimensions
class Dimension {
    constructor(mass = 0, length = 0, time = 0, current = 0, temperature = 0, amount = 0, luminosity = 0) {
        this.M = mass;          // Mass
        this.L = length;        // Length
        this.T = time;          // Time
        this.I = current;       // Electric current
        this.Θ = temperature;   // Temperature
        this.N = amount;        // Amount of substance
        this.J = luminosity;    // Luminous intensity
    }

    // Check if dimension is dimensionless
    isDimensionless() {
        return this.M === 0 && this.L === 0 && this.T === 0 && 
               this.I === 0 && this.Θ === 0 && this.N === 0 && this.J === 0;
    }

    // Check if two dimensions are equal
    equals(other) {
        return this.M === other.M && this.L === other.L && this.T === other.T &&
               this.I === other.I && this.Θ === other.Θ && this.N === other.N && this.J === other.J;
    }

    // Multiply dimensions (add exponents)
    multiply(other) {
        return new Dimension(
            this.M + other.M,
            this.L + other.L,
            this.T + other.T,
            this.I + other.I,
            this.Θ + other.Θ,
            this.N + other.N,
            this.J + other.J
        );
    }

    // Divide dimensions (subtract exponents)
    divide(other) {
        return new Dimension(
            this.M - other.M,
            this.L - other.L,
            this.T - other.T,
            this.I - other.I,
            this.Θ - other.Θ,
            this.N - other.N,
            this.J - other.J
        );
    }

    // Raise dimension to a power
    power(exponent) {
        return new Dimension(
            this.M * exponent,
            this.L * exponent,
            this.T * exponent,
            this.I * exponent,
            this.Θ * exponent,
            this.N * exponent,
            this.J * exponent
        );
    }

    // Clone dimension
    clone() {
        return new Dimension(this.M, this.L, this.T, this.I, this.Θ, this.N, this.J);
    }

    // Convert to string representation
    toString() {
        const parts = [];
        
        if (this.M !== 0) parts.push(`M${this.M !== 1 ? '^' + this.M : ''}`);
        if (this.L !== 0) parts.push(`L${this.L !== 1 ? '^' + this.L : ''}`);
        if (this.T !== 0) parts.push(`T${this.T !== 1 ? '^' + this.T : ''}`);
        if (this.I !== 0) parts.push(`I${this.I !== 1 ? '^' + this.I : ''}`);
        if (this.Θ !== 0) parts.push(`Θ${this.Θ !== 1 ? '^' + this.Θ : ''}`);
        if (this.N !== 0) parts.push(`N${this.N !== 1 ? '^' + this.N : ''}`);
        if (this.J !== 0) parts.push(`J${this.J !== 1 ? '^' + this.J : ''}`);

        return parts.length > 0 ? parts.join(' ') : 'dimensionless';
    }

    // Convert to readable format
    toReadableString() {
        const parts = [];
        const symbols = {
            M: 'mass',
            L: 'length',
            T: 'time',
            I: 'current',
            Θ: 'temperature',
            N: 'amount',
            J: 'luminosity'
        };

        const values = {
            M: this.M,
            L: this.L,
            T: this.T,
            I: this.I,
            Θ: this.Θ,
            N: this.N,
            J: this.J
        };

        for (const [key, value] of Object.entries(values)) {
            if (value !== 0) {
                const name = symbols[key];
                parts.push(value === 1 ? name : `${name}^${value}`);
            }
        }

        return parts.length > 0 ? parts.join(' · ') : 'dimensionless';
    }

    // Get SI representation
    toSI() {
        const parts = [];
        
        if (this.M !== 0) parts.push(`kg${this.M !== 1 ? '^' + this.M : ''}`);
        if (this.L !== 0) parts.push(`m${this.L !== 1 ? '^' + this.L : ''}`);
        if (this.T !== 0) parts.push(`s${this.T !== 1 ? '^' + this.T : ''}`);
        if (this.I !== 0) parts.push(`A${this.I !== 1 ? '^' + this.I : ''}`);
        if (this.Θ !== 0) parts.push(`K${this.Θ !== 1 ? '^' + this.Θ : ''}`);
        if (this.N !== 0) parts.push(`mol${this.N !== 1 ? '^' + this.N : ''}`);
        if (this.J !== 0) parts.push(`cd${this.J !== 1 ? '^' + this.J : ''}`);

        return parts.length > 0 ? parts.join('·') : '1 (dimensionless)';
    }
}

// Helper to create common dimensions
const Dimensions = {
    dimensionless: () => new Dimension(),
    length: () => new Dimension(0, 1, 0, 0, 0, 0, 0),
    mass: () => new Dimension(1, 0, 0, 0, 0, 0, 0),
    time: () => new Dimension(0, 0, 1, 0, 0, 0, 0),
    current: () => new Dimension(0, 0, 0, 1, 0, 0, 0),
    temperature: () => new Dimension(0, 0, 0, 0, 1, 0, 0),
    amount: () => new Dimension(0, 0, 0, 0, 0, 1, 0),
    luminosity: () => new Dimension(0, 0, 0, 0, 0, 0, 1),
    
    // Derived dimensions
    velocity: () => new Dimension(0, 1, -1, 0, 0, 0, 0),
    acceleration: () => new Dimension(0, 1, -2, 0, 0, 0, 0),
    force: () => new Dimension(1, 1, -2, 0, 0, 0, 0),
    energy: () => new Dimension(1, 2, -2, 0, 0, 0, 0),
    power: () => new Dimension(1, 2, -3, 0, 0, 0, 0),
    pressure: () => new Dimension(1, -1, -2, 0, 0, 0, 0),
    charge: () => new Dimension(0, 0, 1, 1, 0, 0, 0),
    voltage: () => new Dimension(1, 2, -3, -1, 0, 0, 0),
    resistance: () => new Dimension(1, 2, -3, -2, 0, 0, 0),
    capacitance: () => new Dimension(-1, -2, 4, 2, 0, 0, 0),
    magneticField: () => new Dimension(1, 0, -2, -1, 0, 0, 0),
    frequency: () => new Dimension(0, 0, -1, 0, 0, 0, 0),
    area: () => new Dimension(0, 2, 0, 0, 0, 0, 0),
    volume: () => new Dimension(0, 3, 0, 0, 0, 0, 0),
    density: () => new Dimension(1, -3, 0, 0, 0, 0, 0),
    momentum: () => new Dimension(1, 1, -1, 0, 0, 0, 0),
    angularMomentum: () => new Dimension(1, 2, -1, 0, 0, 0, 0),
    torque: () => new Dimension(1, 2, -2, 0, 0, 0, 0),
};
