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
										<button type="button" class="close" data-dismiss="alert">�</button>
										<strong>Error: </strong>&nbsp;<span id="errMsgText"></span>
									</div>
									<div class="alert alert-success alert-dismissible"
										style="display: none;" role="alert" id="successAlert">
										<button type="button" class="close" data-dismiss="alert">�</button>
										<strong>Success: </strong>&nbsp;<span id="successMsgText"></span>
									</div>



									<div class="modal-body">
										<div class="panel-body" id="mainPanel">
											<form id="addGroupForm" name="addGroupForm"
												ng-submit="showRecipe()" class="form-horizontal">
												<fieldset>
													<div class="form-group">
														<label class="col-md-2 control-label" for="textinput">Product
															:<span class="required">*</span>
														</label>
														<div class="col-md-4">

<!-- ng-change="showRecipe()" -->

															<select class="form-control input-md" id="product"
																
																ng-options="product.serProductId as product.txtProductName for product in lstProducts"
																data-error="Please select Product" required="required"
																data-live-search="true"
																ng-model="newCfgProductComponent.cfgTblProductParent.serProductId">
																<!-- ng-model="newPackingDTO.ser_parent_product_id"> -->
																<option ng-selected="selected" value="">--Select--</option>
															</select>
															<div role="alert">

																<span ng-show="addBranchForm.customerId.$error.required">Product
																	is required.</span> </span>
															</div>
														</div>
													</div>

													<div class="form-group">
														<label class="col-md-2 control-label" for="textinput">Product
															Design:<span class="required">*</span>
														</label>
														<div class="col-md-4">
															<select id="editproductDesignId"
																ng-model="newPackingDTO.ser_product_design_id"
																required name="editproductDesignId"
																class="form-control input-md requiredField"
																ng-options="filteredproductD.serProductDesignId as filteredproductD.txtProductDesignName for filteredproductD in lstProductDesign">
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
																ng-model="newPackingDTO.ser_product_quality_id"
																required name="productQualityId"
																class="form-control input-md requiredField"
																ng-options="filteredproductQ.serProductQualityId as filteredproductQ.txtProductQualityName for filteredproductQ in lstProductQuality">
																<option ng-selected="selected" value="">--Select--</option>
															</select>
															<div role="alert">

																<span ng-show="addBranchForm.customerId.$error.required">Product
																	Quality is required.</span> </span>
															</div>
														</div>
													</div>
												</fieldset>
												<div style="float: right;">
													<input type="submit" value="Submit" class="btn btn-warning" />
												</div>
											</form>
										</div>
									</div>


								</div>

								<div class="table-responsive">
									<table ng-table="user-table" id="data-table"
										class="table table-striped jambo_table bulk_action">
										<thead>
											<tr class="headings">
												<th><input type="checkbox"
													ng-change="selectUnselectAll()" ng-model="checked" /></th>
												
												<th class="column-title">Parent</th>
												<th class="column-title">Child</th>
												
												<th class="column-title">Qty</th>

											</tr>
										</thead>

										<tbody>
											<tr ng-repeat="component in lstProductComponent">
												<td><input type="checkbox" id="{{component.txt_child_product_name}}"/></td>
												<td></td>
												<td></td>
												<td>}</td>
												

											</tr>
										</tbody>
									</table>
								</div>
									
									<!-- <table ng-table="user-table" id="data-table"
										class="table table-striped jambo_table bulk_action">
										<thead>
											<tr class="headings">
												<th><input type="checkbox"
													ng-change="selectUnselectAll()" ng-model="checked" /></th>
												
												<th class="column-title">Parent</th>
												<th class="column-title">Child</th>
												<th class="column-title">RecipeQty</th>
												<th class="column-title">QtyRequired</th>
												<th class="column-title">Available Qty</th>
												<th class="column-title">Breakage</th>
												<th class="column-title">Balance</th>

											</tr>
										</thead>

										<tbody>
											<tr ng-repeat="component in lstProductComponent">
												<td><input type="checkbox" /></td>
												<td>{{component.txt_parent_product_name}}</td>
												<td>{{component.txt_child_product_name}}</td>
												<td>{{component.num_quantity}}</td>
												<td>{{component.num_quantity*2}}</td>
												<td>{{component.num_balance}}</td>
												<td>{{component.numQuantity}}</td>
												<td><input  id="{{ 'breakage-' + component.ser_child_product_id }}" ng-model="component.num_breakage"
																name="{{ 'breakage-' + component.ser_child_product_id }}" type="text" class="form-control input-md "></td>
												<td></td>
												<td>{{component.num_balance}}-{{component.num_breakage}}-{{component.num_quantity*2	}}</td>

											</tr>
										</tbody>
									</table> -->

								<!-- 	<div class="table-responsive">
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<th class="column-title">Parent</th>
												<th class="column-title">Child</th>
												<th class="column-title">RecipeQty</th>
												<th class="column-title">QtyRequired</th>
												<th class="column-title">Available Qty</th>
												<th class="column-title">Breakage</th>
												<th class="column-title">Balance</th>
													
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
									</div> -->
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

<%-- 	<form id="addGroupForm1" name="addGroupForm1" ng-submit="CompletePacking()"
							class="form-horizontal">
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
							</form> --%>


	
	
		<div class="modal fade" id="ProcessProductionSummaryForm" tabindex="-1" role="dialog"
		aria-labelledby="editHostel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Tempering Process</modalTitle>
				</div>

				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" ng-submit="PaperTransferProcessandAssignDesign()"
							class="form-horizontal">
							<fieldset>

								

								

								<div class="form-group">
									
									<label class="col-md-4 control-label" for="textinput">Transfer
										Code:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edittxtProductName" required="required" ng-minlength="1"
											ng-maxlength="50" readonly
											ng-model="editProductionSummary.txtBatchNo" name="edititemName1"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
								
								
								
								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Product
										:<span class="required">*</span>
									</label>
									<div class="col-md-8">
									<select id="editproductId" ng-model="editProductionSummary.cfgTblProduct.serProductId" required readonly
											name="editproductId" class="form-control input-md requiredField" 
											ng-options="filteredproduct.serProductId as filteredproduct.txtProductName for filteredproduct in lstProducts">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">
											
												<span ng-show="addBranchForm.customerId.$error.required">Product is required.</span> 
											</span>
										</div>
									</div>

								
								</div>
								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Quantity
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edititemqty" required="required"  readonly
											ng-model="editProductionSummary.numQty" name="edititemqty"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
								<div class="form-group">
								
								<label class="col-md-4 control-label" for="textinput">Already Transfer
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="numQtyTransferP" required="required" readonly 
											ng-model="editProductionSummary.numQtyTransfer" name="numQtyTransferP"
											type="text" class="form-control input-md requiredField">  
									</div>
									
								</div>
								<div class="form-group">
								
								<label class="col-md-4 control-label" for="textinput">Available quantity
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="numQtyTransferP" required="required" readonly 
											ng-model="editProductionSummary.numBalance" name="numQtyTransferP"
											type="text" class="form-control input-md requiredField">  
									</div>
									
								</div>
								
								<div class="form-group">
								
								<label class="col-md-4 control-label" for="textinput">Quantity For Transfer
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="num_transfer_qty" required="required"  ng-keyup="keydown()"
											ng-model="editProductionSummary.num_transfer_qty" name="num_transfer_qty"
											type="text" class="form-control input-md requiredField">  
									</div>
									
									
								</div>
								
								<div class="form-group">
								
								<label class="col-md-4 control-label" for="textinput">Breakage
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="num_breakage_qty" required="required"  ng-keyup="keydown()"
											ng-model="editProductionSummary.numBreakage" name="num_breakage_qty"
											type="text" class="form-control input-md requiredField">  
									</div>
									
									
								</div>
								
								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Product
									Design:<span class="required">*</span>
									</label>
									<div class="col-md-8">
									<select id="editproductDesignId" ng-model="editProductionSummary.cfgTblProductDesign.serProductDesignId" required 
											name="editproductDesignId" class="form-control input-md requiredField" 
											ng-options="filteredproductD.serProductDesignId as filteredproductD.txtProductDesignName for filteredproductD in lstProductDesign">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">
											
												<span ng-show="addBranchForm.customerId.$error.required">Product Design is required.</span> 
											</span>
										</div>
									</div>

								
								</div>
								
								<div class="form-group">
								
								<label class="col-md-4 control-label" for="textinput">Balance
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="num_transfer_qty" required="required"  readonly
											ng-model="editProductionSummary.num_new_balance_qty" name="num_transfer_qty"
											type="text" class="form-control input-md requiredField">  
									</div>
									
									
								</div>
								
								
								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Product
										Weight(in Grams):<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="editnumProductWeight" required="required" readonly
											ng-model="editProductionSummary.numUnitWt" name="edititemName1"
											type="text" class="form-control input-md requiredField">
									</div>
									</div>
									
									<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Quality
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									<select id="editproductQualityId" ng-model="editProductionSummary.cfgTblProductQuality.serProductQualityId" required
											name="editproductQualityId" class="form-control input-md requiredField"  readonly
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




<!-- ---------------------------------------------------------Transfer Process-------------------------------------------------------------- -->

<div class="modal fade" id="TransferFormPT" tabindex="-1" role="dialog"
		aria-labelledby="editHostel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Edit ProductionDetail</modalTitle>
				</div>

				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" ng-submit="TransferProducttoNextProcessFROMTemprProcess()"
							class="form-horizontal">
							<fieldset>

								

								

								<div class="form-group">
									
									<label class="col-md-4 control-label" for="textinput">Transfer
										Code:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edittxtProductName" required="required" ng-minlength="1"
											ng-maxlength="50" readonly
											ng-model="editProductionSummary.txtBatchNo" name="edititemName1"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
								
								
								
								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Product
										:<span class="required">*</span>
									</label>
									<div class="col-md-8">
									<select id="editproductId" ng-model="editProductionSummary.cfgTblProduct.serProductId" required readonly
											name="editproductId" class="form-control input-md requiredField" 
											ng-options="filteredproduct.serProductId as filteredproduct.txtProductName for filteredproduct in lstProducts">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">
											
												<span ng-show="addBranchForm.customerId.$error.required">Product is required.</span> 
											</span>
										</div>
									</div>

								
								</div>
								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Quantity
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="edititemqty" required="required"  readonly
											ng-model="editProductionSummary.numQty" name="edititemqty"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
								<div class="form-group">
								
								<label class="col-md-4 control-label" for="textinput">Already Transfer
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="numQtyTransferP" required="required" readonly 
											ng-model="editProductionSummary.numQtyTransfer" name="numQtyTransferP"
											type="text" class="form-control input-md requiredField">  
									</div>
									
								</div>
								<div class="form-group">
								
								<label class="col-md-4 control-label" for="textinput">Available quantity
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="numQtyTransferP" required="required" readonly 
											ng-model="editProductionSummary.numBalance" name="numQtyTransferP"
											type="text" class="form-control input-md requiredField">  
									</div>
									
								</div>
								
								<div class="form-group">
								
								<label class="col-md-4 control-label" for="textinput">Quantity For Transfer
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="num_transfer_qty" required="required"  ng-keyup="keydown()"
											ng-model="editProductionSummary.num_transfer_qty" name="num_transfer_qty"
											type="text" class="form-control input-md requiredField">  
									</div>
									
									
								</div>
								
								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Process
									:<span class="required">*</span>
									</label>
									<div class="col-md-8">
									<select id="editproductDesignId" ng-model="editProductionSummary.cfgTblProcess.serProcessId" required  
											name="editproductDesignId" class="form-control input-md requiredField" 
											ng-options="filteredprocess.serProcessId as filteredprocess.txtProcessName for filteredprocess in lstProcess">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">
											
												<span ng-show="addBranchForm.customerId.$error.required">Process is required.</span> 
											</span>
										</div>
									</div>

								
								</div>
								
							<!-- 	<div class="form-group">
								
								<label class="col-md-4 control-label" for="textinput">Breakage
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="num_breakage_qty" required="required"  ng-keyup="keydown()"
											ng-model="editProductionSummary.numBreakage" name="num_breakage_qty"
											type="text" class="form-control input-md requiredField">  
									</div>
									
									
								</div> -->
								
								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Product
									Design:<span class="required">*</span>
									</label>
									<div class="col-md-8">
									<select id="editproductDesignId" ng-model="editProductionSummary.cfgTblProductDesign.serProductDesignId" required  readonly
											name="editproductDesignId" class="form-control input-md requiredField" 
											ng-options="filteredproductD.serProductDesignId as filteredproductD.txtProductDesignName for filteredproductD in lstProductDesign">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										<div role="alert">
											
												<span ng-show="addBranchForm.customerId.$error.required">Product Design is required.</span> 
											</span>
										</div>
									</div>

								
								</div>
								
								<div class="form-group">
								
								<label class="col-md-4 control-label" for="textinput">Balance
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="num_transfer_qty" required="required"  readonly
											ng-model="editProductionSummary.num_new_balance_qty" name="num_transfer_qty"
											type="text" class="form-control input-md requiredField">  
									</div>
									
									
								</div>
								
								
								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Product
										Weight(in Grams):<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="editnumProductWeight" required="required" readonly
											ng-model="editProductionSummary.numUnitWt" name="edititemName1"
											type="text" class="form-control input-md requiredField">
									</div>
									</div>
									
									<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Quality
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									<select id="editproductQualityId" ng-model="editProductionSummary.cfgTblProductQuality.serProductQualityId" required
											name="editproductQualityId" class="form-control input-md requiredField"  readonly
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
	
	<!-- --------------------------------------------------------------------End of Transfer Process -->




	<%@include file="../common/footer.jsp"%>
	<script src="<c:url value="/resources/js/Production/PackingWork.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
