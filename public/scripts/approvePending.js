function moveCardToApproved(key) { //move selected cards to approved folder
  var pendingRequest = firebase.database().ref('richieste/').child(key);
  var approvedRequest = firebase.database().ref('approvate/').child(key);

  pendingRequest.on("value", function(snapshot) {

    approvedRequest.set(snapshot.val(), deletePending(key)); // write card to new location and run delete function on callback

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function approvePending() {
  for (var i = 0; i < selectedCards.length; i++) {
    var elementId = selectedCards[i];
    moveCardToApproved(elementId);
  }
}

function deletePending(key) {
  firebase.database().ref('richieste/').child(key).remove().then(function() {
    // refreshPending();
  }, function(error) {
    console.log(error);
  });
}

// update cards in page to display only not approved cards
var inPageCards = document.getElementsByClassName('pg__tab-richiesta');

function refreshPending() {
  for (var i = 0; i < inPageCards.length; i++) {
    var elementId = inPageCards[i];
    removeApprovedCards(elementId);
  }
}

function removeApprovedCards(key) {
  var query = firebase.database().ref('richieste').orderByKey();
}
