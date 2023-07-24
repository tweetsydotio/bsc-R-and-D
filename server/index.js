const CHATGPT = require("./helpers/CHAT-GPT");
const PDFDIST = require("./helpers/PDF-DIST");
const forPdfDist = require("./helpers/for-pdf-dist");
const jsonToCSV = require("./helpers/jsonToCSV");
const jsonToText = require("./helpers/jsonToText");
const jsonXYcoordinate = require("./helpers/jsonX-Ycoordinate");
const pdfToJson = require("./helpers/pdfToJson");

const express = require("express"),
    fs = require("fs"),
    PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract(),
    cors = require("cors"),
    app = express();
const port = 4000;
const middlewares = [
    express.json({ limit: "5mb" }),
    express.urlencoded({ extended: true }),
    cors(),
    require("express-fileupload")(),
];
app.use(middlewares);
// pdfToJson(fs.readFileSync("pdf64/1.txt"))
//     .then((d) => {

//         const { content } = d.pages[0]
//         const xy = jsonXYcoordinate(content)
//         console.log(jsonToCSV(xy, 'str'));
//     })
//     .catch(console.error);
app.post("/", async (req, res) => {
    try {
        const { file } = req.body;
        // console.log(req.files.file?.data);
        // fs.writeFileSync("pdf64/1.txt", req.files.file?.data);
        const jsonData = await pdfToJson(req.files.file.data),
            pages = [];

        for await (const page of jsonData.pages) {
            const sixAndSavenContent = page.content.sort((a, b) => a.y - b.y);
            const content = jsonXYcoordinate(sixAndSavenContent, page.pageInfo.width, page.pageInfo.height);
            const text = jsonToCSV(content, "str");
            // console.log(JSON.stringify(content));
            // fs.writeFileSync(`csv/${Date.now()}.csv`, text)

            // const result = await CHATGPT(
            //     `get all bank statement details form bellow's data but without bank details & return response in json: \n\n\r ${text}`
            // );
            // console.log(result);
            // console.log(JSON.stringify(text));
            const newPage = {
                ...page,
                content,
            };
            // console.log();
            pages.push(newPage);
        }
        jsonData.pages = pages;
        console.log("=");
        res.json({ fjdkjf: "fdsjfkdjs", jsonData });
    } catch (e) {
        console.log(e.name);
        console.log(e.message);
        res.status(400).json({ message: e.name || e.message });
    }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Express app listening on port ${port}!`);
});


// PDFDIST('CompanyName.pdf')
// [ 0, 0, 595, 842 ]
PDFDIST('bstatement.pdf').then(data => {
    console.log(data[1]);
    // console.log(forPdfDist(data[1]))
}).catch(console.error)
const text = "HSBC\r\nUK\r\nContact tel 03457 60 60 60\r\nsee reverse for call times\r\nText phone 03457 125 563\r\nused by deaf or speech impaired customers\r\nwww.hsbc.co.uk\r\nYour Statement\r\nThe Secretary ROCK AND ROSES\r\nSUPPLEMENTS LIMITED\r\n35 Russell Hill\r\nCR8 2JB\r\nAccount Summary\r\nOpening Balance\r\n82,308.54\r\nPayments_In\r\n35.442.29\r\nHhll\r\nPayments Out\r\n74,093.73\r\nClosing_Balance\r\n43.657.10\r\nInternational Bank Account Number\r\nGB3OHBUK40184174062426\r\n3 February to 2 March 2023\r\nBranch Identifier Code\r\nHBUKGB4IO3W\r\nAccount Name\r\nSortcode\r\nAccount Number Sheet Num ber\r\nROCK AND ROSES SUPPLEMENTS LIMITED\r\n40-18-41\r\n74062426\r\nYour BUSINESS CURRENT ACCOUNT details\r\nDate\r\nPaym ent type and details\r\nPaid out\r\nPaid in\r\nBalanc e\r\n02 Feb 23\r\nBALANCE BROUGHT FORWARD\r\n82,308.54\r\n03 Feb 23\r\nSO\r\nMAYOOR PATEL\r\nMAYOOR DIV\r\n3,500.00\r\nR\r\nPayPal\r\nTransfer 39ck58\r\n806.90\r\n79,615.44\r\n06 Feb 23\r\nCR\r\nStripe Payments UK\r\nSTRIPE\r\n1,347.09\r\nCR\r\nPayPal\r\nTransfer 52jb2d\r\n933.68\r\n81,896.21\r\n07 Feb 23\r\nCR\r\nPayPal\r\nTransfer hfd83j\r\n448.08\r\n82,344.29\r\n08 Feb 23\r\nCR\r\nPayPal\r\nTransfer 56n52y\r\n315.58\r\n82,659.87\r\n09 Feb 23\r\nCR\r\nPayPal\r\nTransfer 4pvx44\r\n859.29\r\nVIS\r\nEE TOPUP\r\nVESTA\r\nEE.CO.UK\r\n25.00\r\n83,494.16\r\n10 Feb 23\r\nCR\r\nPayPal\r\nTransfer 7y82v8\r\n406.15\r\n83,900.31\r\n13 Feb 23\r\nCR\r\nStripe Payments UK\r\nSTRIPE\r\n1,830.23\r\nR\r\nPayPal\r\nTransfer 6ySkmy\r\n833.43\r\nVIS\r\nXERO UK INV-142655\r\nMILTON KEYNES\r\n43.20\r\n86,520.77\r\n14 Feb 23\r\nCR\r\nPayPal\r\nTransfer 6g98St\r\n387.28\r\n86,908.05\r\nBALANCE CARRED FORWARD\r\n86,908.05\r\n1394 North End Croydon Surrey CRO ITN\r\nPurley\r\n\"I\r\n"

// CHATGPT(
//     `get all bank statement details form bellow's data but without bank details & return response in json: \n\n\r ${text}`
// )