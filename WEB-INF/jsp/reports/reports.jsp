<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Master Detail</title>

    <!-- Bootstrap Core CSS -->
    <link href="<c:url value="/resources/css/bootstrap.min.css"/>" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="<c:url value='/resources/css/portfolio-item.css'/>" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Master Project</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="/master/master">Master</a>
                    </li>
                    <li>
                        <a href="/master/reports">Reports</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Content -->
    <div class="container">

        <!-- Portfolio Item Heading -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Master
                    <small>Reports</small>
                </h1>
            </div>
        </div>
        <!-- /.row -->

        <!-- Portfolio Item Row -->
        <div class="row">
        					 <div class="col-md-7">
										  <button type="button" onclick="generateReport()" class="btn btn-primary">Gererate Report</button>
										  <button type="button" data-toggle="modal" data-target="#sendEmailPW" class="btn btn-primary">Send Report in Email</button>
										 
									  </div>
        					<object ng-show="content"  type="application/pdf" style="width: 100%; height: 400px;"></object>
        </div>
        <!-- /.row -->


        <hr>
</div>


  <!-- Add User Profile Dialog Starts  -->
      <div class="modal fade" id="sendEmailPW" tabindex="-1" role="dialog" aria-labelledby="addGroup">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin:10px 10px 0 0;" onclick="clearAddGroupForm()">&times;</button>
			          <modalTitle>Send Report in Email</modalTitle>
			      </div>
			      <div class="modal-body">
			          <div class="panel-body" id="mainPanel">
			           		<div class="alert alert-danger alert-dismissible" style="display:none;" role="alert" id="detailErrorAlert" >
								<strong>Error: </strong>&nbsp;<span id="detailErrorText"></span>
							</div>
							<div class="alert alert-success alert-dismissible" style="display:none;" role="alert" id="detailSuccessAlert">
								<strong>Success: </strong>&nbsp;<span id="detailSuccessText"></span>
							</div>
		              <form id="addGroupForm" data-toggle="validator"  class="form-horizontal">
		                <fieldset>
		                 <div class="form-group">
		                    <label class="col-md-4 control-label" for="textinput">Email Address<span class="required">*</span></label>  
		                    <div class="col-md-8">
		                      <input id="emailAddress" required="required" data-error="Fill this field"  name="emailAddress" type="text" class="form-control input-md requiredField">
		                    	<div class="help-block with-errors"></div>
		                    </div>
		                  </div>
		                
		
		                  <div class="modal-footer">
						       <div class="form-group">
				                    <div class="col-md-12">
				                     <div  style ="float:left;">
					                    	<button type="button" class="btn btn-default" data-dismiss="modal" onclick="">Close</button>
					                    </div>
					                    <div style ="float:right;">
					                   		<input type="button" onclick="sendEmail();" value="Submit" class="btn btn-warning"/>
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
<!-- Add Group Dialog Ends -->
<!-- Add Group Dialog Ends -->
        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; Your Website 2017</p>
                </div>
            </div>
            <!-- /.row -->
        </footer>

    <!-- /.container -->

    <!-- jQuery -->
    <script src="<c:url value="/resources/js/jquery.js"/>"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="<c:url value="/resources/js/bootstrap.min.js"/>"></script>
    <script src="<c:url value="/resources/js/moment.min.js"/>"></script>
     <script src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
	<script>
	var file ; 
	function generateReport(){
		window.open(window.location.protocol+"//"+window.location.host+"/master/generateReport","_blank");
		/*  $.ajax({
	            url: '/master/generateReport',
	            type: 'get',
	            success: function (response) {
	            	 var blob = new Blob([response.file], { type: 'application/pdf' });

	                 if (window.navigator && window.navigator.msSaveOrOpenBlob) {
	                     window.navigator.msSaveOrOpenBlob(blob); // for IE
	                 }
	                 else {
	                     var fileURL = URL.createObjectURL(blob);
	                     var newWin = window.open(fileURL);
	                     newWin.focus();
	                     newWin.reload();
	                 }
	            },
		  		'error': function(xhr, d, err){
		  		},complete: function(){
				}
	        }); */
	}
	 function sendEmail(){
		 $.ajax({
	            url: '/master/sendReportInEmail?toAddress='+$("#emailAddress").val(),
	            type: 'get',
	            success: function (data) {
	            	if(data=='Success'){
	            		 $('#detailSuccessText').html("Email Sent Successfully");
		            		$('#detailSuccessAlert').show();
	            	}else{
	            		$('#detailErrorText').html("Unable to send Email");
	            		$('#detailErrorAlert').show();
	            	}
	            },
		  		'error': function(xhr, d, err){
		  		},complete: function(){
				}
	 });
	 }
	</script>
</body>

</html>
