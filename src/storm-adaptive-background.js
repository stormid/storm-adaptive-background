(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.AdaptiveBackground = factory();
  }
}(this, function() {
    'use strict';

    // Include RGBaster - https://github.com/briangonzalez/rgbaster.js
    /* jshint ignore:start */
    !function(n){"use strict";var t=function(){return document.createElement("canvas").getContext("2d")},e=function(n,e){var a=new Image,o=n.src||n;"data:"!==o.substring(0,5)&&(a.crossOrigin="Anonymous"),a.onload=function(){var n=t("2d");n.drawImage(a,0,0);var o=n.getImageData(0,0,a.width,a.height);e&&e(o.data)},a.src=o},a=function(n){return["rgb(",n,")"].join("")},o=function(n){return n.map(function(n){return a(n.name)})},r=5,i=10,c={};c.colors=function(n,t){t=t||{};var c=t.exclude||[],u=t.paletteSize||i;e(n,function(e){for(var i=n.width*n.height||e.length,m={},s="",d=[],f={dominant:{name:"",count:0},palette:Array.apply(null,new Array(u)).map(Boolean).map(function(){return{name:"0,0,0",count:0}})},l=0;i>l;){if(d[0]=e[l],d[1]=e[l+1],d[2]=e[l+2],s=d.join(","),m[s]=s in m?m[s]+1:1,-1===c.indexOf(a(s))){var g=m[s];g>f.dominant.count?(f.dominant.name=s,f.dominant.count=g):f.palette.some(function(n){return g>n.count?(n.name=s,n.count=g,!0):void 0})}l+=4*r}if(t.success){var p=o(f.palette);t.success({dominant:a(f.dominant.name),secondary:p[0],palette:p})}})},n.RGBaster=n.RGBaster||c}(window);
    /* jshint ignore:end */

	var instances = [],
        assign = require('object-assign'),
        merge = require('merge'),
        defaults = {
            target: null,
            exclude: ['rgb(0,0,0)', 'rgb(255,255,255)'],
            cssBackground: false,
            normaliseTextColour: true,
            normalisedTextColours: {
                light: '#fff',
                dark: '#000'
            },
            lumaClasses: {
                light: 'ab-light',
                dark: 'ab-dark'
            },
            callback: null
        },
        AdaptiveBackground = {
            init: function() {
				this.targets = [].slice.call(document.querySelectorAll(this.settings.target));
				this.source = this.settings.cssBackground ? this.getCSSBackground() : this.DOMElement;
				this.findColour();
            },
            applyContrast: function() {
				var getYIQ = function(colour){
						var rgb = colour.match(/\d+/g);
						return ((rgb[0]*299)+(rgb[1]*587)+(rgb[2]*114))/1000;
					},
					normalisedTextColour = getYIQ(this.colours.dominant) >= 128 ? this.settings.normalisedTextColours.dark : this.settings.normalisedTextColours.light,
					lumaClass = getYIQ(this.colours.dominant) <= 128 ? this.settings.lumaClasses.dark : this.settings.lumaClasses.light;

				this.targets.forEach(function(el){
					if(!!this.settings.normaliseTextColour) {
						el.style.color = normalisedTextColour;
					}
					el.className = el.className + ' ' + lumaClass;
				}.bind(this));

			},
			applyColour: function() {
				this.targets.forEach(function(el){
					el.style.backgroundColor = this.colours.dominant;
				}.bind(this));
				return this;
			},
			findColour: function() {
				RGBaster.colors(this.source, {
					paletteSize: 20,
					exclude: this.settings.exclude,
					success: function(colours){
						this.colours = colours;
						this.applyColour()
							.applyContrast();
					}.bind(this)
				});

			},
			getCSSBackground: function() {
				var str = this.DOMElement.css('background-image'),
					regex = /\(([^)]+)\)/;
				return regex.exec(str)[1].replace(/"/g, '');
			}
        };
    
    function init(sel, opts) {
        var els = [].slice.call(document.querySelectorAll(sel));
        
        if(els.length === 0) {
            throw new Error('Adaptive background requires both source element and target');
        }
        
        els.forEach(function(el, i){
            instances[i] = assign(Object.create(AdaptiveBackground), {
                DOMElement: el,
                settings: merge({}, defaults, opts)
            });
            //add further objects as assign arguments for object composition
            instances[i].init();
        });
        return instances;
    }

    return {
        init: init
    };

}));