// URLSearchParams method
const requestString = window.location.search;
const urlParams = new URLSearchParams(requestString);
const id = urlParams.get('id');

let article = '';

// fetch to retrieve api products
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => {
        response.json();
    })
    .then((data) => {
        return productsIdList(data);
    })
    .catch((error) => console.error(error));

// create products article
function productsIdList(article) {
    // create img
    let elementImg = document.createElement('img');
    document.querySelector('.item__img').appendChild(elementImg);
    elementImg.src = article.imageUrl;
    elementImg.alt = article.altTxt;

    // id title
    let elementTitle = document.getElementById('title');
    elementTitle.textContent = article.name;

    // id price
    let elementPrice = document.getElementById('price');
    elementPrice.textContent = article.price;

    // id description
    let elementDescription = document.getElementById('description');
    elementDescription.textContent = article.description;

    // colors
    for (let colors of article.colors) {
        let elementsColor = document.createElement('option');
        document.querySelector('#colors').appendChild(elementsColor);
        elementsColor.value = colors;
        elementsColor.textContent = colors;
    }
}