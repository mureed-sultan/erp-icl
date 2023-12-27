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

<title>Customer Portal</title>
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

	<div class="wrapper" ng-controller="passwordPolicyCtrl"
		data-ng-init="init()">
		<div class="box">
		


				<!-- sidebar -->
				<%@include file="../common/navigationPane.jsp"%>

				<!-- /sidebar -->

				<!-- main right col -->
				<%@include file="../common/topMenu.jsp"%>
				<!-- /top nav -->

				<!-- page content -->
				<div class="right_col" passwordPolicy="main">
					<div class="">

					
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>Password Policy</h2>
									</div>
									<div class="alert alert-danger alert-dismissible"
										style="display: none;" passwordPolicy="alert" id="addErrorAlert">
										<button type="button" class="close" data-dismiss="alert">×</button>
										<strong>Error: </strong>&nbsp;<span id="errMsgText"></span>
									</div>
									<div class="alert alert-success alert-dismissible"
										style="display: none;" passwordPolicy="alert" id="successAlert">
										<button type="button" class="close" data-dismiss="alert">×</button>
										<strong>Success: </strong>&nbsp;<span id="successMsgText"></span>
									</div>

									<div>
										<div class="form-group">
											<button id="addNewEntry" data-loading-text="Processing..."
												class="btn btn-success" data-toggle="modal"
												data-target="#addPasswordPolicyForm">
												<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Add New
												Entry
											</button>
											<!-- <button id="removeStores" data-loading-text="Processing..."
												data-toggle="modal" data-target="#confirmModel"
												class="btn btn-danger">
												<i class="glyphicon glyphicon-minus-sign"></i>&nbsp;Delete
												Entry
											</button> -->
										</div>
									</div>
<div class="table-container" id="table-resp">
									<div class="table-responsive">
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<th class="column-title">Sr. No.</th>
													<th class="column-title">Password Policy</th>
													<th class="column-title">History Count</th>
													<th class="column-title">Expiry Days</th>
													<th class="column-title">Password Attempts</th>
													<th class="column-title">Password Length</th>
													<th class="column-title">Number Required</th>
													<th class="column-title">Special Character Required</th>
													<th class="column-title">Lower Upper Letter</th>
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
	<div class="modal fade" id="confirmModel" tabindex="-1" passwordPolicy="dialog">
		<div class="modal-dialog" passwordPolicy="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;">&times;</button>
					<modalTitle>Are you sure you want to Delete the
					selected Password Policy(s)?</modalTitle>
				</div>
				<div class="modal-footer">
					<div class="actionButton"
						style="margin: 10px 20px 0 0; text-align: right; background: none">
						<button style="background: #FDCA01; color: #000" type="button"
							class="" data-dismiss="modal" aria-label="Close" id="noButton">
							<i class="fa"></i><span>No</span>
						</button>
						<button style="background: #FDCA01; color: #000"
							ng-click="deleteZone()" type="button" class=""
							data-dismiss="modal" aria-label="Close" id="yesButton">
							<i class="fa"></i>&nbsp;<span>Yes</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="addPasswordPolicyForm" tabindex="-1" passwordPolicy="dialog"
		aria-labelledby="addPasswordPolicy">
		<div class="modal-dialog" passwordPolicy="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Add PasswordPolicy</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="addPasswordPolicy()"
							class="form-horizontal">
							<fieldset>
								
                      
								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Password Policy 
										:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="txtCode" required="required"  
											ng-model="newCfgPasswordPolicySetup.txtCode" name="txtCode" type="text"
											class="form-control input-md requiredField">
									</div>
									<!-- <br/> -->
									
									
								</div>


                                <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">History
										Count:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="numHistoryCount" required="required"   
											ng-model="newCfgPasswordPolicySetup.numHistoryCount" name="numHistoryCount" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>
								
								 <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Expiry Days
										:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="numExpireDays" required="required"   
											ng-model="newCfgPasswordPolicySetup.numExpireDays" name="numExpireDays" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>
								
								 <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Incorrect password Attempts
										:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="numAttempt" required="required"   
											ng-model="newCfgPasswordPolicySetup.numAttempt" name="numAttempt" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>
								
								 <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Password Length
										:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="numPassLength" required="required"   
											ng-model="newCfgPasswordPolicySetup.numPassLength" name="numPassLength" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>
								
								
									<div class="form-group">
							
									
									<label class="col-md-4 control-label" for="textinput"
										id="isSet">Numeric Required:
									</label>
									<div class="col-md-2">
									<input type="checkbox" id="empisset" name="empisset"
											 ng-model="newCfgPasswordPolicySetup.blIsNumberRequired"
											class="form-control">
									</div>
									
									<label class="col-md-4 control-label" for="textinput"
										id="cname">Special Characters:
									</label>
									<div class="col-md-2">
									<input type="checkbox" id="empisSale" name="empisSale"
											 ng-model="newCfgPasswordPolicySetup.blIsSpecialChaReq"
											class="form-control">
									</div>
									
								
									
									
									
										
									
								</div>
								
								<div class="form-group">
								
									<label class="col-md-4 control-label" for="textinput"
										id="cname">Lower Upper Case:
									</label>
									<div class="col-md-2">
									<input type="checkbox" id="empstat" name="empstat"
											 ng-model="newCfgPasswordPolicySetup.blIsLowerUpper"
											class="form-control">
									</div>
								
								</div>
								</fieldset>
								
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
							
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Edit Hostel Dialog Starts  -->
 	<div class="modal fade" id="editPasswordPolicyForm" tabindex="-1" passwordPolicy="dialog"
		aria-labelledby="editHostel">
		<div class="modal-dialog" passwordPolicy="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Edit Password Policy</modalTitle>
				</div>

				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" ng-submit="updatePasswordPolicy()"
							class="form-horizontal">
							<fieldset>

								<!-- Text input-->
								
								

										<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Password Policy 
										:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="edittxtCode" required="required"  
											ng-model="editPasswordPolicy.txtCode" name="edittxtCode" type="text"
											class="form-control input-md requiredField">
									</div>
									<!-- <br/> -->
									
									
								</div>


                                <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">History
										Count:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="editnumHistoryCount" required="required"   
											ng-model="editPasswordPolicy.numHistoryCount" name="editnumHistoryCount" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>
								
								 <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Expiry Days
										:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="editnumExpireDays" required="required"   
											ng-model="editPasswordPolicy.numExpireDays" name="editnumExpireDays" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>
								
								 <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Incorrect password Attempts
										:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="editnumAttempt" required="required"   
											ng-model="editPasswordPolicy.numAttempt" name="editnumAttempt" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>
								
								 <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Password Length
										:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="editnumPassLength" required="required"   
											ng-model="editPasswordPolicy.numPassLength" name="editnumPassLength" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>
								
								
									<div class="form-group">
							
									
									<label class="col-md-4 control-label" for="textinput"
										id="isSet">Numeric Required:
									</label>
									<div class="col-md-2">
									<input type="checkbox" id="editempisset" name="editempisset"
											 ng-model="editPasswordPolicy.blIsNumberRequired"
											class="form-control">
									</div>
									
									<label class="col-md-4 control-label" for="textinput"
										id="editcname">Special Characters:
									</label>
									<div class="col-md-2">
									<input type="checkbox" id="empisSale" name="editempisSale"
											 ng-model="editPasswordPolicy.blIsSpecialChaReq"
											class="form-control">
									</div>
									
								
								</div>
								<div class="form-group">
								
									<label class="col-md-4 control-label" for="textinput"
										id="editcname">Lower Upper Case:
									</label>
									<div class="col-md-2">
									<input type="checkbox" id="empstat" name="empstat"
											 ng-model="editPasswordPolicy.blIsLowerUpper"
											class="form-control">
									</div>
									
									
								<label class="col-md-4 control-label" for="textinput"
										id="cname">Active:
									</label>
									<div class="col-md-2">
									<input type="checkbox" id="empstat" name="empstat"
											 ng-model="editPasswordPolicy.blnStatus"
											class="form-control">
									</div>
								</div>
								
								</fieldset>
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
							
						</form>
					</div>
				</div>

			</div>
		</div>
	</div> 



	<%@include file="../common/footer.jsp"%>
	<script src="<c:url value="/resources/js/Setup/PasswordPolicy.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
