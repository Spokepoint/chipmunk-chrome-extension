/*
  This is what gets run when you click on the extension icon.
*/

'use strict';


function addBannerToDom(){
  $('body').append('<div id="chipmunk-ext-container"> '+
      '<p> saved</p>'+
      '<button id="chipmunk-close">close</button>'+
    '</div>');

  // return a ui elements hash
  return {
    dismiss: $('#chipmunk-close'),
    container: $('#chipmunk-ext-container'),
  };
}

// just removes the extension container from the page
function dismissBanner(){
  $('#chipmunk-ext-container').remove();
}


// gets extension options from localstorage
function getConfig(){
  var deferred = $.Deferred();
  chrome.runtime.sendMessage(
    {message:'getLocalStorage'},
    function(response){
      deferred.resolve(response.data);
    }
  );
  return deferred.promise();
}

// value is the piece of data to be stored
// type is a key to [name] > [column] mapping in the options
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
  var chipmunkUI = addBannerToDom();

  sendToDrive(options, document.location.href);
  chipmunkUI.dismiss.on('click', dismissBanner);


});

