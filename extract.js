const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();
const fs = require("fs");
const buffer = fs.readFileSync("pdf/HSBC-1.pdf");
const options = {}; /* see below */
const pdf = () =>
    pdfExtract.extractBuffer(buffer, options, (err, data) => {
        if (err) return console.log(err);
        // console.log(data.pages[0].content);
        const { content } = data.pages[0];
        // console.log(JSON.stringify(content));
        PrepireForCSV(content);
    });
pdf();
function PrepireForCSV(data) {
    data = typeof data === "string" ? JSON.parse(data) : data;
    const obj = {};
    for (const single of data) {
        const { y } = single;
        const exist = obj[y];

        if (exist) {
            obj[y].push(single);
        } else {
            obj[y] = [single];
        }
    }
    const values = Object.values(obj),
        // keys = Object.keys(obj),
        cleanRow = [];

    for (const row of values) {
        const newRow = row.reduce((a, c) => {
            const { x } = c;
            const val = a[x];
            if (val) {
                if (val.width > c.width) {
                    a[x] = { ...val, str: val.str + c.str };
                } else if (val.width < c.width) {
                    a[x] = { ...c, str: val.str + c.str };
                }
            } else {
                a[x] = c;
            }
            return a;
        }, {});
        const vals = Object.values(newRow);
        if (vals.filter((item) => item.str?.trim?.()).length) {
            const sorted = vals.sort((a, b) => a.x - b.x);
            cleanRow.push(sorted);
        }
    }

    // console.log(cleanRow[12]);

    let csv = "";
    for (const item of cleanRow) {
        csv +=
            item
                .map(({ str }) => {
                    return str ?? "";
                })
                .join(",") + "\n";
    }
    // require("fs").writeFileSync("output/testing-------fdfj.csv", csv);
    console.log("==============================csv================");
    console.log(csv);
}

// One(fs.readFileSync("./extractjson.json").toString());
