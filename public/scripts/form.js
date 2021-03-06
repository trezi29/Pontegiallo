function scrollToForm() {
  var form = document.getElementById('formContainer');

  form.scrollIntoView({behavior: "smooth"});
}


var inputFields = document.getElementsByTagName('input');

function listenFocusEvent(inputFieldId) {
    var thisInput = document.getElementById(inputFieldId);
    thisInput.addEventListener('focus', function(){moveLabelUp(inputFieldId)});
    thisInput.addEventListener('blur', function(){moveLabelDown(inputFieldId)});
}

function moveLabelUp(inputFieldId) {
    var isInputEmpty = document.getElementById(inputFieldId).value;
    var elementParent = document.getElementById(inputFieldId).parentNode;
    var label = elementParent.getElementsByTagName('label');

    isInputEmpty == '' ? label[0].style.bottom = '25px' : '';
    isInputEmpty == '' ? label[0].style.fontSize = '12px' : '';
}

function moveLabelDown(inputFieldId) {
    var isInputEmpty = document.getElementById(inputFieldId).value;
    var elementParent = document.getElementById(inputFieldId).parentNode;
    var label = elementParent.getElementsByTagName('label');

    isInputEmpty == '' ? label[0].style.bottom = '0' : '';
    isInputEmpty == '' ? label[0].style.fontSize = '20px' : '';
}

for (var i = 0; i < inputFields.length; i++) {
  var elementId = inputFields[i].id;
  listenFocusEvent(elementId);
}
