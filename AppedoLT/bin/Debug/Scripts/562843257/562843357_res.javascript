var _byteLenKey="org.apache.myfaces.trinidad.validator.ByteLengthValidator.MAXIMUM";
function TrByteLengthValidator(
a0,
a1
)
{
this._length=a0;
this._messages=a1;
this._class="TrByteLengthValidator";
}
TrByteLengthValidator.prototype=new TrValidator();
function CjkFormat(
a0,
a1
)
{
this._base=TrByteLengthValidator;
this._base(a0,a1);
this._class="CjkFormat";
}
CjkFormat.prototype=new TrByteLengthValidator();
CjkFormat.prototype.getHints=function(
a2
)
{
var a3=null;
if(this._messages["hint"])
{
a3=new Array();
a3.push(TrMessageFactory.createCustomMessage(
this._messages["hint"],
this._length)
);
}
return a3;
}
CjkFormat.prototype.validate=function(
a4,
a5,
a6
)
{
var a7=0;
var a8=this._length;
while(a7<a4.length)
{
var a9=a4.charCodeAt(a7);
if((a9<0x80)||((0xFF60<a9)&&(a9<0xFFA0)))a8--;
else a8-=2;
if(a8<0)
{
var a10;
if(!this._messages["detail"])
{
a10=_createFacesMessage(_byteLenKey,
a5,
a4,
this._length);
}
else
{
a10=_createCustomFacesMessage(
TrMessageFactory.getSummaryString(_byteLenKey),
this._messages["detail"],
a5,
a4,
this._length);
}
throw new TrValidatorException(a10);
}
a7++;
}
return a4;
}
function Utf8Format(
a0,
a1
)
{
this._base=TrByteLengthValidator;
this._base(a0,a1);
this._class="Utf8Format";
}
Utf8Format.prototype=new TrByteLengthValidator();
Utf8Format.prototype.getHints=function(
a2
)
{
var a3=null;
if(this._messages["hint"])
{
a3=new Array();
a3.push(TrMessageFactory.createCustomMessage(
this._messages["hint"],
this._length)
);
}
return a3;
}
Utf8Format.prototype.validate=function(
a4,
a5,
a6
)
{
var a7=0;
var a8=this._length;
while(a7<a4.length)
{
var a9=a4.charCodeAt(a7);
if(a9<0x80)a8--;
else if(a9<0x800)a8-=2;
else
{
if((a9&0xF800)==0xD800)
a8-=2;
else
a8-=3;
}
if(a8<0)
{
var a10;
if(!this._messages["detail"])
{
a10=_createFacesMessage(_byteLenKey,
a5,
a4,
this._length);
}
else
{
a10=_createCustomFacesMessage(
TrMessageFactory.getSummaryString(_byteLenKey),
this._messages["detail"],
a5,
a4,
this._length);
}
throw new TrValidatorException(a10);
}
a7++;
}
return a4;
}
function SBFormat(
a0,
a1
)
{
this._base=TrByteLengthValidator;
this._base(a0,a1);
this._class="SBFormat";
}
SBFormat.prototype=new TrByteLengthValidator();
SBFormat.prototype.getHints=function(
a2
)
{
var a3=null;
if(this._messages["hint"])
{
a3=new Array();
a3.push(TrMessageFactory.createCustomMessage(
this._messages["hint"],
this._length)
);
}
return a3;
}
SBFormat.prototype.validate=function(
a4,
a5,
a6
)
{
if(this._length<a4.length)
{
var a7;
if(!this._messages["detail"])
{
a7=_createFacesMessage(_byteLenKey,
a5,
a4,
this._length);
}
else
{
a7=_createCustomFacesMessage(
TrMessageFactory.getSummaryString(_byteLenKey),
this._messages["detail"],
a5,
a4,
this._length);
}
throw new TrValidatorException(a7);
}
return a4;
}

var TrCollections=new Object();
TrCollections.removeValuesFromArray=function(
a0,
a1
)
{
if(a0&&a1)
{
for(i=0;i<a0.length;i++)
{
var a2=a0[i];
for(j=0;j<a1.length;j++)
{
if(a1[j].toLowerCase()==a2.toLowerCase())
{
a1.splice(j,1);
j--;
}
}
}
}
}

function TrNumberFormat(a0,a1)
{
if(!a0)
alert("type for TrNumberFormat not defined!");
this._type=a0;
this._localeSymbols=getLocaleSymbols(a1);
this._pPre=this._localeSymbols.getPositivePrefix();
this._pSuf=this._localeSymbols.getPositiveSuffix();
this._nPre=this._localeSymbols.getNegativePrefix();
this._nSuf=this._localeSymbols.getNegativeSuffix();
this._maxFractionDigits=3;
this._maxIntegerDigits=40;
if(this._type=="currency")
{
this._minFractionDigits=2;
}
else
{
this._minFractionDigits=0;
}
this._minIntegerDigits=1;
this._groupingUsed=true;
}
TrNumberFormat.getNumberInstance=function(a2)
{
return new TrNumberFormat("number",a2);
}
TrNumberFormat.getCurrencyInstance=function(a3)
{
return new TrNumberFormat("currency",a3);
}
TrNumberFormat.getPercentInstance=function(a4)
{
return new TrNumberFormat("percent",a4);
}
TrNumberFormat.prototype.setGroupingUsed=function(a5)
{
this._groupingUsed=a5;
}
TrNumberFormat.prototype.isGroupingUsed=function()
{
return this._groupingUsed;
}
TrNumberFormat.prototype.setMaximumIntegerDigits=function(a6)
{
if(a6)
{
this._maxIntegerDigits=a6<0?0:a6;
if(this._minIntegerDigits>this._maxIntegerDigits)
{
this._minIntegerDigits=this._maxIntegerDigits;
}
}
}
TrNumberFormat.prototype.getMaximumIntegerDigits=function()
{
return this._maxIntegerDigits;
}
TrNumberFormat.prototype.setMaximumFractionDigits=function(a7)
{
if(a7)
{
this._maxFractionDigits=a7<0?0:a7;
if(this._maxFractionDigits<this._minFractionDigits)
{
this._minFractionDigits=this._maxFractionDigits;
}
}
}
TrNumberFormat.prototype.getMaximumFractionDigits=function()
{
return this._maxFractionDigits;
}
TrNumberFormat.prototype.setMinimumIntegerDigits=function(a8)
{
if(a8)
{
this._minIntegerDigits=a8<0?0:a8;
if(this._minIntegerDigits>this._maxIntegerDigits)
{
this._maxIntegerDigits=this._minIntegerDigits;
}
}
}
TrNumberFormat.prototype.getMinimumIntegerDigits=function()
{
return this._minIntegerDigits;
}
TrNumberFormat.prototype.setMinimumFractionDigits=function(a9)
{
if(a9)
{
this._minFractionDigits=a9<0?0:a9;
if(this._maxFractionDigits<this._minFractionDigits)
{
this._maxFractionDigits=this._minFractionDigits;
}
}
}
TrNumberFormat.prototype.getMinimumFractionDigits=function()
{
return this._minFractionDigits;
}
TrNumberFormat.prototype.format=function(a10)
{
if(this._type=="percent")
return this.percentageToString(a10);
else if(this._type=="currency")
return this.currencyToString(a10);
else if(this._type=="number")
return this.numberToString(a10);
}
TrNumberFormat.prototype.parse=function(a11)
{
if(this._type=="percent")
return this.stringToPercentage(a11);
else if(this._type=="currency")
return this.stringToCurrency(a11);
return this.stringToNumber(a11);
}
TrNumberFormat.prototype.stringToNumber=function(a12)
{
if(isNaN(a12)||a12.indexOf('e')!=-1||a12.indexOf('E')!=-1)
{
throw new TrParseException("not able to parse number");
}
return parseFloat(a12);
}
TrNumberFormat.prototype.stringToCurrency=function(a13)
{
var a14=a13.indexOf(this._nPre);
var a15=this._nSuf;
if(a15.charAt(0)==' '||a15.charAt(0)=='\xa0')
a15=a15.substring(1);
var a16=a13.indexOf(a15);
if(a14!=-1&&a16!=-1)
{
a13=a13.substr(this._nPre.length,a13.length-(this._nPre.length+a15.length));
return(this.stringToNumber(a13)*-1);
}
else
{
var a17=a13.indexOf(this._pPre);
var a18=this._pSuf;
if(a18.charAt(0)==' '||a18.charAt(0)=='\xa0')
a18=a18.substring(1);
var a19=a13.indexOf(a18);
if(a17!=-1&&a19!=-1)
{
a13=a13.substr(this._pPre.length,a13.length-(this._pPre.length+a18.length));
a13=this.stringToNumber(a13);
return a13;
}
else
{
throw new TrParseException("not able to parse number");
}
}
}
TrNumberFormat.prototype.stringToPercentage=function(a20)
{
var a21=(a20.indexOf('%')!=-1);
if(!a21)
{
throw new TrParseException("not able to parse number");
}
var a22=a20.replace(/\%/g,'');
return this.stringToNumber(a22);
}
TrNumberFormat.prototype.numberToString=function(a23)
{
var a24=a23<0;
if(a24)
a23=(a23*-1);
var a25=a23+"";
a25=TrNumberFormat.scientificToExpanded(a25);
var a26=a25.indexOf(".");
var a27=a25.length;
var a28;
var a29;
if(a26!=-1)
{
a28=a25.substring(0,a26);
a29=a25.substring(a26+1,a27);
}
else
{
a28=a25;
a29="";
}
a28=this._formatIntegers(a28);
a29=this._formatFractions(a29)
var a30=this._localeSymbols.getDecimalSeparator();
if(a29!="")
a25=(a28+a30+a29);
else
a25=(a28);
if(a24)
a25="-"+a25;
return a25;
}
TrNumberFormat.prototype.currencyToString=function(a31)
{
if(a31<0)
{
a31=(a31*-1)+"";
a31=this.numberToString(a31);
return this._nPre+a31+this._nSuf;
}
else
{
a31=this.numberToString(a31);
return this._pPre+a31+this._pSuf;
}
}
TrNumberFormat.prototype.percentageToString=function(a32)
{
a32=a32*100;
a32=this.getRounded(a32);
if(isNaN(a32))
{
throw new TrParseException("not able to parse number");
}
var a33=this._localeSymbols.getPercentSuffix();
if(!a33||a33=="")
{
throw new TrParseException("percent suffix undefined or empty");
}
a32=this.numberToString(a32);
return a32+a33;
}
TrNumberFormat.scientificToExpanded=function(a34)
{
var a35=a34.indexOf('e');
if(a35==-1)
return a34;
var a36="";
if(a34.charAt(0)=='-')
{
a36="-";
a34=a34.substring(1);
a35-=1;
}
var a37=a34.charAt(a35+1)=='+';
var a38=parseInt(a34.substring(a35+2));
var a39=a35-2;
var a40="";
if(a37)
{
for(var a41=0;a41<a38-a39;++a41)
a40+="0";
return a36+a34.charAt(0)+a34.substring(2,a35)+a40;
}
for(var a41=0;a41<a38-1;++a41)
a40+="0";
return a36+"0."+a40+a34.charAt(0)+a34.substring(2,a35);
}
TrNumberFormat.trimLeadingZeroes=function(a42)
{
var a43=[];
var a44,ch;
for(a44=0;a44<a42.length;++a44)
{
ch=a42.charAt(a44);
if((ch>='1'&&ch<='9')||ch=='.')
break;
if(ch=='0'&&a44+1<a42.length&&a42.charAt(a44+1)!='.')
continue;
a43.push(ch);
}
return a43.join('')+a42.substring(a44);
}
TrNumberFormat.prototype.getRounded=function(a45)
{
a45=this.moveDecimalRight(a45);
a45=Math.round(a45);
a45=this.moveDecimalLeft(a45);
return a45;
}
TrNumberFormat.prototype.moveDecimalRight=function(a46)
{
var a47='';
a47=this.moveDecimal(a46,false);
return a47;
}
TrNumberFormat.prototype.moveDecimalLeft=function(a48)
{
var a49='';
a49=this.moveDecimal(a48,true);
return a49;
}
TrNumberFormat.prototype.moveDecimal=function(a50,a51)
{
var a52='';
a52=this.moveDecimalAsString(a50,a51);
return parseFloat(a52);
}
TrNumberFormat.prototype.moveDecimalAsString=function(a53,a54)
{
var a55=2;
if(a55<=0)
return a53;
var a56=a53+'';
var a57=this.getZeros(a55);
var a58=new RegExp('([0-9.]+)');
if(a54)
{
a56=a56.replace(a58,a57+'$1');
var a59=new RegExp('(-?)([0-9]*)([0-9]{'+a55+'})(\\.?)');
a56=a56.replace(a59,'$1$2.$3');
}
else
{
var a60=a58.exec(a56);
if(a60!=null)
{
a56=a56.substring(0,a60.index)+a60[1]+a57+a56.substring(a60.index+a60[0].length);
}
var a59=new RegExp('(-?)([0-9]*)(\\.?)([0-9]{'+a55+'})');
a56=a56.replace(a59,'$1$2$4.');
}
a56=a56.replace(/\.$/,'');
return a56;
}
TrNumberFormat.prototype.getZeros=function(a61)
{
var a62='';
var a63;
for(a63=0;a63<a61;a63++){
a62+='0';
}
return a62;
}
TrNumberFormat.prototype._formatIntegers=function(a64)
{
var a65=a64.length;
var a66=this.getMaximumIntegerDigits();
var a67=this.getMinimumIntegerDigits();
var a68;
if(a65>a66)
{
a68=a65-a66;
a64=a64.substring(a68,a65);
}
else if(a65<a67)
{
a68=a67-a65;
var a69="";
while(a68>0)
{
a69="0"+a69;
--a68;
}
a64=a69+a64;
}
if(this.isGroupingUsed())
{
a64=this._addGroupingSeparators(a64);
}
return a64;
}
TrNumberFormat.prototype._formatFractions=function(a70)
{
var a71=a70.length;
var a72=this.getMaximumFractionDigits();
var a73=this.getMinimumFractionDigits();
if(a71>a72&&a72>=a73)
{
a70=a70.substring(0,a72);
}
if(a71<a73)
{
var a74=a73-a71;
while(a74>0)
{
a70=a70+"0";
--a74;
}
}
return a70;
}
TrNumberFormat.prototype._addGroupingSeparators=function(a75)
{
var a76=a75.length;
var a77=a76%3;
var a78;
var a79;
var a80="";
var a81=this._localeSymbols.getGroupingSeparator();
if(a77>0)
{
a78=(a76<4)?a75.substring(0,a77):a75.substring(0,a77)+a81;
a79=a75.substring(a77,a76);
}
else
{
a78="";
a79=a75;
}
for(i=0;i<a79.length;i++)
{
if(i%3==0&&i!=0)
{
a80+=a81;
}
a80+=a79.charAt(i);
}
a75=a78+a80;
return a75;
}
function TrParseException(
a0
)
{
this._message=a0;
}
TrParseException.prototype.getMessage=function()
{
return this._message;
}

function TrNumberConverter(
a0,
a1,
a2,
a3,
a4,
a5,
a6,
a7,
a8,
a9,
a10,
a11)
{
this._pattern=a0;
this._type=a1;
this._locale=a2;
this._messages=a3;
this._currencyCode=a6;
this._currencySymbol=a7;
this._maxFractionDigits=a8;
this._maxIntegerDigits=a9;
this._minFractionDigits=a10;
this._minIntegerDigits=a11;
if(a4!==undefined)
this._integerOnly=a4;
else
this._integerOnly=false;
if(a5!==undefined)
this._groupingUsed=a5;
else
this._groupingUsed=true;
this._initNumberFormat(a2);
this._class="TrNumberConverter";
}
TrNumberConverter.prototype=new TrConverter();
TrNumberConverter.prototype.setCurrencyCode=function(a12)
{
this._currencyCode=a12;
}
TrNumberConverter.prototype.getCurrencyCode=function()
{
return this._currencyCode;
}
TrNumberConverter.prototype.setCurrencySymbol=function(a13)
{
this._currencySymbol=a13;
}
TrNumberConverter.prototype.getCurrencySymbol=function()
{
return this._currencySymbol;
}
TrNumberConverter.prototype.setMaxFractionDigits=function(a14)
{
this._maxFractionDigits=a14;
}
TrNumberConverter.prototype.getMaxFractionDigits=function()
{
return this._maxFractionDigits;
}
TrNumberConverter.prototype.setMaxIntegerDigits=function(a15)
{
this._maxIntegerDigits=a15;
}
TrNumberConverter.prototype.getMaxIntegerDigits=function()
{
return this._maxIntegerDigits;
}
TrNumberConverter.prototype.setMinFractionDigits=function(a16)
{
this._minFractionDigits=a16;
}
TrNumberConverter.prototype.getMinFractionDigits=function()
{
return this._minFractionDigits;
}
TrNumberConverter.prototype.setMinIntegerDigits=function(a17)
{
this._minIntegerDigits=a17;
}
TrNumberConverter.prototype.getMinIntegerDigits=function()
{
return this._minIntegerDigits;
}
TrNumberConverter.prototype.setGroupingUsed=function(a18)
{
this._groupingUsed=a18;
}
TrNumberConverter.prototype.isGroupingUsed=function()
{
return this._groupingUsed;
}
TrNumberConverter.prototype.setIntegerOnly=function(a19)
{
this._integerOnly=a19;
}
TrNumberConverter.prototype.isIntegerOnly=function()
{
return this._integerOnly;
}
TrNumberConverter.prototype.getFormatHint=function()
{
if(this._messages&&this._messages["hintPattern"])
{
return TrMessageFactory.createCustomMessage(
this._messages["hintPattern"],
this._pattern);
}
else
{
if(this._pattern)
{
return TrMessageFactory.createMessage(
"org.apache.myfaces.trinidad.convert.NumberConverter.FORMAT_HINT",
this._pattern);
}
else
{
return null;
}
}
}
TrNumberConverter.prototype.getAsString=function(
a20,
a21
)
{
if(this._isConvertible())
{
if(this._type=="percent"||this._type=="currency")
{
var a22=this._numberFormat.format(a20);
if(this._type=="currency")
{
if(this._currencyCode)
{
a22=a22.replace(getLocaleSymbols().getCurrencyCode(),this._currencyCode);
}
else if(this._currencySymbol)
{
a22=a22.replace(getLocaleSymbols().getCurrencySymbol(),this._currencySymbol);
}
}
return a22;
}
else
{
if(typeof a20==="string")
{
return this._numberFormat.format(parseFloat(a20));
}
else
{
return this._numberFormat.format(parseFloat(a20.toFixed(this._numberFormat.getMaximumFractionDigits())));
}
}
}
else
{
return undefined;
}
}
TrNumberConverter.prototype.getAsObject=function(
a23,
a24
)
{
a23=TrFormatUtils.trim(a23);
if(this._isConvertible(a23))
{
if(a23==null)
return null;
if(a23.length==0)
return null
var a25;
if(this._type=="percent"||this._type=="currency")
{
var a26=getLocaleSymbols(this._locale);
var a27=a26.getGroupingSeparator();
if(a27=="\xa0")
{
var a28=new RegExp("\\ ","g");
a23=a23.replace(a28,"\xa0");
}
var a29=new RegExp("\\"+a27,"g");
a23=a23.replace(a29,"");
var a30=a26.getDecimalSeparator();
var a31=new RegExp("\\"+a30,"g");
a23=a23.replace(a31,".");
try
{
a23=this._numberFormat.parse(a23)+"";
}
catch(e)
{
try
{
a23=TrNumberFormat.getNumberInstance().parse(a23)+"";
}
catch(e)
{
var a32;
var a33=this._numberFormat.format(this._example);
var a34="org.apache.myfaces.trinidad.convert.NumberConverter.CONVERT_"+this._type.toUpperCase();
if(this._messages&&this._messages[this._type])
{
a32=_createCustomFacesMessage(TrMessageFactory.getSummaryString(a34),this._messages[this._type],a24,a23,a33);
}
else
{
a32=_createFacesMessage(a34,a24,a23,a33);
}
throw new TrConverterException(a32);
}
}
var a35=new RegExp("\\"+".","g");
a23=a23.replace(a35,getLocaleSymbols().getDecimalSeparator());
}
a25=_decimalParse(a23,
this._messages,
"org.apache.myfaces.trinidad.convert.NumberConverter",
null,
null,
null,
null,
a24,
!this.isIntegerOnly());
a25=parseFloat(a25.toFixed(this._numberFormat.getMaximumFractionDigits()));
if(this._type=="percent")
{
a25=a25/100;
}
return a25;
}
else
{
return undefined;
}
}
TrNumberConverter.prototype._isConvertible=function(a36)
{
if(this._pattern!=null)
return false;
return TrFormatUtils.isNumberConvertible(a36);
}
TrNumberConverter.prototype._initNumberFormat=function(a37)
{
if(this._type=="percent")
{
this._example=0.3423;
this._numberFormat=TrNumberFormat.getPercentInstance(a37);
}
else if(this._type=="currency")
{
this._example=10250;
this._numberFormat=TrNumberFormat.getCurrencyInstance(a37);
}
else if(this._type=="number")
{
this._numberFormat=TrNumberFormat.getNumberInstance(a37);
}
this._numberFormat.setGroupingUsed(this.isGroupingUsed());
this._numberFormat.setMaximumFractionDigits(this.getMaxFractionDigits());
this._numberFormat.setMaximumIntegerDigits(this.getMaxIntegerDigits());
this._numberFormat.setMinimumFractionDigits(this.getMinFractionDigits());
this._numberFormat.setMinimumIntegerDigits(this.getMinIntegerDigits());
}

function TrIntegerConverter(
a0,
a1,
a2,
a3,
a4)
{
this._message=a0;
this._maxPrecision=a1;
this._maxScale=a2;
this._maxValue=a3;
this._minValue=a4;
this._class="TrIntegerConverter";
}
TrIntegerConverter.prototype=new TrConverter();
TrIntegerConverter.prototype.getFormatHint=function()
{
return null;
}
TrIntegerConverter.prototype.getAsString=function(
a5,
a6
)
{
return""+a5;
}
TrIntegerConverter.prototype.getAsObject=function(
a7,
a8
)
{
return _decimalParse(a7,
this._message,
"org.apache.myfaces.trinidad.convert.IntegerConverter",
this._maxPrecision,
this._maxScale,
this._maxValue,
this._minValue,
a8,
null);
}
function TrLongConverter(
a0,
a1,
a2,
a3,
a4)
{
this._message=a0;
this._maxPrecision=a1;
this._maxScale=a2;
this._maxValue=a3;
this._minValue=a4;
this._class="TrLongConverter";
}
TrLongConverter.prototype=new TrConverter();
TrLongConverter.prototype.getFormatHint=function()
{
return null;
}
TrLongConverter.prototype.getAsString=function(
a5,
a6
)
{
return""+a5;
}
TrLongConverter.prototype.getAsObject=function(
a7,
a8
)
{
if(TrFormatUtils.isNumberConvertible(a7))
{
return _decimalParse(a7,
this._message,
"org.apache.myfaces.trinidad.convert.LongConverter",
this._maxPrecision,
this._maxScale,
this._maxValue,
this._minValue,
a8,
null);
}
else
{
return undefined;
}
}
function TrShortConverter(
a0,
a1,
a2,
a3,
a4)
{
this._message=a0;
this._maxPrecision=a1;
this._maxScale=a2;
this._maxValue=a3;
this._minValue=a4;
this._class="TrShortConverter";
}
TrShortConverter.prototype=new TrConverter();
TrShortConverter.prototype.getFormatHint=function()
{
return null;
}
TrShortConverter.prototype.getAsString=function(
a5,
a6
)
{
return""+a5;
}
TrShortConverter.prototype.getAsObject=function(
a7,
a8
)
{
return _decimalParse(a7,
this._message,
"org.apache.myfaces.trinidad.convert.ShortConverter",
this._maxPrecision,
this._maxScale,
this._maxValue,
this._minValue,
a8,
null);
}
function TrByteConverter(
a0,
a1,
a2,
a3,
a4)
{
this._message=a0;
this._maxPrecision=a1;
this._maxScale=a2;
this._maxValue=a3;
this._minValue=a4;
this._class="TrByteConverter";
}
TrByteConverter.prototype=new TrConverter();
TrByteConverter.prototype.getFormatHint=function()
{
return null;
}
TrByteConverter.prototype.getAsString=function(
a5,
a6
)
{
return""+a5;
}
TrByteConverter.prototype.getAsObject=function(
a7,
a8
)
{
return _decimalParse(a7,
this._message,
"org.apache.myfaces.trinidad.convert.ByteConverter",
this._maxPrecision,
this._maxScale,
this._maxValue,
this._minValue,
a8,
null);
}
function TrDoubleConverter(
a0,
a1,
a2,
a3,
a4)
{
this._message=a0;
this._maxPrecision=a1;
this._maxScale=a2;
this._maxValue=a3;
this._minValue=a4;
this._class="TrDoubleConverter";
}
TrDoubleConverter.prototype=new TrConverter();
TrDoubleConverter.prototype.getFormatHint=function()
{
return null;
}
TrDoubleConverter.prototype.getAsString=function(
a5,
a6
)
{
var a7=""+a5;
var a8=a7.indexOf(".");
if(a8!=-1)
return a7;
else
return""+a5.toFixed(1);
}
TrDoubleConverter.prototype.getAsObject=function(
a9,
a10
)
{
return _decimalParse(a9,
this._message,
"org.apache.myfaces.trinidad.convert.DoubleConverter",
this._maxPrecision,
this._maxScale,
this._maxValue,
this._minValue,
a10,
true,
true);
}
function TrFloatConverter(
a0,
a1,
a2,
a3,
a4)
{
this._message=a0;
this._maxPrecision=a1;
this._maxScale=a2;
this._maxValue=a3;
this._minValue=a4;
this._class="TrFloatConverter";
}
TrFloatConverter.prototype=new TrConverter();
TrFloatConverter.prototype.getFormatHint=function()
{
return null;
}
TrFloatConverter.prototype.getAsString=function(
a5,
a6
)
{
var a7=""+a5;
var a8=a7.indexOf(".");
if(a8!=-1)
return a7;
else
return""+a5.toFixed(1);
}
TrFloatConverter.prototype.getAsObject=function(
a9,
a10
)
{
return _decimalParse(a9,
this._message,
"org.apache.myfaces.trinidad.convert.FloatConverter",
this._maxPrecision,
this._maxScale,
this._maxValue,
this._minValue,
a10,
true,
true);
}
function TrRangeValidator(
a0,
a1,
a2)
{
this._maxValue=a0;
this._minValue=a1;
this._messages=a2;
this._class="TrRangeValidator";
}
TrRangeValidator.prototype=new TrValidator();
TrRangeValidator.prototype.getHints=function(
a3
)
{
return _returnRangeHints(
this._messages,
this._maxValue,
this._minValue,
"org.apache.myfaces.trinidad.validator.RangeValidator.MAXIMUM_HINT",
"org.apache.myfaces.trinidad.validator.RangeValidator.MINIMUM_HINT",
"org.apache.myfaces.trinidad.validator.RangeValidator.RANGE_HINT",
"hintMax",
"hintMin",
"hintRange"
);
}
TrRangeValidator.prototype.validate=function(
a4,
a5,
a6
)
{
string=""+a4;
numberValue=parseFloat(string);
var a7;
if(this._minValue!=null&&this._maxValue!=null)
{
if(numberValue>=this._minValue&&numberValue<=this._maxValue)
{
return string;
}
else
{
var a8="org.apache.myfaces.trinidad.validator.LongRangeValidator.NOT_IN_RANGE";
if(this._messages&&this._messages["range"])
{
a7=_createCustomFacesMessage(TrMessageFactory.getSummaryString(a8),
this._messages["range"],
a5,
string,
""+this._minValue,
""+this._maxValue);
}
else
{
a7=_createFacesMessage(a8,
a5,
string,
""+this._minValue,
""+this._maxValue);
}
}
}
else
{
if(this._minValue!=null)
{
if(numberValue>=this._minValue)
{
return string;
}
else
{
var a8="org.apache.myfaces.trinidad.validator.LongRangeValidator.MINIMUM";
if(this._messages&&this._messages["min"])
{
a7=_createCustomFacesMessage(TrMessageFactory.getSummaryString(a8),
this._messages["min"],
a5,
string,
""+this._minValue);
}
else
{
a7=_createFacesMessage(a8,
a5,
string,
""+this._minValue);
}
}
}
else
{
if(this._maxValue==null||numberValue<=this._maxValue)
{
return string;
}
else
{
var a8="org.apache.myfaces.trinidad.validator.LongRangeValidator.MAXIMUM";
if(this._messages&&this._messages["max"])
{
a7=_createCustomFacesMessage(TrMessageFactory.getSummaryString(a8),
this._messages["max"],
a5,
string,
""+this._maxValue);
}
else
{
a7=_createFacesMessage(a8,
a5,
string,
""+this._maxValue);
}
}
}
}
throw new TrConverterException(a7);
}
function TrLengthValidator(
a0,
a1,
a2)
{
this._maxValue=a0;
this._minValue=a1;
this._messages=a2;
this._class="TrLengthValidator";
}
TrLengthValidator.prototype=new TrValidator();
TrLengthValidator.prototype.getHints=function(
a3
)
{
return _returnRangeHints(
this._messages,
this._maxValue,
this._minValue,
"org.apache.myfaces.trinidad.validator.LengthValidator.MAXIMUM_HINT",
"org.apache.myfaces.trinidad.validator.LengthValidator.MINIMUM_HINT",
(this._minValue==this._maxValue)
?"org.apache.myfaces.trinidad.validator.LengthValidator.EXACT_HINT"
:"org.apache.myfaces.trinidad.validator.LengthValidator.RANGE_HINT",
"hintMax",
"hintMin",
"hintRange"
);
}
TrLengthValidator.prototype.validate=function(
a4,
a5,
a6
)
{
var a7=""+a4;
var a8=a7.length;
if(a8>=this._minValue&&
((this._maxValue==null)||(a8<=this._maxValue)))
{
return a7;
}
else
{
if((this._minValue>0)&&(this._maxValue!=null))
{
var a9=(this._minValue==this._maxValue);
var a10=a9
?"org.apache.myfaces.trinidad.validator.LengthValidator.EXACT"
:"org.apache.myfaces.trinidad.validator.LengthValidator.NOT_IN_RANGE";
var a11;
var a12="range";
if(this._messages&&this._messages[a12])
{
a11=_createCustomFacesMessage(TrMessageFactory.getSummaryString(a10),
this._messages[a12],
a5,
a7,
""+this._minValue,
""+this._maxValue);
}
else
{
a11=_createFacesMessage(a10,
a5,
a7,
""+this._minValue,
""+this._maxValue);
}
throw new TrConverterException(a11);
}
else if(a8<this._minValue)
{
var a10="org.apache.myfaces.trinidad.validator.LengthValidator.MINIMUM";
var a11;
if(this._messages&&this._messages["min"])
{
a11=_createCustomFacesMessage(TrMessageFactory.getSummaryString(a10),
this._messages["min"],
a5,
a7,
""+this._minValue);
}
else
{
a11=_createFacesMessage(a10,
a5,
a7,
""+this._minValue);
}
throw new TrConverterException(a11);
}
else
{
var a10="org.apache.myfaces.trinidad.validator.LengthValidator.MAXIMUM";
var a11;
if(this._messages&&this._messages["max"])
{
a11=_createCustomFacesMessage(TrMessageFactory.getSummaryString(a10),
this._messages["max"],
a5,
a7,
""+this._maxValue);
}
else
{
a11=_createFacesMessage(a10,
a5,
a7,
""+this._maxValue);
}
throw new TrConverterException(a11);
}
}
}
function TrDateTimeRangeValidator(
a0,
a1,
a2,
a3,
a4
)
{
this._maxValue=a0;
this._maxISODate=a3;
this._minValue=a1;
this._minISODate=a4;
this._messages=a2;
this._class="TrDateTimeRangeValidator";
}
TrDateTimeRangeValidator.prototype=new TrValidator();
TrDateTimeRangeValidator.prototype.getHints=function(
a5
)
{
var a6=null;
var a7=null;
if(this._maxValue)
a6=this._maxValue;
if(this._minValue)
a7=this._minValue;
return _returnRangeHints(
this._messages,
a6,
a7,
"org.apache.myfaces.trinidad.validator.DateTimeRangeValidator.MAXIMUM_HINT",
"org.apache.myfaces.trinidad.validator.DateTimeRangeValidator.MINIMUM_HINT",
"org.apache.myfaces.trinidad.validator.DateTimeRangeValidator.RANGE_HINT",
"hintMax",
"hintMin",
"hintRange"
);
}
TrDateTimeRangeValidator.prototype.validate=function(
a8,
a9,
a10
)
{
dateTime=a8.getTime();
var a11;
var a12=this._getISOConverter();
if(this._minValue&&this._maxValue)
{
try
{
minDate=(this._minISODate==null)?
a10.getAsObject(this._minValue).getTime():
a12.getAsObject(this._minISODate).getTime();
maxDate=(this._maxISODate==null)?
a10.getAsObject(this._maxValue).getTime():
a12.getAsObject(this._maxISODate).getTime();
}
catch(e)
{
return a8;
}
if(dateTime>=minDate&&dateTime<=maxDate)
{
return a8;
}
else
{
var a13="org.apache.myfaces.trinidad.validator.DateTimeRangeValidator.NOT_IN_RANGE";
if(this._messages&&this._messages["range"])
{
a11=_createCustomFacesMessage(TrMessageFactory.getSummaryString(a13),
this._messages["range"],
a9,
""+a10.getAsString(a8),
""+this._minValue,
""+this._maxValue);
}
else
{
a11=_createFacesMessage(a13,
a9,
""+a10.getAsString(a8),
""+this._minValue,
""+this._maxValue);
}
}
}
else
{
if(this._minValue)
{
try
{
minDate=(this._minISODate==null)?
a10.getAsObject(this._minValue).getTime():
a12.getAsObject(this._minISODate).getTime();
}
catch(e)
{
return a8;
}
if(dateTime>=minDate)
{
return a8;
}
else
{
var a13="org.apache.myfaces.trinidad.validator.DateTimeRangeValidator.MINIMUM";
if(this._messages&&this._messages["min"])
{
a11=_createCustomFacesMessage(TrMessageFactory.getSummaryString(a13),
this._messages["min"],
a9,
""+a10.getAsString(a8),
""+this._minValue);
}
else
{
a11=_createFacesMessage(a13,
a9,
""+a10.getAsString(a8),
""+this._minValue);
}
}
}
else if(this._maxValue)
{
try
{
maxDate=(this._maxISODate==null)?
a10.getAsObject(this._maxValue).getTime():
a12.getAsObject(this._maxISODate).getTime();
}
catch(e)
{
return a8;
}
if(dateTime<=maxDate)
{
return a8;
}
else
{
var a13="org.apache.myfaces.trinidad.validator.DateTimeRangeValidator.MAXIMUM";
if(this._messages&&this._messages["max"])
{
a11=_createCustomFacesMessage(TrMessageFactory.getSummaryString(a13),
this._messages["max"],
a9,
""+a10.getAsString(a8),
""+this._maxValue);
}
else
{
a11=_createFacesMessage(a13,
a9,
""+a10.getAsString(a8),
""+this._maxValue);
}
}
}
else
{
return a8;
}
}
throw new TrConverterException(a11);
}
TrDateTimeRangeValidator.prototype._getISOConverter=function()
{
if(this._ISO_CONVERTER==null)
this._ISO_CONVERTER=new TrDateTimeConverter("yyyy-MM-dd HH:mm:ss",null,null,null,null);
return this._ISO_CONVERTER;
}
function TrDateRestrictionValidator(
a0,
a1,
a2)
{
this._weekdaysValue=a0;
this._monthValue=a1;
this._messages=a2;
this._weekdaysMap={'2':'tue','4':'thu','6':'sat','1':'mon','3':'wed','5':'fri','0':'sun'};
this._translatedWeekdaysMap={'sun':'0','mon':'1','tue':'2','wed':'3','thu':'4','fri':'5','sat':'6'};
this._monthMap={'2':'mar','4':'may','9':'oct','8':'sep','11':'dec','6':'jul','1':'feb','3':'apr','10':'nov','7':'aug','5':'jun','0':'jan'};
this._translatedMonthMap={'jan':'0','feb':'1','mar':'2','apr':'3','may':'4','jun':'5','jul':'6','aug':'7','sep':'8','oct':'9','nov':'10','dec':'11'};
this._class="TrDateRestrictionValidator";
}
TrDateRestrictionValidator.prototype=new TrValidator();
TrDateRestrictionValidator.prototype.getHints=function(
a3
)
{
var a4=['mon','tue','wed','thu','fri','sat','sun'];
var a5=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
if(this._weekdaysValue)
this._removeDisabledValues(this._weekdaysValue,a4);
if(this._monthValue)
this._removeDisabledValues(this._monthValue,a5);
return _returnHints(
this._messages,
!this._weekdaysValue?this._weekdaysValue:this._translate(a4,this._translatedWeekdaysMap,a3.getLocaleSymbols().getWeekdays()),
!this._monthValue?this._monthValue:this._translate(a5,this._translatedMonthMap,a3.getLocaleSymbols().getMonths()),
"org.apache.myfaces.trinidad.validator.DateRestrictionValidator.WEEKDAY_HINT",
"org.apache.myfaces.trinidad.validator.DateRestrictionValidator.MONTH_HINT",
"hintWeek",
"hintMonth"
);
}
TrDateRestrictionValidator.prototype._translate=function(
values,
map,
valueArray
)
{
if(values)
{
var translatedValues=new Array();
var valuesAsArray=eval(values);
for(i=0;i<valuesAsArray.length;i++)
{
translatedValues.push(valueArray[map[valuesAsArray[i].toLowerCase()]]);
}
return eval(translatedValues);
}
else
{
return values;
}
}
TrDateRestrictionValidator.prototype._removeDisabledValues=function(
a6,
a7
)
{
if(a6&&a7)
{
for(i=0;i<a7.length;i++)
{
if(a6[a7[i].toLowerCase()]!=undefined)
{
a7.splice(i,1);
i--;
}
}
}
}
TrDateRestrictionValidator.prototype.validate=function(
value,
label,
converter
)
{
submittedDay=value.getDay();
weekDaysArray=eval(this._weekdaysValue);
if(weekDaysArray)
{
var dayString=this._weekdaysMap[submittedDay];
for(var i=0;i<weekDaysArray.length;++i)
{
if(weekDaysArray[i].toLowerCase()==dayString)
{
var allWeekdays=['mon','tue','wed','thu','fri','sat','sun'];
this._removeDisabledValues(this._weekdaysValue,allWeekdays);
var days=_trToString(this._translate(allWeekdays,this._translatedWeekdaysMap,converter.getLocaleSymbols().getWeekdays()));
var facesMessage;
var key="org.apache.myfaces.trinidad.validator.DateRestrictionValidator.WEEKDAY";
if(this._messages&&this._messages["days"])
{
facesMessage=_createCustomFacesMessage(TrMessageFactory.getSummaryString(key),
this._messages["days"],
label,
""+converter.getAsString(value),
days);
}
else
{
facesMessage=_createFacesMessage(key,
label,
""+converter.getAsString(value),
days);
}
throw new TrConverterException(facesMessage);
}
}
}
submittedMonth=value.getMonth();
monthArray=eval(this._monthValue);
if(monthArray)
{
var monthString=this._monthMap[submittedMonth];
for(var i=0;i<monthArray.length;++i)
{
if(monthArray[i].toLowerCase()==monthString)
{
var allMonth=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
TrCollections.removeValuesFromArray(this._monthValue,allMonth);
var month=_trToString(this._translate(allMonth,this._translatedMonthMap,converter.getLocaleSymbols().getMonths()));
var facesMessage;
var key="org.apache.myfaces.trinidad.validator.DateRestrictionValidator.MONTH";
if(this._messages&&this._messages["month"])
{
facesMessage=_createCustomFacesMessage(TrMessageFactory.getSummaryString(key),
this._messages["month"],
label,
""+converter.getAsString(value),
month);
}
else
{
facesMessage=_createFacesMessage(key,
label,
""+converter.getAsString(value),
month);
}
throw new TrConverterException(facesMessage);
}
}
}
return value;
}
function _decimalParse(
a0,
a1,
a2,
a3,
a4,
a5,
a6,
a7,
a8,
a9
)
{
if(a0==null)
return null;
a0=TrFormatUtils.trim(a0);
if(a0.length==0)
return null
var a10=null;
var a11=getLocaleSymbols();
if(a11&&(a9!=true))
{
var a12=a11.getGroupingSeparator();
if((a0.indexOf(a12)==0)||
(a0.lastIndexOf(a12)==(a0.length-1)))
{
a10=_createFacesMessage(a2+".CONVERT",
a7,
a0);
throw new TrConverterException(a10);
}
if(a12=="\xa0"){
var a13=new RegExp("\\ ","g");
a0=a0.replace(a13,"\xa0");
}
var a14=new RegExp("\\"+a12,"g");
a0=a0.replace(a14,"");
var a15=new RegExp("\\"+a11.getDecimalSeparator(),"g");
a0=a0.replace(a15,".");
}
if((a0.indexOf('e')<0)&&
(a0.indexOf('E')<0)&&
(((a0*a0)==0)||
((a0/a0)==1)))
{
var a16=null;
var a17=false;
if(a8!=null)
{
a0=TrNumberFormat.trimLeadingZeroes(a0);
a16=a8?parseFloat(a0):parseInt(a0);
}
else
{
a16=parseInt(a0);
if(Math.abs(a16)<Math.abs(parseFloat(a0)))
{
a17=true;
}
}
if(!a17&&!isNaN(a16))
{
var a18=a0.length;
var a19=0;
var a20=a0.lastIndexOf('.');
if(a20!=-1)
{
a18=a20;
a19=parseInt(a0.length-parseInt(a20+1));
}
var a21;
var a22;
if((a5!=null)&&
(a16>a5))
{
a21=a2+".MAXIMUM";
a22=a5;
}
else if((a6!=null)&&
(a16<a6))
{
a21=a2+".MINIMUM";
a22=a6;
}
if(a21)
{
a10=_createFacesMessage(a21,
a7,
a0,
""+a22);
throw new TrConverterException(a10);
}
return a16;
}
}
var a23=null;
var a24=false;
if(a2.indexOf("NumberConverter")==-1)
{
a23=a2+".CONVERT";
}
else
{
a23=a2+".CONVERT_NUMBER";
if(a1&&a1["number"])
{
a10=_createCustomFacesMessage(TrMessageFactory.getSummaryString(a23),
a1["number"],
a7,
a0);
a24=true;
}
}
if(!a24)
{
a10=_createFacesMessage(a23,
a7,
a0);
}
throw new TrConverterException(a10);
}
function TrRegExpValidator(
a0,
a1
)
{
this._pattern=a0;
this._messages=a1;
this._class="TrRegExpValidator";
}
TrRegExpValidator.prototype=new TrValidator();
TrRegExpValidator.prototype.getHints=function(
a2
)
{
var a3=null;
if(this._messages["hint"])
{
a3=new Array();
a3.push(TrMessageFactory.createCustomMessage(
this._messages["hint"],
""+this._pattern)
);
}
return a3;
}
TrRegExpValidator.prototype.validate=function(
a4,
a5,
a6
)
{
a4=a4+'';
var a7="^("+this._pattern+")$";
var a8=a4.match(a7);
if((a8!=(void 0))&&(a8[0]==a4))
{
return a4;
}
else
{
var a9="org.apache.myfaces.trinidad.validator.RegExpValidator.NO_MATCH";
var a10;
if(this._messages&&this._messages["detail"])
{
a10=_createCustomFacesMessage(
TrMessageFactory.getSummaryString(a9),
this._messages["detail"],
a5,
a4,
this._pattern);
}
else
{
a10=_createFacesMessage(a9,
a5,
a4,
this._pattern);
}
throw new TrValidatorException(a10);
}
}
function _returnRangeHints(
a0,
a1,
a2,
a3,
a4,
a5,
a6,
a7,
a8
)
{
if(a1!=null&&a2!=null&&a2!=0)
{
var a9=new Array();
if(a0&&a0[a8])
{
a9.push(
TrMessageFactory.createCustomMessage(
a0[a8],
""+a2,
""+a1)
);
}
else
{
a9.push(
TrMessageFactory.createMessage(
a5,
""+a2,
""+a1)
);
}
return a9;
}
return _returnHints(
a0,
a1,
a2,
a3,
a4,
a6,
a7
);
}
function _trToString(a0)
{
if(Array.prototype.isPrototypeOf(a0))
{
return a0.join(", ");
}
else
{
return""+a0;
}
}
function _returnHints(
a0,
a1,
a2,
a3,
a4,
a5,
a6
)
{
var a7;
if(a1!=null)
{
a7=new Array();
if(a0&&a0[a5])
{
a7.push(
TrMessageFactory.createCustomMessage(
a0[a5],
_trToString(a1))
);
}
else
{
a7.push(
TrMessageFactory.createMessage(
a3,
_trToString(a1))
);
}
}
if(a2!=null&&a2!=0)
{
if(!a7)
{
a7=new Array();
}
if(a0&&a0[a6])
{
a7.push(
TrMessageFactory.createCustomMessage(
a0[a6],
_trToString(a2))
);
}
else
{
a7.push(
TrMessageFactory.createMessage(
a4,
_trToString(a2))
);
}
}
return a7;
}
