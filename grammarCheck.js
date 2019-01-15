replaceSelectedText();
document.body.insertAdjacentElement("beforeend", addModal());

var generateModal = ''
function stringToEl(string) {
  var parser = new DOMParser(),
    content = 'text/html',
    DOM = parser.parseFromString(string, content);
  return DOM.body.childNodes[0];
}

function addModal() {
  var modal = document.createElement('div');
  modal.innerHTML += `<div id="myModal" class="modal"><div class="modal-content"><span class="close-jg">&times;</span><p class="modal-context">Some text in the Modal..</p></div></div >`
  return modal;
}
// function highlightRange(range) {
//   var newNode = document.createElement("div");
//   newNode.setAttribute(
//     "style",
//     "background-color: yellow; display: inline;"

//   );
//   range.surroundContents(newNode);
// }

function initElement(string) {
  var div = document.createElement('div');
  div.classList.add('grammar-box')
  div.setAttribute(
    "style",
    "background-color: yellow; display: inline;"
  );
  text = document.createTextNode(string)
  div.appendChild(text)
  return div;
}

function replaceSelectedText() {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    text = ["abc", "dsfsada", "ンデビュー90周年を記念し"]
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      // highlightRange(range);
      range.deleteContents();
      // range.insertNode(addModal());
      range.insertNode(document.createTextNode(text[0]));
      range.insertNode(initElement(text[2]));
    }
  }
  // else if (document.selection && document.selection.createRange) {
  //   range = document.selection.createRange();
  //   range.text = stringToEl(replacementText);
  // }
}
// $(document).ready(function () {
//   $('body').on('click', $('div.grammar-box'), function () {

//     var modal = document.getElementById('myModal');
//     modal.toggle();
//   })
// })
function addModalContext() {
  return `<p>abc</p>`
}
$('.modal-context').insertAdjacentHTML("beforeend", addModalContext());
document.body.getElementsByClassName('grammar-box')[0].addEventListener('click', function () {
  var modal = document.getElementById('myModal');
  modal.style.display = "block"
});

document.body.getElementsByClassName('close-jg')[0].addEventListener('click', function () {
  var modal = document.getElementById('myModal');
  modal.style.display = "none"
})
