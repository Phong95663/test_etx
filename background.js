var menuItem = {
  "id": "JG",
  "title": "JG",
  "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "JG" && clickData.selectionText) {
    // debugger
    let elem = document.activeElement;
    element.replaceWith("a");
    // alert(clickData.selectionText);
    clickData.selectionText.replace(clickData.selectionText, "a")
  }
})

function replaceSelectedText(replacementText) {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(replacementText));
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.text = replacementText;
  }
}

function stringToEl(string) {
  var parser = new DOMParser(),
    content = 'text/html',
    DOM = parser.parseFromString(string, content);

  // return element
  return DOM.body.childNodes[0];
}
