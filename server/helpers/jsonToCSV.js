// module.exports = (data = [], select = "") => {
//     let csv = "";
//     for (const item of data) {
//         csv +=
//             item
//                 .map((vals) => {
//                     if (select) {
//                         let val = vals[select] ?? "";
//                         if (val?.includes(",")) val = `"${val}"`;
//                         return val;
//                     }
//                     let val = vals ?? "";
//                     if (val?.includes(",")) val = `"${val}"`;
//                     return val;
//                 })
//                 .join(",") + "\n";
//     }
//     return csv;
// };
module.exports = (data = [], select = "") => {
    let csv = "";
    for (const item of data) {
        csv +=
            item
                .map((vals) => {
                    if (select) {
                        const v = vals[select];
                        let val = v?.toString?.()?.length ? v : "-------";
                        if (val?.includes?.(",")) val = `"${val}"`;
                        return val;
                    }
                    let val = vals?.toString?.()?.length ? vals : "-------";
                    if (val?.includes?.(",")) val = `"${val}"`;
                    return val;
                })
                .join(",") + "\n";
    }
    return csv;
};
