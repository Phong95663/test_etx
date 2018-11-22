replaceSelectedText();

function stringToEl(string) {
  var parser = new DOMParser(),
    content = 'text/html',
    DOM = parser.parseFromString(string, content);
  return DOM.body.childNodes[0];
}

function addModal() {
  var modal = document.createElement('div');
  // modal.className('modal');
  modal.innerHTML += '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role = "document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Modal title</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>Modal body text goes here.</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>';
  // modal.innerHTML += '<iframe src="./modal"></iframe>'
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
  // div.className('grammar-box');
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
    text = ["abc", "dsfsada", "def"]
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      debugger
      // highlightRange(range);
      range.deleteContents();
      debugger
      range.insertNode(addModal());
      range.insertNode(document.createTextNode(text[0]));
      debugger
      range.insertNode(initElement(text[2]));
    }
  }
  // else if (document.selection && document.selection.createRange) {
  //   range = document.selection.createRange();
  //   range.text = stringToEl(replacementText);
  // }
}
