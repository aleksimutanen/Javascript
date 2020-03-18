// JavaScript source code

function addToList() {
    'use strict';

    //debug if function is being called or not
    console.log("xd");

    //find the form from the page, find the product and price fields
    var form = document.forms.todoform;
    var product = form.product.value.trim();
    var price = form.price.value.trim();

    //get field elements in variables for later use
    var productElement = document.getElementById("product");
    var priceElement = document.getElementById("price");

    //get feedbackfields from the page
    var productFeedback = document.getElementById("productFail");
    var priceFeedback = document.getElementById("priceFail");

    //reset them before making necessary changes
    productFeedback.innerHTML = "";
    priceFeedback.innerHTML = "";

    //check if product field is empty
    if (product.length == 0) {
        console.log("product field is empty.");
        productFeedback.innerHTML = "<br><b>Please enter a product name</b>";
    }

    //check if price field is empty
    if (price.length == 0) {
        console.log("price field is empty.");
        priceFeedback.innerHTML = "<br><b>Please enter the product price</b>";
    }

    //check if price is given the correct way
    if (!parseFloat(price)) {
        console.log("price given in wrong way");
        priceFeedback.innerHTML = "<br><b>Please enter the product price in x.xx</b>";
    }

    //terminate the function early if there are issues
    if (!parseFloat(price) || price.length == 0 || product.length == 0) {
        return false;
    }

    //find the shoppinglist
    var list = document.getElementById("shoppinglist");
    //add a new list item
    list.innerHTML += "<li onClick='removeFromList(this)'><input type='checkbox' onClick='checkBoxChange(this)'>" + product + ", " + price + "</li>";

    
    //productElement.innerHTML = "";
    //priceElement.innerHTML = "";

    //reset feedbackfields
    productFeedback.innerHTML = "";
    priceFeedback.innerHTML = "";

    return false;
}

//remove items from the list
function removeFromList(element) {
    element.remove();
}

//for checkbox changes if they are needed
function checkBoxChange(element) {
    if (element.checked) {
        console.log("checked");
    } else {
        console.log("unchecked");
    }
}
