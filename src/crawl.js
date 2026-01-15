import { JSDOM } from "jsdom";

export async function crawlPage(baseUrl, currURL, pages) {
    const baseURLObj = new URL(baseUrl);
    const currURLObj = new URL(currURL);

    if (baseURLObj.hostname !== currURLObj.hostname) {
        return pages;
    }

    const normalizeCurrURL = normalizeURL(currURL);
    if (pages[normalizeCurrURL] > 0) {
        pages[normalizeCurrURL]++;
        return pages;
    }

    pages[normalizeCurrURL] = 1;

    console.log(`crawling: ${currURL}`);

    try {
        const res = await fetch(currURL);

        if (res.status > 399) {
            console.log(`error in fetch with status code: ${res.status} on page: ${currURL}`);
            return pages;
        }

        const contentType = res.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType} on page: ${currURL}`);
            return pages;
        }

        const htmlBody = await res.text();

        const nextURLs = getURLsFromHTML(htmlBody, baseUrl);

        for (const i of nextURLs) {
            pages = await crawlPage(baseUrl, i, pages);
        }

    } catch (err) {
        console.log(`Error fetching url: ${err.message} on page ${currURL}`);
    }

    return pages;
}

export function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const l of linkElements) {
        if (l.href.slice(0, 1) === "/") {
            try {
                const urlObj = new URL(`${baseURL}${l.href}`);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`Error with url: ${err.message}`)
            }
        } else {
            try {
                const urlObj = new URL(l.href);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`Error with url: ${err.message}`)
            }
        }
    }
    return urls;
}

export function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === "/")
        return hostPath.slice(0, -1);
    return hostPath;
}