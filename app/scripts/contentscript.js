/*
  This is what gets run when you click on the extension icon.
*/

'use strict';

var extUI, dismiss;
// just removes the extension container from the page
function dismissExt(){
  document.body.removeChild(document.getElementById('chipmunk-ext-container'));
}

// create our container
// (we WILL use templating later but for now this inline string is OK)
extUI = document.createElement('div');
extUI.id = 'chipmunk-ext-container';
extUI.innerHTML = '<label for="url-input">article url:</label> <input id="url-input" type="text" /> <input type="button" value="save to drive" /> <button id="dismiss-chipmunk">close</button>';
// add it to the DOM
document.body.appendChild(extUI);
// set the input value to be the location
document.getElementById('url-input').value = document.location.href;

dismiss = document.getElementById('dismiss-chipmunk');

dismiss.addEventListener('click', dismissExt, false);
