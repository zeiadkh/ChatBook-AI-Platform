import joi from 'joi'
import { Types } from 'mongoose';
export const idValidator = (value, helper) =>
  Types.ObjectId.isValid(value) ? true : helper.message("Invalid id");

export const createSchema = joi.object({
  bookName: joi.string().min(3).required(),
  description: joi.string().min(10).required(),
  author: joi.string().min(3).required(),
 
}).required()

export const idCheckSchema = joi.object({
    bId: joi.string().custom(idValidator).required(),
}).required()

export const updateSchema = joi.object({
  bId: joi.string().custom(idValidator).required(),
  bookName: joi.string().min(3),
  description: joi.string().min(10),
  author: joi.string().min(3)

}).required()


