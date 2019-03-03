replaceSelectedText();
if (document.getElementById('myModal') == null) {
  document.body.insertAdjacentElement("beforeend", addModal());
}

var generateModal = ''
function stringToEl(string) {
  var parser = new DOMParser(),
    content = 'text/html',
    DOM = parser.parseFromString(string, content);
  return DOM.body.childNodes[0];
}

function addModal() {
  var modal = document.createElement('div');
  modal.innerHTML += `<div id="myModal" class="modal"><div class="modal-content"><span class="close-jg">&times;</span><p class="modal-context"><div>
  <div id="title"></div>
  <div id="mean"></div>
  <div id="use"></div>
  <div id="explain">
  </div>
  <div id="example">
    <div>
      <ul id="li-example">
      </ul>
    </div>
  </div>
  </div></p></div></div >`
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
  var span = document.createElement('span');
  span.classList.add('grammar-box')
  span.setAttribute(
    "style",
    "background-color: yellow; display: inline;"
  );
  text = document.createTextNode(string)
  span.appendChild(text)
  return span;
}

function replaceSelectedText() {
  if (window.getSelection) {
    var dataSend = window.getSelection().baseNode.nodeValue;
  }
  $.ajax({
    url: 'http://127.0.0.1:5000/api/v1/grammar_check',
    type: 'post',
    dataType: 'text',
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
          let elements = document.body.getElementsByClassName('grammar-box');
          for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', function () {
              var modal = document.getElementById('myModal');
              modal.style.display = "block";
              $.ajax({
                url: `http://127.0.0.1:5000/api/v1/get_grammars?input=${elements[i].textContent}`,
                type: 'get',
                // dataType: 'text',
                // data: dataSend,
                success: function (data) {
                  console.log("***********", data);
                  let data_arr = JSON.parse(data)
                  console.log(data_arr[0].title);
                  document.getElementById('title').insertAdjacentHTML("beforeend", addModalContext_String(data_arr[0].title));
                  console.log(data_arr[0].mean);
                  document.getElementById('mean').insertAdjacentHTML("beforeend", addModalContext_String(data_arr[0].mean));
                  console.log(data_arr[0].use);
                  document.getElementById('use').insertAdjacentHTML("beforeend", addModalContext_String(data_arr[0].use));
                  console.log(data_arr[0].explain);
                  document.getElementById('explain').insertAdjacentHTML("beforeend", addModalContext_String(data_arr[0].explain));
                  console.log(data_arr[0].examples);
                  for (let i = 0; i < data_arr[0].examples.length; i++) {
                    document.getElementById('li-example').insertAdjacentHTML("beforeend", addModalContext_Example(data_arr[0].examples[i].ja, data_arr[0].examples[i].vi));
                  }
                  document.getElementById('li-example').insertAdjacentHTML("beforeend", addModalContext_Example(data_arr[0].examples[i].ja, data_arr[0].examples[i].vi));
                  console.log(data_arr[0].examples.length);
                  console.log(data_arr[0].examples[0].ja);
                  console.log(data_arr[0].examples[1].vi);
                  console.log(data_arr[0].examples[2].vi);

                }
              });
            });
          }
          document.body.getElementsByClassName('close-jg')[0].addEventListener('click', function () {
            var modal = document.getElementById('myModal');
            modal.style.display = "none";
            remove = document.body.getElementsByClassName('need-remove');
            console.log('**********', remove.length)
            while (remove.length > 0) {
              for (let i = 0; i < remove.length; i++) {
                remove[i].remove();
              }
            }
          })
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
function addModalContext_String(string) {
  return `<span class="need-remove">${string}</span>`
}
function addModalContext_Example(ja, vi) {
  return `<li class="need-remove">
            <span class="need-remove">${ja}</span>
            </br>
            <span class="need-remove">${vi}</span>
          </li>`
}
// document.body.getElementsByClassName('modal-context')[0].insertAdjacentHTML("beforeend", addModalContext());
// document.body.getElementsByClassName('grammar-box')[0].addEventListener('click', function () {
//   var modal = document.getElementById('myModal');
//   modal.style.display = "block"
// });

// document.body.getElementsByClassName('close-jg')[0].addEventListener('click', function () {
//   var modal = document.getElementById('myModal');
//   modal.style.display = "none"
// })

// function call(input) {
