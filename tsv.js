const fs = require("fs");
const data = fs.readFileSync("output/1689574153781.tsv");

function call() {
    const group = {};
    for (const row of data.toString().split("\n")) {
        const all = row.split("\t");
        const key = all[0];
        const val = all[all.length - 1];
        if (group[key]) {
            group[key].push(val);
        } else {
            group[key] = [val];
        }
    }
    console.log(JSON.stringify(group[3]))
}
call();
