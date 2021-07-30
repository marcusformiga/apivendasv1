import { Router } from "express"
import { UserController } from "../controllers/UserController"
import { Joi, Segments, celebrate } from "celebrate"
import { isAuthenticated } from "../../../shared/middlewares/isAuthenticated"
import multer from "multer"
import uploadConfig from "../../../shared/config/upload"
import { UserAvatarController } from "../controllers/UserAvatarController"

export const usersRouter = Router()
const userController = new UserController()
const userAvatarController = new UserAvatarController()
const upload = multer(uploadConfig)

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
usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  userAvatarController.upload,
)
