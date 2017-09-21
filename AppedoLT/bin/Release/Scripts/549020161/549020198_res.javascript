/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
var extViewWidth = 800;
var extViewHeight = 600;

var project_store = null, chartProjectCombo = null;

var store1 = null;
var store2 = null;
var store3 = null;
var store4 = null;		

var m_names = new Array("Jan", "Feb", "Mar", 
"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
"Oct", "Nov", "Dec");

Ext.onReady(function(){		
	extViewWidth = Ext.getBody().getViewSize().width;
	extViewHeight = Ext.getBody().getViewSize().height;
	
	//project combo
	var project_proxy=new Ext.data.HttpProxy({url:'webservercall/userprojects.jsp'});
	var project_reader=new Ext.data.JsonReader({
		root: 'projects'
	},
		[
			{name: 'projectcode', mapping: 'projectCode'},
			{name: 'projectname', mapping: 'projectName'},
			{name:'defaultproject', mapping:'defaultproject'}
		]
	);
	project_store=new Ext.data.Store({
		proxy:project_proxy,
		reader:project_reader
	});		
	
	// project combo
	chartProjectCombo = new Ext.form.ComboBox({
        fieldLabel: 'Projects',
        hiddenName:'ddlProjects',
        valueField:'projectcode',
		displayField:'projectname',
		store: project_store,
        typeAhead: true,
        mode: 'local',
        editable:false,
        triggerAction: 'all',                        
        selectOnFocus:true,
        width:130,
       	listeners: {
            select:function () {
            	AssignProjectCode(Ext.getDom("ddlProjects").value, 'loadAllPanels');
  			}
        }
    });
    
	project_store.on('load', function() {
		var sessionProject = strProjectCode;
		if(sessionProject == "" || sessionProject == null)
		{
			var defaultproject = project_store.getAt(0).data.defaultproject;
			if( defaultproject != "" ){
				chartProjectCombo.setValue(defaultproject);
				AssignProjectCode(defaultproject, afterProjectSetinSession);
			}
		}else{
			chartProjectCombo.setValue(sessionProject);
		
			formMenuItems();		//from menu.js
			
			if( Ext.getDom('ddlProjects').value != '' ){
				loadAllPanels();
			}
		}
	});
	project_store.load();
	
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	
	var d = day + '-' + m_names[month] + '-' +year;
	
	var start = {
	    id: 'start-panel',
	    title: 'Start Page',
	    layout: 'fit',
	    bodyStyle: 'padding:25px',
	    contentEl: 'north'  // pull existing content from the page
	};
	
	var absolute = {
	    id: 'absolute-panel',
	    layout: 'absolute',
	    tbar: ['&nbsp;&nbsp;',
	    '<b style=\'color:#15428B; font-family: tahoma; font-size: 11px; font-weight: bold;\'>Home</b>',
	    '&nbsp;&nbsp;',
	    'Projects:',chartProjectCombo,
	    {
                text: 'Set as Default Project',                 
                scale: 'medium',                             
                handler:function(){  
                    Ext.Ajax.request
					({
						url : './setDefaultProject',
						waitMsg:'Assigning Project now...',
						params : {
							projectCode:Ext.getDom("ddlProjects").value
						},
						success : function(response)
						{
							var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
							var successMessage = jsonDataSuccess.data.response;
							showInfoWindow({title:'', msg:'Default project has been assigned'});		// from util/utils.js
						},
						failure : function(response)
						{
							var jsonDataFailure = Ext.util.JSON.decode( response.responseText);
							var failureMessage = jsonDataFailure.data.response;
							showInfoWindow({title:'', msg:failureMessage});		// from util/utils.js
						}
					});
                }
        }  ],	    
	    defaults: {
	        //bodyStyle: 'padding:5px;',
	        width: 258,
	        height: 274,
	        frame: false
	    },	   	    
	    items:[
	    {
	        title: 'My Activities',
	        x: 0,
	        y: 0,        
	        html: '<span id=\'panel1\'></span>'
	    },{
	        title: 'Task Status as on ' + d,
	        x: 258,
	        y: 0,
	        html: '<span id=\'panel2\'></span>'
	    },{
	        title: 'Task to do Today ',
	        x: 516,
	        y: 0,
	        html: '<span id=\'panel3\'></span>'
	    },{
	        title: 'Assigned Issues as on ' + d,
	        x: 774,
	        y: 0,
	        html: '<span id=\'panel4\'></span>'
	    },{
	        title: 'Requirement Status',
	        x: 0,
	        y: 250,
	        height: ( extViewHeight - Ext.get("panel").getTop() - 13 - 274 ),
	        html: '<span id=\'panel5\'></span>',
	        autoScroll: true 
	    },{
	        title: 'Test Case Status',
	        x: 258,
	        y: 250,
	        height: ( extViewHeight - Ext.get("panel").getTop() - 13 - 274 ),
   			html: '<span id=\'panel6\'></span>',
   			autoScroll: true   			
	    },{
	        title: 'Execution Status',
	        x: 516,
	        y: 250,
	        height: ( extViewHeight - Ext.get("panel").getTop() - 13 - 274 ),
	        html: '<span id=\'panel7\'></span>',
	        autoScroll: true 
	    },{
	        title: 'Issue Status',
	        x: 774,
	        y: 250,
	        height: ( extViewHeight - Ext.get("panel").getTop() - 13 - 274 ),
	        html: '<span id=\'panel8\'></span>',
	        autoScroll: true 
	    }]
	};
	
	// This is an inner body element within the Details panel created to provide a "slide in" effect
	// on the panel body without affecting the body's box itself.  This element is created on
	// initial use and cached in this var for subsequent access.
	var detailEl;
	
	// This is the main content center region that will contain each example layout panel.
	// It will be implemented as a CardLayout since it will contain multiple panels with
	// only one being visible at any given time.
	var contentPanel = new Ext.Panel({
		id: 'content-panel',
		region: 'center', // this is what makes this panel into a region within the containing layout
		layout: 'card',
		margins: '2 0 0 0',
		activeItem: 0,
		border: false,
		width: extViewWidth,
		height: ( extViewHeight - Ext.get("panel").getTop() - 0 ),
		items: [ absolute ],
		renderTo: 'panel'
	});
	
	// Finally, build the main layout once all the pieces are ready.  This is also a good
	// example of putting together a full-screen BorderLayout within a Viewport.
    /*new Ext.Viewport({
		layout: 'border',
		title: 'Ext Layout Browser',
		items: [
			contentPanel
		],
        renderTo: 'panel',
        autoScroll: true
    });*/
});

function afterProjectSetinSession(){
	formMenuItems();		//from menu.js
	
	if( Ext.getDom('ddlProjects').value != '' ){
		loadAllPanels();
	}
}

function loadAllPanels() {
	dynamicgrid1();
	displayGrid1();
	
	dynamicgrid2();
	displayGrid2();
	
	dynamicgrid3();
	displayGrid3();
	
	dynamicgrid4();
	displayGrid4();
	
	dynamicgrid5();
	dynamicgrid6();
	dynamicgrid7();
	dynamicgrid8();
}

function dynamicgrid1()
{
	var urlGrid1 = null;	
	urlGrid1 = './homepageservlet?type=grid1&ddlProjectCode=' + Ext.getDom('ddlProjects').value;	
	var proxy1= new Ext.data.HttpProxy //creating new proxy inorder to retrieve data from  database in json format
	( 
		{url: urlGrid1}
	); 
	var reader1=new Ext.data.JsonReader(  //creating jsonreader in order to read data from  the specified url
	{
		root:'records'
	});
	store1= new Ext.data.Store(  //creating new store for the records
	{
				proxy:proxy1,
				reader: reader1,
				remoteSort: true
	}
	);
		

	Ext.data.DynamicJsonReader = function(config) 
	{

		Ext.data.DynamicJsonReader.superclass.constructor.call(this, config, []);

	};

	Ext.extend(Ext.data.DynamicJsonReader, Ext.data.JsonReader, 
	{
		readRecords : function(o){
		this.jsonData = o;
		if(o.metaData)
		{
			delete this.ef;
			this.meta = o.metaData;
			this.recordType = Ext.data.Record.create(o.metaData.fields);
			this.onMetaChange(this.meta, this.recordType, o);
		}
		else
		{
			var data = this.meta.root ? this.getJsonAccessor(this.meta.root)(o) : o;
			if (Ext.isArray(data) && data[0]) 
			{
				delete this.ef;
				var fields = [];
				for (var fieldName in data[0]) {
				fields.push(fieldName);
				}
				this.meta.fields = fields;
				this.recordType = Ext.data.Record.create(fields);
				this.onMetaChange(this.meta, this.recordType, o);
			}	
		}
	
		var s = this.meta,
		Record = this.recordType,
		f = Record.prototype.fields, 
		fi = f.items, fl = f.length;
		if (!this.ef) 
		{
			if(s.totalProperty) 
			{
				this.getTotal = this.getJsonAccessor(s.totalProperty);
			}
			if(s.success) 
			{
				this.getSuccess = this.getJsonAccessor(s.successProperty);
			}
			this.getRoot = s.root ? this.getJsonAccessor(s.root) : function(p){return p;};
			if (s.id) {
				var g = this.getJsonAccessor(s.id);
				this.getId = function(rec) 
				{
					var r = g(rec);
					return (r === undefined || r === "") ? null : r;
				};
			 }
			 else
			 {
				this.getId = function(){return null;};
			 }
			this.ef = [];
			for(var i = 0; i < fl; i++)
			{
				f = fi[i];
				var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
				this.ef[i] = this.getJsonAccessor(map);
			}
		}
		var root = this.getRoot(o), c = root.length, totalRecords = c, success = true;
		if(s.totalProperty)
		{
			var v = parseInt(this.getTotal(o), 10);
			if(!isNaN(v))
			{
				totalRecords = v;
			}
		}
		if(s.success)
		{
			var v = this.getSuccess(o);
			if(v === false || v === 'false')
			{
				success = false;
			}
		}
		var records = [];
		for(var i = 0; i < c; i++)
		{
			var n = root[i];
			var values = {};
			var id = this.getId(n);
			for(var j = 0; j < fl; j++)
			{
				f = fi[j];
				var v = this.ef[j](n);
				values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue, n);
			}
			var record = new Record(values, id);
			record.json = n;
			records[i] = record;
		}
    	return{
			success : success,
			records : records,
			totalRecords : totalRecords
		};
		}
	});

	Ext.grid.DynamicColumnModel = function(store, config)
	{
		sortable:true,
		Ext.grid.DynamicColumnModel.superclass.constructor.call(this, Ext.apply({store: store, columns: []}, config));
		if (store.fields) 
		{
			this.reconfigure();
		}
		store.on('load', this.reconfigure, this);
	};

	Ext.extend(Ext.grid.DynamicColumnModel, Ext.grid.ColumnModel, {
		reconfigure: function(){
			var cols = [];
			this.store.fields.each(function(field){
				cols.push({header: field.name, dataIndex: field.name});
			});
			this.setConfig(cols);
		}
	});
}  

function displayGrid1(){

	// remove grid if already exist
    if(Ext.get('grid1'))
	    Ext.get('grid1').remove();								
	
	 var colModel = new Ext.grid.ColumnModel([
  	    {header: 'Id', width: 40, sortable: true, dataIndex: 'actionid', hidden: true},
		{header: 'Title', width: 130, sortable: true, dataIndex: 'actionname'},
		{header: 'Status', width: 50, sortable: true, dataIndex: 'status'}
	 ]);	
	// create the grid    
    var grid1 = new Ext.grid.GridPanel({
        store: store1,        
        id:'grid1',        
		frame:false,		
        renderTo:'panel1',
        height:224,
		width:255,
		cm: colModel,
		selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
		loadMask:true,		
		remoteSort:true,
		sortable:true,
		stripeRows: true,		
		viewConfig :{
			forceFit:true
		}		
    });

   store1.load();	       	
}

function dynamicgrid2()
{
	var urlGrid2 = null;	
	urlGrid2 = './homepageservlet?type=grid2&ddlProjectCode=' + Ext.getDom('ddlProjects').value;	
	var proxy2= new Ext.data.HttpProxy //creating new proxy inorder to retrieve data from  database in json format
	( 
		{url: urlGrid2}
	); 
	var reader2=new Ext.data.JsonReader(  //creating jsonreader in order to read data from  the specified url
	{
		root:'records'
	});
	store2= new Ext.data.Store(  //creating new store for the records
	{
				proxy:proxy2,
				reader: reader2,
				remoteSort: true
	});
	
	Ext.data.DynamicJsonReader = function(config) 
	{
		Ext.data.DynamicJsonReader.superclass.constructor.call(this, config, []);
	};

	Ext.extend(Ext.data.DynamicJsonReader, Ext.data.JsonReader, 
	{
		readRecords : function(o){
		this.jsonData = o;
		if(o.metaData)
		{
			delete this.ef;
			this.meta = o.metaData;
			this.recordType = Ext.data.Record.create(o.metaData.fields);
			this.onMetaChange(this.meta, this.recordType, o);
		}
		else
		{
			var data = this.meta.root ? this.getJsonAccessor(this.meta.root)(o) : o;
			if (Ext.isArray(data) && data[0]) 
			{
				delete this.ef;
				var fields = [];
				for (var fieldName in data[0]) {
				fields.push(fieldName);
				}
				this.meta.fields = fields;
				this.recordType = Ext.data.Record.create(fields);
				this.onMetaChange(this.meta, this.recordType, o);
			}	
		}
	
		var s = this.meta,
		Record = this.recordType,
		f = Record.prototype.fields, 
		fi = f.items, fl = f.length;
		if (!this.ef) 
		{
			if(s.totalProperty) 
			{
				this.getTotal = this.getJsonAccessor(s.totalProperty);
			}
			if(s.success) 
			{
				this.getSuccess = this.getJsonAccessor(s.successProperty);
			}
			this.getRoot = s.root ? this.getJsonAccessor(s.root) : function(p){return p;};
			if (s.id) {
				var g = this.getJsonAccessor(s.id);
				this.getId = function(rec) 
				{
					var r = g(rec);
					return (r === undefined || r === "") ? null : r;
				};
			 }
			 else
			 {
				this.getId = function(){return null;};
			 }
			this.ef = [];
			for(var i = 0; i < fl; i++)
			{
				f = fi[i];
				var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
				this.ef[i] = this.getJsonAccessor(map);
			}
		}
		var root = this.getRoot(o), c = root.length, totalRecords = c, success = true;
		if(s.totalProperty)
		{
			var v = parseInt(this.getTotal(o), 10);
			if(!isNaN(v))
			{
				totalRecords = v;
			}
		}
		if(s.success)
		{
			var v = this.getSuccess(o);
			if(v === false || v === 'false')
			{
				success = false;
			}
		}
		var records = [];
		for(var i = 0; i < c; i++)
		{
			var n = root[i];
			var values = {};
			var id = this.getId(n);
			for(var j = 0; j < fl; j++)
			{
				f = fi[j];
				var v = this.ef[j](n);
				values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue, n);
			}
			var record = new Record(values, id);
			record.json = n;
			records[i] = record;
		}
    	return{
			success : success,
			records : records,
			totalRecords : totalRecords
		};
		}
	});

	Ext.grid.DynamicColumnModel = function(store, config)
	{
		sortable:true,
		Ext.grid.DynamicColumnModel.superclass.constructor.call(this, Ext.apply({store: store, columns: []}, config));
		if (store.fields) 
		{
			this.reconfigure();
		}
		store.on('load', this.reconfigure, this);
	};

	Ext.extend(Ext.grid.DynamicColumnModel, Ext.grid.ColumnModel, {
		reconfigure: function(){
			var cols = [];
			this.store.fields.each(function(field){
				cols.push({header: field.name, dataIndex: field.name});
			});
			this.setConfig(cols);
		}
	});
}  

function displayGrid2(){

	// remove grid if already exist
    if(Ext.get('grid2'))
	    Ext.get('grid2').remove();								
	
	 var colModel = new Ext.grid.ColumnModel([  	    
		{header: 'Status', width: 160, sortable: true, dataIndex: 'status'},
		{header: 'Count', width: 45, sortable: true, dataIndex: 'count'}
	 ]);	
	// create the grid    
    var grid2 = new Ext.grid.GridPanel({
        store: store2,        
        id:'grid2',        
		frame:false,		
        renderTo:'panel2',
        height:224,
		width:255,
		cm: colModel,
		selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
		loadMask:true,		
		//remoteSort:true,
		sortable:true,
		stripeRows: true,		
		viewConfig :{
			forceFit:true
		}		
    });

   store2.load();	       	
}
  
function dynamicgrid3()
{
	var urlGrid3 = null;	
	urlGrid3 = './homepageservlet?type=grid3&ddlProjectCode=' + Ext.getDom('ddlProjects').value;	
	var proxy3= new Ext.data.HttpProxy //creating new proxy inorder to retrieve data from  database in json format
	( 
		{url: urlGrid3}
	); 
	var reader3=new Ext.data.JsonReader(  //creating jsonreader in order to read data from  the specified url
	{
		root:'records'
	});
	store3= new Ext.data.Store(  //creating new store for the records
	{
				proxy:proxy3,
				reader: reader3,
				remoteSort: true
	}
	);
		

	Ext.data.DynamicJsonReader = function(config) 
	{

		Ext.data.DynamicJsonReader.superclass.constructor.call(this, config, []);

	};

	Ext.extend(Ext.data.DynamicJsonReader, Ext.data.JsonReader, 
	{
		readRecords : function(o){
		this.jsonData = o;
		if(o.metaData)
		{
			delete this.ef;
			this.meta = o.metaData;
			this.recordType = Ext.data.Record.create(o.metaData.fields);
			this.onMetaChange(this.meta, this.recordType, o);
		}
		else
		{
			var data = this.meta.root ? this.getJsonAccessor(this.meta.root)(o) : o;
			if (Ext.isArray(data) && data[0]) 
			{
				delete this.ef;
				var fields = [];
				for (var fieldName in data[0]) {
				fields.push(fieldName);
				}
				this.meta.fields = fields;
				this.recordType = Ext.data.Record.create(fields);
				this.onMetaChange(this.meta, this.recordType, o);
			}	
		}
	
		var s = this.meta,
		Record = this.recordType,
		f = Record.prototype.fields, 
		fi = f.items, fl = f.length;
		if (!this.ef) 
		{
			if(s.totalProperty) 
			{
				this.getTotal = this.getJsonAccessor(s.totalProperty);
			}
			if(s.success) 
			{
				this.getSuccess = this.getJsonAccessor(s.successProperty);
			}
			this.getRoot = s.root ? this.getJsonAccessor(s.root) : function(p){return p;};
			if (s.id) {
				var g = this.getJsonAccessor(s.id);
				this.getId = function(rec) 
				{
					var r = g(rec);
					return (r === undefined || r === "") ? null : r;
				};
			 }
			 else
			 {
				this.getId = function(){return null;};
			 }
			this.ef = [];
			for(var i = 0; i < fl; i++)
			{
				f = fi[i];
				var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
				this.ef[i] = this.getJsonAccessor(map);
			}
		}
		var root = this.getRoot(o), c = root.length, totalRecords = c, success = true;
		if(s.totalProperty)
		{
			var v = parseInt(this.getTotal(o), 10);
			if(!isNaN(v))
			{
				totalRecords = v;
			}
		}
		if(s.success)
		{
			var v = this.getSuccess(o);
			if(v === false || v === 'false')
			{
				success = false;
			}
		}
		var records = [];
		for(var i = 0; i < c; i++)
		{
			var n = root[i];
			var values = {};
			var id = this.getId(n);
			for(var j = 0; j < fl; j++)
			{
				f = fi[j];
				var v = this.ef[j](n);
				values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue, n);
			}
			var record = new Record(values, id);
			record.json = n;
			records[i] = record;
		}
    	return{
			success : success,
			records : records,
			totalRecords : totalRecords
		};
		}
	});

	Ext.grid.DynamicColumnModel = function(store, config)
	{
		sortable:true,
		Ext.grid.DynamicColumnModel.superclass.constructor.call(this, Ext.apply({store: store, columns: []}, config));
		if (store.fields) 
		{
			this.reconfigure();
		}
		store.on('load', this.reconfigure, this);
	};

	Ext.extend(Ext.grid.DynamicColumnModel, Ext.grid.ColumnModel, {
		reconfigure: function(){
			var cols = [];
			this.store.fields.each(function(field){
				cols.push({header: field.name, dataIndex: field.name});
			});
			this.setConfig(cols);
		}
	});
}

function displayGrid3(){

	// remove grid if already exist
    if(Ext.get('grid3'))
	    Ext.get('grid3').remove();								
	
	var colModel = new Ext.grid.ColumnModel([
  	    {header: 'Id', width: 40, sortable: true, dataIndex: 'actionid', hidden: true},
		{header: 'Title', width: 130, sortable: true, dataIndex: 'actionname'},
		{header: 'Status', width: 50, sortable: true, dataIndex: 'status'}
	]);	
	
	// create the grid    
    var grid3 = new Ext.grid.GridPanel({
        store: store3,        
        id:'grid3',        
		frame:false,		
        renderTo:'panel3',
        height:224,
		width:255,
		cm: colModel,
		selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
		loadMask:true,		
		remoteSort:true,
		sortable:true,
		stripeRows: true,		
		viewConfig :{
			forceFit:true
		}		
    });

   store3.load();	       	
} 

function dynamicgrid4()
{
	var urlGrid4 = './homepageservlet?type=grid4&ddlProjectCode=' + Ext.getDom('ddlProjects').value;
	var proxy4= new Ext.data.HttpProxy //creating new proxy inorder to retrieve data from  database in json format
	( 
		{url: urlGrid4}
	); 
	var reader4=new Ext.data.JsonReader(  //creating jsonreader in order to read data from  the specified url
	{
		root:'records'
	});
	store4= new Ext.data.Store(  //creating new store for the records
	{
				proxy:proxy4,
				reader: reader4,
				remoteSort: true
	});
	
	Ext.data.DynamicJsonReader = function(config) 
	{

		Ext.data.DynamicJsonReader.superclass.constructor.call(this, config, []);

	};

	Ext.extend(Ext.data.DynamicJsonReader, Ext.data.JsonReader, 
	{
		readRecords : function(o){
		this.jsonData = o;
		if(o.metaData)
		{
			delete this.ef;
			this.meta = o.metaData;
			this.recordType = Ext.data.Record.create(o.metaData.fields);
			this.onMetaChange(this.meta, this.recordType, o);
		}
		else
		{
			var data = this.meta.root ? this.getJsonAccessor(this.meta.root)(o) : o;
			if (Ext.isArray(data) && data[0]) 
			{
				delete this.ef;
				var fields = [];
				for (var fieldName in data[0]) {
				fields.push(fieldName);
				}
				this.meta.fields = fields;
				this.recordType = Ext.data.Record.create(fields);
				this.onMetaChange(this.meta, this.recordType, o);
			}	
		}
	
		var s = this.meta,
		Record = this.recordType,
		f = Record.prototype.fields, 
		fi = f.items, fl = f.length;
		if (!this.ef) 
		{
			if(s.totalProperty) 
			{
				this.getTotal = this.getJsonAccessor(s.totalProperty);
			}
			if(s.success) 
			{
				this.getSuccess = this.getJsonAccessor(s.successProperty);
			}
			this.getRoot = s.root ? this.getJsonAccessor(s.root) : function(p){return p;};
			if (s.id) {
				var g = this.getJsonAccessor(s.id);
				this.getId = function(rec) 
				{
					var r = g(rec);
					return (r === undefined || r === "") ? null : r;
				};
			 }
			 else
			 {
				this.getId = function(){return null;};
			 }
			this.ef = [];
			for(var i = 0; i < fl; i++)
			{
				f = fi[i];
				var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
				this.ef[i] = this.getJsonAccessor(map);
			}
		}
		var root = this.getRoot(o), c = root.length, totalRecords = c, success = true;
		if(s.totalProperty)
		{
			var v = parseInt(this.getTotal(o), 10);
			if(!isNaN(v))
			{
				totalRecords = v;
			}
		}
		if(s.success)
		{
			var v = this.getSuccess(o);
			if(v === false || v === 'false')
			{
				success = false;
			}
		}
		var records = [];
		for(var i = 0; i < c; i++)
		{
			var n = root[i];
			var values = {};
			var id = this.getId(n);
			for(var j = 0; j < fl; j++)
			{
				f = fi[j];
				var v = this.ef[j](n);
				values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue, n);
			}
			var record = new Record(values, id);
			record.json = n;
			records[i] = record;
		}
    	return{
			success : success,
			records : records,
			totalRecords : totalRecords
		};
		}
	});

	Ext.grid.DynamicColumnModel = function(store, config)
	{
		sortable:true,
		Ext.grid.DynamicColumnModel.superclass.constructor.call(this, Ext.apply({store: store, columns: []}, config));
		if (store.fields) 
		{
			this.reconfigure();
		}
		store.on('load', this.reconfigure, this);
	};

	Ext.extend(Ext.grid.DynamicColumnModel, Ext.grid.ColumnModel, {
		reconfigure: function(){
			var cols = [];
			this.store.fields.each(function(field){
				cols.push({header: field.name, dataIndex: field.name});
			});
			this.setConfig(cols);
		}
	});
}

function displayGrid4(){

	// remove grid if already exist
    if(Ext.get('grid4'))
	    Ext.get('grid4').remove();
	
	var colModel = new Ext.grid.ColumnModel([
  	    {header: 'Id', width: 40, sortable: true, dataIndex: 'bugid', hidden: true},
		{header: 'Title', width: 75, sortable: true, dataIndex: 'title'},
		{header: 'Status', width: 25, sortable: true, dataIndex: 'status'}
	]);
	
	// create the grid    
    var grid4 = new Ext.grid.GridPanel({
        store: store4,        
        id:'grid4',        
		frame:false,		
        renderTo:'panel4',
        height:224,
		width:255,
		cm: colModel,
		selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
		loadMask:true,		
		remoteSort:true,
		sortable:true,
		stripeRows: true,		
		viewConfig :{
			forceFit:true
		}		
    });

   store4.load();  	
}

function dynamicgrid5()
{
	Ext.Ajax.request
	({
		url : './homepageservlet?type=grid5&ddlProjectCode=' + Ext.getDom('ddlProjects').value,			
		success: function(response)
		{
			var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
			var strMsg = jsonDataSuccess.str;				
			//Ext.getCmp('reqSumText').html = strMsg;
			Ext.getDom('panel5').innerHTML = strMsg;
		} 
	});		
}

function dynamicgrid6()
{
	Ext.Ajax.request
	({
		url : './homepageservlet?type=grid6&ddlProjectCode=' + Ext.getDom('ddlProjects').value,			
		success: function(response)
		{
			var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
			var strMsg = jsonDataSuccess.str;								
			Ext.getDom('panel6').innerHTML = strMsg;
		}
	});		 
}

function dynamicgrid7()
{
	Ext.Ajax.request
	({
		url : './homepageservlet?type=grid7&ddlProjectCode=' + Ext.getDom('ddlProjects').value,			
		success: function(response)
		{
			var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
			var strMsg = jsonDataSuccess.str;								
			Ext.getDom('panel7').innerHTML = strMsg;
		}
	});		 
} 

function dynamicgrid8()
{ 
	Ext.Ajax.request
	({
		url : './homepageservlet?type=grid8&ddlProjectCode=' + Ext.getDom('ddlProjects').value,			
		success: function(response)
		{
			var jsonDataSuccess = Ext.util.JSON.decode( response.responseText);
			var strMsg = jsonDataSuccess.str;								
			Ext.getDom('panel8').innerHTML = strMsg;
		}
	});		 
}