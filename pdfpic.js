const { pdftobuffer } = require('pdftopic');
const fs = require('fs');

const pdf = fs.readFileSync('./ss.pdf', null);

pdftobuffer(pdf, 0).then((buffer) => {
    console.log(buffer)
    // fs.writeFileSync('./output/img/iimg.png', buffer, null);
}).catch(console.error)

// const { pdf } = require("pdf-to-img");

// const func = async () => {
//     for await (const page of await pdf("CompanyName.pdf")) {
//         expect(page).toMatchImageSnapshot();
//     }
// };
// func()

// const { fromPath } = require("pdf2pic");

// const options = {
//     density: 100,
//     saveFilename: "pdf",
//     savePath: "./output/img",
//     format: "jpg",
//     // width: 600,
//     // height: 600
//     quality: 100,
// };
// const storeAsImage = fromPath("CompanyName.pdf", options);
// const pageToConvertAsImage = 1;

// storeAsImage(pageToConvertAsImage)
//     .then((resolve) => {
//         console.log("Page 1 is now converted as image");

//         return resolve;
//     })
//     .catch((e) => {
//         console.error(e);
//     });
