// gathering localStorage
let purchaseStorage = JSON.parse(localStorage.getItem("product"));
let article = "";

// rexExp
let nounRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
let emailRegex = new RegExp(
  '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
);
let addressRegex = new RegExp(
  '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+'
);

// fetch to get api's prices
fetch("http://localhost:3000/api/products")
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
    userForm();
    orderConfirmation();
  })
  .catch((error) => console.error(error));

// function to create article and show empty cart
function getItem() {
  // if cart empty
  if (purchaseStorage === null || purchaseStorage.length === 0) {
    let emptyStorage = document.createElement("article");
    document.querySelector("#cart__items").appendChild(emptyStorage);
    emptyStorage.textContent = "Votre panier est vide";
  } else {
    // if cart isn't empty
    for (let p in purchaseStorage) {
      let article = document.createElement("article");
      document.querySelector("#cart__items").appendChild(article);
      article.classList.add("cart__item");
      article.dataset.id = purchaseStorage[p].idProduit;
      article.dataset.color = purchaseStorage[p].color;

      // creation div img
      let divImage = document.createElement("div");
      article.appendChild(divImage);
      divImage.classList.add("cart__item__img");

      // insert img
      let imageInDiv = document.createElement("img");
      divImage.appendChild(imageInDiv);
      imageInDiv.src = purchaseStorage[p].imageUrl;
      imageInDiv.alt = purchaseStorage[p].imgAlt;

      // creation cart__item__content
      let divContent = document.createElement("div");
      article.appendChild(divContent);
      divContent.classList.add("cart__item__content");

      // creation div cart__item__content__description in cart__item__content
      let divContentDescription = document.createElement("div");
      divContent.appendChild(divContentDescription);
      divContentDescription.classList.add("cart__item__content__description");

      // creation h2 in cart__item__content__description
      let divContentDescriptionH2 = document.createElement("h2");
      divContentDescription.appendChild(divContentDescriptionH2);
      divContentDescriptionH2.textContent = purchaseStorage[p].nom;

      // creation <p></p> color
      let divContentDescriptionP = document.createElement("p");
      divContentDescription.appendChild(divContentDescriptionP);
      divContentDescriptionP.textContent = purchaseStorage[p].color;

      // creation <p></p> price
      let divContentDescriptionPrice = document.createElement("p");
      divContentDescription.appendChild(divContentDescriptionPrice);
      divContentDescriptionPrice.textContent = purchaseStorage[p].price + " €";

      // creation div cart__item__content__settings into div cart__item__content
      let divContentSettings = document.createElement("div");
      divContent.appendChild(divContentSettings);
      divContentSettings.classList.add("cart__item__content__settings");

      // creation div class="cart__item__content__settings__quantity"
      let divContentSettingsQuantity = document.createElement("div");
      divContentSettings.appendChild(divContentSettingsQuantity);
      divContentSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity");

      // creation p into div cart__item__content__settings__quantity
      let divContentSettingsQuantityP = document.createElement("p");
      divContentSettingsQuantity.appendChild(divContentSettingsQuantityP);
      divContentSettingsQuantityP.textContent = "Qté :";

      // creation <input>
      let inputQuantity = document.createElement("input");
      divContentSettingsQuantity.appendChild(inputQuantity);
      inputQuantity.setAttribute("type", "number");
      inputQuantity.classList.add("itemQuantity");
      inputQuantity.setAttribute("name", "itemQuantity");
      inputQuantity.setAttribute("min", "1");
      inputQuantity.setAttribute("max", "100");
      inputQuantity.value = purchaseStorage[p].quantity;

      // creation div cart__item__content__settings__delete
      let itemDelete = document.createElement("div");
      divContentSettings.appendChild(itemDelete);
      itemDelete.classList.add("cart__item__content__settings__delete");

      let itemDeleteP = document.createElement("p");
      itemDelete.appendChild(itemDeleteP);
      itemDeleteP.classList.add("deleteItem");
      itemDeleteP.textContent = "Supprimer";
    }
  }
}

// function total price + article quantity
function totalItems() {
  // quantity maths
  let eltQuantity = document.getElementsByClassName("itemQuantity");

  let totalQuantitySelect = 0;

  for (let i = 0; i < eltQuantity.length; i++) {
    totalQuantitySelect += eltQuantity[i].valueAsNumber;
  }
  let totalQuantityItems = document.getElementById("totalQuantity");
  totalQuantityItems.textContent = totalQuantitySelect;

  // price maths
  let totalPrice = 0;
  for (let i = 0; i < eltQuantity.length; i++) {
    totalPrice += eltQuantity[i].valueAsNumber * purchaseStorage[i].price;
  }
  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.textContent = totalPrice;
}

// function to modify products' quantity with addEventListener 'change'
function modifyQuantity() {
  const modifQuantity = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < modifQuantity.length; i++) {
    modifQuantity[i].addEventListener("change", function (event) {
      event.preventDefault();

      purchaseStorage[i].quantity = event.target.value;

      if (purchaseStorage[i].quantity == 0 || purchaseStorage[i].quantity > 100) {
        alert("Veuillez sélectionner une quantité comprise entre 1 et 100");
        location.reload();
      } else {
        localStorage.setItem("product", JSON.stringify(purchaseStorage));
        totalItems();
      }
    });
  }
}

// function to delete article
function deleteItem() {
  const delItem = document.querySelectorAll(".deleteItem");
  for (let d = 0; d < delItem.length; d++) {
    delItem[d].addEventListener("click", (e) => {
      e.preventDefault();
      // confirmation to delete article
      if (
        window.confirm(
          `Êtes- vous sur de vouloir supprimer ${purchaseStorage[d].quantity} ${purchaseStorage[d].nom} de couleur ${purchaseStorage[d].color} ?`
        )
      ) {
        let idDelItem = purchaseStorage[d].idProduit;
        let colorDelItem = purchaseStorage[d].color;

        purchaseStorage = purchaseStorage.filter((element) =>
          element.idProduit !== idDelItem || element.color !== colorDelItem);
        localStorage.setItem("product", JSON.stringify(purchaseStorage));
        location.reload();
      }
    });
  }
}

// Form
// create validation for form elements
function userForm() {
  // first name validation
  let firstName = document.getElementById('firstName');
  firstName.addEventListener('input', function () {
    if (nounRegex.test(firstName.value) === false) {
      document.getElementById('firstNameErrorMsg').textContent = 'Format du prénom incorrect';
    } else {
      document.getElementById('firstNameErrorMsg').textContent = '';
    }
  });

  // last name validation
  let lastName = document.getElementById('lastName');
  lastName.addEventListener('input', function () {
    if (nounRegex.test(lastName.value) === false) {
      document.getElementById('lastNameErrorMsg').textContent = 'Format du nom incorrect';
    } else {
      document.getElementById('lastNameErrorMsg').textContent = '';
    }
  });

  // address validation
  let address = document.getElementById('address');
  address.addEventListener('input', function () {
    if (addressRegex.test(address.value) === false) {
      document.getElementById('addressErrorMsg').textContent = 'Format de l\'adresse incorrecte';
    } else {
      document.getElementById('addressErrorMsg').textContent = '';
    }
  });

  // city validation
  let city = document.getElementById('address');
  city.addEventListener('input', function () {
    if (nounRegex.test(city.value) === false) {
      document.getElementById('cityErrorMsg').textContent = 'Format de la ville incorrecte';
    } else {
      document.getElementById('cityErrorMsg').textContent = '';
    }
  });

  // email validation
  let email = document.getElementById('address');
  email.addEventListener('input', function () {
    if (emailRegex.test(email.value) === false) {
      document.getElementById('emailErrorMsg').textContent = 'Format de l\'email incorrecte';
    } else {
      document.getElementById('emailErrorMsg').textContent = '';
    }
  });
}

// function order confirmation
function orderConfirmation() {
  const orderButton = document.getElementById('order');

  orderButton.addEventListener('click', (e) => {
    e.preventDefault();
    // error if empty cart
    if (!purchaseStorage) {
      alert('Il faut un article dans le panier pour passer commande');
    }
    // error if form isn't filled correctly
    else if (!nounRegex.test(firstName.value) || !nounRegex.test(lastName.value) || !emailRegex.test(email.value) || !nounRegex.test(city.value) || !addressRegex.test(address.value)) {
      alert('Veuillez remplir correctement tous les champs');
    } else {
      // create an array to gather products' id
      let productId = [];
      for (let i = 0; i < purchaseStorage.length; i++) {
        productId.push(purchaseStorage[i].idProduct);
      }

      // create contact object with form infos
      let buyOrder = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: productId,
      };

      // POST fetch option
      const postOptions = {
        method: 'POST',
        body: JSON.stringify(buyOrder),
        headers: {
          Accept: 'application/json', 'Content-type': 'application/json',
        }
      };

      // fetch to 'POST' order infos
      fetch('http://localhost:3000/api/products/order', postOptions)
        .then((response) => response.json())
        .then((data) => {
          // sending user to confirmation page
          const orderId = data.orderId;
          window.location.href = 'confirmation.html' + '?orderId=' + orderId;
        })
        .catch((error) => alert(error));
    }
  });
}