import { Router } from 'express';
import CartManager from '../classes/CartManager.js';

const cartManager = new CartManager('./src/files/Carts.json');

const router = Router();

router.post('/', async(req, res) => {
    try {
        await cartManager.createCart()
        .then(res.json({ status: 'success', message: 'Se creó el carrito' }));
    } catch (error) {
        res.json({ status: 'failed', message: 'Producto no pudó ser creado', error: error });
    }
});

router.get('/:cid', async(req, res) => {
    const cid = Number(req.params.cid);
    const products = await cartManager.getProductsInCart(cid);
    if(products != undefined) {
        res.json(products);
    } else {
        res.json({ error: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', async(req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    try {
        await cartManager.addProductToCart(cid, pid)
        .then(res.json({ status: 'success', message: 'Se agregó el producto al carrito' }));
    } catch (error) {
        res.json({ status: 'failed', message: 'El producto no pudó ser añadido al carrito', error: error });
    }
});

export default router;