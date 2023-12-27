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
		
	$('#data-table').DataTable( {
	    "order": [[ 1, "desc" ]]
	} );
		
	});
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
								<h3>Stock Detail Report</h3>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>Stock Detail Report</h2>
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
						<form id="addGroupForm_new" name="addGroupForm_new" ng-submit="getStockDetailReport()"
							class="form-horizontal">
							<fieldset>


													<div class="form-group">

														<label class="col-md-2 control-label" for="productId">Product
															Category:<span class="required">*</span>
														</label>

														<div class="col-md-4">
															<select id="productCategoryId"
																ng-model="ReportDTO.ser_product_category_id"
																name="productCategoryId"
																class="form-control input-md requiredField"
																ng-options="filteredProductCategory.serProductCategoryId as filteredProductCategory.txtProductCategoryName for filteredProductCategory in lstProductCategory">
																<option ng-selected="selected" value="">--Select--</option>
															</select>
														</div>

														<div class="form-group">

															<label class="col-md-2 control-label" for="textinput">Product
																Name:<span class="required">*</span>
															</label>
															<div class="col-md-4">
																<input id="txtProductName" 
																
																	ng-model="ReportDTO.txt_product_name"
																	name="itemName1" type="text"
																	class="form-control input-md requiredField">
															</div>
														</div>




														<!-- <div class="modal-footer">
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
								</div> -->

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
	<script src="<c:url value="/resources/js/Reports/StockReport.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
