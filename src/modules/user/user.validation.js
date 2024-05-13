import joi from 'joi'
import { Types } from 'mongoose';
export const idValidator = (value, helper) =>
  Types.ObjectId.isValid(value) ? true : helper.message("Invalid id");

export const idCheckSchema = joi.object({
    bId: joi.string().custom(idValidator).required(),
}).required()