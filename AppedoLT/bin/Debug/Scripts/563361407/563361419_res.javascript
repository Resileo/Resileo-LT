/// Return the element x coordinate relative to the doc
function get_x(element) {
    var x = 0;                
    for(var e = element; e; e = e.offsetParent) 
        x += e.offsetLeft;
    
    // account for scrolling
    for(e = element.parentNode; e; e = e.parentNode)
        if (e.scrollLeft) x -= e.scrollLeft;  

    return x;                 
}

/// Return the element y coordinate relative to the doc
function get_y(element) {
    var y = 0;                
    for(var e = element; e; e = e.offsetParent) 
        y += e.offsetTop;
    
    // account for scrolling
    for(e = element.parentNode; e; e = e.parentNode)
        if (e.scrollTop) y -= e.scrollTop; 
        
    return y;                 
}

// When embedding controls in master pages, ASP.NET seems
// to add this string to the IDs of Web Controls (HTML controls
// are unchanged).
function get_id(name) {
    return 'ctl00_ContentPlaceHolder1_' + name;
}

//
// This class is from webtoolkit.info (http://www.webtoolkit.info/ajax-file-upload.html)
// It's a trick to redirect a postback to an invisible iframe so that no unnecessary
// page refresh happens. This is the best one can do using the ASP.NET FileUpload control
// since it requires a postback. Same is true for ABCUpload.
// See default.js for an example on how to use it.
//
AIM = {
 
	frame : function(c) {
 
		var n = 'f' + Math.floor(Math.random() * 99999);
		var d = document.createElement('DIV');
		d.innerHTML = '<iframe style="display:none" src="about:blank" id="'+n+'" name="'+n+'" onload="AIM.loaded(\''+n+'\')"></iframe>';
		document.body.appendChild(d);
 
		var i = document.getElementById(n);
		if (c && typeof(c.onComplete) == 'function') {
			i.onComplete = c.onComplete;
		}
 
		return n;
	},
 
	form : function(f, name) {
		f.setAttribute('target', name);
	},
 
	submit : function(f, c) {
		AIM.form(f, AIM.frame(c));
		if (c && typeof(c.onStart) == 'function') {
			return c.onStart();
		} else {
			return true;
		}
	},
 
	loaded : function(id) {
		var i = document.getElementById(id);
		if (i.contentDocument) {
			var d = i.contentDocument;
		} else if (i.contentWindow) {
			var d = i.contentWindow.document;
		} else {
			var d = window.frames[id].document;
		}
		if (d.location.href == "about:blank") {
			return;
		}
 
		if (typeof(i.onComplete) == 'function') {
			i.onComplete(d.body.innerHTML);
		}
	}
 
}