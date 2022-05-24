// URLSearchParams method
const requestString = window.location.search;
const urlParams = new URLSearchParams(requestString);
const id = urlParams.get('id');
const urlId = 'http://localhost:3000/api/products' + `/${id}`

// fetch to retrieve api products
fetch(urlId)
    .then((response) => response.json())
    .then((data) => productsIdList(data))
    .catch((error) => console.error(error));

// create products article
function productsIdList(data) {
    // create img
    let elementImg = document.createElement('img');
    document.querySelector('.item__img').appendChild(elementImg);
    elementImg.src = data.imageUrl;
    elementImg.alt = data.altTxt;

    // id title
    let elementTitle = document.getElementById('title');
    elementTitle.textContent = data.name;

    // id price
    let elementPrice = document.getElementById('price');
    elementPrice.textContent = data.price;

    // id description
    let elementDescription = document.getElementById('description');
    elementDescription.textContent = data.description;

    // colors
    for (let colors of data.colors) {
        let elementsColor = document.createElement('option');
        document.querySelector('#colors').appendChild(elementsColor);
        elementsColor.value = colors;
        elementsColor.textContent = colors;
    }
    // function onClick
    onClick(data)
}

function onClick(data) {
    // add button + EventListener on click
    const button = document.querySelector('#addToCart');
    button.addEventListener('click', ($event) => {
        // gathering quantities/colors
        let selectColor = colorSelect.value;
        let selectQuantity = quantitySelect.value;

        if (
            selectQuantity == 0 || selectQuantity > 100 || selectColor == null || selectColor == ''
            ) {
                alert(
                //error if the user doesn't select color/quantity
                'Veuillez renseigner une quantité comprise entre 1 et 100 et une couleur'
                );
                return;
            } else {
                // gathering article infos to add
                let info = {
                    idProduct: id,
                    color: selectColor,
                    quantity: Number(selectQuantity),
                    nom: data.name,
                    description: data.description,
                    imageUrl: data.imageUrl,
                    imgAlt: data.altTxt,
                };

                // localStorage init
                let purchaseStorage = JSON.parse(localStorage.getItem('product'));

                // warning when user add article into the cart

                const alertConfirmation = () => {
                    if (
                        window.confirm(
                            `${selectQuantity} ${data.name} de couleur ${selectColor} a bien été ajouté à votre panier. Pour le consulter, appuyer sur ok`)
                        ) {
                            // sending user on cart page
                            window.location.href = 'cart.html';
                        } else {
                            // or reload the page
                            location.reload(); 
                        }
                    };

                    if (purchaseStorage) {
                        // if there is a product with same id/color
                        const foundStorage = purchaseStorage.find(
                            (p) => p.idProduct === id && p.color === selectColor
                        );
                        if (foundStorage) {
                            let totalQuantity = 
                            parseInt(info.quantity) + parseInt(foundStorage.quantity);
                            foundStorage.quantity = totalQuantity;
                            localStorage.setItem('product', JSON.stringify(purchaseStorage));
                            alertConfirmation();
                        } else {
                            // or product is != from previous ordered
                            purchaseStorage.push(info);
                            localStorage.setItem('product', JSON.stringify(purchaseStorage));
                            alertConfirmation();
                        }
                    } else {
                        // if nothing is in the cart
                        purchaseStorage = [];
                        // pushing localStorage's info in the array
                        purchaseStorage.push(info);
                        localStorage.setItem('product', JSON.stringify(purchaseStorage));
                        alertConfirmation();
                    }
                }
            }
        )
    });
}