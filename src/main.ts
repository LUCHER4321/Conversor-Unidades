import { conversions } from "./conversions.js";

const magnitudes = [...conversions.keys()];
let magnitude = magnitudes.length > 0 ? magnitudes[0] : "";

const inputUnitsMap = () => conversions.get(magnitude);

const inputUnits = () => {
    const map = inputUnitsMap();
    return map ? [...map.keys()] : [];
};

let inputUnit = (inputUnits()?.length ?? 0) > 0 ? inputUnits()[0] : "";

const outputUnitsMap = () => conversions.get(magnitude)?.get(inputUnit);

const outputUnits = () => {
    const map = outputUnitsMap();
    return map ? [...map.keys()] : [];
};

let outputUnit = (outputUnits()?.length ?? 0) > 0 ? outputUnits()[0] : "";

const magnitudeSelect = document.getElementById("magnitude") as HTMLSelectElement;
const valueInput = document.getElementById("value") as HTMLInputElement;
const inputUnitSelect = document.getElementById("input-unit") as HTMLSelectElement;
const outputUnitSelect = document.getElementById("output-unit") as HTMLSelectElement;
const valueOutput = document.getElementById("transformed-value") as HTMLLabelElement;

const removeOptions = (selector: HTMLSelectElement) => {
    while(selector.firstChild){
        selector.firstChild.remove();
    }
}

const setOptions = (selector: HTMLSelectElement, ...options: string[]) => {
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

const transformedUnit = (x: number) => {
    const transformed = outputUnitsMap()?.get(outputUnit)?.(x);
    if (Number.isNaN(transformed)) {
        return undefined;
    }
    return transformed;
}

const refreshOptions = (refreshInput: boolean = true, refreshOutput: boolean = true) => {
    if(refreshInput) {
        setOptions(inputUnitSelect, ...inputUnits());
        inputUnit = inputUnitSelect.value;
    }
    if(refreshOutput) {
        setOptions(outputUnitSelect, ...outputUnits());
        outputUnit = outputUnitSelect.value;
    }
    if(valueOutput) {
        valueOutput.textContent = transformedUnit(parseFloat(valueInput.value))?.toString() ?? ""
    };
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
})

valueInput.addEventListener("change", () => {
    refreshOptions(false, false);
})