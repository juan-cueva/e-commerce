document.querySelectorAll('.delete-product').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.id;
        console.log(productId);
        fetch('/api/carts/' + cart + '/products/' + productId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.href = '/carts/' + cart;
        })
        .catch((error) => {
            console.error('Error:' , error);
        });
    });
});