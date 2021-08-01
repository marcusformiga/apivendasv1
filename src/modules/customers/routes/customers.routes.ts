import { Router } from "express"
import { CustomerController } from "../controllers/CustomerController"
import { celebrate, Joi, Segments } from "celebrate"

export const customersRoutes = Router()
const customerController = new CustomerController()

customersRoutes.get("/", customerController.list)
customersRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customerController.create,
)
customersRoutes.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.listOne,
)

customersRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.remove,
)
customersRoutes.patch("/:id", customerController.update)
