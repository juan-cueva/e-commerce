import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const productManager = new ProductManager('./src/files/Products.json');

const router = Router();

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const productos = await productManager.getProducts();
    if (limit != undefined) {
        res.json(productos.slice(0, limit));
    } else {
        res.json(productos);
    }
});

router.get('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    const producto = await productManager.getProductById(pid);
    if (producto != undefined) {
        res.json(producto);
    } else {
        res.json({ error: 'Producto no encontrado' });
    }
});

router.post('/', async (req, res) => {
    const producto = req.body;
    try {
        await productManager.addProduct(producto)
            .then(res.json({ status: 'success', message: 'Se creó el producto' }))
    } catch (error) {
        res.json({ status: 'failed', message: 'Producto no pudó ser creado', error: error })
    }

});

router.put('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    const producto = req.body;
    try {
        await productManager.updateProduct(pid, producto)
            .then(res.json({ status: 'success', message: 'Se actualizó el producto' }))
    } catch (error) {
        res.json({ status: 'failed', message: 'Producto no pudó ser actualizado', error: error })
    }
});

router.delete('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    try {
        await productManager.deleteProduct(pid)
            .then(res.json({ status: 'success', message: 'Se eliminó el producto' }));
    } catch (error) {
        res.json({ status: 'failed', message: 'Producto no pudó ser eliminado', error: error })
    }
});

export default router;