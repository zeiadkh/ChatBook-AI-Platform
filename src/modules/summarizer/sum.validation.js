import joi from 'joi'
import { Types } from 'mongoose';

export const idValidator = (value, helper) =>
  Types.ObjectId.isValid(value) ? true : helper.message("Invalid id");

export const summarySchema= joi.object({
    bId: joi.string().custom(idValidator).required(),
    sPg:joi.number(),
    ePg:joi.number()
    
  
}).required()