function deleteMember() {
  for (var i = 0; i < selectedCards.length; i++) {
    var elementId = selectedCards[i];
    deleteCardFromMembers(elementId);
  }
}

function deleteCardFromMembers(key) {
  firebase.database().ref('soci/').child(key).remove().then(function() {
    refreshMembers();
  }, function(error) {
    console.log(error);
  });
}

// update cards in page to display only not approved cards
function refreshMembers() {
  selectedCards = [];
  membersList.style.display = '';
  readMembers();
}
