function readPending() {
  var pendingList = document.getElementById('pg__pendingList');

  if (pendingList.style.display === '') {
    var query = firebase.database().ref('richieste').orderByKey();

    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;

          var userName = snapshot.child(key + '/Nome').val();

          var userSurname = snapshot.child(key + '/Cognome').val();

          var userEmail = snapshot.child(key + '/Email').val();

          createCard(userName, userSurname, userEmail, key);
        });
        runForLoop();
      });
    }
}

//create and append in page a card for every request
function createCard(userName, userSurname, userEmail, key) {
  var newCard = document.createElement('div');
  var pendingList = document.getElementById('pg__pendingList');
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

//select and deselect cards

var requestCard = document.getElementsByClassName('pg__tab-richiesta');
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

function runForLoop() {
  for (var i = 0; i < requestCard.length; i++) {
    var elementId = requestCard[i].id;
    listenClickEvent(elementId);
  }
}
