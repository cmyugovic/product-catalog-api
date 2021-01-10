import mongoose = require("mongoose");
import { NextFunction } from "express";
import { IProductDocument } from "./products.interface";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [255, "FieldIsTooLong"],
    },
    description: {
      type: String,
      default: "",
      maxlength: [10000, "FieldIsTooLong"],
    },
    brand: {
      type: String,
      required: true,
      maxlength: [255, "FieldIsTooLong"],
    },
    image: {
      type: String,
      required: true,
      maxlength: [255, "FieldIsTooLong"],
    },
    price: {
      type: Number,
      required: true,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProductDocument>("Product", schema);

export default Product;
