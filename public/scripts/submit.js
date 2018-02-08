function writeNewUser(name, surname, email) {
  firebase.database().ref('richieste/' + name + surname).set({
    Nome: name,
    Cognome: surname,
    Email: email
  }).then(function() {
    window.location.href = 'https://tesseramento-develop.firebaseapp.com/requestSent.html';
  }, function(error) {
    console.log(error);
  });
}

function submitRequest() {
  validateForm();

  formIsValid ? writeNewUser(userName, userSurname, userEmail) : console.log('Errors in fields: ' + formErrors);
}
