var app = angular.module('myApp',[]);

app.controller('zoneCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CitRegionSetup={}
	$scope.CitZoneSetup = {};
	$scope.newCitZoneSetup = {};
	$scope.editZone = {};
	$scope.table ;
	$scope.tableRowIndexs;
	$scope.currentIndex=0;
	$scope.tblData;
	
	$scope.getArea = function(){ 
		$(".se-pre-con").fadeIn("slow");
		$http.get('/' + project_name + '/getAllArea').success(function(data){
			  debugger;
			// alert("success");
			$scope.areas= data;
			$scope.getZone();
//			$scope.populateDataTable(data);
			
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
	
	$scope.getZone = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		$http.get('/' + project_name + '/getAllZone').success(function(data){
			// debugger;
			// alert("success");
			$scope.CitZoneSetup = data;
			$scope.populateDataTable(data);
			
	     $http.get('/' + project_name + '/getZoneCode').success(function(data) {
				$scope.newCitZoneSetup = data;
				
				}) 	
			
		 $http.get('/' + project_name + '/getAllRegion').success(function(data) {
			          /*   alert("---");
			             alert("---"+data);*/
						$scope.CitRegionSetup = data;
						
						}) 		
		}).error(function(data, status) {

			    
		     console.error('Repos error', status, data);
		  })
		  .finally(function() {
			 // debugger;
		    console.log("finally finished repos");
		    $(".se-pre-con").fadeOut("slow");
		  });;
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
		
	//$scope.getZone();
	$scope.getArea();
	window.setTimeout( $scope.resetDropDown, 1000 );

	};

	$scope.addZone = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.newCitZoneSetup);
		
		$.ajax({
            url: '/' + project_name + '/addNewZone',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Zone");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Zone added successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	else if(data=='error'){
            	//	alert(data);
            		$('#errMsgText').html("Unable to add Zone \n due to duplication of Zone Name");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Zone \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateZone = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editZone);
		$.ajax({
			url: '/' + project_name + '/updateZone',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Zone");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Zone edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}else if(data=='error'){
            		$('#errMsgText').html("Unable to edit Zone \n due to duplication of Zone Name");
            		$('#addErrorAlert').show();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  		//	alert();
	  			$('#errMsgText').html("Unable to edit Zone \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtzoneCodeforEdit){
		
		$scope.editZone = $filter("filter")($scope.CitZoneSetup, {serZoneId:txtzoneCodeforEdit})[0];
	};
	
	$scope.populateEditDialogForNextPrevoius = function(txtzoneCodeforEdit){
		$scope.editZone = $filter("filter")($scope.CitZoneSetup, {txtZoneCode:txtzoneCodeforEdit})[0];
	};
	
	$scope.deleteZone = function(){
		debugger;
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/' + project_name + '/deleteZone',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Zone");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Zone removed successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Zone to remove error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify(ids)
        });
	};
	
	/*$scope.deleteZone = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/' + project_name + '/deleteZone',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Zone");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Zone removed successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Zone to remove error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify(ids)
        });
	};
	*/
	
	$scope.selectUnselectAll=function(){
		$('tbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked);
        });
	};	
	

	
	$scope.nextRegion = function(){ 

		  if($scope.table.row( $scope.currentIndex ).data()!=undefined){
		  $scope.currentIndex=$scope.currentIndex+1;
		  $scope.tblData=$scope.table.row( $scope.currentIndex ).data();
		  var zoneID=$scope.tblData[2];
		  $scope.populateEditDialogForNextPrevoius(zoneID);
		  }else {
			$('#editerrMsgText').html("No Record Found For Display");
      		$('#editErrorAlert').show();
		  }
		  };

		  $scope.previousRegion = function(){ 
			  if($scope.table.row( $scope.currentIndex ).data()!=undefined){
			  $scope.currentIndex=$scope.currentIndex-1;
			  $scope.tblData=$scope.table.row( $scope.currentIndex ).data();
			  var zoneID=$scope.tblData[2];
			  $scope.populateEditDialogForNextPrevoius(zoneID);
			  }else {
					$('#editerrMsgText').html("No Record Found For Display");
		      		$('#editErrorAlert').show();
				  }
			  };
	
				function isEmpty(val){
				    return (val === undefined || val == null || val.length <= 0) ? true : false;
				}
	
	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  $.each(dataTable, function(index, zone) {
  		  debugger;
  		/*var assignedZones = $filter('filter')($scope.areas, function(area){
			return (area.citZoneSetup !=null && area.citZoneSetup !=undefined &&  area.citZoneSetup.serZoneId  == zone.serZoneId)?area:null;
        });*/

  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+zone.serZoneId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+zone.serZoneId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+zone.serZoneId+');angular.element(this).scope().$apply();" data-target="#editZoneForm">Edit Zone</a></li>'+
							  		  '</ul>';
  		/*if(assignedZones.length==0){
  			editDeleteColumn +=	'</a><input type="checkbox" id="'+zone.serZoneId+'"/>';}*/

//    		alert("1");
    		debugger;
	      table.row.add([editDeleteColumn,
	    	  ++index,
	    	  zone.txtZoneCode,
	    	  zone.txtZoneName,
	    /*	  zone.citRegionSetup.txtRegionCode,
	    	  zone.citRegionSetup.txtRegionName,*/
	    	  isEmpty(zone.cfgTblRegion)? "":zone.cfgTblRegion.txtRegionCode,
	   	      isEmpty(zone.cfgTblRegion)? "":zone.cfgTblRegion.txtRegionName,
	    	 "Active"]).draw(); 
  	  });
  	/*$scope.table = $('#data-table').DataTable();
  	$scope.tableRowIndexs = table.rows();*/
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