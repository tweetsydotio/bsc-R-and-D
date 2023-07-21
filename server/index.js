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
PDFDIST('../R&D/pdf/SoutheastBank.pdf').then(data => {
    // console.log(forPdfDist(data[1]))
}).catch(console.error)