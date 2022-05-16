// fetch (GET) request to retrieve every products
const url = "http://localhost:3000/api/products"
fetch(url)
  .then((response) => response.json())
  .then((data) => productsList(data))
  .catch((error) => console.log('Error : ' + error));

// insert elements in DOM
function productsList(data) {
  for (let i = 0; i < data.length; i++) {

    // element "a"
    let section = document.getElementById('items');
    let productLink = document.createElement('a');
    section.appendChild(productLink);
    productLink.href = `./product.html?id=${data[i]._id}`;

    // element "article"
    let productArticle = document.createElement('article');
    productLink.appendChild(productArticle);

    // element "img"
    let productImg = document.createElement('img');
    productArticle.appendChild(productImg);
    productImg.src = data[i].imageUrl;
    productImg.alt = data[i].altTxt;

    // element "h3" 
    let productName = document.createElement('h3');
    productArticle.appendChild(productName);
    productName.classList.add('productName');
    productName.textContent = data[i].name;

    // element "p"
    let productDescription = document.createElement('p');
    productArticle.appendChild(productDescription);
    productDescription.classList.add('productDescription');
    productDescription.textContent = data[i].description;
  }
}