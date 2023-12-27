var app = angular.module('myApp',[]);

app.controller('patientCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgPatientSetup = {};
	$scope.patientSetup = {};
	$scope.editPatient = {};
	$scope.editPatient={};
	$scope.CfgPatientSetup={};
	$scope.lstCountry={};
	$scope.lstPatientAccount={};
	$scope.lstEHR ={};
	
	$scope.init = function(){
		
	/*	alert();
		
		debugger;
		var word="Deleveled";
		
		var lstWord=[];
		
		var c= word.length;
		
		for(  a=0; a <c;a++)
			{
			
			lstWord[a]=
			}*/
		
		$scope.getPatient();
		};
	
	
	$scope.getPatient = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
//		    alert(appPath);
		   
		
	    
	     
        $http.get('/'+project_name+'/getAllAccount').success(function(data) {
			 
			 debugger;
						$scope.lstPatientAccount = data;
						
						});
        
        $http.get('/'+project_name+'/getAllEhr').success(function(data) {
			 
			 debugger;
						$scope.lstEHR = data;
						
						});
        
        
			
		 $http.get('/'+project_name+'/getAllPatient').success(function(data) {
			 debugger;
						$scope.CfgPatientSetup = data;
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
		
	

	$scope.addPatient = function (){
			
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
//		alert();
		 debugger;
		var object = JSON.stringify($scope.patientSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewPatient',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Patient");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Patient added successfully");
            		$('#successAlert').show();
            		$scope.patientSetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Patient \n due to duplication of  Patient");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Patient \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updatePatient = function(){
		
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editPatient);
		$.ajax({
			url: '/'+project_name+'/updatePatient',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Patient");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Patient edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Patient \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(patientNameforEdit){

		$scope.editPatient = $filter('filter')
		(
				$scope.CfgPatientSetup,
				function(PP) {
					return (PP.patientid == patientNameforEdit)
				})[0];
	};
	

	
	$scope.deletePatient = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deletePatient',
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
            		$('#successMsgText').html("Region removed successfully");
            		$('#successAlert').show();
            		$scope.patientSetup = {};
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Region to remove error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify(ids)
        });
	};
	
	function isEmpty(val){
	    return (val === undefined || val == null || val.length <= 0) ? true : false;
	}
	$scope.selectUnselectAll=function(){
		$('tbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked);
        });
	};	
	

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  $.each(dataTable, function(index, patient) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+patient.patientid+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+patient.patientid+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+patient.patientid+');angular.element(this).scope().$apply();" data-target="#editPatientForm">Edit Patient</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+patient.serPatientId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  patient.firstName,
	    	  patient.middleName,
	    	  patient.lastName,
	    	  isEmpty(patient.account)?"":patient.account.firstName,
	    	  isEmpty(patient.ehr)?"":patient.ehr.ehrName,
	    			  patient.mrn,
	    			  patient.ssn,
	    			  patient.emailIds,
	    			  patient.homePhoneNo,
	    			  patient.officePhoneNo,
	    			  patient.mobilePhoneNo,
	    	  ]).draw(); 
  	  });
	};
	
	
	$scope.addCommas=function (nStr)
	{
		
		if(isEmpty(nStr))
			return '';
		
	    nStr += '';
	    x = nStr.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;
	}
	
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