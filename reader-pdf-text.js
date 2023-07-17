async function Main() {
    const { readPdfText } = await import("pdf-text-reader");
    // new PdfReader().parseFileItems("CompanyName.pdf", (err, item) => {
    //     if (err) console.error("error:", err);
    //     else if (!item) console.warn("end of file");
    //     else if (item.text) {
    //         const { json } = item;
    //         console.log(item.R);
    //     }
    // });
    const pages = await readPdfText('bac.pdf');
    console.log(pages);
}
Main();
