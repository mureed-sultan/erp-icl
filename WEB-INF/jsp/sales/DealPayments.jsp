<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

 <script src="<c:url value="/resources/js/jquery.js"/>"></script>
<script>
	$(document).ready(function() {
		$("#date1").datepicker({
			dateFormat : "dd-mm-yy"
		});
	});
</script>
<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, shrink-to-fit=no, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>JAK</title>
<link rel="shortcut icon" href="<c:url value="/resources/img/fav.png"/>">
<link
	href="<c:url value="/resources/css/bootstrap-datetimepicker.min.css"/>"
	rel="stylesheet">
<%@include file="../common/header.jsp"%>

</head>

<body>
	<div class="se-pre-con">
		<div style="padding-left: 50%; padding-top: 20%">
			<img src="<c:url value="/resources/img/spinner.gif"/>">
		</div>
	</div>

	<div class="wrapper" ng-controller="productCtrl"
		data-ng-init="init()">
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

						<div class="page-title">
							<div class="title_left">
								<h3>Deal Payments</h3>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<!-- <div class="x_title">
										<h2>Product Recipe</h2>
									</div> -->
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

									

									<form ng-submit="addProduct()">
										<fieldset>
											<div class="form-group row">
												<label class="col-md-2 control-label" for="textinput">
													Deal: </label>
												<div class="col-md-4">
													<select class="form-control input-md" id="product" ng-change="showRecipe()"
														ng-options="product as product.txtDealNo for product in lstSO"
														data-error="Please select Product" required="required"
														data-live-search="true"  
														ng-model="soPayment.slsTblDeal">
														<option ng-selected="selected" value="">--Select--</option>
													</select>
												</div>
												<div> <button type="button" class="btn btn-primary" type="submit"
												ng-click="refreshProductComponent()">
												Load Previous Payments
											</button></div>
											</div>
											
											<div class="form-group row">
												<label class="col-md-2 control-label" for="textinput">
													Deal Net Amount: </label>
												<div class="col-md-4">
												<input id="date" ng-model="soPayment.slsTblDeal.numNetAmount | number"
													name="date" type="text"  readonly
													class="form-control input-md datepicker requiredField">
											</div>
												<label class="col-md-2 control-label" for="textinput">Deal Remaining Payment
													:
												</label>
												<div class="col-md-4">
													<input id="editnumProductWeight1"  readonly
														ng-model="soPayment.slsTblDeal.numRemainingBalance | number"
														name="itemName11" type="text"
														class="form-control input-md requiredField">
												</div>
											</div>
											
											
											<div class="form-group row">
												<label class="col-md-2 control-label" for="textinput">
													Date: </label>
												<div class="col-md-4">
												<input id="date1" ng-model="dteDate"
													name="date1" type="text"  readonly
													class="form-control input-md datepicker requiredField">
											</div>
												<label class="col-md-2 control-label" for="textinput">Payment
													:
												</label>
												<div class="col-md-4">
													<input id="editnumProductWeight" 
														ng-model="soPayment.numNetPayment"
														name="itemName1" type="text" ng-keyup="calculateNet()"
														class="form-control input-md requiredField">
												</div>
											</div>
																					
											<div class="form-group row">
												<label class="col-md-2 control-label" for="textinput">
													Receipt No: </label>
												<div class="col-md-4">
												<input id="date" ng-model="soPayment.txtSlipNo"
													name="date" type="text" 
													class="form-control input-md datepicker requiredField">
											</div>
												<label class="col-md-2 control-label" for="textinput">Payment Mode
													:
												</label>
													<div class="col-md-4">
													<select id="editnumProductWeight"
														ng-model="soPayment.txtPaymentMethod"
														name="editnumProductWeight"
														class="form-control input-md requiredField"
														required="required"">
														<option value="">--Select--</option>
														<option value="Online Transfer">Online Transfer</option>
														<option value="Cheque">Cheque</option>
														<option value="Cash">Cash</option>
														<option value="Pay Order">Pay Order</option>
														<option value="Demand Draft">Demand Draft</option>
														<option value="L.C">L.C</option>

													</select>
												</div>
											</div>
											
											
											<div class="form-group row">
												<label class="col-md-2 control-label" for="textinput">
													Tax Withheld  Amount: </label>
												<div class="col-md-4">
												<input id="date222" ng-model="soPayment.txtWithheld"
													name="date222" type="text"  ng-keyup="calculateNet()"
													class="form-control input-md  requiredField">
											</div>
												<label class="col-md-2 control-label" for="textinput">Stamp Duty
													:
												</label>
												<div class="col-md-4">
													<input id="editnumProductWeight" 
														ng-model="soPayment.txtStampDuty"
														name="itemName1" type="text" ng-keyup="calculateNet()"
														class="form-control input-md requiredField">
												</div>
											</div>
											
											<div class="form-group row">
												<label class="col-md-2 control-label" for="textinput">
													Late Delivery: </label>
												<div class="col-md-4">
												<input id="dat3333e" ng-model="soPayment.txtLateDelivery"
													name="dat333e" type="text"  ng-keyup="calculateNet()"
													class="form-control input-md  requiredField">
											</div>
											
											<label class="col-md-2 control-label" for="textinput">
													 Payment after Deduction: </label>
												<div class="col-md-4">
												<input id="dat3333e" ng-model="soPayment.numPaymentReceived"
													name="dat333e" type="text"  
													class="form-control input-md  requiredField">
											</div>
											
											
											</div>
											
											<div class="form-group row">
										
											<label  class="col-md-2 control-label" for="textinput">Payment Terms
												:<span class="required">*</span>
											</label>
											<div class="col-md-4">
										<select id="PT" ng-model="soPayment.txtPaymentTerm"
											name="PT" class="form-control input-md requiredField"
											required="required" ">
											<option value="">--Select--</option>
											<option value="Normal">Normal</option>
											<option value="Adjustment">Adjustment</option>
											<option value="Credit">Credit</option>
											
										</select>
										</div>
											
											</div>


											<button type="button" class="btn btn-primary" type="submit"
												ng-click="addProduct()">
												<i class="glyphicon glyphicon-plus-sign"></i>Save Payment
											</button>
											<!-- <button type="button" class="btn btn-primary" type="submit"
												ng-click="deleteProductComponent()">
												<i class="glyphicon glyphicon-plus-sign"></i>Delete Component
											</button> -->
											
											<div class="table-responsive">
									<table ng-table="user-table" id="data-table"
										class="table table-striped jambo_table bulk_action">
										<thead>
											<tr class="headings">
												<th><input type="checkbox"
													ng-change="selectUnselectAll()" ng-model="checked" /></th>
												
												<th class="column-title">PSO</th>
												<th class="column-title">Date</th>
												<th class="column-title">Payment Amount</th>
												<th class="column-title">Receipt No.</th>
												<th class="column-title">Payment Mode</th>
												<th class="column-title">Adjustment</th>
												<th class="column-title">*</th>

											</tr>
										</thead>

										<tbody>
											<tr ng-repeat="component in lstPayments">
												<td><input type="checkbox" id="{{component.serSoPaymentId}}"/></td>
												<td>{{component.slsTblSaleOrder.txtSaleOrderNo}}</td>
												<td>{{component.dteDate | date:'dd-MM-yyyy'}}</td>
												<td>{{component.numPaymentReceived | number }}</td>
												<td>{{component.txtSlipNo}}</td>
												<td>{{component.txtPaymentMethod}}</td>
												<td>{{component.blIsDealerAdjustment ? 'YES' : 'NO'}}</td>
												<td><button id="addNewEntry" data-loading-text="Processing..."   type="button" 
												class="btn btn-success" data-toggle="modal"  ng-click="populateEditDialog(component.serSoPaymentId)"
												data-target="#candidateDocument">
												<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Attachments
											</button>
												
												<!-- <button type="button" ng-click="populateEditDialog(component.serSoPaymentId)"  data-target="#candidateDocument"
												class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-minus" ></span>
											</button> --></td>
												

											</tr>
											<tbody>
														<td></td>
														<td>Total :</td>
														<td style="color: #000000; font-size: 18px;">Count : {{total_count}}</td>
														<td style="color: #000000; font-size: 18px;">{{total_qty | number}}</td>
														<td></td>
													</tbody>
										</tbody>
									</table>
								</div>

<div>
								 
								</div>
										</fieldset>
									</form>=

								</div>
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
	<div class="modal fade" id="confirmModel" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;">&times;</button>
					<modalTitle>Are you sure you want to Delete the
					selected Product(s)?</modalTitle>
				</div>
				<div class="modal-footer">
					<div class="actionButton"
						style="margin: 10px 20px 0 0; text-align: right; background: none">
						<button style="background: #FDCA01; color: #000" type="button"
							class="" data-dismiss="modal" aria-label="Close" id="noButton">
							<i class="fa"></i><span>No</span>
						</button>
						<button style="background: #FDCA01; color: #000"
							ng-click="deleteZone()" type="button" class=""
							data-dismiss="modal" aria-label="Close" id="yesButton">
							<i class="fa"></i>&nbsp;<span>Yes</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- Edit Hostel Dialog Starts  -->
<div class="modal fade" id="candidateDocument" tabindex="-1"
		role="dialog" aria-labelledby="uploadDocument">
		<div class="modal-dialog" style="width: 70%" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;">&times;</button>
					<modalTitle>Upload Document</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">

						<div class="alert alert-danger alert-dismissible"
							style="display: none;" role="alert" id="addErrorAlert"
							id="documentUploadErrorAlert">
							<strong>Error: </strong>&nbsp;<span id="documentUploadErrMsgText"></span>
						</div>
						<div class="alert alert-success alert-dismissible"
							style="display: none;" role="alert"
							id="documentUploadSuccessAlert">
							<strong>Success: </strong>&nbsp;<span
								id="documentUploadSuccessMsgText"></span>
						</div>

						<div class="panel panel-primary">
							<div class="panel-heading">Document Detail</div>
							<div class="panel-body">
								<form id="addDocument" data-toggle="validator"
									ng-submit="uploadDocument()" class="form-horizontal">
									<fieldset>
										<div class="form-group">
											<label class="col-md-2 control-label" for="textinput">Document
												Name<span class="required">*</span>
											</label>
											<div class="col-md-4 form-group">
												<textarea id="documentName" required="required"
													data-error="Fill this field"
													ng-model="newDocument.documentName" name="address" rows="1"
													style="border: solid 1px;" class="form-control"></textarea>
												<div class="help-block with-errors"></div>
											</div>
											<label class="col-md-2 control-label" for="textinput">Document<span
												class="required">*</span></label>
											<div class="col-md-4 form-group">
												<input type="file" required="required" name="uploadFile"
													file-model="myFile" id="updateUploadFile"
													accept="application/pdf">
											</div>
										</div>

										<div class="modal-footer">
											<div class="form-group">
												<div class="col-md-12">
													<div style="float: left;">
														<button type="button" id="addCloseButton"
															class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
													</div>
													<div style="float: right;">
														<input type="submit" value="Submit"
															class="btn btn-warning" />
													</div>
												</div>
											</div>
										</div>
									</fieldset>
								</form>
							</div>
						</div>

							<div class="table-responsive">
										<table ng-table="user-table" id="data-table-new"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													
													<th class="column-title">Sr. No.</th>
													<th class="column-title">Document Name</th>
													<th class="column-title">*</th>
											
												</tr>
											</thead>

											<tbody>
												<tr>
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



	<%@include file="../common/footer.jsp"%>
	<script src="<c:url value="/resources/js/Sales/DealPayment.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
