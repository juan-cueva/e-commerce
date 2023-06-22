import { Router } from "express";
import ProductManager from "../dao/fileManagers/ProductManager.js";

const productManager = new ProductManager('./src/files/Products.json');

const router = Router();

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products} );
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {products} );
});

export default router;
