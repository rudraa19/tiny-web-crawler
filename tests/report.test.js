import { test, expect } from "@jest/globals"
import { sortPages } from "../src/report.js"

test('sortPages 2 pages', () => {
    const input = {
        'https://rudrax.dev/path': 1,
        'https://rudrax.dev': 3
    };
    const actual = sortPages(input);
    const expected = [
        ['https://rudrax.dev', 3],
        ['https://rudrax.dev/path', 1]
    ];
    expect(actual).toEqual(expected);
})

test('sortPages 4 pages', () => {
    const input = {
        'https://rudrax.dev/path': 1,
        'https://rudrax.dev': 3,
        'https://rudrax.dev/path1': 7,
        'https://rudrax.dev/path2': 2
    };
    const actual = sortPages(input);
    const expected = [
        ['https://rudrax.dev/path1', 7],
        ['https://rudrax.dev', 3],
        ['https://rudrax.dev/path2', 2],
        ['https://rudrax.dev/path', 1]
    ];
    expect(actual).toEqual(expected);
})
