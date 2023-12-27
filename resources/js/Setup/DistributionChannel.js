var app = angular.module('myApp',[]);

app.controller('distributionChannelCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////

	$scope.CfgDistributionChannelSetup = {};
	$scope.newCfgDistributionChannelSetup = {};
	$scope.editDistributionChannel = {};
	$scope.editDistributionChannel={};
	
	$scope.CfgDistributionChannelSetup={};
	
	
	
	$scope.init = function(){
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		debugger;
	$scope.getDistributionChannel();
	};
	
	$scope.getDistributionChannel = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		
	    /* $http.get('/'+project_name+'/generateDistributionChannelNo').success(function(data) {
	    	
				$scope.newCfgDistributionChannelSetup.txtDistributionChannelCode = data;
				
				});*/
			
		 $http.get('/'+project_name+'/getAllDistributionChannel').success(function(data) {
			 
			 debugger;
						$scope.CfgDistributionChannelSetup = data;
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


	$scope.addDistributionChannel = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		 debugger;
		var object = JSON.stringify($scope.newCfgDistributionChannelSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewDistributionChannel',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Distribution Channel");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Distribution Channel added successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	else if(data=='error'){
            		alert(data);
            		$('#errMsgText').html("Unable to add Distribution Channel \n due to duplication of  Distribution Channel");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Distribution Channel \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateDistributionChannel = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editDistributionChannel);
		$.ajax({
			url: '/'+project_name+'/updateDistributionChannel',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Distribution Channel");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Distribution Channel edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Distribution Channel \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtDistributionChannelCodeforEdit){
		//alert(txtDistributionChannelCodeforEdit);
		$scope.editDistributionChannel = $filter("filter")($scope.CfgDistributionChannelSetup, {serDistributionChannelId:txtDistributionChannelCodeforEdit})[0];
	};
	

	
	$scope.deleteDistributionChannel = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteDistributionChannel',
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
  	  	
  	  	
  	  $.each(dataTable, function(index, distributionChannel) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+distributionChannel.serDistributionChannelId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+distributionChannel.serDistributionChannelId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+distributionChannel.serDistributionChannelId+');angular.element(this).scope().$apply();" data-target="#editDistributionChannelForm">Edit Distribution Channel</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+distributionChannel.serDistributionChannelId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    		  distributionChannel.txtCode,
	    		  distributionChannel.txtName,
	    	  distributionChannel.blnStatus===true?"Active":"InActive"
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