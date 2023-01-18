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
const modalForm = document.querySelector(".modal-body form"); // modal form
const closeCross = document.querySelector(".close"); // close modal
const closeBtn = document.querySelector(".btn-close"); // close modal button
const firstName = document.getElementById("first"); // first name
const lastName = document.getElementById("last"); // last name
const email = document.getElementById("email"); // email
const birthdate = document.getElementById("birthdate"); // birthdate
const quantity = document.getElementById("quantity"); // quantity
const submitBtn = document.getElementById("btn-submit"); // submit button

const radioBtns = Array.from(document.getElementsByName("location")); // radio buttons
const radioFormData = document.getElementsByClassName("formData--radioBtn");

const checkbox_UsingConditions = document.getElementById("checkbox1") // checkbox conditions of use
const checkbox_Newsletter = document.getElementById("checkbox2") // checkbox


// Regex object
const regex = {
  text: /^[a-zA-Z]+[-]?[a-zA-Z]+$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  date: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
  number: /^[0-9]{1,2}$/
}

// formData object for each input field in the form : value, type, error, id, valid, regex
let formData = {
  firstName: {
    value: firstName.value,
    type: firstName.type,
    error: firstName.dataset.error,
    id: firstName,
    valid: false,
    regex: regex['text']
  },
  lastName: {
    value: lastName.value,
    type: lastName.type,
    error: lastName.dataset.error,
    id: lastName,
    valid: false,
    regex: regex['text']
  },
  email: {
    value: email.value,
    type: email.type,
    error: email.dataset.error,
    id: email,
    valid: false,
    regex: regex['email']
  },
  birthdate: {
    value: birthdate.value,
    type: birthdate.type,
    error: birthdate.dataset.error,
    id: birthdate,
    valid: false,
    regex: regex['date']
  },
  quantity: {
    value: quantity.value,
    type: quantity.type,
    error: quantity.dataset.error,
    id: quantity,
    valid: false,
    regex: regex['number']
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeCross.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none"; // hide modal
  modalForm.reset(); // reset form
  Object.keys(formData).forEach((field) => { // loop through formData object
    formData[field].id.style.border = "none"; // reset border of input fields
  });
  modalForm.style.display = "block";
  document.querySelector(".modal-body-sucess").style.display = "none";
}

// event listener for each input field and green border if is valid
Object.keys(formData).forEach((field) => { // loop through formData object
  formData[field].id.addEventListener("focusout", (e) => { // event listener for each input field
    validateField(e.target, formData[field]); // validate input field
  });
});

function validateField(field, fieldData) {
  if (fieldData.regex.test(field.value)) {
    field.style.border = "2px solid green";
    fieldData.valid = true;
  } else {
    field.style.border = "none";
    fieldData.valid = false;
  }
}

// initialize formData with the values entered in the form
const initFormData = () => {
  for (let object in formData) {
    formData[object].value = formData[object].id.value;
  }
}

// validate form and display error message if necessary. Else, display success message.
const validateForm = (e) => {
  e.preventDefault();
  initFormData();

  let validAll = 0;

  for (let object in formData) {
    formData[object].id.style.border = 'none';
    if (!formData[object].regex.test(formData[object].value)) {
      formData[object].id.style.border = '2px solid red';
      return false;
    }
    else {
      formData[object].id.style.border = '2px solid green';
      validAll++;
    }
  }

  if (validAll == 5) {
    radioBtns.forEach(function (radioBtn) {
      if (radioBtn.checked) {
        validAll++;
        radioBtn.labels[0].querySelector(".checkbox-icon").classList.toggle("checkbox-icon--error", false);
      }
    });
    if (validAll != 6) {
      radioBtns.forEach(function (radioBtn) {
        radioBtn.labels[0].querySelector(".checkbox-icon").classList.toggle("checkbox-icon--error", true);
      });
      radioFormData.innerHTML += "Vous devez choisir un tournoi auquel participer.";
      return false;
    }
  }

  if (validAll == 6 && checkbox_UsingConditions.checked == true) {
    modalForm.style.display = "none";
    document.querySelector(".modal-body-sucess").style.display = "block";
    if (checkbox_Newsletter.checked == true) {
      console.log(document.querySelector(".modal-body-sucess").querySelector(".modal-text"));
      document.querySelector(".modal-body-sucess").querySelector(".modal-text").style.display = "block";
    }
  }


}

submitBtn.addEventListener("click", validateForm);


// Veuillez entrez 2 caractères ou plus pour le champ du prénom.
// Veuillez entrez 2 caractères ou plus pour le champ du nom.
// Veuillez entrer une adresse e-mail valide.
// Veuillez entrer votre date de naissance.
// Veuillez entrer un nombre entre 0 et 99.
// Veuillez vérifier que vous accepter les termes et conditions.
// Vous devez choisir un tournoi.
// Merci pour votre inscription.


// for (let object in formValue) {
  //   console.log(object, formValue[object]);

  //   if (formValue[object].type == 'text') {
  //     if (!textRegex.test(formValue[object].value)) {
  //       console.log('formValue[object]', formValue[object]);
  //       formValue[object].id.style.border = '2px solid red';
  //       return false;
  //     }
  //     else {
  //       formValue[object].id.style.border = '2px solid green';
  //       return true;
  //     }
  //   }
  //   else if (formValue[object].type == 'email') {
  //     if (!emailRegex.test(formValue[object].value)) {
  //       formValue[object].id.style.border = '2px solid red';
  //       return false;
  //     }
  //     else {
  //       formValue[object].id.style.border = '2px solid green';
  //       return true;
  //     }
  //   }
  //   else if (formValue[object].type == 'date') {
  //     if (!dateRegex.test(formValue[object].value)) {
  //       formValue[object].id.style.border = '2px solid red';
  //       return false;
  //     }
  //     else {
  //       formValue[object].id.style.border = '2px solid green';
  //       return true;
  //     }
  //   }
  //   else if (formValue[object].type == 'number') {
  //     if (!numberRegex.test(formValue[object].value)) {
  //       formValue[object].id.style.border = '2px solid red';
  //       return false;
  //     }
  //     else {
  //       formValue[object].id.style.border = '2px solid green';
  //       return true;
  //     }
  //   }
  // }





// function validateFirstName(event) { // validate first name : at least 2 characters / not empty
//   console.log("validateFirstName", event);
//   let regex = /^[a-zA-Z]{2,}$/;
//   if (!regex.test(firstName.value)) {
//     firstName.style.borderColor = "red";
//     firstName.style.borderWidth = "2px";
//     return false;
//   } else {
//     firstName.style.borderColor = "green";
//     firstName.style.borderWidth = "2px";
//     return true;
//   }
// }

// firstName.addEventListener("input", validateFirstName); // when user is typing in the first name input, the function is called



