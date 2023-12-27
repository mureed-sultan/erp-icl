var app = angular.module('myApp',[]);

app.controller('productCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgProductSetup = {};
	$scope.newCfgProductSetup = {};
	$scope.editProduct = {};
	$scope.editProduct={};
	$scope.CfgProductSetup={};
	$scope.lstProductCategory={};
	$scope.lstBrand={};
	
	$scope.init = function(){
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		$scope.getProduct();
		};
	
	
	$scope.getProduct = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		
	     $http.get('/'+project_name+'/generateProductNo').success(function(data) {
				$scope.newCfgProductSetup.txtProductCode = data;
				
				}); 	
	     
	     	$http.get('/'+project_name+'/getActiveProductCategory').success(function(data) {
			 
			 debugger;
						$scope.lstProductCategory = data;
						
						});
	     	
	     	$http.get('/'+project_name+'/getActiveBrand').success(function(data) {
				 
				 debugger;
							$scope.lstBrand = data;
							
							});
 
 
	     
       	
		 $http.get('/'+project_name+'/getAllProduct').success(function(data) {
			 debugger;
						$scope.CfgProductSetup = data;
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
		
	

	$scope.addProduct = function (){
$scope.newCfgProductSetup.numUnitsInMasterPack=1;
		
		$scope.newCfgProductSetup.numPiecesInMasterPack=1;
		
		$scope.newCfgProductSetup.numProductWeight=1;
		
		if(!($scope.newCfgProductSetup.numProductWeight >= 0))
		{
		alert(" Please Enter Valid  Product Weight.");
		return;
		}
		
		if(!($scope.newCfgProductSetup.numPiecesInMasterPack >= 0))
		{
		alert(" Please Enter Valid  Pieces in Master Carton.");
		return;
		}
		
		
		
		if(!($scope.newCfgProductSetup.numUnitsInMasterPack >= 0))
		{
		alert(" Please Enter Valid  Units in Master Pack.");
		return;
		}
		
		
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.newCfgProductSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewProduct',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Product");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Product added successfully");
            		$('#successAlert').show();
            		$scope.newCfgProductSetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Product \n due to duplication of  Product");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Product \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateProduct = function(){
		
		if(!($scope.editProduct.numProductWeight >= 0))
		{
		alert(" Please Enter Valid  Product Weight.");
		return;
		}
		
		if(!($scope.editProduct.numPiecesInMasterPack >= 0))
		{
		alert(" Please Enter Valid  Pieces in Master Carton.");
		return;
		}
		
		if(!($scope.editProduct.numSalePrice >= 0))
		{
		alert(" Please Enter Valid  Sale Price.");
		return;
		}
		
		
		if(!($scope.editProduct.numUnitsInMasterPack >= 0))
		{
		alert(" Please Enter Valid  Units in Master Pack.");
		return;
		}
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editProduct);
		$.ajax({
			url: '/'+project_name+'/updateProduct',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Product");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Product edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Product \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtProductCodeforEdit){
		//alert(txtProductCodeforEdit);
		debugger;
		/*$scope.editProduct = $filter("filter")($scope.CfgProductSetup, {serProductId:txtProductCodeforEdit})[0];*/
		
		$scope.editProduct = $filter('filter')
		(
				$scope.CfgProductSetup,
				function(product) {	return (product.serProductId == txtProductCodeforEdit) })[0];

		debugger
	};
	

	
	$scope.deleteProduct = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteProduct',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Product");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Product removed successfully");
            		$('#successAlert').show();
            		$scope.newCfgProductSetup = {};
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Product to remove error");
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
  	  $.each(dataTable, function(index, product) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+product.serProductId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+product.serProductId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+product.serProductId+');angular.element(this).scope().$apply();" data-target="#editProductForm">Edit Product</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  product.txtProductCode,
	    	  product.txtProductName,
	    	  isEmpty(product.cfgTblProductCategory)?"":product.cfgTblProductCategory.txtProductCategoryName,
	    	  isEmpty(product.cfgTblBrand)?"":product.cfgTblBrand.txtBrandName,
	    			  product.txtMasterPack,
	    	    	  product.numProductWeight,
	    	    	  product.numPiecesInMasterPack,
	    	    	  product.txtPriceUnit,
	    	    	
	    	 	  product.blnStatus===true?"Active":"InActive"]).draw(); 
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