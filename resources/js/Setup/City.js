var app = angular.module('myApp',[]);

app.controller('cityCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgCitySetup = {};
	$scope.newCfgCitySetup = {};
	$scope.editCity = {};
	$scope.editCity={};
	$scope.CfgCitySetup={};
	$scope.lstCountry={};
	
	$scope.init = function(){
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		$scope.getCity();
		};
	
	
	$scope.getCity = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		
	     $http.get('/'+project_name+'/generateCityNo').success(function(data) {
				$scope.newCfgCitySetup.txtCityCode = data;
				
				}); 	
	     
        $http.get('/'+project_name+'/getActiveCountry').success(function(data) {
			 
			 debugger;
						$scope.lstCountry = data;
						
						});
			
		 $http.get('/'+project_name+'/getAllCity').success(function(data) {
			 debugger;
						$scope.CfgCitySetup = data;
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
		
	

	$scope.addCity = function (){
		
		 if( isEmpty($scope.newCfgCitySetup.cfgTblCountry))
			{
			alert(" Please Select Country.");
			return;
			}
		 
		
		
		 
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.newCfgCitySetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewCity',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add City");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("City added successfully");
            		$('#successAlert').show();
            		$scope.newCfgCitySetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add City \n due to duplication of  City");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add City \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateCity = function(){
		
		 if(!($scope.editCity.numFreight14 >= 0))
			{
			alert(" Please Enter Valid  Freight 14Ft.");
			return;
			}
		 
		 if(!($scope.editCity.numFreight20 >= 0))
			{
			alert(" Please Enter Valid  Freight 20Ft.");
			return;
			}
		 
		 if(!($scope.editCity.numFreight40 >= 0))
			{
			alert(" Please Enter Valid  Freight 40Ft.");
			return;
			}
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editCity);
		$.ajax({
			url: '/'+project_name+'/updateCity',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit City");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("City edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit City \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtCityCodeforEdit){
		//alert(txtCityCodeforEdit);
		$scope.editCity = $filter("filter")($scope.CfgCitySetup, {serCityId:txtCityCodeforEdit})[0];
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
            		$scope.newCfgCitySetup = {};
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
  	  $.each(dataTable, function(index, city) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+city.serCityId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+city.serCityId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+city.serCityId+');angular.element(this).scope().$apply();" data-target="#editCityForm">Edit City</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+city.serCityId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  city.txtCityCode,
	    	  city.txtCityName,
	    	  isEmpty(city.cfgTblCountry)?"":city.cfgTblCountry.txtName,
	    	 
	    	  city.blnStatus===true?"Active":"InActive"]).draw(); 
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