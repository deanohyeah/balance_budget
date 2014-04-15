requirejs.config({
    paths: {
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min",
      'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
      "backbone": '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min'
    },
    shim: {
      underscore: {
        exports: "_"
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      }
    }
});

define(function(require, exports, module) {

        var $ = require('jquery'),
        	_         = require('underscore'),
        	Backbone  = require('backbone'),
        	ListView  = require('views/list_view');


        //adds dataTransfer event to jquery
        $.event.props.push('dataTransfer');
        var listView = new ListView();
    }
);
		