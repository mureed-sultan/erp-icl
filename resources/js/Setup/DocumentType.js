var app = angular.module('myApp',[]);

app.controller('documentTypeCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////

	$scope.CfgDocumentTypeSetup = {};
	$scope.newCfgDocumentTypeSetup = {};
	$scope.editDocumentType = {};
	$scope.editDocumentType={};
	
	$scope.CfgDocumentTypeSetup={};
	
	 $scope.counter = 0;
	    $scope.max = 30;

	    $scope.increment = function(){
	        var types = ['danger', 'warning', 'info', 'success']
	      
	        $scope.counter = $scope.counter + 1;
	        $scope.dynamic = $scope.counter / $scope.max * 100;
	        $scope.type = types[$scope.counter % 4];
	    }
	
	$scope.init = function(){
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		debugger;
	$scope.getDocumentType();
	};
	
	$scope.getDocumentType = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		
	    /* $http.get('/'+project_name+'/generateDocumentTypeNo').success(function(data) {
	    	
				$scope.newCfgDocumentTypeSetup.txtDocumentTypeCode = data;
				
				});*/
			
		 $http.get('/'+project_name+'/getAllDocumentType').success(function(data) {
			 
			 debugger;
						$scope.CfgDocumentTypeSetup = data;
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


	$scope.addDocumentType = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		 debugger;
		var object = JSON.stringify($scope.newCfgDocumentTypeSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewDocumentType',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add DocumentType");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("DocumentType added successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	else if(data=='error'){
            		alert(data);
            		$('#errMsgText').html("Unable to add DocumentType \n due to duplication of  DocumentType");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add DocumentType \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateDocumentType = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editDocumentType);
		$.ajax({
			url: '/'+project_name+'/updateDocumentType',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit DocumentType");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("DocumentType edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit DocumentType \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtDocumentTypeCodeforEdit){
		//alert(txtDocumentTypeCodeforEdit);
		$scope.editDocumentType = $filter("filter")($scope.CfgDocumentTypeSetup, {serDocumentTypeId:txtDocumentTypeCodeforEdit})[0];
	};
	

	
	$scope.deleteDocumentType = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteDocumentType',
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
  	  	
  	  	
  	  $.each(dataTable, function(index, documentType) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+documentType.serDocumentTypeId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+documentType.serDocumentTypeId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+documentType.serDocumentTypeId+');angular.element(this).scope().$apply();" data-target="#editDocumentTypeForm">Edit DocumentType</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+documentType.serDocumentTypeId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    		  documentType.txtCode,
	    		  documentType.txtName,
	    	  documentType.blnStatus===true?"Active":"InActive"
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