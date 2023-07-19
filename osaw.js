const { ocrSpace } = require("ocr-space-api-wrapper");
const fs = require("fs");
async function main() {
    try {
        // Using the OCR.space default free API key (max 10reqs in 10mins) + remote file
        // const res1 = await ocrSpace('http://dl.a9t9.com/ocrbenchmark/eng.png');

        // Using your personal API key + local file
        // const base64String = fs.readFileSync("HSBC-1.jpg", {
        //     encoding: "base64",
        // });
        // console.log(base64String.slice(0 - 500))
        const res2 = await ocrSpace("HSBC-1.jpg", {
            apiKey: "ca5691b6b388957",
            isOverlayRequired: true,
            language: "eng",
        });
        console.log(res2?.ParsedResults?.[0]?.ParsedText);
        // console.log(JSON.stringify(res2.ParsedResults[0].TextOverlay));
        // for (const single of res2.ParsedResults[0].TextOverlay?.Lines) {
        //     console.log(single.LineText);
        // }
        // console.log(JSON.stringify(res2.ParsedResults[0].TextOverlay));
        // Using your personal API key + base64 image + custom language
        // const res3 = await ocrSpace('data:image/png;base64...', { apiKey: '<API_KEY_HERE>', language: 'ita' });
    } catch (error) {
        console.error(error);
    }
}

main();
