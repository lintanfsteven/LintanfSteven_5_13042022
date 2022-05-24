// gathering localStorage
let purchaseStorage = JSON.parse(localStorage.getItem('product'));

// fetch to get api's prices
fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((data) => {
        if (purchaseStorage) {
            for (p of purchaseStorage) {
                const product = data.find((d) => d.id === p.idProduct);
                if (product) {
                    p.price = product.price;
                }
            }
        }
        getItem();
        totalItems();
        modifyQuantity();
        deleteItem();
        getForm();
        orderForm();
    })
    .catch((error) => console.error(error));

// function to create article and show empty cart