import joi from "joi";
export const registerSchema = joi
  .object({
    userName: joi.string().min(3).max(20).required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
    role: joi.string().valid("admin", "user"),
  })
  .required();

export const loginSchema = joi
  .object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().required(),
  })
  .required();

export const forgetSchema = joi
  .object({
    email: joi.string().email().lowercase().required(),
  })
  .required();

export const resetSchema = joi
  .object({
    forgetCode: joi.string().min(6).required(),
    password: joi.string().required(),
    cPassword: joi.string().valid(joi.ref("password")).required(),
  })
  .required();
