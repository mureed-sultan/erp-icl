
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
				<button type="button" class="close" data-dismiss="alert">×</button>
				<strong>Error: </strong>&nbsp;<span id="errMsgText"></span>
			</div>
			<div class="alert alert-success alert-dismissible"
				style="display: none;" role="alert" id="successAlert">
				<button type="button" class="close" data-dismiss="alert">×</button>
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


												<label class="col-md-2 control-label" for="textinput">Order
													No.:<span class="required">*</span>
												</label>
												<div class="col-md-4">
													<input id="txtProductName" required="required"
														ng-minlength="1" ng-maxlength="50"
														ng-model="editSaleOrder.txtSapNo"
														name="itemName1" type="text" readonly
														class="form-control input-md requiredField">
												</div>
												</div>
												
												
												
												<div ng-if="isDealer==3 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="Dealer" ng-change="showCustomers()" readonly disabled
													ng-options="customer.serCustomerId as customer.txtCustomerName for customer in lstDealer | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="editSaleOrder.cfgTblDealer.serCustomerId">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>


											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label> 
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="packing" 
													ng-options="customer.serCustomerId as customer.txtCustomerName for customer in dealerCustomers | orderBy:'txtCustomerName'"
													data-error="Please select Customer" ng-change="showCustomer2()"
												
													ng-model="editSaleOrder.cfgTblCustomer.serCustomerId">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>

										</div>


										<div ng-if="isDealer==2 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>

											<div class="col-md-4">
												<input id="txtDealer" required="required" readonly
													ng-model="editSaleOrder.cfgTblDealer.txtCustomerName"
													name="txtSaleOrderNo" type="text"
													class="form-control input-md requiredField">
											</div>




											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<input id="txtCustomer" 
													ng-model="editSaleOrder.cfgTblCustomer.txtCustomerName"
													name="txtSaleOrderNo" type="text"
													class="form-control input-md requiredField">
											</div>



										</div>


										<div ng-if="isDealer==1 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<input id="txtDealer" required="required" readonly
													ng-model="editSaleOrder.cfgTblDealer.txtCustomerName"
													name="txtSaleOrderNo" type="text"
													class="form-control input-md requiredField">
											</div>




											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="packing" ng-change="OnCustomerSelect()"
													ng-options="customer.serCustomerId as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in dealerCustomers | orderBy:'txtCustomerName'"
													data-error="Please select Customer"
													data-live-search="true" 
													ng-model="editSaleOrder.cfgTblCustomer.serCustomerId">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>

										</div>

										<div ng-if="isDealer==4 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField" readonly disabled
													id="Dealer" ng-change="showCustomers()"
													ng-options="customer.serCustomerId as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in lstDealrsGroup | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="editSaleOrder.cfgTblDealer.serCustomerId">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>


											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="packing" ng-change="OnCustomerSelect()"
													ng-options="customer.serCustomerId as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in dealerCustomers | orderBy:'txtCustomerName'"
													data-error="Please select Customer" 
													data-live-search="true" 
													ng-model="editSaleOrder.cfgTblCustomer.serCustomerId">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>



										</div>
												
												
										<!-- 
												<div class="form-group row">
												
												<label class="col-md-2 control-label" for="productId">Dealer:<span
													class="required">*</span>
												</label>
												<div class="col-md-4">
												
												<input id="txtDealer" required="required"
														
														ng-model="editSaleOrder.cfgTblDealer.txtCustomerName"
														name="txtdealer" type="text"
														class="form-control input-md requiredField">
														
												
												</div>
												
											
												<label class="col-md-2 control-label" for="productId">Customer:<span
													class="required">*</span>
												</label>
												<div class="col-md-4">
												
												<input id="txtDealer" 											
														ng-model="editSaleOrder.cfgTblCustomer.txtCustomerName"
														name="txtcustomer" type="text"
														class="form-control input-md requiredField">
														
													
												</div>
                                              
                                              </div> -->
												
												
												
												
												
												<div class="form-group row">
																			
													<label class="col-md-2 control-label" for="productId">PO No.:<span class="required">*</span>
													</label>
													<div class="col-md-4">
														<input id="txtProductName"
															ng-model="editSaleOrder.txtPONo" name="itemName1"
															type="text" class="form-control input-md requiredField">
						
													</div>
						
												</div>
												
												
												<div class="form-group row">
													<!-- <label class="col-md-2 control-label" for="productId">Inco
														Terms:<span class="required">*</span>
													</label>
													<div class="col-md-4">
														<input id="txtProductName" required="required"
															ng-model="editSaleOrder.cfgTblIncoTerm.txtCode+'-'+editSaleOrder.cfgTblIncoTerm.txtName" name="itemName1"
															type="text" class="form-control input-md requiredField">
						
													</div> -->
					
													<label class="col-md-2 control-label" for="productId">Payment
														Terms:<span class="required">*</span>
													</label>
													<div class="col-md-4">
													
													<select class="form-control input-md requiredField" id="pt"
													ng-options="object.serPaymentTermsId as object.txtCode+ ' - ' +object.txtName for object in lstPaymentTerms | orderBy:'txtCode'"
													data-error="Please select Customer" data-live-search="true"
													required
													ng-model="editSaleOrder.cfgTblPaymentTerm.serPaymentTermsId">
												
												</select>
														<!-- <input id="txtProductName"
															ng-model="editSaleOrder.cfgTblPaymentTerm.txtCode+'-'+editSaleOrder.cfgTblPaymentTerm.txtName" name="itemName1"
															type="text" class="form-control input-md requiredField">
						 -->
													</div>
						
												</div>
									
												
												
												<div class="form-group row">
							<label class="col-md-2 control-label" for="productId">Attachment:<span class="required">*</span>
													</label>
			                    <div class="col-md-4">
			                  	 <!-- <label class="control-label" for="textinput">Attachment:<span class="required"></span> 
									</label>-->
										<input type='file' name="uploadFile" id="uploadFile"
											onchange="angular.element(this).scope().readProduct_pic(this);"
											 /> 
									  		<!-- accept="image/*" -->
											
									</div>
									<!--  <img width="160" height="80" id="blah"  ng-src="data:image/JPEG;base64,{{item.profile_pic}}"/>-->
									
									<div class="col-md-6">

										<img class="product-img01" id="blah" src="#" style="width: 128px; height: 128px;"/>
										<img style="width: 128px; height: 128px;" src="getSOPicture?id={{editSaleOrder.serSaleOrderId}}"/>
									</div>
			                    </div>
			                    
			                    
			                
			                    
			                    	 <!-- <div ng-if="editSaleOrder.txtStatus==='Approve'?false:true" class="form-group row">
												<label class="col-md-2 control-label" for="textinput">
													Product: </label>
												<div class="col-md-4">
													<select class="form-control input-md" id="packing"
														ng-options="product.serProductId as product.txtProductName for product in lstProduct"
														data-error="Please select Product" 
														data-live-search="true"
														ng-model="editSaleOrder.cfgTblProduct.serProductId">
														<option ng-selected="selected" value="">--Select--</option>
													</select>
												</div>
												<label class="col-md-2 control-label" for="textinput">Quantity
													:<span class="required">*</span>
												</label>
												<div class="col-md-4">
													<input id="editnumProductWeight"
														ng-model="editSaleOrder.numQuantity" name="itemName1"
														type="text" class="form-control input-md ">
												</div>
											
											

												</div>  -->

												<!-- --------------------------------------------------------------------------- -->
												
							
	
	
								
								
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
															<!-- <th><input type="checkbox"
																ng-change="selectUnselectAll()" ng-model="checked" /></th> -->

																													
															<th class="column-title">Product </th>
															
													<!-- 		<th class="column-title">Product Name</th> -->
														<!-- 	<th class="column-title">Date</th> -->
															
															<th class="column-title">Quantity</th>
												
															<th class="column-title">*</th>
														</tr>
													</thead>

													<tbody>
														<tr ng-repeat="component in  lstSODetails">
															<!-- <td><input type="checkbox" ng-change="calculate()" ng-model="checked"
																id="{{$index}}" /></td> -->
																<!-- <td>{{component.cfgTblProduct.txtProductCode}}</td> -->
																<td><select class="form-control input-md table-field" id="packing"
														ng-options="product.serProductId as product.txtProductName for product in lstProduct"
														data-error="Please select Product"  readonly
														data-live-search="true" ng-change="OnProductSelect()"
														ng-model="component.cfgTblProduct.serProductId">
														
													</select></td>
															<!-- <td>{{component.cfgTblProduct.txtProductName}}</td> -->
															
															<!-- <td>{{component.dteScheduleDate| date:'dd-MM-yyyy'}}</td> -->
															
																<td><input 
																ng-model="component.numQuantity" type="text" ng-keyup="calculate()"
																class="form-control input-md table-field"></td>
																<td><button type="button" ng-click="schedule(component)" data-toggle="modal"
												data-target="#scheduleForm" class="btn btn-sm btn-success">Show Schedule </button></td>
															
															
															
														
														</tr>
													</tbody>
													<tbody>
													  
													 
															
														<td style="color: #000000; font-size: 18px;" >Total</td>
														<td style="color: #000000; font-size: 18px;">{{total_qty | number}}</td>
													
														<td></td>
													
													 
														
													
													</tbody>
												</table>
											</div>
											
											
											<!-- ---------------------------------------------------------------- -->	
						
						

						<!-- ---------------------------------------------------------------- -->	
						
						
				

						<!-- ---------------------------------------------------------------- -->	
						
						

						<!-- ---------------------------------------------------------------- -->	
						
							
						
						<!-- ---------------------------------------------------------------- -->	
						
					

						<!-- ---------------------------------------------------------------- -->	
							

						<!-- ---------------------------------------------------------------- -->	
						
						
						<!-- ---------------------------------------------------------------- -->	
											<!-- --------------------------------------------------------------------------------- -->

							
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