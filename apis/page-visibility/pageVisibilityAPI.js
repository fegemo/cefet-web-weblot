window.onload = function() {
	var prefix = getPrefix();
  
	var hidden = getHiddenProperty(prefix);
	var visibilityState = getVisibilityStateProperty(prefix);
	var visibilityChangeEvent = getVisibilityEvent(prefix);
  
	var wasPlaying = false;
  
	var video = document.getElementById('video');
  
	document.addEventListener(visibilityChangeEvent, function(e) {
	  
	  if (document[hidden]) {
			if (video.paused == false) {
				wasPlaying = true;
		
				video.pause();
			} else {
				wasPlaying = false;
			}
	  } else {
			if (wasPlaying) {
				video.play();
			}
	  }
	});
  
  }
  
  function getPrefix() {
	if ('hidden' in document) {
	  return null;
	}
  
	var prefixes = ['moz', 'ms', 'o', 'webkit'];
  
	for (var i = 0; i < prefixes.length; i++) {
	  var testPrefix = prefixes[i] + 'Hidden';
	  if (testPrefix in document) {
		return prefixes[i];
	  }
	}
  
	return null;
  }
  
  function getHiddenProperty(prefix) {
	if (prefix) {
	  return prefix + 'Hidden';
	} else {
	  return 'hidden';
	}
  }
  
  function getVisibilityStateProperty(prefix) {
	if (prefix) {
	  return prefix + 'VisibilityState';
	} else {
	  return 'visibilityState';
	}
  }
  
  function getVisibilityEvent(prefix) {
	if (prefix) {
	  return prefix + 'visibilitychange';
	} else {
	  return 'visibilitychange';
	}
  }
  