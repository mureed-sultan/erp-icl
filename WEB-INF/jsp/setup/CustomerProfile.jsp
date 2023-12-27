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
										<h2>Customer Profile</h2>
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

									



	<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm"
							ng-submit="updateCustomer()" class="form-horizontal">
							<fieldset>


								<!-- Text input-->
								

<fieldset>
  <legend>Profile:</legend>
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
										<label class="control-label" for="textinput">Company:
										</label> <input id="custmerName" 
											ng-model="newCfgCustomerSetup.txtBusinessName"
											name="custmerName" type="text"
											class="form-control input-md ">
									</div>
									

								</div>

<div class="form-group">
<div class="col-md-6">
										<label class="control-label" for="textinput">Designation:
										</label> <input id="custmerName" 
											ng-model="newCfgCustomerSetup.txtDesignation"
											name="custmerName" type="text"
											class="form-control input-md ">
									</div>

</div></fieldset>


<fieldset>
  <legend>Contact Info:</legend>
  <div class="form-group">
  									<div class="col-md-6">
										<label class="control-label" for="textinput">Mobile
											No.:
										</label> <input id="txtPhoneNo" 
											ng-model="newCfgCustomerSetup.txtMobileNo" name="txtPhoneNo"
											type="text" class="form-control input-md ">
									</div>
									
									<div class="col-md-6">
										<label class="control-label" for="textinput">Phone
											No.:
										</label> <input id="txtPhoneNo" 
											ng-model="newCfgCustomerSetup.txtPhoneNo" name="txtPhoneNo"
											type="text" class="form-control input-md ">
									</div>
	</div>
	
	<div class="form-group">
	<div class="col-md-6">
									<label class="control-label" for="textinput">Email.:
									</label>
									
										<input id="txtCnicNo" 
											ng-model="newCfgCustomerSetup.txtEmailAddress" name="txtEmailAddress"
											type="text" class="form-control input-md ">
									</div>
	
	</div>
	
	
	<div class="form-group">
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

		</div>						
  </fieldset>


<fieldset>
  <legend>Other Information:</legend>
  
  <div class="form-group">
								
									
									<div class="col-md-6">
									<label class="control-label" for="textinput">Head of Department:
									</label>
									
										<input id="txtCnicNo" 
											ng-model="newCfgCustomerSetup.txtHOD" name="txtCnicNo"
											type="text" class="form-control input-md ">
									</div>
									<div class="col-md-6">
									<label class="control-label" for="textinput">Email.:
									</label>
									
										<input id="txtCnicNo" 
											ng-model="newCfgCustomerSetup.txtHODEmailAddress" name="txtEmailAddress"
											type="text" class="form-control input-md ">
									</div>
  </div>									
									
  <div class="form-group">
  
  <div class="col-md-6">
										<label class="control-label" for="textinput">Mobile
											No.:<span class="required"></span>
										</label> <input id="txtPhoneNo" 
											ng-model="newCfgCustomerSetup.txtHODMobile" name="txtPhoneNo"
											type="text" class="form-control input-md ">
									</div>
									
									<div class="col-md-6">
										<label class="control-label" for="textinput">Landline
											No.:<span class="required"></span>
										</label> <input id="txtPhoneNo" 
											ng-model="newCfgCustomerSetup.txtHODLandLine" name="txtPhoneNo"
											type="text" class="form-control input-md ">
									</div>
  </div>
  </fieldset>
								
									
									
									

									
								
								
							
								
							

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
	<script src="<c:url value="/resources/js/Setup/CustomerProfile.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
