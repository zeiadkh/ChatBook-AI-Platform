import { Router } from "express";
import catchError from "../../utils/catchError.js";
import summarizer from "./sum.controller.js";
import isValid from "../../middleware/isValid.js";
import { summarySchema } from "./sum.validation.js";


const router = new Router();
router.post("/:bId/:sPg/:ePg", isValid(summarySchema), catchError(summarizer))
export default router;