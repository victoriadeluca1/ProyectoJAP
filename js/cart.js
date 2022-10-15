cartArray = [];
let price = document.getElementById('price');



function showCart(array){

    let htmlContentIMG = `
    <td>
    <img src="${array.articles[0].image}" style="max-width:100px">
  </td>`

  let htmlContentName = `
  <td>
  <p><b>${array.articles[0].name}</b></p>
  </td>
`
let htmlCurrency = `
  <td>
  <p>${array.articles[0].currency}${array.articles[0].unitCost}</p>
  </td>
`
document.getElementById("price").innerHTML = htmlCurrency;
document.getElementById("name").innerHTML += htmlContentName;          
document.getElementById("img").innerHTML += htmlContentIMG;          
}

/* <p>${array.articles[0].count}</p> */
//GetJSONS cuando se carga la pagina
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            cartArray = resultObj.data;
            showCart(cartArray)
            subtotal(cartArray)
        };
    });
});

function subtotal(array) {
  let cantidad = document.getElementById("cantidad");
  let subtotal = document.getElementById("subtotal");
  let resultado = array.articles[0].unitCost * cantidad.value;
  console.log(resultado);
  subtotal.innerHTML = "USD" + resultado;    
};
