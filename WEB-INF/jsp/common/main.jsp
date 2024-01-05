




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
		gap: 1.5vw;
		margin-inline: 1rem;
		transform: scale(0);
		animation: popupmain 1000ms forwards ease-in-out;

	}
	.grid-box{
		padding: 25px;
		border-radius: 25px;
		box-sizing: revert;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition-duration: 500ms;
		cursor: pointer;
	}
	.d-flex{
		display: flex;
	}

.percent{
	width:75px;
	height:75px;
}
.percent svg{
	stroke-linecap:round;
}
.flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 6vw;
}
.icon i{
	font-size: 35px;
	transition-duration: 500ms;
}.icon i:hover{
	color:#A1C034 ;
}
.text-area:hover{
	color:#A1C034 ;

}
.text-area{
	transition-duration: 500ms;

}
.text-area b{
	font-size: 25px;
	color: gray;
	font-weight: 600;
}
.text-area b span{
	font-size: 20px;
	font-weight: 500;
}
.grid-box:hover{
	transform: scale(1.2);
}
.right_col h2{
	margin-left: 2.5rem;
}
.invoices{
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 1fr 1fr;
	margin-top: 3rem;
	background-color: #F3F3FD;
	margin-left: 1rem;
	transform: scale(0);
		animation: popupmain 1000ms forwards ease-in-out;
}
.amount-owned{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-image: linear-gradient(#A3C133 0%, #535356 100%);
	border-radius: 20px;
	grid-row: 1/span 2;
}
.value-meter img{
	width: 90%;
	margin: auto;
	display: flex;
	margin-top: 1rem;
	border-radius: 10px;
	margin-bottom: 2rem;
}
.amount-owned .icon i{
	font-size: 40px;
	color: white;
}
.amount-owned .amount-own p:nth-child(1){
	font-size: 15px;	
	font-weight: 200;
	margin-bottom: 10px;
	text-align: center;
	color: white;

}.amount-owned .amount-own p:nth-child(2){
	font-size: 35px;	
	font-weight: 700;
	margin: 20px 0 20px 0;
	text-align: center;
	color: white;

}.amount-owned .amount-own p:nth-child(3){
	text-align: center;
	color: white;
}
.info-section{
	background-color: white;
	margin: 1rem 2rem 1rem 2rem;
	border-radius: 20px;
	padding: 10px 25px;
}
.info-section h3{
	font-weight: 700;
	font-size: 35px;
}
.justify-center{
	justify-content: space-between;
	align-items: center;
	width: 85%;
}
.justify-center h2, .justify-center p{
	margin: 0;
}
.justify-center .success{
	background-color: limegreen;
	padding: .4rem;
}.justify-center .warning{
	background-color: yellowgreen;
	padding: .4rem;
}
.grid-row2{
	grid-row: 2;
	grid-column: 2;
}
.graph-section{
	grid-row:1/span 2;
	grid-column: 3/span 2;
	background-color: white;
	border-radius: 10px;
	margin: 1rem;
}
.graph-section img{
	width: 100%;
}
@keyframes popupmain {
	0%{
		transform: scale(0);
	}
	100%{
		transform: scale(1);

	}
}
</style>
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
									<div class="percent">
										<p style="display:none;">20%</p>
								  </div>
								</div>			
							</div>
							<div class="text-area">Ready to Assign</div>
							<div class="text-area"><b>200-<span>42</span></b></div>
							<div class="text-area">its grab from 139</div>
						</div>	<div class="grid-box">
							<div class="flex">
								<div class="icon"><i class="fa fa-id-badge" aria-hidden="true"></i>

								</div>
								<div class="progress-round">
									<div class="percent">
										<p style="display:none;">40%</p>
								  </div>
								</div>			
							</div>
							<div class="text-area">Ready to Assign</div>
							<div class="text-area"><b>200-<span>42</span></b></div>
							<div class="text-area">its grab from 139</div>
						</div>	<div class="grid-box">
							<div class="flex">
								<div class="icon"><i class="fa fa-calendar-times-o" aria-hidden="true"></i>

								</div>
								<div class="progress-round">
									<div class="percent">
										<p style="display:none;">60%</p>
								  </div>
								</div>			
							</div>
							<div class="text-area">Ready to Assign</div>
							<div class="text-area"><b>200-<span>42</span></b></div>
							<div class="text-area">its grab from 139</div>
						</div>	<div class="grid-box">
							<div class="flex">
								<div class="icon"><i class="fa fa-calendar" aria-hidden="true"></i>

								</div>
								<div class="progress-round">
									<div class="percent">
										<p style="display:none;">80%</p>
								  </div>
								</div>			
							</div>
							<div class="text-area">Ready to Assign</div>
							<div class="text-area"><b>200-<span>42</span></b></div>
							<div class="text-area">its grab from 139</div>
						</div>
					</div>
					<div class="invoices">
						<div class="amount-owned">
							<div class="menu"></div>
							<div class="value-meter">
								<img src="https://i.stack.imgur.com/vEyPR.png" alt="">
							</div>
							<div class="icon"><i class="fa fa-line-chart" aria-hidden="true"></i>
							</div>
							<div class="amount-own">
								<p>Amount Owned</p>
								<p class="value">$<span>933,879.45</span></p>
								<p>$125,789.89</p>
							</div>
						</div>
						<div class="info-section">
							<h3>New Client</h3>
							<div class="d-flex justify-center">
								<h2>52</h2>
								<p class="success">+ 18.7 %</p>
							</div>
						</div>		
						<div class="info-section grid-row2">
							<h3>New Client</h3>
							<div class="d-flex justify-center">
								<h2>52</h2>
								<p class="success">+ 18.7 %</p>
							</div>
						</div>
						<div class="graph-section"><img src="https://canvasjs.com/wp-content/uploads/2021/03/multi-series-line-chart.png" alt=""></div>
					</div>
					<div class="history-section"></div>
					
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
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js'></script>
<script type='text/javascript'>
  !function(a){a.fn.percentageLoader=function(b){this.each(function(){function q(){p.customAttributes.arc=function(a,b,c){var h,d=360/b*a,e=(90-d)*Math.PI/180,f=j+c*Math.cos(e),g=k-c*Math.sin(e);return h=b==a?[["M",j,k-c],["A",c,c,0,1,1,j-.01,k-c]]:[["M",j,k-c],["A",c,c,0,+(d>180),1,f,g]],{path:h}},p.path().attr({arc:[100,100,l],"stroke-width":d.strokeWidth,stroke:d.bgColor}),e&&(m=p.path().attr({arc:[.01,100,l],"stroke-width":d.strokeWidth,stroke:d.ringColor,cursor:"pointer"}),r(e,100,l,m,2)),n=p.text(j,k,"0%").attr({font:d.fontWeight+" "+d.fontSize+" Arial",fill:d.textColor})}function r(a,b,c,d){f?d.animate({arc:[a,b,c]},900,">"):a&&a!=b?d.animate({arc:[a,b,c]},750,"elastic"):(a=b,d.animate({arc:[a,b,c]},750,"bounce",function(){d.attr({arc:[0,b,c]})}))}var c=a(this),d=a.extend({},a.fn.percentageLoader.defaultConfig,b),e=parseInt(c.children(d.valElement).text()),f=!0,h=parseInt(c.css("width")),i=parseInt(c.css("height")),j=h/2,k=i/2,l=j-d.strokeWidth/2,m=null,n=null,p=Raphael(this,h,i);q();

    // Animate the percentage numbers
    var targetPercentage = e;
    var currentPercentage = 0;
    var interval = setInterval(function() {
      if (currentPercentage <= targetPercentage) {
        n.attr('text', currentPercentage + '%');
        currentPercentage++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Adjust the interval to control the animation speed
  })},a.fn.percentageLoader.defaultConfig={valElement:"p",strokeWidth:20,bgColor:"#d9d9d9",ringColor:"#d53f3f",textColor:"#9a9a9a",fontSize:"12px",fontWeight:"normal"}}(jQuery);
</script>

<script type="text/javascript">		
  $('.percent').percentageLoader({
    bgColor: 'rgba(0,0,0,.2)',
    ringColor: '#A1C034',
    textColor: 'black',
    fontSize: '20px',
    strokeWidth: 10
  });
</script>



</html>