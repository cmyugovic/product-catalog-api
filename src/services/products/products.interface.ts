import { Document } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  brand: string;
  image: string;
  price: number;
  deletedAt: Date;
}

export interface IProductDocument extends IProduct, Document {}
