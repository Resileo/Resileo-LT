function getTraceability(reqId, strReqProject, projectName, strModuleCode,ifAllProjectReq)
{
	var refTypeStore = new Ext.data.ArrayStore({
		fields: ['FORMID','FORMNAME'],
		data:[ ['Task','Tasks'], ['Req','Requirements'], ['Test','Test Plan'], ['Modules','Modules'], ['Issue','Issues'],['Kanbancard','Kanban Cards'] ]
	});
	
	var reftypeCombo = new Ext.form.ComboBox({
		fieldLabel: 'Reference Type',
		name:'reftypeCombo',
		id: 'reftypeCombo',
		hiddenName: 'reftypeCombo_selected',
		autoWidth: true,
		valueField:'FORMID',
		displayField:'FORMNAME',
		store: refTypeStore,
		typeAhead: true,
		mode: 'local',
		triggerAction: 'all',
		forceSelection:true,
		emptyText:'Choose Reference Type...',
		selectOnFocus:true,
		disabled :true,
		listeners: {
			change: function(combo, newValue, oldValue){
				// to avoid execution of both change & select events in select from drop down list.
				this.startValue = this.getValue();
				
				var index = this.store.findExact('modulecode', this.getValue());
				
				// do required operation
				getMapAllRecordView(combo, this.store.getAt(index), index);
			},
			select: function(combo, record, index){
				// to avoid execution of both change & select events in select from drop down list.
				this.fireEvent('change', this, this.getValue(), this.startValue);
			}
		} 
	});
	
	var projectcode = strReqProject;
	if(ifAllProjectReq == true){
		//Ext.getCmp('reftypeCombo').setValue('Select project to Enable ...');
		var project_proxy = new Ext.data.HttpProxy({url:'webservercall/userprojects.jsp'});
		var project_reader = new Ext.data.JsonReader({
				root: 'projects'
			},
			[
				{name: 'projectcode', mapping: 'projectCode'},
				{name: 'projectname', mapping: 'projectName'},
				{name:'defaultproject', mapping:'defaultproject'}
			]
		);
		project_store=new Ext.data.Store({
			proxy: project_proxy,
			reader: project_reader
		});
		project_store.load();
		var	req_tra_projectTextfield = new Ext.form.ComboBox({
	        fieldLabel: 'Project',
	        //hiddenName:'req_tra_projectTextfield',
	        id: 'req_tra_projectTextfield',
	        valueField:'projectcode',
			displayField:'projectname',
			store: project_store,
	        typeAhead: true,
	        mode: 'local',
	        editable:false,
	        triggerAction: 'all',
	        value:'--None--',
	        selectOnFocus:true,
	        width:190,
	        listeners: {
	            select:function () {
	            	Ext.getCmp('reftypeCombo').enable();
	            	projectcode = Ext.getCmp("req_tra_projectTextfield").getValue();
	            	getMapSelectedRecordView(strModuleCode);
	            	if((Ext.getCmp("reftypeCombo").getValue()).length != 0){
	            		getMapAllRecordView();
	            	}
	  			}
	        }
	   });
	}else{
		var req_tra_projectTextfield = new Ext.form.TextField({
			fieldLabel: 'Projects',
			name: 'req_tra_projectTextfield',
			id: 'req_tra_projectTextfield',
			autoWidth: true,
			readOnly: true
		});
		Ext.getCmp('reftypeCombo').enable();
		Ext.getCmp('req_tra_projectTextfield').setValue(projectName);
	}
	
	
	var MapSelectedTreePanel = new Ext.tree.TreePanel({
		title: 'Selected Records',
		height: 480,
		width: 450,
		useArrows: true,
		autoScroll: true,
		animate: true,
		enableDD: false,
		containerScroll: true,
		rootVisible: false,
		frame: true,
		bodyCssClass: 'whiteBg',
		root: {
			nodeType: 'async'
		},
		// auto create TreeLoader
		//	dataUrl: 'js_lib/check-nodes.json',			
		listeners: {
			'checkchange': function(node, checked){
				if(checked){
					node.getUI().addClass('complete');
				}else{
					node.getUI().removeClass('complete');
				}
			}
		},
		
		buttons: [{
			text: 'Remove',
			handler: function(){
				var seletedRecordNodes = MapSelectedTreePanel.getChecked();
				
				if(seletedRecordNodes=='')
				{
					showInfoWindow({title:'Message', msg:'Select a record to remove'});	
				}
				else{
					selectedRecordJsonObj = "[";
					Ext.each(seletedRecordNodes, function(node){
						if(selectedRecordJsonObj.length > 1){
							selectedRecordJsonObj+=",";
						}
						
						// Substring done to avoid unique id of leaf
						var strRefererId = "";
						var delim = node.id.indexOf(";");
						strRefererId = (node.id).substring(delim+1);
						
						selectedRecordJsonObj+="{referenceid:\""+strRefererId+"\", parentId:\""+node.parentNode.id+"\" }";
					});
					selectedRecordJsonObj+= "]";
					Ext.Ajax.request({
						url : './deleteTraceability',
						params : {
							strReferenceTypeId:selectedRecordJsonObj,
							strRefererProjectCode:projectcode,
							strRefererTypeName:strModuleCode
						},
						success : function(response, request) {
							var jsonDataSuccess = Ext.util.JSON.decode(response.responseText);
							var resultMessage = jsonDataSuccess.data.response;
							getMapSelectedRecordView(strModuleCode);
							getMapAllRecordView();
							showInfoWindow({title:'Message', msg:resultMessage});
						}
					});
				}
			}
		}]
	});
	/*
	MapSelectedTreePanel.on('click', function(n){
		//Loding TreePanel on combo select Event
		strRefererTypeId = n.id;
	});*/
	function getKanbanProjectCode(refProjectcode,reftypeComboValue){
		if(reftypeComboValue == 'Kanbancard'){
			refProjectcode = '';
			return refProjectcode
		}else{
			return refProjectcode
		}
	}
	 
	var MapAllRecordTreePanel = new Ext.tree.TreePanel({
		title: 'All Records',
		id:'MapAllRecordTreePanel',
		height:480,
		width: 450,
		useArrows:true,
		autoScroll:true,
		animate:true,
		enableDD:false,
		containerScroll: true,
		rootVisible: false,
		frame: true,
		bodyCssClass: 'whiteBg',
		root: {
			nodeType: 'async'
		},
		// auto create TreeLoader
		//dataUrl: 'js_lib/check-nodes.json',
		listeners: {
			'checkchange': function(node, checked){
				if(checked){
					node.getUI().addClass('complete');
				}else{
					node.getUI().removeClass('complete');
				}
			}
		},
		buttons: [{
			text: 'Add',
			handler: function(){
				var allRecordNodes = MapAllRecordTreePanel.getChecked();
				var selNode = MapSelectedTreePanel.getSelectionModel().getSelectedNode();
				if(allRecordNodes==''){
					showInfoWindow({title:'Message', msg:'Select a record in right side'});	
				} else if( selNode == null || selNode == undefined ){
					showInfoWindow({title:'Message', msg:'Select a record in left side'});
				} else {
					allRecordJsonObj = "[";
					Ext.each(allRecordNodes, function(node){
						if(allRecordJsonObj.length > 1){
							allRecordJsonObj+=",";
						}
						allRecordJsonObj+="{referenceid:\""+node.id+"\"}";
					});
					allRecordJsonObj+= "]";
					
					//var strRefererId = ( selNode.isLeaf()?selNode.parentNode.id:selNode.id);
					
					var strRefererId = selNode.attributes.mapId;
					if( MapSelectedTreePanel.getSelectionModel().getSelectedNode() ){
						Ext.Ajax.request({
							url : './addTraceability',
							params : {
								strReferenceProjectCode: getKanbanProjectCode(projectcode,Ext.getDom("reftypeCombo_selected").value),//projectcode,
								strReferenceTypeName: Ext.getDom("reftypeCombo_selected").value,
								strReferenceTypeId: allRecordJsonObj,
								strRefererProjectCode: getKanbanProjectCode(projectcode,Ext.getDom("reftypeCombo_selected").value),//projectcode,
								strRefererTypeName: strModuleCode,
								strRefererTypeId: strRefererId
							},
							success : function(response, request) {
								var jsonReturn = Ext.util.JSON.decode(response.responseText);
								if( jsonReturn.success ){
									getMapSelectedRecordView(strModuleCode);
									getMapAllRecordView();
									showInfoWindow({title:'Message', msg:jsonReturn.data.message});
								}else{
									showInfoWindow({title:'Error', msg:jsonReturn.errorMessage});
								}
							}
						});
					}else{
						showInfoWindow({title:'Message', msg:'Select a referer to map'});
					}
				}
			}
		}]
	});
	
	var reqTraceabilityMapWindow = new Ext.Window({
		width: 945,
		height: Ext.isIE?555:550,
		y: 5,
		border: false,
		resizable: false,
		border: false,
		tbar: ['->','Project',req_tra_projectTextfield,'-','Reference Type',reftypeCombo],
		autoScroll: true,
		id: 'MapReqTraceability',
		title: 'Traceability',
		layout: 'column',
		modal: true,
		defaults: { frame : true },
		items: [{
			width :465,
			height:495,
			items:[MapSelectedTreePanel] 
		},{
			width :465,
			height:495,
			frame : true,
			items:[MapAllRecordTreePanel]
		}]
	});
	
	getMapSelectedRecordView(strModuleCode);
	
	reqTraceabilityMapWindow.show();

	function getMapSelectedRecordView(strModuleCode)
	{
		var tetc_Dynamicroot = new Ext.tree.AsyncTreeNode({
			text: 'Root',
			loader: new Ext.tree.TreeLoader({dataUrl:'view/selectedRecordReader.jsp?tr_modulecode='+strModuleCode+"&tr_projectcode="+projectcode}),
			allowDrag:false,
			allowDrop:false
		});
		MapSelectedTreePanel.setRootNode(tetc_Dynamicroot);
		MapSelectedTreePanel.getRootNode().expand();
	}
	
	function getMapAllRecordView()
	{	
		var tetc_Dynamicroot = new Ext.tree.AsyncTreeNode({
			text: 'Root',
			loader: new Ext.tree.TreeLoader({dataUrl:'view/allRecordReader.jsp?tr_modulecode='+Ext.getDom("reftypeCombo_selected").value+"&tr_projectcode="+projectcode}),
			allowDrag:false,
			allowDrop:false
		});
		MapAllRecordTreePanel.setRootNode(tetc_Dynamicroot);
		MapAllRecordTreePanel.getRootNode().expand();
	}
}