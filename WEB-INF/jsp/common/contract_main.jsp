<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>


<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js">
	
</script>
<script src="https://code.angularjs.org/1.4.8/angular-route.min.js"></script>


<head>



<title>Path Finder</title>
<link rel="shortcut icon" href="<c:url value="/resources/img/fav.png"/>">
<link
	href="<c:url value="/resources/css/bootstrap-datetimepicker.min.css"/>"
	rel="stylesheet">
	
	
	 <link href="<c:url value="/resources/css/bootstrap.min.css"/>" rel="stylesheet">
 	<link rel='stylesheet' type='text/css' href="<c:url value="/resources/css/jquery-ui.css"/>"/>
    <!-- Custom CSS -->
    <link href="<c:url value="/resources/css/simple-sidebar.css"/>" rel="stylesheet">
	<link href="<c:url value="/resources/css/jquery.dataTables.min.css"/>" rel="stylesheet">
	<link href="<c:url value="/resources/css/dashboard.css"/>" rel="stylesheet">
<%-- <%@include file="../common/header.jsp"%> --%>


 <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>CIT</title>
	<link rel="shortcut icon" href="<c:url value="/resources/img/fav.png"/>">
  <%--  <%@include file="header.jsp" %> --%>
</head>

<body ng-controller="adcContractCtrl" data-ng-init="init()">


			<div class="row row-offcanvas row-offcanvas-left">


		<!-- sidebar -->
				<%@include file="navigationPane.jsp"%>

				<!-- /sidebar -->

				<!-- main right col -->
				<%@include file="topMenu.jsp"%>
				<!-- /top nav -->



				<!-- page content -->
		<div class="right_col" role="main">
			<div class="">
				
				<div class="page-title">
					<div class="title_left">
						<h3>CIT</h3>
					</div>
				</div>
				<div class="clearfix"></div>
				
				<div class="row">
					<div class="col-md-12 col-sm-12 col-xs-12">
						<div class="x_panel">
							<div class="x_title">
								<%-- <h2><%=name %></h2> --%>
								<div class="clearfix"></div>
							</div>
							<br /> <br />
							<div class="x_content"></div>
						</div>
					</div>


				</div>
			</div>
			<!-- /page content -->
			<div class="wrapper">


				<!-- <br /> <a href="#/contract">Red----------</a><br /> <a
					href="#/view2">Green</a><br /> <a href="#/other">Blue</a><br />
					
                   <div ng-bind-html="pageLink"></div>
                    -->
                   
                
		
		
			</div>
			<div ng-view></div>
			<!-- /padding -->
		</div>
		<!-- /main -->

			</div>
		







	
	<%@include file="../common/footer.jsp"%>

	<script src="<c:url value="/resources/js/custom/common.js"/>"></script>
<script src="<c:url value="/resources/js/customer/customer_new.js"/>"></script>
<script src="<c:url value="/resources/js/adcContract/adc_contract.js"/>"></script>
	<%-- <script src="<c:url value="/resources/js/test/test.js"/>"></script> --%>
	<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<script
		src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>
		<%-- <script src="<c:url value="/resources/js/customer/customer_setup.js"/>"></script> --%>
		
			
</body>

</html>