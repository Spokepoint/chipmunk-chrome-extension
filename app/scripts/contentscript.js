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

  function success(d){
    console.log(d);
  }

  $.ajax({
    type: 'POST',
    contentType:'application/json; charset=utf-8',
    datType: 'json',
    url:  options.backendUrl+'/api/v1/cell/append',
    data: JSON.stringify(data),
    success: success,
  });
}


getConfig().done(function start(d){
  var options = d;
  // TODO call this with proper parameter after ajax
  var chipmunkUI = addBannerToDom('saved');

  sendToDrive(options, document.location.href);

  chipmunkUI.dismiss.on('click', dismissBanner);

});

