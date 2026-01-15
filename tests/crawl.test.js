import { test, expect } from "@jest/globals"
import { getURLsFromHTML, normalizeURL } from "../src/crawl.js"

// normalizeURL tests
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

// getURLsFromHTML tests
test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://link.rudrax.dev/path/">
            LINK.rudrax.dev
        </a>
    </body>
</html>    
`;
    const inputBaseURL = "https://link.rudrax.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://link.rudrax.dev/path/"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            LINK.rudrax.dev
        </a>
    </body>
</html>    
`;
    const inputBaseURL = "https://link.rudrax.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://link.rudrax.dev/path/"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://link.rudrax.dev/path1/">
            LINK.rudrax.dev
        </a>
        <a href="/path2/">
            LINK.rudrax.dev
        </a>
    </body>
</html>    
`;
    const inputBaseURL = "https://link.rudrax.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://link.rudrax.dev/path1/", "https://link.rudrax.dev/path2/"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">
            LINK.rudrax.dev
        </a>
    </body>
</html>    
`;
    const inputBaseURL = "https://link.rudrax.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})

