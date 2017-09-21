/* _GlobalPrefix_ */
/* _Module_:emd */
try{
s_D("emd");
s_C("emd");s_E();
}catch(e){_DumpException(e)}
/* _Module_:eme */
try{
s_D("eme");
s_C("eme");s_E();
}catch(e){_DumpException(e)}
/* _Module_:emf */
try{
s_D("emf");
s_C("emf");s_E();
}catch(e){_DumpException(e)}
/* _Module_:emg */
try{
s_D("emg");
s_C("emg");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy2n */
try{
var s_Mma,s_Nma,s_Sj,s_Oma,s_Tj,s_Pma={};s_D("sy2n");var s_Uj=function(a){s_H(this,a,0,2,null,null)};s_g(s_Uj,s_G);s_Uj.prototype.jh=function(){return s_I(this,1)};var s_Qma={};var s_Vj=s_c,s_Wj=s_7c(0),s_Xj=s_7c(0),s_Yj=s_7c(0),s_Rma=function(a,b){window.scrollBy(a,b)},s_Zj=function(a,b){window.scrollTo(a,b)},s__j=s_8c,s_0j=s_8c,s_Sma=s_c,s_Tma=s_c,s_Uma=s_c,s_1j=function(){if(document.body){var a=s_4d(document.body).top;s_1j=s_7c(a);return a}return 0},s_Vma=s_fb.match(/ GSA\/([.\d]+)/),s_2j=s_Vma?s_Vma[1]:"";s_Oma=(s_Tj=!!s_Vma)&&0<=s_Ia(s_2j,"4");s_Sj=s_Tj&&0<=s_Ia(s_2j,"5.2");s_Nma=s_Tj&&0<=s_Ia(s_2j,"5.7");s_Mma=s_Tj&&0<=s_Ia(s_2j,"4.3")&&!(0<=s_Ia(s_2j,"4.5"));

s_C("sy2n");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy31 */
try{
s_D("sy31");var s_3j={Gza:{},Tna:function(a,b,c){var d=c?1:0;if(!s_ka(0!=d?"velour.loadJsInterfaceWithFlags":"velour.loadJsInterface"))return s_xf("No Velour.");a in s_3j.Gza||(s_3j.Gza[a]={});c=s_3j.Gza[a];if(c[b])return c[b];var e=s_Af(),f=0!=d?window.velour.loadJsInterfaceWithFlags(a,b,d):window.velour.loadJsInterface(a,b),d="google.velourCb."+a+"."+b;s_ta(d,{onSuccess:function(){e.resolve(f.getResult())},onFailure:function(){e.reject(a+"."+b+" failed to load: "+f.getError().getMessage())}});f.setCallback(d);
return c[b]=e.$},call:function(a,b,c,d){for(var e=[a,b,!1],f=2;f<arguments.length;f++)e.push(arguments[f]);return s_3j.TXa.apply(s_3j,e)},TXa:function(a,b,c,d,e){for(var f=s_3j.Tna(a,b,c),g=[],k=4;k<arguments.length;k++)g.push(arguments[k]);return f.then(function(a){return a[d]?a[d].apply(a,g):s_xf(d+" not found")})}};

s_C("sy31");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syav */
try{
s_D("syav");var s_gbb,s_hbb=!1,s_jbb=function(){var a=s_ibb;s_td(window,"beforeunload",function(){s_hbb||s_gbb.set("isn",a)})};if(s_Tj){s_gbb=s_th("s","isn");var s_ibb,s_kbb,s_lbb,s_mbb=s_ei("isn").split(":");s_lbb=s_mbb[0];s_kbb=s_mbb[1];(s_ibb=s_lbb?s_wb(s_kbb,s_lbb):null)&&s_jbb()};

s_C("syav");s_E();
}catch(e){_DumpException(e)}
/* _Module_:aa */
try{
s_D("aa");
s_C("aa");s_E();
}catch(e){_DumpException(e)}
/* _Module_:abd */
try{
s_D("abd");var s_bz=function(a){for(var b="",c=21,d=0;d<a.length;d++)3!=d%4&&(b+=String.fromCharCode(a[d]^c),c++);return b},s_L4a=s_bz([97,119,115,111,107]),s_M4a=s_bz([97,119,115,111,107,123]),s_N4a=s_bz([118,115,121,107,108,124,104,119,68,127,114,105,114]),s_O4a=s_bz([101,126,118,102,118,125,118,109,126]),s_P4a=s_bz([116,116,115,108]),s_Q4a=s_bz([113,115,99,107]),s_R4a=s_bz([113,115,117,107]),s_S4a=s_bz([58,127,122,103,121,126,127,98,104,51,109,124,118,123,15,76,81,90,13,95,67,76,64,118]),s_T4a=function(a){var b=
0,c;for(c in a)if(a[c].e)if(a[c].b)b++;else return!1;return 0<b},s_U4a=function(a){a=a||{};var b={};b[s_Q4a]={e:!!a[s_Q4a],b:!s_xna(s_L4a)};b[s_R4a]={e:!!a[s_R4a],b:!s_xna(s_M4a)};return b},s_V4a=function(a){var b=[],c;for(c in a)a[c].e&&b.push(c+":"+(a[c].b?"1":"0"));return b.join(",")},s_W4a=function(a,b){a=String(a);b&&(a+=","+b);google.log(s_O4a,a)},s_X4a=function(a,b,c){c=null!=c?c:2;if(1>c)s_W4a(7,b);else{var d=new Image;d.onerror=s_e(s_X4a,a,b,c-1);d.src=a}}; s_rf("abd",{init:function(a){a=a||{};if(a[s_P4a]&&s_xna(s_N4a)){a=s_U4a(a);var b=s_V4a(a);s_T4a(a)?s_W4a(1,"0,"+b):s_W4a(0,b);s_Ah(function(){s_X4a(s_S4a,"aa")})}}});

s_C("abd");s_E();
}catch(e){_DumpException(e)}
/* _Module_:eml */
try{
var s_rra=function(a){var b,c=a.parentNode;if(c&&11!=c.nodeType)if(a.removeNode)a.removeNode(!1);else{for(;b=a.firstChild;)c.insertBefore(b,a);s_Oc(a)}};s_D("eml");
s_C("eml");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy3s */
try{
var s_wqa=function(){for(var a=new Map,b=s_una.getParams(!1),c=s_da(b.keys()),d=c.next();!d.done;d=c.next())d=d.value,s_Eh(d)&&a.set(d,b.get(d)||"");return a},s_xqa=function(a){return Object.keys(a).map(function(b){return encodeURIComponent(b)+"."+a[b]}).join(",")},s_zqa=function(a,b,c,d,e){var f=new Map;if(b){var g=new s_Ze;s_og(g,b);(b=s_1e(g))&&f.set("vet",b)}d?f.set("ved",d):f.set("ei",c||google.kEI);e&&f.set("lei",e);var k=s_Jk().getParams();s_Rfa.forEach(function(a){var b=k.get(a);b&&f.set(a,
b)});f=s_yqa(f);f.set("yv","2");a.forEach(function(a,b){f.set(b,a)});return f},s_yqa=function(a){a=void 0===a?new Map:a;var b=void 0===b?!1:b;var c=s_wqa(),d=new Set(s_Ufa);b||s_Vfa.forEach(function(a){d.add(a)});c.forEach(function(b,c){a&&d.has(c)&&a.set(c,b)});return a};s_D("sy3s");
var s_Aqa=function(a){function b(a,b){c.push(encodeURIComponent(b)+":"+encodeURIComponent(a))}var c=[];a instanceof Map?a.forEach(b):s_hb(a,b);return c.join(",")};var s_Bqa=function(){this.ka=this.$=0},s_Cqa=function(){var a=window.performance;return a&&a.now?a.now():s_f()};s_Bqa.prototype.start=function(){this.$=this.$||s_Cqa()};s_Bqa.prototype.pause=function(){this.ka=this.$?this.ka+s_Cqa()-this.$:this.ka;this.$=0};s_Bqa.prototype.reset=function(){this.ka=this.$=0};
var s_ql=function(a,b,c){a=void 0===a?"web":a;b=void 0===b?"csi":b;var d=google.kEI;c=s_mi(new s_li(c),"ei",d);a=s_mi(c,"s",a);s_mi(a,"atyp",b);this.$=a;this.ka={};this.ha=new s_Bqa};s_ql.prototype.start=function(){this.ha.start();return this};var s_rl=function(a,b){var c=a.ha;c=Math.round(c.ka+(c.$?s_Cqa()-c.$:0));a.ka[b]=c};s_ql.prototype.log=function(){s_mi(this.$,"rt",s_xqa(this.ka)).log();return this};
var s_Dqa=function(){return""};var s_Eqa=function(a,b){b.forEach(function(b,d){a.set(d,b)});b.clear()};s_=s_Eqa.prototype;s_.aU=function(a){return"/"==a?null:"s"};s_.Zwa=function(a){return this.aU(a)};s_.bJa=function(){};s_.wya=function(){};s_.vAa=function(){return{pGa:[],pCa:[]}};var s_Fqa={},s_Gqa=(s_Fqa[""]="/async",s_Fqa.search="/search",s_Fqa.s="/s",s_Fqa),s_Hqa=function(a,b,c,d,e,f,g,k){d=void 0===d?"":d;c=s_zqa(c,void 0===e?"":e,void 0===f?"":f,void 0===g?"":g,void 0===k?"":k);e=s_Gqa[d];""==d?e+="/"+a:(c.set("asearch",a),"s"==d&&c.set("sns","1"));a=new s_Fh(s_Dqa(c)+e,s_Eqa);s_Cga(a,c,!0);a=s_Dga(a);(b=s_Aqa(b))&&(a=a+"&async="+b);return a};

s_C("sy3s");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy3u */
try{
s_D("sy3u");
s_C("sy3u");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy3v */
try{
var s_Iqa=function(a,b){return a.left<=b.left+b.width&&b.left<=a.left+a.width&&a.top<=b.top+b.height&&b.top<=a.top+a.height},s_Jqa=function(a,b,c){var d=0;return function(e){s_ha.clearTimeout(d);var f=arguments;d=s_ha.setTimeout(function(){a.apply(c,f)},b)}};s_D("sy3v");
var s_sl=function(a){s_yd.call(this);this.headers=new s_Of;this.xua=a||null;this.Jo=!1;this.rua=this.Je=null;this.Ona="";this.ON=0;this.EV="";this.tV=this.DCa=this.vna=this.kza=!1;this.Jfa=0;this.Ly=null;this.OW="";this.BIa=this.$y=!1};s_g(s_sl,s_yd);s_sl.prototype.qc=null;var s_Kqa=/^https?$/i,s_Lqa=["POST","PUT"],s_Mqa=[],s_tl=function(a,b,c,d,e,f,g){var k=new s_sl;s_Mqa.push(k);b&&k.listen("complete",b);k.Ci("ready",k.WWa);f&&k.nX(f);g&&(k.$y=g);k.send(a,c,d,e);return k};
s_sl.prototype.WWa=function(){this.dispose();s_3a(s_Mqa,this)};s_sl.prototype.nX=function(a){this.Jfa=Math.max(0,a)};s_sl.prototype.EK=function(a){this.OW=a};
s_sl.prototype.send=function(a,b,c,d){if(this.Je)throw Error("p`"+this.Ona+"`"+a);b=b?b.toUpperCase():"GET";this.Ona=a;this.EV="";this.ON=0;this.kza=!1;this.Jo=!0;this.Je=this.gya();this.rua=this.xua?this.xua.ka():s_7f.ha();this.Je.onreadystatechange=s_d(this.mRa,this);try{this.DCa=!0,this.Je.open(b,String(a),!0),this.DCa=!1}catch(f){this.Ni(5,f);return}a=c||"";var e=this.headers.clone();d&&s_nea(d,function(a,b){e.set(b,a)});d=s_Ya(e.Pf(),s_Nqa);c=s_ha.FormData&&a instanceof s_ha.FormData;!s_Za(s_Lqa,
b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.Je.setRequestHeader(b,a)},this);this.OW&&(this.Je.responseType=this.OW);"withCredentials"in this.Je&&this.Je.withCredentials!==this.$y&&(this.Je.withCredentials=this.$y);try{s_Oqa(this),0<this.Jfa&&((this.BIa=s_Pqa(this.Je))?(this.Je.timeout=this.Jfa,this.Je.ontimeout=s_d(this.Ij,this)):this.Ly=s_ag(this.Ij,this.Jfa,this)),this.vna=!0,this.Je.send(a),this.vna=!1}catch(f){this.Ni(5,f)}};
var s_Pqa=function(a){return s_Ob&&s_Zb(9)&&s_ja(a.timeout)&&s_b(a.ontimeout)},s_Nqa=function(a){return s_Mea("Content-Type",a)};s_sl.prototype.gya=function(){return this.xua?this.xua.$():s_7f()};s_sl.prototype.Ij=function(){"undefined"!=typeof s_iaa&&this.Je&&(this.EV="Timed out after "+this.Jfa+"ms, aborting",this.ON=8,this.dispatchEvent("timeout"),this.abort(8))};s_sl.prototype.Ni=function(a,b){this.Jo=!1;this.Je&&(this.tV=!0,this.Je.abort(),this.tV=!1);this.EV=b;this.ON=a;s_Qqa(this);s_Rqa(this)};
var s_Qqa=function(a){a.kza||(a.kza=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))};s_sl.prototype.abort=function(a){this.Je&&this.Jo&&(this.Jo=!1,this.tV=!0,this.Je.abort(),this.tV=!1,this.ON=a||7,this.dispatchEvent("complete"),this.dispatchEvent("abort"),s_Rqa(this))};s_sl.prototype.Ha=function(){this.Je&&(this.Jo&&(this.Jo=!1,this.tV=!0,this.Je.abort(),this.tV=!1),s_Rqa(this,!0));s_sl.Ba.Ha.call(this)};
s_sl.prototype.mRa=function(){this.isDisposed()||(this.DCa||this.vna||this.tV?s_Sqa(this):this.$2a())};s_sl.prototype.$2a=function(){s_Sqa(this)};
var s_Sqa=function(a){if(a.Jo&&"undefined"!=typeof s_iaa&&(!a.rua[1]||4!=a.zL()||2!=a.getStatus()))if(a.vna&&4==a.zL())s_ag(a.mRa,0,a);else if(a.dispatchEvent("readystatechange"),4==a.zL()){a.Jo=!1;try{s_ul(a)?(a.dispatchEvent("complete"),a.dispatchEvent("success")):(a.ON=6,a.EV=a.bBa()+" ["+a.getStatus()+"]",s_Qqa(a))}finally{s_Rqa(a)}}},s_Rqa=function(a,b){if(a.Je){s_Oqa(a);var c=a.Je,d=a.rua[0]?s_c:null;a.Je=null;a.rua=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){}}},s_Oqa=
function(a){a.Je&&a.BIa&&(a.Je.ontimeout=null);s_ja(a.Ly)&&(s_bg(a.Ly),a.Ly=null)};s_sl.prototype.dd=function(){return!!this.Je};var s_ul=function(a){var b=a.getStatus(),c;if(!(c=s_7la(b))){if(b=0===b)a=s_6la(String(a.Ona)),b=!s_Kqa.test(a);c=b}return c};s_sl.prototype.zL=function(){return this.Je?this.Je.readyState:0};s_sl.prototype.getStatus=function(){try{return 2<this.zL()?this.Je.status:-1}catch(a){return-1}};s_sl.prototype.bBa=function(){try{return 2<this.zL()?this.Je.statusText:""}catch(a){return""}};
s_sl.prototype.Hm=function(){try{return this.Je?this.Je.responseText:""}catch(a){return""}};var s_vl=function(a,b){if(a.Je)return a=a.Je.responseText,b&&0==a.indexOf(b)&&(a=a.substring(b.length)),s_gf(a)};s_sl.prototype.getResponse=function(){try{if(!this.Je)return null;if("response"in this.Je)return this.Je.response;switch(this.OW){case "":case "text":return this.Je.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in this.Je)return this.Je.mozResponseArrayBuffer}return null}catch(a){return null}};
s_sl.prototype.getResponseHeader=function(a){if(this.Je&&4==this.zL())return a=this.Je.getResponseHeader(a),null===a?void 0:a};s_sl.prototype.getAllResponseHeaders=function(){return this.Je&&4==this.zL()?this.Je.getAllResponseHeaders():""};var s_wl=function(a){return s_ia(a.EV)?a.EV:String(a.EV)};

s_C("sy3v");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy3t */
try{
var s_Tqa=function(){var a=google.pmc;return a.async?a.async.slm:!1},s_Uqa=function(a,b,c){if("POST"==a){a=new Map;(c=s_Aqa(c))&&a.set("async",b+","+c);var d=[];a.forEach(function(a,b){return d.push(b+"="+a)});return d.join("&")}},s_Vqa=function(a){var b=s_mea(a);if("undefined"==typeof b)throw Error("Bd");var c=new s_zg(null,0,void 0);a=s_Xf(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];s_oa(f)?s_jfa(c,e,f):c.add(e,f)}return c},s_Wqa=function(a){for(var b in a)return a[b]};s_D("sy3t");
var s_Xqa=function(a,b,c,d,e){var f=void 0===e?{}:e;e=void 0===f.method?"GET":f.method;var g=void 0===f.NW?"":f.NW,k=f.bq,l=f.w6a,m=f.Ah,n=f.ZHa,ba=f.headers,f=void 0===f.withCredentials?!1:f.withCredentials,t=s_Af(),w=new s_sl;w.listen("complete",function(a){a=a.target;if(s_ul(a))s_rl(d,"st"),a=a.Hm(),d.ka.bs=a.length,s_Tqa()&&d.log(),a||t.reject(Error("Yb")),t.resolve(a);else{s_rl(d,"ft");s_Tqa()&&d.log();var b=Error("vd");b.details={s:a.getStatus()};t.reject(b)}});var B=s_Cf(t.$,function(a){if(a instanceof s_Df)w.abort();else throw a;});c=s_Hqa(a,"POST"==e?new Map:b,c,g,k,l,m,n);s_rl(d,"fr");w.$y=f;w.send(c,e,s_Uqa(e,a,b),ba);return B};
var s_Yqa=function(a){var b=new s_ql("csi");s_mi(b.$,"astyp",a);return b},s_Zqa=!1,s__qa=function(a){return!a||a instanceof Map?new Map(a):new Map(Object.entries(a))},s_xl=function(a,b,c,d,e,f,g,k,l,m){l=void 0===l?{}:l;var n=s_Yqa(a);n.start();b=s__qa(b);l=s__qa(l);g&&l.set("dfsl","1");return s_0qa(a,b,l,n,c,"",f,d,m,e,k)},s_1qa=function(a,b,c,d,e,f,g,k){var l=s_Yqa(a);l.start();b=s__qa(b);d=s__qa(d);return s_0qa(a,b,d,l,"jspb",k?"s":"search",c,e,void 0,f,g)},s_0qa=function(a,b,c,d,e,f,g,k,l,m,n){b.set("_fmt",
e);null!=g&&c.set("q",g);return s_Xqa(a,b,c,d,{NW:f,bq:k,w6a:l,Ah:m,ZHa:n,headers:void 0,withCredentials:s_Zqa}).then(function(a){s_va(a,")]}'\n")&&(a=a.substr(5));try{var b=JSON.parse(a)}catch(w){return s_xf(w)}return s_ra(b)&&(b=s_Wqa(b),a=b.__err__,s_b(a))?s_xf(a):"jspb"!=e||b instanceof Array?s_B(b):s_xf(void 0)})};

s_C("sy3t");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy3w */
try{
s_D("sy3w");var s_2qa=function(a,b,c){a.has(c)&&(b.has(c)||b.set(c,String(a.get(c))),a["delete"](c))},s_3qa=function(a,b,c,d,e,f,g,k,l){d=void 0===d?"":d;e=void 0===e?"":e;f=void 0===f?"":f;g=void 0===g?"":g;k=void 0===k?!1:k;(l=void 0===l?"":l)&&c.set("q",l);k&&c.set("dfsl","1");return s_Hqa(a,b,c,"",d,e,f,g)},s_4qa=function(a,b,c,d,e,f,g,k){d=void 0===d?"":d;e=void 0===e?"":e;f=void 0===f?"":f;g=void 0===g?"":g;k=void 0===k?!1:k;s_2qa(b,c,"start");s_2qa(b,c,"q");return s_Hqa(a,b,c,k?"s":"search",d,e,f,g)};
var s_5qa=!1,s_6qa=!1,s_yl={preload:"yp",filled:"yf",inlined:"yi"},s_7qa=s_ub(s_yl),s_8qa={loading:"yl",error:"ye"},s_9qa=s_ub(s_8qa),s_$qa={preload:"asyncReset",filled:"asyncFilled",loading:"asyncLoading",error:"asyncError"},s_ara=function(){};s_g(s_ara,Error);var s_zl=function(a){this.element=a;this.type=s_y(a,"asyncType")||"";if(!this.type)throw a=new s_ara,s_pe(a),a;};s_zl.prototype.getState=function(){var a=s_ve(this.element);return s_Ya(s_Sa(a,function(a){return s_7qa[a]}),s_ad)};
s_zl.prototype.setState=function(a){s_bra(this,a);"filled"==a&&s_h(this.element.querySelectorAll("."+s_yl.inlined),function(a){s_bra(new s_zl(a),"filled")})};
var s_Al=function(a,b){s_xe(a.element,s_lb(s_8qa));if(""!=b){s_v(a.element,s_8qa[b]);var c=a.getState();s_ji(a.element,s_$qa[b],{state:c,Z7:b})}},s_bra=function(a,b){s_xe(a.element,s_lb(s_yl));s_v(a.element,s_yl[b]);s_Al(a,"");s_ji(a.element,s_$qa[b],{state:b,Z7:""})},s_cra=function(a){return(a=s_y(a.element,"asyncContextRequired"))?a.split(","):[]},s_era=function(a,b,c,d,e){this.$=c||s_Bl();s_rl(this.$,"uc");s_mi(this.$.$,"astyp",a.type);this.target=a;this.trigger=d;b=s_dra(b);c=s_cra(this.target);
c=new Set(c);for(d=this.trigger||this.target.element;d&&d.parentElement&&c.size;){var f=s_y(d,"asyncContext");if(f)for(var f=s_da(f.split(";")),g=f.next();!g.done;g=f.next()){var k=g.value,g=k.split(":");2==g.length?(k=s_Ba(g[0]),g=s_Ba(g[1]),c["delete"](k)&&!b.has(k)&&b.set(k,g)):s_qe(Error("W"),{cxt:k})}d=d.parentElement}c=this.target.element;c.id!=this.target.type&&b.set("_id",c.id);(c=s_y(this.target.element,"asyncToken"))&&b.set("_xsrf",c);b.set("_pms",s_Hf(google.xjsu,"k").match(/xjs\.(\w+)\./)[1]);
this.context=b;this.ka=s_dra(e);this.Mr="stateful"==s_y(a.element,"asyncMethod")||s_y(a.element,"asyncToken")?"POST":"GET";this.NW=s_y(a.element,"asyncRclass")||""},s_gra=function(a,b){var c={};return s_fra(a,"Async request error",b,(c.lec=b.ON,c.le=s_wl(b),c))},s_hra=function(a,b,c,d){var e={};c=(e.e=c,e);null!=d&&(c.r=d);return s_fra(a,"Async response error",b,c)},s_fra=function(a,b,c,d){b=Error(c.getStatus()?b:"Async non-request error");var e={};b.details=(e.s=c.getStatus(),e.t=a.target.type,e);
Object.assign(b.details,d);0==c.getStatus()&&s_qe(b,b.details,!0);return b},s_ira=function(a){for(var b=new Set(s_cra(a.target)),c=s_da([].concat(s_ea(a.context.keys()),s_ea(a.ka.keys()))),d=c.next();!d.done;d=c.next())b["delete"](d.value);return b.size?(b=Array.from(b).join(","),s_qe(Error("U"),{type:a.target.type,cxt:b}),!1):!0},s_jra=function(a){var b="POST"==a.Mr?new Map:a.context,c=s_Ye(a.target.element),d=google.getEI(a.target.element),e=a.trigger?s_Ye(a.trigger):void 0,f=a.trigger?google.getLEI(a.trigger):
void 0;return("search"==a.NW?s_4qa:s_3qa)(a.target.type,b,a.ka,c,d,e,f)},s_kra=function(a){if("POST"==a.Mr){var b={},c=s_Aqa(a.context);c&&(b.async=a.target.type+","+c);var d=[];s_hb(b,function(a,b){d.push(b+"="+a)});return d.join("&")}};s_era.prototype.fetch=function(){var a=this;return s_ira(this)?s_Bf(s_lra(this,this.$),function(){s_6qa&&a.$.log()}):s_xf(void 0)};
var s_lra=function(a,b){var c=s_Af(),d=s_jra(a);s_rl(b,"fr");s_tl(d,function(d){var e=d.target;if(s_ul(e)){s_rl(b,"st");var g=e.Hm();b.ka.bs=g.length;d="\n\n";s_Da(g,d)||(d="\n");d=s_Ra(g.split(d),s_ad);var k=[];d=s_Ra(s_Sa(d,function(b){try{var d=JSON.parse(b),f=d.__err__;if(s_b(f))c.reject(s_hra(a,e,f));else return s_foa(d)}catch(ba){s_Jk().getParams().get("deb")?k.push(ba):c.reject(s_hra(a,e,ba.message,g))}}),s_ad);c.resolve(d)}else s_rl(b,"ft"),c.reject(s_gra(a,e))},a.Mr,s_kra(a),void 0,void 0, s_5qa);return c.$},s_dra=function(a){return!a||a instanceof Map?new Map(a):new Map(Object.entries(a))},s_Bl=function(){return(new s_ql("async")).start()};

s_C("sy3w");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy3x */
try{
var s_mra=function(a){a=s_ve(a.element);return s_Ya(s_Sa(a,function(a){return s_9qa[a]}),s_ad)||""},s_Cl=function(a){var b=s_y(a,"asyncTrigger");if(b){if(a=s_i(b))return new s_zl(a);a=new s_ara;s_pe(a);throw a;}return new s_zl(a)},s_nra=function(){s_h(document.querySelectorAll("."+s_yl.inlined),function(a){s_bra(new s_zl(a),"filled")})},s_ora=function(a,b,c,d,e){var f=d;s_Vc(a)?(d=s_Cl(a),s_y(a,"asyncTrigger")&&(f=a)):d=a;return new s_era(d,c||{},b,f,e)};s_D("sy3x");
var s_Dl=function(a,b){var c=s_Bl(),d=s_Cl(a);return"preload"!=d.getState()||"loading"==s_mra(d)?s_B(void 0):s_pra(a,c,b)},s_El=function(a,b,c,d){var e=s_Bl();return s_pra(a,e,b,c,d)},s_pra=function(a,b,c,d,e){var f=s_ora(a,b,c,d,e);s_Al(f.target,"loading");return s_Cf(f.fetch().then(function(a){s_h(a,function(a){a.apply()});f.target.setState("filled")}),function(a){s_Al(f.target,"error");throw a;})},s_Fl=function(a,b,c,d){var e=s_Bl(),f=s_ora(a,e,b,c,d);s_Al(f.target,"loading");return s_Cf(f.fetch().then(function(a){s_h(a,
function(a){(new s_Sk(a.Pl,s_Xk.Ur())).append(a)});f.target.setState("filled")}),function(a){s_Al(f.target,"error");throw a;})},s_Gl=function(a,b,c,d){var e=s_Bl();return s_ora(a,e,b,c,d).fetch()},s_Hl=function(a){var b=s_Bl();a=s_ora(a,b);s_Kc(a.target.element);s_zj(a.target.element.id);s_Oia.yT();a.target.setState("preload")};s_sf("async",{init:function(a){a&&(s_6qa=a.slm);s_yi("async",{u:function(a){s_El(a)},uo:function(a){s_Dl(a)},r:s_Hl});s_nra()}});

s_C("sy3x");s_E();
}catch(e){_DumpException(e)}
/* _Module_:async */
try{
s_D("async");

s_C("async");s_E();
}catch(e){_DumpException(e)}
/* _Module_:em5 */
try{
s_D("em5");
s_C("em5");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy9 */
try{
s_D("sy9");var s_dg=function(a,b,c,d){s_o.call(this);s_ie(this);this.ka=new s_$f(166);this.ka.bI=s_d(this.Ea,this);this.$(this.ka);this.ha=a;this.$(this.ha);this.Wa=b;this.ma=d;this.qa=c};s_g(s_dg,s_o);s_dg.prototype.start=function(){this.ka.start();this.ha.start(this.ka);this.Mb.start(this.Wa)};
s_dg.prototype.Ea=function(){var a=this.ha,b=this.ka;a.ka=s_f();a.ha=a.ka-a.ma-b.ka;a.ma=a.ka;a=this.ha;1E3<a.ka-a.qa&&66.4>a.ha?(this.ka.stop(),this.ma.call(),s_hd(this)):66.4<=this.ha.ha&&(this.ka.stop(),this.qa.call(),s_hd(this))};var s_eg=function(a){this.O_=a};s_de(s_eg,s_dg);s_eg.prototype.start=function(a){s_Ce(a,!0)};s_ge(s_eg.prototype.start);var s_Pea=function(){this.qa=this.ha=this.ma=this.ka=0};s_g(s_Pea,s_o);s_Pea.prototype.start=function(){this.qa=this.ma=this.ka=s_f()}; var s_Qea=function(a,b,c){(new s_dg(new s_Pea,a,b,c)).start()};

s_C("sy9");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syb */
try{
s_D("syb");var s_zka=function(a,b,c){if(!b||!c&&!a)return 4;var d=window.agsa_ext;if(!s_b(d))return 1;if(c){if(!s_b(d.canLaunchApp))return 2;if(!d.canLaunchApp(b))return 3}else{if(!s_b(d.canUriBeHandledByPackage))return 2;if(!d.canUriBeHandledByPackage(a||"",b))return 3}return 0};

s_C("syb");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syy */
try{
s_D("syy");var s_Bka=function(a,b){var c=s_7f();if(s_Aka(b))c.open("GET",a,!1),c.send(),s_De(b);else{var d=s_N(function(){c&&c.abort();s_De(b)},2E3);c.onreadystatechange=function(){4==c.readyState&&(s_Bh(d),s_De(b))};c.open("GET",a,!0);c.send(null)}},s_5i=function(a,b,c,d,e,f,g){a="/gen_204?sa=X&ei="+google.getEI(a)+"&ved="+encodeURIComponent(b)+(e?"&lei="+encodeURIComponent(e):"")+(d?"&url="+encodeURIComponent(d):"")+(f?"&title="+encodeURIComponent(f):"");void 0!=g&&(a=a+"&ct=clpit&cad="+encodeURIComponent(f+ ":"+(g?"1":"0")));s_Bka(a,c)},s_Aka=function(a){return s_Hb()&&s_Jf()&&!s_Kb("2.4")&&0!=a.indexOf("tel:")};s_ta("google.bct",s_Bka);s_ta("google.vbct",s_5i);

s_C("syy");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy4l */
try{
var s_Yta=function(a){return s_Ec().matchMedia("(min-resolution: "+a+"dppx),(min--moz-device-pixel-ratio: "+a+"),(min-resolution: "+96*a+"dpi)").matches?a:0},s_Zta=function(a){a=a.style;a.position="relative";s_Ob&&!s_Zb("8")?(a.zoom="1",a.display="inline"):a.display="inline-block"},s_4m=function(){var a=s_Ec();return s_b(a.devicePixelRatio)?a.devicePixelRatio:a.matchMedia?s_Yta(3)||s_Yta(2)||s_Yta(1.5)||s_Yta(1)||.75:1};s_D("sy4l");
var s__ta,s_0ta,s_5m=function(){var a=s_Gj(0,!0),b=s_Gj(1,!0);return a<b},s_1ta=function(){this.$=!!(window.orientation%180)},s_2ta=function(){var a=s_ei("client"),b=s_ei("source");return!(!/^mobilesearchapp/.test(a)&&!/^mobilesearchapp/.test(b))},s_6m=[],s_3ta=!1,s_7m=function(a){if(window.addEventListener){for(var b=0;b<s_6m.length;b++)if(s_6m[b]==a)return;s_6m.push(a);s_3ta||(s__ta=window.orientation,s_0ta=window.innerWidth,"orientation"in window&&!s_2ta()&&window.addEventListener("orientationchange",
s_4ta,!1),window.addEventListener("resize",s_2ta()?s_5ta:s_4ta,!1),s_3ta=!0)}},s_8m=function(a){for(var b=0;b<s_6m.length;b++)if(s_6m[b]==a){s_6m.splice(b,1);break}},s_4ta=function(){if(!("orientation"in window&&!s_2ta()&&window.orientation==s__ta||window.innerWidth==s_0ta)){var a=new s_1ta;s__ta=window.orientation;s_0ta=window.innerWidth;for(var b=0;b<s_6m.length;b++)s_vf(s_e(s_6m[b],a))}},s_5ta=function(){window.setTimeout(s_4ta,10)};

s_C("sy4l");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy7t */
try{
s_D("sy7t");
s_C("sy7t");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sybv */
try{
s_D("sybv");var s_SC,s_qeb=0,s_TC=function(a,b,c){this.ka=a;this.Qc=b;this.ma=c};s_TC.prototype.$=!1;s_TC.prototype.ha=0;s_TC.prototype.get=function(){if((!this.$||this.ha<s_qeb)&&s_SC&&this.ka+"-config"in s_SC){var a=s_SC[this.ka+"-config"][this.Qc],b=s_qeb;this.Jc=void 0!==a?a:this.ma;this.$=!0;this.ha=b}if(!this.$)throw Error("Qb");return this.Jc};

s_C("sybv");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sybx */
try{
s_D("sybx");var s_UC=function(a){s_H(this,a,0,-1,null,null)};s_g(s_UC,s_G);
s_C("sybx");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syby */
try{
s_D("syby");var s_reb=function(a){this.$=a};
s_C("syby");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sybz */
try{
s_D("sybz");var s_VC=function(a,b,c){this.ha=a;this.ka=b;this.ma=c||1;this.$={}},s_seb=function(a){return new s_VC(a,function(a){navigator.sendBeacon&&navigator.sendBeacon(google.logUrl("",a),"")||google.log("",a)})},s_teb=function(){return new s_VC("",s_c)};s_VC.prototype.flush=function(){var a="udla="+this.ma+"&ei="+this.ha,b;for(b in this.$)a+="&"+b+"="+this.$[b];this.ka(a);this.$={}};var s_ueb=function(a,b){a.$.res=b?"m":"a"};

var s_WC=function(){};s_g(s_WC,s_ce);s_WC.prototype.$=s_fe();
s_C("sybz");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syc3 */
try{
var s_XC=function(){try{var a=window.localStorage}catch(b){return null}if(!a)return null;a=new s_veb(a);if(!a.set("dummy",0))return null;a.remove("dummy");return a};s_D("syc3");var s_veb=function(a){this.$=a};s_veb.prototype.get=function(a){if(!s_ha.navigator.cookieEnabled)return null;a=this.$.getItem("udla::"+a);if(!a)return null;try{return JSON.parse(a)}catch(b){return null}};s_veb.prototype.remove=function(a){s_ha.navigator.cookieEnabled&&this.$.removeItem("udla::"+a)};s_veb.prototype.set=function(a,b){if(!s_ha.navigator.cookieEnabled)return!1;try{return this.$.setItem("udla::"+a,JSON.stringify(b)),!0}catch(c){return!1}};

s_C("syc3");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syc0 */
try{
s_D("syc0");
s_C("syc0");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syc1 */
try{
s_D("syc1");var s_web=function(a,b,c){this.KEa=a;this.Nh=b.name||null;this.$={};for(a=0;a<c.length;a++)b=c[a],this.$[b.ka]=b};s_web.prototype.getName=function(){return this.Nh};var s_xeb=function(a){a=s_lb(a.$);s_ab(a,function(a,c){return a.ka-c.ka});return a};var s_yeb=function(a,b,c){this.ka=b;this.Nh=c.name;this.Wa=!!c.Lr;this.Ea=!!c.required;this.$=c.mj;this.ha=c.type;this.qa=!1;switch(this.$){case 3:case 4:case 6:case 16:case 18:case 2:case 1:this.qa=!0}this.ma=c.defaultValue};s_yeb.prototype.getName=function(){return this.Nh};var s_zeb=function(a){return 11==a.$||10==a.$};s_yeb.prototype.Zj=function(){return this.Wa};s_yeb.prototype.aAa=function(){return this.Ea};
var s_YC=function(){this.ka={};this.ha=this.getDescriptor().$;this.$=this.ma=null};s_=s_YC.prototype;s_.has=function(a){return s_ZC(this,a.ka)};s_.get=function(a,b){return s__C(this,a.ka,b)};s_.set=function(a,b){s_0C(this,a.ka,b)};s_.add=function(a,b){s_Aeb(this,a.ka,b)};s_.clear=function(a){s_Beb(this,a.ka)};
s_.equals=function(a){if(!a||this.constructor!=a.constructor)return!1;for(var b=s_xeb(this.getDescriptor()),c=0;c<b.length;c++){var d=b[c],e=d.ka;if(s_ZC(this,e)!=s_ZC(a,e))return!1;if(s_ZC(this,e)){var f=s_zeb(d),g=s_1C(this,e),e=s_1C(a,e);if(d.Zj()){if(g.length!=e.length)return!1;for(d=0;d<g.length;d++){var k=g[d],l=e[d];if(f?!k.equals(l):k!=l)return!1}}else if(f?!g.equals(e):g!=e)return!1}}return!0};
var s_Ceb=function(a,b){for(var c=s_xeb(a.getDescriptor()),d=0;d<c.length;d++){var e=c[d],f=e.ka;if(s_ZC(b,f)){a.$&&delete a.$[e.ka];var g=s_zeb(e);if(e.Zj())for(var e=s_2C(b,f),k=0;k<e.length;k++)s_Aeb(a,f,g?e[k].clone():e[k]);else e=s_1C(b,f),g?(g=s_1C(a,f))?s_Ceb(g,e):s_0C(a,f,e.clone()):s_0C(a,f,e)}}};s_YC.prototype.clone=function(){var a=new this.constructor;a!=this&&(a.ka={},a.$&&(a.$={}),s_Ceb(a,this));return a};
var s_ZC=function(a,b){return null!=a.ka[b]},s_1C=function(a,b){var c=a.ka[b];return null==c?null:a.ma?b in a.$?a.$[b]:(c=a.ma.$T(a.ha[b],c),a.$[b]=c):c},s__C=function(a,b,c){var d=s_1C(a,b);return a.ha[b].Zj()?d[c||0]:d},s_2C=function(a,b){return s_1C(a,b)||[]},s_0C=function(a,b,c){a.ka[b]=c;a.$&&(a.$[b]=c)},s_Aeb=function(a,b,c){a.ka[b]||(a.ka[b]=[]);a.ka[b].push(c);a.$&&delete a.$[b]},s_Beb=function(a,b){delete a.ka[b];a.$&&delete a.$[b]},s_3C=function(a,b){var c=[],d=b[0],e;for(e in b)0!=e&&c.push(new s_yeb(0, e,b[e]));return new s_web(a,d,c)};

s_C("syc1");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syc2 */
try{
var s_4C=function(a,b,c){a.$.e=b;c&&(a.$.d=c);a.flush()};s_D("syc2");var s_Eeb=function(a,b,c){this.ha=a;this.ma=b;this.qc=new s_VC(c.ha,c.ka,3);this.Ca=this.Ea=0;this.ka=!1;this.qa=this.$=0;this.Wa=!1;this.Ga=null!=s_I(this.ha.$,26)?Number(this.ma.get("ncp")):0;this.Da=s_Deb(this,this.RWa.bind(this),!0)};s_=s_Eeb.prototype;s_.Vaa=function(a){this.Da.then(function(){a(this.$)}.bind(this))};s_.S1=function(a){null!=s_I(this.ha.$,26)&&this.ma.set("ncp",this.Ga+1);this.Da.then(this.YXa.bind(this)).then(a)};
s_.Ofa=function(a){0!=this.$&&this.ka&&(null!=s_I(this.ha.$,26)&&this.ma.remove("ncp"),a=a||s_f()-this.Ea,s_4C(this.qc,1==this.$?6:8,a),this.$=2,this.ka=!1)};s_.Lfa=function(a,b){0!=this.$&&this.ka&&(this.ka=!1,b=b||s_f()-this.Ea,1!=a.code||500>b?this.ma.remove("ncp"):null!=s_I(this.ha.$,26)&&(this.qa=1),this.Da=s_Deb(this,this.d0a.bind(this,a,b)))};s_.mN=function(){return 1==this.qa&&!this.ka};
s_.d0a=function(a,b,c){c=c.state||c.status;"prompt"==c?500>b?(this.qa=3,a=10):a=5:a="granted"==c?this.Wa&&1==a.code?5:1==a.code?11:1==this.$?6:8:3==this.$?9:7;s_4C(this.qc,a,b);a:{switch(a){case 6:case 8:b=2;break a;case 5:case 7:case 10:case 11:case 9:b=3;break a}b=null}b&&(this.$=b);this.Wa=!1};
s_.RWa=function(a){var b=a.state||a.status;null!=s_I(this.ha.$,26)&&"granted"==b&&this.Ga>=s_I(this.ha.$,26)&&(b="denied");var c=s_f()-this.Ca;switch(b){case "granted":this.$=2;this.qc.$.pd=c;s_4C(this.qc,2,void 0);break;case "denied":this.$=3;this.qc.$.pd=c;s_4C(this.qc,3,void 0);break;case "prompt":this.$=1,this.qc.$.pd=c,s_4C(this.qc,1,void 0)}a.addEventListener("change",s_Feb(this,a))};s_.YXa=function(){this.qa=this.$;this.ka=!0;this.Ea=s_f()};
var s_Feb=function(a,b){return function(){var a=b.state||b.status;"granted"==a&&this.ka&&(this.Wa=!0);if(!this.ka)switch(a){case "denied":this.$=3;break;case "granted":this.$=2;break;case "prompt":this.$=1}}.bind(a)},s_Deb=function(a,b,c){if(!navigator.permissions)return c&&s_4C(a.qc,14,void 0),Promise.resolve(0);c&&(s_4C(a.qc,12,void 0),a.Ca=s_f());return navigator.permissions.query({name:"geolocation"}).then(b,function(){if(c){var a=s_f()-this.Ca;this.qc.$.pd=a;s_4C(this.qc,13,void 0)}return 0}.bind(a))};

s_C("syc2");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sybw */
try{
s_D("sybw");var s_Geb=new s_TC("devloc","geo_eha",!1);var s_5C=!1,s_Heb=!1,s_6C=new s_UC;
s_C("sybw");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syc4 */
try{
s_D("syc4");var s_Ieb={afb:0,q8a:1,s8a:2,Bcb:3,gfb:4,d$a:5,Z9a:6,VIEWPORT:7,m9a:8,Afb:-1},s_Jeb={$eb:0,Eab:1,tcb:2,L$a:3,O$a:42,t9a:4,Xcb:5,ieb:6,Fcb:41,Acb:44,w8a:12,mab:11,Y7a:17,R$a:51,f8a:54,Ndb:7,Dab:8,rdb:13,Xab:14,P9a:34,Yab:15,gcb:16,sfb:18,rfb:20,Iab:21,zcb:22,H7a:23,Uab:24,Dcb:25,Ecb:59,p9a:26,x$a:27,X9:28,Ydb:29,eab:30,pab:31,dab:35,L9a:64,c8a:33,Jdb:36,$bb:37,I7a:38,J7a:39,t8a:32,kfb:40,o9a:43,leb:45,Leb:46,aeb:47,$db:48,u$a:49,v$a:50,teb:52,Hab:55,zfb:-1,vab:9,fab:10,hab:19,N$a:53,z8a:56,odb:57,
beb:58,v9a:60,R7a:61,q9a:62,K9a:63,n8a:65},s_Keb={cfb:0,zeb:1,Vab:2,gab:3,Jab:4,kab:5,M9a:6,Dfb:7,Efb:8,J8a:101,H8a:102,I8a:103},s_Leb={Bdb:0,zdb:1,ydb:2,Adb:3,sdb:4,Cdb:5,vdb:6},s_7C=function(){s_YC.call(this)};s_g(s_7C,s_YC);var s_Meb=null,s_8C=function(){s_YC.call(this)};s_g(s_8C,s_YC);var s_Neb=null,s_9C=function(){s_YC.call(this)};s_g(s_9C,s_YC);var s_Oeb=null,s_$C=function(){s_YC.call(this)};s_g(s_$C,s_YC);var s_Peb=null,s_aD=function(){s_YC.call(this)};s_g(s_aD,s_YC);var s_Qeb=null;
s_aD.prototype.getType=function(){return s__C(this,1)};var s_Reb={K$a:0,Kbb:1,Pbb:2,meb:3,UNKNOWN:4,xeb:5,N8a:6,WALKING:7,RUNNING:8,Cbb:9,Keb:10,c9a:11,Qbb:12,Nbb:13,J$a:14,Wdb:15,R8a:-1E3},s_bD=function(){s_YC.call(this)};s_g(s_bD,s_YC);var s_Seb=null,s_Teb={F7a:0,E7a:1,B7a:2,C7a:3,D7a:4},s_cD=function(){s_YC.call(this)};s_g(s_cD,s_YC);var s_Ueb=null;s_cD.prototype.Gd=function(){return s__C(this,1)};s_cD.prototype.zs=function(a){s_0C(this,5,a)};
var s_Veb={Web:0,Fab:1,Qab:2,X9a:3},s_Web={UNKNOWN:0,T9a:1,s$a:2,M7a:3},s_dD=function(){s_YC.call(this)};s_g(s_dD,s_YC);var s_Xeb=null,s_Yeb={mbb:0,wcb:1E3},s_eD=function(){s_YC.call(this)};s_g(s_eD,s_YC);var s_Zeb=null,s_fD=function(){s_YC.call(this)};s_g(s_fD,s_YC);var s__eb=null,s_gD=function(){s_YC.call(this)};s_g(s_gD,s_YC);var s_0eb=null;s_gD.prototype.getType=function(){return s__C(this,1)};var s_1eb={UNKNOWN:0,I9a:1,Gab:2,Z7a:3,pfb:4},s_hD=function(){s_YC.call(this)};s_g(s_hD,s_YC);
var s_2eb=null,s_iD=function(){s_YC.call(this)};s_g(s_iD,s_YC);var s_3eb=null;s_=s_iD.prototype;s_.clearRect=function(){s_Beb(this,14)};s_.Gd=function(){return s__C(this,10)};s_.Nc=function(){return s__C(this,16)};s_.Bg=function(){return s_ZC(this,16)};s_.XK=function(){return s__C(this,19)};s_7C.prototype.getDescriptor=function(){var a=s_Meb;a||(s_Meb=a=s_3C(s_7C,{0:{name:"LatLng",hh:"location.unified.LatLng"},1:{name:"latitude_e7",mj:15,type:Number},2:{name:"longitude_e7",mj:15,type:Number}}));return a};
s_7C.getDescriptor=s_7C.prototype.getDescriptor;s_8C.prototype.getDescriptor=function(){var a=s_Neb;a||(s_Neb=a=s_3C(s_8C,{0:{name:"LatLngRect",hh:"location.unified.LatLngRect"},1:{name:"lo",mj:11,type:s_7C},2:{name:"hi",mj:11,type:s_7C}}));return a};s_8C.getDescriptor=s_8C.prototype.getDescriptor;
s_9C.prototype.getDescriptor=function(){var a=s_Oeb;a||(s_Oeb=a=s_3C(s_9C,{0:{name:"FieldOfView",hh:"location.unified.FieldOfView"},1:{name:"field_of_view_x_degrees",mj:2,type:Number},2:{name:"field_of_view_y_degrees",mj:2,type:Number},3:{name:"screen_width_pixels",mj:5,type:Number}}));return a};s_9C.getDescriptor=s_9C.prototype.getDescriptor;
s_$C.prototype.getDescriptor=function(){var a=s_Peb;a||(s_Peb=a=s_3C(s_$C,{0:{name:"FeatureIdProto",hh:"location.unified.FeatureIdProto"},1:{name:"cell_id",mj:6,type:String},2:{name:"fprint",mj:6,type:String}}));return a};s_$C.getDescriptor=s_$C.prototype.getDescriptor;s_aD.prototype.getDescriptor=function(){var a=s_Qeb;a||(s_Qeb=a=s_3C(s_aD,{0:{name:"ActivityRecord",hh:"location.unified.ActivityRecord"},1:{name:"type",mj:14,defaultValue:0,type:s_Reb},2:{name:"confidence",mj:5,type:Number}}));return a};
s_aD.getDescriptor=s_aD.prototype.getDescriptor;
s_bD.prototype.getDescriptor=function(){var a=s_Seb;a||(s_Seb=a=s_3C(s_bD,{0:{name:"LocationAttributesProto",hh:"location.unified.LocationAttributesProto"},1:{name:"detected_activity",mj:14,defaultValue:0,type:s_Teb},2:{name:"heading_degrees",mj:5,type:Number},3:{name:"bearing_degrees",mj:5,type:Number},4:{name:"speed_kph",mj:5,type:Number},5:{name:"tilt_degrees",mj:5,type:Number},6:{name:"roll_degrees",mj:5,type:Number},7:{name:"altitude_meters_from_ground",mj:1,type:Number},8:{name:"field_of_view",
mj:11,type:s_9C},9:{name:"boarded_transit_vehicle_token",mj:9,type:String},10:{name:"device_location_ratio",mj:2,type:Number},11:{name:"activity_record",Lr:!0,mj:11,type:s_aD}}));return a};s_bD.getDescriptor=s_bD.prototype.getDescriptor;
s_cD.prototype.getDescriptor=function(){var a=s_Ueb;a||(s_Ueb=a=s_3C(s_cD,{0:{name:"SemanticPlace",hh:"location.unified.SemanticPlace"},1:{name:"feature_id",mj:11,type:s_$C},2:{name:"gconcept_instance",Lr:!0,mj:11,type:s_dD},3:{name:"score",mj:2,type:Number},4:{name:"confidence",mj:14,defaultValue:0,type:s_Veb},5:{name:"source",mj:14,defaultValue:0,type:s_Web}}));return a};s_cD.getDescriptor=s_cD.prototype.getDescriptor;
s_dD.prototype.getDescriptor=function(){var a=s_Xeb;a||(s_Xeb=a=s_3C(s_dD,{0:{name:"GConceptInstanceProto",BKa:s_cD,hh:"location.unified.SemanticPlace.GConceptInstanceProto"},1:{name:"gconcept_id",mj:9,type:String},2:{name:"prominence",mj:14,defaultValue:0,type:s_Yeb}}));return a};s_dD.getDescriptor=s_dD.prototype.getDescriptor;
s_eD.prototype.getDescriptor=function(){var a=s_Zeb;a||(s_Zeb=a=s_3C(s_eD,{0:{name:"VisibleNetwork",hh:"location.unified.VisibleNetwork"},1:{name:"wifi",mj:11,type:s_fD},2:{name:"cell",mj:11,type:s_gD},3:{name:"connected",mj:8,type:Boolean},4:{name:"timestamp_ms",mj:3,type:String}}));return a};s_eD.getDescriptor=s_eD.prototype.getDescriptor;
s_fD.prototype.getDescriptor=function(){var a=s__eb;a||(s__eb=a=s_3C(s_fD,{0:{name:"WiFi",BKa:s_eD,hh:"location.unified.VisibleNetwork.WiFi"},1:{name:"bssid",mj:9,type:String},2:{name:"level_dbm",mj:5,type:Number}}));return a};s_fD.getDescriptor=s_fD.prototype.getDescriptor;
s_gD.prototype.getDescriptor=function(){var a=s_0eb;a||(s_0eb=a=s_3C(s_gD,{0:{name:"Cell",BKa:s_eD,hh:"location.unified.VisibleNetwork.Cell"},1:{name:"type",mj:14,defaultValue:0,type:s_1eb},2:{name:"cell_id",mj:5,type:Number},3:{name:"location_area_code",mj:5,type:Number},4:{name:"mobile_country_code",mj:5,type:Number},5:{name:"mobile_network_code",mj:5,type:Number},6:{name:"primary_scrambling_code",mj:5,type:Number},7:{name:"physical_cell_id",mj:5,type:Number},8:{name:"tracking_area_code",mj:5,type:Number}}));
return a};s_gD.getDescriptor=s_gD.prototype.getDescriptor;s_hD.prototype.getDescriptor=function(){var a=s_2eb;a||(s_2eb=a=s_3C(s_hD,{0:{name:"PresenceInterval",hh:"location.unified.PresenceInterval"},1:{name:"start_offset_sec",mj:4,type:String},2:{name:"duration_sec",mj:4,type:String},3:{name:"confidence",mj:13,type:Number}}));return a};s_hD.getDescriptor=s_hD.prototype.getDescriptor;
s_iD.prototype.getDescriptor=function(){var a=s_3eb;a||(s_3eb=a=s_3C(s_iD,{0:{name:"LocationDescriptor",hh:"location.unified.LocationDescriptor"},1:{name:"role",mj:14,defaultValue:0,type:s_Ieb},2:{name:"producer",mj:14,defaultValue:0,type:s_Jeb},3:{name:"timestamp",mj:3,type:String},4:{name:"loc",mj:9,type:String},5:{name:"latlng",mj:11,type:s_7C},6:{name:"latlng_span",mj:11,type:s_7C},14:{name:"rect",mj:11,type:s_8C},7:{name:"radius",mj:2,type:Number},8:{name:"confidence",mj:5,defaultValue:100,type:Number},
10:{name:"feature_id",mj:11,type:s_$C},16:{name:"mid",mj:4,type:String},17:{name:"level_feature_id",mj:11,type:s_$C},18:{name:"level_number",mj:2,type:Number},11:{name:"language",mj:9,type:String},9:{name:"provenance",mj:14,defaultValue:0,type:s_Keb},12:{name:"historical_role",mj:14,defaultValue:0,type:s_Ieb},13:{name:"historical_producer",mj:14,defaultValue:0,type:s_Jeb},15:{name:"historical_prominence",mj:5,type:Number},19:{name:"attributes",mj:11,type:s_bD},20:{name:"diagnostic_info",mj:9,type:String},
21:{name:"semantic",Lr:!0,mj:14,defaultValue:0,type:s_Leb},22:{name:"semantic_place",Lr:!0,mj:11,type:s_cD},23:{name:"visible_network",Lr:!0,mj:11,type:s_eD},24:{name:"presence_interval",Lr:!0,mj:11,type:s_hD}}));return a};s_iD.getDescriptor=s_iD.prototype.getDescriptor;

s_C("syc4");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syc5 */
try{
var s_4eb=function(a,b,c,d,e,f){this.lat=a||null;this.Rg=b||null;this.Wi=c||null;this.ha=!!d;this.ka=e||null;this.$=f||null};s_4eb.prototype.toString=function(){return"{lat:"+this.lat+", lon:"+this.Rg+", acc:"+this.Wi+", isCached:"+this.ha+", ts:"+this.ka+", addr:"+this.$+"}"};s_D("syc5");
var s_5eb=new s_TC("devloc","cookie_secure",!0),s_6eb=new s_TC("devloc","cookie_timeout",86400),s_7eb=function(a){if(a&&a.lat&&a.Rg&&a.Wi){var b=new s_7C;s_0C(b,1,Math.round(1E7*Number(a.lat)));s_0C(b,2,Math.round(1E7*Number(a.Rg)));var c=String(1E3*Number(a.ka));a=620*Number(a.Wi);var d=["role:"];d.push(1);d.push("\nproducer:");d.push(12);d.push("\nprovenance:");d.push(6);d.push("\ntimestamp:");d.push(c);d.push("\nlatlng{\nlatitude_e7:");d.push(s__C(b,1));d.push("\nlongitude_e7:");d.push(s__C(b, 2));d.push("\n}\nradius:");d.push(a);b=d.join("");b=s_Me(b).replace("+","-").replace("/","_");s_nh.set("UULE","a+"+b,s_6eb.get(),"/","",s_5eb.get())}};

s_C("syc5");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syc7 */
try{
s_D("syc7");var s_8eb=function(a,b){this.Ea=a;this.$=b;this.ka=Number(this.$.get("ltp"));this.ha=Number(this.$.get("sr"));this.ma=!!this.$.get("iks");this.qa=Number(this.$.get("lnrar"))},s_9eb=function(a){a.$.set("iks",0);a.$.set("sr",0);a.ha=0},s_$eb=function(a){a.ka||(a.ka=s_f(),a.$.set("ltp",a.ka));a.ka&&864E5<s_f()-a.ka&&(a.ha=0,a.$.set("sr",a.ha),a.ma=!0,a.$.set("iks",Number(a.ma)));return a.ma?-1>a.ha?3:1<a.ha?2:a.qa>s_f()-Number(s_J(a.Ea.$,20,"0"))?5:1:0},s_afb=function(a,b,c,d){(b||c)&&a.$.set("lnrar",
a.qa);switch(d){case 0:a.ka=s_f();a.$.set("ltp",a.ka);break;case 1:case 5:b?a.ha++:a.ha--,a.$.set("sr",a.ha),a.ka=s_f(),a.$.set("ltp",a.ka)}},s_bfb=function(a,b,c){this.qa=a;this.qc=c;this.$=b?new s_8eb(a,b):null;this.ma=this.ka=0;this.ha=!1};s_=s_bfb.prototype;s_.Ofa=function(){var a=s_f()-this.ma,b=this.ka;3==this.ka&&(b=0,this.$&&s_9eb(this.$));s_cfb(this,a,b);var c=this.mN();this.$&&s_afb(this.$,!0,c,b);this.qc.$.succ="1";s_ueb(this.qc,c);this.qc.$.ps=this.ka;this.qc.$.d=a};
s_.Lfa=function(a){var b=s_f()-this.ma,c=!0;1==a.code&&(c=!1);var d=this.ka;if(2==this.ka&&!c||3==this.ka&&c)d=0,this.$&&s_9eb(this.$);s_cfb(this,b,d);var e=this.mN();this.$&&s_afb(this.$,c,e,d);this.qc.$.err=a.code;s_ueb(this.qc,e);this.qc.$.ps=this.ka;this.qc.$.d=b};s_.mN=function(){return this.ha};s_.Vaa=function(a){a(this.$?s_$eb(this.$):0)};s_.S1=function(a){this.ka=this.$?s_$eb(this.$):0;this.ma=s_f();this.$&&this.$.$.set("lnrar",s_f());a()}; var s_cfb=function(a,b,c){s_I(a.qa.$,3)&&0!=c&&5!=c?1==c&&(a.ha=!0):500<b&&(a.ha=!0)};

s_C("syc7");s_E();
}catch(e){_DumpException(e)}
/* _Module_:syc6 */
try{
var s_dfb=null,s_efb=function(a){this.ma=a||navigator.geolocation;this.$=this.ka=this.ha=null},s_hfb=function(){var a=s_dfb,b=s_ffb,c=s_gfb;a.$=null;a.ha=b;a.ka=c;b=s_d(a.qa,a);c={enableHighAccuracy:s_Geb.get(),timeout:3E4,maximumAge:15E3};a.ma.getCurrentPosition(b,b,c)};
s_efb.prototype.qa=function(a){if(!a||"code"in a)this.$||this.ka(a);else{if(!this.$||this.$.coords.accuracy>a.coords.accuracy){this.$=a;var b=!1}else b=!0;b||(b=a.coords,this.ha(new s_4eb(b.latitude,b.longitude,a.coords.accuracy,!1,+a.timestamp)))}};
var s_ifb=function(){if(!s_dfb){if("geolocation"in navigator)var a=navigator.geolocation;s_dfb=new s_efb(a)}},s_jD=null,s_kD=null,s_gfb=function(a){s_Heb=!0;s_jD&&s_jD.Lfa(a);s_kD.error.call(s_kD,a)},s_ffb=function(a){s_Heb=!0;s_jD&&s_jD.Ofa();s_kD.success.call(s_kD,a)},s_jfb=function(){if(!s_5C){s_f();s_ifb();s_5C=!0;var a=function(){s_hfb();s_N(function(){s_ifb();s_5C=!1},6E4)},b=s_XC();s_J(s_6C,23,!1)&&b?(s_jD=new s_Eeb(new s_reb(s_6C),b,s_seb(google.kEI)),s_jD.S1(a)):(s_jD=null,a())}};s_D("syc6");
var s_kfb=function(){};s_kfb.prototype.success=function(){};s_kfb.prototype.error=function(){};var s_lfb={code:0},s_mfb=function(a,b){this.Zd=a;this.$=b};s_mfb.prototype.success=function(a){this.$.Ofa();this.Zd.success(a)};s_mfb.prototype.error=function(a){this.$.Lfa(a||s_lfb);this.Zd.error(a)};var s_nfb=new s_TC("devloc","msg_err","Location unavailable"),s_ofb=new s_TC("devloc","uul_text",""),s_pfb=new s_TC("devloc","msg_gps","Using GPS"),s_qfb=new s_TC("devloc","msg_dsc",""),s_rfb=new s_TC("devloc","msg_dvl",""),s_sfb=new s_TC("devloc","msg_upd","update"),s_tfb=new s_TC("devloc","msg_use","update"),s_ufb=new s_TC("devloc","msg_unk","Unknown"),s_vfb=new s_TC("devloc","mnr_crd","0"),s_wfb=new s_TC("devloc","dl_tld_mismatch",!1),s_xfb=new s_TC("devloc","estd",!1);
var s_yfb=new s_TC("devloc","rgc_md",2E3),s_zfb=new s_TC("devloc","rgc_me",10),s_Afb=new s_TC("devloc","rgc_to",12096E5),s_Bfb=new s_TC("devloc","rgc_url","/uul?uulo=4");var s_Cfb=function(a,b){this.ka=a;this.$=b||null};s_g(s_Cfb,s_kfb);s_Cfb.prototype.success=function(a){s_7eb(a);this.ka(a)};s_Cfb.prototype.error=function(a){this.$&&this.$(a)};var s_Dfb=new s_TC("devloc","driver_ui_type",0),s_Efb=new s_TC("devloc","jsc"),s_Ffb=function(a,b){var c;s_ifb();s_5C=!1;a=new s_Cfb(a,b);if(b=!c)b=1==s_I(s_6C,10);b&&(b=s_XC())&&(c=new s_bfb(new s_reb(s_6C),b,s_teb()));c&&(a=new s_mfb(a,c),c.S1(s_c));s_kD=a;s_jfb()};

s_C("syc6");s_E();
}catch(e){_DumpException(e)}
/* _Module_:dvl */
try{
var s_GYc=!1,s_HYc={},s_uY=[],s_IYc=function(){return s_5k("local","devloc")},s_JYc=function(){var a=s_IYc();if(a){var b=s_uY.length;a.set("web.rgc."+google.kHL+".count",b);try{for(var c=0;c<b;c++){var d="web.rgc."+google.kHL+"."+c+".";var e=s_uY[c];a.set(d+"lat",e.lat);a.set(d+"lon",e.Rg);a.set(d+"acc",e.Wi);a.set(d+"rgc",e.Yu);a.set(d+"last",e.Cy)}}catch(f){}}},s_KYc=function(){if(!s_GYc){var a=s_IYc();if(a){var b=Number(a.get("web.rgc."+google.kHL+".count"))||0;try{for(var c=0;c<b;c++){var d="web.rgc."+
google.kHL+"."+c+".";var e={};e.lat=a.get(d+"lat");e.Rg=a.get(d+"lon");e.Wi=a.get(d+"acc");e.Yu=a.get(d+"rgc");e.Cy=a.get(d+"last");s_uY.push(e);s_HYc[e.Yu]=1}}catch(f){}s_GYc=!0}}},s_LYc=function(a,b,c){this.address=a;this.$=b;this.timestamp=s_b(c)?c:s_f()},s_MYc=function(a,b){s_Ah(function(){if(b){s_KYc();s_uY.unshift({lat:a.lat,Rg:a.Rg,Wi:a.Wi,Yu:b,Cy:s_f()});s_HYc[b]=1;if(s_uY.length>s_zfb.get()){for(var c=s_f()-s_Afb.get(),d,e=0,f,g=s_uY.length-1;0<=g;g--)if(f=s_uY[g],f.Cy<c)d=g,e++;else{0==
e&&(d=g,e++);break}if(c=s_IYc())try{for(g=d;g<d+e;g++)delete s_HYc[s_uY[g].Yu],f="rgc:"+g+":",c.remove(f+"lat"),c.remove(f+"lon"),c.remove(f+"acc"),c.remove(f+"rgc"),c.remove(f+"last");s_uY.splice(d,e)}catch(k){}}s_JYc()}})},s_NYc=function(){var a=s_IYc();if(!a)return null;var b=a.get("swml.location"),c=a.get("swml.location.isdev"),a=a.get("swml.location.ts");return null==b||null==c||null==a?null:new s_LYc(String(b),!!Number(c),Number(a))},s_OYc=function(a){var b=s_Fc("span");s_x(b,"known_loc",a);
s_x(b,"unknown_loc",!a);return b},s_PYc=function(a){this.Je=a||s_7f()};s_PYc.prototype.get=function(a,b,c){if(!c&&(c=s_QYc(a))){b(c);return}c=s_Bfb.get();google.kHL&&(c=c+"&hl="+google.kHL);this.Je.open("GET",c,!0);this.Je.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var c=this.responseText;s_ya(s_Ha(c))||(s_MYc(a,c),b(c))}};this.Je.send("")};
var s_QYc=function(a){if(!a||!a.lat||!a.Rg)return null;s_KYc();for(var b=s_yfb.get(),c=null,d,e,f,g=0;g<s_uY.length;g++){f=s_uY[g];if(s_ra(a)&&s_ra(f)){var k=a.lat;var l=a.Rg;var m=f.lat;e=f.Rg}else k=a,l=f,e=m=void 0;k=k*Math.PI/180;m=m*Math.PI/180;e=12734E3*Math.asin(Math.min(1,Math.sqrt(Math.pow(Math.sin((m-k)/2),2)+Math.cos(k)*Math.cos(m)*Math.pow(Math.sin((e*Math.PI/180-l*Math.PI/180)/2),2))));e<b&&(b=e,c=f,d=g)}c&&(c.Cy=s_f(),s_uY.splice(d,1),s_uY.unshift(c),s_N(s_JYc,100));return c&&c.Yu||
null},s_RYc=function(a){a=new s_LYc(a||"",!0);var b=s_IYc();if(b&&a)try{b.set("swml.location",a.address),b.set("swml.location.isdev",a.$?"1":"0"),b.set("swml.location.ts",String(a.timestamp))}catch(c){}},s_vY=function(){this.$=""};s_g(s_vY,s_kfb);s_vY.prototype.error=function(a){s_vY.Ba.error.call(this,a);this.$=""};s_vY.prototype.success=function(a){s_vY.Ba.success.call(this,a);a&&a.lat&&a.Rg&&(this.$=null!=s_rfb?s_rfb.get():"")};
s_vY.prototype.H9=function(){var a=this;if(s_xfb.get()){var b=s_XC();b&&(b=new s_bfb(new s_reb(s_6C),b,s_teb()),a=new s_mfb(a,b),b.S1(s_c))}s_kD=a;s_jfb()};s_vY.prototype.rP=function(){this.H9()};
var s_SYc=function(a,b,c,d){d=d||s_OYc(!0);c=c||s_Fc("span");s_Kc(c);var e=b?b.$||s_pfb.get():s_ufb.get(),f=s_m("SPAN",{id:"swml_addr"});f.appendChild(s_Gc(e));s_Jc(c,d,f);b&&a.$&&(b=s_Fc("span"),b.appendChild(s_Gc(a.$)),s_Jc(c,s_Gc(" - "),b))},s_TYc=function(){var a=s_NYc();return a&&a.$?s_f()-a.timestamp<=Number(3E5):!1},s_UYc=function(a,b){var c=null,d=s_ofb.get();if(d)c=s_qfb;else{var e=s_NYc();e&&(d=e.address,c=s_rfb)}a.$=null!=c?c.get():"";c=s_OYc(s_TYc());s_SYc(a,d?new s_4eb(null,null,null,
null,null,d):null,b,c)},s_VYc=function(a){var b=s_m("A",{href:"#"});s_Ic(b,s_Gc(s_TYc()?s_sfb.get():s_tfb.get()));b.addEventListener("click",s_d(function(a){a.preventDefault();a.stopPropagation();this.rP()},a),!1);return b};s_vY.prototype.pv=function(a,b){if(!s_wfb.get()){var c=s_Gc(" - ");a.appendChild(c);a.appendChild(b);b.getClientRects&&1<b.getClientRects().length&&a.replaceChild(s_Fc("br"),c)}};var s_wY=function(a){this.$="";this.Ea=a||new s_PYc;this.ma=this.ha=!0;this.ka=null};s_g(s_wY,s_vY);
var s_WYc=function(){var a=s_i("swml");if(a&&"1"===s_vfb.get()){var b=a.getElementsByTagName("DIV");if(b&&b[0])return b[0]}return a};s_wY.prototype.start=function(){s_ofb.get()&&(this.ma=!1);var a=s_WYc();a&&(s_UYc(this,a),this.H9());s_XYc(this)};var s_XYc=function(a){"1"===s_vfb.get()&&s_7m(s_d(a.qa,a))};s_=s_wY.prototype;s_.H9=function(){s_5C&&this.ka?this.Ea.get(this.ka,s_d(this.JNa,this,this.ka),!0):(this.ha=!0,s_wY.Ba.H9.call(this))};s_.rP=function(){this.ma=!0;this.H9()};
s_.success=function(a){s_wY.Ba.success.call(this,a);s_7eb(a);this.ha&&(s_RYc(null),this.Ea.get(a,s_d(this.JNa,this,a)),this.ka=a,this.ha=!1)};s_.error=function(a){if(this.ha){var b=s_WYc();b&&(this.ma&&(s_Kc(b),b.appendChild(s_OYc(!1)),b.appendChild(s_Gc(s_nfb.get()))),a.code!=a.PERMISSION_DENIED?this.pv(b,s_VYc(this)):(s_YYc(),this.qa()))}};s_.JNa=function(a,b){a.$=b;var c=s_WYc();c&&(s_SYc(this,a,c),this.pv(c,s_VYc(this)));s_RYc(b)};s_.pv=function(a,b){s_YYc();s_wY.Ba.pv.call(this,a,b);this.qa()};
var s_YYc=function(){var a=s_i("swml");a&&(s_q(a,"visibility","visible"),s_q(a,"display",""))};s_wY.prototype.qa=function(){if("1"===s_vfb.get()){var a=s_i("swml_lmsep");if(a){var b=s_i("swml").offsetHeight-s_4d(s_i("swml")).top-s_4d(s_i("swml")).bottom,c=s_WYc().offsetHeight;a.textContent=b>c?"\u00a0\u00a0\u00a0":"\u00a0-\u00a0"}}};var s_ZYc=function(a){s_wY.call(this,a)};s_g(s_ZYc,s_wY);s_ZYc.prototype.start=function(){var a=s_WYc();a&&(s_UYc(this,a),this.pv(a,s_VYc(this)));s_XYc(this)};s_D("dvl");
s_ta("google.devloc.boc",function(a,b,c,d,e){var f=a.getAttribute(b),g=a.onclick;a.onclick=null;a.style.opacity=.5;f&&(s_j(c).style.display="none",s_j(d).style.display="inline-block",s_j(e).style.display="none",s_Ffb(function(){s_5i(a,a.getAttribute("data-ved"),f)},function(b){b.code==b.PERMISSION_DENIED?(s_j(c).style.display="none",s_j(d).style.display="none",s_j(e).style.display="inline-block"):(s_j(c).style.display="inline-block",s_j(d).style.display="none",s_j(e).style.display="none",a.onclick=
g,a.style.opacity=1)}))});s_rf("dvl",{init:function(a){s_SC||(s_SC={});s_SC["devloc-config"]=a;s_qeb++;(a=s_Efb.get())&&(s_6C=new s_UC(JSON.parse(a)));a=Number(s_Dfb.get());1==a?(new s_wY).start():2==a&&(new s_ZYc).start()},dispose:function(){s_ifb();s_5C=!1}});


s_C("dvl");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy3z */
try{
s_D("sy3z");var s_Il=null,s_sra=!0,s_Jl=s_c;
s_C("sy3z");s_E();
}catch(e){_DumpException(e)}
/* _Module_:foot */
try{
var s_tra=function(){var a=s_i("fbar"),b=s_i("fuser")||s_i("fsr"),c=s_i("fsl");a&&b&&c&&(a=s_l("fbar",a),s_w(a,"fmulti"),32>a.clientWidth-c.offsetWidth-b.offsetWidth-30-34&&s_v(a,"fmulti"))},s_ura=!1,s_vra=!1,s_wra=0,s_xra=function(){var a=s_Il=s_Il||s_i("fbarcnt"),b=s_i("fbar");if(b&&a&&s_Zd(a)&&(s_ura||!s_vra||s_wra!=window.innerWidth)){s_wra=window.innerWidth;s_q(a,{height:"auto"});s_q(b,{bottom:"",position:""});s_tra();if(s_i("dbg_"))s_q(b,{position:"static"});else{var c=window.innerHeight||Math.max(document.documentElement.clientHeight, document.body.scrollHeight),d=s_Md(a).y,c=c-d;c>b.offsetHeight&&(s_q(a,{height:c+"px"}),s_q(b,{bottom:"0",position:"absolute"}))}s_q(a,{visibility:"visible"})}},s_yra=!1;s_D("foot");
var s_zra=null,s_Kl=null,s_Ll=null,s_Bra=function(){if(s_Zd(s_Kl))s_Ll.setAttribute("aria-expanded","false"),s_Ara();else{s_Ll.setAttribute("aria-expanded","true");var a=s_r(s_Kl);var b=-20;if(s_Ef()){var c=s_r(s_Ll);0>s_Md(s_Ll).x+c.width-a.width-b&&(b=s_5d(s_Ll),b=c.width-a.width+b.left+b.right);s_Kl.style.right=b+"px"}else s_Md(s_Ll).x+a.width+b>s_zc().width&&(c=s_r(s_Ll),b=s_5d(s_Ll),b=c.width-a.width+b.left+b.right),s_Kl.style.left=b+"px";s_s(s_Kl,!0);s_ne(document.body,"click",s_Ara)}},s_Ara=
function(a){a&&a.target==s_Ll||s_s(s_Kl,!1);s_oe(document.body,"click",s_Ara)},s_Cra=function(a){s_zra&&s_s(s_zra,!a)};
s_rf("foot",{init:function(a){s_Kl=s_i("fsett");s_Ll=s_i("fsettl");s_Kl&&s_Ll&&s_yi("foot",{cst:s_Bra});var b=s_i("fbar");b&&s_s(b,!0);s_zra=s_i("footcnt");s_Cra(!1);var b=a.po,c=a.qe,d=a.pf;s_Il=s_i("fbarcnt");s_ura=!!c;s_sra=null!=s_Il&&(void 0===d||d);s_vra=!!b;s_Jl=s_sra?s_4ca(s_xra,!1):s_tra;s_Jl();s_yra||(s_ne(window,"resize",s_Jl),s_se(165,s_Jl),s_yra=!0);void 0!==a.dv&&""!==a.dv&&s_nh.set("DV",a.dv,600)},dispose:function(){s_Ai("foot",["cst"])}});s_se(37,s_Cra);s_se(155,s_e(s_Cra,!0));


s_C("foot");s_E();
}catch(e){_DumpException(e)}
/* _Module_:fpe */
try{
s_D("fpe");var s_PQd,s_QQd=!1,s_Y5=function(a){s_o.call(this);var b=a||!1;a=!!(s_8j()&&window.gbar&&gbar.elc&&gbar.elr);this.qa=b&&!a;this.ma=[];s_QQd||(a&&gbar.elc(s_d(function(){b&&s_RQd(gbar.elr().mo);s_t(71)},this)),s_QQd=!0);this.qa&&(this.ka=s_4ca(s_d(this.Ea,this),!0),s_p(window,"resize",this.ka,!1,this),this.ka());(a=s_i("tbbcc"))&&this.ma.push(a);this.ha();s_p(window,"scroll",this.ha,!1,this)};s_g(s_Y5,s_o);
s_Y5.prototype.Ha=function(){this.ma=[];this.qa&&s_ud(window,"resize",this.ka,!1,this);s_ud(window,"scroll",this.ha,!1,this)};var s_RQd=function(a){var b=s_i("cnt"),c=s_i("searchform");b&&(s_x(b,"big","lg"==a),s_x(b,"mdm","md"==a));c&&(s_x(c,"big","lg"==a),s_x(c,"mdm","md"==a))};s_Y5.prototype.Ea=function(){s_RQd(1250<=document.body.offsetWidth?"lg":"sm")};s_Y5.prototype.ka=null;
s_Y5.prototype.ha=function(){var a=window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft,b=s_Ef(),c=b?"marginRight":"marginLeft",d=b?"right":"left";b&&(a=Math.abs(a));for(var b=0,e;e=this.ma[b];b++)"fixed"==s_Id(e)&&("tbbcc"==e.id?e.style[c]=-a+"px":e.style[d]=-a+"px")};s_rf("fpe",{init:function(a){s_PQd=new s_Y5(a.js)},dispose:function(){s_PQd&&(s_PQd.dispose(),s_PQd=null)}});

s_C("fpe");s_E();
}catch(e){_DumpException(e)}
/* _Module_:ipv6 */
try{
s_D("ipv6");var s_Ml=null,s_Dra=function(a){s_ta("google.v6t",s_f());s_ta("google.v6s",0);s_Ml=new Image;s_ta("google.v6",s_Ml);s_Ml.onload=s_Ml.onerror=function(){s_ta("google.v6s",1)};s_Ml.src=a+"&rndm="+Math.random()};s_sf("ipv6",{init:function(a){a.url&&s_Dra(a.url)},dispose:function(){s_Ml=null}});

s_C("ipv6");s_E();
}catch(e){_DumpException(e)}
/* _Module_:lu */
try{
s_D("lu");var s__$c=["luibli","luibbri"],s_0$c={},s_h_=-1,s_1$c=null,s_2$c=function(a,b,c){a=a.cloneNode(!0);var d,e;b.hasAttribute("data-mh")&&(d=b.getAttribute("data-mh"));b.hasAttribute("data-mw")?e=b.getAttribute("data-mw"):e=88*c-16;var f;"IMG"==a.tagName?f=a:f=a.getElementsByTagName("IMG")[0];f.id="";f.width=e;void 0!==d&&(f.height=d);f.onload=function(){f.style.display="block";delete f.onload};f.style.display="none";c=f.src.split("&")[0]+"&w="+e;void 0!==d&&(c+="&h="+d);f.src=c;null!=f.parentNode&&(f.parentNode.style.width=
e+"px",void 0!==d&&(f.parentNode.style.height=d+"px"));b.appendChild(a)},s_3$c=function(a){if(!a)return null;var b=0;for(c in a){var c=Number(c);if(0<a[c].offsetHeight){var d=a[c];b=c;break}}if(!d)return null;if(!d.firstChild){for(c in a)if(c=Number(c),a[c].firstChild){var e=a[c];break}s_2$c(e.firstChild,d,b)}return{element:d,wFa:b}},s_6$c=function(){for(var a=s_4$c(),b=!1,c=0;c<s__$c.length;c++)for(var d=s_k(s__$c[c]),e=0;e<d.length;e++)s_5$c(d[e])&&(b=!0);return a||b},s_4$c=function(){var a=s_i("rhs_block");
if(!a||0==a.offsetHeight)return!1;a:{for(var b={},c=3;5>=c;c++)if(b[c]=a.querySelector(".rhsmap"+c+"col"),b[c])b[c].column_count=c;else{a=null;break a}a=b}b=s_3$c(a);if(!b)return!1;a=b.wFa;if(s_h_==a&&s_0$c[s_h_])return!0;b=b.element.getElementsByTagName("IMG")[0];b.id||(s_i("lu_map").id="",b.id="lu_map");s_0$c[a]||(s_0$c[a]=!0);s_h_=a;return!0},s_5$c=function(a){for(var b,c=[],d,e=s_y(a,"action"),f=3;5>=f;f++){var g=a.querySelector(".luib-"+f);if(!g)return!1;g=g.querySelector(".thumb");if(!g)return!1;
c.push(g);0<g.offsetHeight&&(d=g)}if(!d)return!1;var k=parseInt(d.style.width,10),g=parseInt(d.style.height,10);if((f=d.querySelector("img"))&&f.src)return!0;for(var l,f=0;f<c.length;f++){var m=c[f].querySelector("img");if(m&&m.src){l=s_m("DIV");l.innerHTML=c[f].innerHTML;"CONTAIN"==e&&(l.style.backgroundColor=c[f].style.backgroundColor);b=m;break}}if(!b)return!1;c=l.querySelector("img");"NONE"==e&&(c.width=k,c.height=g,b=s_Cg(b.src),b.$("w",parseInt(k,10)),b.$("h",parseInt(g,10)),c.src=b.toString());
d.innerHTML=l.innerHTML;"CROP"==e&&(c=d.querySelector("img"),b=(k-c.width)/2+"px",s_0d(a)?c.style.right=b:c.style.left=b,c.style.top=(g-c.height)/2+"px");"CONTAIN"==e&&(c=d.querySelector("img"),d.style.backgroundColor=l.style.backgroundColor,l=Math.min(d.offsetHeight/c.height,d.offsetWidth/c.width),e=c.width*l,l*=c.height,c.width=e,c.height=l,c.style.top=(d.offsetHeight-l)/2+"px",b=(d.offsetWidth-e)/2+"px",s_0d(a)?c.style.right=b:c.style.left=b);return!0}; s_rf("lu",{init:function(){"webhp"!=google.sn&&s_i("lu_map")&&(s_6$c()?(s_1$c=s_4ca(s_6$c,!0),s_se(60,s_1$c)):(s_h_=3,s_0$c[s_h_]=!0))},dispose:function(){s_1$c&&(s_ue(60,s_1$c),s_1$c=null);s_0$c={};s_h_=-1}});

s_C("lu");s_E();
}catch(e){_DumpException(e)}
/* _Module_:m */
try{
var s_XQd={};s_D("m");var s_05=null;var s_YQd,s_ZQd,s__Qd,s_0Qd,s_1Qd,s_15,s_2Qd={},s_25=null,s_35=null,s_45=[],s_4Qd=function(){s_05.ab.on&&(s_se(41,s_3Qd),s_se(37,function(a){a&&(a=s_i("appbar"))&&(a.style.visibility="hidden")}),s_i("pocs"))},s_5Qd=function(){return s_i("sftab")||s_i("lst-ib")},s_6Qd=function(){var a=s_5Qd();a&&s_v(a,"lst-d-f")},s_7Qd=function(){var a=s_5Qd();a&&s_w(a,"lst-d-f")},s_8Qd=function(a){this.element=a;this.$=[];this.ka=null;"ab_opt"==this.element.id&&0==this.element.childNodes.length&&gbar.aomc(this.element);
a=s_k("ab_dropdownitem",this.element);for(var b=0,c;c=a[b];b++)s_u(c,"disabled")||this.$.push(c)},s_$Qd=function(a){var b=s_25;s_9Qd(b,null==b.ka?a?0:b.$.length-1:(b.ka+(a?1:b.$.length-1))%b.$.length)},s_9Qd=function(a,b){var c=a.$[b];c&&(s_aRd(a),s_v(c,"selected"),c.setAttribute("aria-selected","true"),c=c.querySelector("a, .action-menu-button")||c,c.setAttribute("tabindex","0"),c.focus(),a.ka=b)},s_aRd=function(a){if(null!=a.ka){var b=a.$[a.ka];b&&(s_w(b,"selected"),b.setAttribute("aria-selected",
"false"),(b.querySelector("a, .action-menu-button")||b).setAttribute("tabindex","-1"),a.element.focus(),a.ka=null)}};s_8Qd.prototype.kd=function(a){for(var b=0,c;c=this.$[b];b++)if(a==c){b!=this.ka&&s_9Qd(this,b);break}};
var s_cRd=function(a){var b=(a=s_3c(a,"ab_button"))&&s_35!=a;s_25&&s_55();a&&b&&s_bRd(a)},s_dRd=function(a){google.ac&&google.ac.cc&&google.ac.cc();s_De(a.href);return!0},s_eRd=function(a,b,c){32==c.keyCode&&s_De(a.href)},s_fRd=function(a){s_s(s_i("ufp"),"block");s_cRd(a)},s_bRd=function(a,b){var c=s_sa(a);if(void 0==s_2Qd[c]){var d=s_3c(a,"ab_ctl");var e=null;d&&(d=s_l("ab_dropdown",d))&&(e=new s_8Qd(d));s_2Qd[c]=e}if(c=s_2Qd[c])s_v(a,"selected"),a.setAttribute("aria-expanded","true"),s_35=a,c.element.style.visibility=
"inherit",s_25=c,c=a.id.indexOf("am-b"),a.id&&-1!=c&&(c=s_Wc(a))&&s_u(c,"action-menu")&&(c=s_l("action-menu-panel",c))&&s_z(a,[c],[],"","&id="+a.id),s_ne(document.body,"click",s_55),s_ne(document.body,"keydown",s_gRd),b&&s_$Qd(!0)},s_55=function(a){s_25&&((a=a||window.event)&&"click"==a.type&&s_3c(s_3e(a),"ab_button")&&(s_4e(a),a.preventDefault?a.preventDefault():a.returnValue=!1),s_oe(document.body,"click",s_55),s_oe(document.body,"keydown",s_gRd),s_aRd(s_25),s_25.element.style.visibility="hidden",
s_25=null);s_35&&(s_w(s_35,"selected"),s_35.setAttribute("aria-expanded","false"),s_35=null)},s_gRd=function(a){27==a.keyCode&&s_55()},s_hRd=function(a,b,c){if(9==c.keyCode)s_55();else if(27==c.keyCode){if(s_25)return s_55(),s_65(c)}else{if(38==c.keyCode||40==c.keyCode)return s_25?s_$Qd(40==c.keyCode):s_bRd(a,!0),s_65(c);if(37==c.keyCode||39==c.keyCode)return s_65(c)}return!0},s_iRd=function(a,b,c){s_25&&((a=s_3c(s_3e(c),"ab_dropdownitem"))?s_25.kd(a):s_aRd(s_25))},s_jRd=function(){s_25&&s_aRd(s_25)},
s_kRd=function(a,b,c){if(s_25)if(9==c.keyCode)s_55();else{if(27==c.keyCode)return a=s_35,s_55(),a.focus(),s_65(c);if(38==c.keyCode)return s_$Qd(!1),s_65(c);if(40==c.keyCode)return s_$Qd(!0),s_65(c);if(32==c.keyCode||37==c.keyCode||39==c.keyCode)return s_65(c)}return!0},s_65=function(a){s_4e(a);a.preventDefault&&a.preventDefault();return a.returnValue=!1},s_lRd=function(a){return s_Ab()?(37!=a.keyCode&&38!=a.keyCode&&39!=a.keyCode&&40!=a.keyCode||s_65(a),!1):!0},s_3Qd=function(a){var b=s_i("rcnt"),
c=s_9j();if(c&&b){var d=parseInt(s_Gd(c,"top"),10),e=s_5Qd(),e=e?e.offsetHeight:c.offsetHeight,b=s_Qd(b);if(a!=s_YQd||d!=s_ZQd||e!=s__Qd||b!=s_0Qd){s_YQd=a;s_ZQd=d;s__Qd=e;s_0Qd=b;var d=0,f;if(f=a)f=!s_XQd.isch;f&&(c=s_Qd(c)+e,d=Math.max(0,a+7-b+c));s_1Qd=d}(a=s_i("center_col"))&&a.style.paddingTop!=s_1Qd+"px"&&(a.style.paddingTop=s_1Qd+"px")}return!1},s_mRd=function(){var a=s_i("bbar");a&&s_s(a,!1)},s_nRd=function(){var a=s_i("mbbar");a&&s_s(a,!1)},s_oRd=function(a){s_15&&s_15.remove("bbh");s_De(a.href)}, s_pRd=function(a){s_q(a,"visibility","hidden");s_s(a,!0);var b=s_r(a);s_q(a,"margin-left",-Math.floor(b.width/2)+"px");s_q(a,"visibility","visible")};
var s_qRd=!1;
s_rf("m",{init:function(a){s_05=a;s_qRd||s_4Qd();s_qRd=!0;s_5Qd()&&(a=s_i("lst-ib"),s_ne(a,"focus",s_6Qd),s_ne(a,"blur",s_7Qd),a==s_4c(document)&&s_6Qd());s_15=s_5k("local","abar");s_45=[];(a=s_i("abar_ps_on"))&&s_45.push(new s__5(a,s_u(a,"disabled")?s_05.msgs.sPersD:s_05.msgs.sPers));(a=s_i("abar_ps_off"))&&s_45.push(new s__5(a,s_u(a,"disabled")?s_05.msgs.hPersD:s_05.msgs.hPers));var b,c;s_15?c=s_15.get("bbh"):c="";a=document.getElementById("safesearch");"1"==c||a&&!a.getAttribute("data-safesearch-on")||!(b=
document.getElementById("bbar"))||(s_pRd(b),s_15&&s_15.set("bbh",1));b&&"visible"==s_Fd(b,"visibility")||(b=document.getElementById("mbbar"))&&s_pRd(b);s_yi("m",{cc:s_dRd,hbke:s_hRd,hdke:s_kRd,hdhne:s_iRd,hdhue:s_jRd,go:s_eRd,mskpe:s_lRd,tdd:s_cRd,tei:s_fRd,hbb:s_mRd,hmbb:s_nRd,cbbl:s_oRd},!0)},dispose:function(){if(s_5Qd()){var a=s_i("lst-ib");s_oe(a,"focus",s_6Qd);s_oe(a,"blur",s_7Qd)}s_25&&s_55();s_2Qd={};for(a=0;a<s_45.length;a++)s_45[a].destroy();s_45=[];s_Ai("ab","cc hbke hdke hdhne hdhue go mskpe tdd tei tne".split(" "))}});


s_C("m");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sf */
try{
s_D("sf");s_rf("sf",{init:function(){s_yi("sf",{chk:function(a){a.checked=!0},lck:function(a){a.form.q.value?a.checked=!0:s_le().href="/doodles/"},tia:function(a,b){a=s_m("SCRIPT",{src:b.js});s_7d(a)}})}});

s_C("sf");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sy84 */
try{
s_D("sy84");
s_C("sy84");s_E();
}catch(e){_DumpException(e)}
/* _Module_:sydl */
try{
s_D("sydl");var s_jG=function(){var a=this;this.ma=this.$="";this.ha=!1;this.ka="";this.qa=!1;s_ya(s_ei("duf3"))||(this.qa=!0);s_9h("duf3",function(b){a:{var c=s_Avb(a.$),d=s_Avb(b);if(s_Bvb(c,d)&&!(0<=b.indexOf("d3sbx")))if(a.$=b,d.sQ)a.ha?(s_xi("duf3.cd"),s_xi("duf3.ty"),a.ha=!1):(s_xi("duf3.hide"),a.ka&&(s_De(a.ka),a.ka=""));else if(d.A6){if(c.A6&&((b=!c.sQ&&!d.sQ&&c.nG==d.nG&&c.VEa==d.VEa&&c.widget!=d.widget)&&d.widget?d.mUa&&s_xi("duf3.rp",d.mUa):(s_xi("duf3.cd"),a.ha&&(s_xi("duf3.ty"),a.ha=!1)),b))break a;
a.ma=d.widget||"";b=new Map;b.set("entry_point",d.nG);s_El(d.A6,b,d.BWa||void 0)}else s_iG("")}})},s_iG=function(a,b){var c=s_jG.Sa();if(c.ma)(a=document.querySelector("[data-dtype="+c.ma+"]"))&&s_Ah(s_e(s_xi,"duf3.rp",a)),c.ma="";else{var d=s_Avb(c.$),e=s_Avb(a);s_Bvb(d,e)&&(c.$=a,c=s_ei("fpstate"),s_Kf()||!(""!=e.widget&&void 0!=e.widget||""!=c&&s_va(c,"d3"))?s_bi("duf3",a,!!b):(c={},c.duf3=a,c.fpstate=e.widget||"",s_ai(c,!!b)))}},s_Avb=function(a){if(""==a)return{sQ:!0};var b=a.split(",");if(2>
b.length)return{sQ:!1,A6:null};a=b[0];var c=b[1],d="";2<b.length&&(d=b[2]);var b=s_i(c),e=document.querySelector("[data-duffy-target='"+c+"']")||void 0,f=null;b&&d&&(f=b.querySelector("[data-dtype="+d+"]"));return{sQ:!1,nG:a,VEa:c,widget:d,A6:b,BWa:e,mUa:f}},s_Bvb=function(a,b){return a.sQ!=b.sQ||a.nG!=b.nG||a.VEa!=b.VEa||a.widget!=b.widget};s_la(s_jG);

s_C("sydl");s_E();
}catch(e){_DumpException(e)}
/* _Module_:d3l */
try{
s_D("d3l");var s_zwb=function(){s_jG.Sa()};s_S(function(a){s_Q(a,"t-aTz9-_sUcEc",s_zwb,null,null,function(a){s_zwb.call(a)})});

s_C("d3l");s_E();
}catch(e){_DumpException(e)}
/* _GlobalSuffix_ */
// Google Inc.
