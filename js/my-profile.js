
//VARIABLES
let btnSumbit = document.getElementById("btnSumbit");
let Email = localStorage.getItem("Email");



//BOOTSTRAP VALIDATION
function validation() {
  let forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        else {
          valido()
        }

        form.classList.add('was-validated')
      }, false)
    })

}


//En submit, se guardan los datos en localStorage
function valido() {

    //Inputs
let nombre = document.getElementById("ProfileInputName").value
let segundoNombre = document.getElementById("ProfileInputName2").value
let apellido = document.getElementById("validationCustom03").value
let segundoApellido = document.getElementById("validationCustom01").value
let telefono = document.getElementById("validationCustom02").value

  localStorage.setItem("nombre", nombre);
  localStorage.setItem("nombre2", segundoNombre);
  localStorage.setItem("apellido", apellido);
  localStorage.setItem("apellido2", segundoApellido);
  localStorage.setItem("telefono", telefono);
  !alert("perfil actualizado!")
}






  function showProfile() {
    let wholeProfile = document.getElementById("wholeProfile");
    let profile = document.getElementById("profile");
    let profImg = document.getElementById("profImg");

let formForHTML = ""

if (localStorage.getItem("Email") == null) {
  formForHTML= `
  <p></p>
  <div class="row g-3 d-flex justify-content-center">
  <p>Para iniciar sesión, haz click <a onclick="${localStorage.clear}" href="index.html">aquí</a>.</p>
  </div>
  `

  wholeProfile.innerHTML = formForHTML

} else if (localStorage.getItem("nombre") != null || localStorage.getItem("apellido") != null) {

 formForHTML= `
 <form class="needs-validation " novalidate>
 <div class="row g-3 d-flex justify-content-center">
 <div class="col-md-4">
   <label for="validationCustom01" class="form-label">Nombre*</label>
   <input type="text" class="form-control" id="ProfileInputName" value="${localStorage.getItem("nombre")}"  required>
   <div class="invalid-feedback">
   Requerido.
 </div>
 </div>
 <div class="col-md-4">
   <label for="validationCustom02" class="form-label"  >Segundo Nombre</label>
   <input type="text" class="form-control" id="ProfileInputName2" value="${localStorage.getItem("nombre2")}">
 </div>
</div>
<div class="row d-flex justify-content-center">
 <div class="col-md-4">
   <label for="validationCustom03" class="form-label" >Apellido*</label>
   <input type="text" class="form-control" id="validationCustom03" value="${localStorage.getItem("apellido")}"  required> 
   <div class="invalid-feedback">
       Requerido.
     </div>
 </div>
 <div class="col-md-4">
   <label for="validationCustom01" class="form-label" >Segundo apellido</label>
   <input type="text" class="form-control" id="validationCustom01" value="${localStorage.getItem("apellido2")}">
 </div>
</div>


<div class="row d-flex justify-content-center">

<div class="col-md-4">
   <label for="validationCustomUsername" class="form-label">Email*</label>
   <div class="input-group has-validation">
     <span class="input-group-text" id="inputGroupPrepend">@</span>
     <input value="${Email}" type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required>
     <div class="invalid-feedback">
       Email inválido.
     </div>
     </div>
   </div>


 <div class="col-md-4">
 <label for="validationCustom02" class="form-label">Télefono de contacto</label>
 <input type="text" class="form-control" id="validationCustom02" value="${localStorage.getItem("telefono")}">
 </div>
<p></p>





<p></p>

 <hr>
 <div class="col-12 d-flex justify-content-center">

 </div>
   <button onclick="validation()" class="btn btn-primary" type="submit" >Actualizar perfil</button>
 </div>
</div>

</form>
 `

 if (localStorage.getItem("profilePicture") !== null) {
  profImg.innerHTML = 
  `<img style="max-width:200px" src="${localStorage.getItem("profilePicture")}">`
 }
 else {
  profImg.innerHTML = 
  `<img style="max-width:200px" src="blank-profile-picture.jpg">`
 }

 profile.innerHTML = formForHTML
 } else {
  formForHTML= `
  <form class="needs-validation " novalidate>
 <div class="row g-3 d-flex justify-content-center">
 <div class="col-md-4">
   <label for="validationCustom01" class="form-label">Nombre*</label>
   <input type="text" class="form-control" id="ProfileInputName"  required>
   <div class="invalid-feedback">
   Requerido.
 </div>
 </div>
 <div class="col-md-4">
   <label for="validationCustom02" class="form-label"  >Segundo Nombre</label>
   <input type="text" class="form-control" id="ProfileInputName2">
 </div>
</div>
<div class="row d-flex justify-content-center">
 <div class="col-md-4">
   <label for="validationCustom03" class="form-label" >Apellido*</label>
   <input type="text" class="form-control" id="validationCustom03" required> 
   <div class="invalid-feedback">
       Requerido.
     </div>
 </div>
 <div class="col-md-4">
   <label for="validationCustom01" class="form-label" >Segundo apellido</label>
   <input type="text" class="form-control" id="validationCustom01" >
 </div>
</div>


<div class="row d-flex justify-content-center">

<div class="col-md-4">
   <label for="validationCustomUsername" class="form-label">Email*</label>
   <div class="input-group has-validation">
     <span class="input-group-text" id="inputGroupPrepend">@</span>
     <input value="${Email}" type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required>
     <div class="invalid-feedback">
       Email inválido.
     </div>
     </div>
   </div>


 <div class="col-md-4">
 <label for="validationCustom02" class="form-label">Télefono de contacto</label>
 <input type="text" class="form-control" id="validationCustom02">
 </div>
<p></p>

<p></p>

 <hr>
 <div class="col-12 d-flex justify-content-center">

 </div>
   <button onclick="validation()" class="btn btn-primary" type="submit" >Actualizar perfil</button>
 </div>
</div>

</form>
 `

 if (localStorage.getItem("profilePicture") !== null) {
  profImg.innerHTML = 
  `<img style="max-width:200px" src="${localStorage.getItem("profilePicture")}">`
 }
 else {
  profImg.innerHTML = 
  `<img style="max-width:200px" src="blank-profile-picture.jpg">`
 }

 profile.innerHTML = formForHTML
 }

 let formFile = document.getElementById("formFile");

  formFile.addEventListener("change", () => {
    

    const file = new FileReader();

    file.readAsDataURL(formFile.files[0]);

    file.addEventListener("load", function (e) {
      const url = file.result;
      localStorage.setItem("profilePicture", url);
    });
  });

  };

  showProfile()