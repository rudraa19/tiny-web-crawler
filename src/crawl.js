import { JSDOM } from "jsdom";

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