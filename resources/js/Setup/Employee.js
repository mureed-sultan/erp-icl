var app = angular.module('myApp',[]);

app.controller('employeeCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.HrEmployeeSetup = {};
	$scope.newHrEmployeeSetup = {};
	$scope.editEmployee = {};
	$scope.editEmployee={};
	$scope.HrEmployeeSetup={};
	$scope.lstDepartment={};
    $scope.lstDesignation={};
    $scope.lstCity ={};
    $scope.lstBank ={};
    $scope.lstSupplier={};
    $scope.lstShifts={};
    $scope.lstJobs= {};
    $scope.lstJobType= [ "Skilled", "Non skilled"];
    $scope.lstStatus= [ "Working", "Blocked", "Suspended" ];
    $scope.lstArea=[];
    $scope.patterns = {
	        integer: /^-?\d+$/
	      };
	$scope.pattern_number="^(?=.*[0-9])";
	$scope.getEmployee = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		    

	        $http.get('/'+project_name+'/getAllArea').success(function(data) {
				 
				 debugger;
							$scope.lstArea = data;
							
							});
		
//	     $http.get('/'+project_name+'/generateEmployeeNo').success(function(data) {
//				$scope.newHrEmployeeSetup.txtEmployeeCode = data;
//				
//				});
	     
//	     $http.get('/'+project_name+'/getAllDepartments').success(function(data) {
//				$scope.lstDepartment = data;
//							
//	     		});
//	     
//	     $http.get('/'+project_name+'/getAllDesignations').success(function(data) {
//				$scope.lstDesignation = data;
//									
//	     		});
	
//	     $http.get('/'+project_name+'/getAllSupplier').success(function(data) {
//				$scope.lstSupplier = data;
//				
//									
//	     		});
//	     
//	     $http.get('/'+project_name+'/getAllCity').success(function(data) {
//						$scope.lstCity = data;
//			});
//	     
//	     $http.get('/'+project_name+'/getAllBank').success(function(data) {
//						$scope.lstBank = data;
//			});
//	     
//	     $http.get('/'+project_name+'/getAllShiftInfos').success(function(data) {
//						$scope.lstShifts = data;
//			});
//	     $http.get('/'+project_name+'/getAllJobs').success(function(data) {
//	    	 console.log(data );
// 						$scope.lstJobs = data;
//			});
//			
		 $http.get('/'+project_name+'/getAllEmployees').success(function(data) {
						$scope.HrEmployeeSetup = data;
						$scope.populateDataTable(data);
						 		
		}).error(function(data, status) {
			// debugger;
			// alert("error");
			    
		     console.error('Repos error', status, data);
		  })
		  .finally(function() {
			 // debugger;
		    console.log("finally finished repos");
		    $(".se-pre-con").fadeOut("slow");
		  });;
	};
		
	$scope.init = function(){
		
	$scope.getEmployee();
	};

	$scope.checkCNIC=function(){
		
		newHrEmployeeSetup2={};
		newHrEmployeeSetup2 = $filter('filter')
		(
				$scope.HrEmployeeSetup,
				function(employee) {
					return (employee.txtCnic == $scope.newHrEmployeeSetup.txtCnic )
							
				})[0];
		 if(!isEmpty(newHrEmployeeSetup2))
		 $scope.newHrEmployeeSetup=newHrEmployeeSetup2;
	};
	
$scope.checkCode=function(){
		
		newHrEmployeeSetup2={};
		newHrEmployeeSetup2 = $filter('filter')
		(
				$scope.HrEmployeeSetup,
				function(employee) {
					return (employee.txtEmployeeCode == $scope.newHrEmployeeSetup.txtEmployeeCode )
							
				})[0];
		 if(!isEmpty(newHrEmployeeSetup2))
		 $scope.newHrEmployeeSetup=newHrEmployeeSetup2;
	};
	
	
	$scope.addEmployee = function (){
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.newHrEmployeeSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewEmployee',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Employee");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Employee added successfully");
            		$('#successAlert').show();
            		$scope.newHrEmployeeSetup={};
            		$scope.init();
            	}
            	else if(data=='error'){
            		alert(data);
            		$('#errMsgText').html("Unable to add Employee \n due to duplication of  Employee");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Employee \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateEmployee = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		debugger;
		
		var object = JSON.stringify($scope.editEmployee);
		$.ajax({
			url: '/'+project_name+'/updateEmployee',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Employee");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Employee edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Employee \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtEmployeeCodeforEdit){
		//alert(txtEmployeeCodeforEdit);
		$scope.editEmployee = $filter("filter")($scope.HrEmployeeSetup, {serEmployeeId:txtEmployeeCodeforEdit})[0];
	};
	

	
	$scope.deleteEmployee = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteEmployee',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Region");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Employee removed successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Employee to remove error");
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
	
	function isEmpty(val){
	    return (val === undefined || val == null || val.length <= 0) ? true : false;
	}
	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  $.each(dataTable, function(index, employee) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+employee.serEmployeeId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+employee.serEmployeeId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+employee.serEmployeeId+');angular.element(this).scope().$apply();" data-target="#editEmployeeForm">Edit Employee</a></li>'+
							  		  '</ul>'+
							  		'</a><input type="checkbox" id="'+employee.serEmployeeId+'"/>';
  		/**/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  employee.txtEmployeeCode,
	    	  employee.txtEmployeeName,
	    	  employee.txtMobileNo	,
	    	  employee.txtCnic	,
	    	  
	    			  employee.txtEmail	  ,
	    	  employee.blnStatus===true?"Active":"InActive"]).draw(); 
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