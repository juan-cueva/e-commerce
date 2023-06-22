const socket = io();

const products = []

const productsForm = document.getElementById('productsForm');

productsForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
        title: e.target.title.value,
        description: e.target.description.value,
        price: Number(e.target.price.value),
        thumbnails: e.target.thumbnails.value,
        stock: Number(e.target.stock.value),
        status: e.target.status.value === "true" ? true : false,
        category: e.target.category.value,
        accion: 'guardar'
    }
    console.log(data);
    socket.emit('eventos', data);
    productsForm.reset();
});
