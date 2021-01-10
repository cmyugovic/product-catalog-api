import mongoose = require("mongoose");
import { Request, Response, NextFunction } from "express";

class productsControllerClass {
  public index = async (req: Request, res: Response, next: NextFunction) => {};
}

export const productsController = new productsControllerClass();

export default productsController;
