<div class="table-responsive">
<div class="wrapper"  data-ng-init="init()">
<div class="container">


	


			

				<!-- page content -->
			<div class="form-group row">
						<div class="page-title">
							
								<h3>Attendance Employee Wise</h3>
							
						</div>
					</div>
								
									
									
									
										<div class="modal-body">
					<div class="panel-body" id="mainPanel">
						<form id="addGroupForm_new" name="addGroupForm_new" ng-submit="getSaleInvoiceListReport('emp')"
							class="form-horizontal">
							<fieldset>

																<!-- <div class="form-group row">
														    <label class="col-md-2 control-label" for="productId">Designation:<span
													class="required">*</span>
												</label>
												<div class="col-md-4">
													<select class="form-control input-md requiredField" id="packing" 
														ng-options="designation.txtDesignationName as designation.txtDesignationName for designation in lstDesignations | orderBy:'txtDesignationName'"
														data-error="Please select Designation" 
														data-live-search="true" 
														ng-model="ReportDTO.designation">
														<option ng-selected="selected" value="">--Select--</option>
													</select>
													<button id="addNewEntry" data-loading-text="Processing..."
														Type="Button" class="btn btn-success" data-toggle="modal"
														data-target="#addCustomerPW">
														<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;Add 
													</button>
												</div>
													</div> -->

							<div class="form-group">
								<label class="col-md-2 control-label" for="textinput">Employee
									Code:<span class="required">*</span>
								</label>
								<div class="col-md-4">
									<input type="text" name="code" class="form-control input-md "
										ng-model="ReportDTO.code">
								</div>
							</div>
							
							<div class="form-group">
								<label class="col-md-2 control-label" for="textinput">Employee
									Name:<span class="required">*</span>
								</label>
								<div class="col-md-4">
									<input type="text" name="code" class="form-control input-md "
										ng-model="ReportDTO.name">
								</div>
							</div>


							<div class="form-group row">
														<label for="dateFrom"
															class="control-label col-sm-2 col-md-2">Date
															From: <span class="required">*</span>
														</label>
														<div class="col-md-4">
															<input id="dateFrom" name="dateFrom"
																ng-model="ReportDTO.dte_date_from" type="text"
																class="form-control input-md datepicker requiredField">
														</div></div>
<div class="form-group row">
														<label for="dateTo"
															class="control-label col-sm-2 col-md-2">Date To:
															<span class="required">*</span>
														</label>
														<div class="col-md-4 ">
															<input id="dateTo" ng-model="ReportDTO.dte_date_to"
																required name="dateTo" type="text"
																class="form-control datepicker requiredField">
														</div>
													</div>

													<div class="form-group">
															<label for="status" class="col-md-5 control-label"></label>
															<div class="col-md-7">
																<button type="submit" class="btn btn-primary">Generate
																	Report</button>
																<a href="#" id="downloadLink" style="display: none;"
																	type="button" class="btn btn-success"
																	ng-click="downloadFile()">Download</a>
																	 <a  id="downloadLink" type="button" 
																	 class="btn btn-success" ng-click="generateAttendenceReportExcel('emp')">Download CSV File</a>
															</div>
														</div>
												</fieldset>
						</form>
						<object ng-show="content" data="{{content}}"  type="application/pdf" style="width: 100%; height: 400px;"></object> 
						 <object ng-show="content1" data="{{content1}}"  type="application/vnd.ms-excel" style="width: 100%; height: 400px;"></object>
					</div>
				</div>

								
			

</div>
</div>
</div>




