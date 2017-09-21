var gptProjectCode = null, gptModuleId = null, gptGridCode = null, gptGridProperties = null, gptGridFilters = null;
var storeGridPropsTemplate = null, comboGridPropsTemplate = null;
var menuGridSettings = null;

Ext.onReady( function(){

	storeGridPropsTemplate = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'webservercall/getGridPropsTemplates.jsp'
		}),
		reader: new Ext.data.JsonReader(
			{},[
				{name: 'templateId', mapping: 'templateId'},
				{name: 'templateName', mapping: 'templateName'}
			]
		)
	});
	
	comboGridPropsTemplate = new Ext.form.ComboBox({
		name: 'comboGridPropsTemplate',
		id: 'comboGridPropsTemplate',
		fieldLabel: 'Template',
		label: 'Template',
		//xtype : 'combo',
		emptyText: 'Load a template',
		triggerAction: 'all',
		hiddenName: 'comboGridPropsTemplate_hdn',
		store: storeGridPropsTemplate,
		mode: 'local',
		displayField: 'templateName',
		valueField: 'templateId',
		editable: false,
		selectOnFocus: true,
		//action event for combo item selection
		listeners: {
			change: function(combo, newValue, oldValue){
				// to avoid execution of both change & select events in select from drop down list.
				this.startValue = this.getValue();
				
				// do required operation
				populteGridProperties();
			},
			select: function(combo, record, index){
				// to avoid execution of both change & select events in select from drop down list.
				this.fireEvent('change', this, this.getValue(), this.startValue);
			},
			afterrender: function(combo){
				// set the default templateId, if available, in the combo
				if( gptGridProperties && gptGridProperties.templateId ){
					this.setValue( gptGridProperties.templateId );
				}
			}
		}
	});
});

function setGridPropsParams(params){
	gptProjectCode = params.projectCode;
	gptModuleId = params.moduleId;
	gptGridCode = params.gridId;
	gptGridProperties = params.gridProperties;
	gptGridFilters = params.gridFilters;
	
	// load the templates store & set the default template in the combo
	loadGridPropsStore( function(){
		Ext.getCmp('comboGridPropsTemplate').clearValue();
		if( Ext.getCmp('comboGridPropsTemplate') && gptGridProperties && gptGridProperties.templateId && gptGridProperties.templateId > 0 ){
			Ext.getCmp('comboGridPropsTemplate').setValue( gptGridProperties.templateId );
		}
	});
}
function setGridPropsFilter(filterObject){
	gptGridFilters = filterObject;
}

function getGridSettingsMenu(){
	
	if( menuGridSettings ) {
	}else{
		menuGridSettings = {
			xtype: 'tbsplit',
			tooltip: 'Manage Grid Settings',
			iconCls: 'icon-menu-gridsettings',
			name: 'filterDetailButton',
			id: 'filterDetailButton',
			clicked: true,
			forceLayout: true,
			layout: 'column',
			menu: new Ext.menu.Menu({
				items: [{
					text: 'View Filter & Sort details',
					tooltip: 'View Filter & Sort details',
					iconCls: 'icon-menu-filterdetails',
					handler: function(){
						showGridFilterDetails({gridId: gptGridCode});
					}
				},comboGridPropsTemplate,{
					text: 'Save current template',
					tooltip: 'Save current grid properties in the template',
					iconCls: 'icon-menu-gridsave',
					handler: function(){
						return saveGridProperties({ operation: 'SAVE' });
					}
				},{
					text: 'Make selection as Default',
					tooltip: 'Make the current grid template as default',
					iconCls: 'icon-menu-gridlightning',
					handler: function(){
						return makeTemplateDefault();
					}
				},{
					text: 'Save as new template',
					tooltip: 'Save grid properties as new template',
					iconCls: 'icon-menu-gridsave',
					handler: function(){
						getNewTemplatename();
					}
				}]
			})
		};
	}
	
	return menuGridSettings;
}

/**
 * Load the template cobo's store
 */
function loadGridPropsStore(callbackFn){
	storeGridPropsTemplate.load({
		params: {
			projectCode: gptProjectCode,
			gridCode: gptGridCode
		},
		callback: callbackFn
	});
}

/**
 * Show what are the filter conditions applied in grid.
 * and Sorted column name of the grid.
 */
function showGridFilterDetails(){
	if( filterDetailsWindow == null ){
		var styleSize = Ext.getBody().getStyleSize();
		maxX_utils = styleSize.width;
		
		fpFilterDetail = new Ext.form.FormPanel({
			name: 'fpFilterDetail',
			id: 'fpFilterDetail',
			border: false,
			width: Math.round(maxX_utils * 0.6),
			autoScroll: true,
			autoHeight: true,
			frame: true,
			border: false,
			items: [
				{ xtype: 'box', id: 'filterDetailsDiv', style: 'overflow: auto; autoHeight: true;', autoEl: { tag: 'div', style:'background-color: #DFE8F6; padding: 0px 10px 0px 10px; autoHeight: true;' } }
			]
		});
		
		filterDetailsWindow = new Ext.Window({
			title: 'Grid Filter Details',
			width: Math.round(maxX_utils * 0.6),
			autoHeight: true,
			plain: true,
			//bodyStyle:'padding:3px;',
			buttonAlign: 'center',
			closeAction: 'hide',
			animCollapse: true,
			items: [
				fpFilterDetail
			],
			buttonAlign: 'center',
			buttons: [{
				text: 'Refresh',
				//iconCls: 'btnSubmit',
				bodyStyle: "border: 0; background-color: transparent",
				handler: function(){
					getFilterDetailsText();
				}
			}]
		});
	}
	
	filterDetailsWindow.show();
	Ext.getDom('filterDetailsDiv').style.width = get60PercentageWidth() - ((Ext.isIE)?10:45);
	getFilterDetailsText();
	
	// set position of the window	
	filterDetailsWindow.setPosition( Ext.get('filterDetailButton').getLeft()+Ext.get('filterDetailButton').getWidth()-filterDetailsWindow.getOuterSize().width, Ext.get('filterDetailButton').getTop() );
	
	return true;
}
/**
 * Refresh filter & sorting detail in the detail help window
 * Use this in store.on('load')
 */
function getFilterDetailsText(){
	var detGrid = null, detGridSortInfo = null, detFilters = null, detFilterItem = null, detFilterlength = 0, filterField = null, filterType = null, filterValue = null, details = "", filterDetails = "", sortingDetails = "", fyiDetails = "";
	
	if( filterDetailsWindow && filterDetailsWindow.isVisible() ){
		detGrid = Ext.getCmp(gptGridCode);
		detGridSortInfo = detGrid.getStore().sortInfo;
		detFilters = detGrid.plugins.filters;
		if( detFilters ){
		}else{
			for( var i=0; i<detGrid.plugins.length; i++ ){
				if( detGrid.plugins[i] && detGrid.plugins[i].filters ){
					detFilters = detGrid.plugins[i].filters;
				}
			}
		}
		
		if( detFilters && detFilters.items.length > 0 ){
			detFilterlength = detFilters.items.length;
			for( var i=0; i < detFilterlength; i++ ){
				detFilterItem = detFilters.items[i];
				details = "";
				
				if( detFilterItem.active ){
					filterField = detFilterItem.dataIndex;
					filterHeaderName = getColumnHeaderName( detGrid, filterField );
					filterType = detFilterItem.type;
					filterValue = detFilterItem.getValue();
					//filterComparision = detFilterItem.gridParams["filter["+i+"][data][comparison]"];
					
					if( filterType == "string" ){
						details = "'"+filterHeaderName +"' like '%"+filterValue+"%'";
					}else if( filterType == "list" ){
						details = "'"+filterHeaderName +"' in ["+filterValue+"]";
					}else if( filterType == "boolean" ){
						details = "'"+filterHeaderName +"' is "+filterValue;
					}else if( filterType == "numeric" ){
						if( filterValue.eq || filterValue.eq == 0 ){
							details = "'"+filterHeaderName +"' = "+filterValue.eq;
						}
						if( filterValue.lt || filterValue.lt == 0 ){
							details = "'"+filterHeaderName +"' < "+filterValue.lt;
						}
						if( filterValue.gt || filterValue.gt == 0 ){
							details = "'"+filterHeaderName +"' > "+filterValue.gt;
						}
					}else if( filterType == "date" ){
						filterFormat = 'Y-m-d'; //detFilterItem.pickerOpts.format;
						if( filterValue.on ){
							if( details.length > 0 ) details = details+"<BR/>";
							details = details + "'"+filterHeaderName +"' is '"+(filterValue.on).format(filterFormat)+"'";
						}
						if( filterValue.after ){
							if( details.length > 0 ) details = details+"<BR/>";
							details = details + "'"+filterHeaderName +"' after '"+(filterValue.after).format(filterFormat)+"'";
						}
						if( filterValue.before ){
							if( details.length > 0 ) details = details+"<BR/>";
							details = details + "'"+filterHeaderName +"' before '"+(filterValue.before).format(filterFormat)+"'";
						}
					}
					filterDetails += details+"<BR/>";
				}
			}
		}
		if( filterDetails.length == 0 ) {
			filterDetails = "No filters done.<BR/>";
		}
		
		if( detGridSortInfo ){
			sortingDetails = "'"+getColumnHeaderName(detGrid, detGridSortInfo.field) +"' in "+( (detGridSortInfo.direction == "ASC")?"Ascending":"Desending" )+" manner";
		} else {
			sortingDetails = "No sorting done.";
		}
		
		if( bInvalidFilterId == true ){
			fyiDetails += '<BR/><BR/><FONT color="red">*</FONT> - Clear cookies to remove this Filter/Sorting';
		}else{
			bInvalidFilterId = false;
		}
		Ext.getDom('filterDetailsDiv').innerHTML = '<FONT color="blue">Filter:<BR/>'+filterDetails+'<BR/>Sorting:<BR/>'+sortingDetails+fyiDetails+'</FONT>';
	}
}
function get60PercentageWidth(){
	var styleSize = Ext.getBody().getStyleSize();
	maxX_utils = styleSize.width;
	
	return Math.round(maxX_utils * 0.6);
}
/**
 * Get column header name from the dataindex used.
 */
function getColumnHeaderName(gridElemnt, dataIndex){
	var colIndex = gridElemnt.getColumnModel().findColumnIndex(dataIndex);
	var filterHeaderName = "";
	if( colIndex == -1 ){
		filterHeaderName = '<FONT color="red">*</FONT>'+dataIndex;
		bInvalidFilterId = true;
	}else{
		filterHeaderName = gridElemnt.getColumnModel().getColumnHeader( colIndex );
	}
	return filterHeaderName;
}

/**
 * Save grid's column order, hidden, sort, filter, 
 */
function getGridProperties(){
	var gridElement = Ext.getCmp(gptGridCode);
	var gridColumns = gridElement.getColumnModel(), detFilters = null, detFilterlength = null, detFilterItem = null;
	var filterField = null, filterValue = null, netFilterValue = null, jotemp = null;
	var columnProperties = new Array(), columnFilterProperties = {};
	
	/* get Sort details */
	var gridSortInfo = gridElement.getStore().sortInfo
	
	/* get filter details */
	if( gridElement.plugins.length ){
		for( var i=0; i<gridElement.plugins.length; i++ ){
			if( gridElement.plugins[i] && gridElement.plugins[i].filters ){
				detFilters = gridElement.plugins[i].filters;
			}
		}
	}else if( gridElement.plugins.filters ){
		detFilters = gridElement.plugins.filters;
	}
	
	if( detFilters && detFilters.items.length > 0 ){
		detFilterlength = detFilters.items.length;
		for( var i=0; i < detFilterlength; i++ ){
			detFilterItem = detFilters.items[i];
			
			if( detFilterItem.active ){
				filterField = detFilterItem.dataIndex;
				
				columnFilterProperties[filterField] = { filterType: detFilterItem.type, filterValue: detFilterItem.getValue() };
			}
		}
	}
	
	/* get order, hidden details */
	for( var i = 0; i < gridColumns.getColumnCount(); i = i+1 ){
		if( gridColumns.getDataIndex(i) && gridColumns.getDataIndex(i) != '' ){
			columnProperties[i] = {};
			columnProperties[i].dataIndex = gridColumns.getDataIndex(i);
			columnProperties[i].hide = gridColumns.isHidden(i);
			columnProperties[i].columnId = gridColumns.getColumnId(i);
			columnProperties[i].columnOrder = gridColumns.getIndexById(columnProperties[i].columnId);
			columnProperties[i].width = gridColumns.getColumnWidth(i);
			
			if( gridSortInfo && gridSortInfo.field == columnProperties[i].dataIndex ){
				columnProperties[i].sort = gridSortInfo.direction;
			}
			
			jotemp = (columnFilterProperties[columnProperties[i].dataIndex])
			if( jotemp != null ){
				columnProperties[i].filterType = jotemp.filterType;
				
				filterValue = jotemp.filterValue;
				
				// for list values; like Priority ["Low","Medium"]
				if( columnProperties[i].filterType == 'list' ){
					netFilterValue = "";
					for( var idx=0; idx<filterValue.length; idx=idx+1 ){
						if( idx != 0 )	netFilterValue = netFilterValue + ',';
						netFilterValue = netFilterValue + filterValue[idx];
					}
					filterValue = netFilterValue;
				} else if( columnProperties[i].filterType == 'date' ){
					
					filterValue = Ext.encode(filterValue);
				}
				
				columnProperties[i].filterValue = filterValue;
			}
		}
	}
	//alert( Ext.encode(columnProperties) );
	
	return columnProperties;
}

function getNewTemplatename(){
	Ext.Msg.prompt('Save Grid Settings as', 'New template name', function(btn, txt){
		if (btn == "ok" && txt.length > 0) {
			saveGridProperties({ operation: 'NEW', templateId: -1, templateName: txt });
		}else if(btn == "ok" && txt.length == 0){
			showInfoWindow({title:'Message', msg:'Give a template name.'});
			getNewTemplatename();
		}
	});
}

function saveGridProperties(params){
	var columnProperties = getGridProperties();
	var bGoodToSave = false;
	
	if( params.operation == 'NEW' ){
		bGoodToSave = true;
	}else if( params.operation == 'SAVE' ){
		if( Ext.getCmp('comboGridPropsTemplate').getValue() ){
			bGoodToSave = true;
		} else {
			showInfoWindow({title:'Message', msg:'Select a template.'});
			focusAndExpandField('comboGridPropsTemplate');
			return false;
		}
	}
	
	if( bGoodToSave ){
		Ext.Ajax.request({
			url: './addUpdateGridProperties',
			params: {
				templateId: ( (params.templateId==-1)?null:Ext.getCmp('comboGridPropsTemplate').getValue() ),
				templateName: params.templateName || Ext.getCmp('comboGridPropsTemplate').getRawValue(),
				projectCode: gptProjectCode,
				moduleId: gptModuleId,
				gridId: gptGridCode,
				columnProperties: Ext.encode(columnProperties)
			},
			success: function(response) {
				var jsonData = Ext.util.JSON.decode( response.responseText);
				
				// load the templates store & set the new template in the combo
				loadGridPropsStore( function(){
					if( jsonData.data.templateId > 0 ){
						Ext.getCmp('comboGridPropsTemplate').setValue( jsonData.data.templateId );
					}
				});
				
				if( ! jsonData.success ){
					showInfoWindow({title:'Error', msg:jsonData.errorMessage});
					
					if( params.operation == 'NEW' ){
						getNewTemplatename();
					}
				}else{
					showInfoWindow({title:'Message', msg:jsonData.data.message});
				}
			},
			failure: function() {
				showInfoWindow({title:'Error', msg:'Error while saving Grid properties.'});
			}
		});
	}
	return true;
}

function makeTemplateDefault(){
	if( Ext.getCmp('comboGridPropsTemplate').getValue() ){
		Ext.Ajax.request({
			url: './saveTemplateAsDefault',
			params: {
				projectCode: gptProjectCode,
				gridCode: gptGridCode,
				templateId: Ext.getCmp('comboGridPropsTemplate').getValue()
			},
			success: function(response) {
				var jsonData = Ext.util.JSON.decode( response.responseText);
				
				if( jsonData.success ){
					showInfoWindow({title:'Message', msg:jsonData.data.message});
				}else{
					showInfoWindow({title:'Error', msg:jsonData.errorMessage});
				}
			},
			failure: function() {
				showInfoWindow({title:'Error', msg:'Error while loading Grid properties.'});
			}
		});
	} else {
		showInfoWindow({title:'Message', msg:'Select a template.'});
		focusAndExpandField('comboGridPropsTemplate');
		return false;
	}
	return true;
}

function populteGridProperties(){
	Ext.Ajax.request({
		url: './getGridProperties',
		params: {
			templateId: Ext.getCmp('comboGridPropsTemplate').getValue()
		},
		success: function(response) {
			var jsonData = Ext.util.JSON.decode( response.responseText);
			
			if( ! jsonData.allColumnProperties ){
				showInfoWindow({title:'Error', msg:'Error while loading Grid properties.'});
			}else{
				gptGridProperties = jsonData;
				loadSettingsIntoGrid();
			}
		},
		failure: function() {
			showInfoWindow({title:'Error', msg:'Error while loading Grid properties.'});
		}
	});
}

function loadSettingsIntoGrid(){
//	gptGridFilters.filters.cleanParams();
	//gptGridFilters.filters.clear();
	
	// set hide, width, sort, columnOrder, filter
	var grid = Ext.getCmp( gptGridCode ), columnProperty = null;
	var gridStore = grid.getStore(), gcm = grid.getColumnModel();
	var allColumnProperties = gptGridProperties.allColumnProperties;
	
	for( var index = 0; index < allColumnProperties.length; index=index+1 ){
		columnProperty = allColumnProperties[index];
		
		// set hide status
		gcm.setHidden( gcm.findColumnIndex(columnProperty.dataIndex), columnProperty.hide );
		
		// set width
		gcm.setColumnWidth( gcm.findColumnIndex(columnProperty.dataIndex), columnProperty.width );
		
		// set sort
		if( columnProperty.sort != '' ){
			gridStore.singleSort(columnProperty.dataIndex, columnProperty.sort);
			//gridStore.sort( columnProperty.dataIndex, columnProperty.sort );
		}
		
		// column ordering
		if( gcm.findColumnIndex(columnProperty.dataIndex) != columnProperty.columnOrder) {
			gcm.moveColumn(gcm.findColumnIndex(columnProperty.dataIndex), columnProperty.columnOrder);
		}
		
		// set filter
		var filterIndex = gptGridFilters.filters.indexOfKey(columnProperty.dataIndex);
		if( columnProperty.filterValue != '' ){
			if( columnProperty.filterType == 'date' ){
				
				var filterDate = Ext.decode(columnProperty.filterValue);
				if( filterDate.before )	filterDate.before = new Date(filterDate.before);
				if( filterDate.after )	filterDate.after = new Date(filterDate.after);
				if( filterDate.on )	filterDate.on = new Date(filterDate.on);
				
				gptGridFilters.filters.get(filterIndex).setValue( filterDate );
				gptGridFilters.filters.get(filterIndex).setActive(true);
			} else {
				gptGridFilters.filters.get(filterIndex).setValue( columnProperty.filterValue );
				gptGridFilters.filters.get(filterIndex).setActive(true);
			}
		} else if( filterIndex != -1 ){
			gptGridFilters.filters.get(filterIndex).setValue( '' );
			gptGridFilters.filters.get(filterIndex).setActive(false);
		}
	}
}