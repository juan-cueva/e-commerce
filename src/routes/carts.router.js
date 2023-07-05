import { Router } from 'express';
import CartManager from '../dao/dbManagers/carts.js';

const cartManager = new CartManager();

const router = Router();

router.post('/', async(req, res) => {
    try {
        let data = await cartManager.createCart()
        res.json(data)
    } catch (error) {
        res.status(401);
    }
});

router.get('/:cid', async(req, res) => {
    const cid = String(req.params.cid);
    const products = await cartManager.getProductsInCart(cid);
    console.log(products);
    if(products != null) {
        res.json(products);
    } else {
        res.json({ error: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', async(req, res) => {
    const cid = String(req.params.cid);
    const pid = Number(req.params.pid);
    try {
        await cartManager.addProductToCart(cid, pid)
        .then(res.json({ status: 'success', message: 'Se agregó el producto al carrito' }));
    } catch (error) {
        res.status({ status: 'failed', message: 'El producto no pudó ser añadido al carrito', error: error});
    }
});

export default router;