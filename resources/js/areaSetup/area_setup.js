var app = angular.module('myApp',[]);

app.controller('areaCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CitRegionSetup={}
	$scope.CitZoneSetup = {};
	$scope.newCitZoneSetup = {};
	$scope.editZone = {};
	$scope.CitAreaSetup={};
	$scope.editArea={};
	$scope.newCitAreaSetup={};
	$scope.tableRowIndexs;
	$scope.currentIndex=0;
	$scope.tblData;
	$scope.parent="";
	$scope.CitAreaSetupBranches={};
	$scope.allBranches={};
	debugger;
	$scope.getArea = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		$http.get('/' + project_name + '/getAllZone').success(function(data){
			$scope.CitZoneSetup = data;
			// debugger;
			// alert("success");		
			
	     $http.get('/' + project_name + '/getAreaCode').success(function(data) {
				$scope.newCitAreaSetup = data;
				
				}) 	
			
		 $http.get('/' + project_name + '/getAllArea').success(function(data) {
			          
						$scope.CitAreaSetup = data;
						$scope.populateDataTable(data);
						}) 	
		$http.get('/' + project_name + '/getAllAreaBranches').success(function(data) {
					          
								$scope.allBranches = data;
							//	$scope.populateDataTable(data);
								}) 
		}).error(function(data, status) {
			// debugger;
			// alert("error");
			    
		     console.error('Repos error', status, data);
		  })
		  .finally(function() {
			 // debugger;
		    console.log("finally finished repos");
		    $(".se-pre-con").fadeOut("slow");
		  });
	
	};
		

	$scope.resetDropDown=function()
		{
			$('.selectpicker').selectpicker('refresh');
		}

	$scope.init = function(){
		var pathArray = location.pathname.split('/');
		var appPath = "";// "/";
		for (var i = 1; i < pathArray.length - 1; i++) {
			appPath += pathArray[i];
			// + "/";
		}
		project_name = appPath;
		window.setTimeout( $scope.resetDropDown, 1000 );
		
	
	$scope.getArea();
	};
	
	
	$scope.getallFilterbarnch=function()
	{
		debugger;

		
		$scope.CitAreaSetupBranches= $filter('filter')($scope.allBranches, function(branch){
			return(branch.citZoneSetup.serZoneId == $scope.newCitAreaSetup.citZoneSetup.serZoneId);
			
			
	       });	
		
	}

	$scope.OptionsSelected = function (item) {
	 	  debugger;

	   var idx = item;
	//  alert(idx);
	   if(idx===1){
		   $('#actStn').show();
	 	
	 	  }
	  
	};

	
	
	
	
	$scope.addArea = function (){
		debugger;
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		debugger;
		

		if(!($scope.newCitAreaSetup.ser_parent_id!=null))
			{
			$scope.newCitAreaSetup.ser_parent_id=$scope.parent;
			}
		
		
	
		var object = JSON.stringify($scope.newCitAreaSetup);
		
		$.ajax({
            url: '/' + project_name + '/addNewArea',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Area");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Area added successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	else if(data=='error'){
            	//	alert(data);
            		$('#errMsgText').html("Unable to add Area \n due to duplication of Area Name");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Area \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateArea= function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editArea);
		$.ajax({
			url: '/' + project_name + '/updateArea',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Area");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Area edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  		//	alert();
	  			$('#errMsgText').html("Unable to edit Area \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtAreaCodeforEdit){
		
		$scope.editArea = $filter("filter")($scope.CitAreaSetup, {serAreaId:txtAreaCodeforEdit})[0];
	};
	
	$scope.populateEditDialogForNextPrevoius = function(txtAreaCodeforEdit){
		$scope.editArea = $filter("filter")($scope.CitAreaSetup, {txtAreaCode:txtAreaCodeforEdit})[0];
	};
	
	
	
	$scope.nextArea = function(){ 

		  if($scope.table.row( $scope.currentIndex ).data()!=undefined){
		  $scope.currentIndex=$scope.currentIndex+1;
		  $scope.tblData=$scope.table.row( $scope.currentIndex ).data();
		  var areaID=$scope.tblData[2];
		  $scope.populateEditDialogForNextPrevoius(areaID);
		  }else {
			$('#editerrMsgText').html("No Record Found For Display");
      		$('#editErrorAlert').show();
		  }
		  };

		  $scope.previousArea = function(){ 
			  if($scope.table.row( $scope.currentIndex ).data()!=undefined){
			  $scope.currentIndex=$scope.currentIndex-1;
			  $scope.tblData=$scope.table.row( $scope.currentIndex ).data();
			  var areaID=$scope.tblData[2];
			  $scope.populateEditDialogForNextPrevoius(areaID);
			  }else {
					$('#editerrMsgText').html("No Record Found For Display");
		      		$('#editErrorAlert').show();
				  }
			  };
	
	
	
	$scope.deleteArea = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/' + project_name + '/deleteArea',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Area");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Area removed successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Area to remove error");
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
  	  $.each(dataTable, function(index, area) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+area.serAreaId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+area.serAreaId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+area.serAreaId+');angular.element(this).scope().$apply();" data-target="#editAreaForm">Edit Area</a></li>'+
							  		  '</ul>';
  		  
							  	/*	'</a><input type="checkbox" id="'+area.serAreaId+'"/>';*/
  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  area.txtAreaCode,
	    	  area.txtAreaName,
	    	 "Active"]).draw(); 
  	  });
  	$scope.table = $('#data-table').DataTable();
  	$scope.tableRowIndexs = table.rows();
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