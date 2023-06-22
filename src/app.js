import express from 'express';
import handlebars from 'express-handlebars'

import products from './routes/products.router.js';
import carts from './routes/carts.router.js';
import views from './routes/views.router.js';
import __dirname from './utils.js';
import { Server } from 'socket.io'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/', views);

const httpServer = app.listen(8080, () => console.log('El servidor inició en el puerto 8080'));

const io = new Server(httpServer);

io.on('connection', socket => {
    console.log('Cliente conectado');
    socket.on('eventos', data => {

    })
})