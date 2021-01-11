import { Router } from "express";
import ProductsController from "./products.controller";
export const ProductsRouter = Router();
ProductsRouter.route("/")
  .get(ProductsController.index)
  .post(ProductsController.create);

ProductsRouter.route("/:productId")
  .get(ProductsController.show)
  .put(ProductsController.update)
  .delete(ProductsController.delete);
