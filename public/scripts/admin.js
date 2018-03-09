const pendingList = document.getElementById('pendingList');
const pendingListRef = 'richieste';
const approvedList = document.getElementById('approvedList');
const approvedListRef = 'approvate';
const membersList = document.getElementById('membersList');
const membersListRef = 'soci';

const navButtons = document.getElementsByClassName('pg__tab');

for (i = 0; i < navButtons.length; ++i) {
  navButtons[i].addEventListener("click", function() {
    console.log("you clicked button controler " + this.id + "!");
    readList(this.id)
  });
}

function readList(navButtonId) {
  navButtonId === 'readPendingButton' ? showList(pendingList, pendingListRef) : '';
  navButtonId === 'readApprovedButton' ? showList(approvedList, approvedListRef) : '';
  navButtonId === 'readMembersButton' ? showList(membersList, membersListRef) : '';

  function showList(thisList, thisRef) {
    if (thisList.style.display === '') {
      //HIDE ALL LISTS
      let listArray = document.getElementsByClassName('pg__list');
      for (i = 0; i < listArray.length; ++i) {
        listArray[i].style.display = '';
      }
      // SELECT CARDS FOR THIS LIST
      var userCard = document.getElementsByClassName('pg__tab-' + thisList);
      //CLEAN PAGE FROM PREVIOUS VISITS
      while (userCard.length > 0) {
        userCard[0].parentNode.removeChild(userCard[0]);
      }
      //SHOW THIS LIST
      thisList.style.display = 'block';
      //CALL FIREBASE TO RETRIVE LIST OF CARDS
      var query = firebase.database().ref(thisRef).orderByKey();

      query.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;

            var userName = snapshot.child(key + '/Nome').val();

            var userSurname = snapshot.child(key + '/Cognome').val();

            var userEmail = snapshot.child(key + '/Email').val();

            createCard(userName, userSurname, userEmail, key, thisList);
          });
          // runForLoop(requestCard);
        });
    }
  }
}

//create and append in page a card for every request
function createCard(userName, userSurname, userEmail, key, thisList) {
  var newCard = document.createElement('div');
  newCard.className = "pg__tab-" + thisList;
  newCard.id = key;

  var paraName = document.createElement('p');
  var paraSurname = document.createElement('p');
  var paraEmail = document.createElement('p');

  paraName.innerHTML = userName;
  paraSurname.innerHTML = userSurname;
  paraEmail.innerHTML = userEmail;

  newCard.appendChild(paraName);
  newCard.appendChild(paraSurname);
  newCard.appendChild(paraEmail);

  pendingList.appendChild(newCard);
  pendingList.style.display = 'block';
}
