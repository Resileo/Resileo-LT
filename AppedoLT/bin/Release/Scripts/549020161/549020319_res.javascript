/*
 * Variable Declaration
 */
var copiedRowIndex = null;
var strCopyBugId = null;
var gridCmHeader = null, gridMandatories = null, gridProperties = null;
var gridDefects = null, gridFilters = null;
var summary = null;

var strAddUDFFields = null, strEditUDFFields = null;
var strAddUDFParam = null, strEditUDFParam = null;
var addFormLabel = null, addFormLabel_fs1 = null, addFormLabel_fs1_2 = null, addFormLabel_fs2 = null, addFormLabel_fs3 = null, addFormLabel_fs4 = null, addFormLabel_fs5 = null;
var defectPanel = null, Defect_window = null;

var strEditUDFFormMappings = null;
var editFormLabel_fs1a = null, editFormLabel_fs1b1 = null, editFormLabel_fs1b2 = null, editFormLabel_fs1c = null, editFormLabel_fs1d = null, editFormLabel_fs2 = null, editFormLabel_fs3 = null, editFormLabel_fs4 = null, editFormLabel_fs5 = null, editFormLabel_fs6 = null;
var detailedEdit_defect = null, wndDetailedEdit = null;

var historyGridLabel = null;
var historyStore = null, historyPanel = null, History_window = null;

var moduleStore = null;
var moduleProxy = null;
var moduleReader = null;
var projectCombo = null;
var searchDefects = null;
var store = null;
var checkedValue = null;
var g_str_de_projectcode_selected = null;
var projectlistProxy = null;
var projectlistReader = null;
var projectlistStore = null;
var accessRights_buttonAdd = null, accessRights_buttonEdit = null, accessRights_buttonDelete = null, accessRights_buttonSave = null, accessRights_buttonApproveDraft = null, accessRights_buttonImport = null;
var strProjectValidity = null;
var strCurrentDate = null;
var date = null;
//var strDetectedOnDate = null;
var defects_Panel = null;
var defectstore = null;
var projStartDate = null, projEndDate = null;
var sdf_lookupJSON = null, udfGridMapping = null, udfGridFilter = null, jaBugCycleGroupDetails = null;

var extViewWidth = 800;
var extViewHeight = 600;
var frmPanelAttachment = null;


var gridPreSelectedRowIndex = null, gridSelectedRowIndex = null;

/*
 * Main function
 */
Ext.onReady(function(){
	/*
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
		path: '/'+gApplicationName+'/defects.jsp',
		secure: gIsSecuredProtocal
	}));
	*/
	Ext.QuickTips.init();
	
	Ext.Ajax.timeout = 120000;
	Ext.form.Field.prototype.msgTarget = 'side';
	extViewWidth = Ext.getBody().getViewSize().width;
	extViewHeight = Ext.getBody().getViewSize().height;
	
	Ext.get('divPageLoadMask').remove();
	Ext.get('divPageLoad').remove();
	
	maskAll('Initializing toolbar...');
	
	//Creating proxy,reader,store for project drop down box.
	projectlistProxy = new Ext.data.HttpProxy({
		url:'webservercall/userprojects.jsp' //?moduleName = DEFECT'
	});
	
	//var memoryProxy = new Ext.data.MemoryProxy(getProject());
	projectlistReader = new Ext.data.JsonReader(
		{
			root: 'projects'
		},[
			{name: 'projectcode', mapping: 'projectCode'},
			{name: 'projectname', mapping: 'projectName'},
			{name:'defaultproject', mapping:'defaultproject'},
			{name:'startDate', mapping:'startDate'},
			{name:'endDate', mapping:'endDate'}
		]
	);
	projectlistStore = new Ext.data.Store({
		proxy:projectlistProxy,
		reader:projectlistReader
	});
	
	projectCombo = new Ext.form.ComboBox({
		id:'projectCode_all',
		//xtype : 'combo',
		emptyText:'',
		triggerAction : 'all',
		hiddenName:'de_projectcode_selected',
		displayField :'projectname',
		valueField : 'projectcode',
		store :projectlistStore,
		mode: 'local',
		editable: false,
		readOnly: isFromTestRun,
		listeners:{
			select: function(combo, record, index)
			{
				AssignProjectCode(Ext.getDom("de_projectcode_selected").value, 'loadSDFLabels' );
				g_str_de_projectcode_selected = record.data.projectcode;
				// loadSDFLabels();
			}
		}
	});
	projectlistStore.on('load', function() {
		//projectCombo.setValue(getProjectCode());
		
		var sessionProject = getProjectCode();
		if(sessionProject == "" || sessionProject == null)
		{
			var defaultproject = projectlistStore.getAt(0).data.defaultproject;
			if( defaultproject != "" ){
				projectCombo.setValue(defaultproject);
				AssignProjectCode(defaultproject, loadSDFLabels);
				//loadSDFLabels();
			}
		}else{
			projectCombo.setValue(sessionProject);
			formMenuItems();		//from menu.js
			loadSDFLabels();
		}
	});
	projectlistStore.load();
	
	searchDefects = new Ext.app.SearchField({
		id: 'searchDefects',
		store: defectstore,		// assign the store once again after store inizialization
		params: {start: 0, limit: 20},
		width: 200,
		emptyText: 'Quick search on title & description'
	});
	
	//toolbar to display the project combo box
	var defectToolbar = new Ext.Toolbar({
		height: 33,
		border: false,
		bodyStyle: "background-color: transparent",
		bodyBorder: false,
		items : [
			{ xtype: 'box', id: 'pageHeaderImg', autoEl: { tag: 'img', id: 'sdfImageLabel', alt:'Issues', style:'top:0; height: 24px; width: 24px; padding-right:5px;', src: './images/spcg/report_bug_24x24.gif' } },
			{ xtype: 'box', id: 'pageHeader', autoEl: { tag: 'div', id: 'sdfMenuLabel', cls: 'PageHeaderText', html: '' } },
			'','',
			'Projects',
			projectCombo,
			'','',{
				xtype: 'checkbox',
				boxLabel: 'Drafts Only',
				name: 'chkDraftOnly', 
				id: 'chkDraftOnly',
				checked: false,
				handler: function() {
					var bDraftOnly = this.getValue();
					Ext.getCmp( getIssuesGridPanelName() ).store.setBaseParam( 'draftOnly', bDraftOnly );
					reloadDefectsGrid();
				}
			},'','',{
				text:'Frame View',
				id: 'buttonFrameView',
				name: 'buttonFrameView',
				iconCls:'icon-button-frameview',
				tooltip:'Frame View',
				handler: function(){
					showDefectsFv()
				}
			},'','-','',
			'Search', searchDefects
		]
	});
	
	var myPanel = new Ext.Panel
	({
		width: extViewWidth,
		height: 30,
		id: 'panelId',
		layout: 'fit',
		border: false,
		bodyStyle: "background-color: transparent",
		bodyBorder: false,
		collapsible: false,
		renderTo: 'panel',
		tbar: defectToolbar
	});
	disableExtraDiv();
	
	unMaskAll();

/*	window.onresize = function(){
		if( Ext.getCmp("defectsEditorGrid") ){
			Ext.getCmp("defectsEditorGrid").setHeight( extViewHeight - Ext.get("defectdetails-grid").getTop() );
			Ext.getCmp("defectsEditorGrid").setWidth( extViewWidth );
		}
		if( Ext.getCmp("panelId") ){
			Ext.getCmp("panelId").setWidth( extViewWidth );
		}
	};*/
});

function highlightCopiedRow(){
	// de-selected previous select row
	deHighlightRow(copiedRowIndex);
	// highlight selected row
	copiedRowIndex = gridDefects.getView().getRow(gridSelectedRowIndex);
	//Ext.get(copiedRowIndex).highlight();
	Ext.get(copiedRowIndex).setStyle("background-color","7FFF00");
	Ext.get(copiedRowIndex).setStyle("filter","alpha(opacity=40)");
	
	// de-select the particular row
	var smodel = gridDefects.getSelectionModel();
	var gridLocked = smodel.isLocked();
	if( gridLocked ){	smodel.unlock();	}		// unlock grid, if it is locked.
	smodel.clearSelections();
	if( gridLocked ){	smodel.lock();	}			// lock the grid, if it was locked
}

function deHighlightRow(rowIndex){
	var preselectedRow = null;
	if( rowIndex!= null ){
		if( rowIndex >= 0 ){
			preselectedRow = gridDefects.getView().getRow(rowIndex);
		}else{
			preselectedRow = rowIndex;
		}
		if( preselectedRow ){
			Ext.get(preselectedRow).setStyle("background-color","#FAFAFA");
		}
	}
}

function selectRow(grid, rowIndex, cellIndex, e){
	gridPreSelectedRowIndex = gridSelectedRowIndex;
	gridSelectedRowIndex = rowIndex;
}

function displayDefectGrid(){
	maskAll('Loading data');
	
	/*
	* JSONReader for Defect Grid
	*/
	var de_grid_jreader = new Ext.data.JsonReader(
		{ root:'results', totalProperty:'total' },
		udfGridMapping
	);
	
	//var var_de_projectcode_selected = '';
	defectstore = new Ext.data.GroupingStore({
		autoLoad: false,
		proxy: new Ext.data.HttpProxy({
			url: 'defectGridDisplay.jsp'
		}),
		reader: de_grid_jreader,
		sortInfo: {field: 'BugId', direction: 'DESC'},	// default sorting
		remoteSort: true,
		remoteGroup: true,
		groupOnSort: false		// Sort bfr Group (but group will happen in local first, then remote sorted data ll come & group ll happen)
	});
	
	// add the grouped field details. (so tht) the resultset ll be ordered by this field and thn the sorting details.
	defectstore.on('beforeload', function(){
		// as it groups on first time itself, it set after first load
		if( this.groupField ){
			this.setBaseParam("groupField", this.groupField);
			this.setBaseParam("groupDir", this.groupDir);
		} else {
			this.setBaseParam("groupField", null);
			this.setBaseParam("groupDir", null);
		}
	});
	defectstore.on('load', function(){
		// as it groups on first time itself, it set after first load
		/*if( defectstore.groupOnSort != true ){
			defectstore.groupField = '';
			defectstore.groupOnSort = true;
		}*/
		highLightDraftRows();
	});
	
	searchDefects.store = defectstore;
	
	gridFilters = new Ext.ux.grid.GridFilters(
		{	filters: udfGridFilter }
	);
	
	setGridPropsFilter(gridFilters);
	
	//Creating a add/update function
	var addUpdateInlineDefects = function() {
		if( !strProjectValidity ){
			showInfoWindow({title:'Message', msg: 'Project/User-in-project date is expired'});
		}else{
			var modified = defectstore.getModifiedRecords();
			if (modified.length > 0)
			{
				var valid = '', strColumnName = '', invalidColumns = [];
				var recordsToSend = [];
				
				Ext.each(modified, function(record){
					// loop on the grid data
					for (var i = 0; i < record.fields.getCount(); ++i){
						strColumnName = record.fields.get(i).name;
						// check whether column is mandatory
						if( gridMandatories[strColumnName] ){
							// check whether column's data is blank
							if( record.data[strColumnName] == "" ){
								// check whether column is available for add
								if( ( (gridMandatories[strColumnName] == 'ADD' || gridMandatories[strColumnName] == 'BOTH') && record.data.BugId == '' ) || gridMandatories[strColumnName] == 'EDIT' || gridMandatories[strColumnName] == 'BOTH' ){
									valid = 'mandatory missing';
									invalidColumns.push(strColumnName);
								}
							}
						}
					}
					
					if( valid == 'mandatory missing' ){
					}else if( ( record.data.BugId == null || record.data.BugId == 'undefined' || record.data.BugId == "" ) && record.data.status != jaBugCycleGroupDetails.START_FROM ){
						valid = 'invalid new status';
					}else if( (record.data.BugId+"").substring(0, 1) == DEFECT_DRAFT_INITIAL && record.data.status != "New" ){
						valid = 'draft issue';
					}else{
						recordsToSend.push(record.data);
					}
				});
				
				if( valid == 'mandatory missing' ){
					showInfoWindow({title:'Error', msg:'Mandatory columns '+invalidColumns.join(', ')+' are missing data.'});
				}else if(valid == 'invalid new status'){
					showInfoWindow({title:'Error', msg:'Invalid status for new issue.<BR/>"'+jaBugCycleGroupDetails.START_FROM+'" should be the starting status.'});
				}else if(valid == 'draft issue'){
					showInfoWindow({title:'Error', msg:'Status can\'t be changed<BR/>for draft issue.'});
				}else{
					var grid = Ext.getCmp( getIssuesGridPanelName() );
					grid.el.mask('Updating', 'x-mask-loading');
					grid.stopEditing();
					recordsToSend = Ext.encode(recordsToSend);
					Ext.Ajax.request({
						url : './addUpdateDefects',
						params : {
							recordsToInsertUpdate : recordsToSend,
							projectCode_all:Ext.getDom("de_projectcode_selected").value
						},
						success : function(response)
						{
							var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
							var successMessage = jsonDataSuccess.data.response;
							showInfoWindow({title:'Alert', msg:successMessage});
							defectstore.commitChanges();
							reloadSamePage();
							grid.el.unmask();
						},
						failure : function(response)
						{
							var jsonDataFailure = Ext.util.JSON.decode( response.responseText);
							var failureMessage = jsonDataFailure.data.response;
							showInfoWindow({title:'Error', msg:failureMessage});
							grid.el.unmask();
						}
					});
				}
			}
		}
	};
	
	//Creating a function for changes rejects
	var onRejectChanges = function()
	{
		defectstore.rejectChanges();
		highLightDraftRows();
	};
	
	//Creating a new record for add defect
	var Contact = Ext.data.Record.create([
		//{name: 'BugId'},
		{name: 'Title', type: 'string',allowBlank:false},
		{name: 'status', type: 'string',allowBlank:false},
		{name: 'severity', type: 'string'},
		{name: 'priority', type: 'string',allowBlank:false},
		{name:'detectedon', type:'date', dateFormat: 'm/d/Y',allowBlank:false},
		{name: 'buildnumber'},
		{name: 'testRound', type: 'string'}
	]);
	//Creating a combo box for status field
	
	//Creating a textArea box
	var textAreaNew = {
		xtype:'textarea',
		fieldLabel:'extra'
	};
	
	var toolBar = {
		xtype: 'paging',
		store: defectstore,
		id: 'de_grid_ToolBar',
		name: 'de_grid_ToolBar',
		pageSize: 20,
		displayInfo: true,
		items:[
			'-','','',
			{
				text: 'New Issue',
				iconCls: 'icon-button-addDefectButton',
				hidden: !accessRights_buttonAdd,
				enableToggle: false,
				defaultType: 'button',
				split: false,
				menu: new Ext.menu.Menu({
				items:
					[{
						text: 'Quick Add',
						iconCls: 'icon-button-quickadd16',
						handler: function()
						{
							Ext.Ajax.request({
								url: 'view/cyclevalidation.jsp',
								success: function(response)
								{
									var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
									var successMessage = jsonDataSuccess.data.response;
									if(successMessage == 'success'){
										var e = new Contact ({
											Title: '',
											status: jaBugCycleGroupDetails.START_FROM,
											severity: '',
											priority: '',
											detectedon: strDetectedDate,
											buildnumber: '',
											testRound: '',
											ScreenName: '',
											Comments: '',
											RootCause: '',
											ResolutionDetails: '',
											TestedBy: gLoginUserId,
											testedByFirstName: '',
											testedByLastName: '',
											AssignedTo: ''
										});
										gridDefects.stopEditing();
										defectstore.insert(0, e);
										gridDefects.getView().refresh();
										gridDefects.getSelectionModel().selectRow(0);
										Ext.getCmp('dateCreatedOnInlEd').setMinValue(projStartDate);
										Ext.getCmp('dateCreatedOnInlEd').setMaxValue((new Date()).format('Y-m-d'));
										gridDefects.startEditing(0);
									}else{
										showInfoWindow({title:'Alert', msg:'Select an Issue-Cycle'});
									}
								}
							});
						}
					},{
						text: 'Detailed Add',
						iconCls: 'icon-button-detailedadd16',
						handler: showWindowAddDetailedDefect
					}]
				})
			},'','',{
				text: 'Save',
				tooltip: 'Save the edited & added data in grid',
				hidden: !accessRights_buttonSave,
				iconCls: 'icon-button-save16',
				//hidden: accessRights_buttonEdit,
				handler: addUpdateInlineDefects
			},'','',/*{
				text: 'Draft',
				hidden: !accessRights_buttonSave,
				//iconCls: 'icon-button-save16',
				//hidden: accessRights_buttonEdit,
				handler: addSaveDefectAsDraft
			},'',*/{
				xtype: 'tbbutton',
				text: 'Reject Changes',
				tooltip: 'Reject the edited & added data in grid',
				hidden: !accessRights_buttonSave,
				iconCls: 'icon-button-reject16',
				handler: onRejectChanges
			},'-',{
				text: 'Import',
				iconCls: 'icon-button-import',
				hidden: !accessRights_buttonImport,
				handler: getDefimportDefectWindow
			},'',{
				text: 'Export',
				iconCls: 'icon-button-export',
				//hidden: strEditReq,
				handler: function(){
					showExportDataWindow({ moduleId: MODULEID_DEFECT, projectCode: Ext.getDom("de_projectcode_selected").value, gridId: getIssuesGridPanelName() });
				}
			},'-',{
				xtype: 'tbbutton',
				text: 'Copy/Paste',
				id: 'copy',
				iconCls: 'icon-menu-copy',
				handler: copyPasteDefect
				
			},'-',{
				xtype: 'tbbutton',
				text: 'Traceability',
				iconCls: 'icon-menu-traceability',
				handler: function(){
					var strId = null;
					var selectedKeys = gridDefects.selModel.selections.keys;//returns array of selected rows ids only
					if (selectedKeys.length > 0) {
						strId = gridDefects.getSelectionModel().getSelected().get('BugId');
					}
					getTraceability(strId, Ext.getDom("de_projectcode_selected").value, Ext.getCmp('projectCode_all').getRawValue(), "Issue");
				}
			}, '->', '-', getGridSettingsMenu({ gridId: getIssuesGridPanelName(), projectCode: Ext.getCmp('projectCode_all').getValue(), moduleId: MODULEID_DEFECT })
		]
	};
	
	var currdate = new Date();
	strDetectedDate = currdate.format('Y-m-d');
	
	//Paging toolbar for Defect Grid
	var pagingToolbar = {
		xtype: 'paging',
		store: defectstore,
		id: 'de_grid_pagiToolBar',
		name: 'de_grid_pagiToolBar',
		pageSize : 20,
		displayInfo : true,
		items: [
			'','',
			{
				text: 'New Issue',
				hidden: !accessRights_buttonAdd,
				iconCls:'icon-button-addDefectButton',
				xtype:'tbsplit',
				menu: new Ext.menu.Menu({
					items: [{
						text:'Quick Add',
						iconCls:'icon-button-quickadd16',
						handler: function()
						{
							Ext.Ajax.request({
									url : 'view/cyclevalidation.jsp',
									success : function(response)
									{
										var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
										var successMessage = jsonDataSuccess.data.response;
										if(successMessage == 'success'){
											var e = new Contact
											({
												Title: '',
												status: 'New',
												severity:'',
												priority:'',
												detectedon:strDetectedDate,
												buildnumber: '',
												testRound:''
											});
											gridDefects.stopEditing();
											defectstore.insert(0, e);
											gridDefects.getView().refresh();
											gridDefects.getSelectionModel().selectRow(0);
											gridDefects.startEditing(0);
										} else {
											showInfoWindow({title:'Alert', msg:'Select an Issue-Cycle'});
										}
									}
								});
						}
					},
					{
						text: 'Detailed Add',
						iconCls: 'icon-button-detailedadd16',
						handler: showWindowAddDetailedDefect
					}]
				})
			},'','',{
				xtype: 'tbbutton',
				text: 'Save',
				tooltip: 'Save the edited & added data in grid',
				iconCls: 'icon-button-save16',
				hidden: !accessRights_buttonSave,
				handler: addUpdateInlineDefects
			},'','',/*{
				text: 'Draft',
				hidden: !accessRights_buttonSave,
				//iconCls: 'icon-button-save16',
				//hidden: accessRights_buttonEdit,
				handler: addSaveDefectAsDraft
			},'',*/{
				xtype: 'tbbutton',
				text : 'Reject Changes',
				tooltip: 'Reject the edited & added data in grid',
				hidden: !accessRights_buttonSave,
				iconCls: 'icon-button-reject16',
				handler: onRejectChanges
			}
		]
	};
	
	summary = new Ext.ux.grid.GroupSummary();
	
	//Creating a editor grid
	gridDefects = new Ext.grid.EditorGridPanel({
		name: getIssuesGridPanelName(),
		id : getIssuesGridPanelName(),
		store: defectstore,
		width: extViewWidth,
		height: ( extViewHeight - Ext.get("div_defectspanelChild").getTop() ),
		autoSizeColumns: true,
		columns :gridCmHeader,//getGridColumnHeader(),
		mode: 'local',
		//loadMask : true,
		layout: 'fit',
		collapsible : false,
		tbar: toolBar,
		bbar: pagingToolbar,
		stripeRows : true,
		enableColLock: false,
		view: new Ext.grid.GroupingView({
			groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Issues" : "Issue"]})'
		}),
		plugins: [ gridFilters, summary ],
		//renderTo:'defectdetails-grid',
		clicksToEdit: 2,
		selModel: new Ext.grid.RowSelectionModel ({singleSelect: true }),
		listeners: {
			cellclick: function(grid, rowIndex, cellIndex, e) {
				selectRow(grid, rowIndex, cellIndex, e);
			},
			beforeedit: function(e) {
				if( !strProjectValidity ){
					showInfoWindow({title:'Message', msg: 'Project/User-in-project date is expired'});
					return false;
				}
			}
		}
	});
	
	gridDefects.on('afteredit',function(e){
		var storeGrid = Ext.getCmp( getIssuesGridPanelName() ).store;
		var bugId = e.record.get('BugId');
		if( isDraftId(bugId) ){
			// highlight draft row
			var index = storeGrid.indexOf(e.record);
			var rowIndex = Ext.getCmp( getIssuesGridPanelName() ).getView().getRow(index);
			Ext.get(rowIndex).setStyle("background-color","#CAEEFF");
			Ext.get(rowIndex).setStyle("filter","alpha(opacity=40)");
		}
		
		// refresh Filtered & Sorting details
		getFilterDetailsText({gridId: getIssuesGridPanelName()});
	});
	
	loadSettingsIntoGrid();
	
	Ext.get('div_defectspanelChild').remove();
	Ext.get('div_defectsParent').createChild('<div id = "div_defectspanelChild"></div>');
	defects_Panel = new Ext.Panel({
		width: extViewWidth,
		height: ( extViewHeight - Ext.get("div_defectspanelChild").getTop() ),
		id:	'defects_panelId',
		layout: 'fit',
		collapsible: false,
		items:[ gridDefects ]
	});
	if( !isFromTestRun ){
		loadProject();
	}else{
		unMaskAll();
	}
	defects_Panel.render('div_defectspanelChild');
}

function getIssuesGridPanelName(){
	return 'defectsEditorGrid_'+Ext.getCmp('projectCode_all').getValue();
}

function highLightDraftRows(){
	var storeGrid = Ext.getCmp( getIssuesGridPanelName() ).store;
	storeGrid.each(function(record, index) {
		var bugId = record.get('BugId');
		if( isDraftId(bugId) ){
			// highlight draft row
			var rowIndex = Ext.getCmp( getIssuesGridPanelName() ).getView().getRow(index);
			Ext.get(rowIndex).setStyle("background-color","#CAEEFF");
			Ext.get(rowIndex).setStyle("filter","alpha(opacity=40)");
		}
	});
	
	// refresh Filtered & Sorting details
	getFilterDetailsText({gridId: getIssuesGridPanelName()});
}

function showWindowAddDetailedDefect(){
	if( !strProjectValidity ){
		showInfoWindow({title:'Message', msg: 'Project/User-in-project date is expired'});
	}else{
		Ext.Ajax.request({
			url : 'view/cyclevalidation.jsp',
			success : function(response)
			{
				var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
				var successMessage = jsonDataSuccess.data.response;
				if(successMessage == 'success'){
					addDefect_detailed();
				}
				else
				{
					showInfoWindow({title:'Alert', msg:'Select an Issue-Cycle'});
				}
			}
		});
	}
}

/**
 * Creating proxy,reader & store for history grid
 */
function createHistoryGrid(){
	var historyProxy = new Ext.data.HttpProxy({
		url:'defectsHistory.jsp'
	});
	var historyReader = new Ext.data.JsonReader(
		{root:'results'}, [
			{name:'BugId', mapping:'BugId'},
			{name:'BugCode', mapping:'BugCode'},
			{name:'Title', mapping:'Title'},
			{name:'Description', mapping:'Description'},
			{name:'Status', mapping:'Status'},
			{name:'AssignedTo', mapping:'AssignedTo'},
			{name:'TestedBy', mapping:'TestedBy'},
			{name:'CreatedDate', mapping:'CreatedDate'},
			{name:'ModifiedBy', mapping:'ModifiedBy'},
			{name:'ModifiedDate', mapping:'ModifiedDate'},
			{name:'Priority', mapping:'Priority'},
			{name:'Severity', mapping:'Severity'},
			{name:'version', mapping:'version'},
			{name:'buildNumber', mapping:'buildNumber'},
			{name:'reproducible', mapping:'Reproducible'},
			{name:'testRoundName', mapping:'testRoundName'},
			{name:'ModuleId', mapping:'ModuleId'},
			{name:'ModuleName', mapping:'ModuleName'},
			{name:'ScenarioCode', mapping:'ScenarioCode'},
			{name:'ScenarioName', mapping:'ScenarioName'},
			{name:'TestCaseId', mapping:'TestCaseId'},
			{name:'TestCaseName', mapping:'TestCaseName'},
			{name:'ScreenName', mapping:'ScreenName'},
			{name:'comments', mapping:'comments'},
			{name:'host', mapping:'host'},
			{name:'rootCause', mapping:'rootCause'},
			{name:'resolutionDetails', mapping:'resolutionDetails'}
		]
	);
	historyStore = new Ext.data.Store({
		proxy: historyProxy,
		reader: historyReader
	});
	//historyStore.load();
	//Creating history panel inorder to display grid in a panel
	historyPanel = new Ext.grid.GridPanel({
		id: 'historyPanel',
		name: 'historyPanel',
		store: historyStore,
		columns: historyGridLabel,
		//title:'Defect History',
		//frame:true,
		height:250,
		width: extViewWidth-10,
		loadMask:true,
		stripeRows: true
	});
	//Creating a new window in order to show the history grid
	History_window = new Ext.Window({
		title: 'Issue History',
		x: 5,
		y: 20,
		width: extViewWidth-10,
		height:550,
		autoScroll: true,
		layout:'card',
		plain:true,
		//bodyStyle:'padding:3px;',
		buttonAlign:'center',
		closeAction:'hide',
		modal: true,
		animCollapse:true,
		activeItem:0,
		items: [
			historyPanel
		]
	});
}

//Function for deleting the selected record
function handleDelete() {
	if( !strProjectValidity ){
		showInfoWindow({title:'Message', msg: 'Project/User-in-project date is expired'});
	}else{
		var selectedKeys = gridDefects.selModel.selections.keys; //returns array of selected rows ids only
		if(selectedKeys.length > 0)
		{
			Ext.MessageBox.confirm('Message','Do you really want to delete selection?', deleteRecord);
		}
		else
		{
			showInfoWindow({title:'Alert', msg:'Select atleast one Issue'});
		}//end if/else block
	}
};
function deleteRecord(btn)
{
	if(btn == 'yes')
	{
		var selectedRow = [];
		selectedRow = gridDefects.getSelectionModel().getSelected();	//returns record object for the most recently selected
		
		if( selectedRow.data.BugId != 'undefined' && selectedRow.data.BugId != null ){
			Ext.Ajax.request( //alternative to Ext.form.FormPanel? or Ext.BasicForm.submit
			{
				url: './deleteDefect', //url to server side script
				params: {
					projectCode: Ext.getDom("de_projectcode_selected").value,
					bugId : selectedRow.data.BugId
				},
				success : function(response) {
					var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
					var message = jsonDataSuccess.data.response;
					if( jsonDataSuccess.success == true ){
						if(selectedRow) {
							defectstore.remove(selectedRow);
						}
						showInfoWindow({title:'Deleted', msg: message});
					} else {
						showInfoWindow({title:'Error', msg: message});
					}
					gridDefects.el.unmask();
				},
				failure : function(response) {
					var jsonDataFailure = Ext.util.JSON.decode( response.responseText);
					var failureMessage = jsonDataFailure.data.response;
					showInfoWindow({title:'Error', msg:failureMessage});
					gridDefects.el.unmask();
				}
			});
		} else {
			if(selectedRow) {
				defectstore.remove(selectedRow);
			}
		}
	}
}

//function addSaveDefectAsDraft(){}

function addDetailedDefect(params){
	trimAllText(defectPanel);
	if( organizeUploadedFiles('de_uppanel_add') == false ){
		return false;
	}else if( defectPanel.getForm().isValid() ){
		defectPanel.el.mask('Adding', 'x-mask-loading');
		
		if( params.operation == 'DEFECT' ){
			defectPanel.getForm().getEl().dom.action = './addDetailedDefect';
		}else if( params.operation == 'SaveAsDraft' ){
			defectPanel.getForm().getEl().dom.action = './addDetailedDefectAsDraft';
		}
		defectPanel.getForm().getEl().dom.method = 'POST';
		defectPanel.getForm().submit({
			waitMsg: 'Adding...',
			params: {
				projectCode_all: (Ext.getCmp('projectCode_all') || Ext.getCmp('def_projectcode')).getValue()
			},
			success : function(res,req)
			{
				gridDefects.el.unmask();
				defectPanel.el.unmask();
				defectPanel.getForm().reset();
				Ext.getCmp('de_uppanel_add').onRemoveAllClick();
				var jsonDataSuccess = req.result;
				var successMessage = jsonDataSuccess.data.response;
				focusAddIssueTitleField();
				showInfoWindow({title:'Add', msg:successMessage});
			},
			failure : function(res,req)
			{
				gridDefects.el.unmask();
				defectPanel.el.unmask();
				var jsonDataFailure = req.result;
				if( jsonDataFailure ){
					var failureMessage = jsonDataFailure.data.response;
					showInfoWindow({title:'Alert', msg:failureMessage});
				}
				focusAddIssueTitleField();
			}
		});
	}else{ showFormInvalidMsg(); }
}

function editDetailedDefect(param){
	trimAllText(detailedEdit_defect);
	if( organizeUploadedFiles('de_uppanel_edit') == false ){
		return false;
	}else if( detailedEdit_defect.getForm().isValid() ){
		//detailedEdit_defect.el.mask('Updating', 'x-mask-loading');
		if( param.operation == 'editDetailedDefect' ){
			detailedEdit_defect.getForm().getEl().dom.action = './detailedEditDefect';
		}else if( param.operation == 'approveDefectDraft' ){
			detailedEdit_defect.getForm().getEl().dom.action = './approveDefectDraft';
		}
		detailedEdit_defect.getForm().getEl().dom.method = 'POST';
		detailedEdit_defect.getForm().submit({
			waitMsg: 'Updating...',
			params: {
				projectCode_all: Ext.getDom('de_projectcode_selected').value
			},
			success : function(res,req)
			{
				var jsonDataSuccess = req.result;
				var successMessage = jsonDataSuccess.data.message;
				showInfoWindow({title:'Success', msg:successMessage});
				Ext.getCmp('de_uppanel_edit').getStore().removeAll();
				editWinClose();
				maskAll('Reloading Grid...');
				reloadSamePage();
				//removeEditFormWindow();
			},
			failure : function(res,req)
			{
				var jsonDataFailure = req.result;
				var failureMessage = jsonDataFailure.errorMessage;
				showInfoWindow({title:'Error', msg:failureMessage});
			}
		});
	}else{ showFormInvalidMsg(); }
}

//functioncall for Edit Defect form
function detailedEdit(readBugId, strStatus)
{
	if( !strProjectValidity ){
		showInfoWindow({title:'Message', msg: 'Project/User-in-project date is expired'});
		return false;	
	}
	if( readBugId == 'undefined' || readBugId == null ){
		showInfoWindow({title:'Message', msg:'Undefined issue. Can\'t be processed.'});
		return false;
	}
	Ext.Ajax.request({
		url : 'view/cyclevalidation.jsp',
		params: {currentStatus: strStatus},
		success: function(response) {
			var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
			var successMessage = jsonDataSuccess.data.response;
			if(successMessage == 'success'){
				statusStore_Edit.loadData(jsonDataSuccess.data.statusArray);
				if( detailedEdit_defect == null ){
					detailedEdit_defect = new Ext.FormPanel({
						name: 'detailedDefectEdit',
						id: 'detailedDefectEdit',
						autoHeight:true,
						frame:true,
						//height:400,
						width: 1000,
						buttonAlign: 'center',
						bodyStyle:'padding: 3px',
						reader : new Ext.data.JsonReader
						(
							{ success: '@success' },
							strEditUDFFormMappings
						),
						items:
						[{
							xtype:'fieldset',
							layout:'column',
							border:false,
							items:[
							{
								xtype:'fieldset',
								columnWidth:.5,
								border: false,
								layout: 'column',
								items:[{
											columnWidth: 1,
											layout: 'form',
											items: editFormLabel_fs1a
										},{
											xtype: 'fieldset',
											columnWidth: 1,
											layout: 'column',
											border: false,
											items:[{
												columnWidth: .5,
												layout: 'form',
												items: editFormLabel_fs1b1
											},{
												columnWidth: .5,
												layout: 'form',
												labelWidth: 110,
												items: editFormLabel_fs1b2
											}]
										},{
											columnWidth: 1,
											layout: 'form',
											labelWidth: 200,
											items: editFormLabel_fs1c
										},{
											columnWidth: 1,
											layout: 'form',
											items: editFormLabel_fs1d
										},{
											xtype: 'fieldset',
											columnWidth: 1,
											layout: 'column',
											border: false,
											items:[{
												columnWidth: .5,
												layout: 'form',
												items: editFormLabel_fs2
											},{
												columnWidth:.5,
												layout: 'form',
												items: editFormLabel_fs3
											}]
										},{
											columnWidth: 1,
											layout: 'form',
											items: editFormLabel_fs4
										}
									]
								},{
									columnWidth: .5,
									layout: 'form',
									items: editFormLabel_fs5
								},{
									columnWidth: .5,
									layout: 'form',
									labelWidth: 200,
									items: [
										editFormLabel_fs6,
										{xtype:'uploadpanel',width:472,buttonsAt:'tbar',id:'de_uppanel_edit',name:'de_uppanel_edit',url:'./uploadFile?module=issue',path:'root',maxFileSize:1048576,enableProgress:false},
										{xtype:'hidden',id:'de_uppanel_edit_hdn',name:'de_uppanel_edit_hdn',value: '[]'}
									]
								}]
							},{
								xtype:'fieldset',
								layout:'column',
								border: false,
								items:[{columnWidth:1,layout: 'form',border: false,items: strEditUDFFields}]
							}],
							buttons:
							[{
								//text: 'Save',
								iconCls: 'icon-button-save',
								handler: function(){
									editDetailedDefect({ operation: 'editDetailedDefect' });
								}
							},{
								text: 'Approve',
								name: 'button_approveDraft_edit',
								id: 'button_approveDraft_edit',
								//iconCls: 'icon-button-close',
								handler: function(){
									editDetailedDefect({ operation: 'approveDefectDraft' });
								}
							},{
								//text: 'Save',
								iconCls: 'icon-button-clear',
								handler: function(){
									loadIssueForEdit(readBugId, strStatus);
								}
							},{
								iconCls: 'icon-button-close',
								handler: editWinClose
							}
						]
					});
				}
				
				//Window to show the Edit Defect form
				if( wndDetailedEdit == null ){
					wndDetailedEdit = new Ext.Window({
						width: 1000,
						id: 'editFormWnd',
						autoHeight: true,
						//height:550,
						y: 5,
						layout: 'card',
						plain: true,
						//bodyStyle:'padding:3px;',
						border: false,
						resizable: false,
						// draggable: false,
						closable: false,
						//closeAction: 'hide',
						modal: true,
						animCollapse: true,
						activeItem: 0,
						items: [detailedEdit_defect],
						tbar:[
							'<b><font color="#15428B">Edit Issue</font></b>','->',
							{
								iconCls: 'icon-button-closex',
								handler: editWinClose
							}
						]
					});
				}
				wndDetailedEdit.show();
				
				// load edit window
				loadIssueForEdit(readBugId, strStatus);
			} else {
				showInfoWindow({title:'Alert', msg:'Select an Issue-Cycle'});
			}
		
		}
	});
}

// load edit window
function loadIssueForEdit(readBugId, strStatus){
	detailedEdit_defect.getForm().load({
		url: 'detailedDefectEditJson.jsp',
		waitMsg: 'Loading Issues...',
		params: {
			BugId: readBugId,
			projectCode: Ext.getDom("de_projectcode_selected").value },
		success: function ()
		{
			showEditModuleListOptions();
			getAssignableUserID(strStatus);
			Ext.getCmp('exp_closeDate_edit').setMaxValue( projEndDate );
			if( isDraftId(readBugId) ){
				Ext.getCmp('status_edit_').setReadOnly( true );
				Ext.getCmp('detectedon_edit').setDisabled( false );
			}else{
				Ext.getCmp('status_edit_').setReadOnly( false );
				Ext.getCmp('detectedon_edit').setDisabled( true );
			}
			if( !(isDraftId(readBugId) && accessRights_buttonApproveDraft == true) ){
				Ext.getCmp('button_approveDraft_edit').setDisabled( true );
			}else{
				Ext.getCmp('button_approveDraft_edit').setDisabled( false );
			}
		}
	});
	
	if( isDraftId(readBugId) ){
		getUploadedFiles('issueDraft', 'bugId='+readBugId.substring(DEFECT_DRAFT_INITIAL.length), 'de_uppanel_edit');
	}else{
		getUploadedFiles('issue', 'bugId='+readBugId, 'de_uppanel_edit');
	}
}

//close action for edit window
function editWinClose(){
	detailedEdit_defect.getForm().reset();
	Ext.getCmp('de_uppanel_edit').getStore().removeAll();
	Ext.getCmp('de_uppanel_edit').onRemoveAllClick();
	wndDetailedEdit.hide();
	
	removeEditFormPanel();
	removeEditFormWindow();
}

function getAssignableUserIdForInlineAdd(){
	var strStatus = Ext.getCmp('cmbStatusInlEd').getRawValue();
	getAssignableUserID(strStatus);
}

function getAssignableUserIdForDetailedAdd(){
	var strStatus = Ext.getDom('status_edit_hdn').value;
	getAssignableUserID(strStatus);
}

function getAssignableUserID(strStatus){
	assignedToStore.load({
		params: { status: strStatus }
		/* clear assignedTo if User is not avaiable for new status.
		, callback: function(r, o, s){
			var isUserPresent = false;
			var strAssignedTo = Ext.getCmp('assignedTo_edit_').getValue();
			assignedToStore.each( function(record){
				var userId = record.data.userId;
				if( userId == strAssignedTo ){
					isUserPresent = true;
				}
			});
			if( !isUserPresent )	Ext.getCmp('assignedTo_edit_').setValue('');
		}
		*/
	});
}

//Function for getting history grid based on the bugid
function getHistory(readBugId)
{
	if( readBugId == 'undefined' || readBugId == null ){
		showInfoWindow({title:'Message', msg:'Undefined issue. Can\'t be processed.'});
		return false;
	}
	//displayDefectHistory();
	historyStore.removeAll();
	historyStore.load( { params:{'BugId':readBugId} } );
	Ext.getCmp('historyPanel').store = historyStore;
	History_window.show();
}

//function for module change on listener action
function showModuleListOptions(){
	if( Ext.getCmp('testcaseCom') ){
		Ext.getCmp('testcaseCom').clearValue();
		Ext.getCmp('testcaseCom').store.removeAll();
	}
	if( Ext.getCmp('scenarioCom') ){
		Ext.getCmp('scenarioCom').clearValue();
		Ext.getCmp('scenarioCom').store.removeAll();
	}
	if( Ext.getCmp('de_moduleCombo') ){
		Ext.getCmp('de_moduleCombo').clearValue();
		Ext.getCmp('de_moduleCombo').store.load({
			params: {
				test_round_name: ( Ext.getDom("testRound_Name") ? Ext.getDom("testRound_Name").value : '' ),
				projectCode: Ext.getDom("de_projectcode_selected").value
			}
		});
	}
}

//function for scenario change on listener action
function showScenarioListOptions(){
	if( Ext.getCmp('testcaseCom') ){
		Ext.getCmp('testcaseCom').clearValue();
		Ext.getCmp('testcaseCom').store.removeAll();
	}
	if( Ext.getCmp('scenarioCom') ){
		Ext.getCmp('scenarioCom').clearValue();
		Ext.getCmp('scenarioCom').store.load({
			params: {
				test_round_name: ( Ext.getDom("testRound_Name") ? Ext.getDom("testRound_Name").value : '' ),
				def_moduleCode: ( Ext.getDom("modulecode") ? Ext.getDom("modulecode").value : '' ),
				projectCode_all: Ext.getDom("de_projectcode_selected").value
			}
		});
	}
}

//function for testcase change on listener action
function showTestCaseOptions(){
	if( Ext.getCmp('testcaseCom') ){
		Ext.getCmp('testcaseCom').clearValue();
		Ext.getCmp('testcaseCom').store.load({
			params: {
				test_round_name: ( Ext.getDom("testRound_Name") ? Ext.getDom("testRound_Name").value : '' ),
				def_scenarioCode: ( Ext.getDom("scenariocode") ? Ext.getDom("scenariocode").value : '' ),
				def_moduleCode: ( Ext.getDom("modulecode") ? Ext.getDom("modulecode").value : '' ),
				projectCode_all: Ext.getDom("de_projectcode_selected").value
			}
		});
	}
}

//function for module change on edit form listener action
function showEditModuleListOptions(){
	if( Ext.getCmp('edit_module_de') ){
		Ext.getCmp('edit_module_de').store.load({
			params: {
				test_round_name: ( Ext.getDom("test_roundName") ? Ext.getDom("test_roundName").value : '' ),
				projectCode: Ext.getDom("de_projectcode_selected").value
			},
			callback: function(r,o,s){
				Ext.getCmp('edit_module_de').setValue( Ext.getCmp('module_edit').value );
				showEditScenarioListOptions();
			}
		});
	}else{
		showEditScenarioListOptions();
	}
}

//function for scenario change on edit form listener action
function showEditScenarioListOptions() {
	if( Ext.getCmp('scenario_edit_de') ){
		Ext.getCmp('scenario_edit_de').store.load({
			params: {
				test_round_name: ( Ext.getDom("test_roundName") ? Ext.getDom("test_roundName").value : '' ),
				def_moduleCode: ( Ext.getDom("module_edit_hdn") ? Ext.getDom("module_edit_hdn").value : '' ),
				projectCode_all: Ext.getDom("de_projectcode_selected").value
			},
			callback: function(r,o,s){
				Ext.getCmp('scenario_edit_de').setValue( Ext.getCmp('scenario_edit').value );
				showEditTestCaseOptions();
			}
		});
	}else{
		showEditTestCaseOptions();
	}
}

//function for scenario change on edit form listener action
function showEdit_ScenarioListOptions(){
	if( Ext.getCmp('testCase_edit_de') ){
		Ext.getCmp('testCase_edit_de').clearValue();
		Ext.getCmp('testCase_edit_de').store.removeAll();
	}
	if( Ext.getCmp('scenario_edit_de') ){
		Ext.getCmp('scenario_edit_de').clearValue();
		Ext.getCmp('scenario_edit_de').store.load({
			params: {
				test_round_name: ( Ext.getDom("test_roundName") ? Ext.getDom("test_roundName").value : '' ),
				def_moduleCode: ( Ext.getDom("module_edit_hdn").value ? Ext.getDom("module_edit_hdn").value : '' ),
				projectCode_all: Ext.getDom("de_projectcode_selected").value
			}
		});
	}
}

//function for testcase change on edit form listener action
function showEditTestCaseOptions(){
	if( Ext.getCmp('testCase_edit_de') ){
		Ext.getCmp('testCase_edit_de').store.load({
			params: {
				test_round_name: ( Ext.getDom("test_roundName") ? Ext.getDom("test_roundName").value : '' ),
				def_scenarioCode: ( Ext.getDom("scenario_edit_hdn") ? Ext.getDom("scenario_edit_hdn").value : '' ),
				def_moduleCode: ( Ext.getDom("module_edit_hdn") ? Ext.getDom("module_edit_hdn").value : '' ),
				projectCode_all: Ext.getDom("de_projectcode_selected").value
			},
			callback: function(r,o,s){
				Ext.getCmp('testCase_edit_de').setValue( Ext.getCmp('testCase_edit').value );
				//filesListStore.load({ params:{bugId:Ext.getDom('de_bugid').value} });
			}
		});
	}
}

//function for Testcase change on edit form listener action
function showEdit_TestCaseOptions(){
	if( Ext.getCmp('testCase_edit_de') ){
		Ext.getCmp('testCase_edit_de').clearValue();
		Ext.getCmp('testCase_edit_de').store.load({
			params: {
				test_round_name: ( Ext.getDom("test_roundName") ? Ext.getDom("test_roundName").value : '' ),
				def_scenarioCode: ( Ext.getDom("scenario_edit_hdn") ? Ext.getDom("scenario_edit_hdn").value : '' ),
				def_moduleCode: ( Ext.getDom("module_edit_hdn") ? Ext.getDom("module_edit_hdn").value : '' ),
				projectCode_all: Ext.getDom("de_projectcode_selected").value
			}
		});
	}
}

function loadSDFLabels() {
	maskAll('Building grid');
	Ext.Ajax.request({
		url : 'getSDFFieldLabels',
		params :{
			projectCode: Ext.getDom("de_projectcode_selected").value,
			gridCode: getIssuesGridPanelName()
		},
		success : function(result, request) {
			// get Project start-end date
			var projBoundaryDates = getProjectStartEndDates(projectlistStore, 'projectcode', Ext.getDom("de_projectcode_selected").value);
			projStartDate = projBoundaryDates.projStartDate;
			projEndDate = projBoundaryDates.projEndDate;
			
			var de_jsonData = Ext.util.JSON.decode(result.responseText);
			var stDefectsLable = de_jsonData.data;
			
			//Set header name for menu
			var sdfMenuName = stDefectsLable.sdf_tabCode;
			Ext.getDom('sdfImageLabel').title = sdfMenuName;
			Ext.getDom('sdfMenuLabel').innerHTML = sdfMenuName;
			
			if(!Ext.getDom("de_projectcode_selected").value == "" || !Ext.getDom("de_projectcode_selected").value == null)
			{
				// load lookup into combo store
				sdf_lookupJSON = de_jsonData.data.lookup;
				statusStore.loadData(sdf_lookupJSON.bugstatus);
				statusCombo.store.loadData(sdf_lookupJSON.bugstatus);
				priorityStore.loadData(sdf_lookupJSON.priority);
				priorityCombo.store.loadData(sdf_lookupJSON.priority);
				severityStore.loadData(sdf_lookupJSON.severity);
				severityCombo.store.loadData(sdf_lookupJSON.severity);
				versionStore.loadData(sdf_lookupJSON.version);
				versionCombo.store.loadData(sdf_lookupJSON.version);
/*				hostStore.load({params:{projectCode_all:Ext.getDom("de_projectcode_selected").value}});
				buildnumberStore.load({params:{projectCode_all:Ext.getDom("de_projectcode_selected").value}});	*/
				hostStore.loadData(sdf_lookupJSON.host);
				hostCombo.store.loadData(sdf_lookupJSON.host);
				buildnumberStore.loadData(sdf_lookupJSON.build);
				buildNumberCombo.store.loadData(sdf_lookupJSON.build);
			}
			
			var defect_FieldLabel_sdf = de_jsonData.data.sdf;
			gridCmHeader = defect_FieldLabel_sdf.de_gridDefect;
			gridMandatories = defect_FieldLabel_sdf.de_gridMandatories;
			
			setGridPropsParams({ 
				gridId: getIssuesGridPanelName(),
				projectCode: Ext.getCmp('projectCode_all').getValue(),
				moduleId: MODULEID_DEFECT,
				gridProperties: de_jsonData.data.gridProperties
			});
			
			addFormLabel_fs1 = defect_FieldLabel_sdf.de_Add_fs1_Defect;
			addFormLabel_fs1_2 = defect_FieldLabel_sdf.de_Add_fs1_2_Defect;
			addFormLabel_fs2 = defect_FieldLabel_sdf.de_Add_fs2_Defect;
			addFormLabel_fs3 = defect_FieldLabel_sdf.de_Add_fs3_Defect;
			addFormLabel_fs4 = defect_FieldLabel_sdf.de_Add_fs4_Defect;
			addFormLabel_fs5 = defect_FieldLabel_sdf.de_Add_fs5_Defect;
			/* remove 'projectCode_all' hidden as the name is already used.
			for( var i=0; i<addFormLabel_fs5.length; i++ ){
				if( addFormLabel_fs5[i].name == 'projectCode_all' ){
					addFormLabel_fs5[i] = {};
				}
			}
			*/
			
			editFormLabel_fs1a = defect_FieldLabel_sdf.de_Edit_fs1a_Defect;
			editFormLabel_fs1b1 = defect_FieldLabel_sdf.de_Edit_fs1b1_Defect;
			editFormLabel_fs1b2 = defect_FieldLabel_sdf.de_Edit_fs1b2_Defect;
			editFormLabel_fs1c = defect_FieldLabel_sdf.de_Edit_fs1c_Defect;
			editFormLabel_fs1d = defect_FieldLabel_sdf.de_Edit_fs1d_Defect;
			editFormLabel_fs2 = defect_FieldLabel_sdf.de_Edit_fs2_Defect;
			editFormLabel_fs3 = defect_FieldLabel_sdf.de_Edit_fs3_Defect;
			editFormLabel_fs4 = defect_FieldLabel_sdf.de_Edit_fs4_Defect;
			editFormLabel_fs5 = defect_FieldLabel_sdf.de_Edit_fs5_Defect;
			editFormLabel_fs6 = defect_FieldLabel_sdf.de_Edit_fs6_Defect;
			
			historyGridLabel = defect_FieldLabel_sdf.de_historyDefect;
			
			accessRights_buttonAdd = defect_FieldLabel_sdf.def_AR_Add;
			accessRights_buttonEdit = defect_FieldLabel_sdf.def_AR_Edit;
			accessRights_buttonDelete = defect_FieldLabel_sdf.def_AR_Delete;
			accessRights_buttonApproveDraft = defect_FieldLabel_sdf.def_AR_ApproveDraft;
			accessRights_buttonImport = defect_FieldLabel_sdf.def_AR_Import
			accessRights_buttonSave = (accessRights_buttonAdd || accessRights_buttonEdit);
			strProjectValidity = defect_FieldLabel_sdf.def_AR_strProjectValidity;
			
			Ext.getCmp('buttonFrameView').setDisabled( !(!isFromTestRun && accessRights_buttonSave) );
			
			jaBugCycleGroupDetails = de_jsonData.data.BugCycleGroupDetail;
			if( jaBugCycleGroupDetails && jaBugCycleGroupDetails.GROUP_NAME ){}else{
				showInfoWindow({title:'Alert', msg: 'Select an Issue-Cycle'});
			}
			
			if(!Ext.getDom("de_projectcode_selected").value == "" || !Ext.getDom("de_projectcode_selected").value == null)
			{
				// UDF assignments
				//getUDFFields();
				var defect_FieldLabel_udf = de_jsonData.data.udf;
				udfGridMapping = defect_FieldLabel_udf.gridUDFfieldsDataIndex;
				udfGridFilter = defect_FieldLabel_udf.gridUDFfieldsFilter;
				strEditUDFFormMappings = defect_FieldLabel_udf.editUDFFormMappings;
				strAddUDFFields = defect_FieldLabel_udf.addUDFfields;
				strEditUDFFields = defect_FieldLabel_udf.editUDFfields;
				if(defectPanel != null){
					Ext.get('detailedDefectAdd').remove();
					defectPanel = null;
				}
				if(detailedEdit_defect != null){
					Ext.get('detailedDefectEdit').remove();
					detailedEdit_defect = null;
				}
				
				removeAddFormWindow();
				removeEditFormPanel();
				removeEditFormWindow();
				/*hostStore.load({params:{projectCode_all:Ext.getDom("de_projectcode_selected").value}});
				buildnumberStore.load({params:{projectCode_all:Ext.getDom("de_projectcode_selected").value}});
				*/
				
				displayDefectGrid();
				createHistoryGrid();
				//assignedToStore.load({params:{projectCode_all:Ext.getDom("de_projectcode_selected").value}});
			}
			
			if( isFromTestRun ){
				if( accessRights_buttonAdd ){
					fromTestRun = window.opener.getTestRunDetail();
					addDefect_detailed();
				}else{ showInfoWindow({title:'Message', msg: 'Permission Denied'}); }
			}
		}
	});
}

//For loading the project dropdown box
function loadProject(){
	Ext.getCmp( getIssuesGridPanelName() ).store.setBaseParam( 'projectcodelist',Ext.getDom("de_projectcode_selected").value);
	reloadDefectsGrid();
}
function reloadDefectsGrid(){
	Ext.getCmp( getIssuesGridPanelName() ).store.reload({
		params: { start: 0, limit: 20 }
	});
	unMaskAll();
}
function reloadSamePage(){
	Ext.getCmp( getIssuesGridPanelName() ).store.reload({
		callback:	unMaskAll
	});
}

//function for getting UDFFields
function getUDFFields(strWindowType)
{
	maskAll('Loading customized settings');
	Ext.Ajax.request
	({
		url : 'getUDFFields.jsp',
		params :
		{
			projectCode_all:Ext.getDom("de_projectcode_selected").value
		},
		success:function(response)
		{
			strAddEditUDFFields = Ext.util.JSON.decode(response.responseText);
			var objAddEditUDFFields = strAddEditUDFFields.data;
			strEditUDFFormMappings = objAddEditUDFFields.editUDFFormMappings;
			strAddUDFFields = objAddEditUDFFields.addUDFfields;
			strEditUDFFields = objAddEditUDFFields.editUDFfields;
			if(defectPanel != null){
				Ext.get('detailedDefectAdd').remove();
				defectPanel = null;
			}
			if(detailedEdit_defect != null){
				Ext.get('detailedDefectEdit').remove();
				detailedEdit_defect = null;
			}
			displayDefectGrid();
			createHistoryGrid();
		}
	});
}

function removeAddFormPanel(){
	//Removing Add formpanel whenever the form is closed
	if(defectPanel != null){
		defectPanel.getForm().reset();
		Ext.get('detailedDefectAdd').remove();
		defectPanel = null;
	}
}
function removeAddFormWindow(){
	removeAddFormPanel();
	//Removing Add formpanel whenever the form is closed
	if(Defect_window != null){
		Ext.get('detailedDefectAddWin').remove();
		Defect_window = null;
	}
}
function removeEditFormPanel(){
	//Removing Edit formpanel whenever the form is closed
	if(detailedEdit_defect != null){
		Ext.get('detailedDefectEdit').remove();
		detailedEdit_defect = null;
	}
}
function removeEditFormWindow(){
	//Removing Edit formpanel whenever the form is closed
	if(wndDetailedEdit != null){
		Ext.get('editFormWnd').remove();
		wndDetailedEdit = null;
	}
}

//function for creating defectpanel and window for add module
function addDefect_detailed()
{
	/*enddate = new Ext.form.DateField(
			{fieldLabel:'enddtae',
				format: 'Y-M-d',
				anchor:'89%',
				id: 'detectedbefore',
				name: 'detectedbefore',
				width:140,
				hiddenName:'detectedbefore',
				vtype: 'daterange',
				startDateField: 'detectedon',
				hidden: true

			});*/
	
	if( defectPanel == null ){
		defectPanel = new Ext.FormPanel({
			//standardSubmit:true,
			id: 'detailedDefectAdd',
			labelAlign: 'bottom',
			buttonAlign: 'center',
			frame:true,
			autoHeight:'true',
			width: 1000,
			bodyStyle:'padding: 3px',
			items: [
				{
					xtype:'fieldset',
					layout:'column',
					border: false,
					items:[
					{
						xtype:'fieldset',
						columnWidth:.65,
						border: false,
						layout: 'column',
						items: [{
								columnWidth: 1,
								layout: 'form',
								items: addFormLabel_fs1
							},{
								columnWidth: 1,
								layout: 'form',
								items: addFormLabel_fs1_2
							},{
								xtype: 'fieldset',
								columnWidth: 1,
								layout: 'column',
								border: false,
								items: [
									{
										columnWidth: .5,
										layout: 'form',
										items: addFormLabel_fs2
									},{
										columnWidth: .5,
										layout: 'form',
										items: addFormLabel_fs3
									}
								]
							},{
								columnWidth: 1,
								layout: 'form',
								items: addFormLabel_fs4
							}
						]
					},{
						columnWidth: .35,
						layout: 'form',
						items: addFormLabel_fs5
					}]
				},{
					xtype: 'fieldset',
					layout: 'column',
					border: false,
					items:
					[{
						columnWidth: .2,
						layout: 'form',
						items: [
							{ xtype:'uploadpanel', buttonsAt:'tbar', id:'de_uppanel_add', name:'de_uppanel_add', url:'./uploadFile?module=issue', path:'root', maxFileSize:1048576 },
							{ xtype:'hidden', id:'de_uppanel_add_hdn', name:'de_uppanel_add_hdn', value: '[]' }
						]
					}]
				},{
					xtype: 'fieldset',
					layout: 'column',
					border: false,
					items: [{columnWidth:1,layout: 'form',border: false,items: strAddUDFFields}]
				}
			],
			buttons: [
				{
					//text: 'Save',
					iconCls:'icon-button-save',
					formBind: true,
					handler: function(){
						addDetailedDefect({ operation: 'DEFECT' });
					}
				},{
					text: 'Save as Draft',
					//iconCls: 'icon-button-close',
					handler: function(){
						addDetailedDefect({ operation: 'SaveAsDraft' });
					}
				},{
					//text: 'Clear',
					iconCls: 'icon-button-clear',
					handler: function(){
						defectPanel.getForm().reset();
						//Ext.getCmp('de_uppanel_add').onRemoveAllClick();
						focusAddIssueTitleField();
					}
				},{
					//text: 'Close',
					iconCls: 'icon-button-close',
					handler: function(){
						reloadDefectsGrid();
						gridDefects.el.unmask();
						defectPanel.getForm().reset();
						Defect_window.hide();
						removeAddFormWindow();
						/*defectPanel.getForm().reset();
						Defect_window.hide();
						removeAddFormWindow();*/
						///Ext.getCmp('de_uppanel_add').onRemoveAllClick();
					}
				}
			]
		});
	}
	
	//hostStore.load({params:{projectCode_all:Ext.getDom("de_projectcode_selected").value}});
	if( Ext.getCmp('test_Round') ){
		Ext.getCmp('test_Round').store.load({params:{projectCode_all:Ext.getDom("de_projectcode_selected").value}});
	}
	
	//For displaying the New Defect form
	if( Defect_window == null ){
		Defect_window = new Ext.Window({
			id: 'detailedDefectAddWin',
			width: extViewWidth - 8,
			height: 450,
			y: 5,
			autoHeight: true,
			layout: 'fit',
			buttonAlign: 'center',
			border: false,
			resizable: false,
			draggable: false,
			closable: false,
			modal: true,
			items: [ defectPanel ],
			tbar: ['<b><font color="#15428B">New Issue</font></b>','->',{iconCls:'icon-button-closex',
				handler: function() {
					reloadDefectsGrid();
					gridDefects.el.unmask();
					defectPanel.getForm().reset();
					Defect_window.hide();
					removeAddFormWindow();
				}
			}]
		});
	}
	date = new Date();
	strCurrentDate = date.format('Y-m-d');
	//var app_exedatetime = defectPanel.getComponent('detectedbefore');
	//app_exedatetime.setValue(date.format('Y-m-d'));
	//Ext.getCmp('detectedbefore').setValue(strCurrentDate);
	
	Ext.getCmp('detectedon').setValue(strCurrentDate);
	Ext.getCmp('detectedon').setMinValue(projStartDate);
	Ext.getCmp('detectedon').setMaxValue(new Date());
	
	Ext.getCmp('statusCombo_add').setValue(jaBugCycleGroupDetails.START_FROM);
	Ext.getCmp('statusCombo_add').setReadOnly(true);
	if( Ext.getCmp('de_moduleCombo') ){
		Ext.getCmp('de_moduleCombo').store.load({
			params: {
				projectCode: Ext.getDom("de_projectcode_selected").value
			}
		});
	}
	
	if( isFromTestRun ){
		var strProjectCode = Ext.getDom("de_projectcode_selected").value;
		
		if( Ext.getCmp('test_Round') ){
			Ext.getCmp('test_Round').setReadOnly( true );
			Ext.getCmp('test_Round').setValue(fromTestRun.testRoundName);
		}
		if( Ext.getCmp('de_moduleCombo') ){
			Ext.getCmp('de_moduleCombo').setReadOnly( true );
			Ext.getCmp('de_moduleCombo').store.load({
				params: {
					test_round_name: fromTestRun.testRoundName,
					projectCode: strProjectCode
				}, callback: function(){
					Ext.getCmp('de_moduleCombo').setValue(fromTestRun.moduleCode);
					if( Ext.getCmp('scenarioCom') ){
						Ext.getCmp('scenarioCom').store.load({
							params: {
								def_moduleCode: fromTestRun.moduleCode,
								projectCode_all: strProjectCode
							}, callback: function(){
								Ext.getCmp('scenarioCom').setValue(fromTestRun.scenarioCode);
								if( Ext.getCmp('testcaseCom') ){
									Ext.getCmp('testcaseCom').store.load({
										params: {
											def_moduleCode: fromTestRun.moduleCode,
											def_scenarioCode: fromTestRun.scenarioCode,
											projectCode_all: strProjectCode
										}, callback: function(){
											Ext.getCmp('testcaseCom').setValue(fromTestRun.testCaseId);
											Defect_window.show(null, focusAddIssueTitleFieldDelayed);
											loadProject();
										}
									});
								}else{
									Defect_window.show(null, focusAddIssueTitleFieldDelayed);
								}
							}
						});
					}else{
						Defect_window.show(null, focusAddIssueTitleFieldDelayed);
					}
				}
			});
		}else{
			Defect_window.show(null, focusAddIssueTitleFieldDelayed);
		}
		if( Ext.getCmp('scenarioCom') ){
			Ext.getCmp('scenarioCom').setReadOnly( true );
		}
		if( Ext.getCmp('testcaseCom') ){
			Ext.getCmp('testcaseCom').setReadOnly( true );
		}
		
		Ext.getCmp('description').setValue(fromTestRun.description);
	}else{
		Defect_window.show(null, focusAddIssueTitleFieldDelayed);
	}
	
	// set the hidden elements value
	//Ext.getDom('projectCode_all').value = Ext.getDom('de_projectcode_selected').value;
}

function detectedonfieldValidation(value){
	var currentdate = new Date();
	today = currentdate.format('Y-m-d');
	if(value>today){
		showInfoWindow({title:'Message', msg: 'Future date cannot be added'});
		Ext.getCmp('detectedon').setValue(today);
	}
}
function defectCycleValidation(){
	var value = false;
	Ext.Ajax.request({
		url : 'view/cyclevalidation.jsp',
		success : function(response)
		{
			var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
			var successMessage = jsonDataSuccess.data.response;
			if(successMessage == 'success'){
				value = true;
				return value;
			}
			else{
				//value = false;
				showInfoWindow({title:'Alert', msg:'Select an Issue-Cycle'});
				return value;
			}
		}
	});
	//return value;
}

/**
 * Method name: getDefimportDefectWindow()
 * description: this method is used to get the import window for to import file
 */
function getDefimportDefectWindow(){
	if( Ext.getDom("de_projectcode_selected").value == "" || Ext.getDom("de_projectcode_selected").value == null ){
		showInfoWindow({title:'Message', msg:'Select a project'});
	}else{
		showImportStep1({ moduleId: MODULEID_DEFECT, projectCode: Ext.getDom("de_projectcode_selected").value, callBack: 'loadProject' });
	}
}

function focusAddIssueTitleField(){
	focusToField('Title', 0);
}
function focusAddIssueTitleFieldDelayed(){
	focusToField('Title', 1000);
}

function isDraftId(BugId){
	BugId = BugId+"";
	if( BugId.substr(0, DEFECT_DRAFT_INITIAL.length) == DEFECT_DRAFT_INITIAL ){
		return true;
	}
	return false;
}
/**
 * Method name: copyPasteDefect
 * description: this method is used to copy deffects and paste into deffects table
 */
function copyPasteDefect(){
	if( !strProjectValidity ){
		showInfoWindow({title:'Message', msg: 'Project/User-in-project date is expired'});
	}else{
		var selectedKeys = gridDefects.selModel.selections.keys;
		
		if (selectedKeys.length > 0) {
			strCopyBugId = gridDefects.getSelectionModel().getSelected().get('BugId');
			highlightCopiedRow();
			maskAll('Coping Issue...');
			Ext.Ajax.request({
				url: './copyPasteDefect', //url to server side script
				params: {
					projectCode: Ext.getDom("de_projectcode_selected").value,
					bugId : strCopyBugId
				},
				success : function(response) {
					var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
					var message = jsonDataSuccess.data.response;
					showInfoWindow({title:'Sucess', msg:message});
					maskAll("Loading grid");
					strBugIdPaste = null;
					reloadSamePage();
					unMaskAll();
				},
				failure : function(response) {
					var jsonDataFailure = Ext.util.JSON.decode( response.responseText);
					var failureMessage = jsonDataFailure.data.response;
					showInfoWindow({title:'Error', msg:failureMessage});
				}
			});	
		}else{
			showInfoWindow({title:'Message', msg:'Select issues Id to copy....'});
		}
	}
}
