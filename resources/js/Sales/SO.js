var app = angular.module('myApp', []);

app
		.controller(
				'productCtrl',
				function($scope, $http, $filter) {

					// /////////////////////////////////
					$scope.CfgProductSetup = {};
					$scope.newSlsTblSoDetail = {};
					$scope.editProductComponent = {};

					$scope.newSlsTblSaleOrder = {};

					$scope.newSlsTblSoDetail = {};
					$scope.loginCustomer = {};

					$scope.lstProductCategory = [];
					$scope.lstBrand = [];
					$scope.lstProduct = [];
					$scope.lstPacking = [];
					$scope.lstCustomer = [];
					$scope.lstDealrsGroup = [];

					$scope.isDealer = 1;
					$scope.dealerCustomers = [];

					$scope.lstDealer = {};
					$scope.delaer = {};
					$scope.newCfgProductComponent = {};
					$scope.lstProductComponent = [];

					$scope.lstSODetails = [];
					$scope.lstSO = [];
					$scope.lstProProductionSumary = [];
					$scope.lstPriceList_customer = [];
					$scope.priceListDTO = {};
					$scope.newSlsTblSI = {};

					$scope.total_qty = 0;
					$scope.total_units = 0;
					$scope.total_wt = 0;
					$scope.total_amount = 0;
					$scope.total_pieces = 0;
					$scope.PriceListDTO_Search = {};
					$scope.lstPriceList = [];
					$scope.lstGroupCustomers = [];
					$scope.designList = {};
					$scope.checked = true;
					$scope.lstCity = [];

					$scope.lstDocumentType = [];
					$scope.lstSalesOrganization = [];
					$scope.lstDistributionChannel = [];
					$scope.lstDivision = [];
					$scope.lstPaymentTerms = [];
					$scope.lstIncoTerms = [];

					$scope.scheduleLine = {};
					$scope.newSlsTblSaleItemSchedule = {};
					$scope.lstScheduleDetails = [];

					$scope.init = function() {

						var pathArray = location.pathname.split('/');
						var appPath = "";// "/";
						for (var i = 1; i < pathArray.length - 1; i++) {
							appPath += pathArray[i];
							// + "/";
						}
						project_name = appPath;
						$(".datepicker").datepicker({
							"setDate" : new Date(),
							dateFormat : "dd-mm-yy"
						});

						$http.get('/' + project_name + '/getAllDocumentType')
								.success(function(data) {

									$scope.lstDocumentType = data;

								});

						$http
								.get(
										'/' + project_name + '/getAllSalesOrganization')
								.success(function(data) {

									$scope.lstSalesOrganization = data;

								});

						$http.get(
								'/' + project_name
										+ '/getAllDistributionChannel')
								.success(function(data) {

									$scope.lstDistributionChannel = data;

								});

						$http.get('/' + project_name + '/getAllDivision')
								.success(function(data) {

									$scope.lstDivision = data;

								});

						$http.get('/' + project_name + '/getAllPaymentTerm')
								.success(function(data) {

									$scope.lstPaymentTerms = data;

								});

						$http.get('/' + project_name + '/getAllIncoTerm')
								.success(function(data) {

									$scope.lstIncoTerms = data;

								});
						var d = new Date();
						var curr_date = d.getDate();
						if (curr_date < 10)
							curr_date = '0' + curr_date;
						var curr_month = d.getMonth() + 1;
						if (curr_month < 10)
							curr_month = '0' + curr_month;
						var curr_year = d.getFullYear();
//						d = curr_year + "-" + curr_month + "-" + curr_date;
						d = curr_date + "-" + curr_month + "-" + curr_year;
						$scope.dteDateTest=d;
						$scope.newSlsTblSaleOrder.dteDate = d;

						$scope.getProduct();

						$scope.total_pieces = 0;
						$scope.newSlsTblSI.numTotalQty = 0;
						$scope.newSlsTblSI.numTotalAmount = 0;

						$scope.newSlsTblSI.numDiscount = 0;
						$scope.newSlsTblSI.numDiscountAmount = 0;
						$scope.newSlsTblSI.numAmountAfterDiscount = 0;

						$scope.newSlsTblSI.numSalesTax = 0;
						$scope.newSlsTblSI.numSalesTaxPerc = 0

						$scope.newSlsTblSI.numSpecialSalestax = 0;
						$scope.newSlsTblSI.numStaxTaxPerc = 0;

						$scope.newSlsTblSI.numTotalAmountAfterStax = 0;

						$scope.newSlsTblSI.numTotalAdvanceTaxAmount = 0;
						$scope.newSlsTblSI.numAdvanceTaxPerc = 0;
						$scope.newSlsTblSI.numInvoiceAmount = 0;

						$scope.newSlsTblSI.numFreightAmount = 0;
						$scope.newSlsTblSI.numInvoiceAmountAftFreight = 0;

						/* $scope.newSlsTblSaleOrder.txtPONo="N.A"; */
					};

					$scope.showRecipe = function() {
						// var table = $('#data-table').DataTable();

						// table.clear().draw();
						// $scope.lstProductComponent={};
						// alert($scope.newCfgProductComponent.cfgTblProductParent.txtProductName);

						// var object =
						// JSON.stringify($scope.newCfgProductComponent);

						var object = $scope.newCfgProductComponent;
						$
								.ajax({
									url : '/' + project_name
											+ '/searchProductComponent',
									type : 'post',
									'headers' : {
										'Content-Type' : 'application/json'
									},
									dataType : 'json',
									success : function(data) {

										$scope.lstProductComponent = data;
										$scope.lstProduct = [];
										for (i = 0; i < $scope.lstProductComponent.length; i++) {

											$scope.lstProduct
													.push($scope.lstProductComponent[i].cfgTblProductChild);
										}
										window.setTimeout($scope.resetDropDown,
												2000);
										// $scope.keydownforQty();
										// $('.table').table('refresh');
										// $scope.user-table.reload();
										// alert("1");
										// $scope.populateDataTable(data);
										if (data == 'Failure') {
											$('#errMsgText').html(
													"Unable to search Recipe");
											$('#addErrorAlert').show();
										} else if (data == 'Success') {

											$('#successMsgText')
													.html(
															"Recipe search successfully");
											$('#successAlert').show();

										}
									},
									'error' : function(xhr, d, err) {
										$('#errMsgText')
												.html(
														"Unable to search Recipe \n Internal Error");
										$('#addErrorAlert').show();

									},
									complete : function() {
										$(".se-pre-con").fadeOut("slow");
									},
									// data:object
									data : angular.toJson(object)
								});

					};

					$scope.abc = function() {
						// alert();
					}

					$scope.resetDropDown = function() {
						$('#pt').click();
						if (!$scope.lstProductComponent.length > 0) {
							$http.get('/' + project_name + '/getActiveProduct')
									.success(function(data) {

										debugger;
										$scope.lstProduct = data;
										$('#pt').click();
									});
						}
						$('#pt').click();

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

					$scope.searchPriceList = function(id) {

					};

					$scope.schedule = function(row) {
						// alert(row);
						debugger;
						$scope.scheduleLine = row;

						if (isEmpty($scope.scheduleLine.numQuantity)) {
//							alert(" Please Enter Product Quantity.");
							$scope.scheduleLine.numQuantity=0;
//							return;
						}
						
						else if (!Number($scope.scheduleLine.numQuantity > 0)) {
//							alert(" Product Quantity Should be greator than 0.");
							$scope.scheduleLine.numQuantity=0;
						}

						
						if (!isEmpty($scope.scheduleLine.slsTblSaleItemSchedule))
							{
							$scope.lstScheduleDetails = $scope.scheduleLine.slsTblSaleItemSchedule;
							for (let i = 0; i < $scope.lstScheduleDetails.length; i++) {

								$scope.lstScheduleDetails[i].dteDate = $scope.lstScheduleDetails[i].dteDate.split("-").reverse().join("-");
								}
							}
						else
							$scope.lstScheduleDetails = [];
							$scope.calculateSchedule();
					}

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

					$scope.addBookingDetail = function() {
						if ($scope.lstSODetails.length > 0) {
//							alert("Only one Product can be added at a time.")
							if (isEmpty($scope.newSlsTblSoDetail.cfgTblProduct)) {
								alert(" Please select Product.");
								return;
							}
							if (!isEmpty($scope.newSlsTblSoDetail.numQuantity) && Number($scope.newSlsTblSoDetail.numQuantity > 0)) {
								$scope.lstSODetails[0].numQuantity=$scope.newSlsTblSoDetail.numQuantity;
							}
							$scope.lstSODetails[0].cfgTblProduct=$scope.newSlsTblSoDetail.cfgTblProduct;
							$scope.calculate();

							return;
						}
						debugger;
						$scope.newSlsTblSoDetail.numStockAvailabe = 0;

						/*
						 * if(isEmpty($scope.newSlsTblSaleOrder.cfgTblCustomer) ) {
						 * alert(" Please select Customer."); return; }
						 */

						if (isEmpty($scope.newSlsTblSoDetail.cfgTblProduct)) {
							alert(" Please select Product.");
							return;
						}
						
						if (isEmpty($scope.newSlsTblSoDetail.numQuantity)) {
							alert(" Please Enter Product Quantity.");
							return;
						}
						
						if (!Number($scope.newSlsTblSoDetail.numQuantity > 0)) {
							alert(" Product Quantity Should be greator than 0.");
							return;
						}


						$scope.newSlsTblSoDetail.numItemPrice = $scope.newSlsTblSoDetail.cfgTblProduct.numSalePrice;

						$scope.lstSODetails.push(angular
								.copy($scope.newSlsTblSoDetail));

//						$scope.newSlsTblSoDetail.numQuantity = 0;

						$scope.calculate();

					};

					$scope.addScheduleDetail = function() {
							debugger;
						if (!(Number($scope.newSlsTblSaleItemSchedule.numQuantity) > 0)) {
							alert("Please enter Valid Schedule Quantity");
							return;
						
						}
						var today = new Date();
					    var yesterday = new Date(today);
					    
					    yesterday.setDate(today.getDate() - 1);
					    console.log("Original Date : ",yesterday);
					    
						var date = document.getElementById("s_date").value;
					
						if(!(date.length > 5))
							{
							alert("Date Cannot be empty");
							return;
							}
						
						var varDate = new Date(date.split("-").reverse().join("-")); //dd-mm-YYYY
						var today = new Date();

						if(varDate < yesterday) {
						//Do something..
						alert("Schedule Date Must be greator than or equal to Today");
						return;
						}

						if (!Number($scope.newSlsTblSaleItemSchedule.numQuantity) > 0) {
							alert('Schedule Quantity should be greator than 0.')
							return;
						}
						for (i = 0; i < $scope.lstScheduleDetails.length; i++) {
							console.log(new Date($scope.lstScheduleDetails[i].dteDate.split("-").reverse().join("-")));
							console.log(varDate);
							var comp=new Date($scope.lstScheduleDetails[i].dteDate.split("-").reverse().join("-"));
							if ( comp.getTime() === varDate.getTime() ) {
								alert('Schedule Date Already Exist.')
								return;
							}
						}
						
						var total = Number($scope.total_sch_qty)
								+ Number($scope.newSlsTblSaleItemSchedule.numQuantity);

						if (total > $scope.scheduleLine.numQuantity) {
							alert('Schedule Quantity can not be greator than Total Quantity.')
							return;
						}
						$scope.lstScheduleDetails.push(angular
								.copy($scope.newSlsTblSaleItemSchedule));
						$scope.calculateSchedule();

					};

					$scope.saveSchedule = function() {
					
						if ($scope.total_sch_qty > $scope.scheduleLine.numQuantity) {
							alert('Schedule Quantity can not be greator than Total Quantity.')
							return;
						}

						if ($scope.total_sch_qty < $scope.scheduleLine.numQuantity) {
							alert('Schedule Quantity can not be less than Total Quantity.')
							return;
						}

						$scope.scheduleLine.slsTblSaleItemSchedule = $scope.lstScheduleDetails;
						
						for (let i = 0; i < $scope.lstScheduleDetails.length; i++) {

							if (!($scope.lstScheduleDetails[i].numQuantity > 0)) {
								alert("Please enter Valid Quantity in Schedule");
								return;
								break;
							}

						}

						// let updateItem = this.lstSODetails.find(x =>
						// x.cfgTblProduct.serProductId,
						// $scope.scheduleLine.cfgTblProduct.serProductId);
						//		  
						// alert(updateItem.cfgTblProduct.serProductId+'----'+$scope.scheduleLine.cfgTblProduct.serProductId);

						for (let i = 0; i < this.lstSODetails.length; i++) {
							if (this.lstSODetails[i].cfgTblProduct.serProductId === $scope.scheduleLine.cfgTblProduct.serProductId) {
								this.lstSODetails[i] = $scope.scheduleLine;
							}
						}

						$('#editCloseButtonSch').click();

					}

					$scope.checkstatus = function() {
						// alert();
						debugger;

						this.lstSODetails;
					}

					$scope.refreshProductComponent = function() {

						$(".se-pre-con").fadeIn("slow");
						debugger;
						var ids = "";
						$(".se-pre-con").fadeOut("slow");
					}

					$scope.calculate = function() {

						// alert();
						debugger;
						$scope.total_qty = 0;

						$scope.total_units = 0;

						$scope.total_amount = 0;

						$scope.total_wt = 0;

						$scope.total_pieces = 0;

						for (let i = 0; i < $scope.lstSODetails.length; i++)

						{

							$scope.total_qty = $scope.total_qty
									+ new Number(
											$scope.lstSODetails[i].numQuantity);

						}

					}
					$scope.total_sch_qty = 0;

					$scope.calculateSchedule = function() {

						// alert();
						debugger;
						$scope.total_sch_qty = 0;

						for (let i = 0; i < $scope.lstScheduleDetails.length; i++) {

							$scope.total_sch_qty = $scope.total_sch_qty
									+ new Number(
											$scope.lstScheduleDetails[i].numQuantity);

							// $scope.total_units=$scope.total_units+$scope.lstSODetails[i].numQuantity*$scope.lstSODetails[i].cfgTblProduct.numUnitsInMasterPack;
							//	    			 
							// $scope.total_amount=$scope.total_amount+$scope.lstSODetails[i].numQuantity*$scope.lstSODetails[i].cfgTblProduct.numUnitsInMasterPack*$scope.lstSODetails[i].numItemPrice;
							//	    			 
							// $scope.total_wt=$scope.total_wt+$scope.lstSODetails[i].numQuantity*$scope.lstSODetails[i].cfgTblProduct.numProductWeight;
							//	    			 
							// $scope.total_pieces=$scope.total_pieces+$scope.lstSODetails[i].numQuantity*$scope.lstSODetails[i].cfgTblProduct.numPiecesInMasterPack;

						}

					}
					$scope.OnCustomerSelect = function() {
						debugger;
						$scope.lstPriceList_customer = {};
						$scope.PriceListDTO_Search.ser_customer_id = $scope.newSlsTblSaleOrder.cfgTblCustomer.serCustomerId;
						$scope.searchPriceList(2);

						if (!(isEmpty($scope.newSlsTblSaleOrder.cfgTblCustomer))) {
							$scope.newSlsTblSaleOrder.txtShippingAddress1 = $scope.newSlsTblSaleOrder.cfgTblCustomer.txtBillingAddress;
							$scope.newSlsTblSaleOrder.txtShippingAddress2 = $scope.newSlsTblSaleOrder.cfgTblCustomer.txtShippingAddress;

							$scope.newSlsTblSI.numDiscount = $scope.newSlsTblSaleOrder.cfgTblCustomer.numDiscount;
							$scope.newSlsTblSI.numSalesTaxPerc = $scope.newSlsTblSaleOrder.cfgTblCustomer.numSalesTax;
							if ($scope.newSlsTblSaleOrder.cfgTblCustomer.blnIsGst === true)
								$scope.newSlsTblSI.numStaxTaxPerc = 0;
							else {
								$scope.newSlsTblSI.numStaxTaxPerc = 3;
							}
							if ($scope.newSlsTblSaleOrder.cfgTblCustomer.blnIsFiler === true)
								$scope.newSlsTblSI.numAdvanceTaxPerc = .01;
							else
								$scope.newSlsTblSI.numAdvanceTaxPerc = .02;
						}

						/*
						 * $scope.newSlsTblSI.numStaxTaxPerc =;
						 * $scope.newSlsTblSI.numTotalAmountAfterStax=;
						 */

					}

					$scope.refresh = function() {
						$scope.refresh = true;
						$timeout(function() {
							$scope.refresh = false;
						}, 0);
					};
					$scope.removeBookingDetail = function() {
						$scope.lstSODetails.pop(angular
								.copy($scope.newSlsTblSoDetail));
						$scope.lstSODetails
					};

					$scope.GetAvailabeQty = function(ser_product_id,
							ser_product_design_id, ser_product_quality_id) {

					}

$scope.addNewSaleOrder = function(){

		$(".se-pre-con").fadeIn("slow");
		
		window.setTimeout(
		$scope.addNewSaleOrder2 , 10);
	};

					$scope.addNewSaleOrder2 = function() {

						if (isEmpty($scope.newSlsTblSaleOrder.cfgTblCustomer)) {
							if (isEmpty($scope.newSlsTblSaleOrder.cfgTblDealer)) {
								alert(" Please select Dealer / Customer.");
								return;
							}
						}
						
						if (isEmpty($scope.newSlsTblSaleOrder.cfgTblPaymentTerm)) {
							
								alert(" Please select Payment Terms.");
								return;
							
						}
						

						if (isEmpty($scope.lstSODetails)
								|| ($scope.lstSODetails.length <= 0)) {
							alert(" There is no Product to Save.");
							return;
						}
debugger;
						var selectedList = [];
						// var object = JSON.stringify($scope.lstSODetails);
						

						// $scope.newSlsTblSaleOrder.hrTblEmployee =
						// $scope.newSlsTblSaleOrder.cfgTblDealer.hrTblEmployee;

						
						 for (i = 0; i < $scope.lstSODetails.length; i++) {
						  
						 if(!($scope.lstSODetails[i].numQuantity >0)) {
						  alert("Please enter Valid Quantity");
						 
						  return; break; }
						  
					
						  
						  }
						 
						 

					for (let i = 0; i < $scope.lstScheduleDetails.length; i++) {

							if (!($scope.lstScheduleDetails[i].numQuantity > 0)) {
								alert("Please enter Valid Quantity in Schedule");
								return;
								break;
							}

						}
						 
						 var total_sch_qty = 0;

							for (let i = 0; i < $scope.lstScheduleDetails.length; i++) {

								$scope.lstScheduleDetails[i].dteDate = $scope.lstScheduleDetails[i].dteDate.split("-").reverse().join("-");
								}
						 
					
						 
						 
						 
						var Qty=0;
						 
						 $('tbody tr td input[type="checkbox"]')
							.each(
									function() {
										// if($(this).prop('checked')==true)
										{
											var i = $(this).attr('id');
											$scope.lstSODetails[i].numItemPrice = $scope.lstSODetails[i].cfgTblProduct.numSalePrice;
											$scope.lstSODetails[i].numUnitWt = $scope.lstSODetails[i].cfgTblProduct.numProductWeight;
											selectedList
													.push($scope.lstSODetails[i]);
											Qty=$scope.lstSODetails[i].numQuantity;
										}
									});
						 
						 if($scope.lstScheduleDetails.length > 0)
							 {
								 if(  $scope.total_sch_qty == Qty)
									 {
									
									 }
								 else
									 {
									 alert("Schedule Quantity Does not match with the Order Quantity");
									 return;
									 }
							 }
						
							
						$(".se-pre-con").fadeIn("slow");
						$('#addErrorAlert').hide();
						$('#successAlert').hide();
						debugger;

						// $scope.newSlsTblSaleOrder.slsTblSoDetails=
						// $scope.lstSODetails
						$scope.newSlsTblSaleOrder.slsTblSoDetails = selectedList;

//						$scope.newSlsTblSaleOrder.dteDate = $("#date").val();
						
						
//						$scope.newSlsTblSaleOrder.dteDate =stringToDate("9-17-2014","mm-dd-yyyy","-")
						$scope.newSlsTblSaleOrder.dteDate =$("#date").val().split("-").reverse().join("-");;//stringToDate($("#date").val(),"dd-mm-yyyy","-")
						// var object = $scope.newSlsTblSoDetail;
						var object = $scope.newSlsTblSaleOrder;

						// var object = $scope.lstSODetails;

						$
								.ajax({
									url : '/' + project_name
											+ '/addNewSaleOrder',
									type : 'post',
									'headers' : {
										'Content-Type' : 'application/json'
									},
									dataType : 'json',
									success : function(data) {
										if (data == 'Failure') {
											$('#errMsgText').html(
													"Unable to add Sale Order");
											$('#addErrorAlert').show();
										} else if (data == 'Success') {
											$('#successMsgText')
													.html(
															"Sale Order added successfully");
											$('#successAlert').show();
											$scope.newSlsTblSaleOrder = {};
											$scope.newSlsTblSoDetail = {};
											$scope.lstSODetails = [];
											$scope.total_qty = 0;
											$scope.total_units = 0;
											$scope.total_wt = 0;
											$scope.total_amount = 0;
											$scope.total_pieces = 0;
											$scope.lstScheduleDetails = [];
											$scope.init();
										}
										 else if (data == '10M') {
												$('#errMsgText').html("Customer is unregistered in FBR, Monthly Sales limit has been exceeded more than 10M.");
														
												$('#addErrorAlert').show();
												$scope.newSlsTblSaleOrder = {};
												$scope.newSlsTblSoDetail = {};
												$scope.lstSODetails = [];
												$scope.total_qty = 0;
												$scope.total_units = 0;
												$scope.total_wt = 0;
												$scope.total_amount = 0;
												$scope.total_pieces = 0;
												$scope.lstScheduleDetails = [];
												$scope.init();
											} 
										 else if (data == '90D') {
												$('#errMsgText').html("Customer's invoice is still unpaid from more than 90 days. Kindly contact with your RSM.");
												$('#addErrorAlert').show();
												$scope.newSlsTblSaleOrder = {};
												$scope.newSlsTblSoDetail = {};
												$scope.lstSODetails = [];
												$scope.total_qty = 0;
												$scope.total_units = 0;
												$scope.total_wt = 0;
												$scope.total_amount = 0;
												$scope.total_pieces = 0;
												$scope.lstScheduleDetails = [];
												$scope.init();
											} 
										 else if (data == 'NTN') {
												$('#errMsgText').html("Customer NTN/CNIC Number is missing, Please Provide NTN/CNIC Number to ICL Sales Department.");
														
												$('#addErrorAlert').show();
												$scope.newSlsTblSaleOrder = {};
												$scope.newSlsTblSoDetail = {};
												$scope.lstSODetails = [];
												$scope.total_qty = 0;
												$scope.total_units = 0;
												$scope.total_wt = 0;
												$scope.total_amount = 0;
												$scope.total_pieces = 0;
												$scope.lstScheduleDetails = [];
												$scope.init();
											} 
										else if (data == 'error') {
											$('#errMsgText')
													.html(
															"Unable to add Sale Order \n due to duplication of  Product");
											$('#addErrorAlert').show();
										}
									},
									'error' : function(xhr, d, err) {
										$('#errMsgText')
												.html(
														"Unable to add Sale Order \n Internal Error");
										$('#addErrorAlert').show();
									},
									complete : function() {
										$(".se-pre-con").fadeOut("slow");
										$('#addCloseButton').click();
									},
									data : angular.toJson(object)
								// data: object
								});
					};

					$scope.updateSaleOrder = function() {
						$(".se-pre-con").fadeIn("slow");
						$('#addErrorAlert').hide();
						$('#successAlert').hide();
						// debugger;
						$scope.editSaleOrder.slsTblSoDetails = $scope.lstSODetails
						// var object = $scope.newSlsTblSoDetail;
						var object = $scope.editSaleOrder;

						$
								.ajax({
									url : '/' + project_name
											+ '/updateSaleOrder',
									type : 'post',
									'headers' : {
										'Content-Type' : 'application/json'
									},
									dataType : 'json',
									success : function(data) {
										if (data == 'Failure') {
											$('#errMsgText')
													.html(
															"Unable to edit Sale Order");
											$('#addErrorAlert').show();
										} else if (data == 'Success') {
											$('#successMsgText')
													.html(
															"Sale Order edit successfully");
											$('#successAlert').show();
											$scope.init();
										}

									},
									'error' : function(xhr, d, err) {
										// alert();
										$('#errMsgText')
												.html(
														"Unable to edit Sale Order \n Internal Error");
										$('#addErrorAlert').show();
									},
									complete : function() {
										$(".se-pre-con").fadeOut("slow");
										$('#editCloseButton').click();
									},
									data : angular.toJson(object)
								});
					};

					$scope.populateEditDialog = function(txtProductCodeforEdit) {
						// alert(txtProductCodeforEdit);
						debugger;
						$scope.editSaleOrder = $filter("filter")($scope.lstSO,
								{
									serSaleOrderId : txtProductCodeforEdit
								})[0];

						$scope
								.searchSaleOrderDetail($scope.editSaleOrder.serSaleOrderId)
					};

					$scope.searchSaleOrderDetail = function(id) {

						// $(".se-pre-con").fadeIn("slow");
						debugger;

						$
								.ajax({
									url : '/' + project_name
											+ '/searchSaleOrderDetail',
									type : 'post',
									'headers' : {
										'Content-Type' : 'application/json'
									},
									dataType : 'json',
									success : function(data) {
										$scope.lstSODetails = data;
										// alert("---lst");
										// $scope.populateDataTable(data);
										if (data == 'Failure') {
											$('#errMsgText')
													.html(
															"Unable to remove Sale Order");
											$('#addErrorAlert').show();
										} else if (data == 'Success') {

											/*
											 * $('#successMsgText').html("Product
											 * Component removed successfully");
											 * $('#successAlert').show();
											 * $scope.showRecipe();
											 */
											// $scope.newCfgProductSetup = {};
											// $scope.init();
										}
									},
									'error' : function(xhr, d, err) {
										$('#errMsgText').html(
												"Sale Ordert to remove error");
										$('#addErrorAlert').show();
									},
									complete : function() {
										$(".se-pre-con").fadeOut("slow");
									},
									data : JSON.stringify(id)
								});
					};

					$scope.deleteProductComponent = function() {

						$(".se-pre-con").fadeIn("slow");
						debugger;
						var ids = "";
						$('tbody tr td input[type="checkbox"]').each(
								function() {
									//			if($(this).prop('checked')==true)
									{
										ids += $(this).prop('id') + ",";
									}
								});
						$.ajax({
							url : '/' + project_name
									+ '/deleteProductComponent',
							type : 'post',
							'headers' : {
								'Content-Type' : 'application/json'
							},
							dataType : 'json',
							success : function(data) {
								if (data == 'Failure') {
									$('#errMsgText').html(
											"Unable to remove Sale Order ");
									$('#addErrorAlert').show();
								} else if (data == 'Success') {
									$('#successMsgText').html(
											"Sale Order removed successfully");
									$('#successAlert').show();
									$scope.showRecipe();
									//            		$scope.newCfgProductSetup = {};
									//            		$scope.init();
								}
							},
							'error' : function(xhr, d, err) {
								$('#errMsgText').html(
										"Product Component to remove error");
								$('#addErrorAlert').show();
							},
							complete : function() {
								$(".se-pre-con").fadeOut("slow");
							},
							data : JSON.stringify(ids)
						});
					};

					function isEmpty(val) {
						return (val === undefined || val == null || val.length <= 0) ? true
								: false;
					}
					$scope.selectUnselectAll = function() {
						$('tbody tr td input[type="checkbox"]').each(
								function() {
									$(this).prop('checked', $scope.checked);
								});

						$scope.calculate();
					};

					// Populate Data Table
					$scope.populateDataTable = function(dataTable) {
						var table = $('#data-table').DataTable();
						table.clear();
						$
								.each(
										dataTable,
										function(index, so) {
											var editDeleteColumn = '<div class="dropdown" id="dropdown'
													+ so.serSaleOrderId
													+ '">'
													+ '<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('
													+ so.serSaleOrderId
													+ ');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'
													+ '<ul class="dropdown-menu">'
													+ '<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('
													+ so.serSaleOrderId
													+ ');angular.element(this).scope().$apply();" data-target="#editSaleOrderForm">Edit Sale Order</a></li>'
													+ '</ul>';
											/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
											 */// debugger;
											//  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+so.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'

											table.row
													.add(
															[
																	editDeleteColumn,
																	++index,
																	so.txtSaleOrderNo,
																	isEmpty(so.cfgTblCustomer) ? ""
																			: so.cfgTblCustomer.txtCustomerName,
																	$filter(
																			'date')
																			(
																					new Date(
																							so.dteDate),
																					'dd-MM-yyyy'),
																	(isEmpty(so.txtStatus) || so.txtStatus == 'Pending') ? "Pending"
																			: "Approved" ])
													.draw();
										});
					};

					$scope.populateDataTable2 = function() {
						//		alert("----ava");
					}
					
					
					function stringToDate(_date,_format,_delimiter)
					{
					            var formatLowerCase=_format.toLowerCase();
					            var formatItems=formatLowerCase.split(_delimiter);
					            var dateItems=_date.split(_delimiter);
					            var monthIndex=formatItems.indexOf("mm");
					            var dayIndex=formatItems.indexOf("dd");
					            var yearIndex=formatItems.indexOf("yyyy");
					            var month=parseInt(dateItems[monthIndex]);
					            month-=1;
					            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
					            return formatedDate;
					}

				}).directive('fileModel', [ '$parse', function($parse) {
			return {
				restrict : 'A',
				link : function(scope, element, attrs) {
					var model = $parse(attrs.fileModel);
					var modelSetter = model.assign;

					element.bind('change', function() {
						scope.$apply(function() {
							modelSetter(scope, element[0].files[0]);
						});
					});
				}
			};
		} ]);