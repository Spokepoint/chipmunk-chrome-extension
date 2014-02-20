/*
  This gets run as soon as the app is active. If we want an "onboarding" to
  set up auth or something we can do that here.
*/
'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
  });

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
