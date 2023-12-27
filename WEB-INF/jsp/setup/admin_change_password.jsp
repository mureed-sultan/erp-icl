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

<title>Admin Portal</title>
<link rel="shortcut icon" href="<c:url value="/resources/img/fav.png"/>">
<link
	href="<c:url value="/resources/css/bootstrap-datetimepicker.min.css"/>"
	rel="stylesheet">
	<link
	href="<c:url value="/resources/css/bootstrap-select.min.css"/>"
	rel="stylesheet">
<%@include file="../common/header.jsp"%>

</head>

<body>
	<div class="se-pre-con">
		<div style="padding-left: 50%; padding-top: 20%">
			<img src="<c:url value="/resources/img/spinner.gif"/>">
		</div>
	</div>

	<div class="wrapper" ng-controller="aDCtrl"
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

						
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>Change Password</h2>
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
									
									
							<form id="addGroupForm" name="addGroupForm" ng-submit="UpdateAdminPassword()"
							class="form-horizontal">
							<fieldset>
						
								<div class="form-group">
									 <label class="col-md-2 control-label" for="changeCode">
										User : <span class="required">*</span>
									</label> 
									
									<div class="col-md-4">
									<select class="form-control input-md" 
											ng-options="Appuser.serUserId as Appuser.txtUserName for Appuser in Appuser"
											data-error="Please select AppUser " required="required" data-live-search="true"
											ng-model="selectedId" >
											<option ng-selected="selected" value="">--Select--</option>
									</select>
									</div>
									</div>
                                  
								 <div class="form-group">
									<label class="col-md-2 control-label" for="newPassCode">New Password:
										<span class="required">*</span>
									</label>
									 <div class="col-md-4">
										<input id="newPassCode" required="required"  
											ng-model="newPassword" name="newPassCode" type="password"
											class="form-control input-md requiredField">
										
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
									
									
									
									
									<!-- <div>
										<div class="form-group">
											<button id="addNewEntry" data-loading-text="Processing..."
												class="btn btn-success" data-toggle="modal"
												data-target="#addAreaForm">
												<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Add New
												Entry
											</button>
										
										</div>
									</div> -->

									<!-- <div class="table-responsive">
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<th class="column-title">Sr. No.</th>
													<th class="column-title">CIT Branch/Station Code</th>
													<th class="column-title">CIT Branch/Station Name</th>
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
												</tr>
											</tbody>
										</table>
									</div> -->
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
	<script src="<c:url value="/resources/js/Setup/admin_pass.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script	src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
	<script src="<c:url value="/resources/js/bootstrap-select.min.js"/>"></script>
	
</body>

</html>
