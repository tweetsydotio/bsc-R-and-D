const fs = require("fs");

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    // Uint8Array
    return new Buffer(bitmap).toString("base64");
    // return new Buffer(bitmap).toString('base64');
}
// console.log(base64_encode('CN.jpg'))

// 👇️ if you use CommonJS require()
// const fs = require('fs')

// function toBase64(filePath) {
//     const img = fs.readFileSync(filePath);

//     return Buffer.from(img).toString('base64');
// }

// const base64String = toBase64('./DN.jpg');
// console.log(base64String);

// const withPrefix = 'data:image/png;base64,' + base64String;
// console.log(withPrefix);

const ReadText = require("text-from-image");

// ReadText("./HSBC-1.jpg")
//     .then((text) => {
//         console.log(text);
//     })
//     .catch((err) => {
//         console.log(err?.message);
//     });

// console.log(ReadText('CN.jpg'))
