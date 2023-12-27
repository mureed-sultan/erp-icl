var app = angular.module('myApp',[]);

app.controller('roleCtrl', function($scope, $http, $filter){
	

	$scope.Roles = {};
	$scope.newRole = {};
	$scope.newRoleNo = "";
	// $scope.generateNewRole={};
	$scope.editRole = {};
	$scope.ActiveRoles=[];
	
	
$scope.getRoles = function(){ 
	
	 var pathArray = location.pathname.split('/');
	    var appPath = "";//"/";
	    for(var i=1; i<pathArray.length-1; i++) {
	        appPath += pathArray[i] ;
	        //+ "/";
	    }
	    project_name=appPath;
	    
		$(".se-pre-con").fadeIn("slow");
		$http.get('/'+project_name+'/getAllRole').success(function(data){
			$scope.Roles = data;
			$scope.populateDataTable(data);
			
		}).error(function(data, status) {
			
			    
		     console.error('Repos error', status, data);
		  })
		  .finally(function() {
			 
		    console.log("finally finished repos");
		    $(".se-pre-con").fadeOut("slow");
		  });;
		  
		  
			$http.get('/'+project_name+'/getActiveRole').success(function(data){
				$scope.ActiveRoles = data;
				
				
			}) ;
	};
		
	$scope.init = function(){
		

		/* $http.get('/'+project_name+'/getNewRole').success(function(data) {
			$scope.newRole = data;});*/
		
		/*$http.get('/'+project_name+'/generateRoleNo').success(function(data){
			debugger;

			  var g=document.getElementById("desigcode");
			  g.value=data;
		});*/
debugger;
		$scope.getRoles();
	
		window.setTimeout( $scope.resetDropDown, 1000 );

	};
	
	$scope.resetDropDown=function()
		{
//			$('.selectpicker').selectpicker('refresh');
		}
	
	
	$scope.addRole = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		
		debugger;
		
		
			/*var g=document.getElementById("desigcode");

				$scope.newRole.txtRoleCode = g.value;	*/


	
		var object = JSON.stringify($scope.newRole);
		debugger;
		$.ajax({
            url: '/'+project_name+'/addNewRole',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Role");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='EXIST'){
            		$('#errMsgText').html("Role already Exist.");
            		$('#addErrorAlert').show();
            		
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Role added successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Role \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  		//	location.href = "Role";
	  			 $('#addCloseButton').click();
			},
            data: object
        });
	};
	
	
	$scope.updateRole = function(){
		debugger;
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		if(document.getElementById("desigstat").checked===true)
			{
			$scope.editRole.blnStatus=true;
			}
		else if(document.getElementById("desigstat").checked===false)
			{
			$scope.editRole.blnStatus=false;
			}
		
		
		var object = JSON.stringify($scope.editRole);
		$.ajax({
			url: '/'+project_name+'/updateRole',
	 	type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Role");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='EXIST'){
            		$('#errMsgText').html("Role already Exist.");
            		$('#addErrorAlert').show();
            		
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Role edited successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to edit Role \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton1').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(RoleId){
		debugger;

		$scope.editRole = $filter("filter")($scope.Roles, {serRoleId:RoleId})[0];
		if($scope.editRole.blnStatus===true)
			document.getElementById("desigstat").checked=true;
		else if($scope.editRole.blnStatus===false)
			document.getElementById("desigstat").checked=false;
	};
	
/*	$scope.activateRole = function(RoleId){
		$scope.editRole = $filter("filter")($scope.Roles, {serRoleId:RoleId})[0];
		if($scope.editRole.boolStatus ===0)
		$scope.editRole.boolStatus = 1;
		else if($scope.editRole.boolStatus ===1)
			$scope.editRole.boolStatus = 0;	
		$scope.updateRole();
	};
	*/
	
	
	$scope.deleteRoles = function(){
		
		
		
	
		
		debugger;
	
		var ids="";
		var check=0;
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{    
				 
				 debugger;
				 var a=parseInt($(this).prop('id'));
				
				newRole={};
				newRole = $filter('filter')
				(
						$scope.ActiveRoles,
						function(role) {
							return (parseInt(role.serRoleId) === a )
									
						})[0];
				 if(!isEmpty(newRole))
					 {
					 check=1;
					 alert("Role is in Use.");
				       return
			}
					 
				ids+=$(this).prop('id')+",";
			}
        });
		
		if(check==1)
			return;
		
		$(".se-pre-con").fadeIn("slow");
		
		$.ajax({
            url: '/'+project_name+'/deleteRole',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Role");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Role removed successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Role to remove error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify(ids)
        });
	};
	
	$scope.selectUnselectAll=function(){
		$('tbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked);
        });
	};	
	

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
		
		 
  	  	table.clear();
  	  $.each(dataTable, function(index, Role) {
  		/*var assignedRoles = $filter('filter')($scope.employees, function(employee){
			return (employee.AdminTableRole !=null && employee.AdminTableRole !=undefined &&  employee.AdminTableRole.serRoleId  == Role.serRoleId)?employee:null;
        });
        */
  		//var activateColumn="";
  		var editDeleteColumn=""; 
  		
  		 editDeleteColumn ='<div class="dropdown" id="dropdown'+Role.serRoleId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+Role.serRoleId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
						  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+Role.serRoleId+');angular.element(this).scope().$apply();" data-target="#editRoleForm">Edit Role </a></li>'+
							  		  '</ul>';
  		// if(assignedRoles.length==0){
    editDeleteColumn +=	'</a><input type="checkbox" id="'+Role.serRoleId+'"/>';
//}
  		 
  		 

  		  
  			
  		
  		var status="";
		  if(Role.blnStatus===true)
			  {
			  status="Active";
			  }
		  else if(Role.blnStatus===false){
			  status="InActive";
		  }
  		debugger;
	      table.row.add([editDeleteColumn,
	    	  ++index,
//	    	  Role.txtRoleCode,
	    	  Role.txtRoleName,
	    	  status
	    	  ]).draw();
  		 
  	  });
	};
	function isEmpty(val){
	    return (val === undefined || val == null || val.length <= 0) ? true : false;
	}
	$scope.checkErr = function(){
		var start = new Date($scope.startDate);
		 var end = new Date($scope.endDate);
		  $scope.errMessage = '';
		  $scope.cursDate = new Date();
		  if (end < start){
		   
		    $scope.errMessage = 'End Date should be greate than start date';
		    return false;
		  }

		  if (start < $scope.curDate){
			  $scope.errMessage = 'Start date should not be before today.';
		    return false;
		  }
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