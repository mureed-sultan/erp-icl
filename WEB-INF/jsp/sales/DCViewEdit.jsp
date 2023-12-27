
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
									<form id="addGroupForm" ng-submit="addNewIssue()"
							class="form-horizontal">
							<fieldset>

								<div class="form-group row">
												<label class="col-md-2 control-label" for="productId">SO Date:<span
													class="required">*</span>
												</label>

												<div class="col-md-4">
													<input id="sodate" ng-model="editSaleOrder.dteDate"
														name="sodate" type="text" readonly
														class="form-control input-md  requiredField">
												</div>


												<label class="col-md-2 control-label" for="textinput">Order
													No.:<span class="required">*</span>
												</label>
												<div class="col-md-4">
													<input id="txtProductName" required="required" readonly
														ng-minlength="1" ng-maxlength="50"
														ng-model="editSaleOrder.txtSaleOrderNo"
														name="itemName1" type="text"
														class="form-control input-md requiredField">
												</div>
										
												<label class="col-md-2 control-label" for="productId">Customer:<span
													class="required">*</span>
												</label>
												<div class="col-md-4">
													<input id="txtCustomerName" required="required" readonly
														ng-minlength="1" ng-maxlength="50"
														ng-model="editSaleOrder.cfgTblCustomer.txtCustomerName"
														name="txtCustomerName" type="text"
														class="form-control input-md requiredField">
												</div>
											
												<!-- <label class="col-md-2 control-label" for="textinput">Dealer
													:
												</label>
												<div class="col-md-4">
													<input id="txtDealer" required="required" readonly
														ng-minlength="1" ng-maxlength="50"
														ng-model="editSaleOrder.txtDealer"
														name="txtDealer" type="text"
														class="form-control input-md requiredField">
												</div> -->
												
												<label class="col-md-2 control-label" for="textinput">Customer
													Phone No.:<span class="required">*</span>
												</label>
												<div class="col-md-4">
													<input id="txt_delivery_time" required="required"
														ng-minlength="1" ng-maxlength="50"
														ng-model="editSaleOrder.cfgTblCustomer.txtPhoneNo" readonly
														name="txt_delivery_timer" type="text"
														class="form-control input-md requiredField">
												</div>
												
												<!-- <label class="col-md-2 control-label" for="productId">Station:<span
													class="required">*</span>
												</label>
												<div class="col-md-4">
													<input id="txtStation" 	 readonly
														ng-model="editSaleOrder.cfgTblCustomer.cfgTblCity.txtCityName"
														name="txtStation" type="text" readonly
														class="form-control input-md requiredField">
												</div>
 -->

										
										
												<label class="col-md-2 control-label" for="productId">Dispatch Address:<span
													class="required">*</span>
												</label>
												<div class="col-md-4">
													<textarea rows="3" cols="50" id="DA1"
														ng-model="editSaleOrder.txtShippingAddress1" readonly
														name="refNotes" style="border: 1px solid"
														class="form-control input-md"
														placeholder="Enter Dispatch Address1"></textarea>

												</div>


												<!-- <label class="col-md-2 control-label" for="textinput">Dispatch Address2
													:<span class="required">*</span>
												</label>
												<div class="col-md-4">
													<textarea rows="3" cols="50" id="DA2" readonly
														ng-model="editSaleOrder.txtShippingAddress2"
														name="refNotes" style="border: 1px solid"
														class="form-control input-md"
														placeholder="Enter Dispatch Address2"></textarea>

												</div> -->
											</div>

                                    
                                    <!-- ------------------------------------- -->

											<div class="form-group row">
												<label class="col-md-2 control-label" for="productId">DC Date:<span
													class="required">*</span>
												</label>

												<div class="col-md-4">
													<input id="date" ng-model="newInvTblIssue.dteDate"
														name="date" type="text" 
														class="form-control input-md  datepicker requiredField">
												</div>


												<label class="col-md-2 control-label" for="textinput">DC
													No.:<span class="required">*</span>
												</label>
												<div class="col-md-4">
													<input id="txtIssueCode" required="required" 
														ng-minlength="1" ng-maxlength="50"
														ng-model="newInvTblIssue.txtIssueCode"
														name="txtIssueCode" type="text"
														class="form-control input-md requiredField">
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
															<!-- <th><input type="checkbox"
																ng-change="selectUnselectAll()" ng-model="checked" /></th> -->

															<th class="column-title">Product</th>
															
															<th class="column-title">SO Quantity</th>
															<th class="column-title">Issued Qty</th>
															
														<!-- 	<th class="column-title">Weight</th>
															<th class="column-title">Availabe Qty</th> -->

														</tr>
													</thead>

													<tbody>
														<tr ng-repeat="component in  lstSODetails">
															<!-- <td><input type="checkbox"
																id="{{component.serProductComponentId}}" /></td> -->
															<td>{{component.cfgTblProduct.txtProductName}}</td>
															
															
															<td>{{component.numQuantity}}</td>
																<td><input 
																ng-model="component.numIssueQty" type="text"
																ng-keyup="keydownforQty()"
																class="form-control input-md "></td>
															
															
															<!-- <td>{{component.numIssueQty*component.cfgTblProduct.numProductWeight*144}}</td>
															<td>{{component.numStockAvailabe}}</td> -->
														</tr>
														<tbody>
														<!-- <td></td> -->
														
														<td style="color: #000000; font-size: 18px;" >Total</td>
														<td style="color: #000000; font-size: 18px;">{{total_qty | number}}</td>
														<td style="color: #000000; font-size: 18px;">{{total_issue_qty | number}}</td>
														
													
													</tbody>
													</tbody>
												</table>
											</div>
								
								<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="editCloseButton"
													class="btn btn-default" data-dismiss="modal" onclick="window.location='/OPAL/DCMain'">Close</button>
											</div>
											<div style="float: right;">
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