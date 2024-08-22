import express from "express";
import {
  deleteById,
  getProducts,
  getProductsById,
  getProductsByCategory,
  getProductsByPriceRange,
} from "../controllers/productsController.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.get("/id/:id", getProductsById);

productsRouter.delete("/id/:id", deleteById);

productsRouter.get("/category", getProductsByCategory);

productsRouter.get("/price", getProductsByPriceRange);

export default productsRouter;
