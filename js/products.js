
let currentProductsArray = [];

//Muestra los productos en div"product-list-container"
 function showProducts(array){
 
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let products = array[i];
            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name}: $${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
            
            document.getElementById("subtitle").innerHTML = `Verás aquí todos los productos de la categoría ${currentProductsArray.catName}`;
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
        }
    }

function setCatID(id) {
        localStorage.setItem("catID", id);
    }
    
/*     function filterAndShowCategories(a,b) {
        let assortedProducts = currentProductsArray  

        if (){
            assortedProducts = assortedProducts.sort(product => product)
        }
        
    } */

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CATEGORY).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data
            showProducts(currentProductsArray.products)
        }
    });
    document.getElementById("sortByRel").addEventListener("click", function(){
        showProducts(currentProductsArray.products.sort(sortByRelevance));
});
    document.getElementById("sortAsc").addEventListener("click", function(){
        showProducts(currentProductsArray.products.sort(sortByCostAsc));
}); 
    document.getElementById("sortDesc").addEventListener("click", function(){
        showProducts(currentProductsArray.products.sort(sortByCostDesc));
});
});


//Sorting functions

function sortByCostAsc(a,b){
    return a.cost - b.cost;
}
function sortByCostDesc(a,b){
    return b.cost - a.cost;
}
function sortByRelevance(a,b){ 
 return a.soldCount - b.soldCount;
}