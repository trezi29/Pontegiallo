const pendingList = document.getElementById('pg__pendingList');
const approvedList = document.getElementById('pg__approvedList');
const membersList = document.getElementById('pg__membersList');

function readPending() {
  if (pendingList.style.display === '') {
    approvedList.style.display = '';
    membersList.style.display = '';
    while(requestCard.length > 0){
        requestCard[0].parentNode.removeChild(requestCard[0]);
    }

    var query = firebase.database().ref('richieste').orderByKey();

    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;

          var userName = snapshot.child(key + '/Nome').val();

          var userSurname = snapshot.child(key + '/Cognome').val();

          var userEmail = snapshot.child(key + '/Email').val();

          createPendingCard(userName, userSurname, userEmail, key);
        });
        runForLoop(requestCard);
      });
    }
}

//create and append in page a card for every request
function createPendingCard(userName, userSurname, userEmail, key) {
  var newCard = document.createElement('div');
  newCard.className = "pg__tab-richiesta";
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

  pendingList.appendChild(newCard);
  pendingList.style.display = 'block';
}

/// select and deselect cards
var requestCard = document.getElementsByClassName('pg__tab-richiesta');
var approvedCard = document.getElementsByClassName('pg__tab-approvata');
var memberCard = document.getElementsByClassName('pg__tab-soci');
var selectedCards = [];

function listenClickEvent(cardId) {
  var thisCard = document.getElementById(cardId);

  thisCard.addEventListener('click', function() {
    selectDeselectCard(cardId)
  });
}

function selectDeselectCard(cardId) {
  var isCardSelected = selectedCards.indexOf(cardId);

  isCardSelected > -1 ? deselectCard(cardId) : selectCard(cardId);
}

function selectCard(cardId) {
  var thisCard = document.getElementById(cardId);

  thisCard.style.borderColor = 'red';
  selectedCards.push(cardId);
  console.log(selectedCards);
}

function deselectCard(cardId) {
  var thisCard = document.getElementById(cardId);
  var thisCardIndex = selectedCards.indexOf(cardId);

  thisCard.style.borderColor = 'transparent';
  selectedCards.splice(thisCardIndex, 1);
  console.log(selectedCards);
}

function runForLoop(cardsList) {
  for (var i = 0; i < cardsList.length; i++) {
    var elementId = cardsList[i].id;
    listenClickEvent(elementId);
  }
}
