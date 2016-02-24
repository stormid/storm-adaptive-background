#Storm Adaptive Background

Find the dominant colours in an image and set one as the background colour of a DOM element

##Usage
```
npm install storm-adaptive-background
```

```javascript
var StormAdaptiveBackground = require('storm-adaptive-background')
StormAdaptiveBackground.init('js-equal-height',  {minWidth: 768});
```

###Options
	- target, String, CSS selector denoting target elements to apply the background colour
	- normaliseTextColour, boolean, default: false, to normalise the color of the parent text if background color is too dark or too light
	- normalisedTextColours, Object, default: {dark: '#000', light: '#fff'} text colors used when background is either too dark/light
	- lumaClasses
	- callback, Function, called after colour background is set
	
###Credits
A browserify object compositional refactoring of https://github.com/briangonzalez/jquery.adaptive-backgrounds.js