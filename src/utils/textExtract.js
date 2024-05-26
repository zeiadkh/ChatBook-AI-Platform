import fs from "fs";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import path from "path";
import PDF from "pdf-parse-fork";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to extract text from a specific chapter in a PDF file
export default async function extractTextFromPdf(pdfPath, spg, epg) {
  spg = parseInt(spg)
  epg = parseInt(epg)
  spg = spg + 1;
  try {
    let dataBuffer = fs.readFileSync(pdfPath);

    const pdfData = await PDF(dataBuffer);
    if (!pdfData.text) {
      return "Text not found in PDF";
    }

    const numPages = pdfData.numpages;

    // Error checking for start and end page numbers
    if (spg < 1 || spg > numPages) {
      return `Invalid start page number: ${spg}`;
    }
    if (epg < 1 || epg > numPages) {
      return { error: `Invalid end page number: ${epg}` };
    }
    if (epg < spg) {
      return `End page number must be greater than or equal to start page number: ${spg} < ${epg}`;
    }

    let text = "";
    const pageTexts = pdfData.text.split("\n\n");
    for (let i = spg - 1; i < epg; i++) {
      text += pageTexts[i];
    }

    console.log("Extracted Text:");
    // console.log(text);

    return text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return error;
  }
}

// download file
export const downloadFile = async (url, filePath) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error downloading file: ${response.statusText}`);
  }

  const buffer = await response.buffer();

  fs.writeFileSync(filePath, buffer, "binary");
};
