let fs = require("fs"),
    PDFParser = require("j-pdfjson");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", (errData) =>
    console.error(errData.parserError)
);
pdfParser.on("pdfParser_dataReady", (pdfData) => {
    for (single of pdfData.formImage?.Pages[0].Texts) {
        console.log(single.R);
    }
    // fs.writeFile(
    //     `./result/j-${Date.now}.json`,
    //     JSON.stringify(pdfParser.getAllFieldsTypes())
    // );
});

pdfParser.loadPDF("pdf/HSBC-1.pdf");
