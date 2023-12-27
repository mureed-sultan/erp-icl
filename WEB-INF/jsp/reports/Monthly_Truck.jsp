<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js">
</script>
<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, shrink-to-fit=no, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>Tariq Glass Ltd.</title>
<link rel="shortcut icon" href="<c:url value="/resources/img/fav.png"/>">
<link
	href="<c:url value="/resources/css/bootstrap-datetimepicker.min.css"/>"
	rel="stylesheet">
	
	<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<%@include file="../common/header.jsp"%>
<script>
   $(document).ready(function() {
		  $("#checkIn").datepicker();
		  $("#checkOutDateTime").datepicker();
   });
  var onSubmit=function(){
		$(".se-pre-con").fadeIn("slow");
       return false;
	};
   </script>
</head>

<body>
	<div class="se-pre-con">
		<div style="padding-left: 50%; padding-top: 20%">
			<img src="<c:url value="/resources/img/spinner.gif"/>">
		</div>
	</div>

	<div class="wrapper" ng-controller="rptCtrl"
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
								<h3>Sales Reports</h3>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>Sales Reports</h2>
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
						<form id="addGroupForm_new" name="addGroupForm_new" ng-submit="getDCSummary_groupReport(5)"
							class="form-horizontal">
							<fieldset>
<div class="form-group row"><b>
									<label class="radio-inline" > <input type="radio" ng-model="value" ng_click="servicechargesOnRadioClick()"
										value="10" name="optradio" >Product, Design With Date
									</label> <label class="radio-inline" > <input type="radio" ng-model="value" ng_click="servicechargesOnRadioClick()"
										value="11" name="optradio">Product, Design With Town (Qty, Truck)
									</label> <label class="radio-inline"> <input type="radio" ng-model="value" ng_click="servicechargesOnRadioClick()"
										value="12" name="optradio">Product, Design With Town (Qty, Truck, Value)
									</label>  <br/>
									
									<label class="radio-inline"> <input type="radio" ng-model="value" ng_click="servicechargesOnRadioClick()"
										value="13" name="optradio">Station, Month With Product (Qty)
									</label>
									
									
									<label class="radio-inline"> <input type="radio" ng-model="value" ng_click="servicechargesOnRadioClick()"
										value="14" name="optradio">Monthly Town Wise
									</label>
									
									
									<label class="radio-inline"> <input type="radio" ng-model="value" ng_click="servicechargesOnRadioClick()"
										value="15" name="optradio"> Monthly Town Product Wise
									</label><br/>
									
									<label class="radio-inline"> <input type="radio" ng-model="value" ng_click="servicechargesOnRadioClick()"
										value="16" name="optradio"> Monthly Town, Date Product and Design Wise
									</label>
									
									<label class="radio-inline"> <input type="radio" ng-model="value" ng_click="servicechargesOnRadioClick()"
										value="21" name="optradio">Monthly Truck Report
									</label>
								</div></b>
								<div class="form-group row"></div><br/>

													<div class="form-group">

														<label class="col-md-2 control-label" for="productId">Product
															Category:<span class="required">*</span>
														</label>

														<div class="col-md-4">
															<select id="productCategoryId"  multiple
																ng-model="ReportDTO.txt_mult_product_category"
																name="productCategoryId"
																class="form-control input-md"
																ng-options="filteredProductCategory.serProductCategoryId as filteredProductCategory.txtProductCategoryName for filteredProductCategory in lstProductCategory   | orderBy:'txtProductCategoryName'">
																<option ng-selected="selected" value="">--Select--</option>
															</select>
														</div>

														<label class="col-md-2 control-label" for="textinput">Product
															:<span class="required">*</span>
														</label>
														<div class="col-md-4">
															<select id="productId"  multiple
																ng-model="ReportDTO.txt_mult_product"
																 name="productId"
																class="form-control input-md"
																ng-options="filteredproduct.serProductId as filteredproduct.txtProductName for filteredproduct in lstProducts  | orderBy:'txtProductName'">
																<option ng-selected="selected" value="">--Select--</option>
															</select>
															<div role="alert">

																<span
																	ng-show="addGroupForm_new.customerId.$error.required">Product
																	is required.</span> </span>
															</div>
														</div>

													</div>
													<div class="form-group">
													<!-- 	<label class="col-md-2 control-label" for="textinput">Quality
															:<span class="required">*</span>
														</label>
														<div class="col-md-4">
															<select id="editproductQualityId"
																ng-model="ReportDTO.ser_product_quality_id"
																 name="editproductQualityId"
																class="form-control input-md " 
																ng-options="filteredproductQ.serProductQualityId as filteredproductQ.txtProductQualityName for filteredproductQ in lstProductQuality">
																<option ng-selected="selected" value="">--Select--</option>
															</select>
															<div role="alert">

																<span ng-show="addBranchForm.customerId.$error.required">Product
																	Quality is required.</span> </span>
															</div>
														</div> -->

														<label class="col-md-2 control-label" for="textinput">Product
															Design:<span class="required">*</span>
														</label>
														<div class="col-md-4">
															<select id="editproductDesignId"  multiple
																ng-model="ReportDTO.txt_mult_product_design"
																 name="editproductDesignId"
																class="form-control input-md "
																ng-options="filteredproductD.serProductDesignId as filteredproductD.txtProductDesignName for filteredproductD in lstProductDesign | orderBy:'txtProductDesignName'">
																<option ng-selected="selected" value="">--Select--</option>
															</select>
															<div role="alert">

																<span ng-show="addBranchForm.customerId.$error.required">Product
																	Design is required.</span> </span>
															</div>
														</div>
														
														<label class="col-md-2 control-label" for="productId">Customer:<span
													class="required">*</span>
												</label>
												<div class="col-md-4">
													<select class="form-control input-md requiredField" id="packing"
														ng-options="customer as customer.txtCustomerName+ ' ' +customer.txtCustomerCode for customer in lstCustomer | orderBy:'txtCustomerName'"
														data-error="Please select Customer" multiple
														data-live-search="true" 
														ng-model="ReportDTO.txt_mult_customer">
														<option ng-selected="selected" value="">--Select--</option>
													</select>
												</div>

													</div>

													<div class="form-group">
														<label for="dateFrom"
															class="control-label col-sm-2 col-md-2">Date
															From: <span class="required">*</span>
														</label>
														<div class="col-md-4">
															<input id="dateFrom" name="dateFrom" required
																ng-model="ReportDTO.dte_date_from" type="text" readonly
																class="form-control input-md datepicker requiredField">
														</div>

														<label for="dateTo"
															class="control-label col-sm-2 col-md-2">Date To:
															<span class="required">*</span>
														</label>
														<div class="col-md-4 form-group">
															<input id="dateTo" ng-model="ReportDTO.dte_date_to"
																required name="dateTo" type="text" readonly
																class="form-control datepicker requiredField">
														</div>
													</div>

													<div class="form-group">
															<label for="status" class="col-md-5 control-label"></label>
															<div class="col-md-7">
																<button type="submit" class="btn btn-primary">Generate
																	Report</button>
																<a href="#" id="downloadLink" style="display: none;"
																	type="button" class="btn btn-success"
																	ng-click="downloadFile()">Download</a>
															</div>
														</div>
												</fieldset>
						</form>
						<object ng-show="content" data="{{content}}"  type="application/pdf" style="width: 100%; height: 400px;"></object> 
					</div>
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







	<%@include file="../common/footer.jsp"%>
	<script src="<c:url value="/resources/js/Reports/DCSummaryReports.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
