// This code requires Node.js. Do not run this code directly in a web browser.

const axios = require('axios')
// const FormData = require('form-data')
const fs = require('fs')

    // const formData = new FormData()
    // formData.append('instructions', JSON.stringify({
    //     parts: [
    //         {
    //             html: "index.html"
    //         }
    //     ]
    // }))
    // formData.append('index.html', fs.createReadStream('index.html')); 

    (async () => {
        try {
            const response = await axios.post('https://api.pspdfkit.com/build', {}, {
                headers: formData.getHeaders({
                    'Authorization': 'Bearer pdf_live_pTsbMj2w2kVAlFTL7LcI8LZpcGXXisi0eCqsqi1PwKb'
                }),
                responseType: "stream"
            })

            response.data.pipe(fs.createWriteStream("result.pdf"))
        } catch (e) {
            const errorString = await streamToString(e.response.data)
            console.log(errorString)
        }
    })()

// function streamToString(stream) {
//     const chunks = []
//     return new Promise((resolve, reject) => {
//         stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
//         stream.on("error", (err) => reject(err))
//         stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
//     })
// }
