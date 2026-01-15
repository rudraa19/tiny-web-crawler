import { test, expect } from "@jest/globals"
import { normalizeURL } from "../src/crawl.js"

test('normalizeURL strip', () => {
    const input = 'https://link.rudrax.dev/path';
    const actual = normalizeURL(input);
    const expected = 'link.rudrax.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL strip traling slash', () => {
    const input = 'https://link.rudrax.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'link.rudrax.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL capitalize', () => {
    const input = 'https://LINK.rudrax.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'link.rudrax.dev/path';
    expect(actual).toEqual(expected);
})