var formErrors = [];
var submitButton = document.getElementById('submitButton');
var formIsValid;
var userName = document.getElementById('name').value;
var userSurname = document.getElementById('surname').value;
var userEmail = document.getElementById('email').value;

function validateForm() {
  userName = document.getElementById('name').value;
  userSurname = document.getElementById('surname').value;
  userEmail = document.getElementById('email').value;

  if (formErrors.length === 0 && userName != '' && userSurname != '' && userEmail != '') {
    formIsValid = true;
    console.log('Form valido!');
  } else {
    formIsValid = false;
    console.log('Form non valido!');
  }
}

function validateText(textValue) {
  var re = /[A-Za-z]$/;

  if (re.test(document.getElementById(textValue).value)) {
    document.getElementById(textValue).style.border = '2px solid green';
    isErrorPresent = formErrors.indexOf(textValue);
    isErrorPresent > -1 ? formErrors.splice(isErrorPresent, 1) : '';
    console.log(formErrors);
    // enableSubmitButton();
  } else {
    document.getElementById(textValue).style.border = '2px solid red';
    isErrorPresent = formErrors.indexOf(textValue);
    isErrorPresent > -1 ? '' : formErrors.push(textValue);
    console.log(formErrors);
    // enableSubmitButton();
  }
}

function validateEmail(mailValue) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(document.getElementById(mailValue).value)) {
    document.getElementById(mailValue).style.border = '2px solid green';
    isErrorPresent = formErrors.indexOf(mailValue);
    isErrorPresent > -1 ? formErrors.splice(isErrorPresent, 1) : '';
    console.log(formErrors);
    // enableSubmitButton();
  } else {
    document.getElementById(mailValue).style.border = '2px solid red';
    isErrorPresent = formErrors.indexOf(mailValue);
    isErrorPresent > -1 ? '' : formErrors.push(mailValue);
    console.log(formErrors);
    // enableSubmitButton();
  }
}
