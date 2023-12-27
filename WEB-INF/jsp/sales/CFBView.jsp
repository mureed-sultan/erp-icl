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
								
								<!-- 	<div class="form-group">
														<label for="dateFrom"
															class="control-label col-sm-2 col-md-2">Date
															From: <span class="required">*</span>
														</label>
														<div class="col-md-4">
															<input id="dateFrom" name="dateFrom"
																ng-model="searchDTO.dte_date_from | date:'dd-MM-yyyy'" type="text"
																class="form-control input-md datepicker requiredField">
														</div>

														<label for="dateTo"
															class="control-label col-sm-2 col-md-2">Date To:
															<span class="required">*</span>
														</label>
														<div class="col-md-4 form-group">
															<input id="dateTo" ng-model="searchDTO.dte_date_to | date:'dd-MM-yyyy'"
																required name="dateTo" type="text"
																class="form-control datepicker requiredField">
														</div>
														
															<button type="button" ng-click="searchCustomerFeedback()" class="btn btn-primary">Search
																	</button>
								    </div> -->
								    
								    
<div class="table-container" id="table-resp">
								<div class="table-responsive">
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<!-- <th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th> -->
													<th class="column-title">Sr. No.</th>
													<th class="column-title">Date</th>
													<th class="column-title">Dealer</th>
													<th class="column-title">Feedback Type</th>
													<th class="column-title">FeedBack</th>
													
													
													
												</tr>
											</thead>

											<tbody>
												<tr>
												    
													
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







	<%@include file="../common/footer.jsp"%>
	<script src="<c:url value="/resources/js/Sales/CFBView.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
	<!--	<script src="<c:url value="/resources/js/bootstrap-select.min.js"/>"></script>  -->
</body>

</html>
