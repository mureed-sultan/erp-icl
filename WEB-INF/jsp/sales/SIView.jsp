
<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script> -->
<head>
<title>Path Finder</title>
<script>
	$(document).ready(function() {
		$("#datepicker").datepicker({
			dateFormat : "dd-mm-yy"
		});
	});
</script>
</head>
<body>
	<div ng-init="init()"></div>
		<div >
			<div class="row row-offcanvas row-offcanvas-left">
			<div class="right_col" role="main">
						<div class="">

						
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="x_panel">
									<div class="x_title">
										<h2>DC's For Invoice</h2>
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
									<label for="dateFrom" class="control-label col-sm-2 col-md-2">Date
										From: <span class="required">*</span>
									</label>
									<div class="col-md-4">
										<input id="dateFrom" name="dateFrom"
											ng-model="searchDTO.dte_date_from" type="text"
											class="form-control input-md datepicker requiredField">
									</div>

									<label for="dateTo" class="control-label col-sm-2 col-md-2">Date
										To: <span class="required">*</span>
									</label>
									<div class="col-md-4 form-group">
										<input id="dateTo" ng-model="searchDTO.dte_date_to" required
											name="dateTo" type="text"
											class="form-control datepicker requiredField">
									</div>

									<div>

										<button type="button" ng-click="searchIssue()"
											class="btn btn-primary">Search</button>



									</div>
								</div>

							</div>

									<div class="table-responsive">
										<table ng-table="user-table" id="data-table"
											class="table table-striped jambo_table bulk_action">
											<thead>
												<tr class="headings">
												    
													<!-- <th><input type="checkbox"
														ng-change="selectUnselectAll()" ng-model="checked" /></th> -->
													<th class="column-title">Sr. No.</th>
													<th class="column-title">DC No.</th>
													<th class="column-title">Customer</th>
													<th class="column-title">Date</th>
													<th class="column-title">City</th>
													<th class="column-title">Vehicle no.</th>
													<th class="column-title">Driver</th>
													<th class="column-title">Driver No.</th>
													<th class="column-title">SaleOrder No.</th>
													<th class="column-title">SO Date</th>
													<th class="column-title">Gate Pass No.</th>
													<th class="column-title">*</th>
												</tr>
											</thead>

											<tbody>
												<tr>
												<!-- <td></td> -->
												<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td ></td>
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
	<%-- <%@include file="../common/footer.jsp"%> --%>
	<%-- <script src="<c:url value="/resources/js/adcContract/adc_charges.js"/>"></script> --%>
	
</body>

</html>