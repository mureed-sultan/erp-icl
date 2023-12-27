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
								<h3>PR Transfers</h3>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>PT Transfers</h2>
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
									
									
							  <form class="form-inline" ng-submit="search()" style="padding:left:20px;">

										<div class="form-group">

											<label class="col-md-4 control-label" for="productId">Date:<span
												class="required">*</span>
											</label>

											<div class="col-md-8">
												<input id="date" ng-model="searchDTO.dteDate" name="date"
													type="text" tyle="width: 200px;"
													class="form-control input-md datepicker requiredField">
											</div>

										</div>

										<br>
								  <br>
								  <button type="submit" class="btn btn-primary">Search</button>
								<!--   <button type="button" class="btn btn-secondary" ng-click="searchProductionDetails();">Show All Customers</button> -->
								</form>		
								<div class="table-responsive">
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<!-- <th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th> -->
													<th class="column-title">Sr. No.</th>
													<th class="column-title">Product </th>
													<th class="column-title">Quality </th>
													<th class="column-title">Quantity</th>
													<th class="column-title">Weight</th>
													<th class="column-title">Transfer To</th>
													<th class="column-title">Date</th>
													<th class="column-title">Status</th>
													<th class="column-title">*</th>
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






	<%@include file="../common/footer.jsp"%>
	<script src="<c:url value="/resources/js/Production/PTTransfer.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
		  <script>
		  var onSubmit=function(){
				$(".se-pre-con").fadeIn("slow");
		       return false;
			};
			$(document).on('keypress', '#inputTextBox', function (event) {
			    var regex = new RegExp("^[a-zA-Z ]+$");
			    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
			    if (!regex.test(key)) {
			        event.preventDefault();
			        return false;
			    }
			});
	  </script>
</body>

</html>
