import { IProduct } from "./products.interface";
import mongoose = require("mongoose");
import { Request, Response, NextFunction } from "express";
import Product from "./products.model";
import { buildParams } from "../../helpers/buildParams";
import { palindrome } from "../../helpers/palindrome";
class productsControllerClass {
  private validParams: (keyof IProduct)[] = [
    "name",
    "description",
    "image",
    "brand",
    "price",
  ];

  public index = async (req: Request, res: Response, next: NextFunction) => {
    const { fq } = req.query as any;
    const query: any = { deletedAt: { $exists: false } };
    let isPalindrome = false;
    if (typeof fq?.brand === "string" && fq.brand.length > 3) {
      let re = new RegExp(fq.brand, "i");
      query.brand = re;
      if (palindrome(fq.brand)) {
        isPalindrome = true;
      }
    } else if (
      typeof fq?.description === "string" &&
      fq.description.length > 3
    ) {
      let re = new RegExp(fq.description, "i");
      query.description = re;
      if (palindrome(fq.description)) {
        isPalindrome = true;
      }
    } else if (mongoose.Types.ObjectId.isValid(fq?._id)) {
      query._id = fq._id;
      if (palindrome(fq._id)) {
        isPalindrome = true;
      }
    }

    let products = await Product.find(query);
    if (isPalindrome) {
      products.forEach(
        (product) => (product.price = Math.floor(product.price * 0.8))
      );
    }
    res.json(products);
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const params = buildParams<IProduct>(this.validParams, req.body);
    const product = await Product.create(params);
    res.json(product);
  };

  public show = async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      res.status(404).send();
    } else {
      res.json(product);
    }
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
