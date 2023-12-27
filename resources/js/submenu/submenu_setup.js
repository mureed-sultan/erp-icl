var app = angular.module('myApp',[]);

app.controller('userCtrl', function($scope, $http, $filter){
	//$scope.regex = '/^(\d{5}-\d{8}-\d{1})$/g';
	
	$scope.Users = {};

	$scope.newUser = {};
	$scope.departments = {};
	$scope.designations = {};
	$scope.areas = {};
	
	$scope.lstTOSave=[];
	$scope.RolesRight=[];
	$scope.subMenuRole={};
	
	$scope.subMenuRole = {
	        
	        "cfgTblSubMenu": {},
	        "cfgTblRole": {}
	    }
	$scope.newUserNo = "";
	$scope.SubMenuRole=[];
	
	$scope.editUser = {};
	$scope.uploadFile={};
	$scope.uploadFile_sign={};
	$scope.file_show;
	$scope.rightsList = []; 
	$scope.showIndex=function(){
		debugger;
		alert($document.getElementById("empstat2"));
	}
		
	$scope.init = function(){
		
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		

		$http.get('/'+project_name+'/getAllRole').success(function(data){
			  $scope.roles = data; });
		
		
		$http.get('/'+project_name+'/getAllSubMenu').success(function(data) {
			$scope.Submenu = data;
			debugger;
			//$scope.populateDataTable(data);
		});
		
		$http.get('/'+project_name+'/getAllSubMenuRole').success(function(data) {
			$scope.SubMenuRole = data;
			debugger;
			//$scope.populateDataTable(data);
		});
		
		
		window.setTimeout( $scope.resetDropDown, 1000 );

	};
	$scope.resetDropDown=function()
		{
			$('.selectpicker').selectpicker('refresh');
		}
	
	$scope.OnRoleSelect=function(value)
	{
		
		
		debugger;
		$scope.RolesRight = $filter('filter')
		(
				$scope.SubMenuRole,
				function(subMenuRole) {
					return (subMenuRole.cfgTblRole.serRoleId == value );// $scope.newSubmenurole.cfgTblRole.serRoleId)
							
				});
		
		
		
		for (i = 0; i < $scope.Submenu.length; i++) {
			
			$scope.Submenu[i].blIsAdd=false;
			
			$scope.Submenu[i].blIsDelete=false;
			
			$scope.Submenu[i].blIsUpdate=false;
			
			$scope.Submenu[i].blIsview=false;
			
			$scope.Submenu[i].blIsAll=false;
			
			$scope.Submenu[i].serSubMenuRoleId=null;
			
			for (j = 0; j < $scope.RolesRight.length; j++){
				
				if( $scope.Submenu[i].serSubMenuId === $scope.RolesRight[j].cfgTblSubMenu.serSubMenuId)
					{
					
					$scope.Submenu[i].blIsAdd=$scope.RolesRight[j].blIsAdd;
					
					$scope.Submenu[i].blIsDelete=$scope.RolesRight[j].blIsDelete;
					
					$scope.Submenu[i].blIsUpdate=$scope.RolesRight[j].blIsUpdate;
					
					$scope.Submenu[i].blIsview=$scope.RolesRight[j].blIsview;
					
					$scope.Submenu[i].blIsAll=$scope.RolesRight[j].blIsAll;
					
					$scope.Submenu[i].serSubMenuRoleId=$scope.RolesRight[j].serSubMenuRoleId;
					
					
					
					}
			}
			
		}
		
	}

	function onSelectAllClick(sub)

	{
		sub.blIsview=true;
		sub.blIsAdd=true;
		sub.blIsUpdate=true;
		sub.blIsDelete=true;
		
	}

	function isEmpty(val){
	    return (val === undefined || val == null || val.length <= 0) ? true : false;
	}
	
$scope.addNewSubMenuRoleinList = function (){
	


							debugger;
						if (isEmpty($scope.Submenu)
								|| ($scope.Submenu.length <= 0)) {
							alert(" There is no Component to Save.");
							return;
						}

						for (i = 0; i < $scope.Submenu.length; i++) {
							
							$scope.subMenuRole.cfgTblSubMenu.serSubMenuId=$scope.Submenu[i].serSubMenuId;
							
							$scope.subMenuRole.cfgTblRole.serRoleId=$scope.newSubmenurole.cfgTblRole.serRoleId;
							
							$scope.subMenuRole.blIsAdd=$scope.Submenu[i].blIsAdd;
							
							$scope.subMenuRole.blIsview=$scope.Submenu[i].blIsview;
							
							$scope.subMenuRole.blIsDelete=$scope.Submenu[i].blIsDelete;
							
							$scope.subMenuRole.blIsUpdate=$scope.Submenu[i].blIsUpdate;
							
							$scope.subMenuRole.blIsAll=$scope.Submenu[i].blIsAll;
							
							$scope.subMenuRole.serSubMenuRoleId=$scope.Submenu[i].serSubMenuRoleId;
							
							
							
							$scope.lstTOSave.push(angular.copy($scope.subMenuRole));
							
							/*if (!($scope.Submenu[i].numQuantity >= 0)) {
								alert(" Please Enter Valid  Quantity.");
								return;
							}*/
						}
							 
	$(".se-pre-con").fadeIn("slow");
	$('#addErrorAlert').hide();
	$('#successAlert').hide();
	
	debugger;

//	var object = JSON.stringify($scope.newUser);
	
	var object = $scope.lstTOSave;
	
	
	debugger;
	$.ajax({
        url: '/'+project_name+'/addNewSubMenuRoleinList',
        type: 'post',
        'headers': {
			'Content-Type': 'application/json'
		},
        dataType: 'json',
        success: function (data) {
        	if(data=='Failure'){
        		$('#errMsgText').html("Unable to add Rights");
        		$('#addErrorAlert').show();
        	}
        	else if(data=='Success'){
        		$('#successMsgText').html("Rights added successfully");
        		$('#successAlert').show();
        		$scope.init();
        	}
        },
  		'error': function(xhr, d, err){
  			$('#errMsgText').html("Unable to add Rights \n Internal Error");
    		$('#addErrorAlert').show();
  		},complete: function(){
  			$(".se-pre-con").fadeOut("slow");
  			//location.href = "User";
  			// $('#addCloseButton').click();
		},
//        data: object
		data: angular.toJson(object)
    });
};
	
	


	
}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);