const pdfjsLib = require("pdfjs-dist");
// const writeFile = require("../../express/edit-page/write-file.js");
const fs = require("fs");
// Loading file from file system into typed array
// const pdfPath = "bac.pdf";
const pdfPath = "pdf/HSBC-1.pdf";


// Will be using promises to load document, pages and misc data instead of
// callback.

// const loadingTask = pdfjsLib.getDocument(pdfPath);
module.exports = (pdfPath) => {
    let textContent = "";
    const loadingTask = pdfjsLib.getDocument(
        new Uint8Array(fs.readFileSync(pdfPath))
    );
    let AppPages = {};
    return loadingTask.promise.then(async function (doc) {
        // console.log(doc);
        const numPages = doc.numPages;
        for (let i = 1; i <= numPages; i++) {
            AppPages[i] = [];
        }
        // console.log('# Document Loaded');
        // console.log('Number of Pages: ' + numPages);
        // console.log();

        let lastPromise; // will be used to chain promises
        lastPromise = doc.getMetadata().then(function (data) {
            if (data.metadata) {
            }
        });

        const loadPage = async function (pageNum) {
            return doc.getPage(pageNum).then(async function (page) {
                // console.log('# Page ', page);
                const viewport = page.getViewport({ scale: 1.0 });
                // console.log('Size: ' + viewport.width + 'x' + viewport.height);
                console.log(page._pageInfo.view)
                const pa = page
                    .getTextContent({ normalizeWhitespace: true })
                    .then(function (content) {
                        // Content contains lots of information about the text layout and
                        // styles, but we need only strings at the moment
                        const datas = {};
                        const strings = content.items.map(function (item, index, array) {
                            //.transform[5] is the y position of the current line
                            //if a new "y", then its a new line, so add newline character
                            let str = item.str;
                            AppPages[pageNum].push(item);
                            // console.log(item);
                            if (
                                index > 0 &&
                                item.transform[5] !== array[index - 1].transform[5]
                            ) {
                                str = "\n" + str;
                            }
                            // console.log(str);
                            return str;
                        });
                        // console.log('## Text Content');
                        textContent += strings.join("");
                    })
                    .then(function () {
                        // console.log();
                    });
                return pa;
            });
        };

        // Loading of the first page will wait on metadata and subsequent loadings
        // will wait on the previous pages.
        for (let i = 1; i <= numPages; i++) {
            lastPromise = lastPromise.then(loadPage.bind(null, i));
        }
        // return AppPages;
        return lastPromise;


    }).then(() => AppPages)
    // .then(
    //     function () {
    //         console.log("# End of Document");
    //         // console.log(textContent);
    //         console.log(AppPages);

    //         //   writeFile(outputFile, textContent);
    //         // console.log(textContent);
    //     },
    //     function (err) {
    //         console.error("Error: " + err);
    //     }
    // );
};
