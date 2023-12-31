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

<title>SS</title>
<link rel="shortcut icon" href="<c:url value="/resources/img/fav.png"/>">
<link
	href="<c:url value="/resources/css/bootstrap-datetimepicker.min.css"/>"
	rel="stylesheet">
	<link
	href="<c:url value="/resources/css/bootstrap-timepicker.min.css"/>"
	rel="stylesheet">
<%@include file="../common/header.jsp"%>

<link rel="stylesheet"
	href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

 <script>
        
         $(function () {
        $("#st").timepicker({
        
        });
        }); 
         
         $(function () {
             $("#end").timepicker({
             
             });
             }); 
         
         $(function () {
             $("#st2").timepicker({
             
             });
             }); 
              
              $(function () {
                  $("#end2").timepicker({
                  
                  });
                  }); 
        </script>

</head>

<body>
	<div class="se-pre-con">
		<div style="padding-left: 50%; padding-top: 20%">
			<img src="<c:url value="/resources/img/spinner.gif"/>">
		</div>
	</div>

	<div class="wrapper" ng-controller="shiftCtrl"
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
								<h3>Shift</h3>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>Shift</h2>
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
												data-target="#addShiftForm">
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
													<th class="column-title">Shift </th>
													<th class="column-title">Start</th>
													<th class="column-title">End</th>
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
					selected Shift(s)?</modalTitle>
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
	<div class="modal fade" id="addShiftForm" tabindex="-1" role="dialog"
		aria-labelledby="addShift">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Add Shift</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="addShift()"
							class="form-horizontal">
							<fieldset>
							
                               <div class="form-group">
								<label class="col-md-4 control-label" for="textinput">Shift
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="itemName1" required="required"   ng-minlength="4" ng-maxlength="50"
											ng-model="newHrShiftSetup.txtShiftDescription" name="itemName1" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>
								
								
											

					<div class="form-group">
						<label class="col-md-4 control-label" for="textinput">Start
							Time:<span class="required">*</span>
						</label>
						<div class="col-md-4">
							<input id="st" required="required"
								ng-model="newTripsheet.txtShiftStart" name="st" type="text"
								class="form-control input-md requiredField timepicker">
						</div>


					</div>
					
					
					<div class="form-group">
						<label class="col-md-4 control-label" for="textinput">End
							Time:<span class="required">*</span>
						</label>
						<div class="col-md-4">
							<input id="end" required="required"
								ng-model="newTripsheet.txtShiftEnd" name="end" type="text"
								class="form-control input-md requiredField timepicker">
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
 	<div class="modal fade" id="editShiftForm" tabindex="-1" role="dialog"
		aria-labelledby="editHostel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						onclick="clearAddGroupForm()">&times;</button>
					<modalTitle>Edit Shift</modalTitle>
				</div>

				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" ng-submit="updateShift()"
							class="form-horizontal">
							<fieldset>

								<!-- Text input-->

								<div class="form-group">
									<label class="col-md-4 control-label" for="textinput">Shift
										:<span class="required">*</span>
									</label>
									<div class="col-md-8">
										<input id="itemCode" required="required"  
											ng-model="editShift.txtShiftDescription" name="itemCode"
											type="text" class="form-control input-md requiredField">
									</div>
									<!--  Text Input -->
									
									
								</div>
	                         				
								
											

					<div class="form-group">
						<label class="col-md-4 control-label" for="textinput">Start
							Time:<span class="required">*</span>
						</label>
						<div class="col-md-4">
							<input id="st2" required="required"
								ng-model="editShift.txtShiftStart" name="st2" type="text"
								class="form-control input-md requiredField timepicker">
						</div>


					</div>
					
					
					<div class="form-group">
						<label class="col-md-4 control-label" for="textinput">End
							Time:<span class="required">*</span>
						</label>
						<div class="col-md-4">
							<input id="end2" required="required"
								ng-model="editShift.txtShiftEnd" name="end2" type="text"
								class="form-control input-md requiredField timepicker">
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
	<script src="<c:url value="/resources/js/Setup/Shift.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
		<script src="<c:url value="/resources/js/bootstrap-timepicker.min.js"/>"></script>
</body>

</html>
