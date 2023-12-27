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
    .flex-item-center{
        display: flex !important;
        align-items: center;
        gap: 10px;
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
										<h2>Update Vaction Request</h2>
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
                                                <th class="column-title">ID</th>
                                                <th class="column-title">Name</th>
                                                <th class="column-title">Age</th>
                                                <th class="column-title">Relationship</th>
                                                <th class="column-title">Assign Visa Package</th>
                                            
                                                <th class="column-title">Has Ticket</th>
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
					<modalTitle>Add Holiday</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="addEmployee()"
							class="form-horizontal">
							<fieldset>

								<div class="form-group">
									<div class="col-md-6">
										<label class="control-label" for="textinput">Employee ID:<span class="required">*</span>
										</label>  <select type="text" name="code"
                                        class="form-control input-md requiredField"
                                        >
                                    <option>1</option>
                                    <option>2</option>
                                    </select>

									</div>	<div class="col-md-6">
										<label class="control-label" for="textinput">Employee Name:<span class="required">*</span>
										</label> 
                                        <input type="text" name="code"
											class="form-control input-md requiredField"
											>
									</div>
								</div>



								<div class="form-group">
									<div class="col-md-6">

										<label class="control-label" for="textinput">Annual Date:<span
											class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											>
									</div>	
                                    <div class="col-md-6">

										<label class="control-label" for="textinput">Vacation Type:<span
											class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											>
									</div>

								</div>
                                <div class="form-group">
									<div class="col-md-6">

										<label class="control-label" for="textinput">Annual Date:<span
											class="required">*</span>
										</label>
                                         <input type="text" name="code" placeholder="Employee Only"
											class="form-control input-md requiredField"
											>
									</div>	
                                    <div class="col-md-6">

										<label class="control-label" for="textinput">Vacation Type:<span
											class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											>
									</div>

								</div>             
                                 <div class="form-group">
									<div class="col-md-6">

										<label class="control-label" for="textinput">Vacation From:<span
											class="required">*</span>
										</label>
                                         <input type="text" name="code" placeholder="Employee Only"
											class="form-control input-md requiredField"
											>
									</div>	
                                    <div class="col-md-6">

										<label class="control-label" for="textinput">Vacation To:<span
											class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											>
									</div>

								</div>                 
                                  <div class="form-group">
									<div class="col-md-6">

										<label class="control-label" for="textinput">Current Balance From:<span
											class="required">*</span>
										</label>
                                         <input type="text" name="code" placeholder="Employee Only"
											class="form-control input-md requiredField"
											>
									</div>	
                                    <div class="col-md-6">

										<label class="control-label" for="textinput">Vaction Balance:<span
											class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											>
									</div>

								</div>
              <div class="form-group">
									<div class="col-md-6">

										<label class="control-label" for="textinput">Number of Days:<span
											class="required">*</span>
										</label>
                                         <input type="text" name="code" placeholder="Employee Only"
											class="form-control input-md requiredField"
											>
									</div>	
                                    <div class="col-md-6">

										<label class="control-label" for="textinput">Assign Visa Package:<span
											class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											>
									</div>

								</div>
                                <div class="form-group">
									<div class="col-md-6">

										<label class="control-label" for="textinput">Number of Days:<span
											class="required">*</span>
										</label>
                                         <input type="text" name="code" placeholder="Employee Only"
											class="form-control input-md requiredField"
											>
									</div>	
                                    <div class="col-md-6">

										<label class="control-label" for="textinput">Assign Visa Package:<span
											class="required">*</span>
										</label> <input type="text" name="code"
											class="form-control input-md requiredField"
											>
									</div>

								</div>
                                <div class="form-group">
                                    <div class="col-md-6">
                                        <label class="control-label">Assign Visa Package:<span class="required">*</span></label>
                                        <div class="radio">
                                            <label class="flex-item-center">
                                                <input type="radio" name="visa_package" value="employee_only" checked> Employee Only
                                            </label>
                                        </div>
                                        <div class="radio">
                                            <label class="flex-item-center">
                                                <input type="radio" name="visa_package" value="employee_and_family"> Employee and Family
                                            </label>
                                        </div>
                                        <div class="radio">
                                            <label class="flex-item-center">
                                                <input type="radio" name="visa_package" value="family_only"> Family Only
                                            </label>
                                        </div>
                                    </div>
                                
                                    <div class="col-md-6">
                                        <label class="control-label">Outside Country & Need Visa:</label>
                                        <div class="checkbox">
                                            <label class="flex-item-center">
                                                <input type="checkbox" name="outside_country" value="yes"> Outside Country & Need Visa
                                            </label>
                                        </div>
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
