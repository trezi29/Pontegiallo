var formErrors = [];
var submitButton = document.getElementById('submitButton');
var formIsValid;
// var userName = document.getElementById('name').value;
// var userSurname = document.getElementById('surname').value;
// var userAddress = document.getElementById('indirizzo').value;
// var userCity = document.getElementById('citta').value;
// var userProvince = document.getElementById('provincia').value;
// var userCap = document.getElementById('cap').value;
// var userBirth = document.getElementById('datadinascita').value;
// var userPhone = document.getElementById('telefono').value;
// var userEmail = document.getElementById('email').value;

function validateText(textValue) {
  var re = /[A-Za-z]$/;

  if (re.test(document.getElementById(textValue).value)) {
    document.getElementById(textValue).style.borderColor = 'green';
    isErrorPresent = formErrors.indexOf(textValue);
    isErrorPresent > -1 ? formErrors.splice(isErrorPresent, 1) : '';
    console.log(formErrors);
    // enableSubmitButton();
  } else {
    document.getElementById(textValue).style.borderColor = 'red';
    isErrorPresent = formErrors.indexOf(textValue);
    isErrorPresent > -1 ? '' : formErrors.push(textValue);
    console.log(formErrors);
    // enableSubmitButton();
  }
}

function validateEmail(mailValue) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(document.getElementById(mailValue).value)) {
    document.getElementById(mailValue).style.borderColor = 'green';
    isErrorPresent = formErrors.indexOf(mailValue);
    isErrorPresent > -1 ? formErrors.splice(isErrorPresent, 1) : '';
    console.log(formErrors);
    // enableSubmitButton();
  } else {
    document.getElementById(mailValue).style.borderColor = 'red';
    isErrorPresent = formErrors.indexOf(mailValue);
    isErrorPresent > -1 ? '' : formErrors.push(mailValue);
    console.log(formErrors);
    // enableSubmitButton();
  }
}
