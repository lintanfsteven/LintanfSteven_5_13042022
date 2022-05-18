// URLSearchParams method
const requestString = window.location.search;
const urlParams = new URLSearchParams(requestString);
const id = urlParams.get('id');

let article = '';

// fetch to retrieve api products
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => productsIdList(data))
    .catch((error) => console.error(error));

// create products article