// JavaScript source code

function addToList() {
    'use strict';

    console.log("xd");

    var form = document.forms.todoform;
    var product = form.product.value.trim();
    var price = form.price.value.trim();

    if (product.length == 0 || price.length == 0) {
        console.log("either field is empty.")
        return false;
    }

    if (!parseFloat(price)) {
        console.log("price given in wrong way");
        return false;
    }

    var list = document.getElementById("todolist");
    list.innerHTML += "<li>" + product + ", " + price + "</li>";

    return false;
}
