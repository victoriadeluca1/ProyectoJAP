let productArray = [];
let commentsArray = [];
//🗿;

//Muestra el producto seleccionado
function showProduct(array){ 
     
     let htmlContentToAppend = `
                <b><h5>${array.name}</h5></b>
                <hr/>
                <b class="font-weight-bold">Precio </b> <br>
                <p>${array.cost}</p>
                <b class="font-weight-bold">Descripción</b><br>
                <p>${array.description}</p>
                <b class="font-weight-bold">Categoría</b><br>
                <p>${array.category}</p>
                <b class="font-weight-bold">Cantidad de vendidos</b><br>
                <p>${array.soldCount}</p>
            `  
            for (var i = 0; i < array.images.length; i++) {
                htmlContentToAppend +=`<img class="img-thumbnail" width="200rem"src="${array.images[i]}">`
            }
        document.getElementById("product-container").innerHTML = htmlContentToAppend;
        }

//Muestra los commentarios2
// function showComments(array) { 
//     let commentScore = array.score;
//     let htmlScore = "";
//     for (let i=1; i <= commentScore; i++){
//         htmlScore += `<i class="fas fa-star checked"></i>`
//     }
//     for (let i= commentScore+1; i <= 5; i++){
//         htmlScore += `<i class="far fa-star"></i>;`
//     }

//         let htmlContentToAppend = "";
//             for (var i = 0; i < array.length; i++) {
//                 let comments = array[i];
//                 htmlContentToAppend += `
//                 <li class="list-group-item"> 
//                 <b>${comments.user} </b><small>${comments.dateTime}</small> <span>${htmlScore}</span>
//                 <br>${comments.description}</li>
//                 `
//             }
//                 document.getElementById("comments").innerHTML = htmlContentToAppend;
//             }

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
            };
        });
    });
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                commentsArray = resultObj.data;
            };

    document.getElementById("sendComment").addEventListener("click", function(){
            let comment = document.getElementById("comentar");
            let commentscore = document.getElementById("commentscore").value;
            const date = new Date();
            const today = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +":" + date.getSeconds();
            let htmlScore = "";
            if (commentscore > 0) 
            {for (let i=1; i <= commentscore; i++){ //si 1 es <= a la puntuacion agrega una estrella
                htmlScore += `<i class="fas fa-star checked"></i>`
            }
            for (let i= commentscore+1; i <= 5; i++){
                htmlScore += `<i class="far fa-star"></i>`
            }};
    let newComment = "";
    newComment +=
        `<li class="list-group-item"> 
                  <b>${localStorage.getItem("Email")}</b><small> ${today}</small}</small> <span>${htmlScore}</span>
                  <br>${comment.value}</li>`
    document.getElementById("comments").innerHTML += newComment;
})
showComments(commentsArray);
    });
