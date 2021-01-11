import { IProduct } from "./products.interface";
import mongoose = require("mongoose");
import { Request, Response, NextFunction } from "express";
import Product from "./products.model";
import { buildParams } from "../../helpers/buildParams";
class productsControllerClass {
  private validParams: (keyof IProduct)[] = [
    "name",
    "description",
    "image",
    "brand",
    "price",
  ];

  public index = async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({ deletedAt: { $exists: false } });
    res.json(products);
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const params = buildParams<IProduct>(this.validParams, req.body);
    const product = await Product.create(params);
    res.json(product);
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      res.status(404).send();
    } else {
      const params = buildParams<IProduct>(this.validParams, req.body);
      Object.assign(product, params);
      await product.save();
      res.json(product);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      res.status(404).send();
    } else {
      product.deletedAt = new Date();
      await product.save();
      res.json(product);
    }
  };
}

export const productsController = new productsControllerClass();

export default productsController;
