<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>

</div>
    <script src="<c:url value="/resources/js/jquery.js"/>"></script>
	<script src="<c:url value="/resources/js/jquery.form.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/angular.min.js" />" ></script>
    <script type="text/javascript" src="<c:url value="/resources/js/bootstrap.js" />" ></script>
    <script src="<c:url value="/resources/js/jquery-ui.min.js"/>"></script>
    <script src="<c:url value="/resources/js/font-awesome.min.js"/>"></script>
    <script src="<c:url value="/resources/js/notify.min.js"/>"></script>
    <script src="<c:url value="/resources/js/jquery.dataTables.min.js"/>"></script>
      <script src="<c:url value="/resources/js/validate.min.js"/>"></script>
    <!-- Menu Toggle Script -->
    <script>
    /* $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    }); */
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
});
    $(window).load(function() {
		$(".se-pre-con").fadeOut("slow");;
	});
    /* off-canvas sidebar toggle */

    $('[data-toggle=offcanvas]').click(function() {
      	$(this).toggleClass('visible-xs text-center');
        $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
        $('.row-offcanvas').toggleClass('active');
        $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
        $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
        $('#btnShow').toggle();
    });
    
    // This code is to select the current page menu from navigation bar
    $(document).ready(function() {
        var active = window.location.pathname;
        $('a[href="' + this.location.pathname + '"]').parent().parent().addClass('active').addClass("collapse").addClass("in");
        $('a[href="' + this.location.pathname + '"]').parent().addClass('active_menu');
        });
    </script>
