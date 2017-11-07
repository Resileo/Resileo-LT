function client_callback(result, context) {  
    if (result != null) {
        var image = document.getElementById(get_id('QuoteImage'));
        if (image != null) {
            (new Image( )).src = result; // just a trick to cache image before displaying
            image.src = result;
        }
    }
    
    setTimeout(stop_quote_wait_indic, 1000);
}

function start_quote_wait_indic() {
    document.getElementById(get_id('ChangeQuoteButton')).style.cursor = 'wait';
}

function stop_quote_wait_indic() {
    document.getElementById(get_id('ChangeQuoteButton')).style.cursor = 'auto';
}

function change_quote_click() {
    var img = document.getElementById(get_id('QuoteImage'));
    var selectFont = document.getElementById(get_id('SelectFont'));
    var selectSize = document.getElementById(get_id('SelectSize'));
    var selectStyle = document.getElementById(get_id('SelectStyle'));
    var selectColor = document.getElementById(get_id('SelectColor'));
    var text = document.getElementById(get_id('Quote'));
    
    if (img != null && selectFont != null && selectSize != null
        && selectStyle != null && selectColor != null && text != null) {
        start_quote_wait_indic();
        ServerCallback(img.src + "|" 
            + selectFont.selectedIndex + "|" + selectSize.selectedIndex + "|"
            + selectStyle.selectedIndex + "|" + selectColor.selectedIndex + "|"
            + text.value);
    }
}

function quote_admin_button_click() {
    do_admin_button_click('quote_admin', 'QuoteAdminButton', "Quote Admin");
}

function photo_admin_button_click() {
    do_admin_button_click('photo_admin', 'PhotoAdminButton', "Photo Admin");
}

function do_admin_button_click(sectionId, buttonId, buttonText) {
    var adminSection = document.getElementById(sectionId);
    var adminButton = document.getElementById(get_id(buttonId));
    if (adminSection && adminButton) {
        if (adminSection.style.display == "none") {
            adminSection.style.display = "block";
            adminButton.value = "Close " + buttonText;
        }   
        else {
            adminSection.style.display = "none";
            adminButton.value = "Show " + buttonText;
        }
     }
}

function upload_click() {
    return AIM.submit( document.getElementById('aspnetForm'), {'onStart' : startCallback, 'onComplete' : completeCallback});
}

function startCallback() {	
    return true;
}
 
function completeCallback(response) {	
    if (response) {
        var responses = response.split("|");
        if (responses[0] != "OK") {
            alert(responses[1]);
        }
        else {
            var url = responses[1];
            //alert(url);
            var img = document.getElementById(get_id('MainImage'));
            if (img) {
                img.src = url;
            }
        }
    }	
}
		
