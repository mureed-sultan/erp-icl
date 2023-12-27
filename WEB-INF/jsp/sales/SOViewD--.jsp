
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script> -->
<head>
<title>Path Finder</title>
<script>
	$(document).ready(function() {
		$("#datepicker").datepicker({
			dateFormat : "dd-mm-yy"
		});
	});
</script>
</head>
<body>
	<div ng-init="init()"></div>
		<div >
			<div class="row row-offcanvas row-offcanvas-left">
			<div class="right_col" role="main">
						<div class="">

						
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									
									<div class="alert alert-danger alert-dismissible"
										style="display: none;" role="alert" id="addErrorAlert">
										<button type="button" class="close" data-dismiss="alert">×</button>
										<strong>Error: </strong>&nbsp;<span id="errMsgText"></span>
									</div>
									<div class="alert alert-success alert-dismissible"
										style="display: none;" role="alert" id="successAlert">
										<button type="button" class="close" data-dismiss="alert">×</button>
										<strong>Success: </strong>&nbsp;<span id="successMsgText"></span>
									</div>
									
									<div class="form-group">
														<label for="dateFrom"
															class="control-label col-sm-2 col-md-2">Date
															From: <span class="required">*</span>
														</label>
														<div class="col-md-2">
															<input id="dateFrom" name="dateFrom"
																ng-model="searchDTO.dte_date_from" type="text"
																class="form-control input-md datepicker requiredField">
														</div>

														<label for="dateTo"
															class="control-label col-sm-2 col-md-2">Date To:
															<span class="required">*</span>
														</label>
														<div class="col-md-2 form-group">
															<input id="dateTo" ng-model="searchDTO.dte_date_to"
																required name="dateTo" type="text"
																class="form-control datepicker requiredField">
														</div>
								    </div>
								    <div class="clear"> </div>
									<div>
										<div class="form-group">
										<!-- 	<button id="addNewEntry" data-loading-text="Processing..."
												class="btn btn-success" data-toggle="modal"
												data-target="#addSaleOrderForm">
												<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Add New
												Entry
											</button> -->
											
											
																<button type="button" ng-click="searchSaleOrder()" class="btn btn-primary">Search
																	</button>
																
															
											<!-- <button id="removeStores" data-loading-text="Processing..."
												data-toggle="modal" data-target="#confirmModel"
												class="btn btn-danger">
												<i class="glyphicon glyphicon-minus-sign"></i>&nbsp;Delete
												Entry
											</button> -->
										</div>
									</div>
									
<div class="table-container" id="table-resp">
									<div class="table-responsive">
										<!-- <table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
														
														
													
													
													<th class="column-title">Show Details</th>
													
														
														
													<th class="column-title">#</th>
													<th class="column-title">SaleOrder No.</th>
													<th class="column-title">Date</th>
													<th class="column-title">Dealer</th>
													<th class="column-title">Customer</th>
													<th class="column-title">City</th>
													<th class="column-title">Order No.</th>
													<th class="column-title">Order Time</th>
													<th class="column-title">Product</th> 
												<th class="column-title">Quantity</th>
												<th class="column-title"> RSM Date</th>
												<th class="column-title">Final Approval Date</th>
													
													<th class="column-title">Order Status </th>
													<th class="column-title">Approval Time </th>
													<th class="column-title">Delivery No.</th>
													<th class="column-title">Quantity</th>
													<th class="column-title">Delivery Status</th>
													<th class="column-title">Delivery Date / Time </th>
													<th class="column-title">Invoice No.</th>
													<th class="column-title">Invoice Status</th>
													<th class="column-title">Invoice Date </th>
													
													<th class="column-title">Show Details</th> 
												</tr>
											</thead>

											<tbody>
												<tr>
												    <td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>

													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>

												</tr>
											</tbody>
										</table> -->
										
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<!-- <th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th> -->
														
														
													
													<!--
													<th class="column-title">Show Details</th>
													 -->
														
														
													<th class="column-title">#</th>
													<!-- <th class="column-title">SaleOrder No.</th> -->
													<th class="column-title">Date</th>
													<th class="column-title">Dealer</th>
													<th class="column-title">Customer</th>
													<!-- <th class="column-title">City</th> -->
													<th class="column-title">Order No.</th>
													<th class="column-title">Order Time</th>
													<th class="column-title">Product</th> 
												<th class="column-title">Quantity</th>
												<!-- <th class="column-title"> RSM Date</th>
												<th class="column-title">Final Approval Date</th -->>
													
													<th class="column-title">Order Status </th>
													<th class="column-title">Approval Time </th>
													<th class="column-title">Delivery No.</th>
													<th class="column-title">Delivery Date</th>
													<th class="column-title">Quantity</th>
													<th class="column-title">Delivery Status</th>
													<th class="column-title">Delivery Date / Time </th>
													<th class="column-title">Invoice No.</th>
													<th class="column-title">Invoice Date</th>
													<th class="column-title">Invoice Quantity</th>
													<th class="column-title">Invoice Status</th>
												<!-- 	<th class="column-title">Invoice Status</th>
													<th class="column-title">Invoice Date </th> -->
													
													<!-- <th class="column-title">Show Details</th>  -->
												</tr>
											</thead>

											<tbody>
											<tr>
											       <td>1</td>
												  <td>18-12-2020</td>
													<td>Haroon chemicals fsd (Credit)</td>
													<td></td>
													<td>1000056602</td>
													<td>06:35:43</td>
													<td>CAUSTIC SODA FLAKES</td>
													<td>10</td>
													<td>APPROVED</td>
													<td>13:22:51</td>
													<td>DC-20034560</td>
													<td>18-12-2020</td>
													<td>3</td>
													<td>06:35:43</td>
													<td>Delivered</td>
													<td>INV-123450</td>
													<td>20-12-2020</td>
													<td>3</td>
													<td>Pending</td>
													

												</tr>
												<tr>
											       <td>1</td>
												  <td>18-12-2020</td>
													<td>Haroon chemicals fsd (Credit)</td>
													<td></td>
													<td>1000056602</td>
													<td>06:35:43</td>
													<td>CAUSTIC SODA FLAKES</td>
													<td>10</td>
													<td>APPROVED</td>
													<td>13:22:51</td>
													<td>DC-20034567</td>
													<td>19-12-2020</td>
													<td>3</td>
													<td>06:35:43</td>
													<td>Delivered</td>
													<td>INV-123456</td>
													<td>20-12-2020</td>
													<td>3</td>
													<td>Approved</td>
													

												</tr>
												<tr>
											       <td>1</td>
												  <td>18-12-2020</td>
													<td>Haroon chemicals fsd (Credit)</td>
													<td></td>
													<td>1000056602</td>
													<td>06:35:43</td>
													<td>CAUSTIC SODA FLAKES</td>
													<td>10</td>
													<td>APPROVED</td>
													<td>13:22:51</td>
													<td>DC-200345689</td>
													<td>18-12-2020</td>
													<td>3</td>
													<td>06:35:43</td>
													<td><label class="badge-pending"   data-toggle="modal" angular.element(this).scope().$apply();" >DELETED  </Label></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													

												</tr>
												<tr>
											       <td>1</td>
												  <td>18-12-2020</td>
													<td>Haroon chemicals fsd (Credit)</td>
													<td></td>
													<td>1000056642</td>
													<td>06:35:43</td>
													<td>CAUSTIC SODA FLAKES</td>
													<td>10</td>
													<td>APPROVED</td>
													<td>13:22:51</td>
													<td>DC-20034569</td>
													<td>21-12-2020</td>
													<td>4</td>
													<td>03:35:43</td>
													<td>Delivered</td>
													<td>INV-123457</td>
													<td>22-12-2020</td>
													<td>4</td>
													<td>Pending</td>
													

												</tr>
												<tr>
											       <td>1</td>
												  <td>18-12-2020</td>
													<td>Haroon chemicals fsd (Credit)</td>
													<td></td>
													<td>1000056662</td>
													<td>06:35:43</td>
													<td>CAUSTIC SODA FLAKES</td>
													<td>10</td>
													<td>APPROVED</td>
													<td>13:22:51</td>
													<td>DC-20034599</td>
													<td>21-12-2020</td>
													<td>3</td>
													<td>03:35:43</td>
													<td><label class="badge-pending"   data-toggle="modal" angular.element(this).scope().$apply();" >CANCEL  </Label></td>
													<td>INV-123497</td>
													<td>23-12-2020</td>
													<td>3</td>
													<td><label class="badge-pending"   data-toggle="modal" angular.element(this).scope().$apply();" >CANCEL  </Label></td>
													

												</tr>
												<tr>
												   <!--  <td></td>
													<td></td>
													<td></td> -->
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>

													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>

												</tr>
											</tbody>
										</table>
									</div>
									</div>
								</div>
							</div>
						</div>
					</div>


				</div>
			</div>
			<!-- /page content -->

			<!-- /padding -->
	</div>
	<%-- <%@include file="../common/footer.jsp"%> --%>
	<%-- <script src="<c:url value="/resources/js/adcContract/adc_charges.js"/>"></script> --%>
	
</body>

</html>