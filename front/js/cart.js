// gathering localStorage
let purchaseStorage = JSON.parse(localStorage.getItem('product'));
let article = '';

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
    })
    .catch((error) => console.error(error));

// function to create article and show empty cart
function getItem() {
    // if cart empty
    if (purchaseStorage === null || purchaseStorage.length === 0) {
      let emptyStorage = document.createElement('article');
      document.querySelector('#cart__items').appendChild(emptyStorage);
      emptyStorage.textContent = 'Votre panier est vide';
    } else {
      // if cart isn't empty
      for (let p in purchaseStorage) {
        let article = document.createElement('article');
        document.querySelector('#cart__items').appendChild(article);
        article.classList.add('cart__item');
        article.dataset.id = purchaseStorage[p].idProduit;
        article.dataset.color = purchaseStorage[p].color;
  
        // creation div img
        let divImage = document.createElement('div');
        article.appendChild(divImage);
        divImage.classList.add('cart__item__img');
  
        // insert img
        let imageInDiv = document.createElement('img');
        divImage.appendChild(imageInDiv);
        imageInDiv.src = purchaseStorage[p].imageUrl;
        imageInDiv.alt = purchaseStorage[p].imgAlt;
  
        // creation cart__item__content
        let divContent = document.createElement('div');
        article.appendChild(divContent);
        divContent.classList.add('cart__item__content');
  
        // creation div cart__item__content__description in cart__item__content
        let divContentDescription = document.createElement('div');
        divContent.appendChild(divContentDescription);
        divContentDescription.classList.add('cart__item__content__description');
  
        // creation h2 in cart__item__content__description
        let divContentDescriptionH2 = document.createElement('h2');
        divContentDescription.appendChild(divContentDescriptionH2);
        divContentDescriptionH2.textContent = purchaseStorage[p].nom;
  
        // creation <p></p> color
        let divContentDescriptionP = document.createElement('p');
        divContentDescription.appendChild(divContentDescriptionP);
        divContentDescriptionP.textContent = purchaseStorage[p].color;
  
        // creation <p></p> price
        let divContentDescriptionPrice = document.createElement('p');
        divContentDescription.appendChild(divContentDescriptionPrice);
        divContentDescriptionPrice.textContent = purchaseStorage[p].price + ' €';
  
        // creation div cart__item__content__settings into div cart__item__content
        let divContentSettings = document.createElement('div');
        divContent.appendChild(divContentSettings);
        divContentSettings.classList.add('cart__item__content__settings');
  
        // creation div class="cart__item__content__settings__quantity"
        let divContentSettingsQuantity = document.createElement('div');
        divContentSettings.appendChild(divContentSettingsQuantity);
        divContentSettingsQuantity.classList.add(
          'cart__item__content__settings__quantity'
        );
  
        // creation p into div cart__item__content__settings__quantity
        let divContentSettingsQuantityP = document.createElement('p');
        divContentSettingsQuantity.appendChild(divContentSettingsQuantityP);
        divContentSettingsQuantityP.textContent = 'Qté :';
  
        // creation <input>
        let inputQuantity = document.createElement('input');
        divContentSettingsQuantity.appendChild(inputQuantity);
        inputQuantity.setAttribute('type', 'number');
        inputQuantity.classList.add('itemQuantity');
        inputQuantity.setAttribute('name', 'itemQuantity');
        inputQuantity.setAttribute('min', '1');
        inputQuantity.setAttribute('max', '100');
        inputQuantity.value = purchaseStorage[p].quantity; // A REVOIR
  
        // creation div cart__item__content__settings__delete
        let itemDelete = document.createElement('div');
        divContentSettings.appendChild(itemDelete);
        itemDelete.classList.add('cart__item__content__settings__delete');
  
        let itemDeleteP = document.createElement('p');
        itemDelete.appendChild(itemDeleteP);
        itemDeleteP.classList.add('deleteItem');
        itemDeleteP.textContent = 'Supprimer';
      }
    }
  }
  
  // function total price + article quantity
  function totalItems() {
    // quantity maths
    let eltQuantity = document.getElementsByClassName('itemQuantity');
  
    let totalQuantitySelect = 0;
  
    for (let i = 0; i < eltQuantity.length; i++) {
      totalQuantitySelect += eltQuantity[i].valueAsNumber;
    }
    let totalQuantityItems = document.getElementById('totalQuantity');
    totalQuantityItems.textContent = totalQuantitySelect;
  
    // price maths
    let totalPrice = 0;
    for (let i = 0; i < eltQuantity.length; i++) {
      totalPrice += eltQuantity[i].valueAsNumber * purchaseStorage[i].price;
    }
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.textContent = totalPrice;
  }
  
  // function to modify products' quantity with addEventListener 'change'
  function modifyQuantity() {
    const modifQuantity = document.querySelectorAll('.itemQuantity');
  
    for (let i = 0; i < modifQuantity.length; i++) {
      modifQuantity[i].addEventListener('change', function (event) {
        event.preventDefault();
  
        purchaseStorage[i].quantity = event.target.value;
  
        if (
          purchaseStorage[i].quantity == 0 ||
          purchaseStorage[i].quantity > 100
        ) {
          alert('Veuillez sélectionner une quantité comprise entre 1 et 100');
          location.reload();
        } else {
          localStorage.setItem('produit', JSON.stringify(purchaseStorage));
          totalItems();
        }
      });
    }
  }
  
  // function to delete article
  function deleteItem() {
    const delItem = document.querySelectorAll('.deleteItem');
    for (let d = 0; d < delItem.length; d++) {
      delItem[d].addEventListener('click', (e) => {
        e.preventDefault();
        // confirmation to delete article
        if (
          window.confirm(
            `Êtes- vous sur de vouloir supprimer ${purchaseStorage[d].quantity} ${purchaseStorage[d].nom} de couleur ${purchaseStorage[d].color} ?`
          )
        ) {
          let idDelItem = purchaseStorage[d].idProduit;
          let colorDelItem = purchaseStorage[d].color;
  
          purchaseStorage = purchaseStorage.filter(
            (element) =>
              element.idProduit !== idDelItem || element.color !== colorDelItem
          );
          localStorage.setItem('produit', JSON.stringify(purchaseStorage));
          location.reload();
        }
      });
    }
}