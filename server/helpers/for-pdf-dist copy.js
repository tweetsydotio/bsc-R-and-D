const _ = require("lodash");
module.exports = (datas) => {
    const totalRows = [];
    for (const single of datas) {
        const [k, v] = Object.entries(single)[0];
        // if (k !== "~~~~~~") {
        const val = v[v.length - 2];
        // console.log(typeof val)
        if (!totalRows.includes(val)) totalRows.push(val);
        // }
    }
    const sorted = totalRows.sort(function (a, b) {
        return a - b;
    });

    const newObj = {};
    for (const single of datas) {
        const [v, loc] = Object.entries(single)[0];
        const lastKey = loc[loc.length - 1];
        if (newObj[lastKey]) {
            // newObj[lastKey].push(v);
            newObj[lastKey].push({ val: v, loc });
        } else {
            // newObj[lastKey] = [v];
            // console.log(loc)
            newObj[lastKey] = [{ val: v, loc }];
        }
    }
    const newArr = [],
        cleanArr = [],
        empty = [];
    for (const single of Object.values(newObj)) {
        let copy = JSON.parse(JSON.stringify(sorted));
        for (const { val, loc } of single) {
            const oneLoc = loc[loc.length - 2];
            copy[sorted.indexOf(oneLoc)] = val === "~~~~~~" ? "" : val;
        }
        const emp = [];
        newArr.push(
            copy.map((item, i) => {
                const clear = sorted.includes(item) ? "" : item;
                if (clear === "") {
                    emp.push(i);
                }
                return clear;
            })
        );
        empty.push(emp);
    }
    const result1 = _.intersection(...empty);
    for (let single of newArr) {
        cleanArr.push(single.filter((_, k) => !result1.includes(k)));
    }
    // return cleanArr;
    let csv = "";
    for (const item of cleanArr) {
        csv +=
            item
                .map((im) => {
                    if (im === "~~~~~~") return "";
                    return im;
                })
                .join(",") + "\n";
    }
    // require("fs").writeFileSync("testing-------.csv", csv);
};
