# Dimensional Analysis Toolkit

A modern web-based tool for analyzing physical quantities and their dimensions. Perform dimensional analysis on mathematical expressions involving physical quantities.

> **Note:** This project is a work in progress, built with AI assistance (GitHub Copilot). Contributions and feedback are welcome!

**[Live Demo](https://yourusername.github.io/Dimensional_Analysis_Toolkit/)** (Replace with your GitHub Pages URL)

## Features

- **Comprehensive Physical Quantities Database** - Over 100 predefined physical quantities with their dimensions, symbols, and aliases
- **Common Denotations** - Each quantity displays standard mathematical symbols (e.g., B for magnetic field, F for force, m for mass)
- **Expression Parser** - Supports arithmetic operations (±, ×, ÷, ^) and common mathematical functions
- **Dimensional Validation** - Automatically checks if operations are dimensionally valid
- **Unit Suggestions** - Displays available units for calculated dimensions
- **Modern UI** - Clean, responsive interface with dark theme
- **Advanced Search** - Search by quantity name, symbol, alias, or unit

## Usage

### Basic Operations

Enter expressions using physical quantity names and mathematical operators:

```
force * distance        → Energy (M L² T⁻²)
pressure * volume       → Energy (M L² T⁻²)
mass * velocity^2       → Energy (M L² T⁻²)
force / area            → Pressure (M L⁻¹ T⁻²)
sqrt(energy / mass)     → Velocity (L T⁻¹)
```

### Supported Operations

- **Multiplication**: `*` - Multiplies dimensions
- **Division**: `/` - Divides dimensions
- **Addition/Subtraction**: `+`, `-` - Requires matching dimensions
- **Exponentiation**: `^` - Raises to a power
- **Functions**: `sqrt()`, `abs()` - Dimensional functions
- **Transcendental functions**: `sin()`, `cos()`, `tan()`, `log()`, `exp()`, etc. - Require dimensionless arguments

### Examples

#### Valid Expressions
- `velocity * time` → Length
- `mass * acceleration` → Force
- `energy / time` → Power
- `sin(angle)` → Dimensionless (angle must be dimensionless)

#### Invalid Expressions
- `length + mass` → Error: Cannot add different dimensions
- `log(velocity)` → Error: log requires dimensionless argument
- `force + energy` → Error: Different dimensions

## GitHub Pages Deployment

### Quick Start

1. Fork or clone this repository

2. Push to your GitHub account:
   ```bash
   git clone https://github.com/yourusername/Dimensional_Analysis_Toolkit.git
   cd Dimensional_Analysis_Toolkit
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. Enable GitHub Pages:
   - Go to repository **Settings** > **Pages**
   - Under "Source", select **main** branch
   - Select **/ (root)** folder
   - Click **Save**

4. Access your site at: `https://yourusername.github.io/Dimensional_Analysis_Toolkit/`

### Custom Domain (Optional)

1. Create a `CNAME` file in the root directory with your domain
2. Configure DNS with your domain provider (add CNAME record pointing to `yourusername.github.io`)

## Project Structure

```
Dimensional_Analysis_Toolkit/
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── dimension.js        # Dimension class and operations
├── database.js         # Physical quantities database
├── parser.js           # Expression parser and analyzer
├── app.js              # Main application logic
└── README.md           # This file
```

## Technical Details

### Dimension Representation

Physical dimensions are represented using the seven SI base dimensions:

- **M** - Mass (kg)
- **L** - Length (m)
- **T** - Time (s)
- **I** - Electric Current (A)
- **Θ** - Temperature (K)
- **N** - Amount of Substance (mol)
- **J** - Luminous Intensity (cd)

Example: Force = M¹ L¹ T⁻²

### Expression Parsing

The parser uses recursive descent parsing to handle:
- Operator precedence (^, *, /, +, -)
- Parentheses grouping
- Function calls
- Dimensional validation at each operation

### Database

The database includes 100+ physical quantities covering:
- Mechanical quantities (force, energy, pressure, momentum, etc.)
- Electrical quantities (voltage, current, resistance, magnetic field, etc.)
- Thermodynamic quantities (entropy, heat capacity, thermal conductivity, etc.)
- Optical quantities (luminous flux, illuminance, luminance, etc.)
- Material properties (density, viscosity, specific heat, etc.)
- Wave properties (frequency, angular frequency, wavelength, etc.)

Each quantity includes:
- **Primary name** - The main identifier (e.g., "magneticfield")
- **Symbols** - Common mathematical denotations (e.g., B, F, m, v)
- **Aliases** - Alternative names and terms (e.g., "tesla", "flux density" for magnetic field)
- **Units** - Available measurement units
- **Dimension** - SI base dimension representation

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Local Development

Simply open `index.html` in a web browser. No build process or server required!

For live reload during development:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve
```

Then visit `http://localhost:8000`

## Contributing

This is an open-source project and contributions are welcome! Ways to contribute:
- Add more physical quantities to the database
- Improve the expression parser with additional functions
- Enhance the UI/UX
- Fix bugs or add new features
- Improve documentation

Please feel free to open issues or submit pull requests.

## Development Status

**Work in Progress** - This project is actively being developed with AI assistance. Current features are functional, but there may be edge cases or missing quantities. Feedback and contributions are appreciated!

## License

MIT License - Free to use for any purpose.

## Acknowledgments

- Built with vanilla JavaScript, HTML5, and CSS3
- No frameworks or dependencies required
- Created with AI assistance (GitHub Copilot)
- Inspired by the need for quick dimensional analysis in physics and engineering

---

For questions, issues, or suggestions, please open an issue on GitHub.
