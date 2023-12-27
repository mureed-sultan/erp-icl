<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js">
</script>

<script src="https://cdn.rawgit.com/angular-ui/bower-ui-grid/master/ui-grid.min.js"></script> 
<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/angular-ui/bower-ui-grid/master/ui-grid.min.css"> 
<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, shrink-to-fit=no, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>Path Finder</title>
<link rel="shortcut icon" href="<c:url value="/resources/img/fav.png"/>">
<link
	href="<c:url value="/resources/css/bootstrap-datetimepicker.min.css"/>"
	rel="stylesheet">
<%@include file="../common/header.jsp"%>

<link rel="stylesheet"
	href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<%@include file="../common/header.jsp"%>
<script>

	$(document).ready(function() {
		
		$(".datepicker").datepicker({
			dateFormat : "dd-mm-yy"
		});
		$("#hidebydefault").hide();
		
	});
	function validate(){
	     var min = parseInt(document.getElementById('seriesFrom').value);
	     var max = parseInt(document.getElementById('seriesTo').value);
	     if(min > max){
	         alert('Please provide Series From Value Less than Series To Value');
	          return false;
	     }else{
	        //   alert('Maxvalue is greter than Minvalue');
	          return true;
	     }

	}	
 
</script>
<style>
 .wrapperpop {
  width: 200px;
  position: relative;
} */
.wrapper .selected-items-box {
  cursor: pointer;
  border: solid 1px #ddd;
  padding:10px;
  background-color: #333;
  color: #ffffff;
}
.selected-items-box .items-list {
  list-style-type: none;
  width: 100%;
  padding: 0;
  margin: 0;
}
.selected-items-box .items-list li {
  display: inline;
}

.wrapper .list {
  display: none;
  height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  border-left: solid 1px #C7C6C7;
  border-right: solid 1px #C7C6C7;
  border-bottom: solid 1px #C7C6C7;
  z-index: 100;
  position: absolute;
  width: 100%;
}
.list .items-list {
  list-style-type: none;
  width: 100%;
  padding: 0;
  margin: 0;
}
.list .items-list li {
  margin: 0;
  width: 100%;
  padding: 0;
  border-bottom: solid 1px #C7C6C7;
  padding: 5px;
  background-color: #fff;
}
</style>
</head>

<body>
	<div class="se-pre-con">
		<div style="padding-left: 50%; padding-top: 20%">
			<img src="<c:url value="/resources/img/spinner.gif"/>">
		</div>
	</div>

	<div class="wrapper" ng-controller="bookingCtrl"
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
								<h3>Shipping for Bills</h3>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>Shipping for Bills</h2>
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

									
									</div>

									<div class="table-responsive" >
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													
													<th class="column-title">Sr. No.</th>
													<th class="column-title">Booking No</th>
													<th class="column-title">Shipment No</th>
													<th class="column-title">Source </th>
													<th class="column-title">Destination</th>
													<!-- <th class="column-title">Vehicle</th> -->
													<th class="column-title">Commandar</th>
													<th class="column-title">Action</th>
												</tr>
											</thead>

											<tbody>
												<tr>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<!-- <td></td> -->
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
	<div class="modal fade" id="editDialog" tabindex="-1" role="dialog"
		aria-labelledby="addRegion">
		<div class="modal-dialog" role="document">
			<div class="modal-content" style="width:900px">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						>&times;</button>
					<modalTitle>Shipping for Bills</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="addBill()"
							class="form-horizontal">
							<fieldset>
								
								<div class="form-group">
								     <label class="col-md-2 control-label" for="textinput">Billing Month
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="bookingDate" required="required" ng-minlength="1" ng-maxlength="50"
											ng-model="newDetailBook.dteBookingDate" name="bookingDate" type="text" 
											class="form-control input-md  requiredField">
									</div>
								
										
									<label class="col-md-2 control-label" for="textinput" >Customer To Be Billed
										Code:<span class="required">*</span>
									</label>
									<div class="col-md-4">

										<select id="customerId" name="customerId" class="form-control input-md" ng-options="customerId.name for customerId in arrlist" ng-model="userselected"  ng-change="update(userselected.id)"> 


                                          </select>	 

									</div>

								
								</div>
								
								<div class="form-group">
								<label class="col-md-2 control-label" for="textinput">Branch Name
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="branchName" 
											ng-model="newDetailBook.citTableBranch1.txtBranchName" name="branchName" type="text" readonly 
											class="form-control input-md  requiredField">
									</div>

								<label class="col-md-2 control-label" for="textinput">Branch Code 
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="branchCode" required="required" ng-minlength="1" ng-maxlength="50"
											ng-model="newDetailBook.citTableBranch1.txtBranchCode" name="branchCode" type="text" readonly 
											class="form-control input-md requiredField">
									</div>
								</div>
								
								
								
								<div class="form-group">
								<label class="col-md-2 control-label" for="textinput">Address
										:<span class="required">*</span>
									</label>
									<div class="col-md-8">
										<input id="address" required="required" ng-minlength="1" ng-maxlength="50"  
											ng-model="newDetailBook.citTableBranch1.txt_Address" name="address" type="text" 
											readonly class="form-control input-md requiredField">
									</div>
								  <div>
								  
								 </div>

								
								</div>
								
								<div class="form-group">
								
								<label class="col-md-2 control-label" for="textinput">Cash Movement Date
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="cashMovementDate" required="required" ng-minlength="1" ng-maxlength="50" readonly
											ng-model="newDetailBook.citTableBooking.dteBookingDate" name="cashMovementDate" type="text"
											class="form-control input-md requiredField">
									</div>
								
								<label class="col-md-2 control-label" for="textinput">Shipment No
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="shipmentNo" required="required" ng-minlength="1" ng-maxlength="50" readonly
											ng-model="newDetailBook.txtShippingCode" name="shipmentNo" type="text"
											class="form-control input-md requiredField">
									</div>

									
							
								</div>
								
								<div class="form-group">
								
									<label class="col-md-2 control-label" for="textinput" >Cash Sending Client:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									<!-- ng-change="updateCustomer(userSelectCustomer.id)" -->
									<select id="customerIdSend" name="customerIdSend" disabled ng-options="customerIdSend.name for customerIdSend in arrlistCustomer" ng-model="userSelectCustomer" class="form-control input-md" ng-model="userSelectCustomer" readonly  > 

                                         <!-- <option ng-repeat="option in arrlistCustomer" value="{{option.id}}">{{option.name}}</option>  -->

                                          </select>	 
									</div>
									
								
								
									<label class="col-md-2 control-label" for="textinput" >Cash Receiving Client:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									
									<select id="customerIdRec" name="customerIdRec" disabled ng-options="customerIdRec.name for customerIdRec in arrlistCustomerRec" class="form-control input-md" ng-model="userSelectCustomerRec"  readonly> 


                                   </select>	
					
									</div>

									
							
								</div>
								
								<div class="form-group">
								
								    <label class="col-md-2 control-label" for="textinput" >Cash Sending  Branch:<span class="required">*</span>
									</label>
									<div class="col-md-4">
									
									
									<select id="sendCash" name="sendCash" disabled ng-options="sendCash.name for sendCash in arrlistCash" class="form-control input-md" ng-model="userselectedCash" readonly> 

                                     

                                          </select>	 
									  
									</div>
									
									<label class="col-md-2 control-label" for="textinput" >Cash Receiving  Branch:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										
										<select id="CRB" name="CRB" disabled class="form-control input-md" ng-options="CRB.name for CRB in arrlistCashRec" ng-model="userselectedCashRec" readonly > 

 

                                          </select>	 
									
									</div>

									
							
								</div>

								<div class="form-group">
								
								    <label class="col-md-2 control-label" for="textinput" >Nature of Service:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="Nos" required="required" ng-minlength="1" ng-maxlength="50" 
											ng-model="citbill.txtMode" name="Nos" type="text"
											class="form-control input-md requiredField">
									</div>
								
								
									<label class="col-md-2 control-label" for="textinput" >Amount:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="amount" required="required" ng-minlength="1" ng-maxlength="50" 
											ng-model="citbill.numAmount" name="qtyTo" type="text" ng-blur="getCalculateAdditional(citbill.numAmount)"
											class="form-control input-md requiredField">
									</div>

									
								</div>


								<div class="form-group">
								
								    <label class="col-md-2 control-label" for="textinput" >No of Seals:<span class="required">*</span>
									</label>
									<div id=class="col-md-2">
										<!-- <input id="noOfSeals" required="required" ng-minlength="1" ng-maxlength="50" 
											ng-model="sealSelection" name="noOfSeals" type="text" class="form-control input-md requiredField"> -->
											 <ul id="noOfSeals" class="items-list">
                                             <li  ng-model="sealSelection" multiple="true"  ng-repeat="selectdrop in citBookDetail | filter: getSelectedItems">
                                              {{selectdrop.serItemBookId}}
                                              </li>
                                                <div class="wrapperpop">
											<div class="selected-items-box">
												--- Select --- <span class="dropdown-icon"></span>
											</div>
											<div class="list">
												<ul class="items-list">
													<li  ng-repeat="selectdrop in citBookDetail"><input
														type="checkbox" ng-model="selectdrop.selected" /> <span>{{selectdrop.numCheckNo}}</span>
													</li>
												</ul>
											</div>
								             </div>
                                             </ul>
                                           
											
									</div>
									
								<!-- 	<select ng-model="sealSelection" multiple="true" ng-options="citBookDetail.numCheckNo for citBookDetail in citBookDetail"></select> -->

										

										<label class="col-md-2 control-label" for="textinput" >OverTime/off Days Charges:<span class="required">*</span>
									</label>
									
									
									<div class="col-md-4">
										<input id="OTD" required="required" ng-minlength="1" ng-maxlength="50" 
											ng-model="citbill.numOverTimeCharges" name="OTD" type="text"
											class="form-control input-md requiredField">
									</div>

									
							
								</div>
								
								<div class="form-group">
								
								    <label class="col-md-2 control-label" for="textinput" >Distance:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="ED" required="required" ng-minlength="1" ng-maxlength="50" 
											ng-model="citbill.numExtraDistanceInKm" name="ED" type="text" ng-blur="getCalculateDistance(citbill.numExtraDistanceInKm)"
											class="form-control input-md requiredField">
									</div>
								
									<label class="col-md-2 control-label" for="textinput" >Vault Nights:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="vn" required="required" ng-minlength="1" ng-maxlength="50" 
											ng-model="citbill.numNoOfNightsInVault" name="vn" type="text" ng-blur="getCalculateVault(citbill.numNoOfNightsInVault)"
											class="form-control input-md requiredField">
									</div>

									
							
								</div>
								
								<div class="form-group">
								
								<label class="col-md-2 control-label" for="textinput" >Toll Tax/Parking fee:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="TP" required="required" ng-minlength="1" ng-maxlength="50" 
											ng-model="citbill.numOtherCharges" name="TP" type="text" ng-blur="getCalculateParking(citbill.numOtherCharges)"
											class="form-control input-md requiredField">
									</div>
								
								<label class="col-md-2 control-label" for="textinput" >Service Type:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="TP1" 
											ng-model="citService.serviceTypeName" name="TP1" type="text"
											class="form-control input-md ">
									</div>
								
									
								</div>	
								
                                 	<div class="form-group">
								
								<label class="col-md-2 control-label" for="textinput" >Waiting Charges:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="TP" required="required" ng-minlength="1" ng-maxlength="50" 
											ng-model="citbill.numWaitingTime" name="TP" type="text" ng-blur="getCalculateWaiting(citbill.numWaitingTime)"
											class="form-control input-md requiredField">
									</div>
								
								
								
									
								</div>	
                                 
                                 <div class="table-responsive" >
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													
													<th class="column-title">Description</th>
													<th class="column-title">Detail</th>
												
												</tr>
											</thead>

											<tbody>
												<tr data-ng-repeat="i in list">
													<td  ng-if="i==1">
                                                   <p>Waiting Charges<p>
                                                    </td>
                                                    <td  ng-if="i==2">
                                                   <p>Seal Charges<p>
                                                    </td>
                                                    <td  ng-if="i==3" >
                                                  <p>Basic Charges<p>
                                                    </td>
                                                    <td  ng-if="i==4" >
                                                  <p>Additional Charges<p>
                                                    </td>
                                                    <td  ng-if="i==5" >
                                                   <p>Vault Charges<p>
                                                    </td>
                                                    <td  ng-if="i==6" >
                                                  <p>Distance Charges<p>
                                                    </td>
                                                    <td  ng-if="i==7" >
                                                  <p>Toll Tax/Parking Fee<p>
                                                    </td>
                                                    <td  ng-if="i==8" >
                                                  <p>Total Dues Current<p>
                                                    </td>
                                                    <td  ng-if="i==9" >
                                                  <p>10 % sales Dues Current<p>
                                                    </td>
                                                    <td  ng-if="i==10" >
                                                  <p>Arrears<p>
                                                    </td>
                                                    <td  ng-if="i==11" >
                                                   <p>Net Payable<p>
                                                    </td>
													<td  ng-if="i==1">
                                                   <p>{{overtimeCharges > 0? overtimeCharges:'' }}<p>
                                                    </td>
                                                    <td  ng-if="i==2">
                                                   <p>{{totalSealCharges > 0? totalSealCharges:'' }}<p>
                                                    </td>
                                                    <td  ng-if="i==3" >
                                                  <p>{{BaseChargeRate  > 0 ? BaseChargeRate:''}}
                                                  <p>
                                                    </td>
                                                    <td  ng-if="i==4" >
                                                  <p>{{netAdditional> 0 ? netAdditional:''}}<p>
                                                    </td>
                                                    <td  ng-if="i==5" >
                                                   <p>{{netVault > 0? netVault:''}}<p>
                                                    </td>
                                                    <td  ng-if="i==6" >
                                                  <p>{{netDistance> 0 ? netDistance:''}}<p>
                                                    </td>
                                                    <td  ng-if="i==7" >
                                                  <p>{{parkingFee > 0? parkingFee :'' }}<p>
                                                    </td>
                                                    <td  ng-if="i==8" >
                                                  <p>{{netAmount>0?netAmount:netAmount}}<p>
                                                    </td>
                                                    <td  ng-if="i==9" >
                                                  <p>{{taxAmount>0?taxAmount:''}}<p>
                                                    </td>
                                                    <td  ng-if="i==10" >
                                                  <p>{{0}}<p>
                                                    </td>
                                                    <td  ng-if="i==11" >
                                                   <p>{{total>0?total:''}}<p>
                                                    </td>


												</tr>
											</tbody>
										</table>
									</div>
						
								<div class="modal-footer">
									<div class="form-group">
										<div class="col-md-12">
											<div style="float: left;">
												<button type="button" id="addCloseButton"
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

 	<div class="modal fade" id="editItemIssueForm" tabindex="-1" role="dialog"
		aria-labelledby="addRegion">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close" style="margin: 10px 10px 0 0;"
						>&times;</button>
					<modalTitle>Quantity Issuance</modalTitle>
				</div>
				<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm" name="addGroupForm" ng-submit="addItem()"
							class="form-horizontal">
							<fieldset>

								<div class="form-group">
									<label class="col-md-2 control-label" for="textinput" >Item Types
										Code:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<select id="customerId" ng-model="editItem.serItemId"  ng-selected="editContract.citTableCustomer.serCustomerId == filteredCustomer.serCustomerId" required readonly
											name="customerId" class="form-control input-md requiredField"
											ng-options="CitItemSetup.serItemId as CitItemSetup.txtItemName for CitItemSetup in CitItemSetup">
											<option ng-selected="selected" value="" value="">--Select--</option>
										</select>
									</div>

								<label class="col-md-2 control-label" for="textinput">Batch No
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="batchNo" required="required" ng-minlength="2" ng-maxlength="50"
											ng-model="editItem.txtBatchNo" name="batchNo" type="text" readonly
											class="form-control input-md requiredField">
									</div>
								</div>
								
								<div class="form-group">
								<label class="col-md-2 control-label" for="textinput">Date
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="date" 
											ng-model="editItem.dte_Date" name="date" type="text" readonly
											class="form-control input-md datepicker requiredField">
									</div>

								<label class="col-md-2 control-label" for="textinput">Series From
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="seriesFrom" required="required" ng-minlength="2" ng-maxlength="50"
											ng-model="editItem.numSeriesFrom" name="seriesFrom" type="text"
											class="form-control input-md requiredField">
									</div>
								</div>
								
								
								
								<div class="form-group">
								<label class="col-md-2 control-label" for="textinput">Series To
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="seriesTo" required="required" ng-minlength="2" ng-maxlength="50"
											ng-model="editItem.numSeriesTo" name="seriesTo" type="text" onblur="return validate();"
											class="form-control input-md requiredField">
									</div>

								<label class="col-md-2 control-label" for="textinput">Quantity
										:<span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="qtyTo" required="required" ng-minlength="2" ng-maxlength="50"
											ng-model="editItem.numQuantity" name="qtyTo" type="text" 
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
												<input type="submit" value="Submit"  class="btn btn-warning" ng-disabled="addGroupForm.$invalid"/>
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
	<script src="<c:url value="/resources/js/billing/billing.js"/>"></script>
	<script src="<c:url value="/resources/js/common.js"/>"></script>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
