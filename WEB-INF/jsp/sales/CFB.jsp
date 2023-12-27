<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">


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
									<h2>Customer Feedback</h2>
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

								<form ng-submit="addNewCustomerFeedback()">
									<fieldset>
										<div class="form-group row">
											<label class="col-md-2 control-label" for="productId">Date:<span
												class="required">*</span>
											</label>

											<div class="col-md-4">
												<input id="date" ng-model="newSlsTblCustomerFeedback.dteDate"
													name="date" type="text"
													class="form-control input-md datepicker requiredField">
											</div>


										
										</div>

									

										<div ng-if="isDealer==3 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="Dealer" ng-change="showCustomers()"
													ng-options="customer.serCustomerId as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in lstDealer | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="newSlsTblCustomerFeedback.cfgTblCustomer.serCustomerId">
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
													ng-model="newSlsTblCustomerFeedback.cfgTblCustomer.txtCustomerName"
													name="txtCustomerFeedbackNo" type="text"
													class="form-control input-md requiredField">
											</div>




											<label class="col-md-2 control-label" for="productId">Customer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<input id="txtCustomer" required="required"
													ng-model="newSlsTblCustomerFeedback.cfgTblCustomer.txtCustomerName"
													name="txtCustomerFeedbackNo" type="text"
													class="form-control input-md requiredField">
											</div>



										</div>


										<div ng-if="isDealer==1 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<input id="txtDealer" required="required"
													ng-model="newSlsTblCustomerFeedback.cfgTblCustomer.txtCustomerName"
													name="txtCustomerFeedbackNo" type="text"
													class="form-control input-md requiredField">
											</div>




										

										</div>
										
										

										<div class="form-group" ng-if="isDealer==4 ? true:false" class="form-group row">

											<label class="col-md-2 control-label" for="productId">Dealer:<span
												class="required">*</span>
											</label>
											<div class="col-md-4">
												<select class="form-control input-md requiredField"
													id="Dealer" ng-change="showCustomers()"
													ng-options="customer as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in lstDealrsGroup | orderBy:'txtCustomerName'"
													data-error="Please select Customer" required="required"
													data-live-search="true" required="required"
													ng-model="newSlsTblCustomerFeedback.cfgTblCustomer">
													<option ng-selected="selected" value="">--Select--</option>
												</select>
											</div>


											


										</div>
										
											<div  class="form-group row">
								
										<label class="col-md-2 control-label" for="productId">Feedback Type:<span
												class="required">*</span>
											</label>
										<div class="col-md-4">
										<select id="incoterms2"
													ng-model="newSlsTblCustomerFeedback.txtCode" name="atype"
													class="form-control input-md requiredField">
													<option value="General">General</option>
													<option value="Sales Order">Sales Order</option>
													<option value="Delivery Order">Delivery Order</option>
													<option value="Complaint">Complaint</option>

												</select>

									</div>
									</div>
									
</br>
<div class="clear">

<div class="form-group"></div>
								<div class="form-group">
								<label class="col-md-2 control-label" for="textinput">Feedback:</label>

									<div class="col-md-8">
										<textarea rows="6" cols="300" id="refNotes" required
											ng-model="newSlsTblCustomerFeedback.txtRemarks" name="refNotes" style="border: 1px solid"
											class="form-control input-md" placeholder="Enter Feedback Here"></textarea>

									</div>
									
									
									
								</div>
</br>
<div class="clear">
									<div class="form-group row"></div>






									
										
									

									
									

											<div class="form-group">
												<button id="addNewEntry" type="submit"
													class="btn btn-success" style="float: right">
													<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Save
													Feedback
												</button>

												<%-- <a href="<%=context%>/Booking" class="btn btn-primary">Back</a> --%>
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







	<%@include file="../common/footer.jsp"%>
	<script src="<c:url value="/resources/js/Sales/CFB.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
	<!--	<script src="<c:url value="/resources/js/bootstrap-select.min.js"/>"></script>  -->
</body>

</html>
