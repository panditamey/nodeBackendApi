import express from "express";
import {
  deleteById,
  getProducts,
  getProductsById,
  getProductsByCategory,
  getProductsByPriceRange,
  addProduct,
} from "../controllers/productsController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.post("/", addProduct);

productsRouter.get("/id/:id", getProductsById);

productsRouter.get("/category", getProductsByCategory);

productsRouter.get("/price", getProductsByPriceRange);

productsRouter.delete("/id/:id", authenticateToken, deleteById);

export default productsRouter;
