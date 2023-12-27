
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
									<form id="addGroupForm" ng-submit="addNewSupplierInvoice()"
							class="form-horizontal">
							<fieldset>

						<div class="form-group row">
							<label class="col-md-2 control-label" for="productId">SO
								Date:<span class="required">*</span>
							</label>

							<div class="col-md-4">
								<input id="date" ng-model="editIssue.slsTblSaleOrder.dteDate"
									readonly name="date" type="text"
									class="form-control input-md datepicker requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">Sale
								Order No.:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtProductName" required="required" readonly
									ng-minlength="1" ng-maxlength="50"
									ng-model="editIssue.slsTblSaleOrder.txtSaleOrderNo"
									name="itemName1" type="text"
									class="form-control input-md requiredField">
							</div>

							<!-- ---------------------------------------------------------------- -->


							<label class="col-md-2 control-label" for="productId">DC
								Date.:<span class="required">*</span>
							</label>

							<div class="col-md-4">
								<input id="date" ng-model="editIssue.dteDate" name="date"
									readonly type="text"
									class="form-control input-md datepicker requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">DC
								No.:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtIssueCode" required="required" ng-minlength="1"
									readonly ng-maxlength="50" ng-model="editIssue.txtIssueCode"
									name="txtIssueCode" type="text"
									class="form-control input-md requiredField">
							</div>
							<!-- ---------------------------------------------------------------- -->
							<label class="col-md-2 control-label" for="productId">Customer:<span
								class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtCustomerName" required="required" readonly
									ng-minlength="1" ng-maxlength="50"
									ng-model="editIssue.slsTblSaleOrder.cfgTblCustomer.txtCustomerName"
									name="txtCustomerName" type="text"
									class="form-control input-md requiredField">
							</div>
							<label class="col-md-2 control-label" for="productId">Station:<span
								class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtStation" readonly
									ng-model="editIssue.slsTblSaleOrder.cfgTblCustomer.cfgTblCity.txtCityName"
									name="txtStation" type="text" readonly
									class="form-control input-md requiredField">
							</div>

							<!-- ---------------------------------------------------------------- -->

							<label class="col-md-2 control-label" for="productId">Invoice
								Date.:<span class="required">*</span>
							</label>

							<div class="col-md-4">
								<input id="date" ng-model="newSlsTblSI.dteDate" name="date"
									readonly type="text"
									class="form-control input-md datepicker requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">Invoice
								No.:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="txtInvoiceCode" required="required" ng-minlength="1"
									readonly ng-maxlength="50"
									ng-model="newSlsTblSI.txtInvoiceCode" name="txtInvoiceCode"
									type="text" class="form-control input-md requiredField">
							</div>

						</div>
						
						<!-- --------------------------------------------------------------------------- -->
<button type="button" class="btn btn-primary" type="submit"
												ng-click="refreshProductComponent">
												Load Data
											</button>
											<div class="table-responsive">
												<table ng-table="user-table-edit" id="data-table-edit"
													class="table table-striped jambo_table bulk_action">
													<thead>
														<tr class="headings">
															<th><input type="checkbox"
																ng-change="selectUnselectAll()" ng-model="checked" /></th>
					
															<th class="column-title">Product</th>
															<th class="column-title">Design</th>
															<th class="column-title">Quality</th>
															<th class="column-title">Size</th>
															
															<th class="column-title">Issued Qty</th>
															<th class="column-title">No. of Units</th>
															<th class="column-title">Pieces</th>
															<th class="column-title">Price</th>
															<th class="column-title">Amount</th>
					
					
														</tr>
													</thead>
					
													<tbody>
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
					
													</tbody>
													
													<tbody>
														<td> </td>
														<td></td>
														<td></td>
														<td ></td>
														
														<td style="color: #000000; font-size: 18px;" >Total</td>
														<td style="color: #000000; font-size: 18px;">{{total_qty | number}}</td>
														<td style="color: #000000; font-size: 18px;">{{total_unit | number}}</td>
														<td style="color: #000000; font-size: 18px;">{{total_pieces | number}}</td>
													    <td></td>
														<td style="color: #000000; font-size: 18px;">{{total_amount | number}}</td>
					
													</tbody>
												</table>
											</div>

						<div class="form-group row">
							<label class="col-md-2 control-label" for="productId"> </label>
							<label class="col-md-4 control-label" for="productId"> </label>
							<!-- <div class="col-md-4">
								<input id="newtotalQty" ng-model="total_pieces"
									 name="newtotalQty" type="text"
									class="form-control input-md  requiredField">
							</div> -->


							<label class="col-md-2 control-label" for="textinput">Amount
								:<span class="required">*</span>
								
								
							</label>
							<div class="col-md-4">
								<input id="newamount" required="required" 
									ng-minlength="1" ng-maxlength="50"
									ng-model="newSlsTblSI.numTotalAmount | number"
									name="newamount" type="text"
									class="form-control input-md requiredField ">
							</div>
					


						<!-- ---------------------------------------------------------------- -->	
							
							<label class="col-md-2 control-label" for="productId">Discount
								 :<span class="required">*</span>
							</label>

							<div class="col-md-4">
								<input id="numdiscount" ng-model="newSlsTblSI.numDiscount"
									 name="numdiscount" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">Amount
								:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									ng-minlength="1" ng-maxlength="50"
									ng-model="newSlsTblSI.numDiscountAmount | number"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>
						

						<!-- ---------------------------------------------------------------- -->	
						
							<label class="col-md-2 control-label" for="productId">  
								
							</label>

							<label class="col-md-4 control-label" for="productId">
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Amount
								after Discount:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									ng-minlength="1" ng-maxlength="50"
									ng-model="newSlsTblSI.numAmountAfterDiscount | number"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>
				
	</div>

						<div class="form-group row">
						<!-- ---------------------------------------------------------------- -->	
						
							
								<label class="col-md-2 control-label" for="textinput">Sales Tax
								 :<span class="required">*</span>
							</label>
								
							
							

							<div class="col-md-4">
								<input id="numst" ng-model="newSlsTblSI.numSalesTaxPerc"
									 name="numst" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">Sales Tax Amount
								:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="numstAmount" required="required" 
									ng-minlength="1" ng-maxlength="50"
									ng-model="newSlsTblSI.numSalesTax | number"
									name="numstAmount" type="text"
									class="form-control input-md requiredField">
							</div>
						

						<!-- ---------------------------------------------------------------- -->	
						
							
							<label class="col-md-2 control-label" for="productId">Special Sales Tax
								 :<span class="required">*</span>
							</label>

							<div class="col-md-4">
								<input id="snumst" ng-model="newSlsTblSI.numStaxTaxPerc"
									 name="snumst" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">Special Sales Tax Amount
								:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="snumstAmount" required="required" 
									ng-minlength="1" ng-maxlength="50"
									ng-model="newSlsTblSI.numSpecialSalestax | number"
									name="snumstAmount" type="text"
									class="form-control input-md requiredField">
							</div>
						</div>

						<!-- ---------------------------------------------------------------- -->	
						
						<div class="form-group row">
							<label class="col-md-2 control-label" for="productId"> 
								
							</label>
							<label class="col-md-4 control-label" for="productId"> 
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Total(Incl. Tax)
								:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="numTotalAmountAfterStax" required="required" 
									ng-minlength="1" ng-maxlength="50"
									ng-model="newSlsTblSI.numTotalAmountAfterStax | number"
									name="numTotalAmountAfterStax" type="text"
									class="form-control input-md requiredField">
							</div>
						

						<!-- ---------------------------------------------------------------- -->	
							<label class="col-md-2 control-label" for="productId">Advance Tax %
								 :<span class="required">*</span>
							</label>

							<div class="col-md-4">
								<input id="numAdvanceTaxPerc" ng-model="newSlsTblSI.numAdvanceTaxPerc "
									 name="numAdvanceTaxPerc" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">Advance Tax Amount
								:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="snumstAmount" required="required" 
									ng-minlength="1" ng-maxlength="50"
									ng-model="newSlsTblSI.numTotalAdvanceTaxAmount | number"
									name="numTotalAdvanceTaxAmount" type="text"
									class="form-control input-md requiredField">
							</div>
					

						<!-- ---------------------------------------------------------------- -->	
						
							<label class="col-md-2 control-label" for="productId"> 
								
							</label>
							<label class="col-md-4 control-label" for="productId"> 
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Total
								:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="numInvoiceAmount" required="required" 
									ng-minlength="1" ng-maxlength="50"
									ng-model="newSlsTblSI.numInvoiceAmount | number"
									name="numInvoiceAmount" type="text"
									class="form-control input-md requiredField">
							</div>
					

						<!-- ---------------------------------------------------------------- -->	
						
						
							<label class="col-md-2 control-label" for="productId"> 
								
							</label>
							<label class="col-md-4 control-label" for="productId"> 
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Freight
								:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="numFreightAmount" required="required" 
									ng-minlength="1" ng-maxlength="50"
									ng-model="newSlsTblSI.numFreightAmount | number"
									name="numFreightAmount" type="text"
									class="form-control input-md requiredField">
							</div>
					

						<!-- ---------------------------------------------------------------- -->	
						
						
							<label class="col-md-2 control-label" for="productId"> 
								
							</label>
							<label class="col-md-4 control-label" for="productId"> 
								
							</label>


							<label class="col-md-2 control-label" for="textinput">Net Total
								:<span class="required">*</span>
							</label>
							<div class="col-md-4">
								<input id="numInvoiceAmountAftFreight" required="required" 
									ng-minlength="1" ng-maxlength="50"
									ng-model="newSlsTblSI.numInvoiceAmountAftFreight | number"
									name="numInvoiceAmountAftFreight" type="text"
									class="form-control input-md requiredField">
							</div>
					
							</div>
						<!-- ---------------------------------------------------------------- -->			
								<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="editCloseButton"
													class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
											</div>
											<div style="float: right;">
												<input type="submit" value="Save" class="btn btn-warning"/>
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