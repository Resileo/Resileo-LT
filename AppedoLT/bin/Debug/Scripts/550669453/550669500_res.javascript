function validate_Dates(triger) {
    //debugger;
    var sep = "/";
    var ymd1 = document.getElementById("ccTxtDepart").value.split(sep);
    var ymd2 = document.getElementById("ccTxtReturn").value.split(sep);
    var test = triger;
    var dat1 = new Date(); dat1.setFullYear(ymd1[2], ymd1[1] - 1, ymd1[0]);
    var dat2 = new Date(); dat2.setFullYear(ymd2[2], ymd2[1] - 1, ymd2[0]);
    if (test == 'From') {
        dat1.setDate(dat1.getDate() + 1);
        var y = dat1.getFullYear(); var m = dat1.getMonth() + 1; var d = dat1.getDate();
        document.getElementById("ccTxtReturn").value = (d < 10 ? ("0" + d) : d) + sep + (m < 10 ? ("0" + m) : m) + sep + y;
    }
    else {
        if (dat1.getTime() > dat2.getTime()) {
            dat1.setDate(dat1.getDate() + 1);
            var y = dat1.getFullYear(); var m = dat1.getMonth() + 1; var d = dat1.getDate();
            document.getElementById("ccTxtReturn").value = (d < 10 ? ("0" + d) : d) + sep + (m < 10 ? ("0" + m) : m) + sep + y;
        }
        else {
        }
    }
}

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-43758345-3', '103.8.126.131');
ga('send', 'pageview');

function newsTick() {
    $('#news_ticker li:first').slideUp(function () { $(this).appendTo($('#news_ticker')).slideDown(); });
    // $('#news_ticker li:first').animate({ 'opacity': 0 }, 200, function () { $(this).appendTo($('#news_ticker')).css('opacity', 1); });
}

/* Added Function LoadAirlineEvent() by Benny */


function LoadAirlineEvent() {

    alert("LoadAirlineEvent");
    // SelectOwRtMain();
    // SearchText('ccTxtSrcArPrt');
    if ($("#ccDdlDomInt input:checked").val() == "1") {
        CreateAutoCompleteAirline('ccTxtAirlineDetail', "OfflineAirlineDeatails.ascx/GetInternationalAirlines",'', 0, 2, 0);
        //CreateAutoComplete('ccTxtDstArPrt', "AutoComplete.asmx/GetInternationalAirprts", '', 0, 3);
        //CreateAutoCompleteAirline('ccTxtAirlineDetail', "", '', 0, 2, 0);
        // CreateAutoCompleteAirport('ccTxtDstArPrt', "", '', 0, 3, 0);
    }
    else if ($("#ccDdlDomInt input:checked").val() == "0") {
        CreateAutoCompleteAirline('ccTxtAirlineDetail', "OfflineAirlineDeatails.ascx/GetInternationalAirlines",'', 0, 2, 1);
        //CreateAutoComplete('ccTxtDstArPrt', "AutoComplete.asmx/GetDomesticAirports", '', 0, 3);
      //  CreateAutoCompleteAirline('ccTxtAirlineDetail', "", '', 0, 2, 1);
        //  CreateAutoCompleteAirport('ccTxtDstArPrt', "", '', 0, 3, 1);
    }
    /* else {
         $('#ccTblMC_1').find('.frm').each(function () {
             CreateAutoCompleteAirport($(this).find('input').attr("id"), "AutoComplete.asmx/GetInternationalAirprts", '', 1, 3, 0);
         })
         $('#ccTblMC_1').find('.to').each(function () {
             CreateAutoCompleteAirport($(this).find('input').attr("id"), "AutoComplete.asmx/GetInternationalAirprts", '', 1, 3, 0);
         })
         $('#ccTblMC_1').find('._clear').each(function () {
             $(this).val("");
         })
         $('#ccTblMC_1').find('._clearTime').each(function () {
             $(this).val(0);
         })
         $("#ccDdlMCAdult").val(0);
         $("#ccDdlMCChild").val(0);
         $("#ccDdlMCInfant").val(0);
         $("#ccDdlMCClass").val(0);
     }
     $('#divAdv').on("click", function () {
         if (typeof $("#ccTxtSrcArPrt").val() == "undefined" && typeof $("#ccTxtDstArPrt").val() == "undefined") {
             var i = $(this).parents().find('div#advPanel');
             if (i.is(":visible")) {
                 i.hide();
                 $('a#advLink').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
             }
             else {
                 i.show();
                 $('a#advLink').css("background-image", "url(../../App_Themes/Images/VisOnnew.gif)");
             }
         }
         if ($("#ccTxtSrcArPrt").val() != "" && $("#ccTxtDstArPrt").val() != "") {
             PageMethods._GetJourneyType($("#ccTxtSrcArPrt").val(), $("#ccTxtDstArPrt").val(), OnSuccessFunction);
         }
     });
     $('#prefLi').on("click", function () {
         if (typeof $("#ccTxtSrcArPrt").val() == "undefined" && typeof $("#ccTxtDstArPrt").val() == "undefined") {
             var i = $(this).parents().find('div#divpref_air');
             if (i.is(":visible")) {
                 i.hide();
                 $('a#prefairline_a').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
             }
             else {
                 i.show();
                 $('a#prefairline_a').css("background-image", "url(../../App_Themes/Images/VisOnnew.gif)");
             }
         }
         if ($("#ccTxtSrcArPrt").val() != "" && $("#ccTxtDstArPrt").val() != "") {
             PageMethods._GetJourneyType($("#ccTxtSrcArPrt").val(), $("#ccTxtDstArPrt").val(), OnSucceeded);
         }
 
     });*/

}
function LoadControlsEvent() {
    SelectOwRtMain();
   
    // SearchText('ccTxtSrcArPrt');
    if ($("#ccrdoDomInt input:checked").val() == "1") {
        //CreateAutoComplete('ccTxtSrcArPrt', "AutoComplete.asmx/GetInternationalAirprts", '', 0, 3);
        //CreateAutoComplete('ccTxtDstArPrt', "AutoComplete.asmx/GetInternationalAirprts", '', 0, 3);
        CreateAutoCompleteAirport('ccTxtSrcArPrt', "", '', 0, 3, 0);
        CreateAutoCompleteAirport('ccTxtDstArPrt', "", '', 0, 3, 0);
    }
    else if ($("#ccrdoDomInt input:checked").val() == "0") {
        //CreateAutoComplete('ccTxtSrcArPrt', "AutoComplete.asmx/GetDomesticAirports", '', 0, 3);
        //CreateAutoComplete('ccTxtDstArPrt', "AutoComplete.asmx/GetDomesticAirports", '', 0, 3);
        CreateAutoCompleteAirport('ccTxtSrcArPrt', "", '', 0, 3, 1);
        CreateAutoCompleteAirport('ccTxtDstArPrt', "", '', 0, 3, 1);
    }
    else {
        $('#ccTblMC_1').find('.frm').each(function () {
            CreateAutoCompleteAirport($(this).find('input').attr("id"), "AutoComplete.asmx/GetInternationalAirprts", '', 1, 3, 0);
        })
        $('#ccTblMC_1').find('.to').each(function () {
            CreateAutoCompleteAirport($(this).find('input').attr("id"), "AutoComplete.asmx/GetInternationalAirprts", '', 1, 3, 0);
        })
        $('#ccTblMC_1').find('._clear').each(function () {
            $(this).val("");
        })
        $('#ccTblMC_1').find('._clearTime').each(function () {
            $(this).val(0);
        })
        $("#ccDdlMCAdult").val(0);
        $("#ccDdlMCChild").val(0);
        $("#ccDdlMCInfant").val(0);
        $("#ccDdlMCClass").val(0);
    }
    $('#divAdv').on("click", function () {
        if (typeof $("#ccTxtSrcArPrt").val() == "undefined" && typeof $("#ccTxtDstArPrt").val() == "undefined") {
            var i = $(this).parents().find('div#advPanel');
            if (i.is(":visible")) {
                i.hide();
                $('a#advLink').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
            }
            else {
                i.show();
                $('a#advLink').css("background-image", "url(../../App_Themes/Images/VisOnnew.gif)");
            }
        }
        if ($("#ccTxtSrcArPrt").val() != "" && $("#ccTxtDstArPrt").val() != "") {
            PageMethods._GetJourneyType($("#ccTxtSrcArPrt").val(), $("#ccTxtDstArPrt").val(), OnSuccessFunction);
        }
    });
    $('#prefLi').on("click", function () {
        if (typeof $("#ccTxtSrcArPrt").val() == "undefined" && typeof $("#ccTxtDstArPrt").val() == "undefined") {
            if ($('#ccRblOWRT_2').is(':checked')) {
                $("#ccTblPA_Dom").hide();
                $("#ccTblPA_Intl").hide();
                $("#ccTblMC_1").show();

                $("#ccCblGDS").hide();
                if ($("#divpref_air").is(":visible")) {
                    $("#divpref_air").hide();
                    $("#ccDomInventory").hide();
                    $('a#prefairline_a').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
                }
                else {
                    $("#ccCblGDS").show();
                    $("#divpref_air").show();
                    $("#ccDomInventory").show();

                    $('a#prefairline_a').css("background-image", "url(../../App_Themes/Images/VisOnnew.gif)");
                }
            }
            else {
                var i = $(this).parents().find('div#divpref_air');
                if (i.is(":visible")) {
                    i.hide();
                    $('a#prefairline_a').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
                }
                else {
                    i.show();
                    $('a#prefairline_a').css("background-image", "url(../../App_Themes/Images/VisOnnew.gif)");
                }
            }
        }
        if ($("#ccTxtSrcArPrt").val() != "" && $("#ccTxtDstArPrt").val() != "") {
            PageMethods._GetJourneyType($("#ccTxtSrcArPrt").val(), $("#ccTxtDstArPrt").val(), OnSucceeded);
        }
      

      //  evt.stopPropagation();
       // evt.preventDefault();

    });
  
  

    function OnSucceeded(response) {
         if (response == "0" || response == "1") {
            if (response == "0")//Domestic
            {
                $("#ccTblPA_Intl").hide();
                $("#ccTblPA_Dom").show();
                $("#ccCblGDS").hide();
                $("#ccDomInventory").show();

            }
            else if (response == "1")//International
            {
                $("#ccTblPA_Intl").show();
                $("#ccTblPA_Dom").hide();
                $("#ccCblGDS").show();
                $("#ccDomInventory").hide();
            }
            //var i = $(this).parents().find('div#divpref_air');
            if ($("#divpref_air").is(":visible")) {
                $("#divpref_air").hide();
                $('a#prefairline_a').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
            }
            else {
                $("#divpref_air").show();
                $('a#prefairline_a').css("background-image", "url(../../App_Themes/Images/VisOnnew.gif)");
            }
        }
    }
    function OnSuccessFunction(response) {
        if (response == "0" && $("#ccTxtReturn").val() != "") {
            if ($("#ccTxtReturn").css('visibility') != 'hidden') {
                $("#divCabin").show();
                $("#divFarebilder").show();
                $("#ccChkFareBuilder").attr("checked", false);
            }
            else {
                $("#divFarebilder").hide();
                $("#divCabin").hide();
                $("#ccChkFareBuilder").attr("checked", false);
            }
        }
        else {

            $("#divFarebilder").hide();
            $("#divCabin").hide();
            $("#ccChkFareBuilder").attr("checked", false);
        }
        if ($("#advPanel").is(":visible")) {
            $("#advPanel").hide();
            $('a#advLink').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
        }
        else {
            $("#advPanel").show();
            $('a#advLink').css("background-image", "url(../../App_Themes/Images/VisOnnew.gif)");
        }
    }
   
   
    $('#ccTxtSrcArPrt').keydown(function () {
        if ($("#divpref_air").is(":visible")) {
            $("#divpref_air").hide();
            $('a#advLink').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
          
        }

        if ($("#advPanel").is(":visible")) {
            $("#advPanel").hide();
            $('a#advLink').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
        }
      //  PageMethods._GetJourneyType($("#ccTxtSrcArPrt").val(), $("#ccTxtDstArPrt").val(), OnSourceDestinationChange);


    });

   
    $('#ccTxtDstArPrt').keydown(function () {
        if ($("#divpref_air").is(":visible")) {
            $("#divpref_air").hide();
            $('a#advLink').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
        }
        if ($("#advPanel").is(":visible")) {
            $("#advPanel").hide();
            $('a#advLink').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
        }
    // PageMethods._GetJourneyType($("#ccTxtSrcArPrt").val(), $("#ccTxtDstArPrt").val(), OnSourceDestinationChange);

    });
    //$("._fromTo").bind("keyup", function () {
    //    var from = "";
    //    var to = "";
    //    var count = 0;
    //    $("._fromTo").each(function () {
    //        if (count == 0)
    //            from = $(this).val();
    //        else if (count == 1)
    //            to = $(this).val();
    //        count++;
    //    });
    //    if (from != "" && to != "") {
    //        PageMethods._GetJourneyType($("#ccTxtSrcArPrt").val(), $("#ccTxtDstArPrt").val(), SuccessFunction);
    //    }
    //    else {
    //        $("#ccPnlFB").hide();
    //        $("#divCabin").hide();
    //        $("#ccChkFareBuilder").attr("checked", false);
    //    }

    //});
    //function SuccessFunction(response) {
    //    if (response == "0" && $("#ccTxtReturn").val() != "") {
    //        $("#ccPnlFB").show();
    //        $("#divCabin").show();
    //        $("#ccChkFareBuilder").attr("checked", false);
    //    }
    //    else {
    //        $("#ccPnlFB").hide();
    //        $("#divCabin").hide();
    //        $("#ccChkFareBuilder").attr("checked", false);
    //    }
    //}
    $('a#ccLbtnChooseDeal').on("click", function () {
        var i = $(this).parents().find('div#ccPnlDeal');
        if (i.is(":visible")) {
            i.hide();
            $('a#ccLbtnChooseDeal').css("background-image", "url( ../../App_Themes/Images/dwn.gif)");
        }
        else {
            i.show();
            $('a#ccLbtnChooseDeal').css("background-image", "url( ../../App_Themes/Images/VisOnnew.gif)");
        }
    });

    setInterval(function () { newsTick() }, 4000);

    /* SET PARAMETERS */
    var change_img_time = 5000;
    var transition_speed = 300;

    var simple_slideshow = $("#ImageSlider"),
        listItems = simple_slideshow.children('li'),
        listLen = listItems.length,
        i = 0,

        changeList = function () {

            listItems.eq(i).fadeOut(transition_speed, function () {
                i += 1;
                if (i === listLen) {
                    i = 0;
                }
                listItems.eq(i).fadeIn(transition_speed);
            });

        };

    listItems.not(':first').hide();
    setInterval(changeList, change_img_time);
}
$(document).ready(function () {
  
    
    //var myCombo = $('#ddlMyCombo');
    //myCombo.append($('< option > </option>').val(1).html(Economy));
    //$("#ccDDLClass").append('<option value="Y">Economy</option>');
    //$("#ccDDLClass").append('<option value="C">Business</option>');
    //$("#ccDDLClass").append('<option value="F">First</option>');
    //$("#ccDDLClass").append('<option value="W">Premium Economy</option>');
    __airport("AutoComplete.asmx/GetAirportCityList");
    __airportDom("AutoComplete.asmx/GetAirportCityListDom");
   
});

function doClick() {
    document.getElementById("<%= btnPostback.ClientID %>").click();
}