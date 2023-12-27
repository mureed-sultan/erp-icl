

var app = angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
	debugger;
	var pathArray = location.pathname.split('/');
	var appPath = "";// "/";
	for (var i = 1; i < pathArray.length - 1; i++) {
		appPath += pathArray[i];
		// + "/";
	}
	project_name = appPath;
	 $routeProvider
	 .when('/View', {
			
		    templateUrl: '/' + project_name + '/DCView',
			controller: 'DCCtrl'
				
		})
		.when('/editSaleOrderForm', {
			templateUrl: '/' + project_name + '/DCViewEdit',
			controller: 'editDCCtrl'
		})
		.when('/contractview2', {
			templateUrl: '/CIT/ADCContractViewCharges',
			controller: 'abc'
		})
	 .when('/ADCContractViewCharges', {
			templateUrl: '/CIT/ADCContractViewCharges',
			controller: 'surchargeCTRL'
		})
	
		.otherwise({
			
				
		});
	   


});
app.run(function($rootScope) {
	

    
});

app.controller('productCtrl', function($scope, $http, $filter,$rootScope,$window,$sce){	
	
	$scope.init = function(){
		
	
			window.location.href = "#/View";
			};
		
	
});

//app.controller('DCCtrl', function($scope, $http, $filter){
	app.controller('DCCtrl', function($scope, $http, $filter,$rootScope,$window,$sce){	
	
	alert("---");
	
	// /////////////////////////////////
	$scope.CfgProductSetup = {};
	$scope.newSlsTblSoDetail = {};
	$scope.editProductComponent = {};
	
	$scope.newSlsTblSaleOrder = {};
	$scope.newSlsTblSoDetail = {};
	
	$scope.lstProductCategory={};
	$scope.lstBrand={};
	$scope.lstProduct={};
	$scope.lstPacking={};
	$scope.lstCustomer={};
	
	$scope.lstSODetails=[];
	$scope.lstSO={};
	$scope.lstSOAll={};
	$scope.searchDTO={};
	$scope.init = function(){
	
		 $(".datepicker").datepicker({ "setDate": new Date(), dateFormat: "dd-mm-yy" });


			var d = new Date();
		    var curr_date = d.getDate();
		    if(curr_date <10)
		    	curr_date='0'+curr_date;
		    var curr_month = d.getMonth() + 1;
		    if(curr_month < 10)
		    	curr_month='0'+curr_month;
		    var curr_year = d.getFullYear();
		    d=curr_date + "-" + curr_month + "-" + curr_year;
	debugger;
		    $scope.searchDTO.dte_date_from=d;
		    $scope.searchDTO.dte_date_to=d;
		    setTimeout(function () {
				  $(function () {
				
					  $scope.getProduct();
				   
				  });
				}, 1000);
	
		
	

		};
	
	
	$scope.getProduct = function(){
//		$(".se-pre-con").fadeIn("slow");
	   
		
	

	     
	     	/*$http.get('/' + project_name + '/getAllProductCategory').success(function(data) {
			 
			 debugger;
						$scope.lstProductCategory = data;
						
						});
	     	
	    
 
 
	     	$http.get('/' + project_name + '/getAllProduct').success(function(data) {
				 
				 debugger;
							$scope.lstProduct = data;
							
							});
	     	
	     	$http.get('/' + project_name + '/getAllCustomer').success(function(data) {
				 
				 debugger;
							$scope.lstCustomer = data;
							
							});
	    	$http.get('/' + project_name + '/getAllProductDesign').success(function(data) {
				 
				 debugger;
							$scope.lstProductDesign = data;
							
							});
			

	     	$http.get('/' + project_name + '/getAllProductQuality').success(function(data) {
				 
				 debugger;
							$scope.lstProductQuality = data;
							
							});*/
	     	
	     	$scope.searchSaleOrder();
	     	
	     	/*$http.get('/' + project_name + '/getAllSaleOrder').success(function(data) {
				 
				 debugger;
							$scope.lstSOAll = data;
							$scope.lstSO = $filter('filter')($scope.lstSOAll, function(branch){
								return branch.txtStatus == 'Approve';
					       });	
							$scope.populateDataTable($scope.lstSO);
							
							});*/
	
	};
	
	$scope.searchSaleOrder = function(){
		
		debugger;
		var table = $('#data-table').DataTable();
		
  	  	table.clear().draw();
  	  	
  	  $scope.searchDTO.dte_date_from=$("#dateFrom").val();
		
		$scope.searchDTO.dte_date_to=$("#dateTo").val();
		
  	  
  	//  var object = JSON.stringify($scope.searchDTO);
		var object = $scope.searchDTO;
		$.ajax({
			url: '/' + project_name + '/searchSaleOrder',
			type: 'post',
          'headers': {
  			'Content-Type': 'application/json'
  		},
          dataType: 'json',
			success: function (data) {
				alert("-aa--");
				debugger;
				$scope.lstSOAll = data;
				$scope.lstSO = $filter('filter')($scope.lstSOAll, function(branch){
					return branch.txtStatus == 'APPROVED';
		       });	
				
				$scope.populateDataTable($scope.lstSO );
				
          	if(data=='Failure'){
          		$('#errMsgText').html("Unable to search ");
          		$('#addErrorAlert').show();
          	}
          	else if(data=='Success'){
          		
          		$('#successMsgText').html(" search successfully");
          		$('#successAlert').show();
          		
          	}
          },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to search  \n Internal Error");
      		$('#addErrorAlert').show();
      		
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},

			data: angular.toJson(object)
		});
		
	};
	

	


	$scope.populateEditDialog = function(txtProductCodeforEdit){
		//alert(txtProductCodeforEdit);
		
		debugger;
//		$rootScope.editSaleOrder = $filter("filter")($scope.lstSO, {serSaleOrderId:txtProductCodeforEdit})[0];
		
		$rootScope.editSaleOrder = $filter('filter')
		(
				$scope.lstSO,
				function(so) {
					return (so.serSaleOrderId == txtProductCodeforEdit)
				})[0];
		
	
		
	};
	$scope.populateEditDialogApprove = function(txtProductCodeforEdit){

//		$rootScope.editSaleOrder = $filter("filter")($scope.lstSO, {serSaleOrderId:txtProductCodeforEdit})[0];
		$rootScope.editSaleOrder = $filter('filter')
		(
				$scope.lstSO,
				function(so) {
					return (so.serSaleOrderId == txtProductCodeforEdit)
				})[0];
		/*$scope.editSaleOrder.txtStatus='Approved';
		$scope.updateSaleOrder();*/
	};
	
	$scope.populateEditDialogPening = function(txtProductCodeforEdit){

//		$rootScope.editSaleOrder = $filter("filter")($scope.lstSO, {serSaleOrderId:txtProductCodeforEdit})[0];
		
		$rootScope.editSaleOrder = $filter('filter')
		(
				$scope.lstSO,
				function(so) {
					return (so.serSaleOrderId == txtProductCodeforEdit)
				})[0];
		
		$scope.editSaleOrder.txtStatus='Pending';
		$scope.updateSaleOrder();
	};

	function isEmpty(val){
	    return (val === undefined || val == null || val.length <= 0) ? true : false;
	}
	$scope.selectUnselectAll=function(){
		$('tbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked);
        });
	};	
	
	$scope.populateEditDialogReport = function(txtProductCodeforEdit){

		
		$(".se-pre-con").fadeIn("slow");
		window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getSaleOrderReport?ser_sale_order_id="+txtProductCodeforEdit+
								"&Report_name=Sale_order.jasper","_blank");
$(".se-pre-con").fadeOut("slow");

	};
	
	
	$scope.updateSaleOrder = function(){
		
		debugger;
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
//		$scope.editSaleOrder.txtStatus='Pending';
		
		 $rootScope.editSaleOrder.slsTblSoDetails= $scope.lstSODetails
//	 	  var object = $scope.newSlsTblSoDetail;
			 var object = $rootScope.editSaleOrder;
		
		$.ajax({
			url: '/' + project_name + '/updateSaleOrder',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit SO");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("SO edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit SO \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data: angular.toJson(object)
		});
	};

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  $.each(dataTable, function(index, so) {
  		  debugger;
  		
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+so.serSaleOrderId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+so.serSaleOrderId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+so.serSaleOrderId+');angular.element(this).scope().$apply();" data-target=""#/editSaleOrderForm">Edit Sale Order</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
*/  		 // debugger;
//  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+so.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'

  		editColumn	 ='<a class="btn btn-success" href="#/editSaleOrderForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+so.serSaleOrderId+');angular.element(this).scope().$apply();" >Create DC  </a>';
  		ApproveColumn	 ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogApprove('+so.serSaleOrderId+');angular.element(this).scope().$apply();" >Show Details  </a>';
  		mark_PendingColumn	 ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogPening('+so.serSaleOrderId+');angular.element(this).scope().$apply();" >Mark Pending  </a>';

  		printColumn_so	  ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogReport('+so.serSaleOrderId+');angular.element(this).scope().$apply();" >Print SO</a>';

  		
  		//  		editDeleteColumn,
	      table.row.add([++index,
	    	  so.txtSaleOrderNo,
	    	  isEmpty(so.cfgTblCustomer)?"":so.cfgTblCustomer.txtCustomerName,
	    	  $filter('date')(new Date(so.dteDate), 'dd-MM-yyyy'),
	    	  isEmpty(so.cfgTblCustomer)?"":so.cfgTblCustomer.cfgTblCity.txtCityName,
	    	    	/*  so.txtDealer,
	    	    	  so.txtDeliveryTime,*/
//	    	  (isEmpty(so.txtStatus) || so.txtStatus=='Pending')?"Pending":"Approved",
	    	    	  so.txtIssueCode, 
	    	    	  isEmpty(so.dteIssuedate)?editColumn+' '+mark_PendingColumn:$filter('date')(new Date(so.dteIssuedate), 'dd-MM-yyyy'),
	    	    			  printColumn_so
	    			 ]).draw(); 
  	  });
	};
	
	
	$scope.populateDataTable2=function(){
//		alert("----ava");
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

	


	//app.controller('DCCtrl', function($scope, $http, $filter){
		app.controller('editDCCtrl', function($scope, $http, $filter,$rootScope,$window,$sce){	
		
		
		
		// /////////////////////////////////
		$scope.CfgProductSetup = {};
		$scope.newSlsTblSoDetail = {};
		$scope.editProductComponent = {};
		
		$scope.newSlsTblSaleOrder = {};
		$scope.newSlsTblSoDetail = {};
		$scope.lstCity={};
		$scope.lstProductCategory={};
		$scope.lstBrand={};
		$scope.lstProduct={};
		$scope.lstPacking={};
		$scope.lstSupplier={};
		
		$scope.lstSODetails=[];
		$scope.lstSO={};
		
		$scope.lstissueDetails=[];
		
		$scope.newInvTblIssue = {};
		$scope.newInvTblIssueDetail = {};
		$scope.total_qty=0;
		$scope.total_units=0;
		$scope.total_wt=0;
		$scope.total_issue_qty=0;
		
		
		$scope.init = function(){
		$(".datepicker").datepicker({ "setDate": new Date(), dateFormat: "yy-mm-dd" });
		$scope.editSaleOrder.dteDate=$filter('date')(new Date($scope.editSaleOrder.dteDate), 'yyyy-MM-dd');
		var d = new Date();
	    var curr_date = d.getDate();
	    if(curr_date <10)
	    	curr_date='0'+curr_date;
	    var curr_month = d.getMonth() + 1;
	    if(curr_month < 10)
	    	curr_month='0'+curr_month;
	    var curr_year = d.getFullYear();
	    d=curr_year + "-" + curr_month + "-" + curr_date;
//	    $scope.newInvTblIssue.dteDate=d;
	    
	    $scope.newInvTblIssue.dteDate=$filter('date')(new Date($scope.editSaleOrder.dteDate), 'yyyy-MM-dd');
	    $scope.newInvTblIssue.txtVehicleType=$scope.editSaleOrder.txtVehicleType;
	    

							    if ($scope.newInvTblIssue.txtVehicleType === '14Ft') {
							$scope.newInvTblIssue.numFreight = $scope.editSaleOrder.cfgTblCustomer.cfgTblCity.numFreight14;
						} else if ($scope.newInvTblIssue.txtVehicleType === '20Ft') {
							$scope.newInvTblIssue.numFreight = $scope.editSaleOrder.cfgTblCustomer.cfgTblCity.numFreight20;
						} else if ($scope.newInvTblIssue.txtVehicleType === '40Ft') {
							$scope.newInvTblIssue.numFreight = $scope.editSaleOrder.cfgTblCustomer.cfgTblCity.numFreight40;
						}
	    
	
	    
		$scope.searchSaleOrderDetail($rootScope.editSaleOrder.serSaleOrderId);
        
		$http.get('/' + project_name + '/generateIssueNo').success(function(data) {
			$scope.newInvTblIssue.txtIssueCode = data;
			
			});
		
		$http.get('/' + project_name + '/getAllSupplier').success(function(data) {
			 
			 debugger;
						
						$scope.lstSupplier = $filter('filter')(data, function(supplier){
							return supplier.cfgTblSupplierCategory.txtSupplierCategoryName == 'Transporter';
				       });	
						
						});
		
		 
		  
		  
		
			};
			
			
			$scope.OnVehicleSelect = function() {
				
					   if ($scope.newInvTblIssue.txtVehicleType === '14Ft') {
							$scope.newInvTblIssue.numFreight = $scope.editSaleOrder.cfgTblCustomer.cfgTblCity.numFreight14;
						} else if ($scope.newInvTblIssue.txtVehicleType === '20Ft') {
							$scope.newInvTblIssue.numFreight = $scope.editSaleOrder.cfgTblCustomer.cfgTblCity.numFreight20;
						} else if ($scope.newInvTblIssue.txtVehicleType === '40Ft') {
							$scope.newInvTblIssue.numFreight = $scope.editSaleOrder.cfgTblCustomer.cfgTblCity.numFreight40;
						}
				}
			

				$scope.keydownforQty = function() {
						$scope.total_issue_qty = 0;

						for (i = 0; i < $scope.lstSODetails.length; i++) {

							$scope.total_issue_qty = $scope.total_issue_qty
									+ new Number(
											$scope.lstSODetails[i].numIssueQty);

						}

					}
			
			
			$scope.searchSaleOrderDetail = function(id){
				debugger;
//				$(".se-pre-con").fadeIn("slow");
			
				
				$.ajax({
		            url: '/' + project_name + '/searchSaleOrderDetail',
		            type: 'post',
		            'headers': {
		    			'Content-Type': 'application/json'
		    		},
		            dataType: 'json',
		            success: function (data) {
		                	$scope.lstSODetails= data;
		                	debugger;
		                	/*$scope.total_qty=0;
		                	$scope.total_units=0;
		                	$scope.total_wt=0;
		                	$scope.total_issue_qty=0;
		                	*/
		                	
		                	for (i = 0; i < $scope.lstSODetails.length; i++) {
		                		
		                		$scope.total_qty=$scope.total_qty+$scope.lstSODetails[i].numQuantity;
		                		
		                		$scope.total_units=$scope.total_units+($scope.lstSODetails[i].numQuantity*$scope.lstSODetails[i].cfgTblProduct.numUnitsInMasterPack);
		                		
		                		$scope.total_wt=$scope.total_wt+($scope.lstSODetails[i].numQuantity*$scope.lstSODetails[i].cfgTblProduct.numProductWeight);
		                		
		                		$scope.lstSODetails[i].numIssueQty=$scope.lstSODetails[i].numQuantity;
		                		
		                		$scope.total_issue_qty=$scope.total_issue_qty+$scope.lstSODetails[i].numIssueQty;
		        				
		        			}

		            /*	setTimeout(function () {
							  $(function () {
							
							    $('#data-table').DataTable().draw();
							    alert("Loading Components--------"+$scope.lstSODetails.length);
							  });
							}, 3000);*/

		            	if(data=='Failure'){
		            		$('#errMsgText').html("Unable to remove Product Component");
		            		$('#addErrorAlert').show();
		            	}
		            	else if(data=='Success'){

		            	}
		            },
			  		'error': function(xhr, d, err){
			  			$('#errMsgText').html("Product Component to remove error");
		        		$('#addErrorAlert').show();
			  		},complete: function(){
			  			$(".se-pre-con").fadeOut("slow");
					},
					data: JSON.stringify(id)
		        });
			};

		
		
		$scope.addBookingDetail = function(){
			debugger;
			$scope.lstSODetails.push(angular.copy($scope.newSlsTblSoDetail));
		};
		
		$scope.removeBookingDetail = function(){
			$scope.lstSODetails.pop(angular.copy($scope.newSlsTblSoDetail));
			$scope.lstSODetails
		};
		



		
		$scope.addNewIssue = function(){
//			alert("---------issue-----------------");
			
			
			 $scope.lstissueDetails=[];
				
			
			 if(isEmpty($scope.lstSODetails) || ($scope.lstSODetails.length <=0))
			 {
			 alert(" There is no Component to Save.");
				return;
			 }
			for (i = 0; i < $scope.lstSODetails.length; i++) {
				$scope.newInvTblIssueDetail.cfgTblProduct=$scope.lstSODetails[i].cfgTblProduct;
				$scope.newInvTblIssueDetail.cfgTblProductDesign=$scope.lstSODetails[i].cfgTblProductDesign;
				$scope.newInvTblIssueDetail.cfgTblProductQuality=$scope.lstSODetails[i].cfgTblProductQuality;
				$scope.newInvTblIssueDetail.slsTblSoDetail=$scope.lstSODetails[i];
				$scope.newInvTblIssueDetail.numQuantity=$scope.lstSODetails[i].numIssueQty;
				$scope.newInvTblIssueDetail.numStockAvailabe=$scope.lstSODetails[i].numStockAvailabe;
				  $scope.lstissueDetails.push(angular.copy($scope.newInvTblIssueDetail));
			}
			
			debugger;
			for (i = 0; i < $scope.lstissueDetails.length; i++) {

				if ($scope.lstissueDetails[i].numQuantity > $scope.lstissueDetails[i].slsTblSoDetail.numQuantity) {
					alert("Please enter Valid Quantity");

					return;
					// break;
				}
/*
				else if ($scope.lstissueDetails[i].numQuantity > $scope.lstissueDetails[i].numStockAvailabe) {
					alert("Stock is not Avaialble");

					return;
					// break;
				}*/
			}	
			
			$(".se-pre-con").fadeIn("slow");
			$('#addErrorAlert').hide();
			$('#successAlert').hide();
			
			debugger;
			 $scope.newInvTblIssue.numFreight=0;
			$scope.newInvTblIssue.numTotalCartont=$scope.total_issue_qty;
			$scope.newInvTblIssue.dteDate=$("#date").val();
			$scope.newInvTblIssue.slsTblSaleOrder=$rootScope.editSaleOrder;
			if(!(isEmpty($scope.lstissueDetails)))
				$scope.newInvTblIssue.invTblIssueDetails= $scope.lstissueDetails;
			
			
			
//		 	  var object = $scope.newSlsTblSoDetail;
				 var object = $scope.newInvTblIssue;
				 alert();
			debugger;
			$.ajax({
				url: '/' + project_name + '/addNewIssue',
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
	            		alert("Dc Created Sucessfully.");
//	            		window.location.href = "#/View";
//	            		$scope.init();
	            	}
	            	
	            },
		  		'error': function(xhr, d, err){
		  			alert("---");
		  			$('#errMsgText').html("Unable to edit Product \n Internal Error");
	        		$('#addErrorAlert').show();
		  		},complete: function(){
		  			$(".se-pre-con").fadeOut("slow");
		  			$('#editCloseButton').click();
				},
				data: angular.toJson(object)
			});
		};
		
		$scope.populateEditDialog = function(txtProductCodeforEdit){

			$rootScope.editSaleOrder = $filter("filter")($scope.lstSO, {serSaleOrderId:txtProductCodeforEdit})[0];
			$scope.searchSaleOrderDetail($rootScope.editSaleOrder.serSaleOrderId)
		};
		
		function isEmpty(val){
		    return (val === undefined || val == null || val.length <= 0) ? true : false;
		}
		$scope.selectUnselectAll=function(){
			$('tbody tr td input[type="checkbox"]').each(function(){
	            $(this).prop('checked', $scope.checked);
	        });
		};	
		
		$scope.populateDataTable=function(dataTable){
			var table = $('#data-table-edit').DataTable();
	  	  	table.clear();

	  	  $.each(dataTable, function(index, component) {
	  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+component.serSaleOrderId+'">'+
										'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+component.serSaleOrderId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
								  		  '<ul class="dropdown-menu">'+  
								  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+component.serSaleOrderId+');angular.element(this).scope().$apply();" data-target=""#/editSaleOrderForm">Edit Sale Order</a></li>'+
								  		  '</ul>';
	/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
	*/  		 // debugger;
//	  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+so.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'

	  		editColumn	 ='<a class="btn btn-success" href="#/editSaleOrderForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+component.serSaleOrderId+');angular.element(this).scope().$apply();" >Show Details  </a>';

	  		//	  		++index,
		      table.row.add([editDeleteColumn,
		    	  component.cfgTblProduct.txtProductName,
		    	  isEmpty(component.cfgTblProductDesign)?"":component.cfgTblProductDesign.txtProductDesignName,
		    	  isEmpty(component.cfgTblProductQuality)?"":component.cfgTblProductQuality.txtProductQualityName,
		    	  component.cfgTblProduct.txtMasterPack,
		    			  component.numQuantity,
		    		'<input id="txtfield'+component.serSoDetailId+'"  value="'+component.numQuantity+'" type="text" class="form-control input-md" />',
//		    			  '<input id="txtfield'+component.serSoDetailId+'" ng-model="abc" type="text" class="form-control input-md">',
//		    				component.cfgTblProduct.txtPriceUnit,
		    				
		//    				'<input id= "tf-'+component.serSoDetailId+'" type="text" class="editable" value="">',
		    				component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack,
		    				component.numQuantity*component.cfgTblProduct.numProductWeight,
		    				component.numStockAvailabe		  
		    			 ]).draw(); 
		      
		     
		     

			  // This is how you can use the plugin in your jQuery app
		      $(".excel-table").exceltable();
	  	  });
		};
		
		
		

		
		
		
		$scope.refreshProductComponent = function(){
			
			$(".se-pre-con").fadeIn("slow");
			debugger;
			var ids="";
			$(".se-pre-con").fadeOut("slow");
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