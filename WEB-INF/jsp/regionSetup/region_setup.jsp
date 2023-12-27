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

	<div class="wrapper" ng-controller="regionCtrl"
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
										<h2>Region</h2>
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
												data-target="#addRegionForm">
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
													<th class="column-title">Region Code</th>
													<th class="column-title">Region Name</th>
													<th class="column-title">Status</th>
												</tr>
											</thead>

											<tbody>
												<tr>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<!-- <td></td> -->
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
	<div class="modal fade" id="confirmModel" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;">&times;</button>
					<modalTitle>Are you sure you want to Delete the
					selected Region(s)?</modalTitle>
				</div>
				<div class="modal-footer">
					<div class="actionButton"
						style="margin: 10px 20px 0 0; text-align: right; background: none">
						<button style="background: #FDCA01; color: #000" type="button"
							class="" data-dismiss="modal" aria-label="Close" id="noButton">
							<i class="fa"></i><span>No</span>
						</button>
						<button style="background: #FDCA01; color: #000"
							ng-click="deleteRegion()" type="button" class=""
							data-dismiss="modal" aria-label="Close" id="yesButton">
							<i class="fa"></i>&nbsp;<span>Yes</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="addRegionForm" tabindex="-1" role="dialog"
		aria-labelledby="addRegion">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						>&times;</button>
					<modalTitle>Add Region</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="addRegion()"
							class="form-horizontal">
							<fieldset>

								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput" >Region
										Code:<span class="required">*</span>
									</label>
									<div class="col-md-8">
										<input id="regionCode" required="required" ng-minlength="2" ng-maxlength="50"
											ng-model="newCitRegionSetup.txtRegionCode" name="regioncode" type="text" 
											class="form-control input-md requiredField">
									</div>
									<!-- <br/> -->
									
									
								</div>


                                <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Region
										Name:<span class="required">*</span>
									</label>
									<div class="col-md-8">
										<input id="region" required="required" ng-minlength="2" ng-maxlength="50"
											ng-model="newCitRegionSetup.txtRegionName" name="regionName" type="text"
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
												<input type="submit" value="Submit" class="btn btn-warning" ng-disabled="addGroupForm.$invalid"/>
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

 	<div class="modal fade" id="editRegionForm" tabindex="-1" role="dialog"
		aria-labelledby="editRegion">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						>&times;</button>
					<modalTitle>Edit Region</modalTitle>
				</div>
                 
				<div class="modal-body">
				
				<div class="alert alert-danger alert-dismissible"
										style="display: none;" role="alert" id="editErrorAlert">
										<button type="button" class="close" data-dismiss="alert">×</button>
										<strong>Error: </strong>&nbsp;<span id="editerrMsgText"></span>
									</div>
					<div class="panel-body" id="mainPanel">
						<form id="editGroupForm" name="editGroupForm" ng-submit="updateRegion()"
							class="form-horizontal">
							<fieldset>
								
                                <input type="hidden" id="index" name="index" value="" />
								<!-- Text input-->

								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Region
										Code:<span class="required">*</span>
									</label>
									<div class="col-md-8">
										<input id="regionCode" required="required"  
											ng-model="editRegion.txtRegionCode" name="regionCode" readonly="true"
											type="text" class="form-control input-md requiredField">
									</div>
									<!--  Text Input -->
									
									
								</div>
	                          <div class="form-group">
                              <label class="col-md-4 control-label" for="textinput">Region
										Name:<span class="required">*</span>
									</label>
									<div class="col-md-8">
										<input id="regionName" required="required" ng-minlength="4" ng-maxlength="50"
											ng-model="editRegion.txtRegionName" name="regionName"
											type="text" class="form-control input-md requiredField">
									</div>

								</div>
								
								<!-- <button type="button" id="back"
													class="btn btn-success 	glyphicon glyphicon-arrow-left" ng-click="previousRegion()" style="float:left;">Previous</button>
													<button type="button" id="next"
													class="btn btn-danger 	glyphicon glyphicon-arrow-right" ng-click="nextRegion()" style="float:right;">Next</button> -->
								
								
								
								
								<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="editCloseButton"
													class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
											</div>
											<div style="float: right;">
												<input type="submit" value="Submit" class="btn btn-warning" ng-disabled="editGroupForm.$invalid"/>
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
	<script src="<c:url value="/resources/js/regionSetup/region_setup.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
