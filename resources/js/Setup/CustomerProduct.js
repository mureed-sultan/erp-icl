var app = angular.module('myApp',[]);

app.controller('productCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgProductSetup = {};
	$scope.newCfgProductComponent = {};
	$scope.editProductComponent = {};
	
	$scope.lstCustomer=[];
	$scope.lstProductCategory=[];
	$scope.lstBrand=[];
	$scope.lstProduct=[];
	$scope.lstPacking=[];
	 $scope.total_qty=0;
	 $scope.total_count=0;
	$scope.lstProductComponent=[];
	
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
	   
		
		

	     
	     	$http.get('/'+project_name+'/getAllProductCategory').success(function(data) {
			 
			 debugger;
						$scope.lstProductCategory = data;
						
						});
	     	
	     	$http.get('/'+project_name+'/getAllBrand').success(function(data) {
				 
				 debugger;
							$scope.lstBrand = data;
							
							});
 
 
	   
	     	
	     	$http.get('/'+project_name+'/getActiveProduct').success(function(data) {
				 
				 debugger;
							$scope.lstPacking = data;
							$scope.lstProduct = data;
							
							});
       	
	    	$http.get('/'+project_name+'/getCustomerWODealer').success(function(data) {
				 
				 debugger;
							$scope.lstCustomer = data;
							
							});
	};
	
	
	
	$scope.addBookingDetail = function(){
		if(isEmpty($scope.newCfgProductComponent.cfgTblCustomer))
		{
			alert(" Please Select Customer.");
			return;
		}
		
		if(isEmpty($scope.newCfgProductComponent.cfgTblProductChild))
		{
			alert(" Please Select Product.");
			return;
		}
		
//		if(!($scope.newCfgProductComponent.numQuantity >= 0))
//		{
//		alert(" Please Enter Valid  Quantity.");
//		return;
//		}
		
//		 $scope.total_qty=$scope.total_qty+new Number($scope.newCfgProductComponent.numQuantity);
		 $scope.total_count=$scope.total_count+1;
		 $scope.lstProductComponent.push(angular.copy($scope.newCfgProductComponent));
		
		
	};
	
	$scope.keydownforQty = function() {
		$scope.total_qty = 0;
		$scope.total_count=0;
		for (i = 0; i < $scope.lstProductComponent.length; i++) {

			$scope.total_qty = $scope.total_qty
					+ new Number(
							$scope.lstProductComponent[i].numQuantity);
			
			$scope.total_count=$scope.total_count+1;

		}

	}
	
	$scope.removeBookingDetail = function(){
		$scope.lstProductComponent.pop(angular.copy($scope.newCfgProductComponent));
		
	};
	

	
	$scope.showRecipe = function(){

 if(!isEmpty($scope.newCfgProductComponent) && !isEmpty($scope.newCfgProductComponent.cfgTblCustomer))
	{
			 
  	  var object = $scope.newCfgProductComponent;
		$.ajax({
			url: '/'+project_name+'/searchProductComponent',
			type: 'post',
          'headers': {
  			'Content-Type': 'application/json'
  		},
          dataType: 'json',
			success: function (data) {
				debugger;
				$scope.lstProductComponent=data;
				$scope.keydownforQty();
				$('#ldButton').click();
//				$('.table').table('refresh');
//				$scope.user-table.reload();
//				alert("1");
//				$scope.populateDataTable(data);
          	if(data=='Failure'){
          		$('#errMsgText').html("Unable to search Recipe");
          		$('#addErrorAlert').show();
          	}
          	else if(data=='Success'){
          		
          		$('#successMsgText').html("Recipe search successfully");
          		$('#successAlert').show();
          		
          	}
          },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to search Recipe \n Internal Error");
      		$('#addErrorAlert').show();
      		
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
//			data:object
			data: angular.toJson(object)
		});
		 
				 }
		
	}
		
	

	$scope.addProduct = function (){
		
		debugger;
		 if(isEmpty($scope.lstProductComponent) || ($scope.lstProductComponent.length <=0))
		 {
		 alert(" There is no Component to Save.");
			return;
		 }
		 
//
//								 for (i = 0; i < $scope.lstProductComponent.length; i++) {
//							if (!($scope.lstProductComponent[i].numQuantity >= 0)) {
//								alert(" Please Enter Valid  Quantity.");
//								return;
//							}
//						}
				/*if(isEmpty($scope.lstProductComponent[i].num_balance) ||$scope.lstProductComponent[i].num_balance >= 0)
					{
					alert(" Please Enter Valid Breakage Quantity.");
					return;
					}*/
				
				
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		 debugger;
//		var object = JSON.stringify($scope.lstProductComponent);
		var object = $scope.lstProductComponent;
		
		$.ajax({
            url: '/'+project_name+'/addNewProductComponent',
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
            		$scope.lstProductComponent=[];
            		$scope.newCfgProductSetup = {};
            		$scope.total_count=0;
            		$scope.init();
            		$('#ldButton').click();
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
			data: angular.toJson(object)
//            data: object
        });
	};
	
/*	$scope.updateProduct = function(){
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
	};*/
	
	$scope.populateEditDialog = function(txtProductCodeforEdit){
		//alert(txtProductCodeforEdit);
		$scope.editProduct = $filter("filter")($scope.CfgProductSetup, {serProductId:txtProductCodeforEdit})[0];
	};
	
$scope.refreshProductComponent = function(){
	
	if(isEmpty($scope.newCfgProductComponent.cfgTblCustomer))
	{
		alert(" Please Select Customer.");
		return;
	}
	
		
		$(".se-pre-con").fadeIn("slow");
		debugger;
		var ids="";
		$(".se-pre-con").fadeOut("slow");
}
	
	$scope.deleteProductComponent = function(){
		
		$(".se-pre-con").fadeIn("slow");
		debugger;
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteProductComponent',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Product Component");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Product Component removed successfully");
            		$('#successAlert').show();
            		$scope.showRecipe();
//            		$scope.newCfgProductSetup = {};
//            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Product Component to remove error");
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
	    	    	  product.numSalePrice,
	    	    	  product.numUnitsInMasterPack,
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