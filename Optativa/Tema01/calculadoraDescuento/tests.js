import { doCalc } from './calculadora.js';

export function runTests() {
    const itemsList = [{ price: 100 }, { price: 50 }, { price: 25 }];
    const cases = [
        { items: itemsList, discountCode: null, expected: 175 * 1.10 },
        { items: itemsList, discountCode: 'WELCOME', expected: (175 * 0.90) * 1.10 },
        { items: itemsList, discountCode: 'SUMMER', expected: (175 * 0.95) * 1.10},
        { items: [], discountCode: null, expected: 0},//Lista vacia
        { items: [{price: 50}], discountCode: 'WELCOME', expected: 50 * 0.90* 1.10}//Un solo item
    ];

    cases.forEach((testCase, index) => {
        const result = doCalc(testCase.items, testCase.discountCode);
        const passed = Math.abs(result - testCase.expected) < 0.0001;
        console.log(`Test ${index + 1}: ${passed ? "PASA" : "FALLA"}`);
    });
}