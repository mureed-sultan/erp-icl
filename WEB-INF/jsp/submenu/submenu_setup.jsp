<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
	
	
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

<link rel="stylesheet"
	href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
 <script>
            $(function () {
                $("#dob").datepicker({ dateFormat: "dd-mm-yy" });
            });
        </script>
         <script>
            $(function () {
                $("#led").datepicker({ dateFormat: "dd-mm-yy" });
            });
        </script>
        <script>
            $(function () {
                $("#jd").datepicker({ dateFormat: "dd-mm-yy" });
            });
        </script>
 <script>
            $(function () {
                $("#red").datepicker({ dateFormat: "dd-mm-yy" });
            });
        </script>
        <script>
            $(function () {
                $("#ced").datepicker({ dateFormat: "dd-mm-yy" });
            });
        </script> 
         <script>
            $(function () {
                $("#dob1").datepicker({ dateFormat: "dd-mm-yy" });
            });
        </script>
         <script>
            $(function () {
                $("#led1").datepicker({ dateFormat: "dd-mm-yy" });
            });
        </script>
 <script>
            $(function () {
                $("#red1").datepicker({ dateFormat: "dd-mm-yy" });
            });
        </script>
        <script>
            $(function () {
                $("#ced1").datepicker({ dateFormat: "dd-mm-yy" });
            });
        </script> 
       

</head>

<body>
	<div class="se-pre-con">
		<div style="padding-left: 50%; padding-top: 20%">
			<img src="<c:url value="/resources/img/spinner.gif"/>">
		</div>
	</div>

	<div class="wrapper" ng-controller="userCtrl" data-ng-init="init()">
		<div class="box">
	


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
										<h2>Assign Rights</h2>
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

									
								<div class="form-group">
								<label class="col-md-2 control-label" for="textinput">Role:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<select class="form-control input-md selectpicker" 
											ng-options="role.serRoleId as role.txtRoleName for role in roles"
											
											data-error="Please select User Role" required="required" data-live-search="true"
											ng-model="newSubmenurole.cfgTblRole.serRoleId"   ng-change="OnRoleSelect(newSubmenurole.cfgTblRole.serRoleId)">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
									</div>
<!-- 									<button type="button" class="btn btn-primary" type="submit" -->
<!-- 									ng-click="showRights()"><i class="glyphicon glyphicon-plus-sign"></i>Show Rights</button> -->

                                    <div>
                                     <button type="button" class="btn btn-primary" type="submit"
									ng-click="refresh()">Load Data</button>
                                    </div>
									<div class="table-responsive">
									<table ng-table="user-table" id="data-table"
										class="table table-striped jambo_table bulk_action">
										<thead>
											<tr class="headings">
												
												<th class="column-title">SubMenu Name</th>
												<th class="column-title">Allow All</th>
												<th class="column-title">Allow View</th>
												<th class="column-title">Allow Add</th>
												<th class="column-title">Allow Edit</th>
												<th class="column-title">Allow Delete</th>
												
												

											</tr>
										</thead>

										<tbody>
											<tr ng-repeat="sub in Submenu">
												
												<td>{{sub.txtSubMenuName}}</td>
																		
												
												 <td><input type="checkbox" ng-model="sub.blIsAll" class="form-control" ng-click='onSelectAllClick(sub)'></td>
												<td><input type="checkbox" ng-model="sub.blIsview" class="form-control"></td>
												<td><input type="checkbox" ng-model="sub.blIsAdd" class="form-control"></td>
												<td><input type="checkbox" ng-model="sub.blIsUpdate" class="form-control"></td>
												<td><input type="checkbox" ng-model="sub.blIsDelete" class="form-control"></td>
												<!-- <td><input 
																ng-model="component.editable" type="text" ng_keyup="calculate()"
																class="form-control input-md table-field"></td> -->

											</tr>
										</tbody>
									</table>
								</div>
								 <div class="form-group">
								 
								 <button type="button" class="btn btn-primary" type="submit"
									ng-click="addNewSubMenuRoleinList()">Save Rights</button>
								
					
									<!-- 	<button id="addNewEntry1" class="btn btn-success" 
												donclick="addUser()"  style="float:right">
											<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Save Rights
										</button> -->
									
									</div> 
									<!-- <div class="table-responsive">
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
													<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<th class="column-title">Sr.No.</th>														
													<th class="column-title">User Name</th>
													
													<th class="column-title">Status</th>
													<th class="column-title">Transfer</th>
													<th class="column-title">Action</th>
													<th class="column-title">Profile Picture</th>
													<th class="column-title">Signature</th>
												</tr>
											</thead>

											<tbody>
												<tr>
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
	<div class="modal fade" id="confirmModel" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;">&times;</button>
					<modalTitle>Are you sure you want to Delete the
					selected User(s)?</modalTitle>
				</div>
				<div class="modal-footer">
					<div class="actionButton"
						style="margin: 10px 20px 0 0; text-align: right; background: none">
						<button style="background: #FDCA01; color: #000" type="button"
							class="" data-dismiss="modal" aria-label="Close" id="noButton">
							<i class="fa"></i><span>No</span>
						</button>
						<button style="background: #FDCA01; color: #000"
							ng-click="deleteUsers()" type="button" class=""
							data-dismiss="modal" aria-label="Close" id="yesButton">
							<i class="fa"></i>&nbsp;<span>Yes</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="addUserForm" tabindex="-1"
		role="dialog" aria-labelledby="addUser">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()"></button>
					<modalTitle>Add User</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm"
							ng-submit="addUser()" class="form-horizontal">
							<fieldset>
							
						
				<!-- 			<div class="input-box">
       <input  type="file" id="file" class="input-text" ngf-select ng-model="uploadFile" name="attachement" accept="image/png, image/jpeg, image/jpg, application/msword, application/vnd.ms-excel, application/pdf " />
    </div>
    
    <img  ngf-src="file_show" class="thumb">
    
     <img width="40" height="40" src="{{uploadFile}}" alt="">{{uploadFile}}+"----"+{{filename}} </img> -->
    
							<!-- <label class="col-md-4 control-label" for="textinput">Picture<span class="required">*</span></label>  
		                    <div class="col-md-4 form-group">
		                    
		                    
		                       <input type="file" name="uploadFile" id="uploadFile"  onchange="angular.element(this).scope().setFile(this)"  accept="image/*">
			                    </div>  -->
			                   
			                   
								<div class="form-group">
									
									<!-- <label class="col-md-4 control-label" for="textinput">User Code:<span
										class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="empcode" required="required"  ng-model="newUser.txtUserCode"
											name="empcode" type="text" 
											class="form-control input-md requiredField">
									</div> -->
									<label class="col-md-4 control-label" for="textinput">User Name:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="name" required="required"  ng-minlength="3"
											ng-maxlength="50" ng-model="newUser.txtUserName"
											name="name" type="text" 
											class="form-control input-md requiredField">
									</div>
								</div>
								<div class="form-group">
									<!-- <label class="col-md-4 control-label" for="textinput">S/o D/o W/o:<span
										class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="sodowo" required="required" ng-minlength="3"
											ng-maxlength="30" ng-model="newUser.txtSoDoWo"
											name="sodowo" type="text"
											class="form-control input-md requiredField">
									</div> -->
									<label class="col-md-4 control-label" for="textinput">Email:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="email"   ng-model="newUser.txtAddress"
											name="email" type="email" 
											class="form-control input-md requiredField">
									</div>
								</div>
								<div class="form-group">
									<!-- <label class="col-md-4 control-label" for="textinput">Date of Birth:<span
										class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="dob" required="required" ng-model="newUser.dteDob"
											name="dob" type="text"
											class="form-control input-md requiredField">
									</div> -->
									<label class="col-md-4 control-label" for="textinput">CNIC#:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="cnic" required="required" maxlength="15" data-error="Please enter in correct format" ng-model="newUser.txtCnic"
											name="cnic" type="text" ng-keydown="keydown()"
											class="form-control input-md requiredField">
									</div>
								</div>
								<!-- <div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Job Type:<span
										class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="jobtype" required="required" ng-model="newUser.txtJobType"
											name="jobtype" type="text"
											class="form-control input-md requiredField">
									</div>
									<label class="col-md-4 control-label" for="textinput">Department:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<select class="form-control input-md selectpicker" ng-change=""
											ng-options="department.serDepartmentId as department.txtDepartmentName for department in departments"
											data-error="Please select Department" required="required" data-live-search="true"
											ng-model="newUser.citTableDepartment.serDepartmentId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
								</div> -->
								
								<div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Role:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<select class="form-control input-md selectpicker" ng-change=""
											ng-options="role.serRoleId as role.txtRoleName for role in roles"
											data-error="Please select User Role" required="required" data-live-search="true"
											ng-model="newUser.cfgTblRole.serRoleId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
									<!-- <label class="col-md-4 control-label" for="textinput">Marital Status:<span class="required">*</span>
									</label>

									<div class="col-md-6">
										<select id="mstat" ng-model="newUser.txtMaritalStatus"
											name="mstat" class="form-control input-md requiredField selectpicker"
											required="required" ng-change="" data-live-search="true">
											<option value="">--Select--</option>
											<option value="Single">Single</option>
											<option value="Married">Married</option>

										</select>

									</div> -->

								</div>
								
								<!-- <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Base Location:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<select class="form-control input-md selectpicker" ng-change=""
											ng-options="area.serAreaId as area.txtAreaName for area in areas"
											data-error="Please select Area" required="required" data-live-search="true"
											ng-model="newUser.citAreaSetup1.serAreaId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
									<label class="col-md-4 control-label" for="textinput">Current Location:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<select class="form-control input-md selectpicker" ng-change=""
											ng-options="area.serAreaId as area.txtAreaName for area in areas"
											data-error="Please select Area" required="required" data-live-search="true"
											ng-model="newUser.citAreaSetup2.serAreaId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
								
								</div> -->
								
								


								<div class="form-group">
									
									<label class="col-md-4 control-label" for="textinput">Contact
										Number:</span>
									</label>
									<div class="col-md-6">
										<input id="contact_no"  ng-minlength="10"
											ng-maxlength="16" ng-model="newUser.txtContactNo"
											name="contactNo" type="text" placeholder="+92 331 538 8366"
											class="form-control input-md">
									</div>
								</div>


								<!-- <div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Is Active<span class="required"></span>
									</label>
									<div class="col-md-6">
								<input id="datepicker" required="required"
											ng-model="newWarden.dateOfJoining" name="dateOfJoining" type="text"
											class="form-control input-md requiredField">

								</div>
								</div> -->
								
								
								<!--  <div class="form-group">
								 <label class="col-md-4 control-label" for="textinput">User Profile Picture:<span class="required"></span>
									</label>
			                    <div class="col-md-6">
										<input type='file' name="uploadFile" id="uploadFile"
											onchange="angular.element(this).scope().readUser_pic(this);"
											accept="image/*" /> <img id="blah" src="#"  />
									</div>
									
									<label class="col-md-4 control-label" for="textinput">User Signature:<span class="required"></span>
									</label>
									 <div class="col-md-6">
										<input type='file' name="uploadFile_sign" id="uploadFile_sign"
											onchange="angular.element(this).scope().readUser_sign(this);"
											accept="image/*" /> <img id="blah_sign" src="#"  />
									</div>
									
			                    </div> -->

								<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="addCloseButton"
													class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
											</div>
											 <!-- ng-disabled="addGroupForm.$invalid" -->
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

	<!-- Edit  Dialog Starts  -->
	<div class="modal fade" id="editUserForm" tabindex="-1"
		role="dialog" aria-labelledby="editUser">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Edit User </modalTitle>
				</div>

				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" ng-submit="updateUser()"
							class="form-horizontal">
							<fieldset>
								
							<div class="form-group">
									<!-- <label class="col-md-4 control-label" for="textinput">User Code:<span
										class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="empcode" required="required" readonly="readonly" ng-model="editUser.txtUserCode"
											name="empcode" type="text"
											class="form-control input-md requiredField">
									</div> -->
									<label class="col-md-4 control-label" for="textinput">User Name:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="name" required="required" ng-minlength="3"
											ng-maxlength="50" ng-model="editUser.txtUserName"
											name="name" type="text" 
											class="form-control input-md requiredField">
									</div>
								</div>
								<div class="form-group">
									<!-- <label class="col-md-4 control-label" for="textinput">S/o D/o W/o:<span
										class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="sodowo" required="required" ng-minlength="3"
											ng-maxlength="30" ng-model="editUser.txtSoDoWo"
											name="sodowo" type="text"
											class="form-control input-md requiredField">
									</div> -->
									<label class="col-md-4 control-label" for="textinput">Email:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="email"   ng-model="editUser.txtAddress"
											name="email" type="email" 
											class="form-control input-md requiredField">
									</div>
								</div>
								<div class="form-group">
									<!-- <label class="col-md-4 control-label" for="textinput">Date of Birth:<span
										class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="dob1" required="required" ng-model="editUser.dteDob"
											name="dob" type="text"
											class="form-control input-md requiredField">
									</div> -->
									<label class="col-md-4 control-label" for="textinput">CNIC#:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="cnic1" required="required" ng-maxlength="15" ng-model="editUser.txtCnic"
											name="cnic" type="text" ng-keydown="keydown1()"
											class="form-control input-md requiredField">
									</div>
								</div>
								<!-- <div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Job Type:<span
										class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="jobtype" required="required" ng-model="editUser.txtJobType"
											name="jobtype" type="text"
											class="form-control input-md requiredField">
									</div>
									<label class="col-md-4 control-label" for="textinput">Department:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<select class="form-control input-md " ng-change=""  id="editdept"
											ng-options="department.serDepartmentId as department.txtDepartmentName for department in departments"
											data-error="Please select Department" required="required" data-live-search="true"
											ng-model="editUser.citTableDepartment.serDepartmentId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
								</div> -->
								
								<div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Role:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<select class="form-control input-md " ng-change="" id="editdesig"
											ng-options="role.serRoleId as role.txtRoleName for role in roles"
											data-error="Please select user Role" required="required" data-live-search="true"
											ng-model="editUser.cfgTblRole.serRoleId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
									<!-- <label class="col-md-4 control-label" for="textinput">Marital Status:<span class="required">*</span>
									</label>

									<div class="col-md-6">
										<select id="mstat1" ng-model="editUser.txtMaritalStatus" 
											name="mstat" class="form-control input-md requiredField "
											required="required" ng-change="" data-live-search="true">
											<option value="">--Select--</option>
											<option value="Single">Single</option>
											<option value="Married">Married</option>

										</select>

									</div>
 -->
								</div>
								<!-- <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Base Location:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<select class="form-control input-md " ng-change="" id="editbl"
											ng-options="area.serAreaId as area.txtAreaName for area in areas"
											data-error="Please select Area" required="required" data-live-search="true"
											ng-model="editUser.citAreaSetup1.serAreaId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
									<label class="col-md-4 control-label" for="textinput">Current Location:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<select class="form-control input-md " ng-change="" id="editcl"
											ng-options="area.serAreaId as area.txtAreaName for area in areas"
											data-error="Please select Area" required="required" data-live-search="true"
											ng-model="editUser.citAreaSetup2.serAreaId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
								
								</div> -->
								

								<div class="form-group">	
									<label class="col-md-4 control-label" for="textinput">Contact
										Number:</span>
									</label>
									<div class="col-md-6">
										<input id="contact_no"  ng-minlength="10"
											ng-maxlength="16" ng-model="editUser.txtContactNo"
											name="contactNo" type="text" placeholder="+92 331 538 8366"
											class="form-control input-md">
									</div>
									
									<label class="col-md-4 control-label" for="textinput"
										id="cname">Active:<span class="required">*</span>
									</label>
									<div class="col-md-6">
									<input type="checkbox" id="empstat" name="empstat"
											 ng-model="editUser.blnStatus"
											class="form-control">
									</div>
								</div>					

								
					<!-- </div>
				</div> -->
				<!-- <button type="button" id="back"
					class="btn btn-success 	glyphicon glyphicon-arrow-left"
					ng-click="previousUser()" style="float: left;">Previous</button>
				<button type="button" id="next"
					class="btn btn-success 	glyphicon glyphicon-arrow-right"
					ng-click="nextUser()" style="float: right;">Next</button> -->


				<div class="modal-footer">
					<div class="form-group">
						<div class="col-md-12">
							<div style="float: left;">
								<button type="button" id="addCloseButton1"
									class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
							</div>
							<div style="float: right;">
								<input type="submit" value="Submit" class="btn btn-warning" />
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

	<!-- Edit  Dialog Ends -->
	
		<!-- Edit  Dialog Starts  -->
	<div class="modal fade" id="editLocationForm" tabindex="-1"
		role="dialog" aria-labelledby="editUser">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Edit User </modalTitle>
				</div>

				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" ng-submit="updateUserLocation()"
							class="form-horizontal">
							<fieldset>
								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">User Code:<span
										class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="empcode" required="required" readonly="readonly" ng-model="editUser.txtUserCode"
											name="empcode" type="text"
											class="form-control input-md requiredField">
									</div>
									<label class="col-md-4 control-label" for="textinput">User Name:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="name" required="required" ng-minlength="3"  readonly
											ng-maxlength="50" ng-model="editUser.txtUserName"
											name="name" type="text" 
											class="form-control input-md requiredField">
									</div>
								</div>
								
								<div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Base Location:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<select class="form-control input-md" ng-change="" readonly
											ng-options="area.serAreaId as area.txtAreaName for area in areas"
											data-error="Please select Area" required="required"
											ng-model="editUser.citAreaSetup1.serAreaId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
									<label class="col-md-4 control-label" for="textinput">Current Location:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<select class="form-control input-md" ng-change=""
											ng-options="area.serAreaId as area.txtAreaName for area in areas"
											data-error="Please select Area" required="required"
											ng-model="editUser.citAreaSetup2.serAreaId">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
									</div>
								
								</div>
													

								
					<!-- </div>
				</div> -->
				<!-- <button type="button" id="back"
					class="btn btn-success 	glyphicon glyphicon-arrow-left"
					ng-click="previousUser()" style="float: left;">Previous</button>
				<button type="button" id="next"
					class="btn btn-success 	glyphicon glyphicon-arrow-right"
					ng-click="nextUser()" style="float: right;">Next</button> -->


				<div class="modal-footer">
					<div class="form-group">
						<div class="col-md-12">
							<div style="float: left;">
								<button type="button" id="addCloseButton2"
									class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
							</div>
							<div style="float: right;">
								<input type="submit" value="Submit" class="btn btn-warning" />
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
	<script src="<c:url value="/resources/js/submenu/submenu_setup.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
		<script src="<c:url value="/resources/js/bootstrap-select.min.js"/>"></script>
	
	<script>
	 function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    } 
	</script>

</body>

</html>
