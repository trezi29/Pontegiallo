function moveCardToMembers(key) { //move selected cards to approved folder
  var approvedRequest = firebase.database().ref('approvate/').child(key);
  var approvedMembers = firebase.database().ref('soci/').child(key);

  approvedRequest.on("value", function(snapshot) {

    approvedMembers.set(snapshot.val(), deleteApproved(key)); // write card to new location and run delete function on callback

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function newMember() {
  for (var i = 0; i < selectedCards.length; i++) {
    var elementId = selectedCards[i];
    moveCardToMembers(elementId);
  }
}

function deleteApproved(key) {
  firebase.database().ref('approvate/').child(key).remove().then(function() {
    refreshApproved();
  }, function(error) {
    console.log(error);
  });
}

// update cards in page to display only not approved cards
function refreshApproved() {
  selectedCards = [];
  approvedList.style.display = '';
  readApproved();
}
