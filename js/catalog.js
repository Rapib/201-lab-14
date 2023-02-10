/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
state.cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i of state.allProducts) {
    let optionElement = document.createElement('option')
    optionElement.value = i.name;
    optionElement.innerText = i.name;
    console.log(optionElement.innerText);
    selectElement.appendChild(optionElement)
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // DONE: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  updateCartPreview();

}

// DONE: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // DONE: suss out the item picked from the select list
  let selectItem = document.getElementById('items').value;
  // DONE: get the quantity
  let selectQuantity = document.getElementById('quantity').value;
  // DONE: using those, add one item to the Cart
  state.cart.addItem(selectItem, selectQuantity);
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  let selectItem = document.getElementById('items').value;
  let selectQuantity = document.getElementById('quantity').value;
  console.log(selectQuantity);
  // TODO: Add a new element to the cartContents div with that information
  let cartPreviewDiv = document.getElementById('cartContents');
  let cartPreviewUl = document.createElement('ul');
  cartPreviewDiv.appendChild(cartPreviewUl);
  let cartPreviewLiItem = document.createElement('li');
  cartPreviewLiItem.textContent = `Item: ${selectItem} | Quantity: ${selectQuantity} `;
  // let cartPreviewLiQuantity = document.createElement('li');

  // let cartPreviewLiItemPic = document.createElement('img');
  // // let productImgSrc = state.allProducts.filePath;
  // // cartPreviewLiItemPic.src = productImgSrc;

  // cartPreviewLiQuantity.textcontent = selectQuantity;
  // console.log(cartPreviewLiQuantity);
  // console.log(cartPreviewLiQuantity.textcontent);
  cartPreviewUl.appendChild(cartPreviewLiItem);
  // cartPreviewUl.appendChild(cartPreviewLiQuantity);

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
