import express from 'express';
import ProductManager from './classes/ProductManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('./src/files/Products.json');

app.get('/productos', async (req, res) => {
    const limit = req.query.limit;
    const productos = await productManager.getProducts();
    if (limit != undefined) {
        res.json(productos.slice(0, limit));
    } else {
        res.json(productos);
    }
});

app.get('/productos/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    const producto = await productManager.getProductById(pid);
    if (producto != undefined) {
        res.json(producto);
    } else {
        res.json({ error: 'Producto no encontrado' });
    }
});

app.listen(8080, () => console.log('El servidor inició en el puerto 8080'));