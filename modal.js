// DOM elements
const
	modalbg = document.querySelector(".bground"),
	modalBtn = document.querySelectorAll(".modal-btn"),
	formDataArray = Array.from(document.querySelectorAll(".formData")),
	modalForm = document.querySelector(".modal-body form"),
	modalBody = document.querySelector(".modal-body"),
	modalBodySuccess = document.querySelector(".modal-body-success"),
	closeCross = document.querySelector(".close"),
	closeBtn = document.querySelector(".btn-close"),
	firstName = document.getElementById("first"),
	lastName = document.getElementById("last"),
	email = document.getElementById("email"),
	birthdate = document.getElementById("birthdate"),
	quantity = document.getElementById("quantity"),
	submitBtn = document.getElementById("btn-submit"),
	radioBtns = document.getElementsByClassName("radio-input"),
	radioFormData = document.querySelector(`[data-name="location"]`),
	usingCondition = document.getElementById("checkbox1"),
	newsletter = document.getElementById("checkbox2"),
	container = document.querySelectorAll(".container");

// transform formDataArray into an object
const formData = formDataArray.reduce((acc, element) => { // acc = accumulator
	acc[element.dataset.name] = element;
	return acc;
}, {});

// Regex object
const regex = {
	text: /^[a-zA-Z]+[-]?[a-zA-Z]+$/,
	email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
	date: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
	number: /^[0-9]{1,2}$/
}

// formData object for each text input field in the form
let formDataObj = {
	firstName: {
		id: firstName,
		name: firstName.name,
		regex: regex['text'],
		type: firstName.type,
		valid: false,
		value: firstName.value
	},
	lastName: {
		id: lastName,
		name: lastName.name,
		regex: regex['text'],
		type: lastName.type,
		valid: false,
		value: lastName.value
	},
	email: {
		id: email,
		name: email.name,
		regex: regex['email'],
		type: email.type,
		valid: false,
		value: email.value
	},
	birthdate: {
		id: birthdate,
		name: birthdate.name,
		regex: regex['date'],
		type: birthdate.type,
		valid: false,
		value: birthdate.value
	},
	quantity: {
		id: quantity,
		name: quantity.name,
		regex: regex['number'],
		type: quantity.type,
		valid: false,
		value: quantity.value
	}
}

// formData object for each radio button in the form
let formDataObjRadio = {};
for (let i = 0; i < radioBtns.length; i++) {
	let location = "location" + (i + 1);
	formDataObjRadio[location] = {
		name: radioBtns[i].name,
		id: radioBtns[i],
		valid: false,
		value: radioBtns[i].value,
		checked: radioBtns[i].checked
	};
}

// formData object for each checkbox in the form
let formDataObjCheckbox = {
	usingCondition: {
		checked: usingCondition.checked,
		id: usingCondition,
		name: usingCondition.name,
		valid: false,
		
	},
	newsletter: {
		checked: newsletter.checked,
		id: newsletter,
		valid: false
	}
}

// function to valid user have 16 years old or more
function limitAge() {
	const today = new Date();
	let birthdateValue = new Date(birthdate.value);
	if (isNaN(birthdateValue.getTime())) {
		return false;
	}
	else {
		let age = today.getUTCFullYear() - birthdateValue.getUTCFullYear();
		let month = today.getUTCMonth() - birthdateValue.getUTCMonth();
		let day = today.getUTCDate() - birthdateValue.getUTCDate();
		if (month < 0 || (month === 0 && day < 0)) {
			age--;
		}
		if (age < 16) {
			return false;
		} else {
			return true;
		}
	}
}

// function edit nav bar
function editNav(e) {
	e.preventDefault();
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// edit nav bar event
document.getElementById("myTopnav").addEventListener("click", editNav);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal function
function launchModal() {
	modalbg.classList.toggle("hide", false);
}


// close modal events
closeCross.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModalBtn);


// close modal function when clicking on the cross
function closeModal() {
	modalbg.classList.toggle("modal-close", true);
	setTimeout(() => {
		modalbg.classList.toggle("hide", true);
		modalForm.reset();
		for (let field in formDataObj) {
			formDataObj[field].id.classList.toggle("text-control--valid", false);
			formData[formDataObj[field].name].dataset.errorVisible = "";
		}
	}, 1000);
	setTimeout(() => modalbg.classList.toggle("modal-close", false), 1200);
}

// close modal function when clicking on the close button
function closeModalBtn() {
	closeModal();
	setTimeout(() => {
		closeCross.classList.toggle("hide", false);
		modalBodySuccess.classList.toggle("hide", true);
		modalBody.classList.toggle("hide", false);
	}, 1400);
}

// initialize formData with the values entered in the form
function initFormData() {
	for (let field in formDataObj) {
		formDataObj[field].value = formDataObj[field].id.value;
	}
	for (let field in formDataObjRadio) {
		formDataObjRadio[field].checked = formDataObjRadio[field].id.checked;
		formDataObjRadio[field].value = formDataObjRadio[field].id.value;

	}
	for (let field in formDataObjCheckbox) {
		formDataObjCheckbox[field].checked = formDataObjCheckbox[field].id.checked;
	}
}

// function valid text input fields
function validateFormData() {
	let validDataFields = false;

	// check if firstname, lastname, email, birthdate and quantity of participations are valid (with regex)
	for (let field in formDataObj) {
		formData[formDataObj[field].name].dataset.errorVisible = "false";
		if (!formDataObj[field].regex.test(formDataObj[field].value)) {
			formData[formDataObj[field].name].dataset.errorVisible = "true";
			formDataObj[field].valid = false;
		} else {
			formData[formDataObj[field].name].dataset.errorVisible = "false";
			formDataObj[field].valid = true;
		}
	}

	// check if birthdate is valid (must be > 16 years old)
	if (formDataObj.birthdate.valid) {
		if (limitAge()) {
			formData.birthdate.dataset.errorVisible = "false";
			formDataObj.birthdate.valid = true;
		} else {
			formData.birthdate.dataset.errorVisible = "true";
			formDataObj.birthdate.valid = false;
		}
	}

	// check if quantity is valid (must be > 0 and < 100)
	if (formDataObj.quantity.valid && (parseInt(formDataObj.quantity.value) < 0 || parseInt(formDataObj.quantity.value) > 99)) {
		formData.quantity.dataset.errorVisible = "true";
		formDataObj.quantity.valid = false;
	}

	// check if all fields are valid
	for (let field in formDataObj) {
		if (formDataObj[field].valid) {
			validDataFields = true;
		}
		else {
			validDataFields = false;
			break;
		}
	}

	// return true if all fields are valid and false if not
	return validDataFields;
}

// function validate a location is selected
function validateFormDataRadio() {
	let validLocation = false;
	for (let field in formDataObjRadio) {
		formDataObjRadio[field].checked ?
			(formDataObjRadio[field].valid = true,
				validLocation = true) :
			(formDataObjRadio[field].valid = false);
	}

	validLocation ?
		(radioFormData.dataset.errorVisible = "false") :
		(radioFormData.dataset.errorVisible = "true")

	return validLocation;
}

// function to know if the user accept the using conditions
function validateUsingCondition() {
	let validUsingCondition = false;

	formDataObjCheckbox['usingCondition'].id.checked ?
		(formData[formDataObjCheckbox['usingCondition'].name].dataset.errorVisible = "false",
			formDataObjCheckbox['usingCondition'].valid = true,
			validUsingCondition = true) :
		(formData[formDataObjCheckbox['usingCondition'].name].dataset.errorVisible = "true")

	return validUsingCondition;
}

// function to know if the user want to receive the newsletter
function validateNewsletter() {
	let validNewsletter = false;
	formDataObjCheckbox['newsletter'].id.checked ?
		(formDataObjCheckbox['newsletter'].valid = true,
			validNewsletter = true) :
		(formDataObjCheckbox['newsletter'].valid = false)
	return validNewsletter;
}



// validate form and display error message if necessary. Else, display success message.
function validateForm(e) {
	e.preventDefault();
	initFormData();

	if (validateFormData() && validateFormDataRadio() && validateUsingCondition()) {
		closeCross.classList.toggle("hide", true);
		modalBody.classList.toggle("hide", true);
		modalBodySuccess.classList.toggle("hide", false);

		if (validateNewsletter()) {
			modalBodySuccess.querySelector(".modal-text[data-name='modal-text-newsletter']").classList.toggle("hide", false);
		}
		else {
			modalBodySuccess.querySelector(".modal-text[data-name='modal-text-newsletter']").classList.toggle("hide", true);
		}

		// create object with all text data to save in localStorage
		let textDataValues = Object.keys(formDataObj)
			.reduce((acc, field) => {
				acc[field] = formDataObj[field].value;
				return acc;
			}, {});

		// create object with location checked to save in localStorage
		let locationChecked = Object.keys(formDataObjRadio)
			.filter(location => formDataObjRadio[location].checked === true)
			.reduce((acc, location) => {
				acc.location = formDataObjRadio[location].value;
				return acc;
			}, {});

		// create object with all checkbox data to save in localStorage
		let checkboxValues = Object.keys(formDataObjCheckbox)
			.reduce((acc, field) => {
				acc[field] = formDataObjCheckbox[field].checked;
				return acc;
			}, {});
		/*
		create an object that contains 
			all text data (firstName, lastName, email, birthdate, quantityOfTournament), 
			radio data (location), 
			checkbox data (usingConditions, newsletter).
		*/
		let localStorageData = {
			formData: textDataValues,
			formDataRadio: locationChecked,
			formDataCheckbox: checkboxValues
		}

		// save data in localStorage
		localStorage.setItem("registration", JSON.stringify(localStorageData));
	}
	else {
		console.error("Le formulaire n'est pas valide. Veuillez vérifier les données saisies.");
	}
}

// event listener for submit button
submitBtn.addEventListener("click", validateForm);



// event listener for each input field and green border if is valid
for (let field in formDataObj) {
	formDataObj[field].id.addEventListener("focusout", (e) => {
		validateField(e.target, formDataObj[field]);
	});
}

// validate field function : green border if is valid
function validateField(field, fieldDataObj) {
	if (fieldDataObj.regex.test(field.value)) {
		field.classList.toggle("text-control--valid", true);
		formData[field.name].dataset.errorVisible = "false";
		fieldDataObj.valid = true;
	} else {
		field.classList.toggle("text-control--valid", false);
		formData[field.name].dataset.errorVisible = "true";
		fieldDataObj.valid = false;
	}

	switch (fieldDataObj.name) {
		case "birthdate":
			if (limitAge()) {
				formData.birthdate.dataset.errorVisible = "false";
				formData.birthdate.dataset.error = "Veuillez entrer votre date de naissance.";
				birthdate.classList.toggle("text-control--valid", true);
				fieldDataObj.valid = true;

			} else {
				formData.birthdate.dataset.errorVisible = "true";
				formData.birthdate.dataset.error = "L'inscription est réservée aux personnes de plus de 16 ans.";
				birthdate.classList.toggle("text-control--valid", false);
				fieldDataObj.valid = false;
			}
			break;
		case "quantity":
			if (parseInt(field.value) < 0 || parseInt(field.value) > 99) {
				formData.quantity.dataset.errorVisible = "true";
				formData.quantity.dataset.error = "Veuillez entrer un nombre entre 1 et 99.";
				quantity.classList.toggle("text-control--valid", false);
				fieldDataObj.valid = false;
			}
			else {
				formData.quantity.dataset.errorVisible = "false";
				quantity.classList.toggle("text-control--valid", true);
				fieldDataObj.valid = true;
			}
			break;
	}
}