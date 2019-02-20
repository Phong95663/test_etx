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
  if (window.getSelection) {
    var dataSend = window.getSelection().baseNode.nodeValue;
  }
  $.ajax({
    url: 'http://127.0.0.1:5000/api/v1/grammar_check',
    type: 'post',
    dataType: 'text',
    // contentType: 'application/json',
    data: dataSend,
    success: function (result) {
      console.log(typeof(result));
      var sel, range;
      if (window.getSelection) {
        sel = window.getSelection();
        var result_arr = JSON.parse(result)
        console.log(typeof (result_arr));
        console.log(result_arr[0]);
        var title = result_arr[0].title;
        console.log("title: ", title);
        console.log("type: ", typeof (title));
        text_add_symbol = dataSend.replace(title, " ~*~ " + title + " ~*~ ");
        console.log("text_symbol: ", text_add_symbol);
        console.log("type: ", typeof (text_add_symbol));
        var text_arr = [];
        text_arr = text_add_symbol.split(" ~*~ ").reverse();
        console.log("arr: ", text_arr);
        console.log(dataSend);
        if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          // highlightRange(range);
          range.deleteContents();
          text_arr.forEach(element => {
            if (element == title) {
              range.insertNode(initElement(element));
            } else {
              range.insertNode(document.createTextNode(element));
            }
          });
          // range.insertNode(addModal());
          // range.insertNode(document.createTextNode(text[0]));
          // range.insertNode(initElement(text[2]));
        }
      }
    },
    error: function () {
      console.log("Err");
    }
  })

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
document.body.getElementsByClassName('modal-context')[0].insertAdjacentHTML("beforeend", addModalContext());
document.body.getElementsByClassName('grammar-box')[0].addEventListener('click', function () {
  var modal = document.getElementById('myModal');
  modal.style.display = "block"
});

document.body.getElementsByClassName('close-jg')[0].addEventListener('click', function () {
  var modal = document.getElementById('myModal');
  modal.style.display = "none"
})

// function call(input) {
