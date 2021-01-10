import { Document } from "mongoose";

export interface IProduct {}

export interface IProductDocument extends IProduct, Document {
  createdAt: Date;
  updatedAt: Date;
}
