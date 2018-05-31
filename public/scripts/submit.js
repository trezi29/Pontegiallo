function writeNewUser(name, surname, address, city, province, cap, birthday, phone, email) {
  firebase.database().ref('richieste/').push().set({
    Nome: name,
    Cognome: surname,
    Indirizzo: address,
    Città: city,
    Provincia: province,
    CAP: cap,
    DataDiNascita: birthday,
    Telefono: phone,
    Email: email
  }).then(function() {
    window.location.href = 'https://tesseramento-develop.firebaseapp.com/requestSent.html';
  }, function(error) {
    console.log(error);
  });
}

function submitRequest() {
  // validateForm();

  // formIsValid ? writeNewUser(userName, userSurname, userAddress, userCity, userProvince, userCap, userBirth, userPhone, userEmail) : console.log('Errors in fields: ' + formErrors);
  //READ INPUT VALUES
  var userName = document.getElementById('name').value;
  var userSurname = document.getElementById('surname').value;
  var userAddress = document.getElementById('indirizzo').value;
  var userCity = document.getElementById('citta').value;
  var userProvince = document.getElementById('provincia').value;
  var userCap = document.getElementById('cap').value;
  var userBirth = document.getElementById('datadinascita').value;
  var userPhone = document.getElementById('telefono').value;
  var userEmail = document.getElementById('email').value;

  //CHECK FOR NO EMPTY FIELDS
  if (formErrors.length === 0 && userName != '' && userSurname != '' && userAddress != '' && userCity != '' && userProvince != '' && userCap != '' && userBirth != '' && userPhone != '' && userEmail != '') {
    formIsValid = true;
    console.log('Form valido!');
  } else {
    formIsValid = false;
    console.log('Form non valido!');
  }

  //WRITE NEW USER TO DATABASE
  writeNewUser(userName, userSurname, userAddress, userCity, userProvince, userCap, userBirth, userPhone, userEmail);
}
