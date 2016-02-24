/*global window, document, console, require*/
var STORM = (function(w, d) {
	'use strict';
    
    var AdaptiveBackground = require('./libs/storm-adaptive-background'),
        init = function() {
            AdaptiveBackground.init('.js-adaptive-background', {
                target: 'main',
                callback: function() {
                    console.log('Success');
                }
            });
			
            /*
            AdaptiveBackground.init('#test', {
                target: 'main',
                exclude: ['rgb(0,0,0)', 'rgba(255,255,255)'],
                normalizeTextColor: false,
                normalizedTextColors: {
                    light: '#fff',
                    dark: '#000'
                },
                lumaClasses:  {
                    light: 'ab-light',
                    dark: 'ab-dark'
              }
            });
            */
        };
	
	return {
		init: init
	};
	
})(window, document, undefined);

if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORM.init, false);