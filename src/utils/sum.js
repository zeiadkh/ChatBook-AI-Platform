import Book from "../../DB/models/book.model.js";
import extractTextFromPdf, { downloadFile } from "./textExtract.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";

export async function summarize(bookId, sPg, ePg) {
  // download pdf from cloudinary
  const getBook = await Book.findById(bookId);
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const fullUrl = getBook?.book?.url;

  const pdfId = fullUrl.split("upload/")[1];
  const cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/${pdfId}`;
  const filePath = path.join(__dirname, `../../temp/${bookId}.pdf`);

  await downloadFile(cloudinaryUrl, filePath)
    .then(() => {
      console.log("PDF downloaded successfully");
    })
    .catch((error) => {
      console.error("Error while downloading PDF:", error);
    });

  // convert pdf to text
  let data = await extractTextFromPdf(filePath, sPg, ePg).catch((err) => {
    return err;
  });

  //model

  async function query(data) {
    if (data.error) return { error: data.error };
    const response = await fetch("https://c3bd-34-126-64-144.ngrok-free.app/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ text: data }),
    });
    if (!response.ok) return {error:"sorry there is a problem with the summariztion model connection."};
    let result = await response.json();
    
    return { full: data, summary: result.summary.replace(/\r?\n|\r/g, '') };
  }

  return query(data)
    .then((response) => {
      fs.unlinkSync(filePath, (err) => {
        if (err) return { error: err };
        console.log("removed temp successfully");
      });
      return response;
    })
    .catch((err) => console.log(err, "query error"));
}

// next tasks:
//     . favourites
