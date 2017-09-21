function showExportDataWindow( params ){
	var MODULEID = params.moduleId, projectCode = params.projectCode, gridId = params.gridId;
	var exportFormPanel = null, exportWindow = null;
	
	var exportGridPanel = Ext.getCmp(gridId);
	var exportGridColumnModel = exportGridPanel.getColumnModel();
	var colCount = exportGridColumnModel.getColumnCount(), pageStart = 0, pageLimit = 0;
	var exportStore = exportGridPanel.getStore();
	
	var storeLoadLastOptions = exportStore.lastOptions;
	if( storeLoadLastOptions && storeLoadLastOptions.params ){
		pageStart = (storeLoadLastOptions.params.start) ? storeLoadLastOptions.params.start : 0;
		pageLimit = (storeLoadLastOptions.params.limit) ? storeLoadLastOptions.params.limit : 0;
	}
	
	var exportPlugins = null;
	if( exportGridPanel.plugins['0'] ){
		for( var i=0; i<exportGridPanel.plugins.length; i++ ){
			if( exportGridPanel.plugins[i] && exportGridPanel.plugins[i].filters ){
				exportPlugins = exportGridPanel.plugins[i];
			}
		}
	}else{
		exportPlugins = exportGridPanel.plugins;
	}
	var filterOptions = { params: exportPlugins.buildQuery(exportPlugins.getFilterData()) };
	
	var isFiltered = ( filterOptions.params["filter[0][field]"] ) ? true : false;
	
	var export_module_option = {}, export_scenario_option = {}, export_draft_option = {};
	var isParentCodePresent = (params.parentCode)?true:false;
	var disablePagination = false, isModulePresent = (params.tp_moduleId)?true:false, isScenarioPresent = (params.tp_scenarioText)?true:false;
	
	var strTitle = "", strSubmitURL = "";
	if( MODULEID == MODULEID_ACTIONITEM ){
		strTitle = "Export Tasks";
		strSubmitURL = './exportActionItems';
	} else if( MODULEID == MODULEID_REQUIREMENT ){
		strTitle = "Export Requirements";
		strSubmitURL = './exportRequirements';
		
		// disable pagination selection if no scenario selected(which means All Scenario option selected)
		disablePagination = !isParentCodePresent;
		
		export_folder_option = {
			xtype: 'radiogroup',
			fieldLabel: 'Folder Filter',
			id: 'export_folder_optionGroup',
			//disabled: !isParentCodePresent,
			items: [{
				boxLabel: 'Only '+(params.scenarioText?params.scenarioText:'-'),
				name: 'export_folder_option',
				inputValue: 'Limit',
				//boxLabelWidth: 50,
				disabled: !isParentCodePresent,
				checked: isParentCodePresent
			},{
				boxLabel: 'All Folders',
				name: 'export_folder_option',
				inputValue: 'ALL',
				checked: !isParentCodePresent,
				listeners: {
					check: controlPagination
				}
			}]
		};
	} else if( MODULEID == MODULEID_TESTPLAN ){
		strTitle = "Export Test Plans";
		strSubmitURL = './exportTestCases';
		
		// disable pagination selection if no module/scenario selected(which means All Module/Scenario option selected)
		disablePagination = !isModulePresent || !isScenarioPresent;
		
		export_module_option = {
			xtype: 'radiogroup',
			fieldLabel: 'Module Filter',
			id: 'export_module_optionGroup',
			items: [{
				boxLabel: 'Only '+(params.tp_moduleId?params.tp_moduleId:'-'),
				name: 'export_module_option',
				inputValue: 'Limit',
				//boxLabelWidth: 50,
				disabled: !isModulePresent,
				checked: isModulePresent
			},{
				boxLabel: 'All Modules',
				name: 'export_module_option',
				inputValue: 'ALL',
				checked: !isModulePresent,
				listeners: {
					check: function(checkbox, checked){
						if( checked ){
							Ext.getCmp('export_scenario_optionGroup').setDisabled(true);
						}else if( isScenarioPresent ){		// enable only if Scenario is selected
							Ext.getCmp('export_scenario_optionGroup').setDisabled(false);
						}
						controlPagination(checkbox, checked);
					}
				}
			}]
		};
		export_scenario_option = {
			xtype: 'radiogroup',
			fieldLabel: 'Scenario Filter',
			id: 'export_scenario_optionGroup',
			disabled: !isScenarioPresent,
			items: [{
				boxLabel: 'Only '+(params.tp_scenarioText?params.tp_scenarioText:'-'),
				name: 'export_scenario_option',
				inputValue: 'Limit',
				//boxLabelWidth: 50,
				disabled: !isScenarioPresent,
				checked: isScenarioPresent
			},{
				boxLabel: 'All Scenarios',
				name: 'export_scenario_option',
				inputValue: 'ALL',
				checked: !isScenarioPresent,
				listeners: {
					check: controlPagination
				}
			}]
		};
	} else if( MODULEID == MODULEID_TESTEXECUTE ){
		strTitle = "Export TestRun";
		strSubmitURL = './exportTestExecute';
	} else if( MODULEID == MODULEID_DEFECT ){
		strTitle = "Export Issues";
		strSubmitURL = './exportDefects';
		
		export_draft_option = {
			xtype: 'checkbox',
			fieldLabel: 'Include Draft',
			name: 'export_draft_option',
			id: 'export_draft_option',
			inputValue: true
		};
	}
	
	if(exportFormPanel == null){
		exportFormPanel = new Ext.FormPanel({
			standardSubmit: true,
			frame: true,
			buttonAlign: 'center',
			id: 'export_quotes_panel',
			autoHeight: true,
			frame: true,
			bodyStyle: 'padding: 0 0 0 0',
			width: 450,
			items: [{
				layout: 'form',
				items: [{
						xtype: 'radiogroup',
						fieldLabel: 'Columns',
						id: 'export_fields_optionGroup',
						items: [{
							boxLabel: 'Visible Columns',
							name: 'export_fields_option',
							inputValue: 'Visible',
							//boxLabelWidth: 50,
							checked: true
						},{
							boxLabel: 'All Columns',
							name: 'export_fields_option',
							inputValue: 'ALL'
						}]
					},{
						xtype: 'checkbox',
						fieldLabel: 'Apply Filter',
						name: 'export_filter_option',
						id: 'export_filter_option',
						//boxLabel: 'Apply Filter Option',
						inputValue: true,
						checked: isFiltered
					},{
						xtype: 'radiogroup',
						fieldLabel: 'Pagination',
						id: 'export_pagination_optionGroup',
						disabled: disablePagination,
						items: [{
							boxLabel: 'Paged ('+(pageStart+1)+' to '+(pageStart+pageLimit)+")",
							name: 'export_pagination_option',
							inputValue: 'paged'
						},{
							boxLabel: 'All Data <BR/>( with above filter option )',
							name: 'export_pagination_option',
							inputValue: 'ALL',
							checked: true
						}]
					},
					export_draft_option,
					export_module_option,
					export_scenario_option,
					{ xtype:'hidden', id:'export_projectCode', name:'export_projectCode', value:projectCode },
					{ xtype:'hidden', id:'export_columns', name:'export_columns', value:'' },
					{ xtype:'hidden', id:'export_filter', name:'export_filter', value:'' },
					{ xtype:'hidden', id:'export_sort', name:'export_sort', value:'' },
					{ xtype:'hidden', id:'export_dir', name:'export_dir', value:'' },
					{ xtype:'hidden', id:'export_start', name:'export_start', value:'' },
					{ xtype:'hidden', id:'export_limit', name:'export_limit', value:'' },
					{ xtype:'hidden', id:'export_parentCode', name:'export_parentCode', value:(params.parentCode)?params.parentCode:'' },
					{ xtype:'hidden', id:'export_moduleCode', name:'export_moduleCode', value:(params.tp_moduleId)?params.tp_moduleId:'' },
					{ xtype:'hidden', id:'export_scenarioCode', name:'export_scenarioCode', value:(params.tp_scenarioCode)?params.tp_scenarioCode:'' },
					{ xtype:'hidden', id:'export_status', name:'export_status', value:(params.status)?params.status:'' },
					{ xtype:'hidden', id:'export_planner', name:'export_planner', value:(params.planner)?params.planner:'' },
					{ xtype:'hidden', id:'export_roundName', name:'export_roundName', value:(params.roundName)?params.roundName:'' },
					{ xtype:'hidden', id:'export_myfolder', name:'export_myfolder', value:(params.myfolder)?params.myfolder:'' }
				]
			}],
			buttons: [{
				iconCls: 'icon-button-download',
				id: 'exportOppAdd',
				name: 'exportOppAdd',
				handler: exportGrid
			},{
				iconCls: 'icon-button-close',
				id: 'exportcontactClose',
				handler: closeExportWindow
			}]
		});
	}
	
	if(exportWindow == null){
		exportWindow = new Ext.Window({
			title: strTitle,
			id: 'export_quotes_window',
			width: 470,
			autoHeight: true,
			height: 300,
			//layout: 'fit',
			plain: true,
			border: false,
			resizable: false,
			draggable: false,
			closable: false,
			bodyStyle: 'padding:5px;',
			buttonAlign: 'center',
			modal: true,
			items: [ exportFormPanel ]
		});
	}
	
	exportWindow.show();


//	functions
	function exportGrid(){
		var gridHeader = "", recordsToExport = [], sortInfo = null, filter = null;
		
		// set required columns.
		var isALLCOlumnRequired = Ext.getCmp('export_fields_optionGroup').getValue() == 'ALL';
		for (var i = 0; i < colCount; i++ ){
			// if ALL columns are required then append ALL column names; else fetch only visible columns
			if( isALLCOlumnRequired || !exportGridColumnModel.isHidden(i) ){
				if( exportGridColumnModel.getColumnHeader(i) != "" && exportGridColumnModel.getColumnHeader(i) != '<div class=\"x-grid3-hd-checker\">&#160;</div>' ){
					gridHeader += exportGridColumnModel.getColumnHeader(i)+",";
				}
			}
		}
		var strHeaderLen = gridHeader.length;
		gridHeader = gridHeader.slice(0,strHeaderLen-1);
		Ext.getDom('export_columns').value = gridHeader;
		
		// set filter info
		Ext.getDom('export_filter').value = ( (filterOptions)? Ext.encode( filterOptions ) : '{}' );
		
		// set sort info
		sortInfo = exportStore.getSortState();
		Ext.getDom('export_sort').value = (( sortInfo )? sortInfo.field : '');
		Ext.getDom('export_dir').value = ( ( sortInfo )? sortInfo.direction : '' );
		
		if( !Ext.getCmp('export_pagination_optionGroup').disabled && Ext.getCmp('export_pagination_optionGroup').getValue() == "paged" ){
			Ext.getDom('export_start').value = pageStart;
			Ext.getDom('export_limit').value = pageLimit;
		}else if( Ext.getCmp('export_pagination_optionGroup').disabled || Ext.getCmp('export_pagination_optionGroup').getValue() == "ALL" ){
			Ext.getDom('export_start').value = 0;
			Ext.getDom('export_limit').value = 0;
		}
		
		// submit form to a different target(iFrame), to open download browser-window
		exportFormPanel.getForm().getEl().dom.action = strSubmitURL;
		exportFormPanel.getForm().getEl().dom.method = 'POST';
		exportFormPanel.getForm().getEl().dom.target = 'iFrameDownload';
		exportFormPanel.getForm().submit();
	}
	
	function controlPagination(checkbox, checked){
		Ext.getCmp('export_pagination_optionGroup').setDisabled(checked);
	}
	
	function removeExportPanel(){
		if(exportFormPanel!=null){
			Ext.get('export_quotes_panel').remove();
			exportFormPanel = null;
		}
	}
	
	function removeExportWindow(){
		if(exportWindow!=null){
			Ext.get('export_quotes_window').remove();
			exportWindow = null;
		}
	}
	
	function closeExportWindow(){
		exportWindow.hide();
		removeExportPanel();
		removeExportWindow();
	}
}
