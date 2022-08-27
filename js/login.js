let email = document.getElementById('userEmail');
const password = document.getElementById( "userPassword");
const btn = document.getElementById( "btn");
// let input = document.getElementsByTagName("input");
const errorMessageEmail = document.getElementById( "errorMessageEmail");
const errorMessagePassword = document.getElementById( "errorMessagePassword");

function login() {
document.addEventListener("click", (e) => {
    let errorMessages = ["Ingrese su Email","Ingrese su contraseña"];
    if (email.value == "" || password.value == null || password.value == "" || password.value == null) {
    e.preventDefault(); // Previene que la pagina se recarge, lo que hace que desaparezcan los mensajes de error
     errorMessageEmail.innerHTML = errorMessages[0];
     errorMessagePassword.innerHTML = errorMessages[1];
    } else {
        window.location.href = "inicio.html";
        setEmail();
    }
}
)
};


 function redireccionar() {
     alert("Has accedido con google");
     window.location.href = "inicio.html";
 }

function setEmail() {
    let emailValue = document.getElementById('userEmail').value;
    localStorage.setItem("Email", emailValue);
}

