var pdf_table_extractor = require("pdf-table-extractor");

//PDF parsed
function success(result) {
    console.log(JSON.stringify(result));
}

//Error
function error(err) {
    console.error('Error: ' + err);
}

pdf_table_extractor("./table-bs.pdf", success, error);
