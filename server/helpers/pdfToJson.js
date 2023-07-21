const PDFExtract = require("pdf.js-extract").PDFExtract,
    fs = require("fs");
const pdfExtract = new PDFExtract();
// const buffer = fs.readFileSync("CompanyName.pdf");
const options = {
    // firstPage: number, // default:`1` - start extract at page nr
    // lastPage: number, //  stop extract at page nr, no default value
    // password: string, //  for decrypting password-protected PDFs., no default value
    // verbosity: number, // default:`-1` - log level of pdf.js
    normalizeWhitespace: true, // default:`false` - replaces all occurrences of whitespace with standard spaces (0x20).
    // disableCombineTextItems: boolean, // default:`false` - do not attempt to combine  same line {@link TextItem}'s.
}; /* see below */

module.exports = (bufferData) => pdfExtract.extractBuffer(bufferData, options);
// const pdf = new PDFExtract()
// pdf.extractBuffer(buffer, options).then(console.log)
