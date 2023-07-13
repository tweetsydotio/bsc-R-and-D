const ocrSpaceApi = require('ocr-space-api');

var options = {
    apikey: 'ca5691b6b388957',
    language: 'por', // Português
    imageFormat: 'image/png', // Image Type (Only png ou gif is acceptable at the moment i wrote this)
    isOverlayRequired: true
};

// Image file to upload
const imageFilePath = "CN.jpg";

// Run and wait the result
ocrSpaceApi.parseImageFromLocalFile(imageFilePath, options)
    .then(function (parsedResult) {
        console.log('parsedText: \n', parsedResult.parsedText);
        console.log('ocrParsedResult: \n', parsedResult.ocrParsedResult);
    }).catch(function (err) {
        console.log('ERROR:', err);
    });
