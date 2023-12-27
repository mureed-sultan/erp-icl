<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

    <style>
		body, .navbar-fixed-top, .navbar-fixed-bottom {
		  padding-right: 0 !important;
		}
  </style>
  <!-- Sidebar -->
      <!--  <div ng-controller="mainController" class="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar"> -->
       <div    class="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar">
              
              	<ul class="nav">
          			<li><a href="#" data-toggle="offcanvas" class="visible-xs text-center"><i class="glyphicon glyphicon-chevron-right"></i></a></li>
            	</ul>
            	
            	 <ul class="nav hidden-xs" id="lg-menu">
            	  <li><a href=" <c:url value="/home" />"><i class="glyphicon glyphicon-home"></i> Home </a></li>
	            	<c:forEach var="nav" items="${navigationMenuRoles}" varStatus="loopStatus">
	            	<c:set var="outerLoopBreak" value="0"/>
	            	<c:forEach items="${fn:split(userRole, ',')}" var="outerLoopRole">
	                <c:if test="${fn:containsIgnoreCase(nav.menuRoles, outerLoopRole) and outerLoopBreak==0}">
	                <c:set var="outerLoopBreak" value="1"/>
	                 <li class="active" data-toggle="collapse" data-target="#${fn:replace(nav.menuName,' ', '')}" class="collapsed active">
                    	<a href="#"><i class="${nav.menuIcon}"></i> ${nav.menuName} <i class="glyphicon glyphicon-chevron-down"></i></a>
                    </li>
                      <li>
                      <ul class="child_menu collapse" id="${fn:replace(nav.menuName,' ', '')}">
                    	<c:forEach items="${nav.subMenuRoles}" var="subMenu">
                    		<c:set var="loopBreak" value="0"/>
	                    	<c:forEach items="${fn:split(userRole, ',')}" var="role">
		                    	<c:if test="${fn:containsIgnoreCase(subMenu.value, role) and loopBreak==0}">
		                    		<li><a href="<c:url value="${subMenu.key.txtSubMenuUrl}" />">${subMenu.key.txtSubMenuName}</a></li>
		                    		<c:set var="loopBreak" value="1"/>
							    </c:if>
							</c:forEach>
						</c:forEach>
					</ul> 
                    </li> 
                    </c:if>
                    </c:forEach>
	               </c:forEach>
               </ul>
                <ul class="list-unstyled hidden-xs"  id="sidebar-footer">
                </ul>
              
              	<!-- tiny only nav-->
              <ul class="nav visible-xs" id="xs-menu">
              		<li><a href="#featured" class="text-center"><i class=" fa fa-university"></i></a></li>
                  	<li><a href="#featured" class="text-center"><i class="fa fa-building-o"></i></a></li>
                    <li><a href="#stories" class="text-center"><i class="glyphicon glyphicon-sunglasses"></i></a></li>
                  	<li><a href="#" class="text-center"><i class="fa fa-users"></i></a></li>
                    <li><a href="#" class="text-center"><i class="fa fa-calendar"></i></a></li>
                    <li><a href="#" class="text-center"><i class="fa fa-bar-chart"></i></a></li>
                    <li><a href="#" class="text-center"><i class="fa fa-cog" aria-hidden="true"></i></a></li>
                </ul>
              
            </div>
            
            
            <script src="<c:url value="/resources/js/jquery.min.js"/>"></script>  
          <!--   <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
 -->   
  <!-- Popper.JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <!-- Bootstrap JS -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
<!-- <script type="text/javascript">
        $(document).ready(function () {
			
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                $(this).toggleClass('active');
                
                //alert(document.getElementById("table-resp").classList);
                
                if ( document.getElementById("table-resp").classList.contains('tc-02') )
                	document.getElementById("table-resp").classList.remove('tc-02');
                else
                	document.getElementById("table-resp").classList.add('tc-02');
                         });
        });
    </script> -->
            
