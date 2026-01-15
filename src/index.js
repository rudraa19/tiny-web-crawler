import { crawlPage } from "./crawl.js";

async function main() {
    if (process.argv.length < 3) {
        console.log("No website provided");
        process.exit(1);
    }
    if (process.argv.length > 3) {
        console.log("Too many arguments");
        process.exit(1);
    }

    const baseURL = process.argv[2];

    console.log(`crawling ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});

    for (const i of Object.entries(pages)) {
        console.log(i);
    }
}

main();