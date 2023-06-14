import express from 'express';
import products from './routes/products.router.js';
import carts from './routes/carts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', products);
app.use('/api/carts', carts);

app.listen(8080, () => console.log('El servidor inició en el puerto 8080'));