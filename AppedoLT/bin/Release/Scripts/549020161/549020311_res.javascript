var importWindow = null;
var importFormPanel = null;
var store_importFileHeaderCombo = null;
var mapColumn = null;
var mapColumnWindow = null;
var importResponse = null;
var strImportTitle = "";
var strStarSymbol = '<FONT COLOR=#FF0000 >*</FONT>';
var BULLET = '<br /><img src="./images/default/shadow-c.png" />&nbsp;&nbsp;';
var strGeneralWindowHeaderNotes = 'Notes:<FONT style="font-weight: normal;" >';
var strGeneralWindowFooterNotes = BULLET+'Write ENDOFFILE in cell - "A", of next-to-last row,<BR/>to avoid invisible text in non-data area.</FONT>'+
								BULLET+'<FONT color="#1010FF" >Supports only Excel in 97/2000/XP format. </FONT><BR/><A class="ux-up-text x-unselectable handCursor" style="color:#1010F0" onclick=\'javascript:openDownloadWindow(SAMPLE_FILE_LOCATION,SAMPLE_FILENAME);\' ><U>Download Sample</U></A><BR/>';
var readNotes = {};
var checkReadNotes = {
	xtype: 'checkbox',
	name: 'readNotes',
	id: 'readNotes',
	hideLabel: true,
	boxLabel: 'I have read and understood the above notes',
	handler: function(){
		if( this.getValue() ){
			Ext.getCmp('btnImportUpload').enable();
		}else{
			Ext.getCmp('btnImportUpload').disable();
		}
	}
};
var bUploadButton = true;

// Creating store for importHeader combo box
store_importFileHeaderCombo = new Ext.data.ArrayStore( {
	fields : [ 'fieldname', 'fieldvalue' ],
	data : []
});

function showImportStep1(params){
	var MODULEID = params.moduleId, importProjectCode = params.projectCode;
	var strSubmitURL = "";
	
	if( MODULEID == MODULEID_ACTIONITEM ){
		strImportTitle = "Import Tasks";
		strBoxLabel = strGeneralWindowHeaderNotes+strGeneralWindowFooterNotes;
		checkReadNotes = {};
		bUploadButton = false;
	} else if( MODULEID == MODULEID_REQUIREMENT ){
		strImportTitle = "Import Requirements";
		if( strReqCodeOption == 'auto' ){
			strBoxLabel = strGeneralWindowHeaderNotes+BULLET+'Requirement-Code is in auto-generate mode.<BR/>So make sure filled Requirement-Codes are reference field for update purpose.<BR/>&nbsp;&nbsp;&nbsp;&nbsp;Leave it blank for new Requirements'+strGeneralWindowFooterNotes;
		}else{
			strBoxLabel = strGeneralWindowHeaderNotes+BULLET+'Requirement-Code is in manual mode.<BR/>So make sure filled Requirement-Codes are new (or) for update purpose.'+strGeneralWindowFooterNotes;
		}
	} else if( MODULEID == MODULEID_TESTPLAN ){
		strImportTitle = "Import Test Cases";
		if( strTpCodeOption == 'auto' ){
			strBoxLabel = strGeneralWindowHeaderNotes+BULLET+'TestCase-Code is in auto-generate mode.<BR/>For new TestCases, fill code as \'ABC\' or \'NEW\' or something does\'t exists.<BR/>And make sure other TestCase-Codes are reference field for update purpose.'+strGeneralWindowFooterNotes;
		}else{
			strBoxLabel = strGeneralWindowHeaderNotes+BULLET+'TestCase-Code is in manual mode.<BR/>So make sure filled TestCase-Codes are new (or) for update purpose.'+strGeneralWindowFooterNotes;
		}
	} else if( MODULEID == MODULEID_DEFECT ){
		strImportTitle = "Import Issues";
		strBoxLabel = strGeneralWindowHeaderNotes+BULLET+'If an issue is being imported for the first time, then Issue-ID must be blank in the spreadsheet.'+
												BULLET+'If the issue exists already and is being updated from the spreadsheet, then enter the Issue-ID in the spreadsheet.'+
												BULLET+'The Issue-Code field is unique-alphanumeric key. For existing Issue, it is updateable during import. So it is required.'+strGeneralWindowFooterNotes;
	}
	
	readNotes = {
		xtype: 'box',
		width: 340,
		autoEl: {
			tag: 'div', style:'padding:0 0 0 5px; width:350px',
			html: strBoxLabel
		}
	};
	if (importFormPanel == null) {
		importFormPanel = new Ext.FormPanel({
			width: 375,
			autoHeight: true,
			frame : true,
			buttonAlign : 'center',
			bodyStyle : 'padding: 10px 10px 0 10px;',
			fileUpload : true,
			enctype : 'multipart/form-data',
			labelWidth : 50,
			defaults : {
				msgTarget : 'side'
			},
			items : [
				{
					xtype : 'textfield',
					border : false,
					inputType : 'File',
					fieldLabel : 'File',
					name : 'file',
					allowBlank : false
				},
				readNotes,
				checkReadNotes
			],
			buttons : [
				{
					text : 'Upload',
					id: 'btnImportUpload',
					disabled: bUploadButton,
					handler : function() {
						var isFormValid = false, cmpReadNotes = Ext.getCmp('readNotes');
						if( cmpReadNotes ){
							if( cmpReadNotes.getValue() ){
								isFormValid = true;
							}
						}else{
							isFormValid = true;
						}
						if( !isFormValid ){
							showInfoWindow( {title : 'Alert', msg : 'Read the notes. And check it.' });
						}else if( importFormPanel.getForm().isValid() ) {
							importFormPanel.getForm().getEl().dom.action = './import?projectCode='+importProjectCode+'&importModule='+MODULEID;
							importFormPanel.getForm().getEl().dom.method = 'POST';
							importFormPanel.getForm().submit({
								waitMsg: 'Uploading file...',
								success : function(res, req) {
									var jsonReturn = req.result;
									// var
									// responseMessage
									// =
									// jsonReturn.data.response;
									importResponse = jsonReturn.data;
									importFormPanel.getForm().reset();
									importWindow.hide();
									Ext.get('importWindow').remove();
									importFormPanel = null;
									importWindow = null;
									showMappingWindow(params, importResponse);
								},
								failure : function(res, req) {
									var jsonReturn = req.result;
									showInfoWindow( {title : 'Error', msg : jsonReturn.errorMessage});
								}
							});
						} else {
							showFormInvalidMsg();
						}
					}
				}, {
					text : 'Close',
					handler : function() {
						importFormPanel.getForm().reset();
						importWindow.hide();
						Ext.get('importWindow').remove();
						importFormPanel = null;
						importWindow = null;
					}
				}
			]
		});
	}

	if (importWindow == null) {
		importWindow = new Ext.Window( {
			title : strImportTitle,
			id : 'importWindow',
			width: 375,
			autoHeight: true,
			layout : 'card',
			plain : true,
			bodyStyle : 'padding:3px;',
			buttonAlign : 'center',
			border : false,
			resizable : false,
			closable : false,
			closeAction : 'hide',
			modal : true,
			animCollapse : true,
			activeItem : 0,
			items : [ importFormPanel ]
		});
	}
	importWindow.show();
}

function showMappingWindow(params, importResponse){

	var MODULEID = params.moduleId, importProjectCode = params.projectCode;
	
	//Loading the store
	store_importFileHeaderCombo.loadData(importResponse.xlsHeaders);
	
	var arrayFieldItems = Ext.util.JSON.decode(importResponse.sdfFieldList)
	
	arrayFieldItems.push({xtype: 'box', width: 340, autoEl: {
		tag: 'div', style:'padding:0 0 0 5px; width:350px',
		html: '<BR/><B>Note</B>: Blue squiggly border around the combo-box represents<BR/>that it was auto-filled, as the Column Heading is same as Field Description.'
	}});
	
	mapColumn = new Ext.FormPanel({
		id: 'formPanel_import',
		width: 200,
		autoHeight: true,
		frame: true,
		buttonAlign: 'center',
		bodyStyle: 'padding: 10px 10px 0 10px;',
		defaults: {
			msgTarget: 'side',
			labelWidth: 150,
			anchor: '92%',
			triggerAction: 'all',
			displayField: 'fieldname',
			valueField: 'fieldvalue',
			mode: 'local',
			emptyText: 'Choose an Excel Column'
		},
		items: arrayFieldItems,
		buttons: [
			{
				text : 'Save',
				handler : function() {
					if (mapColumn.getForm().isValid()) {
						mapColumn.getForm().getEl().dom.action = './importMappedColumns';
						mapColumn.getForm().getEl().dom.method = 'POST';
						mapColumn.getForm().submit({
							waitMsg: 'Importing excel...',
							params: {
								projectCode: importProjectCode,
								importModule: MODULEID,
								fileName: Ext.encode(importResponse.fileName),
								reqParentCode: (params.requirementFolder)? params.requirementFolder:'',
								tcModuleId: params.tp_moduleId,
								tcScenarioCode: params.tp_scenarioCode
							},
							success: function(res, req) {
								var jsonReturn = req.result;
								mapImportResponse = jsonReturn.data;
								showInfoWindow( {title : 'Alert', msg : mapImportResponse.message});
								eval( params.callBack+'()' );
								closeMapWindow();
							},
							failure: function(res, req) {
								var jsonReturn = req.result;
								showInfoWindow( {title : 'Error', msg : jsonReturn.errorMessage});
								/*if( jsonReturn.focusTo ){
									Ext.getCmp(jsonReturn.focusTo).focus(true, 500);
								}*/
							}
						});
					} else {
						showFormInvalidMsg();
					}
				}
			},{
				text: 'Clear',
				handler: clearMapWindow
			},{
				text: 'Back',
				handler: function(){
					showImportWindow(params);
				}
			},{
				text: 'Close',
				handler: closeMapWindow
			}
		]
	});
	
	if (mapColumnWindow == null) {
		mapColumnWindow = new Ext.Window( {
			title: strImportTitle,
			id: 'importWindow',
			y: 5,
			width: 380,
			autoHeight: true,
			layout: 'card',
			plain: true,
			bodyStyle: 'padding:3px;',
			buttonAlign: 'center',
			border: false,
			resizable: false,
			draggable: false,
			closable: false,
			closeAction: 'hide',
			modal: true,
			animCollapse: true,
			activeItem: 0,
			items: [mapColumn]
		});
	}
	mapColumnWindow.show();
	
	// auto-select the excel columns which has same name like the combo-label
	var strFieldLabel = null, index = 0, strFieldValue = null;
	mapColumn.form.items.each(function(field) {
		index = 0;
		strFieldValue = null;
		
		// don't reset SuperCombo's raw value
		if( (field instanceof Ext.form.ComboBox) ){
			strFieldLabel = field.fieldLabel;
			strFieldLabel = strFieldLabel.replace('<FONT COLOR=#FF0000 >\*</FONT>' ,'');
			var index = store_importFileHeaderCombo.findExact( 'fieldname', strFieldLabel );
			if( index >= 0 ){
				strFieldValue = store_importFileHeaderCombo.getAt(index).data.fieldvalue;
				field.addClass('field_autoFilled');		// indicate the field is auto-selected.
				field.setValue(strFieldValue);
			}
		}
	}, mapColumn);
	
	//importResponse.fileName, importResponse.xlsHeaders,importResponse.sdfFieldList
}

function clearComboSelection(comboId){
	var cbImport = Ext.getCmp(comboId);
	cbImport.removeClass('field_autoFilled');		// remove the auto-selected indication.
	if( cbImport.getValue() == "none" ){
		cbImport.clearValue();
	}
}

function clearMapWindow(){
	mapColumn.getForm().reset();
}

function closeMapWindow(){
	mapColumn.getForm().reset();
	mapColumnWindow.hide();
	Ext.get('importWindow').remove();
	mapColumn = null;
	mapColumnWindow = null;
}

function showImportWindow(params){
	closeMapWindow();
	showImportStep1(params);
}