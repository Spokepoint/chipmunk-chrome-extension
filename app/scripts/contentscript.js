
//  This is what gets run when you click on the extension icon.
//  This script runs in a sandboxed environment.


'use strict';

var chipmunk = (function($, _){

  var cp = {
    // gets extension options from localstorage
    getConfig: function(){
      var deferred = $.Deferred();
      function resolveConfigData(response){
        deferred.resolve(response.data);
      }
      chrome.runtime.sendMessage(
        {message:'getLocalStorage'}, resolveConfigData);
      return deferred.promise();
    },
    pageUI:{
      body: $('body')
    },
    extUI: {},
    bindExtUI: function(){
      this.extUI.dismiss = $('#chipmunk-close');
      this.extUI.save = $('#chipmunk-save');
      this.extUI.container = $('#chipmunk-ext-container');
      this.extUI.dataInputs = $('.js-column-map');
    },
    templates: {
      container: '<div id="chipmunk-ext-container"> '+
        '<button id="chipmunk-save">save</button>'+
        '<button id="chipmunk-close">close</button>'+
        '</div>',
      dataInput: '<label> <%= title %> </label><input name="column" class="js-column-map" data-title="<%= title %>" data-column="<%= column %>" type="text">',

    },
    initUI: function(){
      this.pageUI.body.append(this.templates.container);
      this.bindExtUI();
    },
    populateInputs: function(options, $rootEl){
      var that = this;
      console.log(options.colMappings);
      _.each(options.colMappings, function(mapping){
        $rootEl.append(_.template(that.templates.dataInput, mapping));
      });
      this.bindExtUI();
      // rebind the ui map
    },
    dismissBanner: function(){
      this.extUI.container.remove();
    },
    getColMapInput: function(){
      return $.map(this.extUI.dataInputs, function(el){
        var data = $(el).data();
        data.value = $(el).val();
        return data;
      });
    },
    sendToDrive: function(e){
      var that = this;
      var options = e.data.options;
      var inputPayload = this.getColMapInput();

      var dataArr = _.map(inputPayload, function(item){
        return {
          worksheetKey: options.worksheetKey,
          col: item.column,
          value: item.value
        };
      });

      _.each(dataArr, function(data){
        // send an ajax call to the backend rest api to write the data
        $.ajax({
          type: 'POST',
          contentType:'application/json; charset=utf-8',
          dataType: 'json',
          url:  options.apiURL+'/api/v1/cell/append',
          data: JSON.stringify(data),
          success: that.saveSuccess,
          complete: that.ajaxComplete,
        });
      });
    },
    saveSucess: function(d){
      console.log(d);
    },
    complete: function(xhr){
      console.log(xhr.status);
    }
  };

  return cp;

})($, _);


// begin

chipmunk.getConfig().done(function (options){
  chipmunk.initUI();
  chipmunk.populateInputs(options, chipmunk.extUI.container);

  chipmunk.extUI.save.on('click', {options: options}, _.bind(chipmunk.sendToDrive, chipmunk));
  chipmunk.extUI.dismiss.on('click', _.bind(chipmunk.dismissBanner, chipmunk));
});

