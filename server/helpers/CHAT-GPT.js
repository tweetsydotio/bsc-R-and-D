const headers = {
    // max_tokens:2048,
    "Content-Type": "application/json",
    Authorization: `Bearer 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`, // NEW ${process.env.OPEN_AI_KEY}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
},
    chatGPI = `https://api.openai.com/v1/chat/completions`;

module.exports = (prompt) => {
    const body = {
        // model: "gpt-3.5-turbo",
        model: "gpt-3.5-turbo-16k",
        // max_tokens: 16385,
        messages: [{ role: "user", content: prompt }],
    };
    fetch(chatGPI, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    })
        .then((d) => d.json())
        .then((d) => {
            const content = d?.choices?.[0]?.message?.content;
            if (content) {
                try {
                    console.log("Alhdmu lillah, Saved csv", content);
                    return content;
                } catch (parseErr) {
                    console.log(content, "content");
                    console.log(parseErr, "parseErr");
                }
            } else {
                console.log(d);
            }
        })
        .catch((e) => {
            console.error(e, "err");
            return e;
        });
};
