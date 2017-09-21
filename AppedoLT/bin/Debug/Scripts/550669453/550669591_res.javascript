$(document).ready(function () {
    //When page loads...
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
    $(".tab_content:first").show(); //Show first tab content
    $("ul.tabs").css({ 'border-bottom': '0px solid #999' });
    if ($("div#tabcon").is(":hidden")) {

        $("ul.tabs li").removeClass("active");

    }
    //On Click Event
    $("#divtab").click(function () {
        tabSlider();
    });
    $("ul.tabs li").click(function () {
        tabSlider();
    });

    var values = $('.fbpricetext', this).map(function () {
        return $.text([this]).replace(/[^\d.]/g, '');
    }).get();
    var min = Math.min.apply(null, values);
    var max = Math.max.apply(null, values);
    var durs = $('.dom_airline_duration', this).map(function () {
        return $.text([this]).replace(/[^\d.]/g, '');
    }).get();
    var _mindur = Math.min.apply(null, durs);
    var _maxdur = Math.max.apply(null, durs);

    sliderScrollChange($('#slider_Price'), min, max, $('#price_shower'), $('#hdnMin'), $('#hdnMax'));
    var currCode = $('#hdnCurrCode').val();
    $('#divminprice').html((currCode != "" ? "<img src='../../UserResources/CurrencySymbol/" + currCode + ".gif' class='rp_img' />" : " ") + min);
    $('#divmaxprice').html((currCode != "" ? "<img src='../../UserResources/CurrencySymbol/" + currCode + ".gif' class='rp_img' />" : " ") + max);
    $('#arrtime').html("<span class='pleft'> 00:00 </span> <span class='pright'>24:00</span>");
    $('#deptime').html("<span class='pleft'>  00:00 </span> <span class='pright'>  24:00</span>");
    $('#duration').html("<span class='pleft'>  0 hr</span> <span class='pright'>  24 hr</span>");
    timeSlider('#fltr_depTime', '#deptime', '#cchdnMinDt', '#cchdnMaxDt');
    timeSlider('#fltr_ArrTime', '#arrtime', '#cchdnMinAt', '#cchdnMaxAt');
    // durationSlider('#fltr_Duration', '#duration', '#cchdnMindur', '#cchdnMaxdur');
    $('#duration').html("<span class='pleft'>" + Math.floor(_mindur) + "hr</span> <span class='pright'>" + Math.ceil(_maxdur) + "hr </span>");
    durationSlider('#fltr_Duration', _mindur, _maxdur, '#duration', '#cchdnMindur', '#cchdnMaxdur');
    $('#cchdnMindur').val(_mindur);
    $('#cchdnMaxdur').val(_maxdur);

    // dom_airline_duration

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
   // __airportDom("AutoComplete.asmx/GetAirportCityList");
    __airport("AutoComplete.asmx/GetAirportCityList");


});

function CloseMe() {
    $("#pnlChosenFare").hide();
}


function validate_Dates(triger) {
    var sep = "/";
    var ymd1 = document.getElementById("ccTxtDateOW").value.split(sep);
    var ymd2 = document.getElementById("ccTxtDateRT").value.split(sep);
    var test = triger
    var dat1 = new Date(); dat1.setFullYear(ymd1[2], ymd1[1] - 1, ymd1[0]);
    var dat2 = new Date(); dat2.setFullYear(ymd2[2], ymd2[1] - 1, ymd2[0]);
    if (test == 'From') {
        dat1.setDate(dat1.getDate() + 1);
        var y = dat1.getFullYear(); var m = dat1.getMonth() + 1; var d = dat1.getDate();
        document.getElementById("ccTxtDateRT").value = (d < 10 ? ("0" + d) : d) + sep + (m < 10 ? ("0" + m) : m) + sep + y;
    }
    else {
        if (dat1.getTime() > dat2.getTime()) {
            dat1.setDate(dat1.getDate() + 1);
            var y = dat1.getFullYear(); var m = dat1.getMonth() + 1; var d = dat1.getDate();
            document.getElementById("ccTxtDateRT").value = (d < 10 ? ("0" + d) : d) + sep + (m < 10 ? ("0" + m) : m) + sep + y;
        }
        else {
        }
    }
}

function LoadPageControl() {

    SelectOwRt_Dom();
    CreateAutoCompleteAirport('txtFrom', "", '', 0, 3, 0);
    CreateAutoCompleteAirport('txtTo', "", '', 0, 3, 0);
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
        $(this).val("Any");
    })
    $("#ccDdlMCAdult").val(1);
    $("#ccDdlMCChild").val(0);
    $("#ccDdlMCInfant").val(0);
    $("#ccDdlMCClass").val("Y");
    $('a#linkon').on('click', (function () {
        var a = $(this);
        if ($(this).parent().parent().parent().parent().find('div#faderon').is(':hidden'))
        { a.text("-Details"); } else { a.text("+Details"); }
        $(this).parent().parent().parent().parent().find('div#faderon').slideToggle("slow");
        var i = $(this).parent().parent().parent().parent().find('div#faderre');
        var k = $(this).parent().parent().parent().parent();

        if (i.is(":hidden")) {
            if (k.hasClass("mainbody")) {
                k.toggleClass("mainbodyfade");
            }
            else {
                k.toggleClass("mainbodyfade");
            }
        }
        if ($('#ccRblOWRT_1').is(':checked')) {
            $(this).parent().parent().parent().parent().find('div#faderre').slideToggle("slow");
            var k = $(this).parent().parent().parent().parent();
            var j = $(this).parent().parent().parent().parent().find('div#faderon');
            if (j.is(":hidden")) {
                if (k.hasClass("mainbody")) {
                    k.toggleClass("mainbodyfade");
                }
                else {
                    k.toggleClass("mainbodyfade");
                }
            }
        }
    }));
    //$('#divAdv').on("click", function () {
    //    var i = $(this).parents().find('div#advPanel');
    //    //                i.slideToggle("slow");
    //    if (i.is(":visible")) {
    //        i.hide();
    //        $('a#advLink').css("background-image", "url( ../../App_Themes/Images/dwn.gif)");
    //    }
    //    else {
    //        i.show();
    //        $('a#advLink').css("background-image", "url( ../../App_Themes/Images/VisOnnew.gif)");
    //    }
    //});
    //$('#prefLi').on("click", function () {
    //    var i = $(this).parents().find('div#prfPanel');
    //    //                i.slideToggle("slow");
    //    if (i.is(":visible")) {
    //        i.hide();
    //        $('a#prefairline_a').css("background-image", "url( ../../App_Themes/Images/dwn.gif)");
    //    }
    //    else {
    //        i.show();
    //        $('a#prefairline_a').css("background-image", "url( ../../App_Themes/Images/VisOnnew.gif)");
    //    }
    //});
    $('#divAdv').on("click", function () {
        if (typeof $("#txtFrom").val() == "undefined" && typeof $("#txtTo").val() == "undefined") {
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
        if ($("#txtFrom").val() != "" && $("#txtTo").val() != "") {
            PageMethods._GetJourneyType($("#txtFrom").val(), $("#txtTo").val(), OnSuccessFunction);
        }
    });
    $('#prefLi').on("click", function () {
            if (typeof $("#txtFrom").val() == "undefined" && typeof $("#txtTo").val() == "undefined") {
                var i = $(this).parents().find('div#divpref_air');
                if (i.is(":visible")) {
                    i.hide();
                    $('a#prefairline_a').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
                }
                else {
                    alert(i);
                   
                    $('a#prefairline_a').css("background-image", "url(../../App_Themes/Images/VisOnnew.gif)");

                }
            }
            if ($("#txtFrom").val() != "" && $("#txtTo").val() != "") {
                PageMethods._GetJourneyType($("#txtFrom").val(), $("#txtTo").val(), OnSucceeded);

            }
            if ($('#ccRblOWRT_2').is(':checked')) {
             
                $("#ccCblGDS").show();
                $("#ccDomInventory").show();

            }
        
    });
    function OnSucceeded(response) {
        if (response == "0" || response == "1") {
            $("#ccCblGDS").hide();
            $("#ccDomInventory").hide();
            if (response == "0")//Domestic
            {
                $("#ccTblPA_Intl").hide();
                $("#ccTblPA_Dom").show();
                $("#ccCblGDS").show();
                $("#ccDomInventory").hide();

            }
            else if (response == "1")//International
            {
                $("#ccTblPA_Intl").show();
                $("#ccTblPA_Dom").hide();
                $("#ccCblGDS").hide();
                $("#ccDomInventory").show();
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
        if ($('#ccRblOWRT_2').is(':checked')) {
            $("#ccTblPA_Dom").hide();
            $("#ccTblPA_Intl").hide();
            // $("#ccDomInventory").show();
            $("#ccCblGDS").show();
            $("#ccDomInventory").hide();

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
    $('#txtFrom').keydown(function () {
        if ($("#divpref_air").is(":visible")) {
            $("#divpref_air").hide();
            $('a#advLink').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
        }

        if ($("#advPanel").is(":visible")) {
            $("#advPanel").hide();
            $('a#advLink').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
        }

    });
    $('#txtTo').keydown(function () {
        if ($("#divpref_air").is(":visible")) {
            $("#divpref_air").hide();
            $('a#advLink').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
        }
        if ($("#advPanel").is(":visible")) {
            $("#advPanel").hide();
            $('a#advLink').css("background-image", "url(../../App_Themes/Images/dwn.gif)");
        }
    });
    $('.fair_airline').click(function () {
        if ($(this).parent('td').find('.airline_name').text().indexOf("Multiple") != -1) {
            $(this).parents('.itn_main_body_fbuild').next('tbody').find('table.fbcnitem').slideToggle();
        }
        else { return false; }
    });
    //  $("#ccchkMultipleairlines").attr("checked", 'checked');
    $("#ccChkAirlines input[type='checkbox']").click(function () {
        // var count = parseInt($("#checkAirlines input[type='checkbox']:not(:checked)").length);
        // var allCount = parseInt($("#checkAirlines input[type='checkbox']").length);

        //if (count > 0) {

        //    $("#chkAllAirline").attr("checked", false);
        //    if (count == allCount) {
        //        $(this).prop('checked', true);
        //    }
        //}
        //else {
        //    $("#chkAllAirline").prop('checked', true);
        //}
        filterAll();
    });
    $("#ccchkMultipleairlines").click(function () {
        filterAll();
    });
    $("#chkLstAirlineStops input[type='checkbox']").click(function () {
        filterAll();
    });
    $("#all_airlines").click(function () {
        $("#ccChkAirlines input[type='checkbox']").each(function () {
            this.checked = true;
        });
        // $("#ccChkAirlines").prop("checked", true);
        $('#ccchkMultipleairlines').prop("checked", true);
        filterAll();
    });
    //$(".all_airlines").click(function () {
    //    $('#ccChkAirlines').prop('checked', true);
    //    $('#ccchkMultipleairlines').prop('checked', true);
    //    filterAll();
    //});

    $('.ul_filterSingle').click(function () {
        var airlinename = $(this).find('._airlineName').text();
        //$('#chkLstAirlineStops').prop('checked', true);
        ResetAllFilters(1);
        //$('#ccchkMultipleairlines').prop('checked', false);
        $("#ccChkAirlines input[type='checkbox']").each(function () {
            if ($('label[for=' + this.getAttribute('id') + ']').text() == airlinename) {
                this.checked = true;
            } else this.checked = false;
        });
        filterAll();
    });
    filterAll();
    scrollFilter();
    $('#ccRblOWRT').change(function () {
        $('#ccChkFareBuilder').prop("checked", false);
    });
}

function filterAll() {
    if ($('.dom_itn_main_body').length > 0) {
        var checkedVals = $("#ccChkAirlines input[type='checkbox']").map(function () {
            if (this.checked) { return $('label[for=' + this.getAttribute('id') + ']').text(); }
        }).get();
        //                if ($("#ccchkMultipleairlines").is(":checked")) {
        //                    checkedVals.push("Multiple Airlines");
        //                } //if (k == 0) return 'nonstop';
        var selectedstops = $("#chkLstAirlineStops input[type='checkbox']").map(function () { if (this.checked) { var k = $('label[for=' + this.getAttribute('id') + ']').text(); return k; } }).get();
        var minPrice = $('#hdnMin').val();
        var maxPrice = $('#hdnMax').val();
        var dtMinTime = parseFloat($.trim($("#cchdnMinDt").val().replace(":", ".")));
        var dtMaxTime = parseFloat($.trim($("#cchdnMaxDt").val().replace(":", ".")));
        var atMinTime = parseFloat($.trim($("#cchdnMinAt").val().replace(":", ".")));
        var atMaxTime = parseFloat($.trim($("#cchdnMaxAt").val().replace(":", ".")));
        var MinDur = parseFloat($.trim($("#cchdnMindur").val().replace(":", ".")));
        var MaxDur = parseFloat($.trim($("#cchdnMaxdur").val().replace(":", ".")));
        var Multichecked = $("#ccchkMultipleairlines").is(":checked");
        $('.dom_itn_main_body').each(function () {
            var index = 0;
            var price = parseFloat($.trim($(this).find(".fbpricetext").text().replace(/[^\d.]/g, ''))); //price
            // alert(price);
            var dtTime = parseFloat($.trim($(this).find(".dptTime").text().replace(":", "."))); //departure time
            // var atTime = parseFloat($.trim($(this).find(".arvTime").text()).replace(":", ".")); //arrival time
            var ArrivalTime = $.trim($(this).find(".arvTime").text()).replace(":", ".");
            if (ArrivalTime.split('\n').length > 1) {
                var at = ArrivalTime.split('\n');
                var aa = at[at.length - 1];
                var atTime = $.trim(aa.replace(":", "."));
            }
            else {
                var atTime = parseFloat($.trim($(this).find(".arvTime").text()).replace(":", ".")); //arrival time
            }
            //var dtTime = parseFloat($.trim($(this).find(".depTime").text().replace(":", ".")));
            //var atTime = parseFloat($.trim($(this).find(".arvTime").text()).replace(":", "."));
            var Duration = parseFloat($(this).find('.dom_airline_duration').text());
            // var conType = $.trim($(this).find("#conType").val());

            var mainAirline = ($.trim($(this).find(".isMultiple").text()));
            var airlineName = $.trim($(this).find("._dom_airline_name").text());
            index = Filter_airlineName(checkedVals, airlineName, Multichecked, mainAirline);

            //                    var airlineName = $.trim($(this).find(".dom_airline_name").text());
            //                    if (airlineName.split('\n').length > 1) {
            //                        var a = airlineName.split('\n');
            //                        var ind = -1;
            //                        for (i = 0; i < a.length; i++) {
            //                            ind = checkedVals.indexOf($.trim(a[i]));
            //                            if (ind == -1) {
            //                                index = ind;
            //                                break;
            //                            }
            //                            else {
            //                                index = ind;
            //                            }
            //                        }
            //                    }
            //                    else {
            //                        index = checkedVals.indexOf($.trim($(this).find(".dom_airline_name").text()));
            //                    }
            // if (airlineName.indexOf("Multiple") == -1) {

            var stops = selectedstops.indexOf($.trim($(this).find(".dom_airline_stops").text()));
            //}
            // else {
            // var a = 0;
            // $(this).next('.itm_desc').find('.fbcnitem tbody tr').each(function () {
            //     // $(this).next('.itm_desc').find('.fbcnitem tbody tr')
            //     a = checkedVals.indexOf($.trim($(this).find('.subairlinetext').text()));
            // });
            // if (a != -1)
            // {
            //     index = a;
            //}
            //    index = 0;//need to write the filtering of multiple airlines
            //}
            // var noofStops = stops.indexOf($(this).find('.spanStops').text());
            //   var checkInv = checkedInv.indexOf($.trim($(this).find(".imgInv").attr("title")));
            //if (filter(price, minPrice, maxPrice) && noofStops != -1 && filter(Duration, minDuration, maxDuration) && filter(dtTime, dtMinTime, dtMaxTime) && filter(atTime, atMinTime, atMaxTime) && index !== -1 && checkInv == -1) {
            //    $(this).show();
            //} else { $(this).hide(); }//$(this).next("mainbody ").show();
            if (filter(price, minPrice, maxPrice) && stops != -1 && filter(dtTime, dtMinTime, dtMaxTime) && filter(atTime, atMinTime, atMaxTime) && index != -1 && filter(Duration, MinDur, MaxDur)) {
                $(this).show();
            } else { $(this).hide(); }
            //if (filter(price, minPrice, maxPrice) && index != -1 && filter(dtTime, dtMinTime, dtMaxTime) && filter(atTime, atMinTime, atMaxTime))
            //{ $(this).show(); $(this).next(".itm_desc").show(); } else { $(this).hide(); $(this).next(".itm_desc").hide(); }
        });
        getItemCount();
    }
}

function getItemCount() {
    var totitems = $('.dom_itn_main_body').length;
    var nowshowing = $('.dom_itn_main_body:visible').length;
    $('.total_count').html('<b>' + nowshowing + " of " + totitems + '</b>' + " flights");
}

//pass selected airlines,subairlinesname,multiplechecked or not
function Filter_airlineName(selectedAirlines, SubairlineName, isMultipleAirline, MultipleAirlineName) {
    var index = 0;
    if (MultipleAirlineName == "multiple") {
        if (SubairlineName.split('\n').length > 1) {
            var a = SubairlineName.split('\n');
            var ind = -1;
            for (i = 0; i < a.length; i++) {
                if (isMultipleAirline) {
                    if ($.trim(a[i]) != "") {
                        ind = selectedAirlines.indexOf($.trim(a[i]));
                        if (ind == -1) {
                            index = ind;
                        }
                        else {
                            index = ind; break;
                        }
                    }
                }
                else {
                    index = -1; break;
                    //if ($.trim(a[i]) != "") {
                    //    ind = selectedAirlines.indexOf($.trim(a[i]));
                    //    if (ind == -1) {
                    //        index = ind; break;
                    //    }
                    //    else {
                    //        index = ind;
                    //    }
                    //}
                }
            }
        }
        else {
            index = selectedAirlines.indexOf($.trim(SubairlineName));
        }
    }
    else {
        if (SubairlineName.split('\n').length > 1) {
            var a = SubairlineName.split('\n');
            var ind = -1;
            for (i = 0; i < a.length; i++) {
                ind = selectedAirlines.indexOf($.trim(a[i]));
                if (ind == -1) {
                    index = ind;
                    break;
                }
                else {
                    index = ind;
                }
            }
        }
        else {
            index = selectedAirlines.indexOf($.trim(SubairlineName));
        }
    }
    return index;
}
function ResetAllFilters(type) {
    $('#chkLstAirlineStops').prop('checked', true);
    timeSlider('#fltr_depTime', '#deptime', '#cchdnMinDt', '#cchdnMaxDt');
    timeSlider('#fltr_ArrTime', '#arrtime', '#cchdnMinAt', '#cchdnMaxAt');
    durationSlider('#fltr_Duration', '#duration', '#cchdnMindur', '#cchdnMaxdur');
    //if (type != 1) {//type 1 to filter top elements
    //    $('#ccchkMultipleairlines').prop('checked', true);
    //    $('#ccChkAirlines').prop('checked', true);
    //}
    //else {
    //    if ($('#ccchkMultipleairlines').is(':visible')) {
    //        $('#ccchkMultipleairlines').prop('checked', false);
    //    } else {
    //        $('#ccchkMultipleairlines').prop('checked', true);
    //    }
    //}
}

