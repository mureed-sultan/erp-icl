<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<script
	src="<c:url value="/resources/js/angular.min.js"/>">
</script>

<!-- <script>
            $(function () {
                $("#dob").datepicker({ dateFormat: "yyyy-mm-dd" });
            });
        </script> -->
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
<script src="<c:url value="/resources/js/jquery-1.12.4.min.js"/>"></script>+
<style>
    .vertical-heading {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        white-space: nowrap;
    }
    .center-text {
        text-align: center;
        vertical-align: middle !important;
        text-wrap: balance !important;
    }
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
										<h2>Add Overtime</h2>
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
                                        <table ng-table="user-table" class="table table-striped jambo_table bulk_action custom-table">
                                            <thead>
                                                <tr class="headings">
                                                    <th rowspan="2" class="center-text">S. No.</th>
                                                    <th rowspan="2" class="center-text">Department</th>
                                                    <th rowspan="2" class="center-text">Employee Code</th>
                                                    <th rowspan="2" class="center-text">Employee Name</th>
                                                    <th rowspan="2" class="center-text">Father Name</th>
                                                    <th rowspan="2" class="center-text">Designation</th>
                                                    <th rowspan="2" class="center-text vertical-heading">Present Days</th>
                                                    <th rowspan="2" class="center-text vertical-heading">Absent Days</th>
                                                    <th rowspan="2" class="center-text vertical-heading">Leave Days</th>
                                                    <th rowspan="2" class="center-text vertical-heading">Holidays</th>
                                                    <th rowspan="2" class="center-text vertical-heading">Weekly Off Days</th>
                                                    <th rowspan="2" class="center-text vertical-heading">Total Days</th>
                                                    <th rowspan="2" class="center-text vertical-heading">Late Time Minutes</th>
                                                    <th rowspan="2" class="center-text vertical-heading">Short Leave Minutes</th>
                                                    <th rowspan="2" class="center-text vertical-heading">Basic Pay</th>
                                                    <th rowspan="2" class="center-text vertical-heading">House Rent</th>
                                                    <th rowspan="2" class="center-text vertical-heading">Utility Allowances</th>
                                                    <th rowspan="2" class="center-text vertical-heading">Medical Allowances</th>
                                                    <th colspan="9" class="center-text">Deductions</th>
                                                    <th rowspan="2" class="center-text">Total Deduction</th>
                                                    <th rowspan="2" class="center-text">Net Payable Salary</th>
                                                </tr>
                                                <tr class="headings">
                                                    <th class="center-text">Advance</th>
                                                    <th class="center-text">Loan</th>
                                                    <th class="center-text">Canteen</th>
                                                    <th class="center-text">Income Tax</th>
                                                    <th class="center-text">EOBI</th>
                                                    <th class="center-text">Late Time</th>
                                                    <th class="center-text">Short Leave</th>
                                                    <th class="center-text">Leave Without Pay</th>
                                                    <th class="center-text">Other Deduction</th>
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>IT</td>
                                                    <td>EMP001</td>
                                                    <td>John Doe</td>
                                                    <td>James Doe</td>
                                                    <td>Software Engineer</td>
                                                    <td>20</td>
                                                    <td>2</td>
                                                    <td>3</td>
                                                    <td>1</td>
                                                    <td>2</td>
                                                    <td>30</td>
                                                    <td>15</td>
                                                    <td>5</td>
                                                    <td>5000</td>
                                                    <td>1500</td>
                                                    <td>200</td>
                                                    <td>300</td>
                                                    <td>50</td>
                                                    <td>30</td>
                                                    <td>20</td>
                                                    <td>100</td>
                                                    <td>50</td>
                                                    <td>10</td>
                                                    <td>5</td>
                                                    <td>30</td>
                                                    <td>160</td>
                                                    <td>455</td>
                                                    <td>4750</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Finance</td>
                                                    <td>EMP002</td>
                                                    <td>Jane Doe</td>
                                                    <td>Jerry Doe</td>
                                                    <td>Accountant</td>
                                                    <td>22</td>
                                                    <td>1</td>
                                                    <td>2</td>
                                                    <td>2</td>
                                                    <td>1</td>
                                                    <td>30</td>
                                                    <td>10</td>
                                                    <td>3</td>
                                                    <td>5500</td>
                                                    <td>1200</td>
                                                    <td>180</td>
                                                    <td>250</td>
                                                    <td>40</td>
                                                    <td>25</td>
                                                    <td>15</td>
                                                    <td>90</td>
                                                    <td>40</td>
                                                    <td>8</td>
                                                    <td>4</td>
                                                    <td>25</td>
                                                    <td>140</td>
                                                    <td>397</td>
                                                    <td>5103</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                        
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
	<div class="modal fade" id="addEmployeeForm" tabindex="-1" role="dialog"
		aria-labelledby="addEmployee">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Add Employee Benefit</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="addEmployee()"
							class="form-horizontal">
							<fieldset>

								<div class="form-group">
									<div class="col-md-12">
										<label class="control-label" for="textinput">Employee:<span class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtEmployeeCode" required>

									</div>

								</div>



								<div class="form-group">
									<div class="col-md-12">

										<label class="control-label" for="textinput">Benefit:<span
											class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											ng-model="newHrEmployeeSetup.txtCnic">
									</div>

								</div>

							<div class="form-group">
								<div class="col-md-12">
									<label class="control-label" for="textinput">Pay Rate:
									</label>
									
										<input id="txtCnicNo" 
											ng-model="newHrEmployeeSetup.txtEmail" name="txtEmailAddress"
											type="text" class="form-control input-md requiredField">
								</div>
								
							</div>	
                            <div class="form-group">
								<div class="col-md-12">
									<label class="control-label" for="textinput">Effective Form:
									</label>
									
										<input id="txtCnicNo" 
											ng-model="newHrEmployeeSetup.txtEmail" name="txtEmailAddress"
											type="text" class="form-control input-md requiredField">
								</div>
								
							</div>	
                            <div class="form-group">
								<div class="col-md-12">
									<label class="control-label" for="textinput">Active:
									</label>
									
										<input id="txtCnicNo" 
											ng-model="newHrEmployeeSetup.txtEmail" name="txtEmailAddress"
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
	</div>

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
