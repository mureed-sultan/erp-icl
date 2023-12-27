<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<script
	src="<c:url value="/resources/js/angular.min.js"/>">
</script>
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
<%@include file="../common/header.jsp"%>

</head>

<body>
	<div class="se-pre-con">
		<div style="padding-left: 50%; padding-top: 20%">
			<img src="<c:url value="/resources/img/spinner.gif"/>">
		</div>
	</div>

	<div class="wrapper" ng-controller="customerCtrl"
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

					
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>Customer</h2>
									</div>
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

									<div>
										<div class="form-group">
											<button id="addNewEntry" data-loading-text="Processing..."
												class="btn btn-success" data-toggle="modal"
												data-target="#addCustomerForm">
												<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Add New
												Entry
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
												    
													<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<th class="column-title">#.</th>
													<!-- <th class="column-title">Customer Code</th> -->
													<th class="column-title">Customer Name</th>
													<th class="column-title">Sap No.</th>
													<th class="column-title">Dealer</th>
													<th class="column-title">Phone No.</th>
													<th class="column-title">User Name</th>
													<th class="column-title">CNIC</th>
													<th class="column-title">Balance</th>
													<th class="column-title">Status</th>
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
			<!-- /page content -->

			<!-- /padding -->
		</div>
		<!-- /main -->
</div>
	</div>
	<div class="modal fade" id="confirmModel" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;">&times;</button>
					<modalTitle>Are you sure you want to Delete the
					selected Customer(s)?</modalTitle>
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
	<div class="modal fade" id="addCustomerForm" tabindex="-1"
		role="dialog" aria-labelledby="addCustomer">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Add Customer</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm"
							ng-submit="addCustomer()" class="form-horizontal">
							<fieldset>


								<!-- Text input-->
								<div class="form-group">
									<!-- <div class="col-md-6">
										<label class="control-label" for="customerId">Customer
											Category:<span class="required">*</span>
										</label> <select id="countryId"
											ng-model="newCfgCustomerSetup.cfgTblCustomerCategory.serCustomerCategoryId"
											required name="countryId"
											class="form-control input-md requiredField"
											ng-options="filteredCustomerCategory.serCustomerCategoryId as filteredCustomerCategory.txtCustomerCategoryName for filteredCustomerCategory in lstCustomerCategory">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">

											<span ng-show="addBranchForm.customerId.$error.required">Customer
												Category is required.</span> </span>
										</div>
									</div> -->
									
									<div class="col-md-6">
										<label class="control-label" for="customerId">Dealer
											:
										</label> <select id="countryId"
											ng-model="newCfgCustomerSetup.cfgTblCustomer.serCustomerId"
											 name="countryId"
											class="form-control input-md "
											ng-options="filtedDealer.serCustomerId as filtedDealer.txtCustomerName for filtedDealer in lstDealer | orderBy:'txtCustomerName'">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										
									</div>
									
									<div class="col-md-6">
										<label class=" control-label" for="textinput">Customer
											Code:<span class="required">*</span>
										</label> <input id="itemCode1" required="required" ng-minlength="4"
											ng-maxlength="30"
											ng-model="newCfgCustomerSetup.txtCustomerCode"
											name="itemCode1" type="text"
											class="form-control input-md requiredField">
									</div>


								</div>


								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Customer
											Name:<span class="required">*</span>
										</label> <input id="custmerName" required="required"
											ng-model="newCfgCustomerSetup.txtCustomerName"
											name="custmerName" type="text"
											class="form-control input-md requiredField">
									</div>
									<div class="col-md-6">
										<label class="control-label" for="textinput">Phone
											No.:<span class="required">*</span>
										</label> <input id="txtPhoneNo" required="required"
											ng-model="newCfgCustomerSetup.txtPhoneNo" name="txtPhoneNo"
											type="text" class="form-control input-md requiredField">
									</div>

								</div>



								<div class="form-group">
								<div class="col-md-6">
									<label class="control-label" for="textinput">CNIC No.:
									</label>
									
										<input id="txtCnicNo" 
											ng-model="newCfgCustomerSetup.txtCnicNo" name="txtCnicNo"
											type="text" class="form-control input-md requiredField">
									</div>

									<div class="col-md-6">
										<label class="control-label" for="textinput">City :<span
											class="required">*</span>
										</label> <select id="cityId"
											ng-model="newCfgCustomerSetup.cfgTblCity.serCityId" required
											name="cityId" class="form-control input-md requiredField"
											ng-options="filteredCity.serCityId as filteredCity.txtCityName for filteredCity in lstCity | orderBy:'txtCityName' ">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
								</div>
								
								
								<div ng-if="newCfgCustomerSetup.cfgTblCustomer.serCustomerId ? false:true" class="form-group">
								<div class="col-md-6">
										<label class="control-label" for="textinput">Division
											:<span class="required">*</span>
										</label> 
										
										<select id="incoterms"
													ng-model="newCfgCustomerSetup.txtDivision" name="atype"
													class="form-control input-md requiredField"
													>
													<option value="">--Select--</option>
													<option value="Chemical">Chemical</option>
													<option value="Agri">Agri</option>
													<option value="Labsa">Labsa</option>

												</select>

									</div>

									<label class="control-label" for="textinput"
										id="cname">Export:<span class="required">*</span>
									</label>
									<div class="col-md-6">
									<input type="checkbox" id="empstat" name="empstat"
											 ng-model="newCfgCustomerSetup.blnIsExport"
											class="form-control">
									</div>
								</div>
								
								
								<div ng-if="newCfgCustomerSetup.cfgTblCustomer.serCustomerId ? false:true" class="form-group">
								<div class="col-md-6">
									<label class="control-label" for="textinput">Email.:<span
										class="required">*</span>
									</label>
									
										<input id="txtCnicNo" required="required"
											ng-model="newCfgCustomerSetup.txtEmailAddress" name="txtEmailAddress"
											type="text" class="form-control input-md requiredField">
									</div>
	<div class="col-md-6">
									<label class="control-label" for="textinput">User Name:<span
										class="required">*</span>
									</label>
									
										<input id="edittxtSapNo" required="required"
											ng-model="newCfgCustomerSetup.txtUserName" name="txtUserName"
											type="text" class="form-control input-md requiredField">
									</div>
								
								</div>


								<div
									ng-if="newCfgCustomerSetup.cfgTblCustomer.serCustomerId ? false:true"
									class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Responsible Person
											:<span class="required"></span>
										</label> <select id="cityId"
											ng-model="newCfgCustomerSetup.hrTblEmployee.serEmployeeId"
											 name="cityId"
											class="form-control input-md requiredField"
											ng-options="filteredEmployee.serEmployeeId as filteredEmployee.txtEmployeeCode+ ' - ' +filteredEmployee.txtEmployeeName for filteredEmployee in lstEmployee | orderBy:'txtEmployeeCode' ">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
									
									<div class="col-md-6">
										<label class="control-label" for="productId">IncoTerms:<span
											class="required"></span>
										</label> <select class="form-control input-md requiredField" id="inco"
											ng-options="object.serIncoTermsId as object.txtCode+ ' - ' +object.txtName for object in lstIncoTerms | orderBy:'txtCode'"
											data-error="Please select Customer" data-live-search="true"
											ng-model="newCfgCustomerSetup.cfgTblIncoTerm.serIncoTermsId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>

								</div>


								<!-- 	<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Billing
											Address:</label>


										<textarea rows="3" cols="50" id="refNotes"
											ng-model="newCfgCustomerSetup.txtBillingAddress"
											name="refNotes" style="border: 1px solid"
											class="form-control input-md"
											placeholder="Enter Address Here"></textarea>

									</div>
									<div class="col-md-6">
										<label class="control-label" for="textinput">Shipping
											Address:</label>


										<textarea rows="3" cols="50" id="txtShippingAddress"
											ng-model="newCfgCustomerSetup.txtShippingAddress"
											name="txtShippingAddress" style="border: 1px solid"
											class="form-control input-md"
											placeholder="Enter Shipping Address Here"></textarea>

									</div>

								</div> -->

								<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="addCloseButton"
													class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
											</div>
											<div style="float: right;">
												<input type="submit" value="Submit" class="btn btn-warning" />
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

	<!-- Edit Hostel Dialog Starts  -->
 	<div class="modal fade" id="editCustomerForm" tabindex="-1" role="dialog"
		aria-labelledby="editHostel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Edit Customer</modalTitle>
				</div>

				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" ng-submit="updateCustomer()"
							class="form-horizontal">
							<fieldset>

								<!-- Text input-->
								
								<div class="form-group">
								  	<div class="col-md-6">
										<label class="control-label" for="customerId">Dealer
											:
										</label> <select id="editcountryId"
											ng-model="editCustomer.cfgTblCustomer.serCustomerId"
											 name="countryId"
											class="form-control input-md "
											ng-options="filtedDealer.serCustomerId as filtedDealer.txtCustomerName for filtedDealer in lstDealer | orderBy:'txtCustomerName'">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										
									</div>
									
									<div class="col-md-6">
									<label class=" control-label" for="textinput">Customer
										Code:<span class="required">*</span>
									</label>
									
										<input id="edititemCode" required="required"  ng-minlength="4" ng-maxlength="30" 
											ng-model="editCustomer.txtCustomerCode" name="edititemCode"
											type="text" class="form-control input-md requiredField">
									</div>
									
									
								</div>
								
								
			
								<div class="form-group">
								<div class="col-md-6">
									 <label class="control-label" for="textinput">Customer
										Name:<span class="required">*</span>
									</label>
									
										<input id="edititemName" required="required" ng-maxlength="50"
											ng-model="editCustomer.txtCustomerName" name="edititemName"
											type="text" class="form-control input-md requiredField">
									</div>
									<div class="col-md-6">
									<label class="control-label" for="textinput">Phone
										No.:<span class="required">*</span>
									</label>
									
										<input id="edittxtPhoneNo" required="required"
											ng-model="editCustomer.txtPhoneNo" name="edittxtPhoneNo"
											type="text" class="form-control input-md requiredField">
									</div>

								</div>

								
								
								<div class="form-group">
								<div class="col-md-6">
									<label class="control-label" for="textinput">CNIC
										No.:<span class="required">*</span>
									</label>
									
										<input id="edittxtCnicNo" required="required"
											ng-model="editCustomer.txtCnicNo" name="txtCnicNo"
											type="text" class="form-control input-md requiredField">
									</div>
									<div class="col-md-6">
									<label class="control-label" for="textinput">City
										:<span class="required">*</span>
									</label> 
									
									<select id="editcityId"
										ng-model="editCustomer.cfgTblCity.serCityId"
										required name="cityId"
										class="form-control input-md requiredField"
										ng-options="filteredCity.serCityId as filteredCity.txtCityName for filteredCity in lstCity | orderBy:'txtCityName'">
										<option ng-selected="selected" value="">--Select--</option>
									</select>
									</div>
								</div>
								
										<div ng-if="newCfgCustomerSetup.cfgTblCustomer.serCustomerId ? false:true" class="form-group">
								<div class="col-md-6">
										<label class="control-label" for="textinput">Division
											:<span class="required">*</span>
										</label> 
										
										<select id="incoterms"
													ng-model="editCustomer.txtDivision" name="atype"
													class="form-control input-md requiredField"
													>
													<option value="">--Select--</option>
													<option value="Chemical">Chemical</option>
													<option value="Agri">Agri</option>
													<option value="Labsa">Labsa</option>

												</select>

									</div>

									<label class="control-label" for="textinput"
										id="cname">Export:<span class="required">*</span>
									</label>
									<div class="col-md-6">
									<input type="checkbox" id="empstat" name="empstat"
											 ng-model="editCustomer.blnIsExport"
											class="form-control">
									</div>
								</div>
								
							<div ng-if="editCustomer.cfgTblCustomer.serCustomerId ? false:true" class="form-group">
								<div class="col-md-6">
									<label class="control-label" for="textinput">Email.:<span
										class="required">*</span>
									</label>
									
										<input id="edittxtCnicNo" required="required"
											ng-model="editCustomer.txtEmailAddress" name="edittxtEmailAddress"
											type="text" class="form-control input-md requiredField">
									</div>
									
									<div class="col-md-6">
									<label class="control-label" for="textinput">User Name:<span
										class="required">*</span>
									</label>
									
										<input id="edittxtSapNo" required="required"
											ng-model="editCustomer.txtUserName" name="txtUserName"
											type="text" class="form-control input-md requiredField">
									</div>

									
								</div>
								
								<div
									ng-if="editCustomer.cfgTblCustomer.serCustomerId ? false:true"
									class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Responsible Person
											:<span class="required"></span>
										</label> <select id="cityId"
											ng-model="editCustomer.hrTblEmployee.serEmployeeId"
											 name="cityId"
											class="form-control input-md requiredField"
											ng-options="filteredEmployee.serEmployeeId as filteredEmployee.txtEmployeeCode+ ' - ' +filteredEmployee.txtEmployeeName for filteredEmployee in lstEmployee | orderBy:'txtEmployeeCode' ">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
									
									<div class="col-md-6">
										<label class="control-label" for="productId">IncoTerms:<span
											class="required"></span>
										</label> <select class="form-control input-md requiredField" id="inco"
											ng-options="object.serIncoTermsId as object.txtCode+ ' - ' +object.txtName for object in lstIncoTerms | orderBy:'txtCode'"
											data-error="Please select Customer" data-live-search="true"
											ng-model="editCustomer.cfgTblIncoTerm.serIncoTermsId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>

								</div>
								<div class="form-group">
								
								</div>
								
								<div  class="form-group">
								
								<label class="control-label" for="textinput"
										id="cname">Active:<span class="required">*</span>
									</label>
									<div class="col-md-6">
									<input type="checkbox" id="empstat" name="empstat"
											 ng-model="editCustomer.blnStatus"
											class="form-control">
									</div>
								</div>
								
							<!-- <div class="form-group">
							
							<div class="col-md-6">
								<label class="control-label" for="textinput">Billing Address:</label>

									
										<textarea rows="3" cols="100" id="refNotes"
											ng-model="editCustomer.txtBillingAddress" name="refNotes" style="border: 1px solid"
											class="form-control input-md" placeholder="Enter Address Here"></textarea>

									</div>
									<div class="col-md-6">
									<label class="control-label" for="textinput">Shipping Address:</label>

									
										<textarea rows="3" cols="100" id="refNotes2"
											ng-model="editCustomer.txtShippingAddress" name="refNotes2" style="border: 1px solid"
											class="form-control input-md" placeholder="Enter Address Here"></textarea>

									</div>
									
								</div> -->

															
							
								<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="editCloseButton"
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
	<script src="<c:url value="/resources/js/Setup/Customer.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
