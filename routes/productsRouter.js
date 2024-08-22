import express from 'express';
import { getProducts, getProductsById } from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.get('/',getProducts);

productsRouter.get('/:id',getProductsById);

export default productsRouter;