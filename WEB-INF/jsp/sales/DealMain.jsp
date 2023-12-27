<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
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

<title>Customer Portal</title>
<link rel="shortcut icon" href="<c:url value="/resources/img/fav.png"/>">
<link
	href="<c:url value="/resources/css/bootstrap-datetimepicker.min.css"/>"
	rel="stylesheet">
<%@include file="../common/header.jsp"%>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">


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
						<div class="col-md-12 col-sm-12 col-xs-12">
							<div class="title_left">
								<h2>Deal View</h2>
							</div>
							</div>
						</div>
						<div class="clearfix"></div>

						
					</div>
					<!-- /page content -->

					<div class="wrapper">
					<!-- <br /> <a href="#/contract">Red----3333------</a><br /> <a
					href="#/view2">Green</a><br /> <a href="#/View">Blue</a><br />
                   <div ng-bind-html="pageLink"></div> -->
                   
					</div>
					<div ng-view></div>
				</div>
		
			<!-- /page content -->

			<!-- /padding -->
		</div>
		<!-- /main -->

	</div>
</div>



	<div class="modal fade" id="scheduleForm" tabindex="-1" role="dialog"
		aria-labelledby="scheduleForm">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Schedule Form</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="saveSchedule()"
							class="form-horizontal">
							<fieldset>
							
                      			<div class="form-group">
                      			
									<div class="col-md-8">				
									<label class="control-label" for="cityId">Product:<span class="required">*</span>
									</label>
									
									<input id="itemCode1" readonly
											ng-model="scheduleLine.cfgTblProduct.txtProductCode+' - '+scheduleLine.cfgTblProduct.txtProductName" name="itemCode1" type="text"
											class="form-control input-md requiredField">
									
										
									</div>
									
									
									
								</div>
								<div class="form-group">
								<div class="col-md-8">
									<label class="control-label" for="textinput">Total Quantity 
										:<span class="required">*</span>
									</label>
									
										<input id="itemCode1" readonly
											ng-model="scheduleLine.numQuantity" name="itemCode1" type="text"
											class="form-control input-md requiredField">
									</div>
								
									
								</div>
								
								<div class="form-group row"> 
										<div class="col-md-6">
										 	<label class=" control-label" for="productId">Date:<span
												class="required">*</span>
											</label>

											
												<input id="s_date" ng-model="dteDate2"
													name="s_date" type="text" readonly
													class="form-control input-md datepicker requiredField">
											</div> 
											<div class="col-md-6">
											<label class=" control-label" for="textinput">Quantity
												:<span class="required">*</span>
											</label>
											
												<input id="editnumProductWeight"
													ng-model="newSlsTblSaleItemSchedule.numQuantity"
													name="editnumProductWeight" type="text"
													class="form-control input-md ">
											</div>
											</div>


								
										<button type="button" id="pt" class="btn btn-primary hidden"
											type="submit" ng-click="abc()">
											<i class="glyphicon glyphicon-plus-sign"></i>Load Products
										</button>
									
											<button type="button" class="btn btn-primary" type="submit"
											ng-click="addScheduleDetail()">
											<i class="glyphicon glyphicon-plus-sign"></i>Add
										</button>
											
									 	<button type="button" class="btn btn-primary" type="submit" 
									ng-click="refreshProductComponent()">Load Schedule</button> 
										<div class="table-responsive">
											<table ng-table="user-table1" id="data-table1"
												class="table table-striped jambo_table bulk_action">
												<thead>
													<tr class="headings">
														<th class="column-title">Date</th>
														<th class="column-title">Quantity</th>
														<th class="column-title">*</th>

													</tr>
												</thead>
												<!-- form-control input-md table-field -->
												<tbody>
													<tr ng-repeat="component in  lstScheduleDetails">
																																			
														 	<td>{{component.dteDate | date:'dd-MM-yyyy'}}</td>
														
														<!-- <td>{{component.numQuantity}}</td> -->
														
														<!-- <td><input ng-model="component.dteDate"
															type="text" ng_keyup=""
															class="form-control input-md table-field"></td> -->
														
														<td><input ng-model="component.numQuantity"
															type="text" ng_keyup="calculateSchedule()"
															class="form-control input-md table-field"></td>
															<!-- ng_keyup="calculateSchedule()" -->
															
															<td><button type="button" ng-click="removeitem($index)" 
												class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-minus" ></span>
											</button></td>
															


													</tr>
												<tbody>
													
												
											
													<td style="color: #000000; font-size: 18px;">Total</td>
													<td style="color: #000000; font-size: 18px;">{{total_sch_qty
														| number}}</td>
														<td></td>


												</tbody>
												</tbody>
											</table>
										</div>
								
							
								
								
								<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="editCloseButtonSch1"
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
	<script src="<c:url value="/resources/js/Sales/DealMain.js"/>"></script>
	

	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
		
<script
		src="<c:url value="/resources/js/angular.min.js"/>">
	</script>
	<script 
	src="<c:url value="/resources/js/angular-route.min.js"/>">
	</script>
</body>

</html>
