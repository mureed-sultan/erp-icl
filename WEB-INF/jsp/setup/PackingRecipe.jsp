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
								<h3>Product Component</h3>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>Packing</h2>
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

									

									<form ng-submit="addProduct()">
										<fieldset>
											<div class="form-group row">
												<label class="col-md-2 control-label" for="textinput">
													Product: </label>
												<div class="col-md-4">
													<select class="form-control input-md" id="product" ng-change="showRecipe()"
														ng-options="product as product.txtProductName for product in lstProduct"
														data-error="Please select Product" required="required"
														data-live-search="true"  
														ng-model="newCfgProductComponent.cfgTblProductParent">
														<option ng-selected="selected" value="">--Select--</option>
													</select>
												</div>
												<div> <button type="button" class="btn btn-primary" type="submit"
												ng-click="refreshProductComponent">
												Load Data
											</button></div>
											</div>
											
											<div class="form-group row">
												<label class="col-md-2 control-label" for="textinput">
													Component: </label>
												<div class="col-md-4">
													<select class="form-control input-md" id="packing"
														ng-options="product as product.txtProductName for product in lstPacking"
														data-error="Please select Product" 
														data-live-search="true"
														ng-model="newCfgProductComponent.cfgTblProductChild">
														<option ng-selected="selected" value="">--Select--</option>
													</select>
												</div>
												<label class="col-md-2 control-label" for="textinput">Quantity
													:
												</label>
												<div class="col-md-4">
													<input id="editnumProductWeight" 
														ng-model="newCfgProductComponent.numQuantity"
														name="itemName1" type="text"
														class="form-control input-md requiredField">
												</div>
											</div>

											<button type="button" class="btn btn-primary" type="submit"
												ng-click="addBookingDetail()">
												<i class="glyphicon glyphicon-plus-sign"></i>Add Component
											</button>
											<button type="button" class="btn btn-primary" type="submit"
												ng-click="deleteProductComponent()">
												<i class="glyphicon glyphicon-plus-sign"></i>Delete Component
											</button>
											
											<div class="table-responsive">
									<table ng-table="user-table" id="data-table"
										class="table table-striped jambo_table bulk_action">
										<thead>
											<tr class="headings">
												<th><input type="checkbox"
													ng-change="selectUnselectAll()" ng-model="checked" /></th>
												
												<th class="column-title">Product</th>
												<th class="column-title">Component</th>
												
												<th class="column-title">Qty</th>

											</tr>
										</thead>

										<tbody>
											<tr ng-repeat="component in lstProductComponent">
												<td><input type="checkbox" id="{{component.serProductComponentId}}"/></td>
												<td>{{component.cfgTblProductParent.txtProductName}}</td>
												<td>{{component.cfgTblProductChild.txtProductName}}</td>
												<td><input value="phone" ng-model="component.numQuantity" 
													ng-keyup="keydownforQty()"			 type="text" class="form-control input-md "></td>
												<!-- <td>{{component.numQuantity}}</td> -->
												

											</tr>
											<tbody>
														<td></td>
														<td>Total :</td>
														<td style="color: #000000; font-size: 18px;">Count : {{total_count}}</td>
														<td style="color: #000000; font-size: 18px;">{{total_qty | number}}</td>
														
													</tbody>
										</tbody>
									</table>
								</div>

<div>
									 <div class="form-group">
										<button id="addNewEntry" type="submit" class="btn btn-success" style="float:right">
											<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Save Recipe
										</button>
									
										<%-- <a href="<%=context%>/Booking" class="btn btn-primary">Back</a> --%>
									</div> 
								</div>
										</fieldset>
									</form>

									<!-- 	<div class="table-responsive">
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<th class="column-title">Sr. No.</th>
													<th class="column-title">Product Code</th>
													<th class="column-title">Product Name</th>
													<th class="column-title">Category</th>
													<th class="column-title">Brand</th>
													<th class="column-title">Master Pack Size</th>
													<th class="column-title">Weight</th>
													<th class="column-title">Pieces in Master Carton</th>
													<th class="column-title">Pricing Unit</th>
													<th class="column-title">Sale Price</th>
													<th class="column-title">No. of Units in Master Carton</th>
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

	</div>
	
	





	<%@include file="../common/footer.jsp"%>
	<script src="<c:url value="/resources/js/Setup/PackingRecipe.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
