// const Jimp = require("jimp");

// const imagePath = "CN.jpg";
// const outputPath = "output.txt";

// (async () => {
//     const image = await Jimp.read(imagePath);
//     const imageBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

//     const worker = await tesseract.createWorker();
//     await worker.loadLanguage("eng");
//     await worker.initialize("eng");

//     const data = await worker.recognize(imageBuffer);

//     const text = data.text;

//     fs.writeFileSync(outputPath, text);
// })();


const Tesseract = require("tesseract.js");

async function extractTextFromImage(imagePath) {
    const result = await Tesseract.recognize(imagePath, "eng", {
        logger: (m) => console.log(m), // Optional logger to view progress and errors
    });
    console.log(result);
    return result.data.text;
}

// Provide the path to your image file
// const imagePath = 'https://tesseract.projectnaptha.com/img/eng_bw.png';
const imagePath = "./CN.jpg";
// const imagePath = './eng_bw.png';

// ''

extractTextFromImage(imagePath)
    .then((text) => console.log("Extracted text:", text))
    .catch((error) => console.error("Error:", error));
