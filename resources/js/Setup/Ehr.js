var app = angular.module('myApp',[]);

app.controller('ehrCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgEhrSetup = {};
	$scope.ehrSetup = {};
	$scope.editEhr = {};
	$scope.editEhr={};
	$scope.CfgEhrSetup={};
	$scope.lstServiceProvider={};
	$scope.lstBaa={};
	
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
		
		$scope.getEhr();
		};
	
	
	$scope.getEhr = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
//		    alert(appPath);
		   
		
	     $http.get('/'+project_name+'/generateEhrNo').success(function(data) {
				$scope.ehrSetup.ehrName = data;
				
				}); 	
	     
        $http.get('/'+project_name+'/getAllBaa').success(function(data) {
			 
			 debugger;
						$scope.lstBaa = data;
						
						});
        
        $http.get('/'+project_name+'/getAllServiceProvider').success(function(data) {
			 
			 debugger;
						$scope.lstServiceProvider = data;
						
						});
        
        
			
		 $http.get('/'+project_name+'/getAllEhr').success(function(data) {
			 debugger;
						$scope.CfgEhrSetup = data;
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
		
	

	$scope.addEhr = function (){
		
		
		 
		
		
	
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.ehrSetup);
		//  alert();
  		  debugger;
		$.ajax({
            url: '/'+project_name+'/addNewEhr',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Ehr");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Ehr added successfully");
            		$('#successAlert').show();
            		$scope.ehrSetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Ehr \n due to duplication of  Ehr");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Ehr \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateEhr = function(){
		
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editEhr);
		$.ajax({
			url: '/'+project_name+'/updateEhr',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Ehr");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Ehr edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Ehr \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(ehrNameforEdit){
		//alert(ehrNameforEdit);
//		$scope.editEhr = $filter("filter")($scope.CfgEhrSetup, {ehrid:ehrNameforEdit})[0];
		$scope.editEhr = $filter('filter')
		(
				$scope.CfgEhrSetup,
				function(PP) {
					return (PP.ehrid == ehrNameforEdit)
				})[0];
	};
	

	
	$scope.deleteEhr = function(){
		
		$(".se-pre-con").fadeIn("slow");
		
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteEhr',
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
            		$scope.ehrSetup = {};
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
  	  $.each(dataTable, function(index, ehr) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+ehr.serEhrId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+ehr.ehrid+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+ehr.ehrid+');angular.element(this).scope().$apply();" data-target="#editEhrForm">Edit Ehr</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+ehr.serEhrId+'"/>';
*/  		 // debugger;
  		  
//  		alert(ehr.serviceProvider.serviceProviderName);
//  		debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  ehr.ehrName,
	    	  isEmpty(ehr.serviceProvider)?"":ehr.serviceProvider.serviceProviderName,
	    	  isEmpty(ehr.baa)?"":ehr.baa.baaName,
	    	  ehr.isActive===true?"Active":"InActive"]).draw(); 
  	  });
	};
	
	function isEmpty(val){
	    return (val === undefined || val == null || val.length <= 0) ? true : false;
	}
	
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