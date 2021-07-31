import { Router } from "express"
import { ForgotPasswordController } from "../controllers/ForgotPasswordController"
import { celebrate, Joi, Segments } from "celebrate"
import { ResetPasswordController } from "../controllers/ResetPasswordController"

export const passwordRoutes = Router()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRoutes.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  forgotPasswordController.create,
)
passwordRoutes.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref("password")),
    },
  }),
  resetPasswordController.create,
)
