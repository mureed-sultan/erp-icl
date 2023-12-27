

var app = angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
	  
	 var pathArray = location.pathname.split('/');
	    var appPath = "";//"/";
	    for(var i=1; i<pathArray.length-1; i++) {
	        appPath += pathArray[i] ;
	        //+ "/";
	    }
	    project_name=appPath;
	 $routeProvider
	 .when('/View', {
			
		    templateUrl: '/'+project_name+'/SOViewD',
			controller: 'SaleOrderCtrl'
				
		})
		.when('/editSaleOrderForm', {
			templateUrl: '/'+project_name+'/SOViewEditD',
			controller: 'editSaleOrderCtrl'
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

//app.controller('SaleOrderCtrl', function($scope, $http, $filter){
	app.controller('SaleOrderCtrl', function($scope, $http, $filter,$rootScope,$window,$sce){	
	
	
	
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
	$scope.checked=false;
	$scope.checked2=false;
	$scope.searchDTO={};
	$scope.lstCity ={};
	$(window).bind('hashchange', function() {
		var type = window.location.hash.substr(1);
		if(type == "")
		window.location.href = "#/View";
	});
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
	    
	      
	    if (isEmpty($rootScope.searchDTO))
			$rootScope.searchDTO = {};
	   
	    if ((isEmpty($rootScope.searchDTO.dte_date_from)))
	    	{
	    		$rootScope.searchDTO.dte_date_from=d;
	    		$scope.searchDTO.dte_date_from=d;
	    	}
	    else
	    	{
	    	$scope.searchDTO.dte_date_from=$rootScope.searchDTO.dte_date_from;
	    	}
	    
	    
	    if ((isEmpty($rootScope.searchDTO.dte_date_to)))
	    	{
	    		$rootScope.searchDTO.dte_date_to=d;
	    		$scope.searchDTO.dte_date_to=d;
	    	}
	    else
	    	{
	    	$scope.searchDTO.dte_date_to=$rootScope.searchDTO.dte_date_to;
	    	}
		
	    setTimeout(function () {
			  $(function () {
			
				  $scope.getProduct();
			   
			  });
			}, 500);
		
		//$scope.getProduct();

		};
	
	
	$scope.getProduct = function(){
//		$(".se-pre-con").fadeIn("slow");
	   
		
		$http.get('/'+project_name+'/generateSaleOrderNo').success(function(data) {
			$scope.newSlsTblSaleOrder.txtSaleOrderNo = data;
			
			});

 
	     	$http.get('/'+project_name+'/getAllProduct').success(function(data) {
				 
				   
							$scope.lstProduct = data;
							
							});
	     	
	     	$http.get('/'+project_name+'/getAllCustomer').success(function(data) {
				 
				   
							$scope.lstCustomer = data;
							
							});
	    
			

	     
	     	
	     	 
	     	
	  /*   	$http.get('/'+project_name+'/getAllSaleOrder').success(function(data) {
				 
				   
							$scope.lstSO = data;
							$scope.populateDataTable(data);
							
							});*/
	     	$scope.searchSaleOrder();
	     	
//	        setTimeout(function () {
//				  $(function () {
//				
//					  $scope.searchSaleOrder();
//				   
//				  });
//				}, 10);
			
			//$scope.getProduct();

			
	};

$scope.ApproveSaleOrder = function(){

		$(".se-pre-con").fadeIn("slow");
		
		window.setTimeout(
		$scope.ApproveSaleOrder2, 10);
	};

	
	$scope.ApproveSaleOrder2 = function(){

		debugger;
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		
		window.setTimeout(
		$.ajax({
            url: '/'+project_name+'/ApproveSaleOrder',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to Approve Order");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Order Approved successfully");
            		$('#successAlert').show();
            		$scope.newCfgCitySetup = {};
            		$scope.init();
            	}
            	else
            		{


            		alert(data);
            		}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Region to remove error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify(ids)
        }), 500);
	};
	
	
	
	$scope.ApproveDeals = function(){

		debugger;
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked2')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		
		window.setTimeout(
		$.ajax({
            url: '/'+project_name+'/ApproveDeal',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to Approve Contract");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Contract Approved successfully");
            		$('#successAlert').show();
            		$scope.newCfgCitySetup = {};
            		$scope.init();
            	}
            	else
            		{


            		alert(data);
            		}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Region to remove error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify(ids)
        }), 500);
	};

$scope.searchSaleOrder = function(){
	$scope.searchDeals();
		  
		var table = $('#data-table').DataTable();
		
  	  	table.clear().draw();
  	  	
  	  $rootScope.searchDTO.dte_date_from=$("#dateFrom").val();
		
  	$rootScope.searchDTO.dte_date_to=$("#dateTo").val();
		
  	$rootScope.searchDTO.txtStatus="pending";
  	//  var object = JSON.stringify($scope.searchDTO);
		var object = $rootScope.searchDTO;
		$.ajax({
			url: '/'+project_name+'/searchSaleOrder',
			type: 'post',
          'headers': {
  			'Content-Type': 'application/json'
  		},
          dataType: 'json',
			success: function (data) {
				$scope.lstSO = data;
				$scope.populateDataTable(data);
				
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
	
	
	
	$scope.searchDeals = function () {

		  
		var table = $('#data-table2').DataTable();

		table.clear().draw();

		$rootScope.searchDTO.dte_date_from = $("#dateFrom")
			.val();

		$rootScope.searchDTO.dte_date_to = $("#dateTo").val();

		// var object = JSON.stringify($scope.searchDTO);
		var object = $rootScope.searchDTO;
		$.ajax({
			url: '/' + project_name + '/searchDeal',
			type: 'post',
			'headers': {
				'Content-Type': 'application/json'
			},
			dataType: 'json',
			success: function (data) {
				
				$scope.lstSO = data;
				$scope.populateDataTableDeal(data);

				if (data == 'Failure') {
					$('#errMsgText').html("Unable to search ");
					$('#addErrorAlert').show();
				} else if (data == 'Success') {

					$('#successMsgText').html(
						" search successfully");
					$('#successAlert').show();

				}
			},
			'error': function (xhr, d, err) {
				$('#errMsgText').html(
					"Unable to search  \n Internal Error");
				$('#addErrorAlert').show();

			},
			complete: function () {
				$(".se-pre-con").fadeOut("slow");
			},

			data: angular.toJson(object)
		});

	};
	
	
	
	$scope.removeBookingDetail = function(){
		$scope.lstSODetails.pop(angular.copy($scope.newSlsTblSoDetail));
		
	};
	

	
	$scope.populateEditDialog = function(txtProductCodeforEdit){
		//alert(txtProductCodeforEdit);
		
		  
//		$rootScope.editSaleOrder = $filter("filter")($scope.lstSO, {serSaleOrderId:txtProductCodeforEdit})[0];
		$rootScope.editSaleOrder = $filter('filter')
		(
				$scope.lstSO,
				function(so) {
					return (so.serSaleOrderId==txtProductCodeforEdit)
				})[0];
		
	
		
	};
	
	$scope.populateEditDialogApprove = function(txtProductCodeforEdit){

//		$rootScope.editSaleOrder = $filter("filter")($scope.lstSO, {serSaleOrderId:txtProductCodeforEdit})[0];
		
		$rootScope.editSaleOrder = $filter('filter')
		(
				$scope.lstSO,
				function(so) {
					return (so.serSaleOrderId==txtProductCodeforEdit)
				})[0];
		
		$scope.editSaleOrder.txtStatus='Approve';
		$scope.updateSaleOrder();
	};
	
	$scope.populateEditDialogReport = function(txtProductCodeforEdit){

//		$rootScope.editSaleOrder = $filter("filter")($scope.lstSO, {serSaleOrderId:txtProductCodeforEdit})[0];
		
		$rootScope.editSaleOrder = $filter('filter')
		(
				$scope.lstSO,
				function(so) {
					return (so.serSaleOrderId==txtProductCodeforEdit)
				})[0];
		
		$(".se-pre-con").fadeIn("slow");
		window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getSaleOrderReport?ser_sale_order_id="+$rootScope.editSaleOrder.serSaleOrderId+
								"&Report_name=Sale_order.jasper","_blank");
$(".se-pre-con").fadeOut("slow");

	};

	function isEmpty(val){
	    return (val === undefined || val == null || val.length <= 0) ? true : false;
	}
	$scope.selectUnselectAll=function(){
		$('tbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked);
        });
	};	
	
	
	$scope.selectUnselectAll2=function(){
		$('tbody2 tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked2);
        });
	};	

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  $.each(dataTable, function(index, so) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+so.serSaleOrderId+'">'+
									'<input type="checkbox" id="'+so.serSaleOrderId+'"/>';
/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
*/  		 //   
//  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+so.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'

											  		editColumn = '<a class="btn btn-success" href="#/editSaleOrderForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('
													+ so.serSaleOrderId
													+ ');angular.element(this).scope().$apply();" >Show Details</a>';

											printColumn = '<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogReport('
													+ so.serSaleOrderId
													+ ');angular.element(this).scope().$apply();" >Print  </a>';

											ApproveColumn = '<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogApprove('
													+ so.serSaleOrderId
													+ ');angular.element(this).scope().$apply();" >Approve  </a>';

											var lblApprove = '<label class="badge-approve"   data-toggle="modal" angular.element(this).scope().$apply();" >APPROVED  </Label>';
											var lblPending = '<label class="badge-pending"   data-toggle="modal" angular.element(this).scope().$apply();" >PENDING  </Label>';
											var lblDeleted = '<label class="badge-pending"   data-toggle="modal" angular.element(this).scope().$apply();" >DELETED  </Label>';

											// editDeleteColumn,
											table.row
													.add(
															[
																editDeleteColumn,
//																	++index,
																	// so.txtSaleOrderNo,
																	$filter('date')(
																					new Date(
																							so.dteDate),
																					'dd-MM-yyyy'),
																	isEmpty(so.cfgTblDealer) ? ""
																			: so.cfgTblDealer.txtCustomerName,
																			isEmpty(so.cfgTblDealer) ? ""
																					:isEmpty(so.cfgTblDealer.numBalance) ?"": numberWithCommas(so.cfgTblDealer.numBalance),
																	isEmpty(so.cfgTblCustomer) ? ""
																			: so.cfgTblCustomer.txtCustomerName,
																			isEmpty(so.cfgTblCustomer) ? ""
																					:isEmpty(so.cfgTblCustomer.numBalance)?"": numberWithCommas(so.cfgTblCustomer.numBalance),
																	// isEmpty(so.cfgTblCustomer)?"":so.cfgTblCustomer.cfgTblCity.txtCityName,
																	so.txtSapNo,
																
																			// $filter('date')(
																			// 		new Date(
																			// 				so.dteCreateddate),
																			// 		'hh:mm:ss'),
																					isEmpty(so.cfgTblProduct) ? ""
																							: so.cfgTblProduct.txtProductName,
																	//+' '+printColumn,
																							isEmpty(so.numQuantity) ? "": numberWithCommas(so.numQuantity) ,isEmpty(so.numNetAmount) ? "": numberWithCommas(so.numNetAmount)
																/*	isEmpty(so.dteRSMApproval) ? '' : $filter('date')(
																			new Date(
																					so.dteRSMApproval),
																			'dd-MM-yyyy hh:mm:ss'),
																			isEmpty(so.dteFinalApproval) ? '' : $filter('date')(
																					new Date(
																							so.dteFinalApproval),
																					'dd-MM-yyyy hh:mm:ss'),*/
																	

																	// (isEmpty(so.txtStatus) || so.txtStatus == 'Pending') ? lblPending
																	// 		: ( so.txtStatus == 'Deleted') ? lblDeleted: lblApprove,
																	// 		so.txtOrderapprovalDate,	
																	// 		so.txtDCNo,
																	// 		so.txtDCQty,
																	// so.txtDCStatus,
																	// so.txtDCDate,
																	// so.txtInvoiceNo,
//																	editColumn
																	/*so.txtInvoiceStatus,
																	so.txtInvoiceDate,
																	(isEmpty(so.txtStatus) || so.txtStatus == 'Pending') ? editColumn
																			: ''*/ ])
													.draw(); 
	      
	     
  	  });
	};
	
	
	$scope.populateDataTableDeal = function (dataTable) {
		
		var table = $('#data-table2').DataTable();
		table.clear();
		$
			.each(
				dataTable,
				function (index, so) {
					var editDeleteColumn ='<div class="dropdown" id="dropdown'+so.serDealId+'">'+
					'<input type="checkbox" id="'+so.serDealId+'"/>';

					editColumn = '<a class="btn btn-success" href="#/editSaleOrderForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('
						+ so.serDealId
						+ ');angular.element(this).scope().$apply();" >Edit Deal</a>';

					printColumn = '<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogReport('
						+ so.serDealId
						+ ');angular.element(this).scope().$apply();" >Print  </a>';

					ApproveColumn = '<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogApprove('
						+ so.serDealId
						+ ');angular.element(this).scope().$apply();" >Approve  </a>';

					var lblApprove = '<label class="badge-approve"   data-toggle="modal" angular.element(this).scope().$apply();" >APPROVED  </Label>';
					var lblPending = '<label class="badge-pending"   data-toggle="modal" angular.element(this).scope().$apply();" >PENDING  </Label>';
					var lblDeleted = '<label class="badge-pending"   data-toggle="modal" angular.element(this).scope().$apply();" >DELETED  </Label>';
					showDCColumn = '<a class="btn btn-success" href="#/showDCDetailForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('
					+ so.serDealId
					+ ');angular.element(this).scope().$apply();" >Show DC Details</a>';
					// '<a class="btn btn-success"   href="#/editSaleOrderForm"  data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogReport('
					// 	+ so.serDealId
					// 	+ ');angular.element(this).scope().$apply();" >Show DC Details  </a>';
					// editDeleteColumn,
									table.row
											.add(
													[
														editDeleteColumn,
//															++index,
															// so.txtSaleOrderNo,
															$filter(
																	'date')
																	(
																			new Date(
																					so.dteDate),
																			'dd-MM-yyyy'),
															$filter(
																	'date')
																	(
																			new Date(
																					so.dte_date_from),
																			'dd-MM-yyyy'),
															$filter(
																			'date')
																			(
																					new Date(
																							so.dte_date_to),
																					'dd-MM-yyyy'),

															// isEmpty(so.cfgTblCustomer)?"":so.cfgTblCustomer.cfgTblCity.txtCityName,
															so.txtDealNo,

															(isEmpty(so.txtStatus) || so.txtStatus == 'Pending') ? lblPending
																	: (so.txtStatus == 'Deleted') ? lblDeleted
																			: lblApprove,
															//so.numTotal,
																			so.txtSapNo,isEmpty(so.cfgTblProduct) ? ""
																					: so.cfgTblProduct.txtProductName,
																					//+' '+printColumn,
																											isEmpty(so.numQuantity) ? "": numberWithCommas(so.numQuantity) ,isEmpty(so.numNetAmount) ? "": numberWithCommas(so.numNetAmount)

															,
															(isEmpty(so.txtStatus) || so.txtStatus == 'Pending') ? ApproveColumn
															: (so.txtStatus == 'Deleted') ? lblDeleted
																								: lblApprove,					
																				])
											.draw();

				});
	};
	
	
	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
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

	


	//app.controller('SaleOrderCtrl', function($scope, $http, $filter){
		app.controller('editSaleOrderCtrl', function($scope, $http, $filter,$rootScope,$window,$sce){	
		
		
		
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
		$scope.newSlsTblSI={};
		$scope.lstCity ={};
		
		  $scope.total_qty= 0;
	  		$scope.total_amount= 0;
	  		$scope.total_units=0;
	  		$scope.total_wt=0;
	  		$scope.total_pieces=0;
	  		$scope.lstPaymentTerms =[];
	  		
	  		$scope.isDealer=1;
		$scope.init = function(){
			
//			alert("---1--"+$rootScope.editSaleOrder.serSaleOrderId);
		
			$(".datepicker").datepicker({ "setDate": new Date(), dateFormat: "yy-mm-dd" });
			$http.get('/'+project_name+'/getAllPaymentTerm').success(function(data) {
				 
				
				$scope.lstPaymentTerms = data;
				
				});

		  	$http.get('/'+project_name+'/getActiveDealer').success(function(data) {
				 
				   
							$scope.lstDealer = data;
							
							$http.get('/'+project_name+'/getActiveCustomer').success(function(data) {
								 
								
											$scope.lstCustomer = data;
										
											$http.get('/'+project_name+'/getloginCustomer').success(function(data) {
//												alert();
												   
												$scope.loginCustomer = data;
												
												
												 if(isEmpty($scope.loginCustomer.cfgTblCustomer) )
												 {
													 $scope.isDealer=3;
												/*	 $http.get('/'+project_name+'/getActiveProduct').success(function(data) {
														 
														   
																	$scope.lstProduct = data;
																	
																	});*/
													 window.setTimeout( $scope.resetDropDown, 1000 );
//													 alert("admin");
												 }
												 else if(!$scope.loginCustomer.cfgTblCustomer.blIsDealer)
													 {
													 $scope.isDealer=2;
//													 alert("customer");
//													 $scope.newSlsTblSaleOrder.cfgTblCustomer=$scope.loginCustomer.cfgTblCustomer;
//													 if(!isEmpty($scope.newSlsTblSaleOrder.cfgTblCustomer.cfgTblCustomer))
//														 {
//													       $scope.newSlsTblSaleOrder.cfgTblDealer=$scope.newSlsTblSaleOrder.cfgTblCustomer.cfgTblCustomer;
//													       $scope.newCfgProductComponent.cfgTblCustomer=$scope.newSlsTblSaleOrder.cfgTblDealer;
//														 }
//													 else
//														 $scope.newCfgProductComponent.cfgTblCustomer=$scope.newSlsTblSaleOrder.cfgTblCustomer;
													 $scope.showRecipe();
													 }
												 else 
												 {
													 
													 
													 
													 $http.get('/'+project_name+'/getgroupActiveCustomer').success(function(data) {
											 			 
											 			   
											 						$scope.lstGroupCustomers = data;
//											 						 alert("lstGroupCustomers  :"+$scope.lstGroupCustomers.length);
											 						 $scope.showCustomers();
											 						});
													 
//													 alert("dealer");
													   
													 $scope.editSaleOrder.cfgTblDealer=$scope.loginCustomer.cfgTblCustomer;
													 if(!(isEmpty($scope.loginCustomer.blIsGroupCustomer)) && $scope.loginCustomer.blIsGroupCustomer)
														 {
														 $scope.isDealer=4;
															 for (i = 0; i < $scope.lstDealer.length; i++) {
																 console.log( $scope.lstDealer[i].serCustomerId);
															 }
		
																	 {
																 $scope.lstDealrsGroup = $filter('filter')($scope.lstDealer, function(dealer){
																		return( dealer.serCustomerId == $scope.editSaleOrder.cfgTblDealer.serCustomerId
																				|| isEmpty(dealer.cfgTblGroupCustomer) ? dealer.serCustomerId == $scope.editSaleOrder.cfgTblDealer.serCustomerId:dealer.cfgTblGroupCustomer.serCustomerId == $scope.editSaleOrder.cfgTblDealer.serCustomerId 
																				) ;
																	 });
														       }
														 }
													 else
												 $scope.isDealer=1;
												
									
											
												 $scope.showCustomers();
												 $scope.newCfgProductComponent.cfgTblCustomer=$scope.newSlsTblSaleOrder.cfgTblDealer;
												 $scope.showRecipe();
												 }
												  
												});
											
											});
							
							});
		  
			$scope.editSaleOrder.dteDate=$filter('date')(new Date($scope.editSaleOrder.dteDate), 'yyyy-MM-dd');
			$scope.getProduct();
//			alert("-----"+$rootScope.editSaleOrder.serSaleOrderId);
			$scope.searchSaleOrderDetail($rootScope.editSaleOrder.serSaleOrderId);
			$scope.editSaleOrder.cfgTblCustomer=$rootScope.editSaleOrder.cfgTblCustomer;
			$scope.PriceListDTO_Search={};
			$scope.lstPriceList={};
			
			  setTimeout(function(){
				  $scope.showCustomers();
				  }, 2000);
			$scope.lstProProductionSumary={};
//			alert(" Loading-------");
			};
			
			$scope.showCustomers = function(){
//				alert("s c");
				  
//				if(isEmpty($scope.newSlsTblSaleOrder.cfgTblDealer.cfgTblGroupCustomer))
				if(isEmpty($scope.loginCustomer.blIsGroupCustomer))
						{
							$scope.dealerCustomers = $filter('filter')($scope.lstCustomer, function(cust){
								return(!isEmpty(cust.cfgTblCustomer) && cust.cfgTblCustomer.serCustomerId == $scope.editSaleOrder.cfgTblDealer.serCustomerId) ;
							});	
						}
				else
					{
					if(!isEmpty($scope.editSaleOrder.cfgTblDealer) &&  $scope.editSaleOrder.cfgTblDealer.blIsLabsa)
						{
							$scope.dealerCustomers = $filter('filter')($scope.lstGroupCustomers, function(cust){
								return(!isEmpty(cust.cfgTblCustomer) && cust.cfgTblCustomer.blIsLabsa) ;
							});	
						}
					else
						{
						$scope.dealerCustomers = $filter('filter')($scope.lstGroupCustomers, function(cust){
							return(!isEmpty(cust.cfgTblCustomer) && !(cust.cfgTblCustomer.blIsLabsa)) ;
						});	
						}
					}
				window.setTimeout( $scope.resetDropDown, 100 );
				
				}; 
				
				$scope.resetDropDown=function()
				{
					$('#load').click();
					$('.selectpicker').selectpicker('refresh');
				}
		
			$scope.searchSaleOrderDetail = function(id){
				
//				$(".se-pre-con").fadeIn("slow");
				  
			
				$.ajax({
		            url: '/'+project_name+'/searchIssueBySaleOrderId',
		            type: 'post',
		            'headers': {
		    			'Content-Type': 'application/json'
		    		},
		            dataType: 'json',
		            success: function (data) {
		            	
		           
		            	$scope.lstSODetails= data;
		                     	if(data=='Failure'){
		            		$('#errMsgText').html("Unable to remove Product Component");
		            		$('#addErrorAlert').show();
		            	}
		            	else if(data=='Success'){
		            		
		            		/*$('#successMsgText').html("Product Component removed successfully");
		            		$('#successAlert').show();
		            		$scope.showRecipe();*/
//		            		$scope.newCfgProductSetup = {};
//		            		$scope.init();
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
			
		$scope.getProduct = function(){
		     
		     	$http.get('/'+project_name+'/getAllProductCategory').success(function(data) {
				 
				   
							$scope.lstProductCategory = data;
							
							});
		     	
		    
	 
	 
		     	$http.get('/'+project_name+'/getAllProduct').success(function(data) {
					 
					   
								$scope.lstProduct = data;
								
								});
		     	
		     	$http.get('/'+project_name+'/getAllCustomer').success(function(data) {
					 
					   
								$scope.lstCustomer = data;
								
								});
		         	
		     	

				 
 $http.get('/'+project_name+'/getActiveCity').success(function(data) {
		 			 
		 			   
		 						$scope.lstCity = data;
		 						
		 						});
		     	
		     /*	$http.get('/'+project_name+'/getAllSaleOrder').success(function(data) {
					 
					   
								$scope.lstSO = data;
								$scope.populateDataTable(data);
								
								});*/
		
		};

		
		
		
		$scope.populateEditDialog = function(txtProductCodeforEdit){

			$rootScope.editSaleOrder = $filter("filter")($scope.lstSO, {serSaleOrderId:txtProductCodeforEdit})[0];
			$scope.searchSaleOrderDetail($rootScope.editSaleOrder.serSaleOrderId)
		};
		
		$scope.getCustomerPriceList=function()
		{
			
			
		}
		
		$scope.searchPriceList= function(id){
			
	
		};
		
		$scope.OnCustomerSelect=function()
		{
			
			    
			   
		}
		
		$scope.deleteProductComponent = function(){
			
			$(".se-pre-con").fadeIn("slow");
			  
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
//	            		$scope.newCfgProductSetup = {};
//	            		$scope.init();
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
		
	$rootScope.refreshProductComponent = function(){
		
			$(".se-pre-con").fadeIn("slow");
			  
			var ids="";
			$(".se-pre-con").fadeOut("slow");
	}
	
		function isEmpty(val){
		    return (val === undefined || val == null || val.length <= 0) ? true : false;
		}
		$scope.selectUnselectAll=function(){
			$('tbody tr td input[type="checkbox"]').each(function(){
	            $(this).prop('checked', $scope.checked);
	        });
		};	
		
		
		$scope.populateEditDialogReport_DC = function(txtProductCodeforEdit){

			window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getDCReport?ser_issue_id="+txtProductCodeforEdit+
									"&Report_name=DeliveryChalan.jasper","_blank");

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
	*/  		 //   
//	  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+so.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'
	 
//			  
	  		$scope.total_qty= $scope.total_qty+component.numQuantity;
	  		$scope.total_amount= $scope.total_amount+(component.numPerPiecePrice*component.numQuantity);
	  		$scope.total_unit= $scope.total_unit+(component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack);
	  		$scope.total_wt=$scope.total_wt+(component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack*component.cfgTblProduct.numProductWeight);
	  		  
	  		  editColumn	 ='<a class="btn btn-success" href="#/editSaleOrderForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+component.serSaleOrderId+');angular.element(this).scope().$apply();" >Show Details  </a>';

	  		table.row.add([
		    	  component.cfgTblProduct.txtProductName,
		    	  isEmpty(component.cfgTblProductDesign)?"":component.cfgTblProductDesign.txtProductDesignName,
		    	  isEmpty(component.cfgTblProductQuality)?"":component.cfgTblProductQuality.txtProductQualityName,
		    	  component.cfgTblProduct.txtMasterPack,
		    			  component.numQuantity,
//		    		'<input id="txtfield'+component.serSoDetailId+'" ng-model="component.numQuantity" type="text" class="form-control input-md">',
//		    			  '<input id="txtfield'+component.serSoDetailId+'" ng-model="abc" type="text" class="form-control input-md">',
		    				component.cfgTblProduct.txtPriceUnit,
		    				component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack,
		    				component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack*component.cfgTblProduct.numProductWeight,
		    				component.numStockAvailabe		  
		    			 ]).draw(); 
	  	  });
	  	
		};
		
		/*$scope.total_qty = 0;
  		$scope.total_amount = 0;
  		$scope.total_unit = 0;
  		$scope.total_wt = 0;*/
		
	/*	
		$scope.GetAvailabeQty=function(ser_product_id,ser_product_design_id,ser_product_quality_id,index){
			
//			alert("----");
//			ser_product_id,ser_product_design_id,ser_product_quality_id
			$http.get(
					'/'+project_name+'/getProductAvailableQty?ser_product_id='
							+ ser_product_id
							+ '&ser_product_design_id='
							+ ser_product_design_id
							+ '&ser_product_quality_id='
							+ ser_product_quality_id ).success(function(data) {

					alert("----"+data);
//				    $("#downloadLink").show();
				    $(".se-pre-con").fadeOut("slow");
					}).error(function(){
						$(".se-pre-con").fadeOut("slow");
					}); 
//			alert("----ava");
		}*/
		
		
		$scope.newSlsTblSI={};
		$scope.calculate=function()
		{
			
		
		
			 $scope.total_qty=0;
			 
			 $scope.total_units=0;
			 
			 $scope.total_amount=0;
			 
			 $scope.total_wt=0;
			 
			 $scope.total_pieces=0;

			 for (i = 0; i < $scope.lstSODetails.length; i++) 	
		  			{
		    			 $scope.total_qty=$scope.total_qty+new Number($scope.lstSODetails[i].numQuantity);
		    				
		    			 $scope.total_units=$scope.total_units+$scope.lstSODetails[i].numQuantity*$scope.lstSODetails[i].cfgTblProduct.numUnitsInMasterPack;
		    			 
		    			 $scope.total_amount=$scope.total_amount+$scope.lstSODetails[i].numQuantity*$scope.lstSODetails[i].cfgTblProduct.numUnitsInMasterPack*$scope.lstSODetails[i].numItemPrice;
		    			 
		    			 $scope.total_wt=$scope.total_wt+$scope.lstSODetails[i].numQuantity*$scope.lstSODetails[i].cfgTblProduct.numProductWeight;
		    			 
		    			 $scope.total_pieces=$scope.total_pieces+$scope.lstSODetails[i].numQuantity*$scope.lstSODetails[i].cfgTblProduct.numPiecesInMasterPack;
		    			  		 }
	  		
		
			
			$scope.newSlsTblSI.numTotalAmount= $scope.total_amount;
			var numDiscountAmount=0;
			var numAmountAfterDiscount=0;
			var numSalesTax=0;
			var  numSpecialSalestax=0;
			var numTotalAmountAfterStax=0;
			var numTotalAdvanceTaxAmount=0;
			var  numInvoiceAmount=0;
			var numInvoiceAmountAftFreight=0;
			
			
		
			
			 numDiscountAmount=$scope.newSlsTblSI.numTotalAmount*($scope.newSlsTblSI.numDiscount/100);
			
			$scope.newSlsTblSI.numDiscountAmount=numDiscountAmount;
			
			 numAmountAfterDiscount=$scope.newSlsTblSI.numTotalAmount-$scope.newSlsTblSI.numDiscountAmount;;
			
			$scope.newSlsTblSI.numAmountAfterDiscount=numAmountAfterDiscount;
			
			numSalesTax=$scope.newSlsTblSI.numAmountAfterDiscount*($scope.newSlsTblSI.numSalesTaxPerc/100);
			$scope.newSlsTblSI.numSalesTax=numSalesTax;
			
			 numSpecialSalestax=$scope.newSlsTblSI.numAmountAfterDiscount*($scope.newSlsTblSI.numStaxTaxPerc/100);;
			$scope.newSlsTblSI.numSpecialSalestax=numSpecialSalestax;
			
			numTotalAmountAfterStax=$scope.newSlsTblSI.numAmountAfterDiscount+$scope.newSlsTblSI.numSalesTax+$scope.newSlsTblSI.numSpecialSalestax;
			$scope.newSlsTblSI.numTotalAmountAfterStax=numTotalAmountAfterStax;
			
			numTotalAdvanceTaxAmount =$scope.newSlsTblSI.numTotalAmountAfterStax*($scope.newSlsTblSI.numAdvanceTaxPerc/100);
			$scope.newSlsTblSI.numTotalAdvanceTaxAmount=numTotalAdvanceTaxAmount;

			numInvoiceAmount=$scope.newSlsTblSI.numTotalAmountAfterStax+$scope.newSlsTblSI.numTotalAdvanceTaxAmount;
			$scope.newSlsTblSI.numInvoiceAmount=numInvoiceAmount;
			
			numInvoiceAmountAftFreight=$scope.newSlsTblSI.numInvoiceAmount-$scope.newSlsTblSI.numFreightAmount;;
			$scope.newSlsTblSI.numInvoiceAmountAftFreight=numInvoiceAmountAftFreight;
			

		}
		$rootScope.lstScheduleDetails=[];
		$rootScope.scheduleLine={};
		$rootScope.schedule= function(row)
		{
			
			$rootScope.lstScheduleDetails=[];
			$rootScope.scheduleLine={};
			$rootScope.total_sch_qty=0;
			  
			
			$rootScope.scheduleLine=row;
			
			$rootScope.searchSaleOrderDetailSchedule($rootScope.scheduleLine.serSoDetailId);
			
//			if(!isEmpty($scope.scheduleLine.slsTblSaleItemSchedule))
//			 $scope.lstScheduleDetails=$scope.scheduleLine.slsTblSaleItemSchedule;
//			else
//				$scope.lstScheduleDetails=[];
			
			
//			$scope.calculateSchedule();
		}
		
		
		$rootScope.total_sch_qty=0;
		
		$rootScope.calculateSchedule=function()
		{
			
//			alert();
			  
			$rootScope.total_sch_qty=0;
			 

	for (let i=0;i<$rootScope.lstScheduleDetails.length;i++)
	                      {
		    		
		    		
		    			
		$rootScope.total_sch_qty=$rootScope.total_sch_qty+new Number($rootScope.lstScheduleDetails[i].numQuantity);
		    				
			
					
	  			}
	  		 
		
		}
		
		$rootScope.searchSaleOrderDetailSchedule = function(id){
			
//			$(".se-pre-con").fadeIn("slow");
			  
		
			$.ajax({
	            url: '/'+project_name+'/searchSaleOrderDetailSchedule',
	            type: 'post',
	            'headers': {
	    			'Content-Type': 'application/json'
	    		},
	            dataType: 'json',
	            success: function (data) {
	            	
	            	
	            	$rootScope.lstScheduleDetails= data;
	            	
	            	$rootScope.calculateSchedule();

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
		
		$scope.UpdatePrice=function()
		{
	
		}
		
		
		
		$scope.readProduct_pic = function (input) {
			
			   $scope.uploadFile=input.value;
				$scope.file_show = $("#uploadFile")[0].files[0];
			/*	
				 if($scope.file_show.size > 307200){
				       alert("File is too big!");
				       t$scope.file_show = "";
				       return;
				    };*/
				    
				var filename = $scope.uploadFile.replace(/^.*[\\\/]/, '');
			   if (input.files && input.files[0]) {
			    var reader = new FileReader();

			    reader.onload = function (e) {
			        $('#blah')
			            .attr('src', e.target.result);
			            /*.width(128)
			            .height(128);*/
			    };

			    reader.readAsDataURL(input.files[0]);
			}
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