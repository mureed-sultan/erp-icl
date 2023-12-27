<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="myApp">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" href='<c:url value="/resources/img/favicon.ico" />' type="image/x-icon">
<title>Customer Portal</title>
<!-- BOOTSTRAP STYLES-->
<link href="<c:url value="/resources/css/bootstrap.css"/>
" rel="stylesheet" />
<!-- FONTAWESOME STYLES-->
<%-- <link href="<c:url value="/resources/css/font-awesome.css"/>" rel="stylesheet" /> --%>
<!-- CUSTOM STYLES-->
<%--    <link href="<c:url value="/resources/css/custom.css"/>" rel="stylesheet" /> --%>
<!-- GOOGLE FONTS-->
<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js">
</script> -->
<script	src="<c:url value="/resources/js/angular.min.js"/>"></script>
<!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-route.js"></script> -->
<link href="<c:url value="/resources/css/bootstrap.min.css"/>
" rel="stylesheet" />
<link href="<c:url value="/resources/css/custom-style.css"/>
" rel="stylesheet" />
<script src="<c:url value="/resources/js/jquery.js"/>"></script>
<script src="<c:url value="/resources/js/jquery-ui.min.js"/>"></script>
<script src="<c:url value="/resources/js/bootstrap.min.js"/>"></script>
<style>
  .login-bg{
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-size: cover;
  }
  .w-100{
    width: 100%;
  }

</style>
</head>
<body>

<div class="login-bg" style="background-image: url('resources/img/ahmad-bg.jpg');">

<div class="container" ng-controller="forgetCtrl" data-ng-init="init()">
 
  <div class="row ">
    <div class="login-box">
    
     <div class="row text-center ">
    <div class="login-container">
      <div class="col-md-12"> <a href="https://ittehadchemicals.com/" target="_blank">
      <img class="w-100" src="<c:url value="/resources/img/dashboard-logo.png"/>" /> </a> </div>
     
    </div>
     <!-- <div><H2>Customer Portal</H2></div> -->
  </div> 
      <p>Connect to Admin portal</p>
        <c:if test="${param.success!=null}">
          <div class="alert alert-success" id="successDiv"> <strong>Success!</strong>
            <div id="successMsg">Authentication Successful</div>
          </div>
        </c:if>
        <c:if test="${param.error!=null}">
          <div class="alert alert-danger" id="errorDiv" > <strong>Login Failure!</strong>
            <div id="errorMsg">Username or password is incorrect</div>
          </div>
        </c:if>
        

        
        <form name='loginForm' action="" method='POST'>
          <input type='text' id='username' name='username' value='' class="form-control login-box-field-style" placeholder="Username">
          <input type='password' name='password' class="form-control  login-box-field-style"  placeholder="Password" />
          <div class="clear"></div>
          <input class="login-btn" name="Submit" type="Submit" value="Submit" class="btn btn-primary" />
          <input name="forget" type="button" ng_click="ForgetPassword()" value="Forgot Password" class="forgot-password" />
          <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
        </form>
    </div>
   <div class="clear"></div>

  </div>
</div>

</div>
<script src="<c:url value="/resources/js/Setup/forget.js"/>"></script>
</body>
</html>