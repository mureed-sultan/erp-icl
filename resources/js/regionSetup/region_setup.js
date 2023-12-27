var app = angular.module('myApp',[]);

app.controller('regionCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CitRegionSetup = {};
	$scope.newCitRegionSetup = {};
	$scope.editRegion = {};
	$scope.table;
	$scope.tableRowIndexs;
	$scope.currentIndex=0;
	$scope.tblData;
	
	$scope.getZone = function(){ 
		$(".se-pre-con").fadeIn("slow");
		$http.get('/' + project_name + '/getAllZone').success(function(data){
			  debugger;
			// alert("success");
			$scope.zones = data;
			$scope.getRegion();
			$scope.populateDataTable(data);
			
		}).error(function(data, status) {
			// debugger;
		     console.error('Repos error', status, data);
		  })
		  .finally(function() {
			 // debugger;
		    console.log("finally finished repos");
		    $(".se-pre-con").fadeOut("slow");
		  });;
	};
	$scope.getRegion = function(){
		$(".se-pre-con").fadeIn("slow");
		$http.get('/' + project_name + '/getAllRegion').success(function(data){
			// debugger;
			// alert("success");
			$scope.CitRegionSetup = data;
			$scope.populateDataTable(data);
	     $http.get('/' + project_name + '/getRegionCode').success(function(data) {
				$scope.newCitRegionSetup = data;
				
				}); 	
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
		var pathArray = location.pathname.split('/');
		var appPath = "";// "/";
		for (var i = 1; i < pathArray.length - 1; i++) {
			appPath += pathArray[i];
			// + "/";
		}
		project_name = appPath;
		$scope.getZone();
	//$scope.getRegion();
		window.setTimeout( $scope.resetDropDown, 1000 );

	};

	$scope.resetDropDown=function()
		{
			$('.selectpicker').selectpicker('refresh');
		}

	$scope.addRegion = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.newCitRegionSetup);
		
		$.ajax({
            url: '/' + project_name + '/addNewRegion',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	debugger;
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Region");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Region added successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Region \n due to duplication of Region Name");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Region \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateRegion = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editRegion);
		$.ajax({
			url: '/' + project_name + '/updateRegion',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Region");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Region edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}else if(data=='error'){
            		$('#errMsgText').html("Unable to edit Region \n due to duplication of Region Name");
            		$('#addErrorAlert').show();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  		//	alert();
	  			$('#errMsgText').html("Unable to edit Region \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtRegionCodeforEdit){
	//	alert("-------");
		$scope.editRegion = $filter("filter")($scope.CitRegionSetup, {serRegionId:txtRegionCodeforEdit})[0];
		debugger;
	};
	
	$scope.populateEditDialogForNextPrevoius = function(txtRegionCodeforEdit){
		$scope.editRegion = $filter("filter")($scope.CitRegionSetup, {txtRegionCode:txtRegionCodeforEdit})[0];
	};
	
	
	$scope.deleteRegion = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/' + project_name + '/deleteRegion',
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
	

	$scope.nextRegion = function(){ 

		  if($scope.table.row( $scope.currentIndex ).data()!=undefined){
		  $scope.currentIndex=$scope.currentIndex+1;
		  $scope.tblData=$scope.table.row( $scope.currentIndex ).data();
		  var regionID=$scope.tblData[2];
		  $scope.populateEditDialogForNextPrevoius(regionID);
		  }else {
				$('#editerrMsgText').html("No Record Found For Display");
        		$('#editErrorAlert').show();
		  }
		  };

		  $scope.previousRegion = function(){ 
			  if($scope.table.row( $scope.currentIndex ).data()!=undefined){
			  $scope.currentIndex=$scope.currentIndex-1;
			  $scope.tblData=$scope.table.row( $scope.currentIndex ).data();
			  var regionID=$scope.tblData[2];
			  $scope.populateEditDialogForNextPrevoius(regionID);
			  }else {
					$('#editerrMsgText').html("No Record Found For Display");
	        		$('#editErrorAlert').show();
			     }
			  };

	
	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  	
  	    $.each(dataTable, function(index, region) {
  	    	/*var assignedRegions = $filter('filter')($scope.zones, function(zone){
  				return (zone.citRegionSetup !=null && zone.citRegionSetup !=undefined &&  zone.citRegionSetup.serRegionId  == region.serRegionId)?zone:null;
  	        });*/
  	    	
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+region.serRegionId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+region.serRegionId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+region.serRegionId+');angular.element(this).scope().$apply();" data-target="#editRegionForm">Edit Region</a></li>'+
							  		  '</ul>';
    		/*if(assignedRegions.length==0){
      			editDeleteColumn +=	'</a><input type="checkbox" id="'+region.serRegionId+'"/>';}*/
  		 // debugger;
  		var status="";
		  if(region.bl_Status===1)
			  {
			  status="Active";
			  }
		  else if(region.bl_Status===0){
			  status="InActive";
		  }
	      table.row.add([editDeleteColumn,
	    	  ++index,
	    	  region.txtRegionCode,
	    	  region.txtRegionName,
	    	 status]).draw(); 
  	  });
  	  
  	//$scope.table = $('#data-table').DataTable();
  	//$scope.tableRowIndexs = table.rows();
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