import { Router } from "express";
import ProductsValidation from "./products.validation";
import ProductsController from "./products.controller";
export const ProductsRouter = Router();
ProductsRouter.route("/").get(
  ProductsValidation.index,
  ProductsController.index
);
