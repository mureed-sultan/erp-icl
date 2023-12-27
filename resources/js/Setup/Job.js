var app = angular.module('myApp',[]);

app.controller('jobCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgCitySetup = {};
	$scope.newRecordSetup = {};
	$scope.editRecord = {};
//	$scope.editCity={};
//	$scope.CfgCitySetup={};
	
	
//	$scope.lstCountry={};
	$scope.lstRecords={};
	
	$scope.init = function(){
		
//		$scope.getCity();
		$scope.getInitialData();
		};
	
	
	$scope.getInitialData = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
			
		 $http.get('/'+project_name+'/getAllJobs').success(function(data) {
//			 $scope.CfgCitySetup = data;
			 $scope.populateDataTable(data);
			 $scope.lstRecords = data;
		}).error(function(data, status) {
		     console.error('Repos error', status, data);
		  })
		  .finally(function() {
		    console.log("finally finished repos");
		    $(".se-pre-con").fadeOut("slow");
		  });;
	};
		
	$scope.addRecord = function (){
		 
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.newRecordSetup);
		
		$.ajax({
           url: '/'+project_name+'/addNewJob',
           type: 'post',
           'headers': {
   			'Content-Type': 'application/json'
   		},
           dataType: 'json',
           success: function (data) {
           	if(data=='Failure'){
           		$('#errMsgText').html("Unable to add Job");
           		$('#addErrorAlert').show();
           	}
           	else if(data=='Success'){
           		$('#successMsgText').html("Job added successfully");
           		$('#successAlert').show();
           		$scope.newCfgCitySetup = {};
           		$scope.init();
           	}
           	else if(data=='error'){
           		$('#errMsgText').html("Unable to add Job \n due to duplication of Job");
           		$('#addErrorAlert').show();
           	}
           },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Job \n Internal Error");
       		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
           data:  JSON.stringify($scope.newRecordSetup) 
       });
	};
 
// 	$( "#rateField" ).keypress(function(e ) {
//		console.log(" e.keyCode = " + e.keyCode);
// 		  if(e.keyCode >47 && e.keyCode<58){
// 			var total = $( "#rateField" ).val();
// 			 
// 			 $scope.newRecordSetup.perHourRate = total/8;
// 			consolel.log("total =" + total + "_" );
// 			consolel.log(   $scope.newRecordSetup.perHourRate);
//  		  }
//	 });
	
	
	 
	$scope.UpdateRecord = function(){
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editRecord);
		$.ajax({
			url: '/'+project_name+'/updateJob',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data.serJobId==null){
            		$('#errMsgText').html("Unable to edit Job");
            		$('#addErrorAlert').show();
            	}
            	else if(data.serJobId!=null){
            		$('#successMsgText').html("Job edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Job \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(jobID){
		//alert(jobID);
		$scope.editRecord = $filter("filter")($scope.lstRecords, {serJobId:jobID})[0];
		console.log($scope.editRecord)
	};
	

	
	$scope.deleteCity = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteCity',
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
            		$scope.newRecordSetup = {};
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
  	    $.each(dataTable, function(index, type) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+type.serJobId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+type.serJobId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+type.serJobId+');angular.element(this).scope().$apply();" data-target="#editRecordForm">Edit Job</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+city.serCityId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  type.txtJobName,
	    	  type.blnStatus,
 	    	  type.rate,
 	    	  type.txtDescription
	    	  ]
	      ).draw(); 
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