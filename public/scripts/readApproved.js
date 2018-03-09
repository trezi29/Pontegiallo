function readApproved() {
  if (approvedList.style.display === '') {
    pendingList.style.display = '';
    membersList.style.display = '';
    while (approvedCard.length > 0) {
      approvedCard[0].parentNode.removeChild(approvedCard[0]);
    }

    var query = firebase.database().ref('approvate').orderByKey();

    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;

          var userName = snapshot.child(key + '/Nome').val();

          var userSurname = snapshot.child(key + '/Cognome').val();

          var userEmail = snapshot.child(key + '/Email').val();

          createApprovedCard(userName, userSurname, userEmail, key);
        });
        runForLoop(approvedCard);
      });
  }
}

function createApprovedCard(userName, userSurname, userEmail, key) {
  var newCard = document.createElement('div');
  newCard.className = "pg__tab-approvata";
  newCard.id = key

  var paraName = document.createElement('p');
  var paraSurname = document.createElement('p');
  var paraEmail = document.createElement('p');

  paraName.innerHTML = userName;
  paraSurname.innerHTML = userSurname;
  paraEmail.innerHTML = userEmail;

  newCard.appendChild(paraName);
  newCard.appendChild(paraSurname);
  newCard.appendChild(paraEmail);

  approvedList.appendChild(newCard);
  approvedList.style.display = 'block';
}
