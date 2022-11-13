const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/" 
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("productID") + ".json";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/" + localStorage.getItem("productID") + ".json";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/" + "25801" + ".json";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const CATEGORY = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json"

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

let email = localStorage.getItem("Email");
let link = document.getElementById("navbarEmail");

document.getElementById("cerrar_sesion").addEventListener("click", function() {
  localStorage.removeItem("Email");
  window.location = "index.html";
});


function navBarImg() {
let navBarImg = document.getElementById("navBarImg");

if (localStorage.getItem("profilePicture") !== null) {

  link.innerHTML = 
  `<img class="rounded d-inline me-2" style="max-width:40px" src="${localStorage.getItem("profilePicture")}"><p class="d-inline" id="emailName"></p>`

  document.getElementById("emailName").innerHTML = email
 }
 else {
  link.innerHTML = 
  `<img class="rounded d-inline me-2" style="max-width:40px" src="blank-profile-picture.jpg"><p class="d-inline" id="emailName"></p>`

  document.getElementById("emailName").innerHTML = email
 }

}

navBarImg()
