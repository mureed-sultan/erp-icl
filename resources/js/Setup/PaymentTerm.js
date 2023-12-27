var app = angular.module('myApp',[]);

app.controller('paymentTermCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////

	$scope.CfgPaymentTermSetup = {};
	$scope.newCfgPaymentTermSetup = {};
	$scope.editPaymentTerm = {};
	$scope.editPaymentTerm={};
	
	$scope.CfgPaymentTermSetup={};
	
	
	
	$scope.init = function(){
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		debugger;
	$scope.getPaymentTerm();
	};
	
	$scope.getPaymentTerm = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		
	    /* $http.get('/'+project_name+'/generatePaymentTermNo').success(function(data) {
	    	
				$scope.newCfgPaymentTermSetup.txtPaymentTermCode = data;
				
				});*/
			
		 $http.get('/'+project_name+'/getAllPaymentTerm').success(function(data) {
			 
			 debugger;
						$scope.CfgPaymentTermSetup = data;
						$scope.populateDataTable(data);
						}).error(function(data, status) {
							// debugger;
//							 alert("error");
							    
						     console.error('Repos error', status, data);
						  })
						  .finally(function() {
							 // debugger;
						    console.log("finally finished repos");
						    $(".se-pre-con").fadeOut("slow");
						  });;
	
	};


	$scope.addPaymentTerm = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		 debugger;
		var object = JSON.stringify($scope.newCfgPaymentTermSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewPaymentTerm',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Payment Term");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Payment Term added successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	else if(data=='error'){
            		alert(data);
            		$('#errMsgText').html("Unable to add Payment Term \n due to duplication of  Payment Term");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Payment Term \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updatePaymentTerm = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editPaymentTerm);
		$.ajax({
			url: '/'+project_name+'/updatePaymentTerm',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Payment Term");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Payment Term edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Payment Term \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtPaymentTermCodeforEdit){
		//alert(txtPaymentTermCodeforEdit);
		$scope.editPaymentTerm = $filter("filter")($scope.CfgPaymentTermSetup, {serPaymentTermId:txtPaymentTermCodeforEdit})[0];
	};
	

	
	$scope.deletePaymentTerm = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deletePaymentTerm',
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
  	  	
  	  	
  	  $.each(dataTable, function(index, paymentTerm) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+paymentTerm.serPaymentTermId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+paymentTerm.serPaymentTermId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+paymentTerm.serPaymentTermId+');angular.element(this).scope().$apply();" data-target="#editPaymentTermForm">Edit Payment Term</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+paymentTerm.serPaymentTermId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    		  paymentTerm.txtCode,
	    		  paymentTerm.txtName,
	    	  paymentTerm.blnStatus===true?"Active":"InActive"
	    		  ]).draw(); 
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