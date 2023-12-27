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
		
	
		
	});
</script>
</head>

<body>
	<div class="se-pre-con">
		<div style="padding-left: 50%; padding-top: 20%">
			<img src="<c:url value="/resources/img/spinner.gif"/>">
		</div>
	</div>

	<div class="wrapper" ng-controller="productionDetailCtrl"
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
								<h3>Production Receive</h3>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>Fair Price Shop Receive</h2>
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
						<form id="addGroupForm_new" name="addGroupForm_new" ng-submit="addProductionDetail()"
							class="form-horizontal">
							<fieldset>
							<div class="form-group">
																		
									<label class="col-md-2 control-label" for="productId">Date:<span class="required">*</span>
									</label>
									
									<div class="col-md-4">
															 <input id="date"
																ng-model="newProProductionDetailSetup.dteDate"
																name="date" type="text" 
																class="form-control input-md datepicker requiredField"> 
														</div>
									
										
										
									
									
								

								

									<label class="col-md-2 control-label" for="textinput">Receive
										Code:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="txtProductName" required="required" ng-minlength="1"
											ng-maxlength="50"
											ng-model="newProProductionDetailSetup.txtBatchNo" name="txtProductName"
											type="text" class="form-control input-md requiredField">
									</div>
								
									<label class="col-md-2 control-label" for="textinput">Product
										:<span class="required">*</span>
										</label>
									<div class="col-md-4">
									<select id="productId" ng-model="newProProductionDetailSetup.cfgTblProduct.serProductId" required
											name="productId" class="form-control input-md requiredField" 
											ng-options="filteredproduct.serProductId as filteredproduct.txtProductName for filteredproduct in lstProducts | orderBy:'txtProductName'">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">
											
												<span ng-show="addGroupForm_new.customerId.$error.required">Product is required.</span> 
											</span>
										</div>
									</div>

									<label class="col-md-2 control-label" for="textinput" >Quantity
										 :<span class="required">*</span>
									</label>
																	
										<div class="col-md-4 ">
										<input id="Quantity"  class="form-control input-md requiredField"
											name="Quantity" type="text"
											ng-model="newProProductionDetailSetup.numQty" required ng-pattern="patterns.integer">
										<div role="alert">
											<span style="color: red"
												ng-show="addGroupForm_new.yearBuilt.$dirty  && addGroupForm_new.yearBuilt.$invalid"> 
												<span ng-show="addGroupForm_new.yearBuilt.$error.required">Quantity is required.</span> 
												<span class="error"
													ng-show="addGroupForm_new.yearBuilt.$error.pattern">Only digits allowed. </span>
											</span>
										</div>
									</div>
								

									<label class="col-md-2 control-label" for="textinput">Design
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									<select id="productQualityId" ng-model="newProProductionDetailSetup.cfgTblProductQuality.serProductQualityId" required
											name="productQualityId" class="form-control input-md requiredField" 
											ng-options="filteredproductQ.serProductQualityId as filteredproductQ.txtProductQualityName for filteredproductQ in lstProductQuality | orderBy:'txtProductQualityName'">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">
											
												<span ng-show="addBranchForm.customerId.$error.required">Product Design is required.</span> 
											</span>
										</div>
									</div>
								</div>
								<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="addCloseButton"
													class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
											</div>
											<div style="float: right;">
												<input type="submit" value="Submit" class="btn btn-warning" ng-disabled="addGroupForm_new.$invalid" />
											</div>
										</div>
									</div>
								<!-- <div class="modal-footer">
									
								</div> -->
							</fieldset>
						</form>
					</div>
				</div>

								<!-- 	<div>
										<div class="form-group">
											<button id="addNewEntry" data-loading-text="Processing..."
												class="btn btn-success" data-toggle="modal"
												data-target="#addProductionDetailForm">
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
									
								  <form class="form-inline" ng-submit="searchProductionDetails()" style="padding:left:20px;">

									

											<label class="col-md-2 control-label" for="productId">Date:<span
												class="required">*</span>
											</label>

											<div class="col-md-4">
												<input id="search_date" ng-model="searchDTO.dteDate" name="search_date"
													type="text" tyle="width: 200px;"
													class="form-control input-md datepicker requiredField">
											</div>

								  <button type="submit" class="btn btn-primary">Search</button>
								<!--   <button type="button" class="btn btn-secondary" ng-click="searchProductionDetails();">Show All Customers</button> -->
								</form>	

									<div class="table-responsive">
										<table ng-table="user-table" id="data-table2"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<th class="column-title">PR Code</th>
													<th class="column-title">Product </th>
													<th class="column-title">Design </th>
													<th class="column-title">Quantity</th>
													
													<th class="column-title">Date</th>
													
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
	
	


	<!-- Edit Hostel Dialog Starts  -->
 	<div class="modal fade" id="editProductionDetailForm" tabindex="-1" role="dialog"
		aria-labelledby="editHostel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Edit Fair Price Shop Receive</modalTitle>
				</div>

				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" ng-submit="updateProductionDetail()"
							class="form-horizontal">
							<fieldset>

								

								<div class="form-group">
																		
									<label class="col-md-2 control-label" for="productId">Date:<span class="required">*</span>
									</label>
									
									<div class="col-md-4">
															 <input id="editdate"
																ng-model="editProductionDetail.dteDate"
																name="date" type="text" 
																class="form-control input-md datepicker requiredField"> 
														</div>
									
										
							
						
									<label class="col-md-2 control-label" for="textinput">PR
										Code:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edittxtProductName" required="required" ng-minlength="1"
											ng-maxlength="50"
											ng-model="editProductionDetail.txtBatchNo" name="edititemName1"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-2 control-label" for="textinput">Product
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									<select id="editproductId" ng-model="editProductionDetail.cfgTblProduct.serProductId" required
											name="editproductId" class="form-control input-md requiredField" 
											ng-options="filteredproduct.serProductId as filteredproduct.txtProductName for filteredproduct in lstProducts">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">
											
												<span ng-show="addBranchForm.customerId.$error.required">Product is required.</span> 
											</span>
										</div>
									</div>

									<label class="col-md-2 control-label" for="textinput">quantity
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edititemqty" required="required" 
											ng-model="editProductionDetail.numQty" name="edititemqty"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
								
								<div class="form-group">
									
									<label class="col-md-2 control-label" for="textinput">Design
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									<select id="editproductQualityId" ng-model="editProductionDetail.cfgTblProductQuality.serProductQualityId" required
											name="editproductQualityId" class="form-control input-md requiredField" 
											ng-options="filteredproductQ.serProductQualityId as filteredproductQ.txtProductQualityName for filteredproductQ in lstProductQuality">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">
											
												<span ng-show="addBranchForm.customerId.$error.required">Product Quality is required.</span> 
											</span>
										</div>
									</div>
								</div>
							
							
								
								
								<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="editCloseButton"
													class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
											</div>
											<div ng-if="editProductionDetail.txtStatus==='Approved'?false:true" style="float: right;">
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
	<script src="<c:url value="/resources/js/Production/PR.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
			<script
		src="<c:url value="/resources/js/angular.min.js"/>">
	</script>
</body>

</html>
