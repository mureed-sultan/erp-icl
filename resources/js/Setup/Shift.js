var app = angular.module('myApp',[]);

app.controller('shiftCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.HrShiftSetup = {};
	$scope.newHrShiftSetup = {};
	$scope.editShift = {};
	$scope.editShift={};
	$scope.HrShiftSetup={};
	
	$scope.getShift = function(){
		$(".se-pre-con").fadeIn("slow");
		 
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;

		 $http.get('/'+project_name+'/getAllShiftInfos').success(function(data) {
						$scope.HrShiftSetup = data;
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
	
	$scope.getShift();
	};

	$scope.addShift = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		
		 debugger;
		 $scope.newHrShiftSetup.txtShiftStart= document.getElementById("st").value;
		 $scope.newHrShiftSetup.txtShiftEnd= document.getElementById("end").value;
		var object = JSON.stringify($scope.newHrShiftSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewShiftInfo',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Shift");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Shift added successfully");
            		$('#successAlert').show();
            		$scope.newHrShiftSetup={};
            		$scope.init();
            	}
            	else if(data=='error'){
            		alert(data);
            		$('#errMsgText').html("Unable to add Shift \n due to duplication of  Shift");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Shift \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateShift = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		 $scope.editShift.txtShiftStart= document.getElementById("st2").value;
		 $scope.editShift.txtShiftEnd= document.getElementById("end2").value;
		var object = JSON.stringify($scope.editShift);
		$.ajax({
			url: '/'+project_name+'/updateShiftInfo',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Shift");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Shift edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Shift \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtShiftCodeforEdit){
		//alert(txtShiftCodeforEdit);
		$scope.editShift = $filter("filter")($scope.HrShiftSetup, {serShiftInfoId:txtShiftCodeforEdit})[0];
	};
	

	
	$scope.deleteShift = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteShiftInfo',
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
	
	
	$scope.selectUnselectAll=function(){
		$('tbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked);
        });
	};	
	

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  $.each(dataTable, function(index, shift) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+shift.serShiftInfoId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+shift.serShiftInfoId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+shift.serShiftInfoId+');angular.element(this).scope().$apply();" data-target="#editShiftForm">Edit Shift</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+shift.serShiftId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  shift.txtShiftDescription,
	    	  shift.txtShiftStart,
	    	  shift.txtShiftEnd]).draw(); 
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