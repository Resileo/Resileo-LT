// ************************ Common ************************
// Ajax
function ApplicationLoadHandler(sender, args) {
    if (!Sys.WebForms.PageRequestManager.getInstance().get_isInAsyncPostBack()) {
        Sys.WebForms.PageRequestManager.getInstance().add_initializeRequest(InitializeRequest);
    }
}
function InitializeRequest(sender, args) {
    var prm = Sys.WebForms.PageRequestManager.getInstance();
    if (prm.get_isInAsyncPostBack()) {
        args.set_cancel(true);
        window.alert("Please wait while the current process finishes.");
    }
}
function GetBrowserCode() {
    var ua = navigator.userAgent.toLowerCase();
    var bid = 0;

    if (ua.indexOf("msie") != -1)
        bid = 1;
    else if (ua.indexOf("firefox") != -1)
        bid = 2;
    else if (ua.indexOf("mozilla") != -1)
        bid = 3;
    else if (ua.indexOf("netscape") != -1)
        bid = 4;
    else if (ua.indexOf("opera") != -1)
        bid = 5;
    else if (ua.indexOf("safari") != -1)
        bid = 6;

    return bid;
}
function GetBrowserName() {
    var ua = navigator.userAgent.toLowerCase();
    var bid = "";

    if (ua.indexOf("msie") != -1)
        bid = "msie";
    else if (ua.indexOf("firefox") != -1)
        bid = "firefox";
    else if (ua.indexOf("mozilla") != -1)
        bid = "mozilla";
    else if (ua.indexOf("netscape") != -1)
        bid = "netscape";
    else if (ua.indexOf("opera") != -1)
        bid = "opera";
    else if (ua.indexOf("safari") != -1)
        bid = "safari";

    return bid;
}
// ************************ Search Flight.aspx ************************
function ValidateDatesMain() {
    var sep = "/";
    var dat1 = get_String_Date(document.getElementById("ccTxtDepart").value, sep);
    var dat2 = get_String_Date(document.getElementById("ccTxtReturn").value, sep);

    if (compareDates(dat1, dat2) > 0) {
        document.getElementById("ccTxtReturn").value = get_Date_String(dat1, sep);
    }
}
function ValidateDatesMC() {
    var sep = "/";

    var td1 = document.getElementById("ccTxtDt1");
    var td2 = document.getElementById("ccTxtDt2");
    var td3 = document.getElementById("ccTxtDt3");
    var td4 = document.getElementById("ccTxtDt4");
    var td5 = document.getElementById("ccTxtDt5");

    var dat1 = get_String_Date(td1.value, sep);
    var dat2 = get_String_Date(td2.value, sep);
    var dat3 = get_String_Date(td3.value, sep);
    var dat4 = get_String_Date(td4.value, sep);
    var dat5 = get_String_Date(td5.value, sep);

    if (compareDates(dat1, dat2) > 0) { td2.value = get_Date_String(dat1, sep); dat2 = dat1; }
    if (compareDates(dat2, dat3) > 0) { td3.value = get_Date_String(dat2, sep); dat3 = dat2; }
    if (compareDates(dat3, dat4) > 0) { td4.value = get_Date_String(dat3, sep); dat4 = dat3; }
    if (compareDates(dat4, dat5) > 0) { td5.value = get_Date_String(dat4, sep); dat5 = dat4; }
}
function acePopulatedFrom(sender, e) {
    var behavior = $find('AutoCompleteExFrom');
    var target = behavior.get_completionList();
    var children = target.childNodes;
    var searchText = $get('ccTxtSrcArPrt').value;

    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var value = child._value;
        //        child.innerHTML = eval("value.replace(/(" + searchText + ")/i, '<b>$1</b>')");
    }
}
function aceSelectedFrom(sender, e) {
    $get('ccTxtSrcArPrt').value = e.get_value();
}
function acePopulatedTo(sender, e) {
    var behavior = $find('AutoCompleteExTo');
    var target = behavior.get_completionList();
    var children = target.childNodes;
    var searchText = $get('ccTxtDstArPrt').value;

    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var value = child._value;
        //        child.innerHTML = eval("value.replace(/(" + searchText + ")/i, '<b>$1</b>')");
    }
}
function aceSelectedTo(sender, e) {
    $get('ccTxtDstArPrt').value = e.get_value();
}
function show_hide_advance(isLoad) {

    var bkd = document.getElementById("divAdv");
    var bkh = document.getElementById("hidAdv");
    if (isLoad == null) isLoad = false;
    if (isLoad) {
        if ((bkh != null) && (bkh.value == "1")) {
            bkd.style.display = "block";
        }
    }
    else {
        if (bkd.style.display == "block") {
            bkd.style.display = "none";
            if (bkh != null) { bkh.value = "0" }
        }
        else {
            bkd.style.display = "block";
            if (bkh != null) { bkh.value = "1" }
        }
    }
}
function show_hidePrefered() {

}
function WaterMark(txt, txtName, event) {
    var defaultText = txt;
    txtName.style.color = "Gray";
    
    if (txtName.value.length == 0 & event.type == "blur") {
        txtName.value = defaultText;
    }
    if (txtName.value == defaultText & event.type == "focus") {
        txtName.value = "";
    }

}
function WaterMarkEnptyTextBox(txt, txtName, event) {
    var defaultText = txt;
    txtName.style.color = "Gray";
   
    if (txtName.value.length == 0) {
        txtName.value = defaultText;
    }
    if (txtName.value == defaultText) {
     //   txtName.value = "";
    }

}
function SelectOwRtMain() {
    var txtRet = document.getElementById("ccTxtReturn");
    var ddlRetTime = document.getElementById("ccDDLReturnTime");
    var hlRetDate = document.getElementById("hl2");
    var txtRetRt = document.getElementById("ccTxtReturnRoute1");
    var divRetTxt = document.getElementById("divRetTxt");
    var divRetTimeTxt = document.getElementById("divRetTimeTxt");
    var divReturnRouteTxt = document.getElementById("divReturnRouteTxt");
  
    var txtDep = document.getElementById("ccTxtDepart");
  
    if (txtRet == null) return;
    if (document.getElementById("ccRblOWRT_1").checked == true) {
     //   txtRet.value = 'dd/mm/yyyy';
       // WaterMarkEnptyTextBox('dd/mm/yyyy', txtRet, null)
       //txtRet.style.color = "Gray";
      // txtRet.readOnly = true;
       //txtRetRt.style.visibility = "hidden";
        //txtRet.style.visibility = "hidden";
        //ddlRetTime.style.visibility = "hidden";
        //hlRetDate.style.visibility = "hidden";
        //divRetTxt.style.visibility = "hidden";
        //divRetTimeTxt.style.visibility = "hidden";
        //divReturnRouteTxt.style.visibility = "hidden";
    }
    else if (document.getElementById("ccRblOWRT_0").checked == true) {
       // txtRet.readOnly = false;
        txtRetRt.style.visibility = "visible";
        txtRet.style.visibility = "visible";
        ddlRetTime.style.visibility = "visible";
        txtRet.style.visibility = "visible";
        divRetTxt.style.visibility = "visible";
        divRetTimeTxt.style.visibility = "visible"; 
        divReturnRouteTxt.style.visibility = "visible";
     
    }
}
function CheckPrefAirlines(option, checkBoxId) {

    var chkBoxList = document.getElementById(checkBoxId);
    var chkBoxes = chkBoxList.getElementsByTagName("input");
    var labels = chkBoxList.getElementsByTagName("label");
    for (var i = 0; i < chkBoxes.length; i++) {
        if (!chkBoxes[i].disabled) {
            if (option == 0) // None
            {
                chkBoxes[i].checked = false;
            }
            else if (option == 1) // All
            {
                chkBoxes[i].checked = true;
            }
            else if (option == 2) // GDS
            {
                var x = labels[i].childNodes[0].data;
                chkBoxes[i].checked = (x.substr(x.length - 1) == " ");
            }
            else if (option == 3) // LCC
            {
                var x = labels[i].childNodes[0].data;
                chkBoxes[i].checked = (x.substr(x.length - 1) != " ");
            }
        }
        else {
            chkBoxes[i].checked = false;
        }
    }
}

// ***** Added for selecting preffered GDS/LCC APIs  ******

function CheckPrefAPIs(optionId, checkBoxId) {//added by aj..... on 7/12/13
    var chkBoxList = document.getElementById(checkBoxId);
    var chkBoxes = chkBoxList.getElementsByTagName("input");
    var labels = chkBoxList.getElementsByTagName("label");
    if ($.inArray('LCC', optionId) > -1) {
        for (var i = 0; i < chkBoxes.length; i++) {

            if (!chkBoxes[i].disabled && (labels[i].childNodes[0].data.toLowerCase().indexOf("spice jet") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("tm fare") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("tbo") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("tiger airways") > -1 ||
                labels[i].childNodes[0].data.toLowerCase().indexOf("airarabia") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("indigo") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("lawsonspecial") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("airindiaexpress") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("airasia ") > -1)) {
                chkBoxes[i].checked = true;
            }
        }
    }
    else {
        for (var i = 0; i < chkBoxes.length; i++) {

            if (!chkBoxes[i].disabled && (labels[i].childNodes[0].data.toLowerCase().indexOf("spice jet") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("tm fare") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("tbo") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("tiger airways") > -1 ||
                labels[i].childNodes[0].data.toLowerCase().indexOf("airarabia") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("indigo") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("lawsonspecial") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("airindiaexpress") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("airasia ") > -1)) {
                chkBoxes[i].checked = false;
            }
        }
    }
    if ($.inArray('GDS', optionId) > -1) {
        for (var i = 0; i < chkBoxes.length; i++) {
            if (!chkBoxes[i].disabled && (labels[i].childNodes[0].data.toLowerCase().indexOf("galileo") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("abacus") > -1)) {
                chkBoxes[i].checked = true;
            }
        }
    }
    else {
        for (var i = 0; i < chkBoxes.length; i++) {
            if (!chkBoxes[i].disabled && (labels[i].childNodes[0].data.toLowerCase().indexOf("galileo") > -1 || labels[i].childNodes[0].data.toLowerCase().indexOf("abacus") > -1)) {
                chkBoxes[i].checked = false;
            }
        }
    }
}

function ShowDealInfo(did) {
    var windOpts = "width=500,height=400,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no";
    window.open("BBFlightDealInfo.aspx?did=" + did, "SpDealInfo", windOpts);
}
// ********* BBFlightSearchResultsDomAP.aspx, BBFlightSearchResultsIntl.aspx *********
function iSFD(ix) // itn_ShowfareDetails
{
    var sid = document.getElementById("ccHfSid").value;
    var windOpts = "width=620,height=500,toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,copyhistory=no,resizable=no";

    window.open("BBFareDetailsIntl.aspx?ItID=" + ix + "&SID=" + sid, "FareDetails", windOpts);
}
function iSFD(ix, fx) // itn_ShowfareDetails
{
    var sid = document.getElementById("ccHfSid").value;
    var url = "BBFareDetailsIntl.aspx?ItID=" + ix + "&fID=" + fx + "&SID=" + sid;

    // window.open(, "FareDetails", windOpts);
    TINY.box.show({ iframe: url, width: 620, height: 500 });
}
function iCC(fare) // itn_CurrencyConverter
{
    var windOpts = "width=280,height=270,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no";
    window.open("../BBCurrency.aspx?code=INR&val=" + fare, "CurrencyConverter", windOpts);
}
function iCI(airport) // itn_CityInfo
{
    var windOpts = "width=770,height=500,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=yes";
    window.open("../BBCityInfo.aspx?code=" + airport, "CityInfo", windOpts);
}
function iSB(iid) // itn_SelectBooking
{
    document.getElementById("ccHfBookSel").value = iid;
    document.getElementById("form1").submit();
    document.getElementById("ccHfBookSel").value = "";
}

function ValidateDates_Intl() {
    var sep = "/";
    var dat1 = get_String_Date(document.getElementById("ccTxtDateOW").value, sep);
    var dat2 = get_String_Date(document.getElementById("ccTxtDateRT").value, sep);

    if (compareDates(dat1, dat2) > 0) {
        document.getElementById("ccTxtDateRT").value = get_Date_String(dat1, sep);
    }
}
function CheckFilterAirlines(isChecked, checkBoxId) {
    var chkBoxList = document.getElementById(checkBoxId);
    if (chkBoxList != null) {
        var chkBoxes = chkBoxList.getElementsByTagName("input");
        for (var i = 0; i < chkBoxes.length; i++) {
            chkBoxes[i].checked = isChecked;
        }
    }
}
// Airport Listing
function acePopulatedFrom_Intl(sender, e) {
    var behavior = $find('ACExFrom');
    var target = behavior.get_completionList();
    var children = target.childNodes;
    var searchText = $get('ccTxtFrom').value;

    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var value = child._value;
        //        child.innerHTML = eval("value.replace(/(" + searchText + ")/i, '<b>$1</b>')");
    }
}
function aceSelectedFrom_Intl(sender, e) {
    $get('ccTxtFrom').value = e.get_value();
}

function acePopulatedTo_Intl(sender, e) {
    var behavior = $find('ACExTo');
    var target = behavior.get_completionList();
    var children = target.childNodes;
    var searchText = $get('ccTxtTo').value;

    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var value = child._value;
        //        child.innerHTML = eval("value.replace(/(" + searchText + ")/i, '<b>$1</b>')");
    }
}
function aceSelectedTo_Intl(sender, e) {
    $get('ccTxtTo').value = e.get_value();
}
// ********* BBFlightSearchResultsDom.aspx *********
function SetUniqueRadioButton(nameregex, current) {
    re = new RegExp(nameregex);
    for (i = 0; i < document.forms[0].elements.length; i++) {
        elm = document.forms[0].elements[i]
        if (elm.type == 'radio') {
            if (re.test(elm.name)) elm.checked = false;
        }
    }
    current.checked = true;
}


function SelectOwRt_DOMAP() {
    var txtRet = document.getElementById("ccTxtDateRT"); //date txtbox
    var ddlRetTime = document.getElementById("ccDdlDepartTimeRT"); //dropdown time
    var hlRetDate = document.getElementById("ccHlDateRT"); //cal img
    var divRetTxt = document.getElementById("divRetTxt"); ///return text label
    var divRetTimelbl = document.getElementById("divRetTimeTxt"); //return time label


    if (document.getElementById("ccRblOWRT_0").checked == true) {//txtRet.style.visibility = "hidden";
        //$("#ccTblDI_1").css("display", "none");  //("#ccDivMul").css("display", "none");
        $("#ccTblMC_1").css("display", "none"); $("#ccTblDI_1").css("display", "block"); $("#divAdv").css("display", "block");
        //txtRet.disabled = true; ddlRetTime.disabled = true; hlRetDate.style.visibility = "hidden";
        //divRetTxt.style.visibility = "hidden"; txtRet.style.visibility = "hidden"; divRetTimelbl.style.visibility = "hidden"; ddlRetTime.style.visibility = "hidden";
    }
    else if (document.getElementById("ccRblOWRT_1").checked == true) {
        //$("#ccTblDI_1").css("display", "none"); $("#ccTblMC_1").css("display", "none"); //("#ccDivMul").css("display", "none");
        $("#ccTblMC_1").css("display", "none"); $("#ccTblDI_1").css("display", "block"); $("#divAdv").css("display", "block");
        // txtRet.disabled = false; txtRet.disabled = false; txtRet.style.visibility = "visible"; divRetTxt.style.visibility = "visible"; ddlRetTime.disabled = false; hlRetDate.style.visibility = "hidden";
        // divRetTimelbl.style.visibility = "visible"; ddlRetTime.style.visibility = "visible";
    }
    else if (document.getElementById("ccRblOWRT_2").checked == true) {
        $("#divAdv").css("display", "none"); $("#advPanel").css("display", "none"); $("#ccDomInventory").css("display", "block"); $("#ccTblDI_1").css("display", "none");
        $("#ccTblPA_Dom").hide(); $("#ccTblPA_Intl").hide(); $("#ccTblMC_1").css("display", "block"); //("#ccDivMul").css("display", "block"); ("#ccDomInventory").hide();
        //$("#ccTxtDt1").val(new Date());
    }
}
function SelectOwRt_Intl() {
    var txtRet = document.getElementById("ccTxtDateRT"); //date txtbox
    var ddlRetTime = document.getElementById("ccDdlDepartTimeRT"); //dropdown time
    var hlRetDate = document.getElementById("ccHlDateRT"); //cal img
    var divRetTxt = document.getElementById("divRetTxt"); ///return text label
    var divRetTimelbl = document.getElementById("divRetTimeTxt"); //return time label


    if (document.getElementById("ccRblOWRT_0").checked == true) {//txtRet.style.visibility = "hidden";
        //$("#ccTblDI_1").css("display", "none");  //("#ccDivMul").css("display", "none");
        $("#ccTblMC_1").css("display", "none"); $("#ccTblDI_1").css("display", "block"); $("#divAdv").css("display", "block");
        //txtRet.disabled = true; ddlRetTime.disabled = true; hlRetDate.style.visibility = "hidden";
        //divRetTxt.style.visibility = "hidden"; txtRet.style.visibility = "hidden"; divRetTimelbl.style.visibility = "hidden"; ddlRetTime.style.visibility = "hidden";
    }
    else if (document.getElementById("ccRblOWRT_1").checked == true) {
        //$("#ccTblDI_1").css("display", "none"); $("#ccTblMC_1").css("display", "none"); //("#ccDivMul").css("display", "none");
        $("#ccTblMC_1").css("display", "none"); $("#ccTblDI_1").css("display", "block"); $("#divAdv").css("display", "block");
       // txtRet.disabled = false; txtRet.disabled = false; txtRet.style.visibility = "visible"; divRetTxt.style.visibility = "visible"; ddlRetTime.disabled = false; hlRetDate.style.visibility = "hidden";
       // divRetTimelbl.style.visibility = "visible"; ddlRetTime.style.visibility = "visible";
    }
    else if (document.getElementById("ccRblOWRT_2").checked == true) {
        $("#divAdv").css("display", "none"); $("#advPanel").css("display", "none"); $("#ccDomInventory").css("display", "block"); $("#ccTblDI_1").css("display", "none");
        $("#ccTblPA_Dom").hide(); $("#ccTblPA_Intl").hide(); $("#ccTblMC_1").css("display", "block"); //("#ccDivMul").css("display", "block"); ("#ccDomInventory").hide();
        //$("#ccTxtDt1").val(new Date());
    }
}
function SelectOwRt_Dom() {
    var txtRet = document.getElementById("ccTxtDateRT");
    var ddlRetTime = document.getElementById("ccDdlDepartTimeRT");
    var hlRetDate = document.getElementById("ccHlDateRT");
    var divRetTxt = document.getElementById("divRetTxt");
    var divFB = document.getElementById("ccPnlFB");
    var divRetTimelbl = document.getElementById("divRetTimeTxt");

    if (document.getElementById("ccRblOWRT_0").checked == true) {
        $("#ccTblMC_1").css("display", "none"); $("#ccTblDI_1").css("display", "block"); $("#divAdv").css("display", "block");
      //  hlRetDate.style.visibility = "hidden"; divRetTxt.style.visibility = "hidden"; txtRet.style.visibility = "hidden"; //  txtRet.disabled = true;  ddlRetTime.disabled = true;
     //   ccPnlFB.style.visibility = "hidden"; divRetTimelbl.style.visibility = "hidden"; ddlRetTime.style.visibility = "hidden"; // txtRet.style.backgroundColor = "#E0E0E0"; ddlRetTime.style.backgroundColor = "#E0E0E0";
    }
    else if (document.getElementById("ccRblOWRT_1").checked == true) {
        $("#ccTblMC_1").css("display", "none"); $("#ccTblDI_1").css("display", "block"); $("#divAdv").css("display", "block");
       // txtRet.style.visibility = "visible"; divRetTxt.style.visibility = "visible"; ddlRetTime.disabled = false; txtRet.disabled = false; // hlRetDate.style.visibility = "visible";
       // ddlRetTime.style.visibility = "visible"; divRetTimelbl.style.visibility = "visible"; ccPnlFB.style.visibility = "visible"; //txtRet.style.backgroundColor = ""; ddlRetTime.style.backgroundColor = ""; 
    }
    else if (document.getElementById("ccRblOWRT_2").checked == true) {
        $("#divAdv").css("display", "none"); $("#advPanel").css("display", "none"); $("#ccDomInventory").css("display", "block"); $("#ccTblDI_1").css("display", "none");
        $("#ccTblPA_Dom").hide();
       $("#ccTblPA_Intl").hide();
        $("#ccTblMC_1").css("display", "block"); //("#ccDivMul").css("display", "block"); ("#ccDomInventory").hide();
        //$("#ccTxtDt1").val(new Date());
       // $("#ccTblPA_Dom").hide();
    }
}
function SelectOwRt_DomRT() {
    var txtRet = document.getElementById("ccTxtDateRT");
    var ddlRetTime = document.getElementById("ccDdlDepartTimeRT");
    var hlRetDate = document.getElementById("ccHlDateRT");
    var divRetTxt = document.getElementById("divRetTxt");
    var divRetTimelbl = document.getElementById("divRetTimeTxt");

    if (document.getElementById("ccRblOWRT_0").checked == true) {
        $("#ccTblMC_1").css("display", "none"); $("#ccTblDI_1").css("display", "block"); $("#divAdv").css("display", "block");
       // hlRetDate.style.visibility = "hidden"; divRetTxt.style.visibility = "hidden"; txtRet.style.visibility = "hidden";  //ddlRetTime.disabled = true;  txtRet.disabled = true;
    //    txtRet.style.visibility = "hidden"; ddlRetTime.style.visibility = "hidden"; divRetTimelbl.style.visibility = "hidden"; //txtRet.style.backgroundColor = "#E0E0E0"; ddlRetTime.style.backgroundColor = "#E0E0E0";
    }
    else if (document.getElementById("ccRblOWRT_1").checked == true) {
        $("#ccTblMC_1").css("display", "none"); $("#ccTblDI_1").css("display", "block"); $("#divAdv").css("display", "blck");
     //   txtRet.disabled = false; txtRet.style.visibility = "visible"; divRetTxt.style.visibility = "visible"; //ddlRetTime.disabled = false; //hlRetDate.style.visibility = "visible";
      //  ddlRetTime.style.visibility = "visible"; divRetTimelbl.style.visibility = "visible"; //txtRet.style.backgroundColor = ""; ddlRetTime.style.backgroundColor = "";
    }
    else if (document.getElementById("ccRblOWRT_2").checked == true) {
        $("#divAdv").css("display", "none"); $("#advPanel").css("display", "none"); $("#ccDomInventory").css("display", "none"); $("#ccTblDI_1").css("display", "none"); $("#ccTblPA_Dom").hide(); $("#ccTblPA_Intl").hide(); $("#ccTblMC_1").css("display", "block"); //("#ccDivMul").css("display", "block"); ("#ccDomInventory").hide();
        //$("#ccTxtDt1").val(new Date());
    }
}
function ValidateDates_Dom() {
    var sep = "/";
    var dat1 = get_String_Date(document.getElementById("ccTxtDateOW").value, sep);
    var dat2 = get_String_Date(document.getElementById("ccTxtDateRT").value, sep);

    if (compareDates(dat1, dat2) > 0) {
        document.getElementById("ccTxtDateRT").value = get_Date_String(dat1, sep);
    }
}
function CheckFilterAirlines_Dom(Select, checkbox) {
    var chkBoxList = document.getElementById(checkbox);
    if (chkBoxList == null) return false;

    var chkBoxCount = chkBoxList.getElementsByTagName("input");
    for (var i = 0; i < chkBoxCount.length; i++) {
        chkBoxCount[i].checked = Select;
    }
    return false;
}
function ExpColFares(me, fareDivID) {
    var elm = document.getElementById(fareDivID);
    if (elm != null) {
        var imgs = me.parentNode.parentNode.getElementsByTagName("img");
        if (elm.style.display == "none") {
            elm.style.display = "block";
            imgs[0].src = "../../App_Themes/Images/collapse.gif";
            imgs[1].src = "../../App_Themes/Images/FareCollapse.gif";
        }
        else {
            elm.style.display = "none";
            imgs[0].src = "../../App_Themes/Images/expand.gif";
            imgs[1].src = "../../App_Themes/Images/FareExpand.gif";
        }
    }
    else
        window.alert("Cannot find fares data.");
}
function DFB_SelItn(fareDivId, isRet) // DomesticFareBuilder_SelectedItinerary
{
    var ret = "";
    var fareDiv = document.getElementById(fareDivId);
    if (fareDiv != null) {
        var inputs = fareDiv.getElementsByTagName("input");
        for (i = 0; i < inputs.length; i++) {
            if ((inputs[i].type == "radio") && inputs[i].checked)
                ret = ret + inputs[i].id + "/";
        }
    }
    else {
        window.alert("Cannot find fares data.");
    }

    var actVal = null;
    if (isRet) {
        document.getElementById("ccHfRT").value = ret;
        actVal = "1,1"; // Fare Selection, Return
    }
    else {
        document.getElementById("ccHfOW").value = ret;
        actVal = "1,0"; // Fare Selection, Onward
    }

    var act = document.getElementById("ccHfAction");
    act.value = actVal;
    document.getElementById("form1").submit();
    act.value = "";
}
function iCI(airport) // itn_CityInfo
{
    var windOpts = "width=770,height=500,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=yes";
    window.open("../BBCityInfo.aspx?code=" + airport, "CityInfo", windOpts);
}
function SRl(FID)  //Rules
{
    var windOpts = "width=600,height=500,toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no";
    window.open("BBRulesInfo.aspx?FID=" + FID + "&SID=" + document.getElementById("ccHfSid").value, "FareRules", windOpts);
}
function iEr(SID) // itn_Errors
{
    var windOpts = "width=570,height=400,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no";
    window.open("BBErrMsg.aspx?sid=" + SID, "Messages", windOpts);
}
function ShrinkChosenFare_Dom() // Obsolete
{
    var trF = document.getElementById("trF");
    var visible = (trF.style.display != "none");

    if (visible)
        trF.style.display = "none";
    else
        trF.style.display = "table-row";
}
function ExpColChosenFares_Dom(me) {
    var tbl = me;
    while (true) {
        if (tbl != null) {
            if (tbl.tagName == "table" || tbl.tagName == "TABLE")
                break;
            else
                tbl = tbl.parentNode;
        }
        else
            break;
    }

    if (tbl != null) {
        var rows = tbl.rows;
        var lastIx = rows.length - 1;
        for (i = 0; i < rows.length; i++) {
            if (i > 1 && i < lastIx) {
                if (rows.item(i).style.display == "none")
                    rows.item(i).style.display = "table-row";
                else
                    rows.item(i).style.display = "none";
            }
        }
    }
}
function SFS(e, me) // Show Fare Split
{
    // if (me.textContent.trim().endsWith('*') == true) return;
    var eObj = window.event == null ? e : window.event;
    var pos = [0, 0];
    var tbl = document.getElementById("tblFareSplit");

    pos = getParentOffset(me, pos);

    var data = me.getElementsByTagName("INPUT")[0].value.split(",");

    var ixr = 0;
    var rows = tbl.rows;
    for (i = 1; i < rows.length; i++) {
        var cells = rows.item(i).cells;
        if (cells.length > 1) {
            var cell = cells.item(1);
            cell.align = "right";
            if (cell.innerHTML != null)
                cell.innerHTML = data[ixr];
            else
                cell.textContent = data[ixr];
            ixr++;
        }
    }

    tbl.style.display = "block";
    tbl.style.left = pos[0] + 'px';
    tbl.style.top = (pos[1] + 18) + 'px';
}
function HFS() // Hide Fare Split
{
    var tbl = document.getElementById("tblFareSplit");
    tbl.style.display = "none";
}


function SIS(e, me) // Show Fare Split
{
    // if (me.textContent.trim().endsWith('*') == true) return;
    var eObj = window.event == null ? e : window.event;
    var pos = [0, 0];
    var tbl = document.getElementById("tblSegmentAmount");
    pos = getParentOffset(me, pos);
    var data = me.getElementsByTagName("INPUT")[0].value;
    if (data == "0") {
        var tbl = document.getElementById("tblSegmentAmount");
        tbl.style.display = "none";
    }
    else {
        var ixr = 0;
        var rows = tbl.rows;
        tbl.innerHTML = "Segment Incentive:" + data;
        for (i = 1; i < rows.length; i++) {
            var cells = rows.item(i).cells;
            if (cells.length > 1) {
                var cell = cells.item(1);
                cell.align = "right";
                if (cell.innerHTML != null) {
                    cell.innerHTML = data[ixr];

                }
                else {
                    cell.textContent = data[ixr];
                }
                ixr++;
            }
        }

        tbl.style.display = "block";
        tbl.style.left = pos[0] + 'px';
        tbl.style.top = (pos[1] + 18) + 'px';
    }
}
function HSI() // Hide Fare Split
{
    var tbl = document.getElementById("tblSegmentAmount");
    tbl.style.display = "none";
}


function getParentOffset(el, positions) {
    positions[0] += el.offsetLeft;
    positions[1] += el.offsetTop;
    if (el.offsetParent)
        positions = getParentOffset(el.offsetParent, positions);
    return positions;
}
function SFS1(e, me) // Show Fare Split
{
    if (me.textContent.trim().endsWith('*') == true) return;
    var eObj = window.event == null ? e : window.event;
    var pos = [0, 0];
    var tbl = document.getElementById("tblFareSplit1");

    pos = getParentOffset(me, pos);

    var data = me.getElementsByTagName("INPUT")[0].value.split(",");

    var ixr = 0;
    var rows = tbl.rows;
    for (i = 1; i < rows.length; i++) {
        var cells = rows.item(i).cells;
        if (cells.length > 1) {
            var cell = cells.item(1);
            cell.align = "right";
            if (cell.innerHTML != null)
                cell.innerHTML = data[ixr];
            else
                cell.textContent = data[ixr];
            ixr++;
        }
    }

    tbl.style.display = "block";
    tbl.style.left = pos[0] + 'px';
    tbl.style.top = (pos[1] + 18) + 'px';
}
function HFS1() // Hide Fare Split
{
    var tbl = document.getElementById("tblFareSplit1");
    tbl.style.display = "none";
}