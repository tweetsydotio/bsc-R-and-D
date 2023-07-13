const fs = require("fs");
const main = async (resource = `CompanyName.pdf`) => {
    const PDFParser = (await import("pdf2json")).default;
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", (errData) =>
        console.error(errData.parserError)
    );
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
        // fs.writeFile("one.json", JSON.stringify(pdfData));
        // const d = pdfData.Pages[0].Texts[0].R[0].T
        console.log(JSON.stringify(pdfData.Pages[0].Texts));
        // All(JSON.stringify(pdfData.Pages[0].Texts))
    });
    pdfParser.loadPDF(resource);
};
function All(dd) {
    // const resultFetch = (source = "result.json") => {
    //     const data = fs.readFileSync(source);
    //     const parse = JSON.parse(data.toString());
    //     return parse;
    // };
    const strToJSON = (data = dd) => {
        const parse = JSON.parse(data);
        return parse;
    };
    function arrToObj() {
        const newObj = {};
        for (const single of strToJSON()) {
            //strToJSON or resultFetch
            if (newObj[single.y]) newObj[single.y].push(single);
            else {
                newObj[single.y] = [single];
            }
        }
        return Object.values(newObj);
    }
    function maxArrLen(data = []) {
        let len = 0;
        for (const single of data) {
            if (len < single.length) len = single.length;
        }
        return len;
    }

    function dataSave() {
        const data = arrToObj();
        const header = Array(maxArrLen(data));
        let csv = header.join(",") + "\n";
        data.forEach(function (row) {
            const textArr = row.map((item) => `"${decodeURIComponent(item.R[0].T)}"`);
            csv += textArr.join(",");
            csv += "\n";
        });
        csv = csv.startsWith("\n") ? csv.slice(1) : csv;
        fs.writeFileSync(`output/test-${Date.now()}.csv`, csv, "utf-8");
    }
    dataSave();
}
main();

// const str = `Primary Account Number%3A 000009752`
// console.log(decodeURIComponent(str))

