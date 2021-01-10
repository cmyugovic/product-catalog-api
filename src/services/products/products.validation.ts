import mongoose = require("mongoose");
import { Request, Response, NextFunction } from "express";

class productsValidationClass {
  public index = async (req: Request, res: Response, next: NextFunction) => {};
}

export const productsValidation = new productsValidationClass();

export default productsValidation;
