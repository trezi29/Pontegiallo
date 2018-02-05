function readPending() {
  var query = firebase.database().ref('richieste').orderByKey();
  query.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        console.log(key);
        var hasChild = snapshot.hasChild(key); // true
        console.log(hasChild);

        var userName = snapshot.child(key + '/Nome').val(); // "Ada"
        // console.log(userName);

        var userSurname = snapshot.child(key + '/Cognome').val(); // "Ada"
        // console.log(userSurname);

        var userEmail = snapshot.child(key + '/Email').val(); // "Ada"
        // console.log(userEmail);

        var userData = [userName, userSurname, userEmail];
        console.log(userData);

        createCard(userName, userSurname, userEmail);
      });
    });
}

function createCard(userName, userSurname, userEmail) {
  var newCard = document.createElement('div');
  newCard.className = "pg__tab-richiesta";

  var paraName = document.createElement('p');
  var paraSurname = document.createElement('p');
  var paraEmail = document.createElement('p');

  paraName.innerHTML = userName;
  paraSurname.innerHTML = userSurname;
  paraEmail.innerHTML = userEmail;

  newCard.appendChild(paraName);
  newCard.appendChild(paraSurname);
  newCard.appendChild(paraEmail);

  document.getElementById('listofcontent').appendChild(newCard);
}

// Assume we have the following data in the Database:
// {
//   "name": {
//     "first": "Ada",
//     "last": "Lovelace"
//   }
// }
//
// var ref = firebase.database().ref("users/ada");
// ref.once("value")
//   .then(function(snapshot) {
//     var key = snapshot.key; // "ada"
//     var childKey = snapshot.child("name/last").key; // "last"
//   });
// var rootRef = firebase.database().ref();
// rootRef.once("value")
//   .then(function(snapshot) {
//     var key = snapshot.key; // null
//     var childKey = snapshot.child("users/ada").key; // "ada"
//   });
