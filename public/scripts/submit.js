function writeNewUser(name, surname, email) {
  firebase.database().ref().set({
    Nome: name,
    Cognome: surname,
    Email: email
  });
}

function submitRequest() {
  console.log('Form submitted');
  // var userName = document.getElementById('name').value;
  // var userSurname = document.getElementById('surname').value;
  // var userEmail = document.getElementById('email').value;
  //
  // writeNewUser(userName, userSurname, userEmail);
}
