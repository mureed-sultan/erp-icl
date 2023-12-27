<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script> -->

<head>
	<title>Path Finder</title>
	<script>
		$(document).ready(function () {
			$("#datepicker").datepicker({
				dateFormat: "dd-mm-yy"
			});
		});
	</script>
</head>

<body>
	<div ng-init="init()"></div>
	<div>
		<div class="alert alert-danger alert-dismissible" style="display: none;" role="alert" id="addErrorAlert">
			<button type="button" class="close" data-dismiss="alert">�</button>
			<strong>Error: </strong>&nbsp;<span id="errMsgText"></span>
		</div>
		<div class="alert alert-success alert-dismissible" style="display: none;" role="alert" id="successAlert">
			<button type="button" class="close" data-dismiss="alert">�</button>
			<strong>Success: </strong>&nbsp;<span id="successMsgText"></span>
		</div>

		<progressbar value="data.progress"></progressbar>
		<progressbar value="50"></progressbar>

		<div class="row row-offcanvas row-offcanvas-left">
			<div class="right_col" role="main">
				<form id="addGroupForm" ng-submit="updateSaleOrder()" class="form-horizontal">
					<fieldset>

						<div class="form-group row">
							<!-- <label class="col-md-2 control-label" for="productId">Date:<span class="required">*</span>
							</label>

							<div class="col-md-4">
								<input id="date" ng-model="editSaleOrder.dteDate | date:'dd-MM-yyyy'" name="date"
									readonly type="text" class="form-control input-md datepicker requiredField">
							</div> -->


							<label class="col-md-2 control-label" for="textinput">Order
								No.:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtProductName" required="required" ng-minlength="1" ng-maxlength="50"
									ng-model="editSaleOrder.txtSapNo" name="itemName1" type="text" readonly
									class="form-control input-md requiredField">
							</div>
						</div>



						<div ng-if="isDealer==3 ? true:false" class="form-group row">

							<label class="col-md-2 control-label" for="productId">Dealer:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtDealerName" ng-model="editSaleOrder.cfgTblDealer.txtCustomerName" name="txtDealerName" type="text"
								readonly class="form-control input-md requiredField">
							</div>
							
							<label class="col-md-2 control-label" for="productId">Customer:<span
									class="required">*</span>
							</label>
							<div class="col-md-4"> 
								<input id="txtCustomer" required="required" readonly
									ng-model="editSaleOrder.cfgTblCustomer.txtCustomerName" name="txtSaleOrderNo"
									type="text" class="form-control input-md requiredField">
							</div>

						</div>


						<div ng-if="isDealer==2 ? true:false" class="form-group row">

							<label class="col-md-2 control-label" for="productId">Dealer:<span class="required">*</span>
							</label>

							<div class="col-md-4">
								<input id="txtDealer" required="required"
									ng-model="editSaleOrder.cfgTblDealer.txtCustomerName" name="txtSaleOrderNo"
									type="text" class="form-control input-md requiredField">
							</div>




							<label class="col-md-2 control-label" for="productId">Customer:<span
									class="required">*</span>
							</label>
							<div class="col-md-4"> 
								<input id="txtCustomer" required="required" readonly
									ng-model="editSaleOrder.cfgTblCustomer.txtCustomerName" name="txtSaleOrderNo"
									type="text" class="form-control input-md requiredField">
							</div>



						</div>


						<div ng-if="isDealer==1 ? true:false" class="form-group row">

							<label class="col-md-2 control-label" for="productId">Dealer:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtDealer" required="required" readonly
									ng-model="editSaleOrder.cfgTblDealer.txtCustomerName" name="txtSaleOrderNo"
									type="text" class="form-control input-md requiredField">
							</div>




							<label class="col-md-2 control-label" for="productId">Customer:<span
									class="required">*</span>
							</label>
							<div class="col-md-4"> 
								<input id="txtCustomer" required="required" readonly
									ng-model="editSaleOrder.cfgTblCustomer.txtCustomerName" name="txtSaleOrderNo"
									type="text" class="form-control input-md requiredField">
							</div>

						</div>

						<div ng-if="isDealer==4 ? true:false" class="form-group row">

							<label class="col-md-2 control-label" for="productId">Dealer:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtDealerName" ng-model="editSaleOrder.cfgTblDealer.txtCustomerName" name="txtDealerName" type="text"
								readonly class="form-control input-md requiredField">
							</div>


							<label class="col-md-2 control-label" for="productId">Customer:<span
									class="required">*</span>
							</label>
							<div class="col-md-4"> 
								<input id="txtCustomer" required="required" readonly
									ng-model="editSaleOrder.cfgTblCustomer.txtCustomerName" name="txtSaleOrderNo"
									type="text" class="form-control input-md requiredField">
							</div>
						</div>

						<!-- <div class="form-group row">
							<label class="col-md-2 control-label" for="productId">PO No.:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtProductName" ng-model="editSaleOrder.txtPONo" name="itemName1" type="text"
								readonly class="form-control input-md requiredField">
							</div>
							<label class="col-md-2 control-label" for="productId">Payment
								Terms:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtProductName" readonly
									ng-model="editSaleOrder.cfgTblPaymentTerm.txtCode+'-'+editSaleOrder.cfgTblPaymentTerm.txtName"
									name="itemName1" type="text" class="form-control input-md requiredField">
							</div>
						</div> -->
						<div class="form-group row">
							<label class="col-md-2 control-label" for="productId">Product:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtProductName" ng-model="editSaleOrder.cfgTblProduct.txtProductName" name="itemName1" type="text"
								readonly class="form-control input-md requiredField">
							</div>
							<label class="col-md-2 control-label" for="productId">Quantity
								:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtProductName" readonly
									ng-model="editSaleOrder.numQuantity"
									name="itemName1" type="text" class="form-control input-md requiredField">
							</div>
						</div>

	
						

						
						<div class="col-md-8 table-responsive">
							<!-- <button type="button" class=" btn btn-primary" type="submit" id="load"
								ng-click="refreshProductComponent()">DC Details</button> -->
							<table ng-table="user-table-edit" id="data-table-edit"
								class="table table-striped jambo_table bulk_action">
								<thead>
									<tr class="headings">
										<!-- <th><input type="checkbox"
																ng-change="selectUnselectAll()" ng-model="checked" /></th> -->


										<th class="column-title">DC No.</th>

										<th class="column-title">Date</th>
										<!-- 	<th class="column-title">Date</th> -->

										 <th class="column-title">Quantity</th>
										<!--<th class="column-title">Tare Weight</th>
										<th class="column-title">Net Weight</th>
										<th class="column-title">Gross Weight</th> -->
										<th class="column-title">Status</th>
										<th class="column-title">Invoice No.</th>
										<th class="column-title">Invoice Date</th>
										<!-- <th class="column-title">Invoice Status</th> -->
<!-- 
										<th class="column-title">*</th> -->
									</tr>
								</thead>

								<tbody>
									<tr ng-repeat="component in  lstSODetails">
<!-- <td *ngIf= component.txtStatus=== 'Completed' > <a   ng-click="print(component)" class="link-dark" role="button">
{{component.txtIssueCode}}</a> </td>-->
<td> 
<div ng-if="component.txtStatus=== 'Completed'? true: false" "> 
         <a   ng-click="print(component)" style="color: blue;  background-color: transparent;  text-decoration: underline;cursor: pointer;" role="button">{{component.txtIssueCode}}</a>
      </div>
      <div ng-if="component.txtStatus=== 'Completed'? false :true"> {{component.txtIssueCode}}
      </div>
      </td>
										
							<td>{{component.dteDate | date }}</td>
							
							
					
										<td>{{component.txtStatus=== 'Completed' ?( component.numQuantity | number: 3 ) :''}}</td>
										<td>{{component.txtStatus=== 'Completed' ? ('Dispatched'):
											component.txtStatus=== 'Created' ?  ('In Process'):component.txtStatus}}</td>
										<!-- <td>{{component.txtStatus=== 'Completed' ? ('Dispatch'):
											component.txtStatus=== 'Created' ? : ('InProcess'):component.txtStatus}}</td> -->
										<!-- <td>{{component.txtINVNo}}</td> -->
										
										<td><div ng-if="component.txtINVNo === ''? false : true"> 
											<a   ng-click="printInvoice(component)" class="link-dark" style="color: blue;  background-color: transparent;  text-decoration: underline;cursor: pointer;" role="button">{{component.txtINVNo}}</a>
											</div>
										</td>
										<td>{{component.dteInvoiceDate | date : format : timezone}}</td>
										<!-- <td>{{component.txtInvStatus}}</td> -->
										<!-- <td><input type="checkbox" ng-change="calculate()" ng-model="checked"
																id="{{$index}}" /></td> -->
										<!-- <td>{{component.cfgTblProduct.txtProductCode}}</td>
										<td>{{component.cfgTblProduct.txtProductName}}</td> -->

										<!-- <td>{{component.dteScheduleDate| date:'dd-MM-yyyy'}}</td> -->

									<!-- 	<td><input ng-model="component.numQuantity" type="text" ng-keyup="calculate()"
												class="form-control input-md table-field"></td>
										<td><button type="button" ng-click="schedule(component)" data-toggle="modal"
												data-target="#scheduleForm" class="btn btn-sm btn-success">Show Schedule
											</button></td> -->




									</tr>
								</tbody>
						<!-- 		<tbody>


									<td></td>
									<td style="color: #000000; font-size: 18px;">Total</td>
									<td style="color: #000000; font-size: 18px;">{{total_qty | number}}</td>

									<td></td>




								</tbody> -->
							</table>
						</div>
						
						<div class="col-md-4 table-responsive">
							<!-- <button type="button" class="col-md-4 btn btn-primary" type="submit" id="load"
								ng-click="refreshProductComponent()">Schedule Details</button> -->
							<table ng-table="user-table-edit" id="data-table-edit"
								class="table table-striped jambo_table bulk_action">
								<thead>
									<tr class="headings">
										<!-- <th><input type="checkbox"
																ng-change="selectUnselectAll()" ng-model="checked" /></th> -->


										

										<th class="column-title">Schedule Date</th>
										<!-- 	<th class="column-title">Date</th> -->

										<th class="column-title">Schedule Quantity</th>
										<!-- 
										<th class="column-title">*</th> -->
									</tr>
								</thead>

								<tbody>
									<tr ng-repeat="component in  lstScheduleDetails">
										<td>{{component.dteDate | date : format : timezone}}</td>
										<td>{{component.numQuantity}}</td>
						           </tr>
								</tbody>
						<!-- 		<tbody>


									<td></td>
									<td style="color: #000000; font-size: 18px;">Total</td>
									<td style="color: #000000; font-size: 18px;">{{total_qty | number}}</td>

									<td></td>




								</tbody> -->
							</table>
						</div>


						
						<div class="modal-footer">
							<div class="form-group">
								<div class="col-md-12">
									<div style="float: left;">
										<button type="button" id="editCloseButton" class="btn btn-default"
											data-dismiss="modal" onclick="window.location='#/View'">Close</button>
									</div>
									<!-- <div ng-if="editSaleOrder.txtStatus==='Approved'?false:true" style="float: right;">
										<input type="submit" value="Submit" class="btn btn-warning" />
									</div> -->
								</div>
							</div>
						</div>
					</fieldset>
				</form>


			</div>
		</div>
		<!-- /page content -->

		<!-- /padding -->
	</div>
	<%-- <%@include file="../common/footer.jsp" %> --%>
		<%-- <script src="<c:url value=" /resources/js/adcContract/adc_charges.js" />"></script> --%>








</body>

</html>