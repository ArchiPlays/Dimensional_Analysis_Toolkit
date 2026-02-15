// Physical quantities database
const physicalQuantitiesDB = {
    // Base quantities
    'length': { dimension: Dimensions.length(), units: ['m', 'km', 'cm', 'mm', 'μm', 'nm', 'inch', 'ft', 'mile'], aliases: ['l', 'displacement', 'position', 'meter', 'metre'], symbols: ['l', 's', 'x', 'y', 'z', 'd', 'r'] },
    'distance': { dimension: Dimensions.length(), units: ['m', 'km', 'cm', 'mm', 'μm', 'nm', 'inch', 'ft', 'mile'], aliases: ['d', 'separation', 'range'], symbols: ['d', 's', 'r'] },
    'height': { dimension: Dimensions.length(), units: ['m', 'km', 'cm', 'mm', 'ft', 'inch'], aliases: ['h', 'altitude', 'elevation'], symbols: ['h', 'z'] },
    'width': { dimension: Dimensions.length(), units: ['m', 'km', 'cm', 'mm', 'ft', 'inch'], aliases: ['w', 'breadth'], symbols: ['w', 'b'] },
    'radius': { dimension: Dimensions.length(), units: ['m', 'km', 'cm', 'mm', 'μm', 'nm'], aliases: ['r', 'radial distance'], symbols: ['r', 'R'] },
    'diameter': { dimension: Dimensions.length(), units: ['m', 'km', 'cm', 'mm', 'μm', 'nm'], aliases: ['d', 'width', 'bore'], symbols: ['d', 'D'] },
    'wavelength': { dimension: Dimensions.length(), units: ['m', 'nm', 'μm', 'Å'], aliases: ['lambda', 'λ', 'wave length'], symbols: ['λ', 'lambda'] },
    
    'mass': { dimension: Dimensions.mass(), units: ['kg', 'g', 'mg', 'μg', 'ton', 'lb', 'oz'], aliases: ['m', 'inertia', 'kilogram', 'kg'], symbols: ['m', 'M'] },
    'weight': { dimension: Dimensions.force(), units: ['N', 'kN', 'dyn', 'lbf'], aliases: ['w', 'gravity force', 'gravitational force'], symbols: ['W', 'Fg'] },
    
    'time': { dimension: Dimensions.time(), units: ['s', 'ms', 'μs', 'ns', 'min', 'hr', 'day', 'year'], aliases: ['t', 'second', 'sec', 'temporal'], symbols: ['t', 'T'] },
    'duration': { dimension: Dimensions.time(), units: ['s', 'ms', 'μs', 'ns', 'min', 'hr', 'day'], aliases: ['interval', 'elapsed time', 'timespan'], symbols: ['Δt', 'dt'] },
    'period': { dimension: Dimensions.time(), units: ['s', 'ms', 'μs', 'ns'], aliases: ['t', 'cycle time', 'oscillation period'], symbols: ['T', 'τ'] },
    
    'current': { dimension: Dimensions.current(), units: ['A', 'mA', 'μA', 'kA'], aliases: ['i', 'electric current', 'amperage', 'ampere', 'amp'], symbols: ['I', 'i'] },
    'temperature': { dimension: Dimensions.temperature(), units: ['K', '°C', '°F'], aliases: ['t', 'temp', 'kelvin', 'heat'], symbols: ['T', 'θ', 'Θ'] },
    'amount': { dimension: Dimensions.amount(), units: ['mol', 'mmol', 'kmol'], aliases: ['n', 'mole', 'substance amount', 'quantity'], symbols: ['n', 'N'] },
    'luminosity': { dimension: Dimensions.luminosity(), units: ['cd'], aliases: ['candela', 'luminous intensity', 'light intensity'], symbols: ['Iv', 'I'] },
    
    // Geometric quantities
    'area': { dimension: Dimensions.area(), units: ['m²', 'cm²', 'mm²', 'km²', 'hectare', 'acre', 'ft²', 'in²'], aliases: ['a', 'surface area', 'cross section', 'cross-sectional area'], symbols: ['A', 'S'] },
    'volume': { dimension: Dimensions.volume(), units: ['m³', 'L', 'mL', 'cm³', 'mm³', 'gal', 'ft³', 'in³'], aliases: ['v', 'capacity', 'space', 'cubic', 'liter', 'litre'], symbols: ['V', 'vol'] },
    'capacity': { dimension: Dimensions.volume(), units: ['m³', 'L', 'mL', 'cm³', 'gal'], aliases: ['volume', 'container volume'], symbols: ['V', 'C'] },
    
    // Kinematic quantities
    'velocity': { dimension: Dimensions.velocity(), units: ['m/s', 'km/h', 'mph', 'ft/s', 'cm/s'], aliases: ['v', 'speed', 'rate', 'pace', 'linear velocity'], symbols: ['v', 'u', 'V'] },
    'speed': { dimension: Dimensions.velocity(), units: ['m/s', 'km/h', 'mph', 'ft/s', 'knot'], aliases: ['v', 'velocity', 'rate', 'pace'], symbols: ['v', 's', 'c'] },
    'acceleration': { dimension: Dimensions.acceleration(), units: ['m/s²', 'ft/s²', 'g'], aliases: ['a', 'linear acceleration', 'rate of velocity change'], symbols: ['a', 'g'] },
    'angularvelocity': { dimension: new Dimension(0, 0, -1), units: ['rad/s', 'deg/s', 'rpm'], aliases: ['ω', 'omega', 'angular speed', 'rotational velocity', 'rotation rate'], symbols: ['ω', 'Ω'] },
    'angularacceleration': { dimension: new Dimension(0, 0, -2), units: ['rad/s²', 'deg/s²'], aliases: ['α', 'alpha', 'rotational acceleration'], symbols: ['α', 'ε'] },
    
    // Dynamic quantities
    'force': { dimension: Dimensions.force(), units: ['N', 'kN', 'MN', 'dyn', 'lbf', 'kgf'], aliases: ['f', 'newton', 'push', 'pull', 'load'], symbols: ['F', 'f'] },
    'torque': { dimension: Dimensions.torque(), units: ['N·m', 'kN·m', 'dyn·cm', 'lb·ft'], aliases: ['τ', 'tau', 'moment', 'moment of force', 'rotational force', 'turning force'], symbols: ['τ', 'M', 'T'] },
    'moment': { dimension: Dimensions.torque(), units: ['N·m', 'kN·m', 'lb·ft'], aliases: ['m', 'torque', 'moment of force', 'bending moment'], symbols: ['M', 'τ'] },
    'pressure': { dimension: Dimensions.pressure(), units: ['Pa', 'kPa', 'MPa', 'bar', 'atm', 'psi', 'mmHg', 'torr'], aliases: ['p', 'pascal', 'stress', 'force per area'], symbols: ['P', 'p'] },
    'stress': { dimension: Dimensions.pressure(), units: ['Pa', 'MPa', 'GPa', 'psi', 'ksi'], aliases: ['σ', 'sigma', 'pressure', 'mechanical stress', 'normal stress', 'shear stress'], symbols: ['σ', 'τ', 's'] },
    
    'energy': { dimension: Dimensions.energy(), units: ['J', 'kJ', 'MJ', 'eV', 'keV', 'MeV', 'cal', 'kcal', 'Wh', 'kWh', 'BTU'], aliases: ['e', 'joule', 'work', 'heat', 'kinetic energy', 'potential energy'], symbols: ['E', 'U', 'W'] },
    'work': { dimension: Dimensions.energy(), units: ['J', 'kJ', 'MJ', 'eV', 'cal', 'Wh', 'kWh'], aliases: ['w', 'energy', 'mechanical work'], symbols: ['W', 'A'] },
    'heat': { dimension: Dimensions.energy(), units: ['J', 'kJ', 'cal', 'kcal', 'BTU'], aliases: ['q', 'thermal energy', 'calorie', 'heat energy'], symbols: ['Q', 'q'] },
    
    'power': { dimension: Dimensions.power(), units: ['W', 'kW', 'MW', 'GW', 'hp', 'BTU/h'], aliases: ['p', 'watt', 'horsepower', 'energy per time', 'rate of work'], symbols: ['P', 'W'] },
    
    'momentum': { dimension: Dimensions.momentum(), units: ['kg·m/s', 'N·s'], aliases: ['p', 'linear momentum', 'mv', 'impulse'], symbols: ['p', 'P'] },
    'impulse': { dimension: Dimensions.momentum(), units: ['kg·m/s', 'N·s'], aliases: ['j', 'momentum change', 'force impulse'], symbols: ['J', 'I'] },
    'angularmomentum': { dimension: Dimensions.angularMomentum(), units: ['kg·m²/s', 'J·s'], aliases: ['l', 'rotational momentum', 'moment of momentum', 'spin'], symbols: ['L', 'J'] },
    
    // Material properties
    'density': { dimension: Dimensions.density(), units: ['kg/m³', 'g/cm³', 'g/mL', 'lb/ft³'], aliases: ['ρ', 'rho', 'mass density', 'volumetric mass density', 'specific mass'], symbols: ['ρ', 'ρm', 'd'] },
    'specificvolume': { dimension: new Dimension(-1, 3, 0), units: ['m³/kg', 'cm³/g', 'ft³/lb'], aliases: ['v', 'specific vol', 'volume per mass'], symbols: ['v', 'vs'] },
    'viscosity': { dimension: new Dimension(1, -1, -1), units: ['Pa·s', 'cP', 'P'], aliases: ['η', 'eta', 'dynamic viscosity', 'absolute viscosity', 'poise'], symbols: ['η', 'μ'] },
    'kinematicviscosity': { dimension: new Dimension(0, 2, -1), units: ['m²/s', 'St', 'cSt'], aliases: ['ν', 'nu', 'momentum diffusivity', 'stokes'], symbols: ['ν', 'v'] },
    
    // Thermodynamic quantities
    'entropy': { dimension: new Dimension(1, 2, -2, 0, -1), units: ['J/K', 'cal/K'], aliases: ['s', 'disorder', 'thermal entropy'], symbols: ['S'] },
    'specificheat': { dimension: new Dimension(0, 2, -2, 0, -1), units: ['J/(kg·K)', 'cal/(g·K)', 'BTU/(lb·°F)'], aliases: ['c', 'heat capacity per mass', 'specific heat capacity'], symbols: ['c', 'cp', 'cv'] },
    'thermalconductivity': { dimension: new Dimension(1, 1, -3, 0, -1), units: ['W/(m·K)', 'cal/(s·cm·K)', 'BTU/(h·ft·°F)'], aliases: ['k', 'κ', 'kappa', 'thermal conductance', 'heat conductivity'], symbols: ['k', 'λ', 'κ'] },
    'heatcapacity': { dimension: new Dimension(1, 2, -2, 0, -1), units: ['J/K', 'cal/K'], aliases: ['c', 'thermal capacity', 'heat content per temperature'], symbols: ['C', 'Cp', 'Cv'] },
    
    // Electrical quantities
    'charge': { dimension: Dimensions.charge(), units: ['C', 'mC', 'μC', 'e'], aliases: ['q', 'coulomb', 'electric charge', 'electrical charge', 'quantity of electricity'], symbols: ['Q', 'q'] },
    'voltage': { dimension: Dimensions.voltage(), units: ['V', 'kV', 'mV', 'μV'], aliases: ['v', 'volt', 'potential difference', 'electric potential', 'electromotive force', 'emf', 'pd'], symbols: ['V', 'U', 'φ'] },
    'potential': { dimension: Dimensions.voltage(), units: ['V', 'kV', 'mV'], aliases: ['φ', 'phi', 'electric potential', 'voltage'], symbols: ['φ', 'V', 'Φ'] },
    'emf': { dimension: Dimensions.voltage(), units: ['V', 'kV', 'mV'], aliases: ['electromotive force', 'voltage', 'emf', 'e'], symbols: ['ε', 'E', 'V'] },
    'resistance': { dimension: Dimensions.resistance(), units: ['Ω', 'kΩ', 'MΩ', 'mΩ'], aliases: ['r', 'ohm', 'electric resistance', 'electrical resistance'], symbols: ['R'] },
    'conductance': { dimension: new Dimension(-1, -2, 3, 2), units: ['S', 'mS', 'μS'], aliases: ['g', 'siemens', 'electric conductance', 'electrical conductance', 'mho'], symbols: ['G', 'S'] },
    'capacitance': { dimension: Dimensions.capacitance(), units: ['F', 'mF', 'μF', 'nF', 'pF'], aliases: ['c', 'farad', 'electric capacitance', 'electrical capacitance'], symbols: ['C'] },
    'inductance': { dimension: new Dimension(1, 2, -2, -2), units: ['H', 'mH', 'μH', 'nH'], aliases: ['l', 'henry', 'electric inductance', 'magnetic inductance', 'self-inductance'], symbols: ['L'] },
    'magneticfield': { dimension: Dimensions.magneticField(), units: ['T', 'mT', 'μT', 'G'], aliases: ['b', 'tesla', 'magnetic flux density', 'magnetic induction', 'b field', 'gauss'], symbols: ['B'] },
    'magneticflux': { dimension: new Dimension(1, 2, -2, -1), units: ['Wb', 'Mx'], aliases: ['φ', 'phi', 'weber', 'flux', 'magnetic flux'], symbols: ['Φ', 'φB'] },
    'electricfield': { dimension: new Dimension(1, 1, -3, -1), units: ['V/m', 'N/C'], aliases: ['e', 'electric field strength', 'electric field intensity', 'e field'], symbols: ['E'] },
    
    // Wave and oscillation
    'frequency': { dimension: Dimensions.frequency(), units: ['Hz', 'kHz', 'MHz', 'GHz', 'THz', 'rpm'], aliases: ['f', 'ν', 'nu', 'hertz', 'cycles per second', 'temporal frequency'], symbols: ['f', 'ν'] },
    'angularfrequency': { dimension: Dimensions.frequency(), units: ['rad/s', 's⁻¹'], aliases: ['ω', 'omega', 'angular velocity', 'radial frequency'], symbols: ['ω'] },
    
    // Optical quantities
    'luminousflux': { dimension: new Dimension(0, 0, 0, 0, 0, 0, 1), units: ['lm'], aliases: ['φ', 'lumen', 'light flux', 'luminous power'], symbols: ['Φv', 'F'] },
    'illuminance': { dimension: new Dimension(0, -2, 0, 0, 0, 0, 1), units: ['lx', 'lm/m²'], aliases: ['e', 'lux', 'light intensity', 'luminous flux per area'], symbols: ['Ev', 'E'] },
    'luminance': { dimension: new Dimension(0, -2, 0, 0, 0, 0, 1), units: ['cd/m²', 'nit'], aliases: ['l', 'brightness', 'nit', 'luminous intensity per area'], symbols: ['Lv', 'L'] },
    
    // Dimensionless quantities
    'angle': { dimension: Dimensions.dimensionless(), units: ['rad', 'deg', 'grad', '\'', '"'], aliases: ['θ', 'theta', 'radian', 'degree', 'angular measure', 'plane angle'], symbols: ['θ', 'α', 'β', 'γ', 'φ'] },
    'solidangle': { dimension: Dimensions.dimensionless(), units: ['sr'], aliases: ['ω', 'omega', 'steradian', 'solid angular measure', 'cone angle'], symbols: ['Ω', 'ω'] },
    'strain': { dimension: Dimensions.dimensionless(), units: ['1', '%'], aliases: ['ε', 'epsilon', 'deformation', 'relative elongation', 'engineering strain'], symbols: ['ε', 'e'] },
    'refractionindex': { dimension: Dimensions.dimensionless(), units: ['1'], aliases: ['n', 'index of refraction', 'refractive index', 'optical density'], symbols: ['n'] },
    'relativepermittivity': { dimension: Dimensions.dimensionless(), units: ['1'], aliases: ['εr', 'dielectric constant', 'relative permittivity', 'dielectric'], symbols: ['εr', 'κ'] },
    'relativepermeability': { dimension: Dimensions.dimensionless(), units: ['1'], aliases: ['μr', 'relative permeability', 'magnetic permeability'], symbols: ['μr'] },
    
    // Rate quantities
    'flowrate': { dimension: new Dimension(0, 3, -1), units: ['m³/s', 'L/s', 'L/min', 'gal/min', 'ft³/s'], aliases: ['q', 'volume flow rate', 'volumetric flow rate', 'discharge', 'flow'], symbols: ['Q', 'q', 'V̇'] },
    'massflowrate': { dimension: new Dimension(1, 0, -1), units: ['kg/s', 'g/s', 'lb/s'], aliases: ['ṁ', 'mass flow', 'mass discharge', 'mass rate'], symbols: ['ṁ', 'ṁ'] },
    
    // Other quantities
    'surfacetension': { dimension: new Dimension(1, 0, -2), units: ['N/m', 'dyn/cm'], aliases: ['γ', 'gamma', 'surface energy', 'interfacial tension'], symbols: ['γ', 'σ'] },
    'action': { dimension: Dimensions.angularMomentum(), units: ['J·s', 'eV·s'], aliases: ['s', 'planck constant', 'angular momentum', 'energy time'], symbols: ['S', 'ℏ'] },
    'absorbeddose': { dimension: new Dimension(0, 2, -2), units: ['Gy', 'rad'], aliases: ['d', 'gray', 'radiation dose', 'dose', 'energy per mass'], symbols: ['D'] },
    'catalyticactivity': { dimension: new Dimension(0, 0, -1, 0, 0, 1), units: ['kat', 'mol/s'], aliases: ['katal', 'enzyme activity', 'catalysis rate'], symbols: ['z'] },
    'molarity': { dimension: new Dimension(0, -3, 0, 0, 0, 1), units: ['mol/L', 'M', 'mM'], aliases: ['c', 'molar concentration', 'amount concentration', 'concentration'], symbols: ['c', 'M'] },
    'molality': { dimension: new Dimension(-1, 0, 0, 0, 0, 1), units: ['mol/kg'], aliases: ['m', 'molal concentration', 'amount per mass'], symbols: ['b', 'm'] },
};

// Get all quantities for display
function getAllQuantities() {
    return Object.entries(physicalQuantitiesDB).map(([name, data]) => ({
        name: name,
        dimension: data.dimension,
        units: data.units,
        symbols: data.symbols || []
    }));
}

// Search quantities by name
function searchQuantities(query) {
    const lowerQuery = query.toLowerCase();
    return Object.entries(physicalQuantitiesDB)
        .filter(([name, data]) => {
            // Search in the main name
            if (name.toLowerCase().includes(lowerQuery)) {
                return true;
            }
            // Search in aliases
            if (data.aliases && data.aliases.some(alias => alias.toLowerCase().includes(lowerQuery))) {
                return true;
            }
            // Search in symbols
            if (data.symbols && data.symbols.some(symbol => symbol.toLowerCase().includes(lowerQuery))) {
                return true;
            }
            // Search in units
            if (data.units && data.units.some(unit => unit.toLowerCase().includes(lowerQuery))) {
                return true;
            }
            return false;
        })
        .map(([name, data]) => ({
            name: name,
            dimension: data.dimension,
            units: data.units,
            symbols: data.symbols || []
        }));
}

// Get dimension by quantity name
function getDimensionByName(name) {
    const lowerName = name.toLowerCase().replace(/\s+/g, '');
    const entry = physicalQuantitiesDB[lowerName];
    return entry ? entry.dimension.clone() : null;
}

// Get units for a given dimension
function getUnitsForDimension(dimension) {
    const units = new Set();
    
    for (const [name, data] of Object.entries(physicalQuantitiesDB)) {
        if (data.dimension.equals(dimension)) {
            data.units.forEach(unit => units.add(unit));
        }
    }
    
    return Array.from(units);
}

// Find quantity names for a given dimension
function getQuantityNamesForDimension(dimension) {
    const names = [];
    
    for (const [name, data] of Object.entries(physicalQuantitiesDB)) {
        if (data.dimension.equals(dimension)) {
            names.push(name);
        }
    }
    
    return names;
}
