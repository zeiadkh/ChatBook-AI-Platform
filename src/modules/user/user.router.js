import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import catchError from "../../utils/catchError.js";
import { addFavourite, getUserInfo, removeFavourite } from "./user.controller.js";
import isValid from "../../middleware/isValid.js";
import { idCheckSchema } from "./user.validation.js";


const router = new Router();

router.get("/", isAuthenticated, catchError(getUserInfo))
router.patch("/:bId", isAuthenticated, isValid(idCheckSchema), catchError(addFavourite))
router.delete("/:bId", isAuthenticated, isValid(idCheckSchema), catchError(removeFavourite))

export default router;