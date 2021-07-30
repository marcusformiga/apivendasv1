import { Router } from "express"
import { UserController } from "../controllers/UserController"
import { Joi, Segments, celebrate } from "celebrate"
import { isAuthenticated } from "../../../shared/middlewares/isAuthenticated"

export const usersRouter = Router()
const userController = new UserController()

usersRouter.get("/", isAuthenticated, userController.listAll)
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
