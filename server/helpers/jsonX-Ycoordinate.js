module.exports = (data, width, height) => {
    data = typeof data === "string" ? JSON.parse(data) : data;
    const obj = {};
    const existX = [];
    for (const single of data) {
        const { y, x, str } = single;
        const exist = obj[y];
        if (exist) {
            obj[y].push(single);
        } else {
            obj[y] = [single];
        }
        if (str?.toString?.()?.trim?.()?.length && !existX.includes(x)) {
            existX.push(x);
        }
    }
    // console.log(existX.sort((a, b) => a - b), width, height);
    const values = Object.values(obj),
        keys = Object.keys(obj),
        cleanRow = [];

    // console.log(values[29]);
    // console.log(values[36]);
    // console.log(values[36]);

    for (let row of values) {
        // row = row.sort((a, b) => a - b)
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
            // const desorted = vals.sort((a, b) => b.x - a.x);
            cleanRow.push(sorted);
        }
    }
    return cleanRow;
};
