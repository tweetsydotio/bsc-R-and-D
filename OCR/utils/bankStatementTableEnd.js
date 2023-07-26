const fs = require("fs"),
    _ = require("lodash"),
    moment = require("moment");

const main = (mainData = []) => {
    mainData = mainData.sort((a, b) => a.MinTop - b.MinTop);
    const columns = [];
    const rowsGrouping = mainData.reduce((a, c) => {
        const { MinTop } = c;
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
        }

        // else if (a[MinTop + 1]) {
        //     a[c.MinTop + 1].push(c);
        // } else if (a[MinTop + 2]) {
        //     a[c.MinTop + 2].push(c);
        // } else if (a[MinTop + 3]) {
        //     a[c.MinTop + 3].push(c);
        // } else if (a[MinTop + 4]) {
        //     a[c.MinTop + 4].push(c);
        // } else if (a[MinTop + 5]) {
        //     a[c.MinTop + 5].push(c);
        // } else if (a[MinTop + 6]) {
        //     a[c.MinTop + 6].push(c);
        // }
        else a[c.MinTop] = [c];
        /* Extra End */
        return a;
    }, {});

    const newArrs = [];
    let header = null,
        // start (index of table area start)
        start = -1;

    for (const single of Object.values(rowsGrouping)) {
        const sorted = single.sort((a, b) => a.Words[0].Left - b.Words[0].Left);
        const firstClmLT = sorted[0]?.LineText;
        const lastClmLT = sorted[sorted.length - 1]?.LineText;
        if (sorted.filter((d) => d?.LineText?.trim?.()).length) {
            start++;
        }
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
        let dateKey;
        const row = head.map((item, i) => {
            if (item?.LineText?.toLowerCase?.()?.includes("date") && !dateKey) {
                dateKey = i;
            }
            return item.nextColumn.mid;
        });
        // console.log(row);

        for (const single of Object.values(rowsGrouping)) {
            const sorted = single.sort((a, b) => a.Words[0].Left - b.Words[0].Left);
            // const firstClmLT = sorted[0]?.LineText;
            // const lastClmLT = sorted[sorted.length - 1]?.LineText;
            let copy = JSON.parse(JSON.stringify(row));
            // console.log(sorted.map(item => ({ a: item.LineText, b: item.Words[0].Left })))
            sorted.forEach((item, i) => {
                const { Words } = item;
                const [{ Left }] = Words;
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

        const afterWithHeader = newArrs.slice(start);
        const headerAfterLen = afterWithHeader.length;
        // end index of table area end
        let end = headerAfterLen;
        afterWithHeader.forEach((data, idx) => {
            // D_C =Date column
            if (idx !== 0) {
                const D_C = data[dateKey];
                if (D_C?.LineText && !moment(D_C.LineText).isValid()) {
                    end = idx - 1;
                }
            }
            // console.log(data[dateKey]?.LineText)
        });

        const response = {
            headerInfo: {
                start,
                end,
                header: head,
                dateKey,
            },
            data: newArrs,
        };

        // console.log(newArrs.length, afterWithHeader.length)
        // console.log(end)
    }
};
module.exports = main;
const file = fs.readFileSync("TextOverlay-0-1689946986940.json");
// const file = fs.readFileSync("TextOverlay-1-1689946986941.json");
// const file = fs.readFileSync("TextOverlay-2-1689946986942.json");
// const file = fs.readFileSync("TextOverlay-3-1689946986942.json");

// const allyfile = fs.readFileSync("allyBank.json");
// main(JSON.parse(allyfile.toString()).ParsedResults[0].Overlay.Lines);
main(JSON.parse(file.toString()).TextOverlay.Lines);

function headerDesign(data = []) {
    // data = data.filter((item) => item.LineText?.trim?.() !== "");
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
            const { Width } = C_Words[0];
            // const addColumn = { ...c, nextColumn: { Left, mid: W.Left + W.Width } };
            // const addColumn = { ...c, nextColumn: { Left, mid: Left - 20 } };
            const addColumn = { ...c, nextColumn: { Left, mid: Left - Width } }; // minus words[0].width
            // const addColumn = { ...c, nextColumn: { Left, mid: (Left / 4) * 3 } };
            a.push(addColumn);
        }
        return a;
    }, []);
    return headerWithArea;
}
// console.log(new Date(1675274400000).toString());
function DownAsCSV(data) {
    let csv = "";
    for (const single of data) {
        csv +=
            single
                .map((item) => {
                    if (item === "") {
                        return item;
                    } else if (Array.isArray(item)) {
                        return item.reduce((a, c) => {
                            const val = c?.LineText || "";
                            a += (val?.includes(",") ? `"${val}"` : val) + " ";
                            return a;
                        }, "");
                    } else {
                        const val = item?.LineText || "";
                        if (val.includes(",")) {
                            return `"${val}"`;
                        } else return val;
                    }
                })
                .join(",") + "\n";
    }
    /*=====  End of CSV  ======*/
    fs.writeFileSync(`csv-${Date.now()}.csv`, csv);
    console.log(`Alhamdu lillah, Save CSV`);
}
