'use strict';



// populate form with saved data if available.
function init(){
  if(localStorage.worksheetKey){
    $('#worksheet-key').val(localStorage.worksheetKey);
  }
  if(localStorage.backendUrl){
    $('#backend-url').val(localStorage.backendUrl);
  }
  if(localStorage.defaultCol){
    $('#default-col').val(localStorage.defaultCol);
  }
}


$(document).ready(function start(){
  init();

  $('.js-stored').on('keyup', function save(){
    localStorage.setItem($(this).attr('name'), $(this).val());
  });

});

