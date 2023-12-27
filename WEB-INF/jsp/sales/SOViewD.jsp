
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
										<button type="button" class="close" data-dismiss="alert">�</button>
										<strong>Error: </strong>&nbsp;<span id="errMsgText"></span>
									</div>
									<div class="alert alert-success alert-dismissible"
										style="display: none;" role="alert" id="successAlert">
										<button type="button" class="close" data-dismiss="alert">�</button>
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
										<button id="removeStores" ng-click="ApproveSaleOrder()"
											class="btn btn-primary">Approve Sale Order
											 
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
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<!-- <th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th> -->
														
														
													
													<!--
													<th class="column-title">Show Details</th>
													 -->
														
														<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<!-- <th class="column-title">#</th> -->
													<!-- <th class="column-title">SaleOrder No.</th> -->
													<th class="column-title">Date</th>
													<th class="column-title">Dealer</th>
													<th class="column-title">Dealer Balance</th>
													<th class="column-title">Customer</th>
													<th class="column-title">Customer Balance</th>
													<th class="column-title">Order No.</th>
													<!-- <th class="column-title">Order Time</th> -->
													<th class="column-title">Product</th> 
												<th class="column-title">Quantity</th>
												<th class="column-title">Net Amount</th>
												<!-- <th class="column-title"> RSM Date</th>
												<th class="column-title">Final Approval Date</th -->
													
													<!-- <th class="column-title">Order Status </th>
													<th class="column-title">Approval Time </th>
													<th class="column-title">Delivery No.</th>
													<th class="column-title">Quantity</th>
													<th class="column-title">Delivery Status</th>
													<th class="column-title">Delivery Date / Time </th>
													<th class="column-title">Invoice No.</th> -->
												<!-- 	<th class="column-title">Invoice Status</th>
													<th class="column-title">Invoice Date </th> -->
													<!-- <th class="column-title">Show Details</th>   -->
												</tr>
											</thead>

											<tbody>
												<tr>
												   <!--  <td></td>
													<td></td>-->
													<!-- <td></td> 
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>-->
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
						
						
						
						
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									
									
									
								<!-- 	<div class="form-group">
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
								    </div> -->
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
										<button id="removeStores" ng-click="ApproveDeals()"
											class="btn btn-primary">Approve Contract
											
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
										<table ng-table="user-table2" id="data-table2"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<!-- <th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th> -->
														
														
													
													<!--
													<th class="column-title">Show Details</th>
													 -->
														
														
													<th><input type="checkbox"
														ng-change="selectUnselectAll2()" ng-model="checked2" /></th>
													<!-- <th class="column-title">SaleOrder No.</th> -->
													<th class="column-title">Date</th>
													<th class="column-title">Start Date</th>
													<th class="column-title">End Date</th>
													<th class="column-title">Contract No.</th>
												
												<th class="column-title">Contract Status </th>
												<th class="column-title">SAP NO</th>
												
													
													
													<!-- <th class="column-title">Delivery</th>
													<th class="column-title">Invoice</th> -->
													
													<th class="column-title">Product</th> 
													<th class="column-title">Quantity</th> 
													<th class="column-title">*</th> 
												</tr>
											</thead>

											<tbody2>
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
												</tr>
											</tbody2>
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
			
			<!-- 	<div class="modal fade" id="confirmModel" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;">&times;</button>
					<modalTitle>Are you sure you want to Approve these Orders</modalTitle>
				</div>
				<div class="modal-footer">
					<div class="actionButton"
						style="margin: 10px 20px 0 0; text-align: right; background: none">
						<button style="background: #FDCA01; color: #000" type="button"
							class="" data-dismiss="modal" aria-label="Close" id="noButton">
							<i class="fa"></i><span>No</span>
						</button>
						<button style="background: #FDCA01; color: #000"
							ng-click="deleteOrder()" type="button" class=""
							data-dismiss="modal" aria-label="Close" id="yesButton">
							<i class="fa"></i>&nbsp;<span>Yes</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div> -->
	</div>
	<%-- <%@include file="../common/footer.jsp"%> --%>
	<%-- <script src="<c:url value="/resources/js/adcContract/adc_charges.js"/>"></script> --%>
	
	

	
</body>

</html>