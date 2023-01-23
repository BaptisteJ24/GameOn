// DOM elements object
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
	usingConditions = document.getElementById("checkbox1"),
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

// formData object for each input field in the form : value, type, error, id, valid, regex
let formData_obj = {
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

let formData_obj_radio = {};
for (let i = 0; i < radioBtns.length; i++) {
	let location = "location" + (i + 1);
	formData_obj_radio[location] = {
		name: radioBtns[i].name,
		id: radioBtns[i],
		valid: false,
		value: radioBtns[i].checked,
	};
}

let formData_obj_checkbox = {
	usingConditions: {
		name: usingConditions.name,
		error: usingConditions.dataset.error,
		id: usingConditions,
		valid: false,
		value: usingConditions.checked,
	},
	newsletter: {
		value: newsletter.checked,
		id: newsletter,
		valid: false
	}
}

function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// launch modal function
function launchModal() {
	modalbg.classList.toggle("--hide", false);
}


// close modal events
closeCross.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModalBtn);


// close modal function when clicking on the cross
function closeModal() {
	modalbg.classList.toggle("--hide", true);
	modalForm.reset();
	for (let field in formData_obj) {
		formData_obj[field].id.classList.toggle("text-control--valid", false);
	}
}

// close modal function when clicking on the close button
function closeModalBtn() {
	closeModal();
	closeCross.classList.toggle("--hide", false);
	modalBodySuccess.classList.toggle("--hide", true);
	modalBody.classList.toggle("--hide", false);
}

// initialize formData with the values entered in the form
function initFormData() {
	for (let field in formData_obj) {
		formData_obj[field].value = formData_obj[field].id.value;
	}
	for (let field in formData_obj_radio) {
		formData_obj_radio[field].value = formData_obj_radio[field].id.checked;
	}
	for (let field in formData_obj_checkbox) {
		formData_obj_checkbox[field].value = formData_obj_checkbox[field].id.checked;
	}
}

function validateFormData() {
	let validDataFields = false;

	// check if firstname, lastname, email, birthdate and quantity of participations are valid (with regex)
	for (let field in formData_obj) {
		formData[formData_obj[field].name].dataset.errorVisible = "false";
		if (!formData_obj[field].regex.test(formData_obj[field].value)) {
			formData[formData_obj[field].name].dataset.errorVisible = "true";
			formData_obj[field].valid = false;
		} else {
			formData[formData_obj[field].name].dataset.errorVisible = "false";
			formData_obj[field].valid = true;
		}
	}

	// check if birthdate is valid (must be > 16 years old)
	if (formData_obj.birthdate.valid) {
		if (limitAge()) {
			formData.birthdate.dataset.errorVisible = "false";
			formData_obj.birthdate.valid = true;
		} else {
			formData.birthdate.dataset.errorVisible = "true";
			formData_obj.birthdate.valid = false;
		}
	}

	// check if quantity is valid (must be > 0)
	if (formData_obj.quantity.valid && parseInt(formData_obj.quantity.value) <= 0) {
		formData.quantity.dataset.errorVisible = "true";
		formData_obj.quantity.valid = false;
	}

	// check if all fields are valid
	for (let field in formData_obj) {
		if (formData_obj[field].valid) {
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

function validateFormData_radio() {
	let validLocation = false;
	for (let field in formData_obj_radio) {
		formData_obj_radio[field].id.checked ?
			(formData_obj_radio[field].valid = true,
				validLocation = true) :
			(formData_obj_radio[field].valid = false);
	}

	validLocation ?
		(radioFormData.dataset.errorVisible = "false") :
		(radioFormData.dataset.errorVisible = "true")

	return validLocation;
}

function validateUsingConditions() {
	let validUsingConditions = false;

	formData_obj_checkbox['usingConditions'].id.checked ?
		(formData[formData_obj_checkbox['usingConditions'].name].dataset.errorVisible = "false",
			formData_obj_checkbox['usingConditions'].valid = true,
			validUsingConditions = true) :
		(formData[formData_obj_checkbox['usingConditions'].name].dataset.errorVisible = "true")

	return validUsingConditions;
}

function validateNewsletter() {
	let validNewsletter = false;
	formData_obj_checkbox['newsletter'].id.checked ?
		(formData_obj_checkbox['newsletter'].valid = true,
			validNewsletter = true) :
		(formData_obj_checkbox['newsletter'].valid = false)
	return validNewsletter;
}

// validate form and display error message if necessary. Else, display success message.
function validateForm(e) {
	e.preventDefault();
	initFormData();

	if (validateFormData() && validateFormData_radio() && validateUsingConditions()) {
		closeCross.classList.toggle("--hide", true);
		modalBody.classList.toggle("--hide", true);
		modalBodySuccess.classList.toggle("--hide", false);

		if (validateNewsletter()) {
			modalBodySuccess.querySelector(".modal-text[data-name='modal-text-newsletter']").classList.toggle("--hide", false);
		}
		else {
			modalBodySuccess.querySelector(".modal-text[data-name='modal-text-newsletter']").classList.toggle("--hide", true);
		}
	}
}

submitBtn.addEventListener("click", validateForm);

// event listener for each input field and green border if is valid
for (let field in formData_obj) {
	formData_obj[field].id.addEventListener("focusout", (e) => {
		validateField(e.target, formData_obj[field]);
	});
}

// validate field function : green border if is valid
function validateField(field, fieldData) {
	if (fieldData.regex.test(field.value)) {
		field.classList.toggle("text-control--valid", true);
		formData[field.name].dataset.errorVisible = "false";
		fieldData.valid = true;
	} else {
		field.classList.toggle("text-control--valid", false);
		formData[field.name].dataset.errorVisible = "true";
		fieldData.valid = false;
	}

	if (fieldData.name === "birthdate") {
		if (limitAge()) {
			formData.birthdate.dataset.errorVisible = "false";
			birthdate.classList.toggle("text-control--valid", true);
			formData_obj.birthdate.valid = true;
			formData.birthdate.dataset.error = "Veuillez entrer votre date de naissance.";
		} else {
			formData.birthdate.dataset.errorVisible = "true";
			formData.birthdate.dataset.error = "L'inscription est réservée aux personnes de plus de 16 ans.";
			birthdate.classList.toggle("text-control--valid", false);
			formData_obj.birthdate.valid = false;
		}
	}
}