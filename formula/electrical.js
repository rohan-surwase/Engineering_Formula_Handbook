/**
 * ENGINEERING FORMULA HANDBOOK — CATEGORY DATA FILE
 * Category: Electrical Engineering
 *
 * HOW THIS FILE WORKS
 * --------------------
 * This file does NOT touch the DOM and does NOT know anything about the
 * handbook's UI. It only registers a plain array of formula objects onto
 * a shared global namespace, `window.FormulaHandbook.categories`.
 * The handbook (engineering-formula-handbook.html) discovers every
 * category that has registered itself and renders it automatically.
 *
 * TO ADD A NEW CATEGORY FILE
 * ---------------------------
 * 1. Copy this file, rename it (e.g. formulas/electronics.js).
 * 2. Change CATEGORY_ID / CATEGORY_NAME / CATEGORY_ICON below.
 * 3. Fill the `formulas` array using the same object shape.
 * 4. Reference the new file with a <script> tag in the HTML — nothing
 *    else in the HTML needs to change.
 *
 * FORMULA OBJECT SHAPE
 * ---------------------
 * {
 *   id:            unique slug within the category (string)
 *   name:          display name (string)
 *   equation:      the formula, plain text/mono-friendly (string)
 *   variables:     [{ symbol, meaning, unit }]
 *   units:         the unit of the result (string)
 *   description:   1-3 sentence plain-English explanation (string)
 *   applications:  real-world use cases (string[])
 *   notes:         engineer's notes, caveats, assumptions (string)
 *   keywords:      extra search terms not already in name/equation (string[])
 * }
 */
(function registerCategory() {
  const CATEGORY_ID = "electrical";
  const CATEGORY_NAME = "Electrical Engineering";
  const CATEGORY_ICON = "⚡";

  const formulas = [
    {
      id: "ohms-law",
      name: "Ohm's Law",
      equation: "V = I × R",
      variables: [
        { symbol: "V", meaning: "Voltage across the conductor", unit: "V (volts)" },
        { symbol: "I", meaning: "Current through the conductor", unit: "A (amperes)" },
        { symbol: "R", meaning: "Resistance of the conductor", unit: "Ω (ohms)" }
      ],
      units: "V (volts)",
      description:
        "Relates voltage, current, and resistance in a purely resistive circuit element. The current through a conductor is directly proportional to the voltage across it and inversely proportional to its resistance.",
      applications: [
        "Sizing current-limiting resistors for LEDs",
        "Calculating voltage drop across a component",
        "Fault and short-circuit analysis",
        "Basic circuit troubleshooting"
      ],
      notes:
        "Strictly valid for ohmic (linear) elements at constant temperature. Diodes, transistors, and other nonlinear devices only obey a local/differential form of this relationship.",
      keywords: ["voltage", "current", "resistance", "V=IR", "basic circuit law"]
    },
    {
      id: "electrical-power",
      name: "Electrical Power",
      equation: "P = V × I",
      variables: [
        { symbol: "P", meaning: "Power dissipated or delivered", unit: "W (watts)" },
        { symbol: "V", meaning: "Voltage across the element", unit: "V (volts)" },
        { symbol: "I", meaning: "Current through the element", unit: "A (amperes)" }
      ],
      units: "W (watts)",
      description:
        "Gives the rate of electrical energy transfer for any two-terminal element. Combined with Ohm's Law it yields the equivalent forms P = I²R and P = V²/R for purely resistive loads.",
      applications: [
        "Sizing power supplies and battery capacity",
        "Selecting resistor wattage ratings",
        "Estimating heat dissipation in enclosures",
        "Energy billing and load calculations"
      ],
      notes:
        "For AC circuits with reactive loads, this gives instantaneous or apparent power only; real average power requires the power factor: P = V·I·cos(φ).",
      keywords: ["watts", "energy rate", "P=VI", "power dissipation", "wattage"]
    },
    {
      id: "series-resistance",
      name: "Total Resistance — Series Circuit",
      equation: "R_total = R1 + R2 + ... + Rn",
      variables: [
        { symbol: "R_total", meaning: "Equivalent series resistance", unit: "Ω (ohms)" },
        { symbol: "R1…Rn", meaning: "Individual resistor values", unit: "Ω (ohms)" }
      ],
      units: "Ω (ohms)",
      description:
        "In a series circuit, the same current flows through every element, so resistances simply add to give the total opposition to current flow.",
      applications: [
        "Designing resistor ladder networks",
        "Calculating total load resistance in series-wired heating elements",
        "String-wired LED/lamp circuits"
      ],
      notes:
        "Series resistance is always greater than the largest individual resistor in the chain. A single open element breaks the entire circuit.",
      keywords: ["series circuit", "total resistance", "equivalent resistance", "resistor network"]
    },
    {
      id: "parallel-resistance-two",
      name: "Total Resistance — Two Resistors in Parallel",
      equation: "R_total = (R1 × R2) / (R1 + R2)",
      variables: [
        { symbol: "R_total", meaning: "Equivalent parallel resistance", unit: "Ω (ohms)" },
        { symbol: "R1", meaning: "First resistor value", unit: "Ω (ohms)" },
        { symbol: "R2", meaning: "Second resistor value", unit: "Ω (ohms)" }
      ],
      units: "Ω (ohms)",
      description:
        "For exactly two resistors sharing the same voltage, this 'product over sum' shortcut gives the equivalent resistance. For n resistors the general form is 1/R_total = 1/R1 + 1/R2 + ... + 1/Rn.",
      applications: [
        "Combining resistors to hit a non-standard resistance value",
        "Analyzing parallel branches in power distribution",
        "Current-sharing resistor networks"
      ],
      notes:
        "Equivalent parallel resistance is always smaller than the smallest individual resistor. Adding more parallel branches always lowers total resistance.",
      keywords: ["parallel circuit", "equivalent resistance", "product over sum", "resistor combination"]
    },
    {
      id: "capacitive-reactance",
      name: "Capacitive Reactance",
      equation: "Xc = 1 / (2πfC)",
      variables: [
        { symbol: "Xc", meaning: "Capacitive reactance", unit: "Ω (ohms)" },
        { symbol: "f", meaning: "Signal frequency", unit: "Hz (hertz)" },
        { symbol: "C", meaning: "Capacitance", unit: "F (farads)" }
      ],
      units: "Ω (ohms)",
      description:
        "Describes the frequency-dependent opposition a capacitor presents to AC current. Reactance falls as frequency or capacitance increases, meaning capacitors pass high frequencies more readily than low ones.",
      applications: [
        "Designing high-pass and low-pass RC filters",
        "AC coupling and decoupling capacitor selection",
        "Impedance matching networks"
      ],
      notes:
        "Unlike resistance, reactance stores and returns energy rather than dissipating it, and it introduces a 90° phase lag between voltage and current (current leads voltage in a capacitor).",
      keywords: ["capacitor", "reactance", "impedance", "AC circuit", "filter design", "Xc"]
    },
    {
      id: "inductive-reactance",
      name: "Inductive Reactance",
      equation: "XL = 2πfL",
      variables: [
        { symbol: "XL", meaning: "Inductive reactance", unit: "Ω (ohms)" },
        { symbol: "f", meaning: "Signal frequency", unit: "Hz (hertz)" },
        { symbol: "L", meaning: "Inductance", unit: "H (henries)" }
      ],
      units: "Ω (ohms)",
      description:
        "Describes the frequency-dependent opposition an inductor presents to AC current. Reactance rises with frequency, so inductors resist high-frequency current far more than low-frequency current.",
      applications: [
        "Designing chokes and EMI suppression",
        "Tuning RF circuits and antenna matching",
        "Motor winding and transformer analysis"
      ],
      notes:
        "Voltage leads current by 90° in an ideal inductor. Real inductors also carry winding resistance, so total impedance is a combination of R and XL.",
      keywords: ["inductor", "reactance", "impedance", "AC circuit", "choke", "XL"]
    },
    {
      id: "lc-resonant-frequency",
      name: "LC Resonant Frequency",
      equation: "f = 1 / (2π√(LC))",
      variables: [
        { symbol: "f", meaning: "Resonant frequency", unit: "Hz (hertz)" },
        { symbol: "L", meaning: "Inductance", unit: "H (henries)" },
        { symbol: "C", meaning: "Capacitance", unit: "F (farads)" }
      ],
      units: "Hz (hertz)",
      description:
        "The frequency at which an inductor-capacitor circuit's inductive and capacitive reactances cancel out, leaving only resistance to oppose current. At resonance, impedance is minimized in a series LC circuit and maximized in a parallel LC circuit.",
      applications: [
        "Tuning radio receivers and transmitters",
        "Designing bandpass and notch filters",
        "Oscillator circuit design"
      ],
      notes:
        "Also called the Thomson formula. Real components add resistance and parasitic effects that shift resonance slightly and determine the resonance peak's sharpness (Q factor).",
      keywords: ["resonance", "Thomson formula", "LC circuit", "tuning", "oscillator"]
    },
    {
      id: "series-rlc-impedance",
      name: "Series RLC Circuit Impedance",
      equation: "Z = √(R² + (XL − Xc)²)",
      variables: [
        { symbol: "Z", meaning: "Total circuit impedance", unit: "Ω (ohms)" },
        { symbol: "R", meaning: "Resistance", unit: "Ω (ohms)" },
        { symbol: "XL", meaning: "Inductive reactance", unit: "Ω (ohms)" },
        { symbol: "Xc", meaning: "Capacitive reactance", unit: "Ω (ohms)" }
      ],
      units: "Ω (ohms)",
      description:
        "Combines resistance and net reactance for a series RLC circuit into a single impedance magnitude, treating R and (XL − Xc) as perpendicular components of a right triangle.",
      applications: [
        "AC power system impedance analysis",
        "Filter and resonant circuit design",
        "Predicting current magnitude and phase in AC networks"
      ],
      notes:
        "The phase angle between voltage and current is φ = arctan((XL − Xc)/R). When XL = Xc the circuit is at resonance and Z reduces to just R.",
      keywords: ["impedance", "RLC circuit", "AC analysis", "phase angle", "reactance"]
    },
    {
      id: "voltage-divider",
      name: "Voltage Divider Rule",
      equation: "Vout = Vin × (R2 / (R1 + R2))",
      variables: [
        { symbol: "Vout", meaning: "Output voltage across R2", unit: "V (volts)" },
        { symbol: "Vin", meaning: "Input source voltage", unit: "V (volts)" },
        { symbol: "R1", meaning: "Resistor between Vin and the output node", unit: "Ω (ohms)" },
        { symbol: "R2", meaning: "Resistor from the output node to ground", unit: "Ω (ohms)" }
      ],
      units: "V (volts)",
      description:
        "Predicts the fraction of an input voltage that appears across one resistor in a series pair, based on the ratio of that resistor to the total series resistance.",
      applications: [
        "Level-shifting sensor signals for a microcontroller ADC",
        "Setting reference voltages",
        "Potentiometer-based analog controls"
      ],
      notes:
        "Assumes negligible current is drawn from the output node. Loading the output with a low-impedance load will pull Vout below the calculated value.",
      keywords: ["voltage divider", "resistor divider", "level shifting", "reference voltage"]
    },
    {
      id: "capacitor-energy",
      name: "Energy Stored in a Capacitor",
      equation: "E = ½ × C × V²",
      variables: [
        { symbol: "E", meaning: "Energy stored in the electric field", unit: "J (joules)" },
        { symbol: "C", meaning: "Capacitance", unit: "F (farads)" },
        { symbol: "V", meaning: "Voltage across the capacitor", unit: "V (volts)" }
      ],
      units: "J (joules)",
      description:
        "Gives the total energy stored in a capacitor's electric field once it is charged to voltage V. Energy scales with the square of voltage, so doubling voltage quadruples stored energy.",
      applications: [
        "Sizing capacitor banks for pulsed power applications",
        "Supercapacitor energy storage design",
        "Camera flash and defibrillator discharge circuits"
      ],
      notes:
        "This is stored energy, not power — the discharge rate (and therefore peak power) depends on the circuit's resistance and inductance during discharge.",
      keywords: ["capacitor energy", "stored charge", "electric field energy", "supercapacitor"]
    }
  ];

  window.FormulaHandbook = window.FormulaHandbook || { categories: {} };
  window.FormulaHandbook.categories[CATEGORY_ID] = {
    id: CATEGORY_ID,
    name: CATEGORY_NAME,
    icon: CATEGORY_ICON,
    formulas: formulas
  };
})();
