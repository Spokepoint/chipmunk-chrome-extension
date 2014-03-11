/*
  This is what gets run when you click on the extension icon.
*/

'use strict';


function addBannerToDom(text){
  $('body').append('<div id="chipmunk-ext-container"> '+
      '<p>'+text+'</p>'+
      '<button id="chipmunk-close">close</button>'+
    '</div>');

  // return a ui elements hash
  return {
    dismiss: $('#chipmunk-close'),
    container: $('#chipmunk-ext-container'),
  };
}

// removes the extension container from the page
function dismissBanner(){
  $('#chipmunk-ext-container').remove();
}


// gets extension options from localstorage
function getConfig(){
  var deferred = $.Deferred();
  function resolveConfigData(response){
    deferred.resolve(response.data);
  }

  chrome.runtime.sendMessage({message:'getLocalStorage'}, resolveConfigData);

  return deferred.promise();
}


// value is the piece of data to be stored
function sendToDrive(options, value){
  var data = {
    worksheetKey: options.worksheetKey,
    col: options.defaultCol,
    value: value
  };

  // called after ajex call success
  function success(d){
    console.log(d);
  }

  // called after ajax call completes
  function complete(xhr) {
    console.log(xhr.status);
  }

  // send an ajax call to the backend rest api to write the data
  $.ajax({
    type: 'POST',
    contentType:'application/json; charset=utf-8',
    datType: 'json',
    url:  options.backendUrl+'/api/v1/cell/append',
    data: JSON.stringify(data),
    success: success,
    complete: complete,
  });
}


getConfig().done(function start(d){
  var options = d;
  console.log(options);
  var chipmunkUI;

  sendToDrive(options, document.location.href);
  // TODO call this with proper parameter after ajax
  chipmunkUI = addBannerToDom('saved');

  chipmunkUI.dismiss.on('click', dismissBanner);
});

