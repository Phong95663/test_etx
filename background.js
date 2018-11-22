var menuItem = {
  "id": "JG",
  "title": "JG",
  "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "JG" && clickData.selectionText) {
    // alert(clickData.selectionText);
    chrome.tabs.executeScript(
      { file: 'grammarCheck.js' });
  }
})

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

function replaceSelectedText() {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    text = ["abc", "ンデビュー90周年を記念し", "def"]
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      debugger
      // highlightRange(range);
      range.deleteContents();
      range.insertNode(document.createTextNode(text[0]));
      range.insertNode(initElement(text[2]));
    }
  }
}
