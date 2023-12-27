<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<div class="column col-sm-10 col-xs-11" id="main">
                
                <!-- top nav -->
<div class="navbar navbar-blue navbar-static-top">
	<div class="col-md-6 col-sm-6">
		<div class="navbar-header">
			<a href="ICL" class="navbar-brand logo"></a>
		</div>
	</div>
	<div class="col-md-6 col-sm-6">
		<nav class="collapse navbar-collapse" role="navigation">
			<div class="logout-blue navbar-right">
				<a href="/ICL/login">Sign Out</a>
			</div>
			<div class="login_user">Welcome ${user}</div>
		</nav>
	</div>
</div>