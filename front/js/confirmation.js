// gathering link and orderId
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let orderId = urlParams.get('orderId');

// inset orderId into the DOM
let orderNumber = document.querySelector('#orderId');
orderNumber.innerHTML = orderId + ' <br> Merci de votre commande !';

// delete localStorage
let removeStorage = window.localStorage;
removeStorage.clear();