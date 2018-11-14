// alert('AVC');
replaceSelectedText("<b>A</b>");

function stringToEl(string) {
  var parser = new DOMParser(),
    content = 'text/html',
    DOM = parser.parseFromString(string, content);

  // return element
  return DOM.body.childNodes[0];
}

function highlightRange(range) {
  var newNode = document.createElement("div");
  newNode.setAttribute(
    "style",
    "background-color: yellow; display: inline;"

  );
  range.surroundContents(newNode);
}

function initElement(string) {
  var div = document.createElement('div');
  div.setAttribute(
    "style",
    "background-color: yellow; display: inline;"
  );
  text = document.createTextNode(string)
  div.appendChild(text)
  return div;
}

function replaceSelectedText(replacementText) {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    text = ["abc", "ンデビュー90周年を記念し", "def"]
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      debugger
      highlightRange(range);
      // range.
      range.deleteContents();
      range.insertNode(document.createTextNode(text[0]));
      range.insertNode(initElement(text[2]));
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.text = stringToEl(replacementText);
  }
}
