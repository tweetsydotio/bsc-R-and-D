const pdfjsLib = require("pdfjs-dist");
// const writeFile = require("../../express/edit-page/write-file.js");

// Loading file from file system into typed array
// const pdfPath = "bac.pdf";
const pdfPath = "pdf/HSBC-1.pdf";

let textContent = "";

// Will be using promises to load document, pages and misc data instead of
// callback.
const loadingTask = pdfjsLib.getDocument(pdfPath);


loadingTask.promise
    .then(async function (doc) {
        const AppPages = {};
        // console.log(doc);
        const numPages = doc.numPages;
        for (let i = 0; i < numPages; i++) {
            AppPages[i + 1] = []
        }
        // console.log('# Document Loaded');
        // console.log('Number of Pages: ' + numPages);
        // console.log();

        let lastPromise; // will be used to chain promises
        lastPromise = doc.getMetadata().then(function (data) {
            // console.log('# Metadata Is Loaded');
            // console.log('## Info===', data?.metadata);
            // console.log(JSON.stringify(data.info, null, 2));
            // console.log();
            if (data.metadata) {
                // console.log('## Metadata');
                // console.log(JSON.stringify(data.metadata.getAll(), null, 2));
                // console.log();
            }
        });

        const loadPage = async function (pageNum) {
            return doc.getPage(pageNum).then(async function (page) {
                // console.log('# Page ', page);
                const viewport = page.getViewport({ scale: 1.0 });
                // console.log('Size: ' + viewport.width + 'x' + viewport.height);
                // 
                const pa = page
                    .getTextContent({ normalizeWhitespace: true })
                    .then(function (content) {
                        // Content contains lots of information about the text layout and
                        // styles, but we need only strings at the moment
                        const datas = {}
                        const strings = content.items.map(function (item, index, array) {
                            //.transform[5] is the y position of the current line
                            //if a new "y", then its a new line, so add newline character
                            let str = item.str;
                            console.log(item.str, item.transform);
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
        return lastPromise;
    })
    .then(
        function () {
            console.log("# End of Document");
            // console.log(textContent);
            //   writeFile(outputFile, textContent);
            // console.log(textContent);
        },
        function (err) {
            console.error("Error: " + err);
        }
    );
