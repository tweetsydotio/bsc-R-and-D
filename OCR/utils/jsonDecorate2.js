const fs = require("fs"),
    _ = require("lodash");

const main = (mainData = []) => {
    const width = 595.44 * 1.25;

    // for (let i = 0; i < width; i += width / 6) {
    //     row.push(Math.round(i));
    // }
    // console.log(row)
    // row = row.slice(0, 6);
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
    mainData = mainData.sort((a, b) => a.MinTop - b.MinTop);
    const columns = [];
    const rowsGrouping = mainData.reduce((a, c) => {
        const { MinTop } = c;
        // if (MinTop === 347) {
        //     console.log(a[MinTop - 5])
        // }
        const exist = a[MinTop];
        if (exist) {
            a[c.MinTop].push(c);
        } else if (a[MinTop - 1]) {
            a[c.MinTop - 1].push(c);
        } else if (a[MinTop - 2]) {
            a[c.MinTop - 2].push(c);
        } else if (a[MinTop - 3]) {
            a[c.MinTop - 3].push(c);
        } else if (a[MinTop - 4]) {
            a[c.MinTop - 4].push(c);
        } else if (a[MinTop - 5]) {
            a[c.MinTop - 5].push(c);
        } else if (a[MinTop - 6]) {
            a[c.MinTop - 6].push(c);
        } else if (a[MinTop - 1]) {
            a[c.MinTop + 1].push(c);
        } else if (a[MinTop + 2]) {
            a[c.MinTop + 2].push(c);
        } else if (a[MinTop + 3]) {
            a[c.MinTop + 3].push(c);
        } else if (a[MinTop + 4]) {
            a[c.MinTop + 4].push(c);
        } else if (a[MinTop + 5]) {
            a[c.MinTop + 5].push(c);
        } else if (a[MinTop + 6]) {
            a[c.MinTop + 6].push(c);
        } else a[c.MinTop] = [c];

        // console.log(a[MinTop - 1])

        /*=============================================
                                                                            =            extra            =
                                                                            =============================================*/
        //    const { Left } = c.Words[0];
        //    if (!columns.includes(Left)) {
        //        columns.push(Left);
        //    }

        /* Extra End */
        return a;
    }, {});
    // console.log(Object.keys(rowsGrouping).length);
    // console.log(Object.keys(rowsGrouping).sort((a, b) => a - b));
    // console.log(Object.keys(rowsGrouping).sort((a, b) => Number(a) - Number(b)));
    // console.log(Object.values(rowsGrouping)[4])
    // // console.log(columns.sort((a, b) => a - b));

    /*=============================================
                                          =            Row Wise data push            =
                                          =============================================*/

    const newArrs = [];
    let header = null,
        headerIdx = -1;

    for (const single of Object.values(rowsGrouping)) {
        const sorted = single.sort((a, b) => a.Words[0].Left - b.Words[0].Left);
        const firstClmLT = sorted[0]?.LineText;
        const lastClmLT = sorted[sorted.length - 1]?.LineText;
        headerIdx++;
        if (
            (firstClmLT?.trim?.()?.toLowerCase?.() === "date" ||
                firstClmLT?.trim?.()?.toLowerCase?.()?.includes("date")) &&
            (lastClmLT?.trim?.()?.toLowerCase?.() === "balance" ||
                lastClmLT?.trim?.()?.toLowerCase?.()?.includes("balance"))
        ) {
            //=============================================== Improve next time
            header = sorted;
            break;
        }
    }
    if (header) {
        const head = headerDesign(header);
        const len = head.length;
        const row = head.map((item, i) => {
            return item.nextColumn.mid;
            // if (i === 0) {
            //     return {
            // min: i,
            // max: item.nextColumn.mid,
            //     };
            // } else {
            // return {
            //     // min: item.nextColumn.Left,
            //     max: item.nextColumn.mid,
            // };
            // }
        });
        // console.log(row);

        for (const single of Object.values(rowsGrouping)) {
            const sorted = single.sort((a, b) => a.Words[0].Left - b.Words[0].Left);
            const firstClmLT = sorted[0]?.LineText;
            const lastClmLT = sorted[sorted.length - 1]?.LineText;
            let copy = JSON.parse(JSON.stringify(row));
            // console.log(sorted.map(item => ({ a: item.LineText, b: item.Words[0].Left })))
            sorted.forEach((item, i) => {
                const { Words } = item;
                const [{ Left }] = Words;
                // if (item.LineText === 'Transfer 39ck58') {
                //     console.log(JSON.stringify(item))
                // }

                if (row[0] > Left) {
                    if (typeof copy[i] === "number") {
                        copy[0] = item;
                    } else if (Array.isArray(copy[0])) {
                        copy[0].push(item);
                    } else {
                        const obj = copy[0];
                        copy[0] = [obj, item];
                    }
                } else if (Left > row[len - 2]) {
                    if (typeof copy[4] === "number") {
                        copy[4] = item;
                    } else if (Array.isArray(copy[4])) {
                        copy[4].push(item);
                    } else {
                        const obj = copy[0];
                        copy[4] = [obj, item];
                    }
                    // console.log(item.LineText)
                } else {
                    // if (row[0] < Left && row[1] > Left) {
                    //     // console.log(item.LineText, item.Words[0].Left)
                    //     if (typeof copy[1] === "number") {
                    //         copy[1] = item;
                    //     } else if (Array.isArray(copy[1])) {
                    //         copy[1].push(item);
                    //     } else {
                    //         const obj = copy[1];
                    //         copy[1] = [obj, item];
                    //     }
                    // } else if (row[1] < Left && row[2] > Left) {
                    //     if (typeof copy[2] === "number") {
                    //         copy[2] = item;
                    //     } else if (Array.isArray(copy[2])) {
                    //         copy[2].push(item);
                    //     } else {
                    //         const obj = copy[2];
                    //         copy[2] = [obj, item];
                    //     }
                    // } else if (row[2] < Left && row[3] > Left) {
                    //     if (typeof copy[3] === "number") {
                    //         copy[3] = item;
                    //     } else if (Array.isArray(copy[3])) {
                    //         copy[3].push(item);
                    //     } else {
                    //         const obj = copy[3];
                    //         copy[3] = [obj, item];
                    //     }
                    // }

                    row.forEach((r, j) => {
                        if (j !== len - 1) {
                            if (Left > r && Left < row[j + 1]) {
                                const idx = row.indexOf(r) + 1;
                                if (typeof copy[idx] === "number") {
                                    copy[idx] = item;
                                } else if (Array.isArray(copy[idx])) {
                                    copy[idx].push(item);
                                } else {
                                    copy[idx] = [copy[idx], item];
                                }
                            }
                        }
                    });
                }
            });
            copy = copy.map((im, k) => {
                return typeof im === "object" ? im : "";
            });
            const filtered = copy.filter((im) => im !== "");
            if (filtered.length) {
                newArrs.push(copy);
            }
        }
    }

    /* Common empty field filtering */
    let csv = "";
    for (const single of newArrs) {
        csv +=
            single
                .map((item) => {
                    if (item === "") {
                        return item;
                    } else if (Array.isArray(item)) {
                        // console.log(item?.map?.(im => im.LineText))
                        return item.reduce((a, c) => {
                            const val = c?.LineText || "";
                            a += (val?.includes(",") ? `"${val}"` : val) + " ";
                            return a;
                        }, "");
                    } else {
                        const val = item.LineText;
                        if (val.includes(",")) {
                            return `"${val}"`;
                        } else return val;
                    }
                })
                .join(",") + "\n";
    }

    // console.log(csv);
    /*=====  End of CSV  ======*/
    // console.log(csv)
    fs.writeFileSync(`csv-${Date.now()}-c.csv`, csv);
    // console.log(csv);
};
module.exports = main;
const file = fs.readFileSync("TextOverlay-0-1689946986940.json");
// const file = fs.readFileSync("TextOverlay-1-1689946986941.json");
// const file = fs.readFileSync("TextOverlay-2-1689946986942.json");
// const file = fs.readFileSync("TextOverlay-3-1689946986942.json");

main(JSON.parse(file.toString()).TextOverlay.Lines);

function headerDesign(data = []) {
    data = data.filter((item) => item.LineText?.trim?.() !== "");
    const headerWithArea = data.reduce((a, c, i, all) => {
        if (i === data.length - 1) {
            const { Words } = c;
            const { Left, Width } = Words[Words.length - 1];
            const lft = Left + Width + 100;
            a.push({ ...c, nextColumn: { Left: lft, mid: lft } }); // Improve next time
        } else {
            const {
                Words: [{ Left }],
            } = all[i + 1];
            const { Words: C_Words } = c;
            const W = C_Words[C_Words.length - 1];

            const addColumn = { ...c, nextColumn: { Left, mid: W.Left + W.Width } };
            // const addColumn = { ...c, nextColumn: { Left, mid: Left - 20 } };
            // const addColumn = { ...c, nextColumn: { Left, mid: (Left / 4) * 3 } };
            a.push(addColumn);
        }
        return a;
    }, []);
    return headerWithArea;
}
const headerArr = [
    {
        LineText: "Date",
        Words: [{ WordText: "Date", Left: 90, Top: 589, Height: 10, Width: 26 }],
        MaxHeight: 10,
        MinTop: 589,
    },
    {
        LineText: "Payment type and details",
        Words: [
            { WordText: "Payment", Left: 174, Top: 589, Height: 10, Width: 47 },
            { WordText: "type", Left: 222, Top: 589, Height: 10, Width: 28 },
            { WordText: "and", Left: 249, Top: 589, Height: 10, Width: 22 },
            { WordText: "details", Left: 271, Top: 589, Height: 10, Width: 37 },
        ],
        MaxHeight: 10,
        MinTop: 589,
    },
    {
        LineText: "Paid out",
        Words: [
            { WordText: "Paid", Left: 495, Top: 588, Height: 10, Width: 24 },
            { WordText: "out", Left: 519, Top: 589, Height: 10, Width: 21 },
        ],
        MaxHeight: 11,
        MinTop: 588,
    },
    {
        LineText: "Paid in",
        Words: [
            { WordText: "Paid", Left: 611, Top: 589, Height: 10, Width: 27 },
            { WordText: "in", Left: 638, Top: 589, Height: 10, Width: 11 },
        ],
        MaxHeight: 10,
        MinTop: 589,
    },
    {
        LineText: "Balance",
        Words: [
            { WordText: "Balance", Left: 712, Top: 589, Height: 10, Width: 46 },
        ],
        MaxHeight: 10,
        MinTop: 589,
    },
];
