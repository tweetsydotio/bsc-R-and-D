const ocrSpaceApi = require("ocr-space-api");

var options = {
    apikey: "ca5691b6b388957",
    language: "eng", // Português
    imageFormat: 'image/png', // Image Typee (Only png ou gif is acceptable at the moment i wrote this)
    isOverlayRequired: true,
};

// Image file to upload
const imageFilePath = "pdf/HSBC-1.pdf";

// Run and wait the result
ocrSpaceApi
    .parseImageFromLocalFile(imageFilePath, options)
    .then(function (parsedResult) {
        console.log('parsedText: \n', parsedResult.parsedText);
        // console.log(
        //     "ocrParsedResult: \n",
        //     parsedResult.ocrParsedResult?.ParsedResults[0].TextOverlay
        // );
    })
    .catch(function (err) {
        console.log("ERROR:", err);
    });
