<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<script
	src="<c:url value="/resources/js/angular.min.js"/>">
</script>

<script>
            $(function () {
                $("#dob").datepicker({ dateFormat: "yyyy-mm-dd" });
            });
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
	
	
	<!-- <script
 src="<c:url value="/resources/js/jquery-1.11.3.min.js"/>"></script> -->
 <script src="<c:url value="/resources/js/jquery-1.11.3.min.js"/>"></script>
 
<!-- <script
 src="<c:url value="/resources/js/jquery-1.11.4.min.js"/>"></script> -->
	<script>
	$(document).ready(function() {
		  
		  $(".datepicker").datepicker({
		   dateFormat : "dd-mm-yy"
		  });
		 });
	</script>

<%@include file="../common/header.jsp"%>
<link rel="stylesheet"
	href="<c:url value="/resources/css/jquery-ui-1.12.1.css"/>">
<script src="<c:url value="/resources/js/jquery-1.12.4.min.js"/>"></script>
<script src="<c:url value="/resources/js/jquery-1.12.4.min.js"/>"></script>
<style>
	
</style>
</head>

<body>
	<div class="se-pre-con">
		<div style="padding-left: 50%; padding-top: 20%">
			<img src="<c:url value="/resources/img/spinner.gif"/>">
		</div>
	</div>

	<div class="wrapper" ng-controller="employeeCtrl"
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

						<!-- <div class="page-title">
							<div class="title_left">
								<h3>Employee</h3>
							</div>
						</div> -->
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>Employee</h2>
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
												data-target="#addEmployeeForm">
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
									</div>

									<div class="table-responsive">
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<th class="column-title">Sr. No.</th>
													<th class="column-title">SAP Code</th>
													<th class="column-title">Employee Name</th>
													<th class="column-title">Father Name</th>
													<th class="column-title">Address</th>
													<th class="column-title">Gender</th>
													<th class="column-title">Contact Number</th>
													<th class="column-title">Emergency Number</th>
													<th class="column-title">Birth Date</th>
													<th class="column-title">Certificate / Degree</th>
													<th class="column-title">Name of Next Kin</th>
													<th class="column-title">Relationship</th>
													<th class="column-title">Employee ID</th>
													<th class="column-title">Department</th>
													<th class="column-title">Designation</th>
													<th class="column-title">Start Date:</th>
													<th class="column-title">Work Location</th>
													<th class="column-title">Work Phone</th>
													<th class="column-title">Cell Phone</th>
													<th class="column-title">Cell Phone</th>
													<th class="column-title">Salary</th>
													<th class="column-title">Phone No.</th>
													<th class="column-title">CNIC</th>
													<th class="column-title">Email</th>
													
												
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
									</div>
								</div>
							</div>
						</div>
					</div>


				
			</div>
			<div class="fade" id="addEmployeeForm">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Add Employees</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="addEmployee()"
							class="form-horizontal">
							<fieldset>
		
								<div class="form-group">
		
		
									<div class="col-md-6">
								
										<label class="control-label" for="textinput">Full Name:<span
											class="required">*</span>
										</label>
										
											<input id="empcode" required="required" ng-model="editEmployee.txtEmployeeCode"
												name="empcode" type="text"
												class="form-control input-md requiredField">
										</div>
										<div class="col-md-6">
									<label class="control-label" for="textinput">Father Name:<span class="required">*</span>
										</label>
										
											<input id="name" required="required" ng-minlength="3"
												ng-maxlength="50" ng-model="editEmployee.txtEmployeeName"
												name="name" type="text" 
												class="form-control input-md requiredField">
										</div>
										</div>
								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">SAP
											Code:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>
		
									</div>
		
									<div class="col-md-6">
										<label class="control-label" for="textinput">Address:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
		
		
								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Gender:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>
		
									</div>
		
									<div class="col-md-6">
										<label class="control-label" for="textinput">Emergency Number:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
		
								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Date Birth:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>
		
									</div>
		
									<div class="col-md-6">
										<label class="control-label" for="textinput">Martial Status:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
		
								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Certificate / Degree:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>
		
									</div>
		
									<div class="col-md-6">
										<label class="control-label" for="textinput">Name of Next Kim:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>	
								
								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Relationship:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>
		
									</div>
		
									<div class="col-md-6">
										<label class="control-label" for="textinput">Employee ID:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Department:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>
		
									</div>
		
									<div class="col-md-6">
										<label class="control-label" for="textinput">Designation:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
		
								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Start Date:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>
		
									</div>
		
									<div class="col-md-6">
										<label class="control-label" for="textinput">Work Location:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
		
								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Work Phone:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>
		
									</div>
		
									<div class="col-md-6">
										<label class="control-label" for="textinput">Cell Phone:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
		
							
		
		
								<div class="form-group">
									<div class="col-md-6">
		
										<label class="control-label" for="textinput">CNIC:<span
											class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtCnic">
									</div>
		
									<div class="col-md-6">
										<label class="control-label" for="textinput">Mobile
											Number:</span>
										</label> <input id="contact_no" ng-minlength="10" ng-maxlength="16"
											ng-model="newHrEmployeeSetup.txtMobileNo" name="contactNo"
											type="text" placeholder="+923331234567"
											class="form-control input-md">
									</div>
								</div>
		
							<div class="form-group">
								<div class="col-md-6">
									<label class="control-label" for="textinput">Email.:
									</label>
									
										<input id="txtCnicNo" 
											ng-model="newHrEmployeeSetup.txtEmail" name="txtEmailAddress"
											type="text" class="form-control input-md requiredField">
									</div>
								<div class="col-md-6">
										<label class="control-label" for="textinput">Area :<span
											class="required">*</span>
										</label> <select id="areaId"
											ng-model="newHrEmployeeSetup.cfgTblArea.serAreaId" required
											name="areaId" class="form-control input-md requiredField"
											ng-options="filteredArea.serAreaId as filteredArea.txtAreaName for filteredArea in lstArea | orderBy:'txtAreaName' ">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
								
									</div>
		
									<div class="form-group">
										<div class="col-md-12">
											<label class="control-label" for="textinput">Salary:<span class="required">*</span>
											</label> <input type="text" name="code"
												class="form-control input-md requiredField"
												ng-model="newHrEmployeeSetup.txtEmployeeCode" required>
		
										</div>
		
										<!-- <div class="col-md-6">
											<label class="control-label" for="textinput">Martial Status:<span class="required">*</span>
											</label> <input id="name" required="required" ng-minlength="3"
												ng-maxlength="50"
												ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
												type="text" class="form-control input-md requiredField">
										</div> -->
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
			<!-- /page content -->

			<!-- /padding -->
		</div>
		<!-- /main -->
</div>
	</div>
	<div class="modal fade" id="confirmModel" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;">&times;</button>
					<modalTitle>Are you sure you want to Delete the
					selected Employee(s)?</modalTitle>
				</div>
				<div class="modal-footer">
					<div class="actionButton"
						style="margin: 10px 20px 0 0; text-align: right; background: none">
						<button style="background: #FDCA01; color: #000" type="button"
							class="" data-dismiss="modal" aria-label="Close" id="noButton">
							<i class="fa"></i><span>No</span>
						</button>
						<button style="background: #FDCA01; color: #000"
							ng-click="deleteEmployee()" type="button" class=""
							data-dismiss="modal" aria-label="Close" id="yesButton">
							<i class="fa"></i>&nbsp;<span>Yes</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- employee dialoge box  -->

	<!-- <div class="modal fade" id="addEmployeeForm" tabindex="-1" role="dialog"
		aria-labelledby="addEmployee">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Add Employee</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="addEmployee()"
							class="form-horizontal">
							<fieldset>

								<div class="form-group">


									<div class="col-md-6">
								
										<label class="control-label" for="textinput">Full Name:<span
											class="required">*</span>
										</label>
										
											<input id="empcode" required="required" ng-model="editEmployee.txtEmployeeCode"
												name="empcode" type="text"
												class="form-control input-md requiredField">
										</div>
										<div class="col-md-6">
									<label class="control-label" for="textinput">Father Name:<span class="required">*</span>
										</label>
										
											<input id="name" required="required" ng-minlength="3"
												ng-maxlength="50" ng-model="editEmployee.txtEmployeeName"
												name="name" type="text" 
												class="form-control input-md requiredField">
										</div>
										</div>
								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">SAP
											Code:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>

									</div>

									<div class="col-md-6">
										<label class="control-label" for="textinput">Address:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>


								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Gender:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>

									</div>

									<div class="col-md-6">
										<label class="control-label" for="textinput">Emergency Number:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>

								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Date Birth:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>

									</div>

									<div class="col-md-6">
										<label class="control-label" for="textinput">Martial Status:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>

								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Certificate / Degree:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>

									</div>

									<div class="col-md-6">
										<label class="control-label" for="textinput">Name of Next Kim:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>	
								
								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Relationship:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>

									</div>

									<div class="col-md-6">
										<label class="control-label" for="textinput">Employee ID:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Department:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>

									</div>

									<div class="col-md-6">
										<label class="control-label" for="textinput">Designation:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>

								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Start Date:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>

									</div>

									<div class="col-md-6">
										<label class="control-label" for="textinput">Work Location:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>

								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Work Phone:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>

									</div>

									<div class="col-md-6">
										<label class="control-label" for="textinput">Cell Phone:<span class="required">*</span>
										</label> <input id="name" required="required" ng-minlength="3"
											ng-maxlength="50"
											ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
											type="text" class="form-control input-md requiredField">
									</div>
								</div>

							


								<div class="form-group">
									<div class="col-md-6">

										<label class="control-label" for="textinput">CNIC:<span
											class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtCnic">
									</div>

									<div class="col-md-6">
										<label class="control-label" for="textinput">Mobile
											Number:</span>
										</label> <input id="contact_no" ng-minlength="10" ng-maxlength="16"
											ng-model="newHrEmployeeSetup.txtMobileNo" name="contactNo"
											type="text" placeholder="+923331234567"
											class="form-control input-md">
									</div>
								</div>

							<div class="form-group">
								<div class="col-md-6">
									<label class="control-label" for="textinput">Email.:
									</label>
									
										<input id="txtCnicNo" 
											ng-model="newHrEmployeeSetup.txtEmail" name="txtEmailAddress"
											type="text" class="form-control input-md requiredField">
									</div>
								<div class="col-md-6">
										<label class="control-label" for="textinput">Area :<span
											class="required">*</span>
										</label> <select id="areaId"
											ng-model="newHrEmployeeSetup.cfgTblArea.serAreaId" required
											name="areaId" class="form-control input-md requiredField"
											ng-options="filteredArea.serAreaId as filteredArea.txtAreaName for filteredArea in lstArea | orderBy:'txtAreaName' ">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
								
									</div>

									<div class="form-group">
										<div class="col-md-12">
											<label class="control-label" for="textinput">Salary:<span class="required">*</span>
											</label> <input type="text" name="code"
												class="form-control input-md requiredField"
												ng-model="newHrEmployeeSetup.txtEmployeeCode" required>
	
										</div>
	
										<!-- <div class="col-md-6">
											<label class="control-label" for="textinput">Martial Status:<span class="required">*</span>
											</label> <input id="name" required="required" ng-minlength="3"
												ng-maxlength="50"
												ng-model="newHrEmployeeSetup.txtEmployeeName" name="name"
												type="text" class="form-control input-md requiredField">
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
	</div> -->
	<!-- employee dialoge box  -->







	<!-- <div class="fade" id="addEmployeeForm"
		>
		<div class="modal-dialog">
			
		</div>
	</div> -->


	<!-- Edit Hostel Dialog Starts  -->
 	<div class="modal fade" id="editEmployeeForm" tabindex="-1" role="dialog"
		aria-labelledby="editHostel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Edit Employee</modalTitle>
				</div>

				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" ng-submit="updateEmployee()"
							class="form-horizontal">
							<fieldset>

								<!-- Text input-->
								<div class="form-group">
									
								<div class="col-md-6">
								
									<label class="control-label" for="textinput">SAP Code:<span
										class="required">*</span>
									</label>
									
										<input id="empcode" required="required" ng-model="editEmployee.txtEmployeeCode"
											name="empcode" type="text"
											class="form-control input-md requiredField">
									</div>
									<div class="col-md-6">
								<label class="control-label" for="textinput">Employee Name:<span class="required">*</span>
									</label>
									
										<input id="name" required="required" ng-minlength="3"
											ng-maxlength="50" ng-model="editEmployee.txtEmployeeName"
											name="name" type="text" 
											class="form-control input-md requiredField">
									</div>
								
									
								</div>
							
							
							  	<div class="form-group">
									<div class="col-md-6">

										<label class="control-label" for="textinput">CNIC:<span
											class="required"></span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="editEmployee.txtCnic">
									</div>

									<div class="col-md-6">
										<label class="control-label" for="textinput">Mobile
											Number:</span>
										</label> <input id="contact_no" ng-minlength="10" ng-maxlength="16"
											ng-model="editEmployee.txtMobileNo" name="contactNo"
											type="text" placeholder="+923331234567"
											class="form-control input-md">
									</div>
								</div>
<div class="form-group">
								
								<div class="col-md-6">
									<label class="control-label" for="textinput">Email.:
									</label>
									
										<input id="txtCnicNo" 
											ng-model="editEmployee.txtEmail" name="txtEmailAddress"
											type="text" class="form-control input-md requiredField">
									</div>
								
								
									<div class="col-md-6">
										<label class="control-label" for="textinput">Area :<span
											class="required">*</span>
										</label> <select id="areaId"
											ng-model="editEmployee.cfgTblArea.serAreaId" required
											name="areaId" class="form-control input-md requiredField"
											ng-options="filteredArea.serAreaId as filteredArea.txtAreaName for filteredArea in lstArea | orderBy:'txtAreaName' ">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
								
					

									
						      </div>	
					 
									
<div class="form-group">

								
									<div class="col-md-6"></div>
									<label class="control-label" for="textinput"
										id="cname">Active:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									<input type="checkbox" id="empstat" name="empstat"
											 ng-model="editEmployee.blnStatus"
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
	<script src="<c:url value="/resources/js/Setup/Employee2.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
