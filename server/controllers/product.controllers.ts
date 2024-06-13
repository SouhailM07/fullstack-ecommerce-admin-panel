import { Request, Response } from "express";
import Product from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
  let products = await Product.find({});
  res.status(201).send(products);
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("product was not found");
    }
    res.status(201).send(product);
  } catch (error: any) {
    res.status(500).send(error.errmsg);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    let { name, price, description, img, imgName } = req.body;
    let newProduct = new Product({ name, price, description, img, imgName });
    await newProduct.save();
    res.status(201).send("new product was added successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const values = await req.body;
    let updateProduct = await Product.findByIdAndUpdate(id, values);
    if (!updateProduct) {
      return res.status(404).send("product was not found");
    }
    res.status(201).send(updateProduct);
  } catch (error: any) {
    res.status(500).send(error.errmsg);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let editProduct = await Product.findByIdAndDelete(id);
    if (!editProduct) {
      return res.status(404).send("product was not found");
    }
    res.status(201).send("Product was deleted successfully");
  } catch (error: any) {
    res.status(500).send(error.errmsg);
  }
};
