<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>

<html lang="en" ng-app="myApp">

<style>
.grid-container {
	display: grid;
	grid-template-columns: auto auto auto;
	
	 background-color: #81b4e3; 
	/* background-color: rgba(255, 255, 255, 0.8); */
	/* background-color: #2196F3; #81b4e3;*/
	
	padding: 5px;
}

.grid-item {
background-color: #81b4e3; 
	/* background-color: rgba(255, 255, 255, 0.8); */
	/* border: 0px solid rgba(0, 0, 0, 0.3); */
	padding: 10px;
	font-size: 12px;
	text-align: center;
}


</style>
<link rel="stylesheet"
	href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">   
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>  
	

	
	<!-- <link rel="stylesheet" type="text/css" href="css/jquery.datetimepicker.min.css"/>
<script src="js/jquery.datetimepicker.js"></script> -->

<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script> -->

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>POS</title>

<link rel="stylesheet" href="resources/css/jquey-ui.css">
<link rel="stylesheet" href="resources/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
<link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
<link rel="stylesheet" href="assets/css/styles.css">
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

</head>

 <body>
	<header></header>
	<div class="wrapper" ng-controller="abcCtrl" data-ng-init="init()">
	<!-- 	<div class="container">
			<div class="row">
				<div class="col-md-12"></div>
			</div>
	
	</div>
	<div>
		<div class="container">
			<div class="row">
				<div class="col-md-12"></div>
			</div>
		</div>
	</div> -->
		<div class="sticky">
			<a href="#AttDep" class="btn btn-info">Attendance Department Wise</a> 
			<a href="#AttEmp"	class="btn btn-info">Attendance Employee Wise</a> 
			<a href="#AttSum"	class="btn btn-info">Attendance Summary</a>
			
			
					
		</div>
		

<!-- 				<div class="navbar">
  <a href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
</div>	 -->				<div ng-view></div>

		<div></div>
	<div></div>

		<script src="resources/js/angular.min.js"></script>
		<script src="resources/js/angular-route.min.js"></script>


		<script src="<c:url value="/resources/js/moment.min.js"/>"></script>
	<!-- 	<script src="assets/js/jquery.min.js"></script> -->
		<!-- <script src="resources/js/jquery.js"></script> -->
		<script src="resources/js/jquery.dataTables.min.js"></script>
		
		<script src="resources/js/jquery.form.js"></script>
		<script src="resources/js/moment.min.js"></script>
        <script src="<c:url value="/resources/js/common.js"/>"></script>
		<script src="<c:url value="/resources/js/Reports/Report.js"/>"></script>
		<script src="<c:url value="/resources/js/common.js"/>"></script>


		<script src="resources/js/bootstrap.min.js"></script>
		<script	src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>"></script>

		<script src="resources/js/bootstrap-select.min.js"></script>



	
  
    
    	
 
    <%-- --%>
    

</body> 
</html>





