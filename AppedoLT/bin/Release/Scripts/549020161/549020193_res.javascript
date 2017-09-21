var maxX_utils = null, maxY_utils = null;
var started = false, startedon = null, /* last_activity_time = null, */ loginFormPanel = null, loginWindow = null, refreshPanel = null, refreshWindow = null;

var MODULEID_ACTIONITEM = "ACTIONITEM", MODULEID_REQUIREMENT = "REQUIREMENTS", MODULEID_TESTPLAN = "TESTCASES", MODULEID_TESTEXECUTE = "TESTEXECUTE", MODULEID_DEFECT = "DEFECTS";
var fpFilterDetail = null, filterDetailsWindow = null, bInvalidFilterId = false;

function showInfoWindow(params) {
	var newPinState = 'unpin';
	params.msgType = params.pinState || params.msgType || params.title;
	if( params.msgType == 'Error' || params.msgType == 'Alert' || params.msgType == 'Warning' || params.msgType == 'fail' || params.msgType == 'Fail' || params.msgType == 'failure' || params.msgType == 'Failure' || params.msgType == 'failed' || params.msgType == 'Failed' ){
		newPinState = 'pin';
	}
	var wndMsg = new Ext.ux.window.MessageWindow({
		title: params.title || 'Message',
		html: params.msg || '',
		origin: { offX: params.offX || -5, offY: params.offY || -5-getWindowScrollOffset()[1] },
		autoHeight: true,
		iconCls: 'icon-info',
		help: false,
		pinState: newPinState,
		showFx: { startAnimFrom: params.startAnimFrom || 't' },
		hideFx: { delay: params.delay || 2500, mode: params.mode || 'standard' },
		listeners: {
			/* render:function(){
				Ext.ux.Sound.play('generic.wav');
			} */
		}
	});
	wndMsg.show(Ext.getDoc());
}

function showFormInvalidMsg(){
	showInfoWindow({title:'Warning', msg: 'Check with error icon(s) <IMG src="'+basePath+'images/default/form/exclamation.gif"/> <BR/>or fill Red bordered TextBox(es).'});
}

/**
 * Set the projectCode, which has been selected from a dropdown, to the Session
 * and the Menu creation fn is called to set Project's Access-rights.
 */
var callBckFn = null; 
function AssignProjectCode(strProjectCode, callBckFn){
	Ext.Ajax.request({
		url: './assignProjectCode',
		method :'GET',
		params:	{ myProjectCode: strProjectCode },
		callback: assignProjCodeCallBack		//from menu.js
	});
	function assignProjCodeCallBack(){
		formMenuItems();
		if( callBckFn ){
			eval( '('+callBckFn+'())' );
		}
	}
}

function getDateObjectFromString(dateString,dateSeperator)
{
	//This function return a date object after accepting 
	//a date string ans dateseparator as arguments
	var curValue=dateString;
	var sepChar=dateSeperator;
	var curPos=0;
	var cDate,cMonth,cYear;
	//extract day portion
	curPos=dateString.indexOf(sepChar);
	cYear=dateString.substring(0,curPos);
	//extract month portion
	endPos=dateString.indexOf(sepChar,curPos+1);
	cMonth=dateString.substring(curPos+1,endPos);
	//extract year portion
	curPos=endPos;
	endPos=curPos+3;
	cDate=curValue.substring(curPos+1,endPos);
	//Create Date Object
	///alert(cYear+"<-"+cMonth+"<-"+cDate);
	dtObject=new Date(cYear,cMonth-1,cDate);
	return dtObject;
}

function maskAll(msg){
	Ext.getBody().mask(msg, 'x-mask-loading');
}

function unMaskAll(){
	Ext.getBody().unmask();
}

function getSessionStatus(){
	Ext.Ajax.request({
		url : './getsessionstatus',
		success : function(response){
			var jsonDataSuccess = Ext.util.JSON.decode( response.responseText );
			if( !jsonDataSuccess.message )
				showLoginPage();
		},
		failure : function(response){
			showLoginPage();
		}
	});
}

function getUploadedFiles(moduleName, filters, strUppanelId, callBackFn){
	Ext.Ajax.request({
		url : 'view/getUploadedFiles.jsp?moduleName='+moduleName+'&'+filters,
		success : function(response){
			// clear the store
			Ext.getCmp(strUppanelId).getStore().removeAll();
			
			// fill the store
			var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
			var upploadedList = jsonDataSuccess.data;
			for( var i=0; i<upploadedList.length; i++ ){
				var fileDetail = upploadedList[i];
				var store = Ext.getCmp(strUppanelId).getStore();
				var rec = new store.recordType({
					 input: fileDetail.input
					,fileName: fileDetail.fileName
					,filePath: fileDetail.filePath
					,shortName: fileDetail.shortName
					,fileCls: fileDetail.fileCls
					,state: fileDetail.state
					,progressId: fileDetail.progressId
					,pctComplete: fileDetail.pctComplete
					,error: ''
					,saveFilePath: fileDetail.saveFilePath
				}, fileDetail.progressId);
				rec.commit();
				var formUploadFile = Ext.getCmp(strUppanelId).uploader.createForm(rec);
				rec.set('form',formUploadFile);
				store.add(rec);
			}
			if( i>0 && !Ext.getCmp(strUppanelId).readOnly && Ext.getCmp(strUppanelId).removeAllBtn ){
				Ext.getCmp(strUppanelId).removeAllBtn.enable();
			}
			
			if( callBackFn ){
				eval(callBackFn+'()');
			}
		},
		failure: function(response){
			showInfoWindow({title:'Message', msg:'Error in uploaded filelist retrival'});
		}
	});
}

function getUploadedFilesFromStore(storeAttachment, strUppanelId, callBackFn){
	// clear the store
	Ext.getCmp(strUppanelId).getStore().removeAll();
	
	// fill the store
	storeAttachment.each( function(rec){
		var fileDetail = rec.data;
		var store = Ext.getCmp(strUppanelId).getStore();
		var rec = new store.recordType({
			 input: fileDetail.input
			,fileName: fileDetail.fileName
			,filePath: fileDetail.filePath
			,shortName: fileDetail.shortName
			,fileCls: fileDetail.fileCls
			,state: fileDetail.state
			,progressId: fileDetail.progressId
			,pctComplete: fileDetail.pctComplete
			,error: ''
			,saveFilePath: fileDetail.saveFilePath
		}, fileDetail.progressId);
		rec.commit();
		var formUploadFile = Ext.getCmp(strUppanelId).uploader.createForm(rec);
		rec.set('form',formUploadFile);
		store.add(rec);
	});
	
	eval(callBackFn+'()');
	if( storeAttachment.getCount()>0 && !Ext.getCmp(strUppanelId).readOnly ){
		Ext.getCmp(strUppanelId).removeAllBtn.enable();
	}
}

/**
 * Get the attachment files for the particulat step of a testcase.
 * Load them in 
 */ 
function getUploadedFilesListIntoStore(moduleName, filters, groupByField, storeAttachment, recordStep){
	// var store = new Ext.data.SimpleStore();
	
	Ext.Ajax.request({
		url : 'view/getUploadedFiles.jsp?moduleName='+moduleName+'&'+filters,
		success : function(response){
			var joFiles = Ext.util.JSON.decode( response.responseText );
			var filePaths = '', temp = null;
			
			// fill the store with each row.
			var upploadedList = joFiles.data; //[rec.data.th_sno];
			for( var i=0; i<upploadedList.length; i++ ){
				var fileDetail = upploadedList[i];
				var rec = new storeAttachment.recordType({
					 input: fileDetail.input
					,fileName: fileDetail.fileName
					,filePath: fileDetail.filePath
					,shortName: fileDetail.shortName
					,fileCls: fileDetail.fileCls
					,state: fileDetail.state
					,progressId: fileDetail.progressId
					,pctComplete: fileDetail.pctComplete
					,error: ''
					,saveFilePath: fileDetail.saveFilePath
				}, fileDetail.progressId);
				rec.commit();
				storeAttachment.add(rec);
				
				// make the above as string to save in store
				temp = "{input: null"
					+",fileName: \""+fileDetail.fileName
					+"\",filePath: \""+fileDetail.filePath
					+"\",shortName: \""+fileDetail.shortName
					+"\",fileCls: \""+fileDetail.fileCls
					+"\",state: \""+fileDetail.state
					+"\",progressId: \""+fileDetail.progressId
					+"\",pctComplete: \""+fileDetail.pctComplete
					+"\",error: \""+''
					+"\",saveFilePath: \""+fileDetail.saveFilePath+"\"}";
				if( filePaths == '' ){
					filePaths = temp;
				}else{
					filePaths = filePaths+','+temp;
				}
			}
			
			recordStep.data.attachmentFileNames = '['+filePaths+']';
			recordStep.data.att_count = upploadedList.length;
			recordStep.commit();
		},
		failure: function(response){
			showInfoWindow({title:'Message', msg:'Error in uploaded filelist retrival'});
		}
	});
}

function organizeUploadedFiles(strUppanelId){
	var uploaderStore = Ext.getCmp(strUppanelId).getStore();
	var uploadError = false, uploadInProgress = false, msgRunning = false;
	var uploadedFileList = new Array();
	
//	checkUploadStatus( strUppanelId, false );
//	do{
		uploaderStore.each( function(record){
			var uploadResponse = record.data;
			if( record.get('state') == 'uploading' ){
				uploadInProgress = true;
			}else if( record.get('state') != 'done' ){
				uploadError = true;
			}else{
				uploadedFileList.push( uploadResponse );
			}
		});
//	}while( uploadInProgress );
	
	if( uploadInProgress == true ){
		showInfoWindow({title:'Warning', msg:'Wait for Upload to complete.'});
	}else if( uploadError == true ){
		showInfoWindow({title:'Error', msg:'Retry/Remove the failed attachments before save.'});
	}else{
		Ext.getCmp((strUppanelId+'_hdn')).setValue( Ext.encode(uploadedFileList) );
	}
	return !(uploadInProgress || uploadError);
}
/*
function checkUploadStatus(strUppanelId, msgRunning){
	alert( strUppanelId+" , "+msgRunning);
	var uploaderStore = Ext.getCmp(strUppanelId).getStore();
	uploadInProgress = false;
	uploaderStore.each( function(record){
		var uploadResponse = record.data;
		if( record.get('state') == 'uploading' ){
			uploadInProgress = true;
			if( !msgRunning ){
				maskAll('Waiting for Upload to complete...');
				msgRunning = true;
			}
		}
	});
	if( uploadInProgress == true ){
		window.setTimeout("test('"+strUppanelId+"', "+msgRunning+")",2000 );
	}
}
*/
function openDownloadWindow(savedFilePath,originalFileName){
	var downloadWin = window.open(basePath+"download?savedFilePath="+savedFilePath+"&originalFileName="+originalFileName);
}

/**
 * Copy the given store into a fresh Store
 */
function cloneSimpleStore(storeSource){
	var records = [];
	storeSource.each(function(r){
		records.push(r.copy());
	});
	var newStore = new Ext.data.SimpleStore({
		recordType: storeSource.recordType
	});
	newStore.add(records);
	
	return newStore;
}

/**
 * Copy the given store's records into the target Store
 */
function copySimpleStore(storeSource, storeTarget){
	var records = [];
	storeSource.each(function(r){
		records.push(r.copy());
	});
	storeTarget.removeAll();
	storeTarget.add(records);
}

function createVTypeDateField(){
	Ext.apply(Ext.form.VTypes, {
		daterange : function(val, field) {
			var date = field.parseDate(val);
			if(!date){
				return;
			}
			if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
				var start = Ext.getCmp(field.startDateField);
				start.setMaxValue(date);
				start.validate();
				this.dateRangeMax = date;
			}else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
				var end = Ext.getCmp(field.endDateField);
				end.setMinValue(date);
				end.validate();
				this.dateRangeMin = date;
			}else if (field.disableFromToday ){
				start.setMaxValue((new Date()).format('Y-m-d'));
			}
			return true;
		},
		// Set min cut-off to a date-field
		startdaterange : function(val, field) {
			if (field.startDateField) {
				// get required min cut-off
				var date = field.parseDate(Ext.getCmp(field.startDateField).getValue());
				if(!date){
					return;
				}

				var thisDateCmp = Ext.getCmp(field.name);
				if( (!thisDateCmp.dateRangeMin || (date.getTime() != thisDateCmp.dateRangeMin.getTime())) ){
					// set the min cut-off
					thisDateCmp.dateRangeMin = date;
					thisDateCmp.setMinValue(date);
					thisDateCmp.validate();
				}
			}
			return true;
		}
	});
}

function trimAllText(frmName){
	var str = null, strTrimmed =  null;
	try{
		frmName.form.items.each(function(field) {
			// don't reset SuperCombo's raw value
			if( (field instanceof Ext.form.TextArea || field instanceof Ext.form.TextField) 
					&& !field instanceof Ext.ux.form.SuperBoxSelect){
				var txt = new String(field.getRawValue());
				if( txt.length > 0 ){
					field.setRawValue( txt.replace(/^\s+|\s+$/g, '') );
				}
			}
			if( field instanceof Ext.form.HtmlEditor ){
				str = field.getValue().replace(/^\s+|\s+$/g, '');
				strTrimmed = str.replace("<br>", "").replace("<br/>", "").replace("<br />", "").trim();
				if( strTrimmed.length == 0 ){
					field.setRawValue( '' );
					field.setValue( '' );
					field.setRawValue( '' );
				}
			}
		}, frmName);
	}catch(ex){
	}
}

function overrideCheckRadioGroup(){
	Ext.override(Ext.form.CheckboxGroup, {
		getNames: function() {
			var n = [];
			this.items.each(function(item) {
				if (item.getValue()) {
					n.push(item.getName());
				}
			});
			return n;
		},

		getValues: function() {
			var v = [];
			this.items.each(function(item) {
				if (item.getValue()) {
					v.push(item.getRawValue());
				}
			});
			return v;
		},
	
		setValues: function(v) {
			var r = new RegExp('(' + v.join('|') + ')');
			this.items.each(function(item) {
				item.setValue(r.test(item.getRawValue()));
			});
		}
	});
	
	Ext.override(Ext.form.RadioGroup, {
		getName: function() {
			return this.items.first().getName();
		},

		getValue: function() {
			var v;
			if (this.rendered) {
				this.items.each(function(item){
					if (!item.getValue()) 
						return true;
					v = item.getRawValue();
					return false;
				});
			} else {
				for (var k in this.items) {
					if (this.items[k].checked) {
						v = this.items[k].inputValue;
						break;
					}
				}
			}
			return v;
		},
	
		setValue: function(v) {
			if (this.rendered){
				this.items.each(function(item){
					item.setValue(item.getRawValue() == v);
				});
			} else {
				for (var k in this.items) {
					this.items[k].checked = this.items[k].inputValue == v;
				}
			}
		}
	});
}

/**
 * Get Array of Array lookups to Array
 * Eg: [['Fixed'],['New'],['Close']] => ['Fixed','New','Close']
 */
function getFilterOptions(lookup){
	lookupArray = new Array();
	for( var i=0; i<lookup.length; i++ ){
		lookupArray[i] = lookup[i][0];
	}
	return lookupArray;
}

/**
 * Format YYYY-MM-DD to JS date
 */
function parseYYYYMMDD( strDate ){
	return (new Date( strDate.substr(0, 4), strDate.substr(5, 2)-1, strDate.substr(8, 2) ) );
}

function padDateLeadingZero(val){
	val = ''+val;
	if( val.length == 1 ){
		return '0'+val;
	} else {
		return val;
	}
}

function focusToField(fieldId, delay){
	if( delay ){
		Ext.getCmp(fieldId).focus(true, delay);
	}else{
		Ext.getCmp(fieldId).focus(true);
	}
}

function focusAndExpandField(fieldId, delay){
	if( fieldId ){
		if( delay ){
			Ext.getCmp(fieldId).focus(true, delay);
		}else{
			Ext.getCmp(fieldId).focus(true);
		}
		Ext.getCmp(fieldId).onTriggerClick();
	}
}

function getWindowScrollOffset(){
	var scrOfX = 0, scrOfY = 0;
	if( typeof( window.pageYOffset ) == 'number' ) {
	  //Netscape compliant
	  scrOfY = window.pageYOffset;
	  scrOfX = window.pageXOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
	  //DOM compliant
	  scrOfY = document.body.scrollTop;
	  scrOfX = document.body.scrollLeft;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
	  //IE6 standards compliant mode
	  scrOfY = document.documentElement.scrollTop;
	  scrOfX = document.documentElement.scrollLeft;
	}
	return [ scrOfX, scrOfY ];
}

/**
 * Add date in long format to URL, 
 * inorder to send a server request without looping in browser cache
 */
function addTimeURLParam(){
	var now = new Date();
	return "_dc="+now.getTime();
}

function getProjectStartEndDates(store, projectCodeFieldName, projectCode){
	var rtn = {};
	// Set project start & end dates
	var projectIndex = store.findExact(projectCodeFieldName, projectCode);
	var projectRec = store.getAt(projectIndex);
	rtn.projStartDate = parseYYYYMMDD( projectRec.get("startDate") );
	rtn.projEndDate = parseYYYYMMDD( projectRec.get("endDate") );
	return rtn;
}

// Clear masked dates in start-end datepickers
function clearStartEndDatefield(startDateField, endDateField, projStartDate, projEndDate){
	Ext.getCmp(startDateField).setValue( projStartDate || '1900-01-01' );
	Ext.getCmp(endDateField).setValue( projEndDate || '3000-01-01' );
	Ext.getCmp(startDateField).reset();
	Ext.getCmp(endDateField).reset();
}

function disableExtraDiv(){
	if( Ext.isIE ){
		var classLinks = Ext.query('.x-panel-body-noheader')
		Ext.each(classLinks, function(item,index) {
			if( item.clientHeight == 18 && item.innerHTML == "" ){
				Ext.getDom(item.id).style.display = 'none';
			}
		});
	}
}

function fixHTMLeditorBugs(){
//  Source: http://www.sencha.com/forum/showthread.php?37285-allowBlank-false-on-html-editor-not-working
	Ext.override(Ext.form.HtmlEditor, {
		getMessageHandler : function(){
			var messageTargets = {
				'qtip' : {
					mark: function(field, msg){
						field.el.addClass(field.invalidClass);
						field.el.dom.qtip = msg;
						field.el.dom.qclass = 'x-form-invalid-tip';
						if(Ext.QuickTips){ // fix for floating editors interacting with DND
							Ext.QuickTips.enable();
						}
					},
					clear: function(field){
						field.el.removeClass(field.invalidClass);
						field.el.dom.qtip = '';
					}
				},
				'title' : {
					mark: function(field, msg){
						field.el.addClass(field.invalidClass);
						field.el.dom.title = msg;
					},
					clear: function(field){
						field.el.dom.title = '';
					}
				},
				'under' : {
					mark: function(field, msg){
						field.el.addClass(field.invalidClass);
						if(!field.errorEl){
							var elp = field.getErrorCt();
							if(!elp){ // field has no container el
								field.el.dom.title = msg;
								return;
							}
							field.errorEl = elp.createChild({cls:'x-form-invalid-msg'});
							field.on('resize', field.alignErrorEl, field);
							field.on('destroy', function(){
								Ext.destroy(this.errorEl);
							}, field);
						}
						field.alignErrorEl();
						field.errorEl.update(msg);
						Ext.form.Field.msgFx[field.msgFx].show(field.errorEl, field);
					},
					clear: function(field){
						field.el.removeClass(field.invalidClass);
						if(field.errorEl){
							Ext.form.Field.msgFx[field.msgFx].hide(field.errorEl, field);
						}else{
							field.el.dom.title = '';
						}
					}
				},
				'side' : {
					mark: function(field, msg){
						if(field.iframe)	Ext.get(field.iframe).addClass(field.invalidClass);
						if(!field.errorIcon){
							var elp = field.getErrorCt();
							if(!elp){ // field has no container el
								field.el.dom.title = msg;
								return;
							}
							field.errorIcon = elp.createChild({cls:'x-form-invalid-icon'});
							field.on('resize', field.alignErrorIcon, field);
							field.on('destroy', function(){
								Ext.destroy(this.errorIcon);
							}, field);
						}
						field.alignErrorIcon();
						field.errorIcon.dom.qtip = msg;
						field.errorIcon.dom.qclass = 'x-form-invalid-tip';
						field.errorIcon.show();
					},
					clear: function(field){
						if(field.iframe)	Ext.get(field.iframe).removeClass(field.invalidClass);
						if(field.errorIcon){
							field.errorIcon.dom.qtip = '';
							field.errorIcon.hide();
						}else{
							field.el.dom.title = '';
						}
					}
				}
			};
			return messageTargets[this.msgTarget];
		},
		markInvalid: function(msg){
			if(!this.rendered || this.preventMark){
				return;
			}
			msg = msg || this.invalidText;
			var mt = this.getMessageHandler();
			if(mt){
				mt.mark(this, msg);
			}else if(this.msgTarget){
				this.el.addClass(this.invalidClass);
				var t = Ext.getDom(this.msgTarget);
				if(t){
					t.innerHTML = msg;
					t.style.display = this.msgDisplay;
				}
			}
			this.activeError = msg;
			this.fireEvent('invalid', this, msg);
			return Ext.form.TextArea.superclass.markInvalid.call(this, [msg]);
		},
		clearInvalid: function(){
			if(!this.rendered || this.preventMark){
				return;
			}
			switch(this.msgTarget){
				case 'qtip':
					this.iframe.qtip = '';
					Ext.get(this.iframe).removeClass(this.invalidClass);
					break;
				case 'side':
					var field = this;
					field.el.removeClass(field.invalidClass);
					if(field.errorIcon){
						field.errorIcon.dom.qtip = '';
						field.errorIcon.hide();
					}else{
						field.el.dom.title = '';
					}
			}
			return Ext.form.TextArea.superclass.clearInvalid.call(this);
		},
		validate:function(){
			if(this.allowBlank==false) {
				var value =this.getRawValue();
				value = value.replace(/&nbsp;/gi,"");
				value = value.replace(/<br>/gi,"");
				value = value.trim();
				if(value != ''){
					this.clearInvalid();
					return true;
				} else {
					this.markInvalid("This field is required.")
					return false;
				}
			} else {
				this.clearInvalid();
				return true;
			}
		},
		validateValue:function(){
			if(this.allowBlank==false) {
				var value =this.getRawValue();
				value = value.replace(/&nbsp;/gi,"");
				value = value.replace(/<br>/gi,"");
				value = value.trim();
				if(value != ''){
					this.clearInvalid();
					return true;
				} else {
					this.markInvalid("This field is required.")
					return false;
				}
			} else {
				this.clearInvalid();
				return true;
			}
		}
	});

	Ext.form.HtmlEditor.prototype.listeners = {
		sync: function(t,html){
			 t.validateValue();
		}
	};
}

function changeExtJSdefaultProperties(){
	Ext.override(Ext.form.DateField, {
		editable: false
	});
	Ext.override(Ext.form.ComboBox, {
		editable: true,
		queryDelay: 750,
		typeAhead: true,
		forceSelection: true
	});
	Ext.override(Ext.grid.GridPanel, {
		loadMask: true
	});
	try{
		Ext.override(Ext.ux.maximgb.tg.EditorGridPanel, {
			loadMask: true
		});
	}catch(e){}
}

function controlWindowMoveOutside(){
	var styleSize = Ext.getBody().getStyleSize();
	maxX_utils = styleSize.width;
	maxY_utils = styleSize.height;
	
	Ext.override( Ext.Window, {
		onPosition: function(x, y){
			// 
			if( x < 0 && y >= 0 )	this.setPosition(0, this.y);
			if( x >= 0 && y < 0)	this.setPosition(this.x, 0);
			if( x < 0 && y < 0)	this.setPosition(0, 0);
			
			if( x > maxX_utils-20 && y < maxY_utils )	this.setPosition(maxX_utils-50, this.y);
			if( x < maxX_utils && y > maxY_utils-20 )	this.setPosition(this.x, maxY_utils-50);
			if( x > maxX_utils-20 && y > maxY_utils-20 )	this.setPosition(maxX_utils-50, maxY_utils-50);
		}
	});
}


function checkServerSession(param){
	if( !started || startedon == param){
		started = true;
		startedon = param;
		Ext.Ajax.request({
			url : 'view/doesSessionExists.jsp?'+addTimeURLParam(),
			success : function(response)
			{
				var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
				var success = jsonDataSuccess.success;
				if( !success ){
					getLoginWindow();
					//last_activity_time = "";
					setTimeout("checkServerSession("+param+")",30000);			// five minute interval
				}else{
					started = false;
					removeLoginWindow();
				}
				// not required to check in Success for now
				// setTimeout("checkServerSession("+param+")",30000);			// five minute interval
			},
			failure: function(){
				getLoginWindow();
				//last_activity_time = "";
				setTimeout("checkServerSession("+param+")",30000);			// five minute interval
			}
		});
	}
}

function showLoginOnServerException(){
	Ext.util.Observable.observeClass(Ext.data.Connection);
	/* Ext.data.Connection.on('requestcomplete', function(dataconn, response){
		last_activity_time = new Date();
	});*/
	Ext.data.Connection.on('requestexception', function(dataconn, response){
		checkServerSession( new Date().getTime() );
	});
}

/*function checkLastServerAccess(){
	var nowTime = new Date();
	if( last_activity_time == "" || ( last_activity_time.getTime() < (nowTime.getTime()-1800000) ) ){
		getLoginWindow();
		last_activity_time = "";
	}else{
		removeLoginWindow();
	}
	setTimeout("checkLastServerAccess()",300000);			// five minute interval
}*/

function getLoginWindow(){
	if( loginFormPanel == null ){
		loginFormPanel = new Ext.form.FormPanel({
			id: 'loginFormPanel',
			border: false,
			bodyStyle: "background-color: transparent",
			style: "padding: 8px 8px 8px 8px; ",
			width: 320,
			autoHeight: true,
			labelWidth: 80,
			defaults: {width: 180},
			defaultType: 'textfield',
			frame: true,
			border: false,
			items: [
				{ xtype: 'box', width: 300, id: 'loginFormHeader', autoEl: { tag: 'div', style:'padding:0 0 0 5px;width:350px', html: 'Your session got timed-out/logout. Please login again.<BR/><BR/>' } },
				{
					fieldLabel: 'User Name',
					name: 'username',
					id: 'username',
					allowBlank:false,
					cls: 'textbox'
				},{
					fieldLabel: 'Password',
					name: 'password',
					id: 'password',
					inputType:'password',
					allowBlank:false,
					cls: 'textbox'
				},
				{ xtype: 'box', id: 'loginFormMessage', autoEl: { tag: 'div', style:'padding: 0 0 0 30px;width:300px', html: '' } }
			],
			buttonAlign: 'center',
			buttons: [
				'','','','','',
				{
					//text: 'Submit',
					iconCls: 'btnSubmit',
					bodyStyle: "border: 0; background-color: transparent",
					handler: loginSession,
					formBind: true,
					keys: new Ext.KeyMap(document, {
						key: Ext.EventObject.ENTER,
						handler: loginSession
					})
				},{
					//text: 'Cancel',
					iconCls: 'icon-button-clear',
					bodyStyle: "border: 0; background-color: transparent",
					handler: resetForm
				}
			]
		});
	}
	
	if( loginWindow == null ){
		loginWindow = new Ext.Window({
			title: 'Login',
			x: maxX_utils/2-160,
			y: maxY_utils/2-100,
			width: 335,
			autoHeight: true,
			plain: true,
			//bodyStyle:'padding:3px;',
			buttonAlign: 'center',
			closable: false,
			closeAction: 'hide',
			modal: true,
			animCollapse: true,
			items: [
				loginFormPanel,
				{ xtype: 'box', id: 'loginFormFooter', autoEl: { tag: 'div', style:'padding: 0 0 0 30px;width:300px', html: '<FONT color="blue">Note: After login, page will be refreshed automatically.</FONT><BR/><BR/>' } }
			]
		});
	}
	loginWindow.show();
	Ext.getCmp("username").focus(true, 1000);
}

function removeLoginWindow(){
	if( loginFormPanel != null ){
		loginWindow.hide();
		if( refreshPanel == null ){
			refreshPanel = new Ext.form.FormPanel({
				border: false,
				bodyStyle: "background-color: transparent",
				style: "padding: 8px 8px 8px 8px; ",
				width: 350,
				autoHeight: true,
				labelWidth: 80,
				defaults: {width: 200},
				defaultType: 'textfield',
				frame: true,
				border: false,
				items: [
					{ xtype: 'box', width: 350, id: 'loginFormHeader', autoEl: { tag: 'div', style:'padding:0 0 0 5px;width:350px', html: 'Your session got reloaded again from another browser tab.<BR/><BR/>' } }
				],
				buttonAlign: 'center',
				buttons: [
					'','','','','',
					{
						text: 'Refresh',
						//iconCls: 'btnSubmit',
						bodyStyle: "border: 0; background-color: transparent",
						handler: reloadPage,
						formBind: true,
						keys: new Ext.KeyMap(document, {
							key: Ext.EventObject.ENTER,
							handler: reloadPage
						})
					}
				]
			});
		}
		
		if( refreshWindow == null ){
			refreshWindow = new Ext.Window
			({
				title: 'Login',
				x: maxX_utils/2-160,
				y: maxY_utils/2-100,
				autoWidth: true,
				autoHeight: true,
				plain: true,
				//bodyStyle:'padding:3px;',
				buttonAlign: 'center',
				closeAction: 'hide',
				closable: false,
				modal: true,
				animCollapse: true,
				items: [
					refreshPanel
				]
			});
			refreshWindow.show();
		}
	}
}

function reloadPage(){
	window.location.reload();
}

function loginSession() {
	if( Ext.getCmp("loginFormPanel").getForm().isValid() ){
		Ext.getCmp("loginFormPanel").getForm().getEl().dom.action = "./loginsession?quickLogin=true";
		Ext.getCmp("loginFormPanel").getForm().submit({
			success: function(){
				reloadPage();
			},
			failure: function(res, req){
				var jsonDataFailure = req.result;
				Ext.getDom('loginFormMessage').innerHTML = '<FONT color="RED">'+jsonDataFailure.errorMessage+'</FONT>';
			}
		});
	}
}

function resetForm(){
	Ext.getCmp("loginFormPanel").getForm().reset();
}


Ext.onReady(function(){
	Ext.Ajax.timeout = 300000;
	Ext.QuickTips.init();
	//	Ext.getBody().on('contextmenu', function(e){e.stopEvent();});	// disable right click on page
	
	getSessionStatus();
	
	showLoginOnServerException();
	
	createVTypeDateField();
	overrideCheckRadioGroup();
	fixHTMLeditorBugs();
	changeExtJSdefaultProperties();
	controlWindowMoveOutside();
});
