<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<Script>
$(document).ready(function() {
	$("#date1").datepicker({
		dateFormat : "dd-mm-yy"
	});
	$("#date2").datepicker({
		dateFormat : "dd-mm-yy"
	});
});
</Script>
	
<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, shrink-to-fit=no, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>Customer Portal</title>



<link rel="shortcut icon" href="<c:url value="/resources/img/fav.png"/>">
<link
	href="<c:url value="/resources/css/bootstrap-datetimepicker.min.css"/>"
	rel="stylesheet">
<link href="<c:url value="/resources/css/bootstrap-select.min.css"/>"
	rel="stylesheet">
<%@include file="../common/header.jsp"%>

</head>

<body>
	<div class="se-pre-con">
		<div style="padding-left: 50%; padding-top: 20%">
			<img src="<c:url value="/resources/img/spinner.gif"/>">
		</div>
	</div>

	<div class="wrapper" ng-controller="productCtrl" data-ng-init="init()">
		<div class="box">

<div class="row row-offcanvas row-offcanvas-left">

			<!-- sidebar -->
			<%@include file="../common/navigationPane.jsp"%>

			<!-- /sidebar -->

			<!-- main right col -->
			<%@include file="../common/topMenu.jsp"%>
			<!-- /top nav -->

			<!-- page content -->
			<div class="right_col" role="main">
				<div class="">


					<div class="row">
						<div class="col-md-12 col-sm-12 col-xs-12">
							<div class="x_panel">
								<div class="x_title">
									<h2>Deal</h2>
								</div>
								<div class="alert alert-danger alert-dismissible"
									style="display: none;" role="alert" id="addErrorAlert">
									<button type="button" class="close" data-dismiss="alert">�</button>.
									<strong>Error: </strong>&nbsp;<span id="errMsgText"></span>
								</div>
								<div class="alert alert-success alert-dismissible"
									style="display: none;" role="alert" id="successAlert">
									<button type="button" class="close" data-dismiss="alert">�</button>
									<strong>Success: </strong>&nbsp;<span id="successMsgText"></span>
								</div>

								<!-- <div>
										<div class="form-group">
											<button id="addNewEntry" data-loading-text="Processing..."
												class="btn btn-success" data-toggle="modal"
												data-target="#addProductForm">
												<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Add New
												Entry
											</button>
											<button id="removeStores" data-loading-text="Processing..."
												data-toggle="modal" data-target="#confirmModel"
												class="btn btn-danger">
												<i class="glyphicon glyphicon-minus-sign"></i>&nbsp;Delete
												Entry
											</button>
										</div>
									</div> -->

								<form ng-submit="addNewSaleOrder()">
									<fieldset>
										<div class="form-group row">
											<label class="col-md-2 control-label" for="productId">Date:<span
												class="required">*</span>
											</label>

											<div class="col-md-4">
												<input id="date" ng-model="dteDateTest"
													name="date" type="text" readonly
													class="form-control input-md  requiredField">
											</div>


											<label  class="col-md-2 control-label" for="textinput">Deal
												No.:<span class="required">*</span>
											</label>
											<div  class="col-md-4">
												<input id="txtDealNo" required="required"
													 ng-maxlength="50"
													ng-model="newSlsTblSaleOrder.txtDealNo"
													name="txtDealNo" type="text"
													class="form-control input-md requiredField">
											</div>
										</div>
										<div  class="form-group row">

											<label class="col-md-2 control-label" for="productId">Customer:<span
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


											

											<label class="col-md-2 control-label" for="productId">Start Date:<span
												class="required">*</span>
											</label>
											<div  class="col-md-4">
												<input id="txtDealNo" required="required"
													 ng-maxlength="50"
													ng-model="newSlsTblSaleOrder.txtDealNo"
													name="txtDealNo" type="text"
													class="form-control input-md requiredField">
											</div>


											
										</div>
										
								<div  class="form-group row">
											<label class="col-md-2 control-label" for="productId">Start Date:<span
												class="required">*</span>
											</label>

											<div class="col-md-4">
												<input id="date1" ng-model="dteDateStart"
													name="date1" type="text" 
													class="form-control input-md  datepicker requiredField">
											</div>

								<label class="col-md-2 control-label" for="productId">End Date:<span
												class="required">*</span>
											</label>

											<div class="col-md-4">
												<input id="date2" ng-model="dteDateEnd"
													name="date2" type="text" 
													class="form-control input-md datepicker requiredField">
											</div>
											
										</div>
								
										
									</fieldset>
								</form>


								<form ng-submit="addNewSaleOrder()">
									<fieldset>
										<div class="form-group row">
											<label class="col-md-2 control-label" for="textinput">
												Product: </label>
											<div class="col-md-4">
												<select class="form-control input-md " id="products"
													ng-options="product as product.txtProductName+ ' ' +product.txtProductCode  for product in lstProduct | orderBy:'txtProductName'"
													data-error="Please select Product" data-live-search="true"
													ng-model="newSlsTblSoDetail.cfgTblProduct">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>
											



										<!-- </div>
										<div class="form-group row"> -->
										<!-- 	<label class="col-md-2 control-label" for="productId">Date:<span
												class="required">*</span>
											</label>

											<div class="col-md-4">
												<input id="s_date" ng-model="newSlsTblSoDetail.dteScheduleDate"
													name="s_date" type="text"
													class="form-control input-md datepicker requiredField">
											</div> -->
											
											<label class="col-md-2 control-label" for="textinput">Quantity
												:<span class="required">*</span>
											</label>
											<div class="col-md-4">
												<input id="editnumProductWeight"
													ng-model="newSlsTblSoDetail.numQuantity"
													name="editnumProductWeight" type="text"
													class="form-control input-md ">
											</div>
											</div>

										<button type="button" class="btn btn-primary" type="submit"
											ng-click="addBookingDetail()">
											<i class="glyphicon glyphicon-plus-sign"></i>Add
										</button>

										<button type="button" id="pt" class="btn btn-primary hidden"
											type="submit" ng-click="abc()">
											<i class="glyphicon glyphicon-plus-sign"></i>Load Deals
										</button>
										<!-- <button type="button" class="btn btn-primary" type="submit"
												ng-click="deleteProductComponent()">
												<i class="glyphicon glyphicon-plus-sign"></i>Delete
												Component
											</button> -->
										<div class="table-responsive">
											<table ng-table="user-table1" id="data-table1"
												class="table table-striped jambo_table bulk_action">
												<thead>
													<tr class="headings">
														<th><input type="checkbox" ng-show=false
															ng-change="selectUnselectAll()" ng-model="checked" /></th>
														<th class="column-title">Division</th>
														<th class="column-title">Category</th>
														
														<!-- <th class="column-title">Variant</th> -->
														<th class="column-title"></th>
														<th class="column-title">Description</th>
													<!-- 	<th class="column-title">Transmission</th>
														<th class="column-title">Sap Code</th> -->
														<!-- <th class="column-title">SKU</th> -->
														<th class="column-title"></th>
														<!-- <th class="column-title">Color</th>
														<th class="column-title">Interior</th> -->
														<th class="column-title">Factory Price</th>
														<th class="column-title">Quantity</th>
														<th class="column-title">Total</th>
														<!-- <th class="column-title">Sales Tax</th>
														<th class="column-title">FED</th>
														<th class="column-title">Total Amount</th>
														<th class="column-title">Filer amount</th>
														<th class="column-title">Non Filer Amount</th> -->
														
														
														<th class="column-title">*</th>


													</tr>
												</thead>
												<!-- form-control input-md table-field -->
												<tbody>
													<tr ng-repeat="component in  lstSODetails">
													 	<td><input ng-show=false type="checkbox" ng-change="calculate()"
															ng-model="component.blIsDeleted" id="{{$index}}" /></td> 
														<td>10</td>
														<td>{{component.cfgTblProduct.cfgTblProductCategory.txtProductCategoryName}}</td>
														<!-- <td>{{component.cfgTblProduct.txtVariant}}</td> -->
														<td></td>
														<td>{{component.cfgTblProduct.txtProductName}}</td>

														<!-- <td>{{component.cfgTblProduct.txtTransmission}}</td>
														<td>{{component.cfgTblProduct.txtProductCode}}</td> -->
														<td>{{component.cfgTblProduct.txtSKU}}</td>
													<td><input ng-model="component.numItemPrice" type="text" ng-keyup="calculate()"
												class="form-control input-md table-field"></td>
														<!-- <td>{{component.cfgTblProduct.numSalePrice}}</td> -->
														<td>{{component.numQuantity}}</td>
														<td>{{component.numQuantity * component.numItemPrice}}</td>
														<!-- <td>{{component.cfgTblProduct.numFED}}</td>
														<td>{{component.cfgTblProduct.numSalesTax}}</td>
														<td>{{component.cfgTblProduct.numSalePrice+component.cfgTblProduct.numFED+component.cfgTblProduct.numSalesTax}}</td>
														<td>{{component.cfgTblProduct.numfilerAmount}}</td>
														<td>{{component.cfgTblProduct.numNonfilerAmount}}</td> -->
													<!-- 	
														<td><input ng-model="component.numQuantity"
															type="text" ng_keyup="calculate()"
															class="form-control input-md table-field"></td>
															<td><button type="button" ng-click="schedule(component)" data-toggle="modal"
												data-target="#scheduleForm" class="btn btn-sm btn-success">Add Schedule </button></td> -->



													</tr>
												<tbody>
													<td></td> 
													<td></td>
													<td></td> 
													<td></td>
													<td></td> 
													<td></td> 
													<td style="color: #000000; font-size: 18px;">Total</td>
													<td style="color: #000000; font-size: 18px;">{{total_qty | number}}</td>
													<td style="color: #000000; font-size: 18px;">{{total_amount | number}}</td>
													
												</tbody>
												</tbody>
											</table>
										</div>

										<!-- -------------------------------------------------------------------------------- -->
					<label hidden class="col-md-2 control-label" for="productId">Discount
								 :
							</label>

							<div hidden class="col-md-4">
								<input id="numdiscount" ng-model="newSlsTblSaleOrder.numDiscount"
									 name="numdiscount" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label hidden class="col-md-2 control-label" for="textinput">Amount
								:
							</label>
							<div hidden class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									 ng-maxlength="50"
									ng-model="newSlsTblSaleOrder.numDiscountAmount | number"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>
						

						<!-- ---------------------------------------------------------------- -->	
						
							<label hidden class="col-md-2 control-label" for="productId">
								
							</label>

							<label hidden class="col-md-4 control-label" for="productId">
								
							</label>


							<label hidden class="col-md-2 control-label" for="textinput">Amount
								after Discount:
							</label>
							<div hidden class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									 ng-maxlength="50"
									ng-model="newSlsTblSaleOrder.numAmountAfterDiscount | number"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>
				

						<!-- ---------------------------------------------------------------- -->	
						<label class="col-md-2 control-label" for="productId">FED
								 :
							</label>

							<div class="col-md-4">
								<input id="numdiscount" ng-model="newSlsTblSaleOrder.numFED"
									 name="numdiscount" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">FED Amount
								:
							</label>
							<div class="col-md-4">
								<input id="numdiscount_amount" required="required" 
									 ng-maxlength="50"
									ng-model="newSlsTblSaleOrder.numFEDAmount | number"
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
									ng-model="newSlsTblSaleOrder.numAmountAfterFED | number"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>
				

						<!-- ---------------------------------------------------------------- -->
								
							<label class="col-md-2 control-label" for="productId">Sales Tax
								 :
							</label>

							<div class="col-md-4">
								<input id="numst" ng-model="newSlsTblSaleOrder.numSalesTax"
									 name="numst" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">Sales Tax Amount
								:
							</label>
							<div class="col-md-4">
								<input id="numstAmount" required="required" 
									 ng-maxlength="50"
									ng-model="newSlsTblSaleOrder.numSalesTaxAmount | number"
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
									ng-model="newSlsTblSaleOrder.numAmountAfterST | number"
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>

						<!-- ---------------------------------------------------------------- -->
								
							<label class="col-md-2 control-label" for="productId">CVT
								 :
							</label>

							<div class="col-md-4">
								<input id="numst" ng-model="newSlsTblSaleOrder.numCVT"
									 name="numst" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">CVT Amount
								:
							</label>
							<div class="col-md-4">
								<input id="numstAmount" required="required" 
									 ng-maxlength="50"
									ng-model="newSlsTblSaleOrder.numCVTAmount | number"
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
									ng-model="newSlsTblSaleOrder.numAmountAfterCVT | number"
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
									ng-model="newSlsTblSaleOrder.numFreight "
									name="newamount" type="text"
									class="form-control input-md requiredField">
							</div>
<!-- ---------------------------------------------------------------- -->	
						
							
							<label class="col-md-2 control-label" for="productId"> Tax (Freight and Insurance)
								 :
							</label>

							<div class="col-md-4">
								<input id="snumst" ng-model="newSlsTblSaleOrder.numTaxOnFreight"
									 name="snumst" type="text" ng-keyup="calculate()"
									class="form-control input-md  requiredField">
							</div>


							<label class="col-md-2 control-label" for="textinput">Tax Amount (Freight and Insurance)
								:
							</label>
							<div class="col-md-4">
								<input id="snumstAmount" required="required" 
									 ng-maxlength="50"
									ng-model="newSlsTblSaleOrder.numTOFAmount | number"
									name="snumstAmount" type="text"
									class="form-control input-md requiredField">
							</div>
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
									ng-model="newSlsTblSaleOrder.numGrossValue"
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
									ng-model="newSlsTblSaleOrder.numAvanceTax"
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
									ng-model="newSlsTblSaleOrder.numTotal | number"
									name="numInvoiceAmount" type="text"
									class="form-control input-md requiredField">
							</div>
					

						<!-- ---------------------------------------------------------------- -->	
											<!-- --------------------------------------------------------------------------------- -->

										<!-- --------------------------------------------------------------------------------- -->

										<div>
											<div class="form-group">
												<button id="addNewEntry" type="submit"
													class="btn btn-success" style="float: right">
													<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Save
													Deal
												</button>
												
											
												
												<!-- <button type="button" id="aa"
													class="btn btn-default"  ng-click="checkstatus()">check</button> -->

												<%-- <a href="<%=context%>/Booking" class="btn btn-primary">Back</a> --%>
											</div>
										</div>
									</fieldset>
								</form>


							</div>
						</div>
					</div>
				</div>



			</div>
			<!-- /page content -->

			<!-- /padding -->
		</div>
		<!-- /main -->
</div>
	</div>


	<div class="modal fade" id="scheduleForm" tabindex="-1" role="dialog"
		aria-labelledby="scheduleForm">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Schedule Form</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="saveSchedule()"
							class="form-horizontal">
							<fieldset>
								<!--  <div class="form-group">
									<label class="control-label" for="textinput">Zone
										<span class="required">*</span>
									</label>
									 <div class="col-md-8 form-group">
										<select class="form-control input-md" ng-change=""
											ng-options="CfgZoneSetup.txtZoneCode as CfgZoneSetup.txtZoneName for CfgZoneSetup in CfgZoneSetup"
											data-error="Please select Region " required="required"
											ng-model="newCfgAreaSetup.citZoneSetup.txtZoneCode">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										
									</div>
                                 </div>
								 -->

								<!-- Text input-->
                      			<div class="form-group">
                      			
									<div class="col-md-8">				
									<label class="control-label" for="cityId">Product:<span class="required">*</span>
									</label>
									
									<input id="itemCode1" readonly
											ng-model="scheduleLine.cfgTblProduct.txtProductCode+' - '+scheduleLine.cfgTblProduct.txtProductName" name="itemCode1" type="text"
											class="form-control input-md requiredField">
									
										
									</div>
									
									
									
								</div>
								<div class="form-group">
								<div class="col-md-8">
									<label class="control-label" for="textinput">Total Quantity 
										:<span class="required">*</span>
									</label>
									
										<input id="itemCode1" readonly
											ng-model="scheduleLine.numQuantity" name="itemCode1" type="text"
											class="form-control input-md requiredField" />
									</div>
								
									
								</div>


                              <!--   <div class="form-group">
                                <div class="col-md-8">
								<label class="control-label" for="textinput">City
										Name:<span class="required">*</span>
									</label>
									
										<input id="itemName1" required="required"   
											ng-model="newCfgCitySetup.txtCityName" name="itemName1" type="text"
											class="form-control input-md requiredField">
									</div>
								</div> -->
								
								<!-- </div>-->
										<div class="form-group row"> 
										<div class="col-md-6">
										 	<label class=" control-label" for="productId">Date:<span
												class="required">*</span>
											</label>

											
												<input id="s_date" ng-model="newSlsTblSaleItemSchedule.dteDate"
													name="s_date" type="text" readonly
													class="form-control input-md datepicker requiredField">
											</div> 
											<div class="col-md-6">
											<label class=" control-label" for="textinput">Quantity
												:<span class="required">*</span>
											</label>
											
												<input id="editnumProductWeight"
													ng-model="newSlsTblSaleItemSchedule.numQuantity"
													name="editnumProductWeight" type="text"
													class="form-control input-md ">
											</div>
											</div>

										<button type="button" class="btn btn-primary" type="submit"
											ng-click="addScheduleDetail()">
											<i class="glyphicon glyphicon-plus-sign"></i>Add
										</button>

										<button type="button" id="pt" class="btn btn-primary hidden"
											type="submit" ng-click="abc()">
											<i class="glyphicon glyphicon-plus-sign"></i>Load Products
										</button>
										<!-- <button type="button" class="btn btn-primary" type="submit"
												ng-click="deleteProductComponent()">
												<i class="glyphicon glyphicon-plus-sign"></i>Delete
												Component
											</button> -->
										<div class="table-responsive">
											<table ng-table="user-table1" id="data-table1"
												class="table table-striped jambo_table bulk_action">
												<thead>
													<tr class="headings">
														<th><input hidden type="checkbox"
															ng-change="selectUnselectAll()" ng-model="checked" /></th>
													
													<!-- 	<th class="column-title">Product Name</th> -->
															<th class="column-title">Date</th>
														<th class="column-title">Quantity</th>
														

													</tr>
												</thead>
												<!-- form-control input-md table-field -->
												<tbody>
													<tr ng-repeat="component in  lstScheduleDetails">
														<td></td>
														
													<!-- 	<td>{{scheduleLine.cfgTblProduct.txtProductName}}</td> -->
														
															<td>
															{{component.dteDate}}
															<!-- <input ng-model="component.dteDate" readonly
															type="text" ng_keyup=""
															class="form-control input-md table-field"> --></td>
														
														<td><input ng-model="component.numQuantity"
															type="text" ng_keyup="calculateSchedule()"
															class="form-control input-md table-field"></td>												


													</tr>
												<tbody>
													
													<td></td>
											
													<td style="color: #000000; font-size: 18px;">Total</td>
													<td style="color: #000000; font-size: 18px;">{{total_sch_qty
														| number}}</td>


												</tbody>
												</tbody>
											</table>
										</div>
								
							<!-- 	<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="addCloseButton"
													class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
																								
											</div>
											
											<button id="addNewEntry" type=button ng-click="saveSchedule()"
													class="btn btn-success" style="float: right">
													<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Save
													Schedule
												</button>
												
											
										</div>
									</div>
								</div> -->
								
								
								<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="editCloseButtonSch"
													class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
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
			</div>
		</div>
	</div>




	<%@include file="../common/footer.jsp"%>
	<script src="<c:url value="/resources/js/Sales/Deal.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
	<!--	<script src="<c:url value="/resources/js/bootstrap-select.min.js"/>"></script>  -->
</body>

</html>
