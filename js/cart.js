cartArray = [];
let price = document.getElementById('price');
let productsURL = "https://japceibal.github.io/emercado-api/cats_products/102.json";
let linksArray = [];
let subtotalGeneral = document.getElementById("subtotalGeneral");
let costoEnvio = document.getElementById("costoEnvio");
let costoTotal = document.getElementById("costoTotal");


function subtotales() {
  let subTotales = document.getElementsByClassName("subtotalClase");
  let sumaTotal = 0;
 console.log(subTotales);
 for (let i = 0; i < subTotales.length; i ++) {
  sumaTotal += parseInt(subTotales[i].innerHTML)
 }
 subtotalGeneral.innerHTML = sumaTotal
};


function subtotal(array,id) {

  let subtotal = document.getElementById(`${id}subtotal`)
  let cantidad = document.getElementById(`${id}cantidad`);

  let resultado = array * cantidad.value;
  subtotal.innerHTML = resultado; 

};

function showCart2(array){

    let htmlContentIMG = "";

  htmlContentIMG = `
  <tr>

  <td>
  <img src="img/prod${array.id}_2.jpg" style="max-width:100px">
</td>
<td>
<p><b>${array.name}</b></p>
</td>
<td>
<p>${array.currency}${array.cost}</p>
</td>

<td>
<input id="${array.id}cantidad" class="quantity cant col-5 text-center" min="1" max="999999" name="quantity" value="1"
 type="number" onchange="subtotal(${array.cost},${array.id})">
</td>

<td>

<label>${array.currency}</label>
<label class="subtotalClase" id="${array.id}subtotal">${array.cost * 1}</label>
</td>

</tr>
`

document.getElementById("table").innerHTML += htmlContentIMG;  
subtotales();

};





document.addEventListener("DOMContentLoaded", function(){
  // getJSONData(productsURL).then(function(resultObj){
  //     if (resultObj.status === "ok"){
  //         cartArray = resultObj.data;
  //         showCart1(cartArray)
  //     };
  // });
  productos_comprados = JSON.parse(localStorage.getItem("comprado"));
  for (let i = 0; i < productos_comprados.length; i++) {
    let producto = productos_comprados[i];
    let productoURL = `https://japceibal.github.io/emercado-api/products/` + producto + `.json`;
    if (!linksArray.includes(productoURL)) {
      linksArray.push(productoURL);
  }
}
 for(i = 0; i < linksArray.length; i++) {
  const url = linksArray[i];
  getJSONData(url).then(function(resultObj){
    if (resultObj.status === "ok"){
        productoComprado = resultObj.data;
        showCart2(productoComprado)
    };
});
};
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