<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<style>
	.navbar-header a{
		display: flex;
		justify-content: start;
		align-items: center;
		font-weight: 800;
		color: #A1C034;
		font-size: 25px;
	}
	.login_user{
		color: #A1C034;
		font-size: 25px;
		display:flex;
		gap: 2rem;
	}
	.navbar{
		background-color: white;
		border-bottom: 1px solid silver;
	}
</style>
<div class="column col-sm-12 col-xs-12" id="main">
                
                <!-- top nav -->
<div class="navbar navbar-blue navbar-static-top">
	<div class="col-md-6 col-sm-6">
		<div class="navbar-header">
			<a href="ICL" class="navbar-brand logo">Dashboard</a>
		</div>
	</div>
	<div class="col-md-6 col-sm-6">
		<nav class="collapse navbar-collapse" role="navigation">
			<div class="logout-blue navbar-right">

				<a href="/ICL/login">Sign Out</a>
			</div>

			<div class="login_user">
				<i class="fa fa-question-circle-o" aria-hidden="true"></i>
				<i class="fa fa-bell"></i>
				<i class="fa fa-user-circle-o" aria-hidden="true"></i>

				<!-- Welcome ${user} -->
			</div>
		</nav>
	</div>
</div>