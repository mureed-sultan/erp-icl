




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



						<div class="row text-center ">

							<div class="col-md-12">
								<a href="https://ittehadchemicals.com/" target="_blank"> <img
									src="<c:url value="/resources/img/ahmad-bg.jpg"/>"
									class="img-responsive center-block" />
								</a>
							</div>

						</div>
						<!-- /page content -->

						<!-- /padding -->
					</div>
					<!-- /main -->

				</div>
			</div>

		</div>




		<%@include file="footer.jsp"%>
</body>

</html>
