var formErrors = [];
var submitButton = document.getElementById('submitButton');
var userName = document.getElementById('name').value;
var userSurname = document.getElementById('surname').value;
var userEmail = document.getElementById('email').value;

function enableSubmitButton() {
  // if (formErrors.length === 0 && userName != '' && userSurname != '' && userEmail != '') {
  if (formErrors.length === 0) {
    submitButton.disabled = false;
    console.log('Bottone abilitato!');
  } else {
    submitButton.disabled = true;
  }
}

function validateText(textValue) {
  var re = /[A-Za-z]$/;

  if (re.test(document.getElementById(textValue).value)) {
    document.getElementById(textValue).style.background = '#ccffcc';
    isErrorPresent = formErrors.indexOf(textValue);
    isErrorPresent > -1 ? formErrors.splice(isErrorPresent, 1) : '';
    console.log(formErrors);
    enableSubmitButton();
  } else {
    document.getElementById(textValue).style.background = '#e35152';
    isErrorPresent = formErrors.indexOf(textValue);
    isErrorPresent > -1 ? '' : formErrors.push(textValue);
    console.log(formErrors);
    enableSubmitButton();
  }
}

function validateEmail(mailValue) {
  var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (re.test(document.getElementById(mailValue).value)) {
    document.getElementById(mailValue).style.background = '#ccffcc';
    isErrorPresent = formErrors.indexOf(mailValue);
    isErrorPresent > -1 ? formErrors.splice(isErrorPresent, 1) : '';
    console.log(formErrors);
    enableSubmitButton();
  } else {
    document.getElementById(mailValue).style.background = '#e35152';
    isErrorPresent = formErrors.indexOf(mailValue);
    isErrorPresent > -1 ? '' : formErrors.push(mailValue);
    console.log(formErrors);
    enableSubmitButton();
  }
}
