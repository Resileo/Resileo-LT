/**
 * Form menu items from webservice access-rights.<b> 
 */
function formMenuItems(){
	maskAll('Loading menu items');
	Ext.Ajax.request({
		url : './getMenuItems',
		success : function(response)
		{
			var arrMenuItems = null, arrToolbarItems = null;
			arrMenuItems = Ext.util.JSON.decode( response.responseText).data.menuitems;
			arrToolbarItems = Ext.util.JSON.decode( response.responseText).data.toolbar;
			createMenu(arrMenuItems, arrToolbarItems);	// create Menu
			unMaskAll();
		},
		failure: unMaskAll
	});
}

/**
 * Create Menu after menu-items are formed.
 */
function createMenu(arrMenuItems, arrToolbarItems){
	var newMenu = {
		text:'Menu',
		margins: { left: 10, right: 10 },
		style: { height: 14, lineHeight: "14px" },
		menu: arrMenuItems
	};
	if( Ext.get('menuToolbar') )	Ext.get('menuToolbar').remove();
	if( Ext.getDom('tdHeaderMenu') != null ){		// if header loaded in the page.
		var tb = new Ext.Toolbar({
			id: 'menuToolbar',
			renderTo: 'tdHeaderMenu',
			width: 650,
			autoHeight: true,
			cls: 'menuToolbar',
			items: [
				//newMenu,'','',arrToolbarItems
				arrToolbarItems
			]
		});
	}
}

function showLoginPage(){
	window.location.href = basePath+"/view/login.jsp?"+addTimeURLParam();
}

function showDefects(){
	window.location.href = basePath+"defects.jsp?"+addTimeURLParam();
}

function showDefectsFv(){
	window.location.href = basePath+"view/defectsfv.jsp?"+addTimeURLParam();
}


function showMyProject(){
	window.location.href = basePath+"view/myProject.jsp?"+addTimeURLParam();
}
function showProjectManager(){
	window.location.href = basePath+"view/projectManager.jsp?"+addTimeURLParam();
}

function showEnterpriseManager(){
	if( isAdmin() ){
		window.location.href = basePath+"view/enterpriseManager.jsp?"+addTimeURLParam();
	}else{
		showInfoWindow({title:'Message', msg:'Permission Denied'});
	}
}

function showTestPlan(){ 
	window.location.href = basePath+"view/testPlanModule.jsp?"+addTimeURLParam();
}

function showTestPlanfv(){ 
	window.location.href = basePath+"view/testplanfv.jsp?"+addTimeURLParam();
}
function showTestRun(){
	window.location.href = basePath+"view/testexecute.jsp?"+addTimeURLParam();
}

function showActionItem(){
	window.location.href = basePath+"view/actionItem.jsp?"+addTimeURLParam();
}

function showActionItemTest(){
	window.location.href = basePath+"view/test/TestGrid.jsp?"+addTimeURLParam();
}

function showSettingsPage(){
	window.location.href = basePath+"view/customize.jsp?"+addTimeURLParam();
}

function showMyProjects(){
	window.location.href = basePath+"view/myProject.jsp?"+addTimeURLParam();
}

function showChartPage(){
	window.location.href = basePath+"view/stdchart.jsp?"+addTimeURLParam();
}

function showCustomChartPage(){
	window.location.href = basePath+"view/Chart.jsp?"+addTimeURLParam();
}

function showCrossProjChartPage(){
	window.location.href = basePath+"view/crossprojchart.jsp?"+addTimeURLParam();
}

function showUsageChartPage(){
	window.location.href = basePath+"view/usageChart.jsp?"+addTimeURLParam();
}

function showRequirements(){
	window.location.href = basePath+"view/requirement.jsp?"+addTimeURLParam();
}


function showRequirementsFv(){
	window.location.href = basePath+"view/requirementfv.jsp?"+addTimeURLParam();
}

function showReportsPage(){
	window.location.href = basePath+"view/stdreports.jsp?"+addTimeURLParam();
}

function showDynamicReportsPage(){
	window.location.href = basePath+"view/dynamicReportGenerator.jsp?"+addTimeURLParam();
}

function showDashBoardScreen(){
	window.location.href = basePath+"view/dashboard.jsp?"+addTimeURLParam();
}

function showDashBoardConfigPage(){
	window.location.href = basePath+"view/dashboardconfig.jsp?"+addTimeURLParam();
}

function showUserGroupManagerPage(){
	window.location.href = basePath+"view/usergroups.jsp?"+addTimeURLParam();
}

function showSDFManagerPage(){
	window.location.href = basePath+"view/sdf.jsp?"+addTimeURLParam();
}

function showUDFManagerPage(){
	window.location.href = basePath+"view/UDF_Create.jsp?"+addTimeURLParam();
}

function showActivityMaster()
{
	showInfoWindow({title:'Message', msg:"Coming soon"});
}

function showHomePage(){
	window.location.href = basePath+"view/layout.jsp?"+addTimeURLParam();
}

function showKanbanBoardPage(){
	window.location.href = basePath+"view/kanbancard_BoardView.jsp?"+addTimeURLParam();
}

function showKanbanCardPage(params){
	window.location.href = basePath+"view/kanban_CardView.jsp?"+addTimeURLParam()+"&"+params;
}

function doSignout(){
	//alert( Ext.util.Cookies.get("last_activity_time") );
	//Ext.util.Cookies.set("last_activity_time", new Date(), new Date(new Date().getTime()+10000000000), "/", basePath);
	//alert( Ext.util.Cookies.get("last_activity_time") );
	window.location.href = basePath+"logout?"+addTimeURLParam();
}
