var priorityStore = null, severityStore = null, versionStore = null, buildnumberStore = null, hostStore = null, statusStore = null, assignedToStore = null;

var textFieldEditor=null, textFieldEditor1=null, textFieldEditor2=null, inline_textArea = null, datefield=null;
var buildNumberCombo=null, statusCombo=null, priorityCombo=null, severityCombo=null, versionCombo=null, closedInVersionCombo=null, testRoundCombo=null, hostCombo=null;
var gridColumnHeader=null;

var inlineEditComboLoaded = false;


//function preLoad(){
	//Creating store for Status Combo box
	statusStore = new Ext.data.ArrayStore({
	    fields: ['bugstatusname'],
	    data:[]
	});
	
	//Creating store for Status Combo box in Edit window
	statusStore_Edit = new Ext.data.ArrayStore({
	    fields: ['bugstatusname'],
	    data:[]
	});

	//Creating store for Priority Combo box
	priorityStore = new Ext.data.ArrayStore({
	    fields: ['priorityname'],
	    data:[]
	});
	

	//Creating store for Severity box
	severityStore = new Ext.data.ArrayStore({
	    fields: ['severityname'],
	    data:[]
	});

	//Creating store for Version Combo box
	versionStore = new Ext.data.ArrayStore({
	    fields: ['versionnumber'],
	    data:[]
	});

	//Creating store for  Build Number box
	buildnumberStore = new Ext.data.ArrayStore({
	    fields: ['buildnumber'],
	    data:[]
	});
	
	//Creating store for host Combo box
	hostStore = new Ext.data.ArrayStore({
	    fields: ['hostId'],
	    data:[]
	});

	/*
	//Creating proxy,reader & store for testedby Combo box
	testedByProxy=new Ext.data.HttpProxy(   
			{
				url:'testedByJson.jsp'
			}
	);
	testedByReader = new Ext.data.JsonReader({
	},	
	[
	 {name: 'userId', mapping: 'userId'},
	 {name: 'employee', mapping:'employee'}
	 ]);
	testedByStore=new Ext.data.Store({
		proxy:testedByProxy,
		reader:testedByReader
	});
	*/
	
	statusCombo = {
		xtype : 'combo',
		name:'cmbStatusInlEd',
		id:'cmbStatusInlEd',
		triggerAction : 'all',
		fieldLabel:'Status',
		emptyText:'',
		displayField : 'bugstatusname',
		valueField : 'bugstatusname',
		mode:'local',
		store :statusStore,
		listeners: {
			change: function(){ getAssignableUserIdForInlineAdd(); },
			select: function(){ getAssignableUserIdForInlineAdd(); }
		}
	};
	
	//Creating a combo box for severity field
	severityCombo = {
		xtype: 'combo',
		name: 'severity',
		id: 'severity',
		triggerAction: 'all',
		fieldLabel: 'Severity',
		emptyText: '',
		displayField: 'severityname',
		valueField: 'severityname',
		mode: 'local',
		store: severityStore
	};
	//Creating a combo box for priority field
	priorityCombo = {
		xtype: 'combo',
		name: 'priority',
		id: 'priority',
		triggerAction: 'all',
		emptyText: '',
		fieldLabel: 'Priority',
		mode: 'local',
		displayField: 'priorityname',
		valueField: 'priorityname',
		store: priorityStore
	};
	//Creating a combo box for buildNumber field
	buildNumberCombo = { 
		xtype: 'combo',
		name: 'buildNumber',
		id: 'buildNumber',
		triggerAction: 'all',
		mode: 'local',
		emptyText: '',
		fieldLabel: 'Build',
		displayField: 'buildnumber',
		valueField: 'buildnumber',
		store: buildnumberStore
	};
	//Creating a combo box for version field
	versionCombo = { 
		xtype: 'combo',
		name: 'versionGridCombo',
		id: 'versionGridCombo',
		triggerAction: 'all',
		fieldLabel: 'Version',
		emptyText: '',
		mode: 'local',
		displayField: 'versionnumber',
		valueField: 'versionnumber',
		store: versionStore
	};
	closedInVersionCombo = { 
		xtype: 'combo',
		name: 'closedInVersionCombo',
		id: 'closedInVersionCombo',
		triggerAction: 'all',
		fieldLabel: 'Version',
		emptyText: '',
		mode: 'local',
		displayField: 'versionnumber',
		valueField: 'versionnumber',
		store: versionStore
	};
	
	//Creating a combo box for host field
	hostCombo = {
		xtype: 'combo',
		name: 'host',
		id: 'host',
		emptyText: '',
		fieldLabel: 'Host',
		triggerAction: 'all',
		displayField: 'hostId',
		valueField: 'hostId',
		mode: 'local',
		store: hostStore
	};
	//Creating a combo box for project field
	
	//creating store for Detailed Add defect form
	assignedToStore = new Ext.data.JsonStore({
		url: 'assignedToJson.jsp',
		root: 'list_assignedTo',
		fields:['userId','employee']
	});
		
	textFieldEditor = new Ext.form.TextField(); 
	//textFieldEditor1 = new Ext.form.TextField();// 1
	textFieldEditor1 = {
		xtype: 'textfield',
		name:'txtTitleInlEd',
		id:'txtTitleInlEd'
	}
	textFieldEditor2 = new Ext.form.TextField();
	
	inline_textArea = new Ext.form.TextArea();
	
	
	//datefield= new Ext.form.DateField({format:'Y-m-d'});
	datefield = new Ext.form.DateField({
		xtype: 'datefield',
		name:'dateCreatedOnInlEd',
		id:'dateCreatedOnInlEd',
		format:'Y-m-d'
	/*,
		vtype:'daterange',
		disableFromToday: true*/
	});

//}

//Creating a combo box for grid testRound field
function testRoundLoad(varProjCode){
	var tt = {
		xtype: 'combo',
		name: 'testRound',
		id: 'testRound',
		emptyText: '',
		fieldLabel: 'Test Round',
		triggerAction: 'all',
		hiddenName: 'testRoundName',
		//hiddenName: 'projectCode_testRound',
		displayField: 'testRoundName',
		valueField: 'testRoundName',
		//valueField: 'projectCode_testRound',
		store: new Ext.data.JsonStore ({
			autoLoad: false,
			url: 'testRoundjson.jsp?projectCode_all='+varProjCode,
			//params: {projectCode_all:varProjCode},
			root: 'list_testRound',
			fields: ['testRoundName']
		})
	};
	return tt;
}

function loadInlineEditCombo(projectCode){
	if( inlineEditComboLoaded == false ){
		Ext.Ajax.request({
			url: './loadLookUp',
			params: { projectCode: projectCode },
			success: function(response){
				var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
				var lookUpData = jsonDataSuccess.data;
				//Loading the combo box stores
				statusCombo.store.loadData(lookUpData.bugstatus);
				priorityCombo.store.loadData(lookUpData.priority);
				severityCombo.store.loadData(lookUpData.severity);
				versionCombo.store.loadData(lookUpData.version);
				closedInVersionCombo.store.loadData(lookUpData.version);
				
				//buildnumberStore.load();
				//hostStore.load();
				inlineEditComboLoaded = true;
			},
			failure: function(response){
			
			}
		});
	}
}

// grid render functions used in Defects.java
function rendererGridModuleColumn(val, meta, record){
	return (record.data.ModuleId && (record.data.ModuleId).length > 0)?('['+record.data.ModuleId+']'+record.data.ModuleName):'';
}

function rendererGridTestCaseColumn(val, meta, record){
	return (record.data.TestCaseId && (record.data.TestCaseId).length > 0)?('['+record.data.TestCaseId+']'+record.data.TestCaseName):'';
}
