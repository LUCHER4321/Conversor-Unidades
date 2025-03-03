var _a, _b, _c, _d;
import { conversions } from "./conversions.js";
const magnitudes = [...conversions.keys()];
let magnitude = magnitudes.length > 0 ? magnitudes[0] : "";
const inputUnitsMap = () => conversions.get(magnitude);
const inputUnits = () => {
    const map = inputUnitsMap();
    return map ? [...map.keys()] : [];
};
let inputUnit = ((_b = (_a = inputUnits()) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0 ? inputUnits()[0] : "";
const outputUnitsMap = () => { var _a; return (_a = conversions.get(magnitude)) === null || _a === void 0 ? void 0 : _a.get(inputUnit); };
const outputUnits = () => {
    const map = outputUnitsMap();
    return map ? [...map.keys()] : [];
};
let outputUnit = ((_d = (_c = outputUnits()) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0 ? outputUnits()[0] : "";
const magnitudeSelect = document.getElementById("magnitude");
const valueInput = document.getElementById("value");
const inputUnitSelect = document.getElementById("input-unit");
const outputUnitSelect = document.getElementById("output-unit");
const valueOutput = document.getElementById("transformed-value");
const removeOptions = (selector) => {
    while (selector.firstChild) {
        selector.firstChild.remove();
    }
};
const setOptions = (selector, ...options) => {
    removeOptions(selector);
    for (const o of options) {
        const option = document.createElement("option");
        option.value = o;
        option.text = o;
        selector.add(option);
    }
    selector.value = options.length > 0 ? options[0] : "";
};
setOptions(magnitudeSelect, ...magnitudes);
const transformedUnit = (x) => {
    var _a, _b;
    const transformed = (_b = (_a = outputUnitsMap()) === null || _a === void 0 ? void 0 : _a.get(outputUnit)) === null || _b === void 0 ? void 0 : _b(x);
    if (Number.isNaN(transformed)) {
        return undefined;
    }
    return transformed;
};
const refreshOptions = (refreshInput = true, refreshOutput = true) => {
    var _a, _b;
    if (refreshInput) {
        setOptions(inputUnitSelect, ...inputUnits());
        inputUnit = inputUnitSelect.value;
    }
    if (refreshOutput) {
        setOptions(outputUnitSelect, ...outputUnits());
        outputUnit = outputUnitSelect.value;
    }
    if (valueOutput) {
        valueOutput.textContent = (_b = (_a = transformedUnit(parseFloat(valueInput.value))) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
    }
    ;
};
refreshOptions();
magnitudeSelect.addEventListener("change", () => {
    magnitude = magnitudeSelect.value;
    refreshOptions();
});
inputUnitSelect.addEventListener("change", () => {
    inputUnit = inputUnitSelect.value;
    refreshOptions(false);
});
outputUnitSelect.addEventListener("change", () => {
    outputUnit = outputUnitSelect.value;
    refreshOptions(false, false);
});
valueInput.addEventListener("change", () => {
    refreshOptions(false, false);
});
