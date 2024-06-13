import { Router } from "express";
// todo / controllers
import {
  createProduct,
  deleteProduct,
  editProduct,
  getOneProduct,
  getProducts,
} from "../controllers/product.controllers";

const router = Router();

router.get("", getProducts);
router.get("/:id", getOneProduct);
router.post("/create", createProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
