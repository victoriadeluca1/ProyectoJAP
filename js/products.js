
let productsArray = [];
let CATEGORY = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json"; 

//Muestra los productos en el div"product-list-container"
 function showProducts(){
    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.products.length; i++){
        let category = productsArray.products[i];
            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
            
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
        }

    }


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORY).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data
            showProducts()
        }
    });
});