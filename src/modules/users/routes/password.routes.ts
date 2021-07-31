import { Router } from "express"
import { ForgotPasswordController } from "../controllers/ForgotPasswordController"
import { celebrate, Joi, Segments } from "celebrate"

export const passwordRoutes = Router()
const forgotPasswordController = new ForgotPasswordController()

passwordRoutes.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  forgotPasswordController.create,
)

