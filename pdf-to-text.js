const pdfUtil = require("pdf-to-text"),
    pdf_path = "pdf/HSBC-1.pdf",
    axios = require("axios"),
    fs = require("fs");

// //option to extract text from page 0 to 10
// const option = { from: 0, to: 10 };

// pdfUtil.pdfToText(upload.path, option, function (err, data) {
//     if (err) throw (err);
//     console.log(data); //print text
// });

// //Omit option to extract all text from the pdf file
pdfUtil.pdfToText(pdf_path, function (err, data) {
    if (err) throw err;
    chat(
        // `get all bank statement details form bellow's data but without bank details: \n ${data}`
        `get all bank statement details form bellow's data but without bank details & return response in json: \n\n\r ${data}`
    );
    //
    // console.log(data); //print all text
});

const { ocrSpace } = require("ocr-space-api-wrapper");

// async function main() {
//     try {
//         // Using the OCR.space default free API key (max 10reqs in 10mins) + remote file
//         // const res1 = await ocrSpace('http://dl.a9t9.com/ocrbenchmark/eng.png');

//         // Using your personal API key + local file
//         const res2 = await ocrSpace(pdf_path, {
//             apiKey: "ca5691b6b388957",
//             // isOverlayRequired: true,
//         });
//         // console.log(JSON.stringify(res2.ParsedResults[0].TextOverlay));
//         // console.log(JSON.stringify());
//         const texts = res2.ParsedResults[0].ParsedText;
//         chat(
//             `get all bank statement details form bellow's data but without bank details: \n ${texts}`
//             // `get all bank statement details form bellow's data but without bank details: \n ${data}`
//         );
//         // Using your personal API key + base64 image + custom language
//         // const res3 = await ocrSpace('data:image/png;base64...', { apiKey: '<API_KEY_HERE>', language: 'ita' });
//     } catch (error) {
//         console.error(error);
//     }
// }

// main();

const prompt = "Bismaillah";
const chatGPI = `https://api.openai.com/v1/chat/completions`,
    _prompt_ = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
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

function chat(prompt) {
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
                    const csv = designForCSV(content);
                    // fs.writeFileSync(`output/json-${Date.now()}.json`, content);
                    fs.writeFileSync(`output/test-${Date.now()}.csv`, csv, "utf-8");
                    console.log("Alhdmu lillah, Saved csv");
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

// axios
//     .post(...axiosParams)
//     .then((d) => console.log(d.data.choices[0]))
//     .catch((e) => console.log(e?.response?.data || e.message));

// console.log(JSON.parse(str2))

function designForCSV(datas) {
    // fs.writeFileSync(`output/json-${Date.now()}.json`, datas, "utf-8");
    // console.log(typeof datas);
    datas = JSON.parse(datas);
    let csv = "";
    if (typeof datas === "object") {
        if (Array.isArray(datas)) {
            console.log(datas);
        } else {
            // Seems Object

            for (const key of Object.keys(datas)) {
                const single = datas[key];
                if (Array.isArray(single)) {
                    let isSetHeader = false;
                    for (const item of single) {
                        if (typeof item === "object") {
                            if (!Array.isArray(item)) {
                                if (!isSetHeader) {
                                    csv +=
                                        Object.keys(item)
                                            .map((item) => {
                                                if (
                                                    item === null ||
                                                    item === undefined ||
                                                    item === "null" ||
                                                    item === "undefined"
                                                ) {
                                                    return "";
                                                }
                                                if (item.includes(",")) {
                                                    return `"${item}"`;
                                                }
                                                return item;
                                            })
                                            .join(",") + "\n";
                                }
                                isSetHeader = true;
                                csv +=
                                    Object.values(item)
                                        .map((item) => {
                                            if (
                                                item === null ||
                                                item === undefined ||
                                                item === "null" ||
                                                item === "undefined"
                                            ) {
                                                return "";
                                            }
                                            if (item.includes(",")) {
                                                return `"${item}"`;
                                            }
                                            return item;
                                        })
                                        .join(",") + "\n";
                            }
                        }
                    }
                } else if (typeof single === "object") {
                } else {
                    csv += [key, single].join(",") + "\n";
                    // console.log(`${key}: ${single}`);
                }
            }
        }
    }
    return csv;
}
