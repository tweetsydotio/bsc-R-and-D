const main = async (resource = `CompanyName.pdf`) => {
    const PDFParser = (await import("pdf2json")).default;
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", (errData) =>
        console.error(errData.parserError)
    );
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
        // fs.writeFile("one.json", JSON.stringify(pdfData));
        // const d = pdfData.Pages[0].Texts[0].R[0].T
        // const texts = JSON.stringify(pdfData.Pages[0].Texts);

        console.log(pdfData.Pages[0].Texts);
        // for (const item of pdfData.Pages[0].Texts) {
        //     const { T, ...rest } = item.R[0];
        //     console.log(decodeURIComponent(T), rest);
        // }
    });
    pdfParser.loadPDF(resource);
};
main()
