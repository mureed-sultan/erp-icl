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

<title>SS</title>
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

	<div class="wrapper" ng-controller="supplierCtrl"
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
								<h3>{{title}}</h3>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>{{title}}</h2>
									</div>
									<div class="alert alert-danger alert-dismissible"
										style="display: none;" role="alert" id="addErrorAlert">
										<button type="button" class="close" data-dismiss="alert">�</button>
										<strong>Error: </strong>&nbsp;<span id="errMsgText"></span>
									</div>
									<div class="alert alert-success alert-dismissible"
										style="display: none;" role="alert" id="successAlert">
										<button type="button" class="close" data-dismiss="alert">�</button>
										<strong>Success: </strong>&nbsp;<span id="successMsgText"></span>
									</div>

									<div>
										<div class="form-group">
											<button id="addNewEntry" data-loading-text="Processing..."
												class="btn btn-success" data-toggle="modal"
												data-target="#addSupplierForm">
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

									<div class="table-responsive">
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<th class="column-title">Sr. No.</th>
													<th class="column-title">{{title}} Code</th>
													<th class="column-title">{{title}} Name</th>
													<th class="column-title">{{title}} Category</th>
													<th class="column-title">Phone No.</th>
													<th class="column-title">City</th>
												
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
	<div class="modal fade" id="confirmModel" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;">&times;</button>
					<modalTitle>Are you sure you want to Delete the
					selected {{title}}(s)?</modalTitle>
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
	<div class="modal fade" id="addSupplierForm" tabindex="-1" role="dialog"
		aria-labelledby="addSupplier">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Add {{title}}</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="addSupplier()"
							class="form-horizontal">
							<fieldset>
				

								<!-- Text input-->
                      			<div class="form-group">
																		
									<label class="col-md-2 control-label" for="supplierId">{{title}} Category:<span class="required">*</span>
									</label>
									
									<div class="col-md-4">
									<select id="countryId" ng-model="newCfgSupplierSetup.cfgTblSupplierCategory.serSupplierCategoryId" required
											name="countryId" class="form-control input-md requiredField" 
											ng-options="filteredSupplierCategory.serSupplierCategoryId as filteredSupplierCategory.txtSupplierCategoryName for filteredSupplierCategory in lstSupplierCategory">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">
											
												<span ng-show="addBranchForm.supplierId.$error.required">{{title}} Category is required.</span> 
											</span>
										</div>
									</div>
									<label class="col-md-2 control-label" for="textinput">{{title}} 
										Code:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="itemCode1" required="required"  
											ng-model="newCfgSupplierSetup.txtSupplierCode" name="itemCode1" type="text"
											class="form-control input-md requiredField">
									</div>
									
									
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label" for="textinput">{{title}}
										Name:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="custmerName" required="required"
											ng-model="newCfgSupplierSetup.txtSupplierName"
											name="custmerName" type="text"
											class="form-control input-md requiredField">
									</div>
									<label class="col-md-2 control-label" for="textinput">Phone
										No.:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="txtSupplierMobileNo" required="required"
											ng-model="newCfgSupplierSetup.txtSupplierMobileNo" name="txtSupplierMobileNo"
											type="text" class="form-control input-md requiredField">
									</div>

								</div>

								<div class="form-group">
									<label class="col-md-2 control-label" for="textinput">NTN
										No.:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="txtNtnNo" required="required"
											ng-model="newCfgSupplierSetup.txtNtnNo" name="txtNtnNo"
											type="text" class="form-control input-md requiredField">
									</div>
										<label class="col-md-2 control-label" for="textinput">City
										:<span class="required">*</span>
									</label> 
									<div class="col-md-4">
									<select id="cityId"
										ng-model="newCfgSupplierSetup.cfgTblCity.serCityId"
										required name="cityId"
										class="form-control input-md requiredField"
										ng-options="filteredCity.serCityId as filteredCity.txtCityName for filteredCity in lstCity">
										<option ng-selected="selected" value="">--Select--</option>
									</select>
									</div>
								<!-- 	
 -->
								</div>
								
							<!-- 	<div class="form-group">
									<label class="col-md-2 control-label" for="textinput">CNIC
										No.:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="txtCnicNo" required="required"
											ng-model="newCfgSupplierSetup.txtCnicNo" name="txtCnicNo"
											type="text" class="form-control input-md requiredField">
									</div>
									<label class="col-md-2 control-label" for="textinput">Sales  
										Tax:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="numSalesTax" required="required"
											ng-model="newCfgSupplierSetup.numSalesTax"
											name="numSalesTax" type="text"
											class="form-control input-md requiredField">
									</div>

								</div>
								<div class="form-group">
									<label class="col-md-2 control-label" for="textinput">Discount
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="numDiscount" required="required"
											ng-model="newCfgSupplierSetup.numDiscount" name="numDiscount"
											type="text" class="form-control input-md requiredField">
									</div>
								<label class="col-md-2 control-label" for="textinput">GST
										No.:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="txtGstNumber" required="required"
											ng-model="newCfgSupplierSetup.txtGstNumber"
											name="txtGstNumber" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>

								<div class="form-group">
								<label class="col-md-2 control-label" for="textinput"
										id="cname">Filer:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									<input type="checkbox" id="filer" name="filer"
											 ng-model="newCfgSupplierSetup.blnIsFiler"
											class="form-control">
									</div>
								</div> -->
									<div class="form-group">
								<label class="col-md-2 control-label" for="textinput">Address:</label>

									<div class="col-md-8">
										<textarea rows="3" cols="100" id="refNotes"
											ng-model="newCfgSupplierSetup.txtSupplierAddress" name="refNotes" style="border: 1px solid"
											class="form-control input-md" placeholder="Enter Address Here"></textarea>

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
												<input type="submit" value="Submit" class="btn btn-warning"  />
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
 	<div class="modal fade" id="editSupplierForm" tabindex="-1" role="dialog"
		aria-labelledby="editHostel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Edit {{title}}</modalTitle>
				</div>

				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" ng-submit="updateSupplier()"
							class="form-horizontal">
							<fieldset>

								<!-- Text input-->
								
								<div class="form-group">
																		
									<label class="col-md-2 control-label" for="supplierId">{{title}} Category:<span class="required">*</span>
									</label>
									
									<div class="col-md-4">
									<select id="editSupplier CategoryId" ng-model="editSupplier.cfgTblSupplierCategory.serSupplierCategoryId" required
											name="editSupplier CategoryId" class="form-control input-md requiredField" 
											ng-options="filteredSupplierCategory.serSupplierCategoryId as filteredSupplierCategory.txtSupplierCategoryName for filteredSupplierCategory in lstSupplierCategory">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">
											
												<span ng-show="addBranchForm.supplierId.$error.required">{{title}} Category is required.</span> 
											</span>
										</div>
									</div>
									<label class="col-md-2 control-label" for="textinput">{{title}}
										Code:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edititemCode" required="required"   readonly
											ng-model="editSupplier.txtSupplierCode" name="edititemCode"
											type="text" class="form-control input-md requiredField">
									</div>
									
									
								</div>
			
								<div class="form-group">
									 <label class="col-md-2 control-label" for="textinput">{{title}}
										Name:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edititemName" required="required" ng-maxlength="50"
											ng-model="editSupplier.txtSupplierName" name="edititemName"
											type="text" class="form-control input-md requiredField">
									</div>
									<label class="col-md-2 control-label" for="textinput">Phone
										No.:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edittxtSupplierMobileNo" required="required"
											ng-model="editSupplier.txtSupplierMobileNo" name="edittxtSupplierMobileNo"
											type="text" class="form-control input-md requiredField">
									</div>

								</div>

								<div class="form-group">
									<label class="col-md-2 control-label" for="textinput">NTN
										No.:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edittxtNtnNo" required="required"
											ng-model="editSupplier.txtNtnNo" name="edittxtNtnNo"
											type="text" class="form-control input-md requiredField">
									</div>
									<div class="col-md-4">
									<select id="editcityId"
										ng-model="editSupplier.cfgTblCity.serCityId"
										required name="cityId"
										class="form-control input-md requiredField"
										ng-options="filteredCity.serCityId as filteredCity.txtCityName for filteredCity in lstCity">
										<option ng-selected="selected" value="">--Select--</option>
									</select>
									</div>
								<!-- 	<label class="col-md-2 control-label" for="textinput">GST
										No.:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edittxtGstNumber" required="required"
											ng-model="editSupplier.txtGstNumber"
											name="edittxtGstNumber" type="text"
											class="form-control input-md requiredField">
									</div> -->

								</div>
								
							<!-- 	<div class="form-group">
									<label class="col-md-2 control-label" for="textinput">CNIC
										No.:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edittxtCnicNo" required="required"
											ng-model="editSupplier.txtCnicNo" name="txtCnicNo"
											type="text" class="form-control input-md requiredField">
									</div>
									<label class="col-md-2 control-label" for="textinput">Sales  
										Tax:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="editnumSalesTax" required="required"
											ng-model="editSupplier.numSalesTax"
											name="editnumSalesTax" type="text"
											class="form-control input-md requiredField">
									</div>

								</div>
								<div class="form-group">
									<label class="col-md-2 control-label" for="textinput">Discount
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="editnumDiscount" required="required"
											ng-model="editSupplier.numDiscount" name="editnumDiscount"
											type="text" class="form-control input-md requiredField">
									</div>
									<label class="col-md-2 control-label" for="textinput">City
										:<span class="required">*</span>
									</label> 
									
								</div>

								<div class="form-group">
								<label class="col-md-2 control-label" for="textinput"
										id="editcname">Filer:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									<input type="checkbox" id="editfiler" name="filer"
											 ng-model="editSupplier.blnIsFiler"
											class="form-control">
									</div>
								</div> -->
									<div class="form-group">
								<label class="col-md-2 control-label" for="textinput">Address:</label>

									<div class="col-md-8">
										<textarea rows="3" cols="100" id="refNotes"
											ng-model="editSupplier.txtSupplierAddress" name="refNotes" style="border: 1px solid"
											class="form-control input-md" placeholder="Enter Address Here"></textarea>

									</div>
								</div>

															
								<div class="form-group">
								<label class="col-md-2 control-label" for="textinput"
										id="cname">Active:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									<input type="checkbox" id="empstat" name="empstat"
											 ng-model="editSupplier.blnStatus"
											class="form-control">
									</div>
								</div>
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
	<script src="<c:url value="/resources/js/Setup/Supplier.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
