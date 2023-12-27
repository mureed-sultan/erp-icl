
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script> -->
<head>
<title>Path Finder</title>
<script>
$(document).ready(function() {
    $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'print',
                customize: function ( win ) {
                    $(win.document.body)
                        .css( 'font-size', '10pt' )
                        .prepend(
                            '<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />'
                        );
 
                    $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
                }
            }
        ]
    } );
} );
	/* $(document).ready(function() {

		
		$("#datepicker").datepicker({
			dateFormat : "dd-mm-yy"
		});
	}); */
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
									
									<div class="form-group row">
														<label for="dateFrom"
															class="control-label  col-md-2">Date
															From: <span class="required">*</span>
														</label>
														<div class="col-md-4">
															<input id="dateFrom" name="dateFrom"
																ng-model="searchDTO.dte_date_from" type="text"
																class="form-control input-md datepicker requiredField">
														</div>

														<label for="dateTo"
															class="control-label  col-md-2">Date To:
															<span class="required">*</span>
														</label>
														<div class="col-md-4 ">
															<input id="dateTo" ng-model="searchDTO.dte_date_to"
																required name="dateTo" type="text"
																class="form-control datepicker requiredField">
														</div>
								    </div>
								    
								    <div ng-if="isDealer==3 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="Dealer" ng-change="showCustomers()"
													ng-options="customer as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in lstDealer | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="newSlsTblSaleOrder.cfgTblDealer">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>


											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="packing" ng-change="OnCustomerSelect()"
													ng-options="customer as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in dealerCustomers | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="newSlsTblSaleOrder.cfgTblCustomer">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>

										</div>


										<div ng-if="isDealer==2 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>

											<div class="col-md-4">
												<input id="txtDealer" required="required"
													ng-model="newSlsTblSaleOrder.cfgTblDealer.txtCustomerName"
													name="txtSaleOrderNo" type="text"
													class="form-control input-md requiredField">
											</div>




											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<input id="txtCustomer" required="required"
													ng-model="newSlsTblSaleOrder.cfgTblCustomer.txtCustomerName"
													name="txtSaleOrderNo" type="text"
													class="form-control input-md requiredField">
											</div>



										</div>


										<div ng-if="isDealer==1 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<input id="txtDealer" required="required"
													ng-model="newSlsTblSaleOrder.cfgTblDealer.txtCustomerName"
													name="txtSaleOrderNo" type="text"
													class="form-control input-md requiredField">
											</div>




											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="packing" ng-change="OnCustomerSelect()"
													ng-options="customer as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in dealerCustomers | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="newSlsTblSaleOrder.cfgTblCustomer">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>

										</div>

										<div ng-if="isDealer==4 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="Dealer" ng-change="showCustomers()"
													ng-options="customer as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in lstDealrsGroup | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="newSlsTblSaleOrder.cfgTblDealer">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>


											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="packing" ng-change="OnCustomerSelect()"
													ng-options="customer as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in dealerCustomers | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="newSlsTblSaleOrder.cfgTblCustomer">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>



										</div>
										<div class="form-group row">
											<label class="col-md-2 control-label" for="textinput">
												Product: </label>
											<div class="col-md-4">
												<select class="form-control input-md " id="products"
													ng-options="product.serProductId as product.txtProductName for product in lstProduct | orderBy:'txtProductName'"
													data-error="Please select Product" data-live-search="true"
													ng-model="ReportDTO.ser_product_id">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
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
											
											
																<!-- <button type="button" ng-click="print()" class="btn btn-primary">Search333
																	</button> -->
																	
																<button type="button" ng-click="searchSaleOrder()" class="btn btn-primary">Search
																	</button> 
																	<button type="button" ng-click="getSaleDetailReport()" class="btn btn-primary">Print
																	</button> 
																	
																	
																	
																	<a  id="downloadLink" type="button" 
																	 class="btn btn-success" ng-click="getSaleDetailReportExcel()">Download CSV File</a>
																
															
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
									
													<th class="column-title">#</th>
												
													<th class="column-title">Order No.</th>
													<th class="column-title">Dealer</th>
													<th class="column-title">Customer</th>
													
													
													<th class="column-title">Product</th> 
												<th class="column-title">Quantity</th>
												 <th class="column-title"> Price</th> 
												
												<th class="column-title">Approval Date / Time</th>
													
												
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