import { Router } from "express"
import { ProductController } from "../controllers/ProductControllers"
import { celebrate, Joi, Segments } from "celebrate"
export const productRouter = Router()
const productController = new ProductController()

productRouter.get("/", productController.listAll)
productRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required().precision(2),
      quantity: Joi.number().integer().required(),
    },
  }),
  productController.create,
)
productRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.listOne,
)
productRouter.put("/:id", productController.update)
productRouter.delete("/:id", productController.remove)
