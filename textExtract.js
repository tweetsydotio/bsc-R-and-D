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
        // logger: (m) => console.log(m), // Optional logger to view progress and errors
    });
    // console.log(result);

    return result;
    // return result.data.text;
}

// Provide the path to your image file
// const imagePath = 'https://tesseract.projectnaptha.com/img/eng_bw.png';
const imagePath = "HSBC-1.jpg";
// const imagePath = './eng_bw.png';

// ''

extractTextFromImage(imagePath)
    .then((data) => {
        console.log("Extracted text:", data.data.lines[0].words);
        // CHATGPT(
        //     `get all bank statement details form bellow's data but without bank details & return response in json: \n\n\r ${text}`
        // );
    })
    .catch((error) => console.error("Error:", error));

const chatGPI = `https://api.openai.com/v1/chat/completions`,
    _prompt_ = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "" }],
    },
    headers = {
        headers: {
            // max_tokens:2048,
            "Content-Type": "application/json",
            Authorization: `Bearer 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`, // ${process.env.OPEN_AI_KEY}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
        },
    };
const axiosParams = [
    chatGPI,
    _prompt_,
    {
        ...headers,
    },
];
// const params = [chatGPI, _prompt_, headers];

function CHATGPT(prompt) {
    const body = {
        // model: "gpt-3.5-turbo",
        model: "gpt-3.5-turbo-16k",
        // max_tokens: 16385,
        messages: [{ role: "user", content: prompt }],
    };
    fetch(chatGPI, {
        method: "POST",
        ...headers,
        body: JSON.stringify(body),
    })
        .then((d) => d.json())
        .then((d) => {
            const content = d?.choices?.[0]?.message?.content;
            if (content) {
                try {
                    // const parsed = JSON.parse(JSON.stringify(content));
                    // const csv = designForCSV(content);
                    // fs.writeFileSync(`output/json-${Date.now()}.json`, content);
                    // fs.writeFileSync(`output/test-${Date.now()}.csv`, csv, "utf-8");
                    console.log("Alhdmu lillah, Saved csv", content);
                } catch (parseErr) {
                    console.log(content, "content");
                    console.log(parseErr, "parseErr");
                }
            } else {
                console.log(d);
            }

            // console.log(JSON.stringify(d?.choices?.[0] || d), "data")
        })
        .catch((e) => {
            console.error(e, "err");
        });
}
