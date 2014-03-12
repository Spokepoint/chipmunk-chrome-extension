/*
  This script gets run on the extension Options page.
*/
'use strict';

var chipmunk = {
  config:{
    worksheetKey: localStorage.worksheetKey,
    apiURL: localStorage.apiUrl,
  },
  init: function(){
    var that = this;
    // populate configuration
    if(localStorage.worksheetKey){
      chipmunk.UI.worksheetKey.val(localStorage.worksheetKey);
    }
    if(localStorage.apiURL){
      chipmunk.UI.apiURL.val(localStorage.apiURL);
    }

    //set column mappings
    var colmappings = localStorage.colMappings ? JSON.parse(localStorage.colMappings) : {};
    var template = '<p class="js-col-mapping"> <label> column title <input name="title" class="js-title" type="text" value="<%= title %>"> </label>'+
                    '<label> column <input name="column" class="js-column" type="text" value="<%= column %>""> </label>'+
                    '<button class="js-delete-colmap" type="button">remove</button></p>';
    _.each(colmappings, function(colmap){
      var compiledTpl = _.template(template, colmap);
      that.UI.colmapFieldset.append(compiledTpl);
    });

  },
  colMappings: [],
};


// populate form with saved data if available.


$(document).ready(function start(){
  chipmunk.UI = {
    worksheetKey: $('#worksheet-key'),
    apiURL: $('#api-url'),
    colmapFieldset: $('#js-colmap-fieldset'),
  };

  function deleteColMap(e){
    $(e.currentTarget).parent().remove();
  }

  function addNewColumnMapping(){
    var template = '<p class="js-col-mapping"> <label> column title <input name="title" class="js-title" type="text"> </label>'+
                    '<label> column <input name="column" class="js-column" type="text"> </label>'+
                    '<button class="js-delete-colmap" type="button">remove</button></p>';
    chipmunk.UI.colmapFieldset.append(template);

    // re-register click handler on remove btn
    $('.js-delete-colmap').on('click', deleteColMap);
  }

  function getColumnMapping(){
    var rows = chipmunk.UI.colmapFieldset.children('.js-col-mapping');
    var data = $.map(rows, function(item){
      return {
        title: $(item).find('.js-title').val(),
        column: $(item).find('.js-column').val(),
      };
    });

    return data;
  }

  function saveColumnMapping(data){
    localStorage.setItem('colMappings', JSON.stringify(data));
  }

  function saveChanges(){
    saveColumnMapping(getColumnMapping());
  }

  chipmunk.init();

  $('#js-save-changes').on('click', saveChanges);
  $('.js-delete-colmap').on('click', deleteColMap);
  $('#js-add-column').on('click', addNewColumnMapping);
  $('.js-config-stored').on('keyup', function save(){
    localStorage.setItem($(this).attr('name'), $(this).val());
  });

});

