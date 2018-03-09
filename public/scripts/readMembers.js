function readMembers() {
  if (membersList.style.display === '') {
    pendingList.style.display = '';
    approvedList.style.display = '';
    membersList.style.display = 'block';

    while(memberCard.length > 0){
        memberCard[0].parentNode.removeChild(memberCard[0]);
    }

    var query = firebase.database().ref('soci').orderByKey();

    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;

          var userName = snapshot.child(key + '/Nome').val();

          var userSurname = snapshot.child(key + '/Cognome').val();

          var userEmail = snapshot.child(key + '/Email').val();

          createMemberCard(userName, userSurname, userEmail, key);
        });
        runForLoop(memberCard);
      });
  }
}

function createMemberCard(userName, userSurname, userEmail, key) {
  var newCard = document.createElement('div');
  newCard.className = "pg__tab-soci";
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

  membersList.appendChild(newCard);
}
