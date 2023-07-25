const socket = io();
const messages = [];
let email = "";

const form = document.getElementById('mensajeForm');

Swal.fire({
    title: "Enter your email address",
    input: "text",
    text: "Enter your email",
    inputValidator: (value) => {
      return !value && "You need to write something!";
    },
    allowOutsideClick: false,
  }).then((result) => {
    email = result.value;
  });

form.addEventListener('submit', e => {
    console.log(e.target.message.value);
    e.preventDefault();
    const data = {
        user: email,
        message: e.target.message.value,
        accion: 'guardarMensaje'
    }
    socket.emit('mensaje', data);
    form.reset();
});


// const products = []

// const productsForm = document.getElementById('productsForm');

// productsForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const data = {
//         title: e.target.title.value,
//         description: e.target.description.value,
//         price: Number(e.target.price.value),
//         thumbnails: e.target.thumbnails.value,
//         stock: Number(e.target.stock.value),
//         status: e.target.status.value === "true" ? true : false,
//         category: e.target.category.value,
//         accion: 'guardar'
//     }
//     console.log(data);
//     socket.emit('eventos', data);
//     productsForm.reset();
// });

