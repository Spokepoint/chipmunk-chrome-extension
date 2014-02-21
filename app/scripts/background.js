/*
  This gets run as soon as the app is active. If we want an "onboarding" to
  set up auth or something we can do that here.
*/
'use strict';


chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.executeScript(tab.id, {
    file: 'scripts/contentscript.js'
  },
  function(){
    if(chrome.runtime.lastError){
      console.error(chrome.runtime.lastError.message);
    }
  });
});


chrome.runtime.onMessage.addListener(
  function(req, sender, sendResp){
    if(req.message === 'getLocalStorage'){
      var ls = {};
      for (var k in localStorage){
        ls[k] = localStorage[k];
      }
      sendResp({data: ls});
    }
  });
