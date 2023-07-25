import { Router } from "express";
import ProductManager from "../dao/fileManagers/ProductManager.js";

import messageManager from '../dao/dbManagers/messages.js';
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

router.get('/chat', async (req, res) => {
    res.render('chat');
});

export default router;
