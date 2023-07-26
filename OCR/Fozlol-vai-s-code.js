// it can do all tasks of version 1 + it can detect same lines by minTop ( if minTop are in tolerance range)

const fs = require("fs");

// Function to calculate similarity percentage and Levenshtein distance
function calculateSimilarityPercentage(word1, word2) {
    const maxLength = Math.max(word1.length, word2.length);
    const distance = levenshteinDistance(word1, word2);
    const similarityPercentage = ((maxLength - distance) / maxLength) * 100;
    return similarityPercentage;
}

function levenshteinDistance(word1, word2) {
    const dp = Array.from({ length: word1.length + 1 }, () =>
        Array.from({ length: word2.length + 1 })
    );

    for (let i = 0; i <= word1.length; i++) {
        for (let j = 0; j <= word2.length; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else {
                dp[i][j] =
                    word1[i - 1] === word2[j - 1]
                        ? dp[i - 1][j - 1]
                        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }

    return dp[word1.length][word2.length];
}

// Function to check if a line is a table header
function isTableHeader(words) {
    const commonTableHeaders = [
        "date",
        "transaction",
        "debit",
        "credit",
        "deposit",
        "balance",
        "paidin",
        "paidout",
        "withdrawal",
    ];

    const cleanedWords = words
        .map((word) => word.LineText.toLowerCase().replace(/[^a-z0-9]+/g, ""))
        .filter((word) => word.length > 0);

    const totalWords = cleanedWords.length;

    // if (totalWords < 3) {
    //   return false;
    // }
    let matchedWords = 0;

    for (const word of cleanedWords) {
        for (const headerWord of commonTableHeaders) {
            const similarityPercentage = calculateSimilarityPercentage(
                word,
                headerWord
            );
            if (similarityPercentage >= 70) {
                matchedWords++;
                break;
            }
        }
    }

    const matchPercentage = (matchedWords / totalWords) * 100;
    // console.log({
    //   cleanedWords,
    //   words,
    //   matchedWords,
    //   matchPercentage,
    // });
    if (matchPercentage >= 70) {
        console.log(
            "====================================================================================================="
        );
    }
    return matchPercentage >= 70;
}

// Function to check if two MinTop values are within the tolerance range
function isMinTopWithinTolerance(minTop1, minTop2, tolerance) {
    return Math.abs(minTop1 - minTop2) <= tolerance;
}

async function callMe(jsonData) {
    // have to update Lines path
    const textOverlayLines = jsonData.TextOverlay.Lines;

    // Sort lines by MinTop to make it easier to group lines
    textOverlayLines.sort((a, b) => a.MinTop - b.MinTop);

    // Group lines based on the tolerance range for MinTop values
    const tolerance = 2; // You can adjust this tolerance value as needed
    const groupedLines = [];
    let currentGroup = [textOverlayLines[0]];
    // console.log(textOverlayLines);

    for (let i = 1; i < textOverlayLines.length; i++) {
        const currentLine = textOverlayLines[i];
        const previousLine = textOverlayLines[i - 1];

        if (
            isMinTopWithinTolerance(
                currentLine.MinTop,
                previousLine.MinTop,
                tolerance
            )
        ) {
            currentGroup.push(currentLine);
        } else {
            groupedLines.push(currentGroup);
            currentGroup = [currentLine];
        }
    }
    groupedLines.push(currentGroup);
    // console.log(groupedLines);

    // Perform table header detection on each group of lines
    let header = {},
        index = 0,
        headerIndex = -1;
    for (const groupLines of groupedLines) {
        index += 1;
        const isHeader = isTableHeader(groupLines);
        if (isHeader) {
            header = groupLines;
            headerIndex = index;
            console.log(`This is the table header`);
        } else {
            console.log("This is not the table header");
        }
    }
    return { data: groupedLines, header: header, headerIndex };
}

// Read JSON data from data.json
fs.readFile("TextOverlay-0-1689946986940.json", "utf8", async (err, data) => {
    // fs.readFile("small-data.json", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading data.json:", err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);
        const result = await callMe(jsonData);
        console.log(result.data, result.header, result.headerIndex);
    } catch (parseError) {
        console.error("Error parsing JSON data:", parseError);
    }
});
