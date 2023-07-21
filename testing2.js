const _ = require("lodash");
const Arrs2 = [
    {
        str: "List",
        dir: "ltr",
        width: 17.112000000000005,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 72.024, 709.66],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "",
        dir: "ltr",
        width: 0,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 77.544, 674.62],
        fontName: "g_d0_f1",
        hasEOL: true,
    },
    {
        str: "Sriel Number",
        dir: "ltr",
        width: 64.26384,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 77.544, 674.62],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 52.762159999999994,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 141.80784, 674.62],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "Company list",
        dir: "ltr",
        width: 63.66767999999996,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 194.57, 674.62],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 53.33231999999998,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 258.23768, 674.62],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "Employee number",
        dir: "ltr",
        width: 89.34672,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 311.57, 674.62],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 27.673280000000034,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 400.91671999999994, 674.62],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "Comment or status",
        dir: "ltr",
        width: 92.93471999999981,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 428.59, 674.62],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "",
        dir: "ltr",
        width: 0,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 77.544, 650.86],
        fontName: "g_d0_f1",
        hasEOL: true,
    },
    {
        str: "01",
        dir: "ltr",
        width: 12.258280000000006,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 77.544, 650.86],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 104.76772,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 89.80228, 650.86],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "NX Group",
        dir: "ltr",
        width: 49.07279999999999,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 194.57, 650.86],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 67.92720000000003,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 243.64279999999997, 650.86],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "03 Nos",
        dir: "ltr",
        width: 34.930559999999964,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 311.57, 650.86],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 82.08944000000002,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 346.50055999999995, 650.86],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "Verified",
        dir: "ltr",
        width: 37.33728000000004,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 428.59, 650.86],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "",
        dir: "ltr",
        width: 0,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 77.544, 627.22],
        fontName: "g_d0_f1",
        hasEOL: true,
    },
    {
        str: "02",
        dir: "ltr",
        width: 12.258280000000006,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 77.544, 627.22],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 104.76772,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 89.80228, 627.22],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "LG Inc",
        dir: "ltr",
        width: 32.53488,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 194.57, 627.22],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 84.46511999999998,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 227.10488, 627.22],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "05 Nos",
        dir: "ltr",
        width: 34.930559999999964,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 311.57, 627.22],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 82.08944000000002,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 346.50055999999995, 627.22],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "Failure",
        dir: "ltr",
        width: 33.583679999999994,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 428.59, 627.22],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "",
        dir: "ltr",
        width: 0,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 77.544, 603.58],
        fontName: "g_d0_f1",
        hasEOL: true,
    },
    {
        str: "03",
        dir: "ltr",
        width: 12.258280000000006,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 77.544, 603.58],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 104.76772,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 89.80228, 603.58],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "MX Stationary",
        dir: "ltr",
        width: 69.17663999999998,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 194.57, 603.58],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 47.82336000000004,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 263.74663999999996, 603.58],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "05 Nos",
        dir: "ltr",
        width: 34.930559999999964,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 311.57, 603.58],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 82.08944000000002,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 346.50055999999995, 603.58],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "ok",
        dir: "ltr",
        width: 11.64004000000002,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 428.59, 603.58],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "",
        dir: "ltr",
        width: 0,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 77.544, 579.94],
        fontName: "g_d0_f1",
        hasEOL: true,
    },
    {
        str: "04",
        dir: "ltr",
        width: 12.258280000000006,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 77.544, 579.94],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 104.76772,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 89.80228, 579.94],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "MSCS",
        dir: "ltr",
        width: 31.828319999999973,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 194.57, 579.94],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 85.17168000000004,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 226.39831999999996, 579.94],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "03 nos",
        dir: "ltr",
        width: 33.119999999999976,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 311.57, 579.94],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: " ",
        dir: "ltr",
        width: 83.90000000000003,
        height: 0,
        transform: [11.04, 0, 0, 11.04, 344.68999999999994, 579.94],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
    {
        str: "Failure",
        dir: "ltr",
        width: 33.583679999999994,
        height: 11.04,
        transform: [11.04, 0, 0, 11.04, 428.59, 579.94],
        fontName: "g_d0_f1",
        hasEOL: false,
    },
];
const Arrs = [
    { List: [11.16, 0, 0, 11.16, 72.048, 709.87] },
    { "": [11.16, 0, 0, 11.16, 77.448, 674.95] },
    { "Sriel Number": [11.16, 0, 0, 11.16, 77.448, 674.95] },
    { "~~~~~~": [11.16, 0, 0, 11.16, 141.58452, 674.95] },
    { "Company list": [11.16, 0, 0, 11.16, 194.52, 674.95] },
    { "~~~~~~": [11.16, 0, 0, 11.16, 258.05388000000005, 674.95] },
    { "Employee number": [11.16, 0, 0, 11.16, 311.59, 674.95] },
    { "~~~~~~": [11.16, 0, 0, 11.16, 400.91464, 674.95] },
    { "Comment or status": [11.16, 0, 0, 11.16, 428.66, 674.95] },
    { "": [11.16, 0, 0, 11.16, 77.448, 651.17] },
    { "01": [11.16, 0, 0, 11.16, 77.448, 651.17] },
    { "~~~~~~": [11.16, 0, 0, 11.16, 89.77292, 651.17] },
    { Verified: [11.16, 0, 0, 11.16, 428.66, 651.17] },
    { "": [11.16, 0, 0, 11.16, 77.448, 627.41] },
    { "02": [11.16, 0, 0, 11.16, 77.448, 627.41] },
    { "~~~~~~": [11.16, 0, 0, 11.16, 89.77292, 627.41] },
    { "LG Inc": [11.16, 0, 0, 11.16, 194.52, 627.41] },
    { "~~~~~~": [11.16, 0, 0, 11.16, 227.06256000000002, 627.41] },
    { "05 Nos": [11.16, 0, 0, 11.16, 311.59, 627.41] },
    { "": [11.16, 0, 0, 11.16, 77.448, 603.62] },
    { "03": [11.16, 0, 0, 11.16, 77.448, 603.62] },
    { "~~~~~~": [11.16, 0, 0, 11.16, 89.77292, 603.62] },
    { "MX Stationary": [11.16, 0, 0, 11.16, 194.52, 603.62] },
    { "~~~~~~": [11.16, 0, 0, 11.16, 263.37719999999996, 603.62] },
    { ok: [11.16, 0, 0, 11.16, 428.66, 603.62] },
    { "": [11.16, 0, 0, 11.16, 194.52, 580.22] },
    { MSCS: [11.16, 0, 0, 11.16, 194.52, 580.22] },
    { "~~~~~~": [11.16, 0, 0, 11.16, 226.42644000000004, 580.22] },
    { "03 nos": [11.16, 0, 0, 11.16, 311.59, 580.22] },
    { "~~~~~~": [11.16, 0, 0, 11.16, 344.5008399999999, 580.22] },
    { Failure: [11.16, 0, 0, 11.16, 428.66, 580.22] },
];

function func2(datas) {
    const totalRows = [];
    for (const single of datas) {
        const { transform } = single;
        const val = transform[transform.length - 2];
        if (!totalRows.includes(val)) totalRows.push(val);
    }
    const sorted = totalRows.sort(function (a, b) {
        return a - b;
    });
    const newObj = {};
    for (const single of datas) {
        const { transform } = single;
        const lastKey = transform[transform.length - 1];
        if (newObj[lastKey]) {
            newObj[lastKey].push(single);
        } else {
            newObj[lastKey] = [single];
        }
    }
    const newArr = [],
        cleanArr = [],
        empty = [];
    // console.log(Object.values(newObj)[1])
    // for (const single of [Object.values(newObj)[1]]) {
    for (const single of Object.values(newObj)) {
        let copy = JSON.parse(JSON.stringify(sorted));
        const trns = single.map(({ transform }) => {
            return transform[transform.length - 2];
        });
        console.log(_.intersection(...trns), '===')
        for (const one of single) {
            const { transform } = one;
            // console.log(transform);
            const oneLoc = transform[transform.length - 2];
            // console.log(sorted.indexOf(oneLoc))
            copy[sorted.indexOf(oneLoc)] = one;
        }
        const emp = [];
        newArr.push(
            copy.map((item, i) => {
                if (typeof item === "object") {
                    return item;
                }
                emp.push(i);
                return {};
            })
        );
        empty.push(emp);
    }
    // const commonEmpty = _.intersection(...empty);
    // console.log(...commonEmpty)

    // for (let single of newArr) {
    //     // for (const del of result1) {
    //     //     // single.pop(del);

    //     // }

    //     cleanArr.push(single.filter((item, k) => !result1.includes(k)));
    // }
    let csv = "";
    for (const item of newArr) {
        csv +=
            item
                .map((im) => {
                    return im.str;
                })
                .join(",") + "\n";
    }
    console.log(csv);
    // require("fs").writeFileSync("testing-------.csv", csv);
}

func2(Arrs2);
