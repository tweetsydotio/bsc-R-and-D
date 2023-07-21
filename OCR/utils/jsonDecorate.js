const fs = require("fs");
const main = (mainData = []) => {
    const width = 595.44 * 1.25;
    let row = [];

    for (let i = 0; i < width; i += width / 6) {
        row.push(Math.round(i));
    }
    row = row.slice(0, 6);
    // const lefts = [];
    // const rights = [];
    // for (const single of mainData) {
    //     const { Words } = single;
    //     const [{ Left }] = Words;
    //     lefts.push(Left);
    //     const { Left: R } = Words[Words.length - 1];
    //     rights.push(R);
    // }
    // console.log(lefts.sort((a, b) => a - b)[0]);
    // console.log(rights.sort((a, b) => b - a)[0]);

    const columns = [];
    const rowsGrouping = mainData.reduce((a, c) => {
        const exist = a[c.MinTop];
        if (exist) {
            a[c.MinTop].push(c);
        } else a[c.MinTop] = [c];
        const { Left } = c.Words[0];
        if (!columns.includes(Left)) {
            columns.push(Left);
        }
        return a;
    }, {});
    // console.log(Object.values(rowsGrouping)[4])
    // // console.log(columns.sort((a, b) => a - b));
    const newArrs = [];
    for (const single of Object.values(rowsGrouping)) {
        const sorted = single.sort((a, b) => a.Words[0].Left - b.Words[0].Left);
        let copy = JSON.parse(JSON.stringify(row));
        for (const item of sorted) {
            const { Words } = item;
            const [{ Left }] = Words;
            if (Left < row[1]) {
                copy[0] = item;
            } else if (Left > row[1] && Left < row[2]) {
                copy[1] = item;
            } else if (Left > row[2] && Left < row[3]) {
                copy[2] = item;
            } else if (Left > row[3] && Left < row[4]) {
                copy[3] = item;
            } else if (Left > row[4] && Left < row[5]) {
                copy[4] = item;
            } else {
                copy[5] = item;
            }
        }
        copy = copy.map((im) => {
            return typeof im === "number" ? "" : im;
        });
        newArrs.push(copy);
    }

    /*=============================================
        =            CSV            =
        =============================================*/

    let csv = "";
    for (const single of newArrs) {
        csv +=
            single
                .map((item) => {
                    if (typeof item === "object") {
                        const val = item.LineText;
                        if (val.includes(",")) {
                            return `"${val}"`;
                        } else return val;
                    } else {
                        return item;
                    }
                })
                .join(",") + "\n";
    }

    /*=====  End of CSV  ======*/
    // console.log(csv)
    fs.writeFileSync('csv/one.csv', csv)
    // console.log(csv)
};
module.exports = main;
// const file = fs.readFileSync("TextOverlay-0-1689946986940.json");
const file = fs.readFileSync("TextOverlay-1-1689946986941.json");

main(JSON.parse(file.toString()).TextOverlay.Lines);
const width = 595;

// for (let i = 0; i < width; i += width / 6) {
// console.log(width * 1.25);
// }
