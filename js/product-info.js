let productArray = [];
let commentsArray = [];
let comment = document.getElementById("comentar");
let productos_comprados = [];


function comprar(id) {
 if(localStorage.getItem("comprado") != null) {
  productos_comprados = JSON.parse(localStorage.getItem("comprado"));
};
 if (!productos_comprados.includes(id)){
   productos_comprados.push(id);
   localStorage.setItem("comprado", JSON.stringify(productos_comprados)); 
 }

};

//Muestra el producto seleccionado
function showProduct(array){ 
     let htmlContentToAppend = `
                <h5 style="padding-top: 10px"><b>${array.name}</b></h5>
                <hr/>
                <b class="font-weight-bold">Precio </b> <br>
                <p>$${array.cost}</p>
                <b class="font-weight-bold">Descripción</b><br>
                <p>${array.description}</p>
                <b class="font-weight-bold">Categoría</b><br>
                <p>${array.category}</p>
                <b class="font-weight-bold">Cantidad de vendidos</b><br>
                <p>${array.soldCount}</p>
                <button onclick="comprar(${array.id})" class="btn btn-primary">Comprar</button>
            `  
            document.getElementById("product-container").innerHTML = htmlContentToAppend;          
}

function setCatID(id) {
    localStorage.setItem("catID", id);
}

function setProductID(id) {
localStorage.setItem("productID", id);
window.location = "product-info.html"
}

function showRelated(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let products = array[i];
            htmlContentToAppend += `
            <div class="col-sm .px-2 p-3">
            <div class="card">
            <div onclick="setProductID(${products.id})" class="list-group-item list-group-item-action cursor-active">
            <b class="mb-1">${products.name}</b>
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                        <p class="mb-1">${products.description}</p>
                    </div>
            </div>
            </div>
            `
        document.getElementById("related_products").innerHTML = htmlContentToAppend;
        }
    }

function showImages(array) {

    let imageshtml = "";
    imageshtml += `

    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${array.images[0]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${array.images[1]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${array.images[2]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${array.images[3]}" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>

    `

    document.getElementById("product-images-container").innerHTML = imageshtml;          
}


//Comentarios
function showComments(array) { 
    let htmlContentToAppend = "";
     array.forEach(comment => {
        let commentScore = comment.score;
        let htmlScore = "";
      for (let i=1; i <= commentScore; i++){ //si 1 es <= a la puntuacion agrega una estrella
          htmlScore += `<i class="fas fa-star checked"></i>`
      }

      for (let i= commentScore+1; i <= 5; i++){
          htmlScore += `<i class="far fa-star"></i>`
      }  
         htmlContentToAppend += `
         <li class="list-group-item"> 
         <b>${comment.user}</b><small> ${comment.dateTime}</small> <span>${htmlScore}</span>
         <br>${comment.description}</li>`
     });
        document.getElementById("comments").innerHTML = htmlContentToAppend;
};
            
//GetJSONS cuando se carga la pagina
    document.addEventListener("DOMContentLoaded", function(){
        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                productArray = resultObj.data;
                showProduct(productArray)
                showImages(productArray)
            };
        });
    });
    getJSONData(CATEGORY).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data;
            showRelated(currentProductsArray.products)
        };
    });

        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                commentsArray = resultObj.data;
            };
           
    document.getElementById("sendComment").addEventListener("click", function(){
        
           
            let commentscore = document.getElementById("commentscore").value;
            const date = new Date();
            const today = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +":" + date.getSeconds();
            let htmlScore = "";
            

            for (let i=1; i <= commentscore; i++){ //si 1 es <= a la puntuacion agrega una estrella
                htmlScore += `<i class="fas fa-star checked"></i>`
                for (let i= commentscore+1; i <= 5; i++){
                    htmlScore += `<i class="far fa-star"></i>`
                };
            } 
            

    let newComment = "";
    newComment +=
        `<li class="list-group-item"> 
                  <b>${localStorage.getItem("Email")}</b><small> ${today}</small}</small> <span>${htmlScore}</span>
                  <br>${comment.value}</li>`
    document.getElementById("comments").innerHTML += newComment;
})
showComments(commentsArray);

    });


    function enableButton() {
        if (comment.value === "") {
            document.querySelector("#sendComment").disabled = true;
          }
          else {
            document.querySelector("#sendComment").disabled = false;
          }
    }enableButton()