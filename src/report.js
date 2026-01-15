export function printReport(pages) {
    console.log("\nREPORT\n");

    const sortedPages = sortPages(pages);

    for (const i of sortedPages) {
        console.log(`Found ${i[1]} links to page ${i[0]}`);
    }
}

export function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        return b[1] - a[1];
    });
    return pagesArr
}