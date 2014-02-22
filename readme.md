#Chipmunk

Chipmunk is a bookmarking Google Chrome extension to stash data into your Google Spreadsheet.
It works with a companion [Chipmunk Rest Api](https://github.com/GlassyMedia/chipmunk-restapi) that handles the data.

##Usage

###Getting started:
You'll need [bower](http://bower.io/) and [node/npm](http://nodejs.org/) to install dependecies.

```sh
  npm install && bower install
```

###To Run:
* go to `chrome://extensions` in chrome and check the "Developer Mode" box
* click "Load unpacked extensions" and navigate to the `app` directory and load that up
* set your configuration by using the options menu of the plugin

###To Build:
```sh
  grunt build
```

###To Test:
```sh
  grunt test
```

###Configuration:
Configuration happens in the options menu of the plugin, within Chrome. Right click on the plugin icon to see the option menu.

