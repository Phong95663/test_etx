// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// let changeColor = document.getElementById('changeColor');
// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });
// changeColor.onclick = function (element) {
//   let color = element.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       // { code: 'document.body.style.backgroundColor = "' + color + '";' });
//       { file: 'contentScript.js' });
//   });
// };
function checkGrammar(event) {
  chrome.tabs.executeScript(null, {
    file: "jquery.min.js"
  }, function () {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    chrome.tabs.executeScript(null, {
      file: "grammarCheck.js"
    }, function () {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error

    });
  });

}
document.getElementById('checkPage').addEventListener('click', checkGrammar);
