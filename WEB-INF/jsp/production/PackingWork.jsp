<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js">
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
<%@include file="../common/header.jsp"%>
<!-- <script>
$(document).ready(function() {
		
		$(".datepicker").datepicker({
			dateFormat : "dd-mm-yy"
		});
		$("#hidebydefault").hide();
		
	});
</script> -->
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
								<h3>Packing Process</h3>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>Packing Process</h2>
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

<!-- ng-change="showRecipe()" -->

									<div class="modal-body">
										<div class="panel-body" id="mainPanel">
											<form id="addGroupForm" name="addGroupForm"
												ng-submit="" class="form-horizontal">
												<fieldset>
													<div class="form-group row">
														<label class="col-md-2 control-label" for="textinput">
															Set or Finish Product: </label>
														<div class="col-md-4">
															<select class="form-control input-md" id="product"
																
																ng-options="product as product.txtProductName for product in lstProducts  | orderBy:'txtProductName'"
																data-error="Please select Product" required="required"
																
																ng-model="newlstProProductionSumary.cfgTblProduct">
																<option ng-selected="selected" value="">--Select--</option>
															</select>
														</div>
													
													</div>
													<div class="form-group">
														<label class="col-md-2 control-label" for="textinput">Product
															Design:<span class="required">*</span>
														</label>
														<div class="col-md-4">
															<select id="editproductDesignId"
																ng-model="newPackingDTO.ser_parent_design_id"
																ng-change="resetValues()"
																required name="editproductDesignId"
																class="form-control input-md requiredField"
																ng-options="filteredproductD.serProductDesignId as filteredproductD.txtProductDesignName for filteredproductD in lstProductDesign | orderBy:'txtProductDesignName'">
																<option ng-selected="selected" value="">--Select--</option>
															</select>
															<div role="alert">

																<span ng-show="addBranchForm.customerId.$error.required">Product
																	Design is required.</span> </span>
															</div>
														</div>

														<label class="col-md-2 control-label" for="textinput">Quality
															:<span class="required">*</span>
														</label>
														
														<div class="col-md-4">
															<select id="productQualityId"
															ng-change="showRecipe()"
																ng-model="newPackingDTO.ser_parent_quality_id"
																required name="productQualityId"
																data-live-search="true"
																class="form-control input-md requiredField"
																ng-options="filteredproductQ.serProductQualityId as filteredproductQ.txtProductQualityName for filteredproductQ in lstProductQuality  | orderBy:'txtProductQualityName'">
																<option ng-selected="selected" value="">--Select--</option>
															</select>
															<div role="alert">

																<span ng-show="addBranchForm.customerId.$error.required">Product
																	Quality is required.</span> </span>
															</div>
														</div>
													</div>
													<div class="form-group">
														<label class="col-md-2 control-label" for="textinput">Quantity
															:<span class="required">*</span>
														</label>
														<div class="col-md-4">
															<input id="editnumProductWeight" required="required" ng-keyup="keydownforset()"
																ng-model="newPackingDTO.num_mc_qty"
																name="itemName1" type="text"
																class="form-control input-md requiredField">
														</div>
														
														<label class="col-md-2 control-label" for="textinput">No. of Sets / Inner
															:<span class="required">*</span>
														</label>
														<div class="col-md-4">
															<input id="editnumProductWeight" required="required"
																ng-model="newPackingDTO.num_set_qty"
																name="itemName1" type="text"
																class="form-control input-md requiredField">
														</div>
														
														
													
														
													</div>
												</fieldset>
												<!-- <div style="float: right;">
													<input type="button" value="Show Components" class="btn btn-warning" />
												</div> -->
												
												<div style="float: right;">
												<button type="button" id="addCloseButton1"  data-live-search="true"
													class="btn btn-default" data-dismiss="modal" ng-click="showRecipe()">Show Components</button>
											</div>
											</form>
										</div>
									</div>

									<!-- ng-table="user-table"  ng-if="userList" -->
									
									<div class="table-responsive">
									<table  datatable="ng"  id="data-table"
										class="table table-striped jambo_table bulk_action">
										<thead>
											<tr class="headings">
												<!-- <th><input type="checkbox"
													ng-change="selectUnselectAll()" ng-model="checked" /></th> -->
												
												<!-- <th class="column-title">Parent</th>
												<th class="column-title">Child</th>
												<th class="column-title">Qty</th> -->
												<th class="column-title">Set</th>
												<th class="column-title">Component</th>
												<th class="column-title">Design/Quality</th>
												<th class="column-title">RecipeQty</th>
												<th class="column-title">Available Qty</th>
												<th class="column-title">Weight</th>
												<th class="column-title">QtyRequired</th>
												<th class="column-title">Breakage</th>
												<th class="column-title">Balance</th>

											</tr>
										</thead>
										<tbody >
									
											<tr ng-if="lstProductComponent"  ng-repeat="component in lstProductComponent">
												<!-- <td><input type="checkbox" id="{{component.serProductComponentId}}"/></td> -->
												<td>{{component.txt_parent_product_name}}</td>
												<td>{{component.txt_child_product_name}}</td>
												<td>{{component.txt_product_design_name+' / '+component.txt_product_quality_name}}</td>
												<td>{{component.num_quantity | number}}</td>
												<td>{{component.num_balance | number}}</td>
												<td>{{component.num_unit_wt | number}}</td>
												<td>{{component.num_quantity_req | number}}			</td>							
												
												
												
												
												<td><input  id="{{ 'breakage-' + component.ser_child_product_id }}" ng-model="component.num_breakage"
																name="{{ 'breakage-' + component.ser_child_product_id }}" type="text" class="form-control input-md "></td>
												<td>{{component.num_balance-component.num_breakage-component.num_quantity_req | number}}</td>				
												

											</tr>
										</tbody>
										
									</table>
								</div>
											<!-- -------------------------------------- -->
											<div class="modal-body">
											<div class="panel-body" id="mainPanel">
											<form id="footerGroupForm" name="footerGroupForm"
												ng-submit="makePacking()" class="form-horizontal">
												<fieldset>
													<div class="form-group">
														<div class="col-md-12">
															<div style="float: left;">
																<button type="button" id="editCloseButton"
																	class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
															</div>
															<div style="float: right;">
																<input type="submit" value="Submit"
																	class="btn btn-warning" />
															</div>
														</div>
													</div>
												</fieldset>
											</form>
										</div>
										</div>
											<!-- -------------------------------------- -->
									
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
	<script src="<c:url value="/resources/js/Production/PackingWork.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
