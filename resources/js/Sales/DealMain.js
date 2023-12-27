
var app = angular.module('myApp', ['ngRoute']);
app.config(function ($routeProvider) {
	  
	var pathArray = location.pathname.split('/');
	var appPath = "";// "/";
	for (var i = 1; i < pathArray.length - 1; i++) {
		appPath += pathArray[i];
		// + "/";
	}
	
	project_name = appPath;
	$routeProvider.when('/View', {
		templateUrl: '/' + project_name + '/DealView',
		controller: 'SaleOrderCtrl'

	}).when('/editSaleOrderForm', {
		templateUrl: '/' + project_name + '/DealViewEdit',
		controller: 'editSaleOrderCtrl'
	}).when('/showDCDetailForm', {
		templateUrl: '/' + project_name + '/DealViewEditD',
		controller: 'showDCCtrl'
	}).when('/ADCContractViewCharges', {
		templateUrl: '/CIT/ADCContractViewCharges',
		controller: 'surchargeCTRL'
	})
.otherwise({
	});
});
app.run(function ($rootScope) {

});

app.controller('productCtrl', function ($scope, $http, $filter, $rootScope,
	$window, $sce) {

	$scope.init = function () {

		window.location.href = "#/View";
	};

});

app.controller(
		'SaleOrderCtrl',
		function ($scope, $http, $filter, $rootScope, $window, $sce) {
			$scope.CfgProductSetup = {};
			$scope.newSlsTblSoDetail = {};
			$scope.editProductComponent = {};

			$scope.newSlsTblSaleOrder = {};
			$scope.newSlsTblSoDetail = {};

			$scope.lstProductCategory = {};
			$scope.lstBrand = {};
			$scope.lstProduct = {};
			$scope.lstPacking = {};
			$scope.lstCustomer = {};

			$scope.lstSODetails = [];
			$scope.lstSO = {};
			$scope.checked = true;
			$scope.searchDTO = {};
			$scope.lstCity = {};
			

			
			$(window).bind('hashchange', function() {
				var type = window.location.hash.substr(1);
				if(type == "")
				window.location.href = "#/View";
			});
			
			$scope.init = function () {

				$(".datepicker").datepicker({
					"setDate": new Date(),
					dateFormat: "dd-mm-yy"
				});

				var d = new Date();
				var curr_date = d.getDate();
				if (curr_date < 10)
					curr_date = '0' + curr_date;
				var curr_month = d.getMonth() + 1;
				if (curr_month < 10)
					curr_month = '0' + curr_month;
				var curr_year = d.getFullYear();
				d = curr_date + "-" + curr_month + "-" + curr_year;

				 
				if (isEmpty($rootScope.searchDTO))
					$rootScope.searchDTO = {};

				if ((isEmpty($rootScope.searchDTO.dte_date_from))) {
					$rootScope.searchDTO.dte_date_from = d;
					$scope.searchDTO.dte_date_from = d;
				} else {
					$scope.searchDTO.dte_date_from = $rootScope.searchDTO.dte_date_from;
				}

				if ((isEmpty($rootScope.searchDTO.dte_date_to))) {
					$rootScope.searchDTO.dte_date_to = d;
					$scope.searchDTO.dte_date_to = d;
				} else {
					$scope.searchDTO.dte_date_to = $rootScope.searchDTO.dte_date_to;
				}

				setTimeout(function () {
					$(function () {

						$scope.getProduct();

					});
				}, 500);

				// $scope.getProduct();

			};

			$scope.getProduct = function () {
				// $(".se-pre-con").fadeIn("slow");

			
				$http
					.get(
						'/' + project_name
						+ '/getAllProductCategory')
					.success(function (data) {
	  
						$scope.lstProductCategory = data;

					});

				$http.get('/' + project_name + '/getAllProduct')
					.success(function (data) {

						  
						$scope.lstProduct = data;

					});

				$http.get('/' + project_name + '/getAllCustomer')
					.success(function (data) {

						  
						$scope.lstCustomer = data;

					});
				$scope.searchSaleOrder();

			};

			$scope.searchSaleOrder = function () {

				  
				var table = $('#data-table').DataTable();

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
						$scope.populateDataTable(data);

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
			$scope.removeBookingDetail = function () {
				$scope.lstSODetails.pop(angular
					.copy($scope.newSlsTblSoDetail));

			};
			
		
			$scope.addNewSaleOrder = function () {
				$(".se-pre-con").fadeIn("slow");
				$('#addErrorAlert').hide();
				$('#successAlert').hide();
				  
				$scope.newSlsTblSaleOrder.slsTblSoDetails = $scope.lstSODetails
				// var object = $scope.newSlsTblSoDetail;
				var object = $scope.newSlsTblSaleOrder;

				$
					.ajax({
						url: '/' + project_name
							+ '/addNewDeal',
						type: 'post',
						'headers': {
							'Content-Type': 'application/json'
						},
						dataType: 'json',
						success: function (data) {
							if (data == 'Failure') {
								$('#errMsgText').html(
									"Unable to add Product");
								$('#addErrorAlert').show();
							} else if (data == 'Success') {
								$('#successMsgText')
									.html(
										"Product added successfully");
								$('#successAlert').show();
								$scope.newCfgProductSetup = {};
								$scope.init();
							} else if (data == 'error') {
								$('#errMsgText')
									.html(
										"Unable to add Product \n due to duplication of  Product");
								$('#addErrorAlert').show();
							}
						},
						'error': function (xhr, d, err) {
							$('#errMsgText')
								.html(
									"Unable to add Product \n Internal Error");
							$('#addErrorAlert').show();
						},
						complete: function () {
							$(".se-pre-con").fadeOut("slow");
							$('#addCloseButton').click();
						},
						data: angular.toJson(object)
						// data: object
					});
			};
			
			$scope.print = function ()
			{
//				alert();
				
				
				
//				window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getDCReport?dc="+Report_name,"_blank");
				window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getDCReport?dc=123","_blank");
			}

			$scope.updateSaleOrder = function () {
debugger;
var fd = new FormData();
var object_soSchedule = [];
var object_soDetails = [];
				$(".se-pre-con").fadeIn("slow");
				$('#addErrorAlert').hide();
				$('#successAlert').hide();
				var object = JSON.stringify($rootScope.editSaleOrder);
				fd.append('so', object);
//				fd.append('soDetails', object_soDetails);
//				fd.append('soSchedule', object_soSchedule);
//				fd.append('file', file);
				// var object = JSON.stringify($scope.editProduct);

				$.ajax({
						dataType: 'json',
						url: "/" + project_name
							+ "/updateDeal",
						data: fd,
						type: "POST",
						enctype: 'multipart/form-data',
						processData: false,
						contentType: false,
						success: function (data) {
							if (data == 'Failure') {

								  
								$('#errMsgText')
									.html(
										"Unable to edit Sale Order");
								$('#addErrorAlert').show();
							} else if (data == 'Success') {

								$('#successMsgText')
									.html(
										"Deal Updated successfully");
								$('#successAlert').show();
								alert("Deal Updated Successfully.");
								$scope.init();
							}
							else if (data == 'SQNC') {
								$('#addErrorAlert').show();
								$('#successAlert').show();
								alert("Schedule Quantity should be Equal to Order Quantity.");

							}
							else if (data == '10M') {
								$('#errMsgText').html("Ship to Party is Unregistered in FBR, Monthly Sales limit of Customer exceeded more than 10M.");

								$('#addErrorAlert').show();
								$('#successAlert').show();
								alert("Ship to Party is Unregistered in FBR, Monthly Sales limit of Customer exceeded more than 10M.");
								$scope.init();
							}
							else if (data == '90D') {
								$('#errMsgText').html("Ship to Party is still open Invoice from more than 90 days.");
								$('#addErrorAlert').show();
								alert("Ship to Party is still open Invoice from more than 90 days.");
								$scope.init();
							}
						},
						'error': function (xhr, d, err) {
							$(".se-pre-con").fadeOut("slow");
							  
							$('#errMsgText')
								.html(
									"Unable to edit Deal \n Internal Error");
							$('#addErrorAlert').show();
						},
						complete: function () {

							$(".se-pre-con").fadeOut("slow");
							$('#editCloseButton').click();
						},

					});
//				$rootScope.editSaleOrder.slsTblSoDetails = $scope.lstSODetails
//				// var object = $scope.newSlsTblSoDetail;
//				var object = $rootScope.editSaleOrder;
//
//				$
//					.ajax({
//						url: '/' + project_name
//							+ '/updateDeal',
//						type: 'post',
//						'headers': {
//							'Content-Type': 'application/json'
//						},
//						dataType: 'json',
//						success: function (data) {
//							if (data == 'Failure') {
//								$('#errMsgText').html(
//									"Unable to edit Product");
//								$('#addErrorAlert').show();
//							} else if (data == 'Success') {
//								$('#successMsgText')
//									.html(
//										"Product edit successfully");
//								$('#successAlert').show();
//								$scope.init();
//							}
//
//						},
//						'error': function (xhr, d, err) {
//							// alert();
//							$('#errMsgText')
//								.html(
//									"Unable to edit Product \n Internal Error");
//							$('#addErrorAlert').show();
//						},
//						complete: function () {
//							$(".se-pre-con").fadeOut("slow");
//							$('#editCloseButton').click();
//						},
//						data: angular.toJson(object)
//					});
			};
			
			$scope.searchSaleOrderDetail = function(id){
				
				debugger;
				$.ajax({
					url: '/'+project_name+'/searchDealDetail',
					type: 'post',
					'headers': {
						'Content-Type': 'application/json'
					},
					dataType: 'json',
					success: function (data) {
						
//						alert();
						debugger;
						  
						$rootScope.lstSODetails= data;
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

			$scope.populateEditDialog = function (txtProductCodeforEdit) {
			$rootScope.editSaleOrder = $filter('filter')
					(
						$scope.lstSO,
						function (so) {
							return (so.serDealId == txtProductCodeforEdit)
						})[0];
			$scope
			.searchSaleOrderDetail($rootScope.editSaleOrder.serDealId);
			};

			$scope.populateEditDialogApprove = function (
				txtProductCodeforEdit) {
				$rootScope.editSaleOrder = $filter('filter')
					(
						$scope.lstSO,
						function (so) {
							return (so.serDealId == txtProductCodeforEdit)
						})[0];
debugger;
				$rootScope.editSaleOrder.txtStatus = 'Approve';
				window.setTimeout($scope.updateSaleOrder, 1000);
				
//				$scope.updateSaleOrder();
			};

			$scope.populateEditDialogReport = function (
				txtProductCodeforEdit) {

				// $rootScope.editSaleOrder =
				// $filter("filter")($scope.lstSO,
				// {serDealId:txtProductCodeforEdit})[0];

				$rootScope.editSaleOrder = $filter('filter')
					(
						$scope.lstSO,
						function (so) {
							return (so.serDealId == txtProductCodeforEdit)
						})[0];

				$(".se-pre-con").fadeIn("slow");
				window.open(window.location.protocol + "//"
					+ window.location.host
					+ "/OPAL/getSaleOrderReport?ser_sale_order_id="
					+ $rootScope.editSaleOrder.serDealId
					+ "&Report_name=Sale_order.jasper", "_blank");
				$(".se-pre-con").fadeOut("slow");

			};

			function isEmpty(val) {
				return (val === undefined || val == null || val.length <= 0) ? true
					: false;
			}
			$scope.selectUnselectAll = function () {
				$('tbody tr td input[type="checkbox"]').each(
					function () {
						$(this).prop('checked', $scope.checked);
					});
			};
			
			function numberWithCommas(x) {
			    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}

			// Populate Data Table
			$scope.populateDataTable = function (dataTable) {
				var table = $('#data-table').DataTable();
				table.clear();
				$
					.each(
						dataTable,
						function (index, so) {
							var editDeleteColumn = '<div class="dropdown" id="dropdown'
								+ so.serDealId
								+ '">'
								+ '<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('
								+ so.serDealId
								+ ');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'
								+ '<ul class="dropdown-menu">'
								+ '<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('
								+ so.serDealId
								+ ');angular.element(this).scope().$apply();" data-target=""#/editSaleOrderForm">Edit Deal</a></li>'
								+ '</ul>';

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
																	++index,
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
																	so.numTotal,

																	(!isEmpty(so.txtIssueCode) && so.txtIssueCode.length > 2) ? showDCColumn
																			: (isEmpty(so.txtStatus) || so.txtStatus == 'Pending') ? editColumn
																					: '',
																	(isEmpty(so.txtStatus) || so.txtStatus == 'Pending') ? ApproveColumn
																	: (so.txtStatus == 'Deleted') ? lblDeleted
																										: lblApprove,					
																						])
													.draw();

						});
			};

			$scope.populateDataTable2 = function () {
				// alert("----ava");
			}
			
		

		}).directive('fileModel', ['$parse', function ($parse) {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					var model = $parse(attrs.fileModel);
					var modelSetter = model.assign;

					element.bind('change', function () {
						scope.$apply(function () {
							modelSetter(scope, element[0].files[0]);
						});
					});
				}
			};
		}]);

// app.controller('SaleOrderCtrl', function($scope, $http, $filter){
app
	.controller(
		'editSaleOrderCtrl',
		function ($scope, $http, $filter, $rootScope, $window, $sce) {

			// /////////////////////////////////
			$scope.CfgProductSetup = {};
			$scope.newSlsTblSoDetail = {};
			$scope.editProductComponent = {};

			$scope.newSlsTblSaleOrder = {};
			$scope.newSlsTblSoDetail = {};

			$scope.lstProductCategory = {};
			$scope.lstBrand = {};
			$scope.lstProduct = {};
			$scope.lstPacking = {};
			$scope.lstCustomer = {};

			$scope.lstSODetails = [];
			$scope.lstSO = {};
			$scope.newSlsTblSI = {};
			$scope.lstCity = {};

			$scope.total_qty = 0;
			$scope.total_amount = 0;
			$scope.total_units = 0;
			$scope.total_wt = 0;
			$scope.total_pieces = 0;
			$scope.lstPaymentTerms = [];

			$scope.isDealer = 1;
			$scope.init = function () {

				// alert("---1--"+$rootScope.editSaleOrder.serDealId);

				$(".datepicker").datepicker({
					"setDate": new Date(),
					dateFormat: "yy-mm-dd"
				});
				$http.get('/' + project_name + '/getAllPaymentTerm')
					.success(function (data) {

						$scope.lstPaymentTerms = data;

					});

				$http
					.get('/' + project_name + '/getActiveDealer')
					.success(
						function (data) {

							  
							$scope.lstDealer = data;

							$http
								.get(
									'/'
									+ project_name
									+ '/getActiveCustomer')
								.success(
									function (data) {

										$scope.lstCustomer = data;

										$http
											.get(
												'/'
												+ project_name
												+ '/getloginCustomer')
											.success(
												function (
													data) {
													// alert();
													  
													$scope.loginCustomer = data;

													if (isEmpty($scope.loginCustomer.cfgTblCustomer)) {
														$scope.isDealer = 3;
														/*
														 * $http.get('/'+project_name+'/getActiveProduct').success(function(data) {
														 * 
														 *   
														 * $scope.lstProduct =
														 * data;
														 * 
														 * });
														 */
														window
															.setTimeout(
																$scope.resetDropDown,
																1000);
														// alert("admin");
													} else if (!$scope.loginCustomer.cfgTblCustomer.blIsDealer) {
														$scope.isDealer = 2;
														// alert("customer");
														// $scope.newSlsTblSaleOrder.cfgTblCustomer=$scope.loginCustomer.cfgTblCustomer;
														// if(!isEmpty($scope.newSlsTblSaleOrder.cfgTblCustomer.cfgTblCustomer))
														// {
														// $scope.newSlsTblSaleOrder.cfgTblDealer=$scope.newSlsTblSaleOrder.cfgTblCustomer.cfgTblCustomer;
														// $scope.newCfgProductComponent.cfgTblCustomer=$scope.newSlsTblSaleOrder.cfgTblDealer;
														// }
														// else
														// $scope.newCfgProductComponent.cfgTblCustomer=$scope.newSlsTblSaleOrder.cfgTblCustomer;
														$scope
															.showRecipe();
													} else {

														$http
															.get(
																'/'
																+ project_name
																+ '/getgroupActiveCustomer')
															.success(
																function (
																	data) {

																	  
																	$scope.lstGroupCustomers = data;
																	// alert("lstGroupCustomers
																	// :"+$scope.lstGroupCustomers.length);
																	$scope
																		.showCustomers();
																});

														// alert("dealer");
														  
														$scope.editSaleOrder.cfgTblDealer = $scope.loginCustomer.cfgTblCustomer;
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
																		function (
																			dealer) {
																			return (dealer.serCustomerId == $scope.editSaleOrder.cfgTblDealer.serCustomerId
																				|| isEmpty(dealer.cfgTblGroupCustomer) ? dealer.serCustomerId == $scope.editSaleOrder.cfgTblDealer.serCustomerId
																				: dealer.cfgTblGroupCustomer.serCustomerId == $scope.editSaleOrder.cfgTblDealer.serCustomerId);
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
													  
												});

									});

						});
				  
				$scope.editSaleOrder.dteDate = $filter('date')(
					new Date($scope.editSaleOrder.dteDate),
					'yyyy-MM-dd');
				$scope.getProduct();
				
				 debugger;
				$scope
					.searchSaleOrderDetail($rootScope.editSaleOrder.serDealId);
				$scope.editSaleOrder.cfgTblCustomer = $rootScope.editSaleOrder.cfgTblCustomer;
				$scope.PriceListDTO_Search = {};
				$scope.lstPriceList = {};

				setTimeout(function () {
					$scope.showCustomers();
				}, 2000);
				$scope.lstProProductionSumary = {};
				// alert(" Loading-------");
			};

			$scope.showCustomer2 = function () {
				//						alert($scope.editSaleOrder.cfgTblCustomer.serCustomerId);
				if (isEmpty($scope.editSaleOrder.cfgTblCustomer.serCustomerId)) {
					$scope.editSaleOrder.cfgTblCustomer = {};
				}
			}

			$scope.showCustomers = function () {
				// alert("s c");
				  
				// if(isEmpty($scope.newSlsTblSaleOrder.cfgTblDealer.cfgTblGroupCustomer))
				if (isEmpty($scope.loginCustomer.blIsGroupCustomer)) {
					$scope.dealerCustomers = $filter('filter')
						(
							$scope.lstCustomer,
							function (cust) {
								return (!isEmpty(cust.cfgTblCustomer) && cust.cfgTblCustomer.serCustomerId == $scope.editSaleOrder.cfgTblDealer.serCustomerId);
							});
				} else {
					if (!isEmpty($scope.editSaleOrder.cfgTblDealer)
						&& $scope.editSaleOrder.cfgTblDealer.blIsLabsa) {
						$scope.dealerCustomers = $filter('filter')
							(
								$scope.lstGroupCustomers,
								function (cust) {
									return (!isEmpty(cust.cfgTblCustomer) && cust.cfgTblCustomer.blIsLabsa);
								});
					} else {
						$scope.dealerCustomers = $filter('filter')
							(
								$scope.lstGroupCustomers,
								function (cust) {
									return (!isEmpty(cust.cfgTblCustomer) && !(cust.cfgTblCustomer.blIsLabsa));
								});
					}
				}
				window.setTimeout($scope.resetDropDown, 100);

			};

			$scope.resetDropDown = function () {
				$('#load').click();
				//						$('.selectpicker').selectpicker('refresh');
			}

			$scope.searchSaleOrderDetail = function (id) {

				// $(".se-pre-con").fadeIn("slow");
				 

				$
					.ajax({
						url: '/' + project_name
							+ '/searchDealDetail',
						type: 'post',
						'headers': {
							'Content-Type': 'application/json'
						},
						dataType: 'json',
						success: function (data) {

							
							  debugger;
							$scope.lstSODetails = data;

							$scope.calculate();
							if (data == 'Failure') {
								$('#errMsgText')
									.html(
										"Unable to remove Product Component");
								$('#addErrorAlert').show();
							} else if (data == 'Success') {
						}
						},
						'error': function (xhr, d, err) {
							$('#errMsgText')
								.html(
									"Product Component to remove error");
							$('#addErrorAlert').show();
						},
						complete: function () {
							$(".se-pre-con").fadeOut("slow");
						},
						data: JSON.stringify(id)
					});
			};

			$scope.getProduct = function () {

				$http
					.get(
						'/' + project_name
						+ '/getAllProductCategory')
					.success(function (data) {

						  
						$scope.lstProductCategory = data;

					});

				$http.get('/' + project_name + '/getAllProduct')
					.success(function (data) {

						  
						$scope.lstProduct = data;

					});

				$http.get('/' + project_name + '/getAllCustomer')
					.success(function (data) {

						  
						$scope.lstCustomer = data;

					});
				

				$http.get('/' + project_name + '/getActiveCity')
					.success(function (data) {

						  
						$scope.lstCity = data;

					});

			};
		$scope.addNewSaleOrder = function () {

				$(".se-pre-con").fadeIn("slow");
				$('#addErrorAlert').hide();
				$('#successAlert').hide();
				$scope.newSlsTblSaleOrder.slsTblSoDetails = $scope.lstSODetails
				// var object = $scope.newSlsTblSoDetail;
				var object = $scope.newSlsTblSaleOrder;
				$
					.ajax({
						url: '/' + project_name
							+ '/addNewSaleOrder',
						type: 'post',
						'headers': {
							'Content-Type': 'application/json'
						},
						dataType: 'json',
						success: function (data) {
							if (data == 'Failure') {
								$('#errMsgText').html(
									"Unable to add Product");
								$('#addErrorAlert').show();
							} else if (data == 'Success') {
								$('#successMsgText')
									.html(
										"Product added successfully");
								$('#successAlert').show();
								$scope.newCfgProductSetup = {};
								$scope.init();
							} else if (data == 'error') {
								$('#errMsgText')
									.html(
										"Unable to add Product \n due to duplication of  Product");
								$('#addErrorAlert').show();
							}
						},
						'error': function (xhr, d, err) {
							$('#errMsgText')
								.html(
									"Unable to add Product \n Internal Error");
							$('#addErrorAlert').show();
						},
						complete: function () {
							$(".se-pre-con").fadeOut("slow");
							$('#addCloseButton').click();
						},
						data: angular.toJson(object)
						// data: object
					});
			};

			$scope.updateSaleOrder = function () {
			  
				var file = $("#uploadFile")[0].files[0];
				var fd = new FormData();
				var object_soSchedule = [];
				var object_soDetails = [];
				var Qty = 0;
				if (!(isEmpty($scope.lstSODetails))) {
					if (!Number($scope.lstSODetails[0].numQuantity) > 0) {
						alert('Product Quantity should be greator than 0.');
						return;
					}
					object_soDetails = JSON
						.stringify($scope.lstSODetails);

					Qty = $scope.lstSODetails[0].numQuantity;
				}

				if ($scope.lstScheduleDetails.length > 0) {
					if ($scope.total_sch_qty == Qty) {

					}
					else {
						alert("Schedule Quantity Does not match with the Order Quantity");
						return;
					}
				}

				if (!(isEmpty($scope.lstScheduleDetails))) {
					object_soSchedule = JSON
						.stringify($scope.lstScheduleDetails);
				}

				$(".se-pre-con").fadeIn("slow");
				$('#addErrorAlert').hide();
				$('#successAlert').hide();

				var object = JSON.stringify($rootScope.editSaleOrder);
				fd.append('so', object);
				fd.append('soDetails', object_soDetails);
//				fd.append('soSchedule', object_soSchedule);
				fd.append('file', file);
				// var object = JSON.stringify($scope.editProduct);

				$
					.ajax({
						dataType: 'json',
						url: "/" + project_name
							+ "/updateDeal",
						data: fd,
						type: "POST",
						enctype: 'multipart/form-data',
						processData: false,
						contentType: false,
						success: function (data) {
							if (data == 'Failure') {

								  
								$('#errMsgText')
									.html(
										"Unable to edit Sale Order");
								$('#addErrorAlert').show();
							} else if (data == 'Success') {

								$('#successMsgText')
									.html(
										"Deal Updated successfully");
								$('#successAlert').show();
								alert("Deal Updated Successfully.");
								$scope.init();
							}
							else if (data == 'SQNC') {
								$('#addErrorAlert').show();
								$('#successAlert').show();
								alert("Schedule Quantity should be Equal to Order Quantity.");

							}
							else if (data == '10M') {
								$('#errMsgText').html("Ship to Party is Unregistered in FBR, Monthly Sales limit of Customer exceeded more than 10M.");

								$('#addErrorAlert').show();
								$('#successAlert').show();
								alert("Ship to Party is Unregistered in FBR, Monthly Sales limit of Customer exceeded more than 10M.");
								$scope.init();
							}
							else if (data == '90D') {
								$('#errMsgText').html("Ship to Party is still open Invoice from more than 90 days.");
								$('#addErrorAlert').show();
								alert("Ship to Party is still open Invoice from more than 90 days.");
								$scope.init();
							}
						},
						'error': function (xhr, d, err) {
							$(".se-pre-con").fadeOut("slow");
							  
							$('#errMsgText')
								.html(
									"Unable to edit Deal \n Internal Error");
							$('#addErrorAlert').show();
						},
						complete: function () {

							$(".se-pre-con").fadeOut("slow");
							$('#editCloseButton').click();
						},

					});

			};

			$scope.populateEditDialog = function (txtProductCodeforEdit) {

				$rootScope.editSaleOrder = $filter("filter")(
					$scope.lstSO, {
					serDealId: txtProductCodeforEdit
				})[0];
				$scope
					.searchSaleOrderDetail($rootScope.editSaleOrder.serDealId)
			};

			$scope.getCustomerPriceList = function () {

				  
				$scope.lstPriceList_customer = {};
				$scope.PriceListDTO_Search.ser_customer_id = $scope.editSaleOrder.cfgTblCustomer.serCustomerId;
				$scope.searchPriceList(2);

				if (!(isEmpty($scope.editSaleOrder.cfgTblCustomer))) {

					$scope.newSlsTblSI.numDiscount = $scope.editSaleOrder.cfgTblCustomer.numDiscount;
					$scope.newSlsTblSI.numSalesTaxPerc = $scope.editSaleOrder.cfgTblCustomer.numSalesTax;
					if ($scope.editSaleOrder.cfgTblCustomer.blnIsGst === true)
						$scope.newSlsTblSI.numStaxTaxPerc = 0;
					else {
						$scope.newSlsTblSI.numStaxTaxPerc = 3;
					}
					if ($scope.editSaleOrder.cfgTblCustomer.blnIsFiler === true)
						$scope.newSlsTblSI.numAdvanceTaxPerc = .01;
					else
						$scope.newSlsTblSI.numAdvanceTaxPerc = .02;
				}
			}

			$scope.searchPriceList = function (id) {

				  
				var table = $('#data-table').DataTable();

				table.clear().draw();

				$scope.PriceListDTO_Search.req_all = id;
				var object = JSON.stringify($scope.PriceListDTO_Search);

				$
					.ajax({
						url: '/' + project_name
							+ '/getPriceListDTOinList',
						type: 'post',
						'headers': {
							'Content-Type': 'application/json'
						},
						dataType: 'json',
						success: function (data) {
							// alert();
							  
							if (id == 1)
								$scope.lstPriceList = data;
							else
								$scope.lstPriceList_customer = data;

							if (data == 'Failure') {
								$('#errMsgText').html(
									"Unable to search ");
								$('#addErrorAlert').show();
							} else if (data == 'Success') {

								$('#successMsgText').html(
									" search successfully");
								$('#successAlert').show();

							}
						},
						'error': function (xhr, d, err) {
							$('#errMsgText')
								.html(
									"Unable to search  \n Internal Error");
							$('#addErrorAlert').show();

						},
						complete: function () {
							$(".se-pre-con").fadeOut("slow");
						},
						data: object

					});

			};

			$scope.OnCustomerSelect = function () {
				  
				$scope.getCustomerPriceList();
			}

			$scope.deleteProductComponent = function () {

				$(".se-pre-con").fadeIn("slow");
				  
				var ids = "";
				$('tbody tr td input[type="checkbox"]').each(
					function () {
						if ($(this).prop('checked') == true) {
							ids += $(this).prop('id') + ",";
						}
					});
				$
					.ajax({
						url: '/' + project_name
							+ '/deleteProductComponent',
						type: 'post',
						'headers': {
							'Content-Type': 'application/json'
						},
						dataType: 'json',
						success: function (data) {
							if (data == 'Failure') {
								$('#errMsgText')
									.html(
										"Unable to remove Product Component");
								$('#addErrorAlert').show();
							} else if (data == 'Success') {
								$('#successMsgText')
									.html(
										"Product Component removed successfully");
								$('#successAlert').show();
								$scope.showRecipe();
							}
						},
						'error': function (xhr, d, err) {
							$('#errMsgText')
								.html(
									"Product Component to remove error");
							$('#addErrorAlert').show();
						},
						complete: function () {
							$(".se-pre-con").fadeOut("slow");
						},
						data: JSON.stringify(ids)
					});
			};

			$scope.stringToDate = function (_date, _format, _delimiter) {
				var formatLowerCase = _format.toLowerCase();
				var formatItems = formatLowerCase.split(_delimiter);
				var dateItems = _date.split(_delimiter);
				var monthIndex = formatItems.indexOf("mm");
				var dayIndex = formatItems.indexOf("dd");
				var yearIndex = formatItems.indexOf("yyyy");
				var month = parseInt(dateItems[monthIndex]);
				month -= 1;
				var formatedDate = new Date(dateItems[yearIndex],
					month, dateItems[dayIndex]);
				return formatedDate;
			}

			$rootScope.addScheduleDetail = function () {

				var date2 = document.getElementById("s_date").value;
				if (!(date2.length > 5)) {
					alert("Date Cannot be empty");
					return;
				}
				if (!(Number($scope.newSlsTblSaleItemSchedule.numQuantity) > 0)) {
					alert('Schedule Quantity should be greator than 0.')
					return;
				}
				  
				var today = new Date();
				var yesterday = new Date(today);

				yesterday.setDate(today.getDate() - 1);
				console.log("Original Date : ", yesterday);


				var varDate = new Date($("#s_date").val().split("-").reverse().join("-"));
				
				if (varDate < yesterday) {
					//Do something..
					alert("Schedule Date Must be greator than or equal to Today");
					return;
				}
				for (i = 0; i < $scope.lstScheduleDetails.length; i++) {
					var comp = $scope.lstScheduleDetails[i].dteDate;
					console.log(new Date(comp).toISOString());
					console.log(varDate.toISOString());


					if (new Date(comp).getFullYear() == varDate
						.getFullYear()
						&& new Date(comp).getMonth() + 1 == varDate
							.getMonth() + 1
						&& new Date(comp).getDate() == varDate
							.getDate()) {
						alert('Schedule Date Already Exist.')
						return;
					}

				}

				var a = date2;
				// $scope.newSlsTblSaleItemSchedule.dteDate=$("#s_date").val();
				$scope.newSlsTblSaleItemSchedule.dteDate = varDate;

				// $scope.SlsTblSaleItemSchedule.dteDate =
				// $.datepicker.parseDate('dd/mm/yy', '12/12/2019');

				// alert();
				//   

				var total = Number($scope.total_sch_qty)
					+ Number($scope.newSlsTblSaleItemSchedule.numQuantity);

				// if (total > $scope.scheduleLine.numQuantity) {
				// 	alert('Schedule Quantity can not be greator than Total Quantity.')
				// 	return;
				// }

				$scope.lstScheduleDetails.push(angular
					.copy($scope.newSlsTblSaleItemSchedule));

				$scope.newSlsTblSaleItemSchedule.numQuantity = 0;

				$scope.calculateSchedule();
			};

			$rootScope.saveSchedule = function () {

				if ($scope.total_sch_qty > $scope.scheduleLine.numQuantity) {
					alert('Schedule Quantity can not be greator than Total Quantity.')
					return;
				}

				if ($scope.total_sch_qty < $scope.scheduleLine.numQuantity) {
					alert('Schedule Quantity can not be less than Total Quantity.')
					return;
				}

				$scope.scheduleLine.slsTblSaleItemSchedule = $scope.lstScheduleDetails;
				for (let i = 0; i < $scope.lstSODetails.length; i++) {
					if ($scope.lstSODetails[i].cfgTblProduct.serProductId === $scope.scheduleLine.cfgTblProduct.serProductId) {
						$scope.lstSODetails[i] = $scope.scheduleLine;
					}
				}

				$('#editCloseButtonSch1').click();
				$rootScope.refreshProductComponent();

			}

			$rootScope.refreshProductComponent = function () {

				$(".se-pre-con").fadeIn("slow");
				  
				var ids = "";
				$(".se-pre-con").fadeOut("slow");
			}

			function isEmpty(val) {
				return (val === undefined || val == null || val.length <= 0) ? true
					: false;
			}
			$scope.selectUnselectAll = function () {
				$('tbody tr td input[type="checkbox"]').each(
					function () {
						$(this).prop('checked', $scope.checked);
					});
			};

			$scope.populateEditDialogReport_DC = function (
				txtProductCodeforEdit) {

				window.open(window.location.protocol + "//"
					+ window.location.host
					+ "/OPAL/getDCReport?ser_issue_id="
					+ txtProductCodeforEdit
					+ "&Report_name=DeliveryChalan.jasper",
					"_blank");

			};

			$scope.populateDataTable = function (dataTable) {

				var table = $('#data-table-edit').DataTable();
				table.clear();

				$
					.each(
						dataTable,
						function (index, component) {
							var editDeleteColumn = '<div class="dropdown" id="dropdown'
								+ component.serDealId
								+ '">'
								+ '<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('
								+ component.serDealId
								+ ');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'
								+ '<ul class="dropdown-menu">'
								+ '<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('
								+ component.serDealId
								+ ');angular.element(this).scope().$apply();" data-target=""#/editSaleOrderForm">Edit Deal</a></li>'
								+ '</ul>';
					  
							$scope.total_qty = $scope.total_qty
								+ component.numQuantity;
							$scope.total_amount = $scope.total_amount
								+ (component.numPerPiecePrice * component.numQuantity);
							$scope.total_unit = $scope.total_unit
								+ (component.numQuantity * component.cfgTblProduct.numUnitsInMasterPack);
							$scope.total_wt = $scope.total_wt
								+ (component.numQuantity
									* component.cfgTblProduct.numUnitsInMasterPack * component.cfgTblProduct.numProductWeight);

							editColumn = '<a class="btn btn-success" href="#/editSaleOrderForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('
								+ component.serDealId
								+ ');angular.element(this).scope().$apply();" >Show Details  </a>';

							table.row
								.add(
									[
										component.cfgTblProduct.txtProductName,
										isEmpty(component.cfgTblProductDesign) ? ""
											: component.cfgTblProductDesign.txtProductDesignName,
										isEmpty(component.cfgTblProductQuality) ? ""
											: component.cfgTblProductQuality.txtProductQualityName,
										component.cfgTblProduct.txtMasterPack,
										component.numQuantity,
										component.cfgTblProduct.txtPriceUnit,
										component.numQuantity
										* component.cfgTblProduct.numUnitsInMasterPack,
										component.numQuantity
										* component.cfgTblProduct.numUnitsInMasterPack
										* component.cfgTblProduct.numProductWeight,
										component.numStockAvailabe])
								.draw();
						});

			};

			$scope.newSlsTblSI = {};
			$scope.OnProductSelect = function () {

			}
			$scope.calculate = function () {

				$scope.total_qty = 0;

				$scope.total_units = 0;

				$scope.total_amount = 0;

				$scope.total_wt = 0;

				$scope.total_pieces = 0;

				for (i = 0; i < $scope.lstSODetails.length; i++) {
					$scope.total_qty = $scope.total_qty
						+ new Number(
							$scope.lstSODetails[i].numQuantity);

					$scope.total_units = $scope.total_units
						+ $scope.lstSODetails[i].numQuantity
						* $scope.lstSODetails[i].cfgTblProduct.numUnitsInMasterPack;

					$scope.total_amount = $scope.total_amount
						+ $scope.lstSODetails[i].numQuantity
						* $scope.lstSODetails[i].cfgTblProduct.numUnitsInMasterPack
						* $scope.lstSODetails[i].numItemPrice;

					$scope.total_wt = $scope.total_wt
						+ $scope.lstSODetails[i].numQuantity
						* $scope.lstSODetails[i].cfgTblProduct.numProductWeight;

					$scope.total_pieces = $scope.total_pieces
						+ $scope.lstSODetails[i].numQuantity
						* $scope.lstSODetails[i].cfgTblProduct.numPiecesInMasterPack;

				}

				$scope.newSlsTblSI.numTotalAmount = $scope.total_amount;
				var numDiscountAmount = 0;
				var numAmountAfterDiscount = 0;
				var numSalesTax = 0;
				var numSpecialSalestax = 0;
				var numTotalAmountAfterStax = 0;
				var numTotalAdvanceTaxAmount = 0;
				var numInvoiceAmount = 0;
				var numInvoiceAmountAftFreight = 0;

				numDiscountAmount = $scope.newSlsTblSI.numTotalAmount
					* ($scope.newSlsTblSI.numDiscount / 100);

				$scope.newSlsTblSI.numDiscountAmount = numDiscountAmount;

				numAmountAfterDiscount = $scope.newSlsTblSI.numTotalAmount
					- $scope.newSlsTblSI.numDiscountAmount;
				;

				$scope.newSlsTblSI.numAmountAfterDiscount = numAmountAfterDiscount;

				numSalesTax = $scope.newSlsTblSI.numAmountAfterDiscount
					* ($scope.newSlsTblSI.numSalesTaxPerc / 100);
				$scope.newSlsTblSI.numSalesTax = numSalesTax;

				numSpecialSalestax = $scope.newSlsTblSI.numAmountAfterDiscount
					* ($scope.newSlsTblSI.numStaxTaxPerc / 100);
				;
				$scope.newSlsTblSI.numSpecialSalestax = numSpecialSalestax;

				numTotalAmountAfterStax = $scope.newSlsTblSI.numAmountAfterDiscount
					+ $scope.newSlsTblSI.numSalesTax
					+ $scope.newSlsTblSI.numSpecialSalestax;
				$scope.newSlsTblSI.numTotalAmountAfterStax = numTotalAmountAfterStax;

				numTotalAdvanceTaxAmount = $scope.newSlsTblSI.numTotalAmountAfterStax
					* ($scope.newSlsTblSI.numAdvanceTaxPerc / 100);
				$scope.newSlsTblSI.numTotalAdvanceTaxAmount = numTotalAdvanceTaxAmount;

				numInvoiceAmount = $scope.newSlsTblSI.numTotalAmountAfterStax
					+ $scope.newSlsTblSI.numTotalAdvanceTaxAmount;
				$scope.newSlsTblSI.numInvoiceAmount = numInvoiceAmount;

				numInvoiceAmountAftFreight = $scope.newSlsTblSI.numInvoiceAmount
					- $scope.newSlsTblSI.numFreightAmount;
				;
				$scope.newSlsTblSI.numInvoiceAmountAftFreight = numInvoiceAmountAftFreight;

				$rootScope.calculateSchedule();

			}
			$rootScope.lstScheduleDetails = [];
			$rootScope.scheduleLine = {};
			$rootScope.schedule = function (row) {

				$rootScope.lstScheduleDetails = [];
				$rootScope.scheduleLine = {};
				$rootScope.total_sch_qty = 0;
				$rootScope.scheduleLine = row;

				$rootScope
					.searchSaleOrderDetailSchedule($rootScope.scheduleLine.serSoDetailId);
			}
			$rootScope.total_sch_qty = 0;
			
			$rootScope.removeitem=function( index)
			{
				
				$rootScope.lstScheduleDetails.pop(index);
				$rootScope.calculateSchedule();
			}
			$rootScope.calculateSchedule = function () {
				$rootScope.total_sch_qty = 0;

				for (let i = 0; i < $rootScope.lstScheduleDetails.length; i++) {

					$rootScope.total_sch_qty = $rootScope.total_sch_qty
						+ new Number(
							$rootScope.lstScheduleDetails[i].numQuantity);

				}

				if (!isEmpty($rootScope.total_sch_qty)) {
					if (Number($rootScope.total_sch_qty) > 0) {
						$scope.lstSODetails[0].numQuantity = $rootScope.total_sch_qty
						$scope.total_qty = $rootScope.total_sch_qty;
					}

				}


			}

			$rootScope.searchSaleOrderDetailSchedule = function (id) {
				$
					.ajax({
						url: '/' + project_name
							+ '/searchSaleOrderDetailSchedule',
						type: 'post',
						'headers': {
							'Content-Type': 'application/json'
						},
						dataType: 'json',
						success: function (data) {

							$rootScope.lstScheduleDetails = data;

							$rootScope.calculateSchedule();

							if (data == 'Failure') {
								$('#errMsgText')
									.html(
										"Unable to remove Product Component");
								$('#addErrorAlert').show();
							} else if (data == 'Success') {

							}
						},
						'error': function (xhr, d, err) {
							$('#errMsgText')
								.html(
									"Product Component to remove error");
							$('#addErrorAlert').show();
						},
						complete: function () {
							$(".se-pre-con").fadeOut("slow");
						},
						data: JSON.stringify(id)
					});
			};

			$scope.UpdatePrice = function () {
				for (i = 0; i < $scope.lstSODetails.length; i++) {

					if (!(isEmpty($scope.lstSODetails[i].cfgTblProductDesign))) {

						if ($scope.lstSODetails[i].cfgTblProductDesign.txtProductDesignName == 'PLAIN') {
							$scope.priceListDTO = $filter('filter')
								(
									$scope.lstPriceList_customer,
									function (pricelist) {
										return (pricelist.ser_product_id == $scope.lstSODetails[i].cfgTblProduct.serProductId)
											&& (pricelist.ser_product_quality_id == $scope.lstSODetails[i].cfgTblProductQuality.serProductQualityId)
											&& (pricelist.ser_customer_id == $scope.editSaleOrder.cfgTblCustomer.serCustomerId)
									})[0];
						} else

							$scope.priceListDTO = $filter('filter')
								(
									$scope.lstPriceList_customer,
									function (pricelist) {
										return (pricelist.ser_product_id == $scope.lstSODetails[i].cfgTblProduct.serProductId)
											&& (pricelist.ser_product_quality_id == $scope.lstSODetails[i].cfgTblProductQuality.serProductQualityId)
											&& (pricelist.ser_product_design_id == $scope.lstSODetails[i].cfgTblProductDesign.serProductDesignId)
											&& (pricelist.ser_customer_id == $scope.editSaleOrder.cfgTblCustomer.serCustomerId)
									})[0];
					} else {
						$scope.priceListDTO = $filter('filter')
							(
								$scope.lstPriceList_customer,
								function (pricelist) {
									return (pricelist.ser_product_id == $scope.lstSODetails[i].cfgTblProduct.serProductId)
										&& (pricelist.ser_product_quality_id == $scope.lstSODetails[i].cfgTblProductQuality.serProductQualityId)
										&& (pricelist.ser_customer_id == $scope.editSaleOrder.cfgTblCustomer.serCustomerId)
								})[0];
					}
					if (isEmpty($scope.priceListDTO)) {
						if (!(isEmpty($scope.lstSODetails[i].cfgTblProductDesign))) {

							if ($scope.lstSODetails[i].cfgTblProductDesign.txtProductDesignName == 'PLAIN') {

								$scope.priceListDTO = $filter('filter')
									(
										$scope.lstPriceList,
										function (pricelist) {
											return (pricelist.ser_product_id == $scope.lstSODetails[i].cfgTblProduct.serProductId)
												&& (pricelist.ser_product_quality_id == $scope.lstSODetails[i].cfgTblProductQuality.serProductQualityId)
										})[0];
							} else
								$scope.priceListDTO = $filter('filter')
									(
										$scope.lstPriceList,
										function (pricelist) {
											return (pricelist.ser_product_id == $scope.lstSODetails[i].cfgTblProduct.serProductId)
												&& (pricelist.ser_product_quality_id == $scope.lstSODetails[i].cfgTblProductQuality.serProductQualityId)
												&& (pricelist.ser_product_design_id == $scope.lstSODetails[i].cfgTblProductDesign.serProductDesignId)
										})[0];
						} else {
							$scope.priceListDTO = $filter('filter')
								(
									$scope.lstPriceList,
									function (pricelist) {
										return (pricelist.ser_product_id == $scope.lstSODetails[i].cfgTblProduct.serProductId)
											&& (pricelist.ser_product_quality_id == $scope.lstSODetails[i].cfgTblProductQuality.serProductQualityId)
									})[0];
						}
					}

					// /////////////////////////////////End of if
					// Customer Rates are not
					// Defined//////////////////////////////////////

					if (!(isEmpty($scope.priceListDTO)))
						$scope.lstSODetails[i].numItemPrice = $scope.priceListDTO.num_rate;
					else
						$scope.lstSODetails[i].numItemPrice = $scope.lstSODetails[i].cfgTblProduct.numSalePrice;

				}

				$scope.calculate();

			}

			$scope.readProduct_pic = function (input) {

				$scope.uploadFile = input.value;
				$scope.file_show = $("#uploadFile")[0].files[0];
					var filename = $scope.uploadFile.replace(/^.*[\\\/]/,
					'');
				if (input.files && input.files[0]) {
					var reader = new FileReader();

					reader.onload = function (e) {
						$('#blah').attr('src', e.target.result);
						/*.width(128)
						.height(128);*/
					};

					reader.readAsDataURL(input.files[0]);
				}
			}

			/////////////////////////////////////////////////////////////


			

		}).directive('fileModel', ['$parse', function ($parse) {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					var model = $parse(attrs.fileModel);
					var modelSetter = model.assign;

					element.bind('change', function () {
						scope.$apply(function () {
							modelSetter(scope, element[0].files[0]);
						});
					});
				}
			};
		}]);

		app.controller('showDCCtrl', function($scope, $http, $filter,$rootScope,$window,$sce){	
		
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
				
	//			alert("---1--"+$rootScope.editSaleOrder.serDealId);
			
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
	//			alert("-----"+$rootScope.editSaleOrder.serDealId);

				$scope.searchSaleOrderDetail($rootScope.editSaleOrder.serDealId);
				$scope.searchSaleOrderDetailSchedule($rootScope.editSaleOrder.serDealId);
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
				
					$.ajax({
						url: '/'+project_name+'/searchDealDetail',
						type: 'post',
						'headers': {
							'Content-Type': 'application/json'
						},
						dataType: 'json',
						success: function (data) {
							
							debugger;
					   
							  
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
					console.log(txtProductCodeforEdit)
				$rootScope.editSaleOrder = $filter("filter")($scope.lstSO, {serDealId:txtProductCodeforEdit})[0];
				$scope.searchSaleOrderDetail($rootScope.editSaleOrder.serDealId);
			
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
					var editDeleteColumn ='<div class="dropdown" id="dropdown'+component.serDealId+'">'+
											'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+component.serDealId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
												'<ul class="dropdown-menu">'+  
											  '<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+component.serDealId+');angular.element(this).scope().$apply();" data-target=""#/editSaleOrderForm">Edit Deal</a></li>'+
												'</ul>';
		/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
		*/  		 //   
	//	  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+so.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'
		 
	//			  
				  $scope.total_qty= $scope.total_qty+component.numQuantity;
				  $scope.total_amount= $scope.total_amount+(component.numPerPiecePrice*component.numQuantity);
				  $scope.total_unit= $scope.total_unit+(component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack);
				  $scope.total_wt=$scope.total_wt+(component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack*component.cfgTblProduct.numProductWeight);
					
					editColumn	 ='<a class="btn btn-success" href="#/editSaleOrderForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+component.serDealId+');angular.element(this).scope().$apply();" >Show Details  </a>';
	
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
				
				  
				$rootScope.total_sch_qty=0;
				 
	
		for (let i=0;i<$rootScope.lstScheduleDetails.length;i++)
							  {
						
						
							
			$rootScope.total_sch_qty=$rootScope.total_sch_qty+new Number($rootScope.lstScheduleDetails[i].numQuantity);
								
				
						
					  }
				   
			
			}
			
			$rootScope.searchSaleOrderDetailSchedule = function(id){
				
	//			$(".se-pre-con").fadeIn("slow");
				  
			
				$.ajax({
					url: '/'+project_name+'/searchSaleOrderDetailScheduleforDCForm',
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
			$scope.print = function (row)
			{

				window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/DC?dc="+row.txtIssueCode,"_blank");
			}
			
			$scope.printInvoice = function (row)
			{

				window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/Invoice?invoice="+row.txtINVNo,"_blank");
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