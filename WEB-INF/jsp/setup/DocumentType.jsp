<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js">
</script> -->
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

	<div class="wrapper" ng-controller="documentTypeCtrl"
		data-ng-init="init()">
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
										<h2>DocumentType</h2>
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

									<div>
										<div class="form-group">
											<button id="addNewEntry" data-loading-text="Processing..."
												class="btn btn-success" data-toggle="modal"
												data-target="#addDocumentTypeForm">
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

									<div class="table-responsive">
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th>
													<th class="column-title">Sr. No.</th>
													<!-- <th class="column-title">DocumentType Code</th> -->
													<th class="column-title"> Code</th>
													<th class="column-title"> Text</th>
													<th class="column-title">Status</th>
												</tr>
											</thead>

											<tbody>
												<tr>
												<!-- 	<td></td> -->
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
	<div class="modal fade" id="confirmModel" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;">&times;</button>
					<modalTitle>Are you sure you want to Delete the
					selected DocumentType(s)?</modalTitle>
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
	<div class="modal fade" id="addDocumentTypeForm" tabindex="-1" role="dialog"
		aria-labelledby="addDocumentType">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Add DocumentType</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="addDocumentType()"
							class="form-horizontal">
							<fieldset>
								<!--  <div class="form-group">
									<label class="control-label" for="textinput">Zone
										<span class="required">*</span>
									</label>
									 <div class="col-md-6 form-group">
										<select class="form-control input-md" ng-change=""
											ng-options="CfgZoneSetup.txtZoneCode as CfgZoneSetup.txtZoneName for CfgZoneSetup in CfgZoneSetup"
											data-error="Please select Region " required="required"
											ng-model="newCfgAreaSetup.citZoneSetup.txtZoneCode">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
										
									</div>
                                 </div>
								 -->

								<!-- Text input-->
                      
							<!-- 	<div class="form-group">
									<label class="control-label" for="textinput">DocumentType 
										Code:<span class="required">*</span>
									</label>
									<div class="col-md-6">
										<input id="itemCode1" required="required" ng-minlength="4" ng-maxlength="30" 
											ng-model="newCfgDocumentTypeSetup.txtDocumentTypeCode" name="itemCode1" type="text"
											class="form-control input-md requiredField">
									</div>
									<br/>
									
									
								</div> -->


                                <div class="form-group">
                                <div class="col-md-6">
								<label class="control-label" for="textinput">
										code:<span class="required">*</span>
									</label>
									
										<input id="itemName1" required="required"   ng-minlength="4" ng-maxlength="50"
											ng-model="newCfgDocumentTypeSetup.txtCode" name="itemName1" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>
								
								 <div class="form-group">
                                <div class="col-md-6">
								<label class="control-label" for="textinput">
										Text:<span class="required">*</span>
									</label>
									
										<input id="itemName1" required="required"   ng-minlength="4" ng-maxlength="50"
											ng-model="newCfgDocumentTypeSetup.txtName" name="itemName1" type="text"
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
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Edit Hostel Dialog Starts  -->
 	<div class="modal fade" id="editDocumentTypeForm" tabindex="-1" role="dialog"
		aria-labelledby="editHostel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Edit DocumentType</modalTitle>
				</div>

				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" ng-submit="updateDocumentType()"
							class="form-horizontal">
							<fieldset>

								<!-- Text input-->
<div class="form-group">
	                          	<div class="col-md-8">
                              <label class="control-label" for="textinput">
										Code:<span class="required">*</span>
									</label>
								
										<input id="itemName" required="required" ng-maxlength="50"
											ng-model="editDocumentType.txtCode" name="itemName"
											type="text" class="form-control input-md requiredField">
									</div>

								</div>
								
	                          <div class="form-group">
	                          	<div class="col-md-8">
                              <label class="control-label" for="textinput">
										Text:<span class="required">*</span>
									</label>
								
										<input id="itemName" required="required" ng-maxlength="50"
											ng-model="editDocumentType.txtName" name="itemName"
											type="text" class="form-control input-md requiredField">
									</div>

								</div>
								<div class="form-group">
								<label class="control-label" for="textinput"
										id="cname">Active:<span class="required">*</span>
									</label>
									<div class="col-md-6">
									<input type="checkbox" id="empstat" name="empstat"
											 ng-model="editDocumentType.blnStatus"
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
	<script src="<c:url value="/resources/js/Setup/DocumentType.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
