export const conversions = new Map([
    ["Temperatura", new Map([
            ["°C", new Map([
                    ["°F", x => 9 * x / 5 + 32],
                    ["K", x => x + 273.15],
                ])],
            ["°F", new Map([
                    ["°C", x => 5 * (x - 32) / 9],
                    ["K", x => 5 * (x - 32) / 9 + 273.15],
                ])],
            ["K", new Map([
                    ["°C", x => x - 273.15],
                    ["°F", x => 9 * (x - 273.15) / 5 + 32],
                ])],
        ])],
    ["Longitud", new Map([
            ["m", new Map([
                    ["ft", x => 3.28084 * x],
                ])],
            ["ft", new Map([
                    ["m", x => x / 3.28084]
                ])],
        ])],
    ["Masa", new Map([
            ["kg", new Map([
                    ["lb", x => 2.20462 * x],
                ])],
            ["lb", new Map([
                    ["kg", x => x / 2.20462],
                ])],
        ])],
]);
