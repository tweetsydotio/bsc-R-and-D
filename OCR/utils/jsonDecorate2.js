const fs = require("fs"),
    _ = require("lodash");


const main = (mainData = []) => {
    const width = 595.44 * 1.25;
    let row = [];

    for (let i = 0; i < width; i += width / 6) {
        row.push(Math.round(i));
    }
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
    let header = null
    for (const single of Object.values(rowsGrouping)) {

        const sorted = single.sort((a, b) => a.Words[0].Left - b.Words[0].Left);
        const firstClmLT = sorted[0]?.LineText;
        const lastClmLT = sorted[sorted.length - 1]?.LineText;

        if ((firstClmLT?.trim?.()?.toLowerCase?.() === 'date' || firstClmLT?.trim?.()?.toLowerCase?.()?.includes('date')) && (lastClmLT?.trim?.()?.toLowerCase?.() === 'balance' || lastClmLT?.trim?.()?.toLowerCase?.()?.includes('balance'))) {
            console.log(JSON.stringify(sorted), '================================heading==================================')

        }
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
        copy = copy.map((im, k) => {
            return typeof im === "object" ? im : '';
            // return typeof im === "object" ? im : k;
        });
        newArrs.push(copy);
    }
    // console.log()
    // const commonEmptyColumn = _.intersection(...newArrs);
    /*=====  End of Row Wise data push  ======*/

    /*=============================================
              =            CSV            =
              =============================================*/
    // const filtered=[];

    /* Common empty field filtering */
    // let csv = "";
    // for (const single of newArrs) {
    //     csv +=
    //         single
    //             .reduce((a, c, i) => {
    //                 if (!commonEmptyColumn.includes(i)) {
    //                     if (typeof c === "object") {
    //                         const val = c.LineText;
    //                         if (val.includes(",")) {
    //                             a.push(`"${val}"`);
    //                         } else a.push(val);
    //                     } else {
    //                         a.push('');
    //                     }
    //                 }
    //                 return a;
    //             }, [])
    //             .join(",") + "\n";
    // }
    // console.log(csv)
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
    // fs.writeFileSync('csv/one.csv', csv);
    // console.log(csv)
};
module.exports = main;
// const file = fs.readFileSync("TextOverlay-0-1689946986940.json");
// const file = fs.readFileSync("TextOverlay-1-1689946986941.json");
// const file = fs.readFileSync("TextOverlay-2-1689946986942.json");
const file = fs.readFileSync("TextOverlay-3-1689946986942.json");

main(JSON.parse(file.toString()).TextOverlay.Lines);

// for (let i = 0; i < width; i += width / 6) {
// console.log(width * 1.25);
// }
// const keys = [
//     "44",
//     "95",
//     "109",
//     "122",
//     "139",
//     "153",
//     "166",
//     "184",
//     "207",
//     "223",
//     "225",
//     "274",
//     "294",
//     "320",
//     "331",
//     "345",
//     "346",
//     "347",
//     "362",
//     "376",
//     "377",
//     "393",
//     "408",
//     "422",
//     "437",
//     "453",
//     "468",
//     "483",
//     "484",
//     "499",
//     "514",
//     "528",
//     "530",
//     "545",
//     "559",
//     "574",
//     "589",
//     "590",
//     "605",
//     "620",
//     "636",
//     "651",
//     "665",
//     "666",
//     "680",
//     "682",
//     "696",
//     "697",
//     "711",
//     "726",
//     "740",
//     "742",
//     "756",
//     "757",
//     "771",
//     "773",
//     "788",
//     "803",
//     "817",
//     "819",
//     "833",
//     "834",
//     "848",
//     "862",
//     "863",
//     "864",
//     "879",
//     "894",
//     "908",
//     "909",
//     "910",
//     "925",
//     "940",
//     "954",
//     "956",
//     "971",
//     "985",
//     "1002",
//     "1078",
// ];
// const keys2 = JSON.parse(JSON.stringify(keys));

// for (const ss of keys2) {
//     console.log(ss)
//     const idx = keys2.indexOf((Number(ss) - 1).toString());
//     if (idx !== -1) {
//         keys[idx] = [[keys[idx]], ss];
//         keys[idx + 1] = null;
//         // keys[idx + 1].pop();
//     }
// }

// for (const ss of keys2) {
//     // console.log(ss)
// const idx = keys2.indexOf((Number(ss) - 1).toString());
// if (idx !== -1) {
//     keys[idx] = [[keys[idx]], ss];
//     keys[idx + 1] = null;
// }
// }
// const result = keys2.reduce((a, c, _, all) => {
//     const idx = all.indexOf((Number(c) - 1).toString());
//     if (idx !== -1) {
//         a[idx - 1] = [all[idx], c];

//     } else {
//         a.push(c)
//     }
//     return a;
// }, [])
// console.log(result)
