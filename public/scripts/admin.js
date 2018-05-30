const pendingList = document.getElementById('pendingList');
const pendingListRef = 'richieste';
const approvedList = document.getElementById('approvedList');
const approvedListRef = 'approvate';
const membersList = document.getElementById('membersList');
const membersListRef = 'soci';

var selectedCards = [];

const navButtons = document.getElementsByClassName('pg__tab');

for (i = 0; i < navButtons.length; ++i) {
  navButtons[i].addEventListener("click", function() {
    console.log("you clicked button controler " + this.id + "!");
    readList(this.id);
    selectedCards = [];  //empty select cards list
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
      //SELECT CARDS FOR THIS LIST
      var userCard = document.getElementsByClassName('pg__tab-' + thisList.id);
      console.log(thisList.id);
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
          runForLoop(userCard);
        });
    }
  }
}

//create and append in page a card for every request
function createCard(userName, userSurname, userEmail, key, thisList) {
  var newCard = document.createElement('div');
  newCard.className = "pg__tab-" + thisList.id;
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

  thisList.appendChild(newCard);
}

// SELECT AND DESELECT CARDS //

//add select or deselct card event on click
function listenClickEvent(cardId) {
  var thisCard = document.getElementById(cardId);

  thisCard.addEventListener('click', function() {
    selectDeselectCard(cardId)
  });
}

//check if card is selected or not
function selectDeselectCard(cardId) {
  var isCardSelected = selectedCards.indexOf(cardId);

  isCardSelected > -1 ? deselectCard(cardId) : selectCard(cardId);
}

//select card and add it to array
function selectCard(cardId) {
  var thisCard = document.getElementById(cardId);

  thisCard.style.borderColor = 'red';
  selectedCards.push(cardId);
  console.log(selectedCards);
}

//deselect card and remove it from array
function deselectCard(cardId) {
  var thisCard = document.getElementById(cardId);
  var thisCardIndex = selectedCards.indexOf(cardId);

  thisCard.style.borderColor = 'transparent';
  selectedCards.splice(thisCardIndex, 1);
  console.log(selectedCards);
}
//add event listener to all cards in list
function runForLoop(cardsList) {
  for (var i = 0; i < cardsList.length; i++) {
    var elementId = cardsList[i].id;
    listenClickEvent(elementId);
  }
}

// MOVE CARDS TO SELECTED FOLDER //

function moveCard(key, moveElementsTo) { //move selected cards to desired folder
  moveElementsTo === 'approveSelectedRequests' ? moveElementsFromTo(pendingListRef, approvedListRef) : '';
  moveElementsTo === 'confirmNewMembers' ? moveElementsFromTo(approvedListRef, membersListRef) : '';
  // moveElementsTo === 'deleteMember' ? console.log('Move ' + key + ' to ' + moveElementsTo) : '';

  function moveElementsFromTo(moveFrom, moveTo) {
    var sourceList = firebase.database().ref(moveFrom).child(key);
    var destinationList = firebase.database().ref(moveTo).child(key);

    sourceList.on("value", function(snapshot) {

      destinationList.set(snapshot.val(), deleteMovedCard(key, moveFrom)); // write card to new location and run delete function on callback

    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }
}

function moveSelectedCards(buttonId) {
  for (var i = 0; i < selectedCards.length; i++) {
    var elementId = selectedCards[i];
    moveCard(elementId, buttonId);
  }
}

function deleteMovedCard(key, deleteFrom) {
  firebase.database().ref(deleteFrom).child(key).remove().then(function() {
    refreshModifiedList(deleteFrom);
  }, function(error) {
    console.log(error);
  });
}

// update list in page to display only not moved cards
function refreshModifiedList(deleteFrom) {
  //HIDE ALL LISTS
  let listArray = document.getElementsByClassName('pg__list');
  for (i = 0; i < listArray.length; ++i) {
    listArray[i].style.display = '';
  }

  deleteFrom === pendingListRef ? readList('readPendingButton') : '';
  deleteFrom === approvedListRef ? readList('readApprovedButton') : '';
}
