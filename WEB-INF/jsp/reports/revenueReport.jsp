<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Path Finder</title>
	<link rel="shortcut icon" href="<c:url value="/resources/img/fav.png"/>">
	
	<link
	href="<c:url value="/resources/css/bootstrap-datetimepicker.min.css"/>"
	rel="stylesheet">
   <%@include file="../common/header.jsp" %>
   
   <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
 


<script>
function addOption(selectbox, text, value) {
    var optn = document.createElement("option");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
}
function addOption_list() {
     
    
        
        for (var i=1990; i <= 2050;++i) {
        addOption(document.register_form.year_list,i,i);
    }
}

/* $(function() {
		$("#dateFrom").datepicker({
			changeYear: true,
            showButtonPanel: true,
			dateFormat : "yy",
			 onClose: function(dateText, inst) { 
                 var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                 $(this).datepicker('setDate', new Date(year, 1));
             }
		});
		$("#dateFrom").focus(function () {
            $(".ui-datepicker-month").hide();
        });
	}); */
	$(function() {
		   $( "#dateTo" ).datepicker({dateFormat: 'yy',  changeYear: true,  changeMonth: false});

		/* $("#dateTo").datepicker({
			dateFormat : "dd-mm-yy"
		}); */
	});
</script>
</head>

<body onload="addOption_list()">
<div class="se-pre-con">
	<div style="padding-left:50%; padding-top:20%">
		<img src="<c:url value="/resources/img/spinner.gif"/>" >
	</div>
</div>
    <div class="wrapper" ng-controller="rptCtrl" data-ng-init="init()">

    <div class="box">
        <div class="row row-offcanvas row-offcanvas-left">
                      
          
            <!-- sidebar -->
             <%@include file="../common/navigationPane.jsp" %>
           
            <!-- /sidebar -->
          
            <!-- main right col -->
            <%@include file="../common/topMenu.jsp" %>
            <!-- /top nav -->
              
                  <!-- page content -->
        <div class="right_col" role="main">
          <div class="">

            <div class="page-title">
              <div class="title_left">
                <h3>Revenue  Report  </h3>
              </div>
            </div>
            <div class="clearfix"></div>
            <div class="row">
         		<div class="col-md-12 col-sm-12 col-xs-12">
         		
         		<!-- The Modal -->
		                <div class="x_panel">
		                  <div class="x_title">
		                    <h2>Revenue Report</h2>
		                    <ul class="nav navbar-right panel_toolbox">
		                      <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
		                    </ul>
		                  </div>
			                <div class="alert alert-danger alert-dismissible" style="display:none" role="alert" id="addErrorAlert" id="errorAlert">
								<strong>Error: </strong>&nbsp;<span id="errMsgText"></span>
							</div>
							<div class="alert alert-success alert-dismissible" style="display:none;" role="alert" id="successAlert">
								<strong>Success: </strong>&nbsp;<span id="successMsgText"></span>
							</div>
                        
			                <div class="x_panel">
			                  <div class="x_content">
			                    <br />
			<!--                     <form id="reOrderForm" data-parsley-validate class="form-horizontal form-label-left"> onsubmit="onSubmit()" s-->
			                    
			                    <form name="register_form" class="form-horizontal" data-toggle="validator"  ng-submit="generateReport()" style="padding:left:20px;">
								
								  <div class="form-group">
				                  <label for="dateFrom"  class="control-label col-sm-2 col-md-2">Year: <span class="required">*</span></label>
					                 <div class="col-md-4 form-group">
					                 <select class="form-control input-md" ng-model="Searchcomplaint.year"
											name="year_list">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
					                  </div>
					                   <label for="vehicle"  class="control-label col-sm-2 col-md-2"> Station/Branch: <span class="required">*</span></label>
					                 <div class="col-md-4 form-group">
					                      <select class="form-control input-md selectpicker" ng-change=""
											ng-options="area.serAreaId as area.txtAreaName for area in areas"
											data-error="Please select Area" required="required" data-live-search="true"
											ng-model="Searchcomplaint.area">
											<option ng-selected="selected" value="">--Select--</option>
										</select>
					                      
					                  </div>
					                 
					                  </div>
					                   
				                   <!-- <div class="form-group" >
				                   <label class="col-md-2 control-label" for="textinput">Date From<span class="required">*</span></label>  
				                    <div class="col-md-4">
				                      <input type="text" id="checkIn" ng-model="Searchcomplaint.complaintDate" name="checkIn" class="form-control  input-md requiredField">
				                    </div>
				                      <label class="col-md-2 control-label" for="textinput">Date To<span class="required">*</span></label>  
				                    <div class="col-md-4">
				                      <input type="text" id="checkOutDateTime"  ng-model="Searchcomplaint.remarks" name="checkOutDateTime" class="form-control  input-md requiredField">
				                    </div>
				                  </div>  -->
				                  <div class="form-group">
				                  <label for="status" class="col-md-5 control-label"></label>
					                  <div class="col-md-7">
										  <button type="submit" class="btn btn-primary">Generate Report</button>
										  <a href="#" id="downloadLink" style="display:none;" type="button" class="btn btn-success" ng-click="downloadFile()">Download</a>
									  </div>
								  </div>
								</form>
								
							 <object ng-show="content" data="{{content}}"  type="application/pdf" style="width: 100%; height: 400px;"></object> 
			                  </div>
			                </div>
			                <div style="padding-bottom:10px;"></div>
		                 
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
   
   <%@include file="../common/footer.jsp" %>
   <script>
   $(document).ready(function() {
		  $("#checkIn").datepicker();
		  $("#checkOutDateTime").datepicker();
   });
  var onSubmit=function(){
		$(".se-pre-con").fadeIn("slow");
       return false;
	};
   </script>
	 <script src="<c:url value="/resources/js/reports/revenueReport.js"/>"></script>
	  <script src="<c:url value="/resources/js/common.js"/>"></script>
 	   <script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	  <script src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
</body>

</html>
