




<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ page import="com.pf.admin.utility.common.ResourceBundleUtility"%>
<%
	ResourceBundleUtility resourceBundleUtility = ResourceBundleUtility.getInstance();
	String name = resourceBundleUtility.getString(ResourceBundleUtility.LANG_TRANSLATIONS_EN_US_RESOURCE_BUNDLE,
			"Application.Name");
%>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, shrink-to-fit=no, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>Customer Portal</title>

<style>
	.grid-4{
		display: grid;
		grid-template-columns: repeat(4,1fr);
	}
        .progress-round {
            position: relative;
            width: 100px; /* Adjust the width of the progress bar */
            height: 100px; /* Adjust the height of the progress bar */
            border-radius: 50%;
            background-color: #ccc; /* Background color of the progress bar */
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #333; /* Text color */
        }

        .progress-bar {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            clip: rect(0, 50px, 100px, 0);
            background-color: #3498db; /* Blue color for the progress */
        }

        .dot {
            position: absolute;
            width: 20px; /* Adjust the size of the dot */
            height: 20px; /* Adjust the size of the dot */
            background-color: #3498db; /* Blue color for the dot */
            border-radius: 50%;
            top: 40%; /* Adjust the vertical position of the dot */
            right: -10px; /* Adjust the horizontal position of the dot */
        }
</style>
<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js">
</script> -->
<link rel="shortcut icon" href="<c:url value="/resources/img/fav.png"/>">
<%@include file="header.jsp"%>

</head>

<body>
	<%-- <div class="se-pre-con">
		<div style="padding-left: 50%; padding-top: 20%">
			<img src="<c:url value="/resources/img/spinner.gif"/>">
		</div>
	</div> --%>
	<!--     <div class="wrapper" ng-controller="mainCtrl" data-ng-init="init()"> -->
	<div class="wrapper">
		<div class="box">


			<%@include file="navigationPane.jsp"%>
			<div class="row row-offcanvas row-offcanvas-left">

				<%@include file="topMenu.jsp"%>

				<div class="right_col" role="main">
					<h2>Bills</h2>
					<div class="grid-4">
						<div class="grid-box">
							<div class="flex">
								<div class="icon"><i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
								</div>
								<div class="progress-round">
									<div class="progress-bar" style="transform: rotate(180deg);"></div>
									<div class="dot"></div>
									75% <!-- Adjust the percentage value -->
								</div>							</div>
							<div class="text-area">Ready to Assign</div>
							<div class="text-area">200-<span>42</span></div>
							<div class="text-area">its grab from 139</div>
						</div>
					</div>


					<!-- <div class="">



						<div class="row text-center ">

							<div class="col-md-12">
								<a href="https://ittehadchemicals.com/" target="_blank"> <img
									src="<c:url value="/resources/img/ahmad-bg.jpg"/>"
									class="img-responsive center-block" />
								</a>
							</div>

						</div>

					</div> -->

				</div>
			</div>

		</div>




		<%@include file="footer.jsp"%>
</body>

</html>