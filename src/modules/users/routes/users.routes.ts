import { Router } from "express"
import { UserController } from "../controllers/UserController"
import { Joi, Segments, celebrate } from "celebrate"

export const usersRouter = Router()
const userController = new UserController()

usersRouter.get("/", userController.listAll)
usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
)
