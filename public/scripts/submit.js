function writeNewUser(name, surname, email) {
  firebase.database().ref('richieste/' + name + surname).set({
    Nome: name,
    Cognome: surname,
    Email: email
  });
}

function submitRequest() {
  validateForm();

  formIsValid ?
  // var userName = document.getElementById('name').value;
  // var userSurname = document.getElementById('surname').value;
  // var userEmail = document.getElementById('email').value;
  // console.log(userName + userSurname + userEmail);
  // console.log('formErrors:');
  // console.log(formErrors);
  writeNewUser(userName, userSurname, userEmail) : console.log('Errors in fields: ' + formErrors);
}
