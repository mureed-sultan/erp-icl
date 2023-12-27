var app = angular.module('myApp', []);
app.controller('rptCtrl', function($scope, $http, $sce, $filter) {
	
	/**
	 * This method will be executed after page load
	 */
	
	// $scope.searchVisit={};
	   $scope.content;
	   $scope.file;
	   $scope.Searchcomplaint={};
	   $scope.ReportDTO={};
	   $scope.lstProductCategory={};
	   $scope.newSlsTblSaleOrder={};
	  
	   $scope.lstCustomer = [];
		$scope.lstDealrsGroup = [];

		$scope.isDealer = 1;
		$scope.dealerCustomers = [];

		$scope.lstDealer = {};
		$scope.delaer = {};
	   
	 $scope.init = function (){
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		    
		 $(".datepicker").datepicker({ "setDate": new Date(), dateFormat: "dd-mm-yy" });
		 
			$http.get('/'+project_name+'/getAllProductCategory').success(function(data) {
				 
				 debugger;
							$scope.lstProductCategory = data;
							
							});
			
			$http.get('/'+project_name+'/getAllSalesItem').success(function(data) {
				 
				 debugger;
							$scope.lstProduct = data;
							
							});
			
	    	$http.get('/'+project_name+'/getActiveCustomer').success(function(data) {
				 
				 debugger;
							$scope.lstCustomer = data;
							
							});
			
			$http.get('/'+project_name+'/getAllProductDesign').success(function(data) {
				 
				 debugger;
							$scope.lstProductDesign = data;
							
							});
			

	     	$http.get('/'+project_name+'/getAllProductQuality').success(function(data) {
				 
				 debugger;
							$scope.lstProductQuality = data;
							
							});
	     	
	     	$scope.getProduct();
	     
	 };
	 
	 function isEmpty(val){
		    return (val === undefined || val == null || val.length <= 0) ? true : false;
		}
	 
	 
	 $scope.getProduct = function() {
			$(".se-pre-con").fadeIn("slow");

			$http
					.get('/' + project_name + '/getActiveDealer')
					.success(
							function(data) {

								debugger;
								$scope.lstDealer = data;

								$http
										.get(
												'/'
														+ project_name
														+ '/getActiveCustomer')
										.success(
												function(data) {

													debugger;
													$scope.lstCustomer = data;

													$http
															.get(
																	'/'
																			+ project_name
																			+ '/getloginCustomer')
															.success(
																	function(
																			data) {

																		$scope.loginCustomer = data;

																		if (isEmpty($scope.loginCustomer.cfgTblCustomer)) {
																			$scope.isDealer = 3;
																			$http
																					.get(
																							'/'
																									+ project_name
																									+ '/getActiveProduct')
																					.success(
																							function(
																									data) {

																								debugger;
																								$scope.lstProduct = data;

																							});
																			window
																					.setTimeout(
																							$scope.resetDropDown,
																							1000);
																			// alert("admin");
																		} else if (!$scope.loginCustomer.cfgTblCustomer.blIsDealer) {
																			$scope.isDealer = 2;
																			// alert("customer");
																			$scope.newSlsTblSaleOrder.cfgTblCustomer = $scope.loginCustomer.cfgTblCustomer;
																			if (!isEmpty($scope.newSlsTblSaleOrder.cfgTblCustomer.cfgTblCustomer)) {
																				$scope.newSlsTblSaleOrder.cfgTblDealer = $scope.newSlsTblSaleOrder.cfgTblCustomer.cfgTblCustomer;
																				$scope.newCfgProductComponent.cfgTblCustomer = $scope.newSlsTblSaleOrder.cfgTblDealer;
																			} else
																				$scope.newCfgProductComponent.cfgTblCustomer = $scope.newSlsTblSaleOrder.cfgTblCustomer;
																			$scope
																					.showRecipe();
																		} else {

																			$http
																					.get(
																							'/'
																									+ project_name
																									+ '/getgroupActiveCustomer')
																					.success(
																							function(
																									data) {

																								debugger;
																								$scope.lstGroupCustomers = data;
																								// alert("lstGroupCustomers
																								// :"+$scope.lstGroupCustomers.length);
																								$scope
																										.showCustomers();
																							});

																			// alert("dealer");
																			debugger;
																			$scope.newSlsTblSaleOrder.cfgTblDealer = $scope.loginCustomer.cfgTblCustomer;
																			if (!(isEmpty($scope.loginCustomer.blIsGroupCustomer))
																					&& $scope.loginCustomer.blIsGroupCustomer) {
																				$scope.isDealer = 4;
																				for (i = 0; i < $scope.lstDealer.length; i++) {
																					console
																							.log($scope.lstDealer[i].serCustomerId);
																				}

																				{
																					$scope.lstDealrsGroup = $filter(
																							'filter')
																							(
																									$scope.lstDealer,
																									function(
																											dealer) {
																										return (dealer.serCustomerId == $scope.newSlsTblSaleOrder.cfgTblDealer.serCustomerId
																												|| isEmpty(dealer.cfgTblGroupCustomer) ? dealer.serCustomerId == $scope.newSlsTblSaleOrder.cfgTblDealer.serCustomerId
																												: dealer.cfgTblGroupCustomer.serCustomerId == $scope.newSlsTblSaleOrder.cfgTblDealer.serCustomerId);
																									});
																				}
																			} else
																				$scope.isDealer = 1;

																			$scope
																					.showCustomers();
																			$scope.newCfgProductComponent.cfgTblCustomer = $scope.newSlsTblSaleOrder.cfgTblDealer;
																			$scope
																					.showRecipe();
																		}
																		debugger;
																	});

												});

							});

			$http
					.get(
							'/' + project_name
									+ '/generateSaleOrderNo')
					.success(
							function(data) {
								$scope.newSlsTblSaleOrder.txtSaleOrderNo = data;

							});

			$http.get(
					'/' + project_name
							+ '/getActiveProductCategory').success(
					function(data) {

						$scope.lstProductCategory = data;

					});
			
			$scope.showCustomers = function() {

				debugger;
				// $scope.newCfgProductComponent.cfgTblCustomer=$scope.newSlsTblSaleOrder.cfgTblDealer;
				// $scope.showRecipe();

				// if(isEmpty($scope.newSlsTblSaleOrder.cfgTblDealer.cfgTblGroupCustomer))
				if (isEmpty($scope.loginCustomer.blIsGroupCustomer)) {
					$scope.dealerCustomers = $filter('filter')
							(
									$scope.lstCustomer,
									function(cust) {
										return (!isEmpty(cust.cfgTblCustomer) && cust.cfgTblCustomer.serCustomerId == $scope.newSlsTblSaleOrder.cfgTblDealer.serCustomerId);
									});
				} else {
					if (!isEmpty($scope.newSlsTblSaleOrder.cfgTblDealer)
							&& $scope.newSlsTblSaleOrder.cfgTblDealer.blIsLabsa) {
						$scope.dealerCustomers = $filter('filter')
								(
										$scope.lstGroupCustomers,
										function(cust) {
											return (!isEmpty(cust.cfgTblCustomer) && cust.cfgTblCustomer.blIsLabsa);
										});

						$scope.newCfgProductComponent.cfgTblCustomer = $scope.newSlsTblSaleOrder.cfgTblDealer;
						$scope.showRecipe();
					} else {
						$scope.dealerCustomers = $filter('filter')
								(
										$scope.lstGroupCustomers,
										function(cust) {
											return (!isEmpty(cust.cfgTblCustomer) && !(cust.cfgTblCustomer.blIsLabsa));
										});

						$scope.newCfgProductComponent.cfgTblCustomer = $scope.newSlsTblSaleOrder.cfgTblDealer;
						$scope.showRecipe();
					}
				}
				window.setTimeout($scope.resetDropDown, 1000);

			};

			/*
			 * $http.get('/'+project_name+'/getAllBrand').success(function(data) {
			 * 
			 * debugger; $scope.lstBrand = data;
			 * 
			 * });
			 */

			// $http.get('/'+project_name+'/getActiveProduct').success(function(data)
			// {
			//				 
			// debugger;
			// $scope.lstProduct = data;
			//							
			// });

			// $http.get('/'+project_name+'/getActiveProductDesign').success(function(data)
			// {
			//	    		
			//	    		
			//				 
			// debugger;
			// $scope.lstProductDesign = data;
			//							
			// });

			$http
					.get(
							'/' + project_name
									+ '/getActiveProductQuality')
					.success(function(data) {

						debugger;
						$scope.lstProductQuality = data;

					});

			/*
			 * $http.get('/'+project_name+'/getAllSaleOrder').success(function(data) {
			 * 
			 * debugger; $scope.lstSO = data;
			 * $scope.populateDataTable(data);
			 * 
			 * });
			 */

			$http.get('/' + project_name + '/getActiveCity')
					.success(function(data) {

						debugger;
						$scope.lstCity = data;

					});

		};
	 
	$scope.getSaleDetailReport = function(){
		
		$scope.ReportDTO.dte_date_from=$("#dateFrom").val();
		
		$scope.ReportDTO.dte_date_to=$("#dateTo").val();
		
		if(isEmpty($scope.ReportDTO.dte_date_from))
			{
			
			$scope.ReportDTO.dte_date_from='';
			}
		
		if(isEmpty($scope.ReportDTO.dte_date_to))
		{
			
		$scope.ReportDTO.dte_date_to='';
		}
		
		debugger;
		$(".se-pre-con").fadeIn("slow");
		if(isEmpty($scope.ReportDTO.txt_product_name))
			{
			$scope.ReportDTO.txt_product_name='';
			}
		
		if(isEmpty($scope.ReportDTO.ser_product_category_id))
		{
		$scope.ReportDTO.ser_product_category_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_product_id))
		{
		$scope.ReportDTO.ser_product_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_product_design_id))
		{
		$scope.ReportDTO.ser_product_design_id=0;
		}
		
		
		if(isEmpty($scope.ReportDTO.ser_customer_id))
		{
		$scope.ReportDTO.ser_customer_id=0;
		}
		
		
		if(isEmpty($scope.ReportDTO.ser_product_quality_id))
		{
		$scope.ReportDTO.ser_product_quality_id=0;
		}
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getSaleDetailReport?ser_customer_id="+$scope.ReportDTO.ser_customer_id+
																		"&txt_sale_order_code="+$scope.ReportDTO.txt_sale_order_code+
																		"&txt_product_name="+$scope.ReportDTO.txt_product_name+
																		"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+
																		"&ser_product_id="+$scope.ReportDTO.ser_product_id+
																		"&ser_product_design_id="+$scope.ReportDTO.ser_product_design_id+
																		"&dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to+
																		"&ser_product_quality_id="+$scope.ReportDTO.ser_product_quality_id+
																		"&Report_name=Sales_Order_Detail.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");


	};
	
	
$scope.getSaleDetailReportExcel = function(){
		
		$scope.ReportDTO.dte_date_from=$("#dateFrom").val();
		
		$scope.ReportDTO.dte_date_to=$("#dateTo").val();
		
		if(isEmpty($scope.ReportDTO.dte_date_from))
			{
			
			$scope.ReportDTO.dte_date_from='';
			}
		
		if(isEmpty($scope.ReportDTO.dte_date_to))
		{
			
		$scope.ReportDTO.dte_date_to='';
		}
		
		debugger;
		$(".se-pre-con").fadeIn("slow");
		if(isEmpty($scope.ReportDTO.txt_product_name))
			{
			$scope.ReportDTO.txt_product_name='';
			}
		
		if(isEmpty($scope.ReportDTO.ser_product_category_id))
		{
		$scope.ReportDTO.ser_product_category_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_product_id))
		{
		$scope.ReportDTO.ser_product_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_product_design_id))
		{
		$scope.ReportDTO.ser_product_design_id=0;
		}
		
		
		if(isEmpty($scope.ReportDTO.ser_customer_id))
		{
		$scope.ReportDTO.ser_customer_id=0;
		}
		
		
		if(isEmpty($scope.ReportDTO.ser_product_quality_id))
		{
		$scope.ReportDTO.ser_product_quality_id=0;
		}
		
		 $http.get("/"+project_name+"/getSaleDetailReportExcel?ser_customer_id="+$scope.ReportDTO.ser_customer_id+
																		"&txt_sale_order_code="+$scope.ReportDTO.txt_sale_order_code+
																		"&txt_product_name="+$scope.ReportDTO.txt_product_name+
																		"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+
																		"&ser_product_id="+$scope.ReportDTO.ser_product_id+
																		"&ser_product_design_id="+$scope.ReportDTO.ser_product_design_id+
																		"&dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to+
																		"&ser_product_quality_id="+$scope.ReportDTO.ser_product_quality_id,
																		  {responseType: 'arraybuffer' }).success(function(data) {
																				
																	    		
																	    		//alert();
																	    		debugger;
																			    	$scope.file = new Blob([(data)], {type: 'application/csv'});
																					var url = URL.createObjectURL($scope.file);
																		    	      var a = document.createElement('a');
																		    	      a.href = url;
																		    	      a.download = 'SaleOrderReport.csv';
																		    	      a.target = '_blank';
																		    	      a.click();
																				    $(".se-pre-con").fadeOut("slow");
																					}).error(function(){
																						$(".se-pre-con").fadeOut("slow");
																						
																				    	
																					}); 
																		};	
	
$scope.getSaleDetailReportSummary = function(){
		
		$scope.ReportDTO.dte_date_from=$("#dateFrom").val();
		
		$scope.ReportDTO.dte_date_to=$("#dateTo").val();
		
		if(isEmpty($scope.ReportDTO.dte_date_from))
			{
			
			$scope.ReportDTO.dte_date_from='';
			}
		
		if(isEmpty($scope.ReportDTO.dte_date_to))
		{
			
		$scope.ReportDTO.dte_date_to='';
		}
		
		debugger;
		$(".se-pre-con").fadeIn("slow");
		if(isEmpty($scope.ReportDTO.txt_product_name))
			{
			$scope.ReportDTO.txt_product_name='';
			}
		
		if(isEmpty($scope.ReportDTO.ser_product_category_id))
		{
		$scope.ReportDTO.ser_product_category_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_product_id))
		{
		$scope.ReportDTO.ser_product_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_product_design_id))
		{
		$scope.ReportDTO.ser_product_design_id=0;
		}
		
		
		if(isEmpty($scope.ReportDTO.ser_customer_id))
		{
		$scope.ReportDTO.ser_customer_id=0;
		}
		
		
		if(isEmpty($scope.ReportDTO.ser_product_quality_id))
		{
		$scope.ReportDTO.ser_product_quality_id=0;
		}
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getSaleSummaryReport?dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to+
																		"&Report_name=Sales_Order_Summary.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");


	};
	
	
$scope.getDCSummary_groupReportExcel = function(){
		
		$scope.ReportDTO.dte_date_from=$("#dateFrom").val();
		
		$scope.ReportDTO.dte_date_to=$("#dateTo").val();
		
		if(isEmpty($scope.ReportDTO.dte_date_from))
			{
			
			$scope.ReportDTO.dte_date_from='';
			}
		
		if(isEmpty($scope.ReportDTO.dte_date_to))
		{
			
		$scope.ReportDTO.dte_date_to='';
		}
		
		debugger;
		$(".se-pre-con").fadeIn("slow");
		if(isEmpty($scope.ReportDTO.txt_product_name))
			{
			$scope.ReportDTO.txt_product_name='';
			}
		
		if(isEmpty($scope.ReportDTO.ser_product_category_id))
		{
		$scope.ReportDTO.ser_product_category_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_product_id))
		{
		$scope.ReportDTO.ser_product_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_product_design_id))
		{
		$scope.ReportDTO.ser_product_design_id=0;
		}
		
		
		if(isEmpty($scope.ReportDTO.ser_customer_id))
		{
		$scope.ReportDTO.ser_customer_id=0;
		}
		
		
		if(isEmpty($scope.ReportDTO.ser_product_quality_id))
		{
		$scope.ReportDTO.ser_product_quality_id=0;
		}
		
		$http.get("/"+project_name+"/getDCSummary_groupReportExcel?dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to,
																		  {responseType: 'arraybuffer' }).success(function(data) {
																				
																	    		
																	    		//alert();
																	    		debugger;
																			    	$scope.file = new Blob([(data)], {type: 'application/csv'});
																					var url = URL.createObjectURL($scope.file);
																		    	      var a = document.createElement('a');
																		    	      a.href = url;
																		    	      a.download = 'SaleOrderSummary.csv';
																		    	      a.target = '_blank';
																		    	      a.click();
																				    $(".se-pre-con").fadeOut("slow");
																					}).error(function(){
																						$(".se-pre-con").fadeOut("slow");
																						
																				    	
																					}); 
																		};	
	
	
	
});