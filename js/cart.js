

let cartArray = [];
let count = 1;

//let price = document.getElementById('price');
//let productsURL = "https://japceibal.github.io/emercado-api/cats_products/102.json";
let linksArray = [];
let productos_comprados = [];
let productoComprado = [];
let porcentajeEnvio;
let subtotalGeneral = document.getElementById("costoProductos");
let formDireccion = document.getElementById("formDireccion");
console.log(formDireccion);

let numTarjeta = document.getElementById("numTarjeta");
let vencimiento = document.getElementById("vencimiento");
let codigo = document.getElementById("codigo");
let nroDeCuenta = document.getElementById("nroDeCuenta");

let modalFeedback = document.getElementById("modalFeedback")
modalFeedback.style.display = "inline-block";


//radio inputs of modal
let radioTarjeta = document.getElementById("tarjeta");
let radioBancaria = document.getElementById("transBancaria");

if (radioTarjeta.checked) {
  numTarjeta.setAttribute("required", "")
  codigo.setAttribute("required", "")
  vencimiento.setAttribute("required", "")
  numTarjeta.removeAttribute("disabled", "")
  codigo.removeAttribute("disabled", "")
  vencimiento.removeAttribute("disabled", "")
  nroDeCuenta.setAttribute("disabled", "")
}

let formaValor = ""

function modal() {
  let formaDePago = document.getElementsByName("formaDePago");

  for (let i = 0; i < formaDePago.length; i++) {
    const forma = formaDePago[i];
    if (forma.checked){ 
      formaValor = forma.value;
    }
    console.log(formaValor);
}
 if(formaValor == 1){
  numTarjeta.setAttribute("required", "")
  codigo.setAttribute("required", "")
  vencimiento.setAttribute("required", "")
  numTarjeta.removeAttribute("disabled", "")
  codigo.removeAttribute("disabled", "")
  vencimiento.removeAttribute("disabled", "")
  nroDeCuenta.setAttribute("disabled", "")

  if (numTarjeta.value !== "" && codigo.value !== "" && vencimiento.value !== ""){
  modalFeedback.style.display = "none";
 }
 else { 
  modalFeedback.style.display = "inline-block";
 }
}

  if (formaValor == 2) {
    numTarjeta.setAttribute("disabled", "")
    codigo.setAttribute("disabled", "")
    vencimiento.setAttribute("disabled", "")
    numTarjeta.removeAttribute("required", "")
    codigo.removeAttribute("required", "")
    vencimiento.removeAttribute("required", "")
    nroDeCuenta.setAttribute("required", "")
    nroDeCuenta.removeAttribute("disabled", "")
    if (nroDeCuenta.value !== ""){
      modalFeedback.style.display = "none";
     }
     else { 
      modalFeedback.style.display = "inline-block";
     }

}
}


function showAlertSuccess() {
  let alertsuccess = document.getElementById("alertSuccess")
  alertsuccess.classList.add("show");

  const alertTimeout = setTimeout(()=>{
    alertsuccess.classList.remove("show")
}, 2000)
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        else {
          showAlertSuccess();
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function calculoEnvio() { 
  let costoTotal = document.getElementById("costoTotal");
  let envioSelect = document.getElementsByName("envioSelect");
  let costoEnvio = document.getElementById("costoEnvio");
  for (let i = 0; i < envioSelect.length; i++) {
    let tipoEnvio = envioSelect[i];
    if (tipoEnvio.checked) {
      porcentajeEnvio = tipoEnvio.value; 
    }
}
let subtotalGeneral = document.getElementById("costoProductos");
let subtotalG = parseInt(subtotalGeneral.innerHTML)
let costoEnvio2 = Math.round((porcentajeEnvio / 100) * subtotalG);
costoEnvio.innerHTML = costoEnvio2
// console.log(subtotalGeneral)
console.log(subtotalG)
// console.log(costoEnvio)

costoTotal.innerHTML = subtotalG + costoEnvio2
}

function calculoSubtotales() {
  let subtotalGeneral = document.getElementById("costoProductos");
  let subtotales = document.getElementsByClassName("subtotales");
 
  let suma = 0;
  for (let i = 0; i < subtotales.length; i++) {
    suma += parseInt(subtotales[i].innerHTML);
    // console.log(parseInt(subtotales[i].innerHTML));

  }
  subtotalGeneral.innerHTML = suma;
  calculoEnvio();
}


function subtotal(id, array) {

  let subtotal = document.getElementById(`${id}subtotal`)
  let cantidad = document.getElementById(`${id}cantidad`);

  let resultado = array * cantidad.value;
  subtotal.innerHTML = resultado;
  calculoSubtotales();
};

function showCart2(array) {
  let tabla = document.getElementById("table");
  tabla.innerHTML += `
          <table class="table">
               <thead class="thead-dark">
               <tr>
                
               </tr>
               </thead>
               <tbody>
                  
                    <td class="col-2"><image style="max-width:100px" src="img/prod${array.id}_1.jpg" class="imgtable"></image></td>
                    <td class="col-2">${array.name}</td>
                    <td  class="co-2">${array.cost} ${array.currency}</td>
                    <td class="col-2">
                    <input id="${array.id}cantidad" class="quantity col-5 text-center" min="1" max="999999" name="quantity" value="1" type="number" onchange="subtotal(${array.id},${array.cost})"></td>
                    <td class="col-2"><strong> USD <label id="${array.id}subtotal" class="subtotales">${array.cost*count} </label> </strong></td>
               </tr>
               </tbody>
          </table>`

  calculoSubtotales();
};





document.addEventListener("DOMContentLoaded", function (e) {

  productos_comprados = JSON.parse(localStorage.getItem("comprado"));
  for (let i = 0; i < productos_comprados.length; i++) {
    let producto = productos_comprados[i];
    let productoURL = `https://japceibal.github.io/emercado-api/products/` + producto + `.json`;
    if (!linksArray.includes(productoURL)) {
      linksArray.push(productoURL);
    }
  }
  for (i = 0; i < linksArray.length; i++) {
    const URLELEMENTO = linksArray[i];
    getJSONData(URLELEMENTO).then(function (resultObj) {
      if (resultObj.status === "ok") {
        productoComprado = resultObj.data;
        showCart2(productoComprado);
      }
    });
  }
  let envioSelect = document.getElementsByName("envioSelect");
  for (i = 0; i < envioSelect.length; i++) {
envioSelect[i].addEventListener("change", function(){
    calculoSubtotales();
    });
  }
  calculoEnvio();
});

// function showCart1(array){

//   for (let i = 0; i < array.length; i++) {
//     let htmlContentIMG = "";

//   htmlContentIMG = `
//   <tr>

//   <td>
//   <img src="${array[i].image}" style="max-width:100px">
// </td>
// <td>
// <p><b>${array[i].name}</b></p>
// </td>
// <td>
// <p>${array[i].currency}${array[i].cost}</p>
// </td>

// <td>
// <input id="${array[i].id}cantidad" class="quantity cant col-5 text-center" min="1" max="999999" name="quantity" value="1"
//  type="number" onchange="subtotal(${array[i].cost},${array[i].id})">
// </td>

// <td>
// <p id="${array[i].id}subtotal">${array[i].cost*1}</p>
// </td>

// </tr>
// `

// document.getElementById("table").innerHTML += htmlContentIMG;   
//   }
// }

//LA FUNCION QUE MOSTRABA EL AUTO DE LA ENTREGA5
// function showCart(array){

//     let htmlContentIMG = `
//     <td>
//     <img src="${array.articles[0].image}" style="max-width:100px">
//   </td>`

//   let htmlContentName = `
//   <td>
//   <p><b>${array.articles[0].name}</b></p>
//   </td>
// `
// let htmlCurrency = `
//   <td>
//   <p>${array.articles[0].currency}${array.articles[0].unitCost}</p>
//   </td>
// `
// document.getElementById("price").innerHTML = htmlCurrency;
// document.getElementById("name").innerHTML += htmlContentName;          
// document.getElementById("img").innerHTML += htmlContentIMG;          
// }

// function subtotal(array) {

//   for (var i = 0  ; i < array.length; i++) {
//   let cantidad = document.getElementById("cantidad");
//   let subtotal = document.getElementById("subtotal");
//   let resultado = array[i].cost * cantidad.value;
//   console.log(resultado);
//   subtotal.innerHTML = "USD" + resultado;    
// }
// };