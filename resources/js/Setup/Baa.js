var app = angular.module('myApp',[]);

app.controller('baaCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgBaaSetup = {};
	$scope.baaSetup = {};
	$scope.editBaa = {};
	$scope.editBaa={};
	$scope.CfgBaaSetup={};
	$scope.lstCountry={};
	
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
		
		$scope.getBaa();
		};
	
	
	$scope.getBaa = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
//		    alert(appPath);
		   
		
	     $http.get('/'+project_name+'/generateBaaNo').success(function(data) {
				$scope.baaSetup.baaName = data;
				
				}); 	
	     
        $http.get('/'+project_name+'/getActiveCountry').success(function(data) {
			 
			 debugger;
						$scope.lstCountry = data;
						
						});
        
        
			
		 $http.get('/'+project_name+'/getAllBaa').success(function(data) {
			 debugger;
						$scope.CfgBaaSetup = data;
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
		
	

	$scope.addBaa = function (){
		
		
		 
		
		
	
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.baaSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewBaa',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Baa");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Baa added successfully");
            		$('#successAlert').show();
            		$scope.baaSetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Baa \n due to duplication of  Baa");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Baa \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateBaa = function(){
		
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editBaa);
		$.ajax({
			url: '/'+project_name+'/updateBaa',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Baa");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Baa edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Baa \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(baaNameforEdit){
		//alert(baaNameforEdit);
//		$scope.editBaa = $filter("filter")($scope.CfgBaaSetup, {baaId:baaNameforEdit})[0];
		$scope.editBaa = $filter('filter')
		(
				$scope.CfgBaaSetup,
				function(PP) {
					return (PP.baaId == baaNameforEdit)
				})[0];
	};
	

	
	$scope.deleteBaa = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteBaa',
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
            		$scope.baaSetup = {};
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
  	  $.each(dataTable, function(index, baa) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+baa.serBaaId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+baa.baaId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+baa.baaId+');angular.element(this).scope().$apply();" data-target="#editBaaForm">Edit Baa</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+baa.serBaaId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  baa.baaName,
	    	  baa.baaDescription,
	    	  baa.blnStatus===true?"Active":"InActive"]).draw(); 
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