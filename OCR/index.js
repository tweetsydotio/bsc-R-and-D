const { ocrSpace } = require('ocr-space-api-wrapper'), fs = require('fs');
require('./utils/jsonDecorate');
async function main() {
    try {
        // Using the OCR.space default free API key (max 10reqs in 10mins) + remote file
        // const res1 = await ocrSpace('http://dl.a9t9.com/ocrbenchmark/eng.png');

        // Using your personal API key + base64 image + custom language
        // const res3 = await ocrSpace('data:image/png;base64...', { apiKey: '<API_KEY_HERE>', language: 'ita' });
        const file = 'pdf/HSBC.pdf';
        // const file = new Uint8Array(fs.readFileSync('pdf/HSBC.pdf'))
        // Using your personal API key + local file
        const res2 = await ocrSpace(file, { apiKey: 'ca5691b6b388957', isOverlayRequired: true, scale: true, isTable: false, OCREngine: '2', filetype: '.Auto', detectOrientation: false, language: 'eng', ocrUrl: 'https://api8.ocr.space/parse/image' });
        // console.log(res2);
        // const {TextOverlay}=res2.ParsedResults[0];
        let count = 0;
        for (const TextOverlay of res2.ParsedResults) {
            fs.writeFileSync(`TextOverlay-${count}-${Date.now()}.json`, JSON.stringify(TextOverlay));
            count++
            console.log('Alhamdu lillah');

        }

    } catch (error) {
        console.error(error, 'err');
    }
}
// main()



/**
 * HBAC
 * 
 * {
  num: 1,
  scale: 1,
  rotation: 0,
  offsetX: 0,
  offsetY: 0,
  width: 595.44,
  height: 841.68
}
 */