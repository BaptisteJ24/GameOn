function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground"); // modal background
const modalBtn = document.querySelectorAll(".modal-btn"); // modal buttons
const formData = document.querySelectorAll(".formData"); // form data

const closeBtn = document.querySelector(".close"); // close button
const firstName = document.getElementById("first"); // first name
const lastName = document.getElementById("last"); // last name
const email = document.getElementById("email"); // email
const birthdate = document.getElementById("birthdate"); // birthdate
const quantity = document.getElementById("quantity"); // quantity
const submitBtn = document.getElementById("btn-submit"); // submit button


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function validateFirstName() { // validate first name : at least 2 characters / not empty
  let regex = /^[a-zA-Z]{2,}$/;
  if (!regex.test(firstName.value)) {
    firstName.style.borderColor = "red";
    firstName.style.borderWidth = "2px";
    return false;
  } else {
    firstName.style.borderColor = "green";
    firstName.style.borderWidth = "2px";
    return true;
  }
}

firstName.addEventListener("input", validateFirstName); // when user is typing in the first name input, the function is called


function validateLastName() { // validate last name : at least 2 characters / not empty
  let regex = /^[a-zA-Z]{2,}$/;
  if (!regex.test(lastName.value)) {
    lastName.style.borderColor = "red";
    lastName.style.borderWidth = "2px";
    return false;
  } else {
    lastName.style.borderColor = "green";
    lastName.style.borderWidth = "2px";
    return true;
  }
}

lastName.addEventListener("input", validateLastName); // when user is typing in the last name input, the function is called


function validateEmail() { // validate email : verify if the email is valid.
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!regex.test(email.value)) {
    email.style.borderColor = "red";
    email.style.borderWidth = "2px";
    return false;
  } else {
    email.style.borderColor = "green";
    email.style.borderWidth = "2px";
    return true;
  }
}

email.addEventListener("input", validateEmail); // when user is typing in the email input, the function is called


function validateBirthdate() { // validate birthdate : verify if the birthdate is valid.
  let regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
  if (!regex.test(birthdate.value)) {
    birthdate.style.borderColor = "red";
    birthdate.style.borderWidth = "2px";
    return false;
  } else {
    birthdate.style.borderColor = "green";
    birthdate.style.borderWidth = "2px";
    return true;
  }
}

birthdate.addEventListener("change", validateBirthdate); // when user change the birthdate input, the function is called.

function validateQuantity() { // validate quantity : verify if the quantity is valid.
  let regex = /^[0-9]{1,2}$/;
  if (!regex.test(quantity.value)) {
    quantity.style.borderColor = "red";
    quantity.style.borderWidth = "2px";
    return false;
  } else {
    quantity.style.borderColor = "green";
    quantity.style.borderWidth = "2px";
    return true;
  }
}

quantity.addEventListener("input", validateQuantity); // when user is typing in the quantity input, the function is called.




// Veuillez entrez 2 caractères ou plus pour le champ du prénom.
// Veuillez entrez 2 caractères ou plus pour le champ du nom.
// Veuillez entrer une adresse e-mail valide.
// Veuillez entrer votre date de naissance.
// Veuillez entrer un nombre entre 0 et 99.
// Veuillez vérifier que vous accepter les termes et conditions.
// Vous devez choisir un tournoi.
// Merci pour votre inscription.