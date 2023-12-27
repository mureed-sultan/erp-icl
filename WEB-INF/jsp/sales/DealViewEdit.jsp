
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script> -->
<head>
<title>Path Finder</title>
<script>
	$(document).ready(function() {
		$("#datepicker").datepicker({
			dateFormat : "yy-mm-dd"
		});
	});
</script>
</head>
<body>
	<div ng-init="init()"></div>
			<div >
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
			
		
	
			<div class="row row-offcanvas row-offcanvas-left">
			<div class="right_col" role="main">
									<form id="addGroupForm" ng-submit="updateSaleOrder()"
							class="form-horizontal">
							<fieldset>

								<div class="form-group row">
												<label class="col-md-2 control-label" for="productId">Date:<span
													class="required">*</span>
												</label>

												<div class="col-md-4">
													<input id="date" ng-model="editSaleOrder.dteDate | date:'dd-MM-yyyy'"
														name="date" type="text" readonly
														class="form-control input-md requiredField">
												</div>


												<label class="col-md-2 control-label" for="textinput">Deal
													No.:<span class="required">*</span>
												</label>
												<div class="col-md-4">
													<input id="txtProductName" required="required"
														ng-minlength="1" ng-maxlength="50"
														ng-model="editSaleOrder.txtSaleOrderNo"
														name="itemName1" type="text" readonly
														class="form-control input-md requiredField">
												</div>
												</div>
												
												
										<!-- 		<div ng-if="isDealer==3 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label>
										<div class="col-md-4">
												<input id="txtDealer" required="required"
													ng-model="editSaleOrder.cfgTblDealer.txtCustomerName"
													name="txtSaleOrderNo" type="text"
													class="form-control input-md requiredField">
											</div>

										</div>


										<div ng-if="isDealer==2 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label>

											<div class="col-md-4">
												<input id="txtDealer" required="required"
													ng-model="editSaleOrder.cfgTblDealer.txtCustomerName"
													name="txtSaleOrderNo" type="text"
													class="form-control input-md requiredField">
											</div>




											<label class="col-md-2 control-label" for="productId">Customer Branch:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<input id="txtCustomer" required="required"
													ng-model="editSaleOrder.cfgTblCustomer.txtCustomerName"
													name="txtSaleOrderNo" type="text"
													class="form-control input-md requiredField">
											</div>



										</div> ng-if="isDealer==1 ? true:false" -->


										<div  class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<input id="txtDealer" required="required"
													ng-model="editSaleOrder.cfgTblDealer.txtCustomerName"
													name="txtSaleOrderNo" type="text"
													class="form-control input-md requiredField">
											</div>




											<label class="col-md-2 control-label" for="productId">Customer :<span
												class="required">*</span>
											</label>
											
											<div class="col-md-4">
												<input id="txtDealer" required="required"
													ng-model="editSaleOrder.cfgTblCustomer.txtCustomerName"
													name="txtSaleOrderNo" type="text"
													class="form-control input-md requiredField">
											</div>
											
											
									<!-- 		<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="packing" ng-change="OnCustomerSelect()"
													ng-options="customer as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in dealerCustomers | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="editSaleOrder.cfgTblCustomer">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div -->>

										</div>

									<!-- 	<div ng-if="isDealer==4 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="Dealer" ng-change="showCustomers()"
													ng-options="customer as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in lstDealrsGroup | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="editSaleOrder.cfgTblDealer">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>


											<label class="col-md-2 control-label" for="productId">Customer Branch:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="packing" ng-change="OnCustomerSelect()"
													ng-options="customer as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in dealerCustomers | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="editSaleOrder.cfgTblCustomer">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>



														</div> -->
				
								<!-- 		<div class="form-group">
				
											<label class=" col-md-2 control-label" for="textinput">CNIC
												No.: </label>
											<div class="col-md-4">
												<input id="txtCnicNo" readonly
													ng-model="editSaleOrder.cfgTblDealer.txtCnicNo"
													name="txtCnicNo" type="text"
													class="  form-control input-md requiredField">
											</div>
				
											<label class=" col-md-2 control-label" for="productId">Expiry
												Date:<span class="required">*</span>
											</label>
											<div class="col-md-4">
												<input id="date"
													ng-model="editSaleOrder.cfgTblDealer.txtExpiryDate" required
													name="date" type="text" readonly
													class="form-control datepicker requiredField">
											</div>
										</div> -->
				
										
								
									
								<!-- 	<div class="form-group">
									
										<label class="col-md-2 control-label" for="textinput">Date From
											:<span class="required">*</span>
										</label>
										<div class="col-md-4">
										 <input id="txtNtnNo" required="required"
											ng-model="editSaleOrder." name="txtNtnNo"
											type="text" class="form-control input-md requiredField">
									</div>
									
									
										<label class=" col-md-2 control-label" for="textinput">Date to
											:<span class="required">*</span>
										</label>
										<div class="col-md-4">
										 <input id="txtSTR" required="required"
											ng-model="editSaleOrder.cfgTblDealer.txtSTR" name="txtSTR"
											type="text" class="form-control input-md requiredField">
									</div>
									
									</div> -->
									
									<div  class="form-group">
								
									<label class="col-md-2 control-label" for="textinput">Email.:<span
										class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="txtCnicNo" required="required" readonly
											ng-model="editSaleOrder.cfgTblDealer.txtEmailAddress" name="txtEmailAddress"
											type="text" class="form-control input-md requiredField">
									</div>
								
								
									<label class="col-md-2 control-label" for="textinput">Address.:<span
										class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="txtAddress" required="required" readonly
											ng-model="editSaleOrder.cfgTblDealer.txtDisplayAddress" name="txtAddress"
											type="text" class="form-control input-md requiredField">
									</div>
									</div>
								
		<div ><!-- <button type="button" ng-click="schedule(component)" data-toggle="modal"
												data-target="#scheduleForm" class="btn btn-sm btn-success">Show Schedule </button> -->
	
								<button type="button" class="btn btn-primary" type="submit" id="load"
									ng-click="refreshProductComponent()">Load Data</button>
										</div>
			
			
			
									<div class="table-responsive">
										<table ng-table="user-table-edit" id="data-table-edit"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
													<th><input type="checkbox" ng-show=false
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<th class="column-title">Division</th>
													<th class="column-title">Category</th>
			
													<!-- <th class="column-title">Variant</th> -->
													<td></td>
													<th class="column-title">Description</th>
													<!-- <th class="column-title">Transmission</th> -->
													<td></td>
													<th class="column-title">Sap Code</th>
													<!-- <th class="column-title">SKU</th> -->
													<td></td>
													<td></td>
													<!-- <th class="column-title">Color</th> -->
			
													<th class="column-title">Factory Price</th>
													<th class="column-title">Quantity</th>
													<th class="column-title">Total</th>
			
			
			
												</tr>
											</thead>
	
											<tbody>
												<tr ng-repeat="component in  lstSODetails">
													<td><input ng-show=false type="checkbox"
														ng-change="calculate()" ng-model="component.blIsDeleted"
														id="{{$index}}" /></td>
													<td>10</td>
													<td>{{component.cfgTblProduct.cfgTblProductCategory.txtProductCategoryName}}</td>
													<td>{{component.cfgTblProduct.txtVariant}}</td>
													<td>{{component.cfgTblProduct.txtProductName}}</td>
													<td>{{component.cfgTblProduct.txtTransmission}}</td>
													<td>{{component.cfgTblProduct.txtProductCode}}</td>
													<td>{{component.cfgTblProduct.txtSKU}}</td>
													<td>{{component.cfgTblProduct.txtColor}}</td>
													<td><input ng-model="component.numItemPrice" type="text"
														ng-keyup="calculate()"
														class="form-control input-md table-field"></td>
													<!-- <td>{{component.cfgTblProduct.numSalePrice}}</td> -->
													<td>{{component.numQuantity}}</td>
													<td>{{component.numQuantity *
														component.numItemPrice}}</td>
												</tr>
											</tbody>
											<tbody>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<!-- <td></td>
												<td></td>
												<td></td>
												<td></td> -->
												<td style="color: #000000; font-size: 18px;">Total</td>
												<td style="color: #000000; font-size: 18px;">{{total_qty |
													number}}</td>
												<td style="color: #000000; font-size: 18px;">{{total_amount
													| number}}</td>
			
											</tbody>
										</table>
									</div>
			<!-- ---------------------------------------------------------------- -->	
						<label class="col-md-2 control-label" for="productId">FED
								 :
							</label>

							<div class="col-md-4">
								<input id="numdiscount" ng-model="editSaleOrder.numFED"
									 name="numdiscount" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">FED Amount
								:
							</label>
							<div class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									 ng-maxlength="50"
									ng-model="editSaleOrder.numFEDAmount | number"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>
						

						<!-- ---------------------------------------------------------------- -->	
						
							<label class="col-md-2 control-label" for="productId">
								
							</label>

							<label class="col-md-4 control-label" for="productId">
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Amount
								after FED:
							</label>
							<div class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									 ng-maxlength="50"
									ng-model="editSaleOrder.numAmountAfterFED | number"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>
				

						<!-- ---------------------------------------------------------------- -->
								
							<label class="col-md-2 control-label" for="productId">Sales Tax
								 :
							</label>

							<div class="col-md-4">
								<input id="numst" ng-model="editSaleOrder.numSalesTax"
									 name="numst" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">Sales Tax Amount
								:
							</label>
							<div class="col-md-4">
								<input id="numstAmount" required="required" 
									 ng-maxlength="50"
									ng-model="editSaleOrder.numSalesTaxAmount | number"
									name="numstAmount" type="text"
									class="form-control input-md requiredField">
							</div>
						<!-- ---------------------------------------------------------------- -->	
						
							<label class="col-md-2 control-label" for="productId">
								
							</label>

							<label class="col-md-4 control-label" for="productId">
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Amount
								after Sales Tax:
							</label>
							<div class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									 ng-maxlength="50"
									ng-model="editSaleOrder.numAmountAfterST | number"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>

						<!-- ---------------------------------------------------------------- -->
								
							<label class="col-md-2 control-label" for="productId">CVT
								 :
							</label>

							<div class="col-md-4">
								<input id="numst" ng-model="editSaleOrder.numCVT"
									 name="numst" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">CVT Amount
								:
							</label>
							<div class="col-md-4">
								<input id="numstAmount" required="required" 
									 ng-maxlength="50"
									ng-model="editSaleOrder.numCVTAmount | number"
									name="numstAmount" type="text"
									class="form-control input-md requiredField">
							</div>
						<!-- ---------------------------------------------------------------- -->	
						
							<label class="col-md-2 control-label" for="productId">
								
							</label>

							<label class="col-md-4 control-label" for="productId">
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Amount
								after CVT:
							</label>
							<div class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									 ng-maxlength="50"
									ng-model="editSaleOrder.numAmountAfterCVT | number"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>

						<!-- ---------------------------------------------------------------- -->	
						
							<label class="col-md-2 control-label" for="productId">
								
							</label>

							<label class="col-md-4 control-label" for="productId">
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Freight &  Insurance
								after CVT:
							</label>
							<div class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									 ng-maxlength="50" ng-keyup="calculate()"
									ng-model="editSaleOrder.numFreight "
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>
<!-- ---------------------------------------------------------------- -->	
						
							
							<label class="col-md-2 control-label" for="productId"> Tax (Freight and Insurance)
								 :
							</label>

							<div class="col-md-4">
								<input id="snumst" ng-model="editSaleOrder.numTaxOnFreight"
									 name="snumst" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">Tax Amount (Freight and Insurance)
								:
							</label>
							<div class="col-md-4">
								<input id="snumstAmount" required="required" 
									 ng-maxlength="50"
									ng-model="editSaleOrder.numTOFAmount | number"
									name="snumstAmount" type="text"
									class="form-control input-md requiredField">
							</div>
						
								<!-- ---------------------------------------------------------------- -->	
						
							<label class="col-md-2 control-label" for="productId">
								
							</label>

							<label class="col-md-4 control-label" for="productId">
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Gross
								Value:
							</label>
							<div class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									 ng-maxlength="50"
									ng-model="editSaleOrder.numGrossValue"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>
							<!-- ---------------------------------------------------------------- -->	
						
							<label class="col-md-2 control-label" for="productId">
								
							</label>

							<label class="col-md-4 control-label" for="productId">
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Advance Tax 231B:
							</label>
							<div class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									 ng-maxlength="50"
									ng-model="editSaleOrder.numAvanceTax"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>
						
						<!-- ---------------------------------------------------------------- -->	
						
						
							<label class="col-md-2 control-label" for="productId"> 
								
							</label>
							<label class="col-md-4 control-label" for="productId"> 
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Total
								:
							</label>
							<div class="col-md-4">
								<input id="numInvoiceAmount" required="required" 
									 ng-maxlength="50"
									ng-model="editSaleOrder.numTotal | number"
									name="numInvoiceAmount" type="text"
									class="form-control input-md requiredField">
							</div>
					
</div>
						<!-- ---------------------------------------------------------------- -->	
			
			
									<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="editCloseButton"
													class="btn btn-default" data-dismiss="modal" onclick="window.location='#/View'">Close</button>
											</div>
											<div ng-if="editSaleOrder.txtStatus==='Approved'?false:true" style="float: right;">
												<input type="submit" value="Submit" class="btn btn-warning"/>
											</div>
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
	<%-- <%@include file="../common/footer.jsp"%> --%>
	<%-- <script src="<c:url value="/resources/js/adcContract/adc_charges.js"/>"></script> --%>
	
	
	
	
	
	
	
	
</body>

</html>