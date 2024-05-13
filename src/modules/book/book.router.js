import { isAuthenticated } from "../../middleware/authentication.js";
import isAuthroized from "../../middleware/authrization.js";
import isValid from "../../middleware/isValid.js";
import uploadFile, { typesObj } from "../../utils/multer.js";
import { createSchema,  idCheckSchema, updateSchema } from "./book.validation.js";
import { Router } from "express";
import { create, deleteBook, get, getSingleBook,update } from "./book.controller.js";
import catchError from "../../utils/catchError.js";

const router = new Router();

router.post(
  "/",
  isAuthenticated,
  isAuthroized("admin"),
  uploadFile().fields([
    { name: "book", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  isValid(createSchema),
  catchError(create)
);

router.patch(
  "/:bId",
  isAuthenticated,
  isAuthroized("admin"),
  uploadFile().fields([
    { name: "book", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  isValid(updateSchema),
  catchError(update)
);

router.delete(
  "/:bId",
  isAuthenticated,
  isAuthroized("admin"),
  isValid(idCheckSchema),
  catchError(deleteBook)
);
router.get(
  "/",
  catchError(get)
);

router.get("/:bId", isValid(idCheckSchema), catchError(getSingleBook))

export default router;
