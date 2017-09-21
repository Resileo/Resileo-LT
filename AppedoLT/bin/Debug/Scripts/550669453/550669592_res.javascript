
/*================== AUTO COMPLETE FLIGHT SEARCH  ==================*/
//Added by Arun.V 29/10/2013

//*must add latest jquery plugin,Add jquery ui plugin*//
//Add css file for auto complete if you need *//

//controlID ==> textboxname where autocomplete need to appear
//hiddenFielID ==> hiddenField to store selected item
//URL ==> method which returns String[] for autocomplete
//splitType ==> 1 ==> shows airport code only in textbox
//termLenght ==> length of string were auto complete starts 


function CreateAutoComplete(controlID, URL, hiddenFielID, splitType, termLength) {
    //"AutoComplete.asmx/GetInternationalAirprts"
    SearchText(controlID, URL, splitType, termLength);
}
function CreateAutoCompleteHotel(controlID, URL, hiddenFielID, countryCode, splitType, termLength) {
    //"AutoComplete.asmx/GetInternationalAirprts"
    SearchTextHotel(controlID, hiddenFielID, URL, countryCode, splitType, termLength);
}
function CreateAutoCompleteCar(controlID, URL, hiddenFielID, countryCode, isSourceCitylist, splitType, termLength) {
    //"AutoComplete.asmx/GetInternationalAirprts"
    SearchTextCar(controlID, hiddenFielID, URL, countryCode, isSourceCitylist, splitType, termLength);
}
function CreateAutoCompleteBus(controlID, URL, hiddenFielID, termLength) {
    SearchTextBus(controlID, hiddenFielID, URL, termLength);
}
function CreateAutoCompleteAgency(controlId, hdnValueFieldID, URL, termLength, customizedParameters, postBackControl, reloadData) {
    //"AutoComplete.asmx/GetInternationalAirprts"
    SearchAgency(controlId, hdnValueFieldID, URL, termLength, customizedParameters, postBackControl, reloadData);
}
function CreateAutoCompleteAirport(controlID, URL, hiddenFielID, splitType, termLength, isDom) {
    //"AutoComplete.asmx/GetInternationalAirprts"
    //  SearchText(controlID, URL, splitType, termLength);
    autocompleteAirport(controlID, URL, splitType, termLength, isDom);
}

// ---- function CreateAutoCompleteAirline   Added by Benny

function CreateAutoCompleteAirline(controlID, URL, hiddenFielID, splitType, termLength, isDom) {
   // alert("CreateAutoCompleteAirline");
    //"AutoComplete.asmx/GetInternationalAirprts"
    //  SearchText(controlID, URL, splitType, termLength);
    autocompleteAirline(controlID, URL, splitType, termLength, isDom);
}

//Hotel Room Type

function CreateAutoCompleteHotelRmType(controlID, URL,params, termLength) {
    // alert("CreateAutoCompleteAirline");
    //"AutoComplete.asmx/GetInternationalAirprts"
    //  SearchText(controlID, URL, splitType, termLength);
    autocompleteHotelRmType(controlID, URL,params, termLength);
}





// ---- function CreateAutoCompleteAgencyRef   Added by Benny

function CreateAutoCompleteAgencyRef(controlId, hdnValueFieldID, URL, termLength, customizedParameters, postBackControl, reloadData) {
    //"AutoComplete.asmx/GetInternationalAirprts"
    SearchAgencyRef(controlId, hdnValueFieldID, URL, termLength, customizedParameters, postBackControl, reloadData);
   // alert('Hai');
   // alert(customizedParameters)
   
}

function CreateAutoCompleteIndividualRef(controlId, hdnValueFieldID, URL, termLength, customizedParameters, postBackControl, reloadData)
{
    SearchIndividualRef(controlId, hdnValueFieldID, URL, termLength, customizedParameters, postBackControl, reloadData);
   // alert('Hellow');
   // alert(customizedParameters)
    
}
function SearchText(controlid, URL, type, termLength) {
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var datafromServer = data.d;
            $("input[id*=" + controlid + "]").autocomplete({
                select: function (event, ui) {
                    //var txt=ui.item.Name; 
                    //  $("input[id*=" + hdnid + "]").val(ui.item.value);
                    $("input[id*=" + controlid + "]").val(type == 1 ? ui.item.value.substring(ui.item.value.indexOf("[") + 1, ui.item.value.indexOf("]")) : ui.item.value);
                    return false;
                },
                source: datafromServer,
                search: function () {
                    // custom minLength
                    var term = this.value;
                    if (term.length < termLength) {
                        return false;
                    }
                }

            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function SearchTextHotel(controlid, hiddenFielID, URL, countryCode, type, termLength) {
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        data: JSON.stringify({ countCode: countryCode }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var datafromServer = $.map(data.d, function (item) {
                return { label: item.cityName + " [" + item.CountryCode + "]", value: item.cityCode }
            });
            $("input[id*=" + controlid + "]").autocomplete({
                select: function (event, ui) {
                    $("input[id*=" + hiddenFielID + "]").val(ui.item.value);
                    $("input[id*=" + controlid + "]").val(ui.item.label);
                    return false;
                },
                source: datafromServer,
                search: function () {
                    var term = this.value;
                    if (term.length < termLength) {
                        return false;
                    }
                }

            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
var result;
var resultDom;
function __airport(URL) {
    if (result == null || result.length < 1) {
        $.ajax({
            async: false,
            type: "POST",
            dataType: "json",
            url: URL,
            data: "{}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                result = data.d;
            }
        });
    }
}

function __airportDom(URL) {
    if (resultDom == null || resultDom.length < 1) {
        $.ajax({
            async: false,
            type: "POST",
            dataType: "json",
            url: URL,
            data: "{}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                resultDom = data.d;
            }
        });
    }
}

function autocompleteAirport(controlid, URL, type, termLength, isDom) {
    var type = type;
    $("input[id*=" + controlid + "]").autocomplete({
        select: function (event, ui) {
            $("input[id*=" + controlid + "]").val(type == 1 ? ui.item.label.substring(ui.item.label.indexOf("[") + 1, ui.item.label.indexOf("]")) : ui.item.label);
            return false;
        },
        source:
            function (request, response) {
                var re = $.ui.autocomplete.escapeRegex(request.term);
                var res;
                if (isDom == 1) {
                    res = filterResult(resultDom, re);
                } else { res = filterResult(result, re); }
                response($.map(res, function (item) {
                    return { label: item.CityName + ", " + item.CountryName + ", " + item.AirportName + "[" + item.AirportCode + "]", value: item.AirportCode }
                }));
            },
        search: function () {
            var term = this.value;
            if (term.length < termLength) {
                return false;
            }
        }

    });


}
function filterResult(ds, txt) {
    var arr1 = ds;
    var arr3 = getItemFromArray(arr1, txt);
    return arr3;
}
function getItemFromArray(arr, txt) {
    if (txt != null) {
        var aCode = $.grep(arr, function (n, i) {
            return (n.AirportCode.toLowerCase() == txt.toLowerCase());
        });
        var aCityCode = $.grep(arr, function (n, i) {
            var t = txt;
            if (n.CityCode.toLowerCase().match(t.toLowerCase())) return true;
            else false;
        });
        var aCityStarts = $.grep(arr, function (n, i) {
            var t = "^" + txt;
            if (n.CityName.toLowerCase().match(t.toLowerCase())) return true;
            else false;
        });
        var aCity = $.grep(arr, function (n, i) {
            var t = txt;
            return (n.CityName.toLowerCase().indexOf(t.toLowerCase()) >= 0);
        });
        var aOther = $.grep(arr, function (n, i) {
            var t = txt;
            return (n.AirportName.toLowerCase().indexOf(t.toLowerCase()) >= 0 || n.CountryName.toLowerCase().indexOf(t.toLowerCase()) >= 0);
        });
        var newArray = [];
        newArray = $.merge(newArray, sortResults(aCode, 'AirportCode', true));
        newArray = $.merge(newArray, sortResults(aCityCode, 'CityCode', true));
        newArray = $.merge(newArray, sortResults(aCityStarts, 'CityName', true));
        newArray = $.merge(newArray, sortResults(aCity, 'CityName', true));
        newArray = $.merge(newArray, sortResults(aOther, 'AirportName', true));
        var outputArray = unique(newArray);
        return outputArray;
    }
    else { return arr; }
}
function unique(list) {
    var uniqueNames = [];
    $.each(list, function (i, el) {
        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });
    return uniqueNames;
}
function sortResults(array, prop, asc) {
    array = array.sort(function (a, b) {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    return array;
}

function SearchAgency(controlId, hdnValueFieldID, URL, termLength, customizedParameters, postBackControl, reloadData) {
    //alert(customizedParameters)
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        data: '{"customizedSettings":"' + customizedParameters + '","reloadData":"' + reloadData + '"}',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var datafromServer = $.map(data.d, function (item) {
               return { label: item.EntityDisplayItem, value: item.EntityValueItem }
            });
            //$("input[id*=hdnResult]").val(JSON.stringify(data.d));
             $("input[id*=" + controlId + "]").autocomplete({
                select: function (event, ui) {
                   // alert(ui)
                    $("input[id*=" + hdnValueFieldID + "]").val(ui.item.value);
                    $("input[id*=" + controlId + "]").val(ui.item.label);
                    if (postBackControl != '') { $("input[id*=" + postBackControl + "]").click(); }
                    return false;
                },
                source: datafromServer,
                search: function () {
                    var term = this.value;
                    if (term.length < termLength) {
                        return false;
                    }
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

// Added function autocompleteAirline by Benny

function autocompleteAirline(controlid, URL, type, termLength, isDom) {
  //  alert("autocompleteAirline");
  // alert("controlid:" + controlid);
   // alert("URL:" + URL);
   // alert("type:" + type);
   // alert("termLength:" + termLength);
    //alert("isDom" + isDom);
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
           // alert("sucess");
            var datafromServer = data.d;
           // $("input[id*=" + controlid + "]").autocomplete({
            $("#" + controlid).autocomplete({
                select: function (event, ui) {
                    //var txt=ui.item.Name; 
                    //  $("input[id*=" + hdnid + "]").val(ui.item.value);
                    // $("input[id*=" + controlid + "]").val(type == 1 ? ui.item.value.substring(ui.item.value.indexOf("[") + 1, ui.item.value.indexOf("]")) : ui.item.value);
                    $("#" + controlid).val(type == 1 ? ui.item.value.substring(ui.item.value.indexOf("[") + 1, ui.item.value.indexOf("]")) : ui.item.value);
                    return false;
                },
                source: datafromServer,
                search: function () {
                    // custom minLength
                    var term = this.value;
                    if (term.length < termLength) {
                        return false;
                    }
                }

            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });

}


//Hotel Room Type 


function autocompleteHotelRmType(controlid, cntrolHidden,URL, params,termLength) {
    //  alert("autocompleteAirline");
    //alert("controlid:" + controlid);
   // alert("params" + params);
   // alert("URL:" + URL);
    // alert("type:" + type);
     //alert("termLength:" + termLength);
    // alert(params);
     var obj = {};
     obj.count = params;
     //alert(obj.count);
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          //  alert("sucess");
            var datafromServer = data.d;
           // alert("datafromServer" + datafromServer);
            // $("input[id*=" + controlid + "]").autocomplete({
            $("#" + controlid).autocomplete({
                select: function (event, ui) {
                    //var txt=ui.item.Name; 
                    //  $("input[id*=" + hdnid + "]").val(ui.item.value);
                    // $("input[id*=" + controlid + "]").val(type == 1 ? ui.item.value.substring(ui.item.value.indexOf("[") + 1, ui.item.value.indexOf("]")) : ui.item.value);

                   // alert(ui.item.value);

                    values = ui.item.value.split('^');
                    var RoomTypeCode = values[0];
                    var RoomTypeName = values[1];
                 //   alert("RoomTypeCode" + RoomTypeCode);
                 //   alert("RoomTypeName" + RoomTypeName);

                    // $("#" + controlid).val(type == 1 ? ui.item.value.substring(ui.item.value.indexOf("[") + 1, ui.item.value.indexOf("]")) : ui.item.value);
                    $("#" + controlid).val(RoomTypeName);
                    $("#"+cntrolHidden).val(RoomTypeCode);
                 //   alert("hidden" + $("#" + cntrolHidden).val());
                    return false;
                },
                source: datafromServer,
                search: function () {
                    // custom minLength
                    var term = this.value;
                    if (term.length < termLength) {
                        return false;
                    }
                }

            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
         //   alert("error");
           alert(errorThrown);
        }
    });

}


//    function SearchAgencyRef    ---- Added by Benny

function SearchAgencyRef(controlId, hdnValueFieldID, URL, termLength, customizedParameters, postBackControl, reloadData) {

   // alert(customizedParameters);
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        data: '{"customizedSettings":"' + customizedParameters + '","reloadData":"' + reloadData + '"}',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            var datafromServer = $.map(data.d, function (item) {
               
                return { label: item.EntityDisplayItem, value: item.EntityValueItem }
            });
            //$("input[id*=hdnResult]").val(JSON.stringify(data.d));
            $("input[id*=" + controlId + "]").autocomplete({
                select: function (event, ui) {
                    $("input[id*=" + hdnValueFieldID + "]").val(ui.item.value);
                    $("input[id*=" + controlId + "]").val(ui.item.label);
                    if (postBackControl != '') { $("input[id*=" + postBackControl + "]").click(); }
                    return false;
                },
                source: datafromServer,
                search: function () {
                    var term = this.value;
                    if (term.length < termLength) {
                        return false;
                    }
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function SearchIndividualRef(controlId, hdnValueFieldID, URL, termLength, customizedParameters, postBackControl, reloadData)
{

    //alert(customizedParameters)
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        data: '{"customizedSettings":"' + customizedParameters + '","reloadData":"' + reloadData + '"}',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            var datafromServer = $.map(data.d, function (item) {
               return { label: item.EntityDisplayItem, value: item.EntityValueItem }
            });
            //$("input[id*=hdnResult]").val(JSON.stringify(data.d));
            $("input[id*=" + controlId + "]").autocomplete({
                select: function (event, ui) {
                    $("input[id*=" + hdnValueFieldID + "]").val(ui.item.value);
                    $("input[id*=" + controlId + "]").val(ui.item.label);
                    if (postBackControl != '') { $("input[id*=" + postBackControl + "]").click(); }
                    return false;
                },
                source: datafromServer,
                search: function () {
                    var term = this.value;
                    if (term.length < termLength) {
                        return false;
                    }
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });




}

function SearchTextCar(controlid, hiddenFielID, URL, countryCode, isSourceCitylist, type, termLength) {
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        data: JSON.stringify({ countCode: countryCode, issourceCitylist: isSourceCitylist }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            var datafromServer = $.map(data.d, function (item) {
                return { label: item.cityName + " [" + item.cityCode + "]", value: item.cityID }
            });
            $("input[id*=" + controlid + "]").autocomplete({
                select: function (event, ui) {
                    $("input[id*=" + hiddenFielID + "]").val(ui.item.value);
                    $("input[id*=" + controlid + "]").val(ui.item.label);
                    return false;
                },
                source: datafromServer,
                search: function () {
                    var term = this.value;
                    if (term.length < termLength) {
                        return false;
                    }
                }

            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function SearchTextBus(controlid, hiddenFielID, URL, termLength) {
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        data: JSON.stringify(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            var datafromServer = $.map(data.d, function (item) {
                return { label: item.cityName, value: item.cityName }
            });
            $("input[id*=" + controlid + "]").autocomplete({
                select: function (event, ui) {

                    $("input[id*=" + hiddenFielID + "]").val(ui.item.cityName);
                    $("input[id*=" + controlid + "]").val(ui.item.label);
                    return false;
                },
                source: datafromServer,
                search: function () {
                    var term = this.value;
                    if (term.length < termLength) {
                        return false;
                    }
                }

            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}