var app = angular.module('myApp',[]);

app.controller('productCtrl', function($scope, $http, $filter){
	
	
	$scope.t1={};
	$scope.lstProductCategory ={};
	$scope.lstSOall = {};
	$scope.lstSO ={};
	$scope.searchDTO={};
	
	$scope.days = [];
	$scope.hours = [];
	$scope.minutes = [];
	$scope.seconds =[];
	$scope.countDownDate=[];
	$scope.distance=[];
	
	
	$scope.init = function(){
		//alert("---3----");
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
			    project_name=appPath;
		debugger;
		$http.get('/'+project_name+'/getActiveProductCategory').success(
				function(data) {

					debugger;
					$scope.lstProductCategory = data;

				});
		
	//	$scope.searchSaleOrder();
		//$scope.check();
	}
	
	$scope.check2=function(item , count){
		
	//	alert("---2");
		// Set the date we're counting down to
//		var countDownDate = new Date("Jan 14, 2021 15:37:25").getTime();
		alert();
		debugger;
		$scope.countDownDate[count] = new Date(item.dteCreateddate).getTime();

		//var countDownDate = new Date("2019-01-14 17:37:25").getTime();
		// Update the count down every 1 second
		var x = setInterval(function() {

		  // Get todays date and time
		  var now = new Date().getTime();

		  // Find the distance between now and the count down date
//		  $scope.distance[count]  = $scope.countDownDate[count] - now;
		  $scope.distance[count]  =  now-$scope.countDownDate[count];
		  
//		 var distance  = countDownDate - now;
		  // Time calculations for days, hours, minutes and seconds
		  $scope.days[count] = Math.floor($scope.distance[count] / (1000 * 60 * 60 * 24));
		  $scope.hours[count]  = Math.floor(($scope.distance[count]  % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		  $scope.minutes[count]  = Math.floor(($scope.distance[count]  % (1000 * 60 * 60)) / (1000 * 60));
		  $scope.seconds[count]  = Math.floor(($scope.distance[count]  % (1000 * 60)) / 1000);

		  // Display the result in the element with id="demo"
		  document.getElementById("demo"+count).innerHTML =  $scope.days[count] + "d " +  $scope.hours[count] + "h "
		  +  $scope.minutes[count] + "m " +  $scope.seconds[count] + "s ";
		  
		/*  $scope.t1=days + "d " + hours + "h "
		  + minutes + "m " + seconds + "s ";*/

		  // If the count down is finished, write some text
		  if (distance < 0) {
		    clearInterval(x);
		    document.getElementById("demo"+[count]).innerHTML = "EXPIRED";
		  }
		}, 1000);
	}
	
	
	$scope.check=function(){
		
		alert("---1");
		// Set the date we're counting down to
//		var countDownDate = new Date("Jan 14, 2021 15:37:25").getTime();
		debugger;
		var countDownDate = new Date("2019-01-14 15:37:25").getTime();

		// Update the count down every 1 second
		var x = setInterval(function() {

		  // Get todays date and time
		  var now = new Date().getTime();

		  // Find the distance between now and the count down date
		  var distance = countDownDate - now;

		  // Time calculations for days, hours, minutes and seconds
		  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		  // Display the result in the element with id="demo"
		  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
		  + minutes + "m " + seconds + "s ";
		  
		  $scope.t1=days + "d " + hours + "h "
		  + minutes + "m " + seconds + "s ";

		  // If the count down is finished, write some text
		  if (distance < 0) {
		    clearInterval(x);
		    document.getElementById("demo").innerHTML = "EXPIRED";
		  }
		}, 1000);
	}
	$scope.searchSaleOrder = function(){

	  	/*  $scope.searchDTO.dte_date_from=$("#dateFrom").val();
			
			$scope.searchDTO.dte_date_to=$("#dateTo").val();*/
			
	  	  
	  	//  var object = JSON.stringify($scope.searchDTO);
		 $scope.searchDTO.txtStatus="Open"
		
			var object = $scope.searchDTO;
			$.ajax({
				url: '/'+project_name+'/searchSaleOrder',
				type: 'post',
	          'headers': {
	  			'Content-Type': 'application/json'
	  		},
	          dataType: 'json',
				success: function (data) {
					
					alert("---")+data.length;
					debugger;
					alert("---")+data.length;
//					$scope.lstSO = data;
					$scope.lstSOall = data;
				/*	$scope.lstSO = $filter('filter')($scope.lstSOall, function(so){
						return (so.txtStatus == 'Complete' || so.txtStatus == 'Delivered' || so.txtStatus == 'Pending');
			       });	*/
					/*window.setTimeout(function(){
						
						$('#refreshmain').click();
						  /// call your function here
						}, 2000);*/
				
		
			
			
	          	if(data=='Failure'){
	          		$('#errMsgText').html("Unable to search ");
	          		$('#addErrorAlert').show();
	          	}
	          	else if(data=='Success'){
	          		
	          		$('#successMsgText').html(" search successfully");
	          		$('#successAlert').show();
	          		
	          	}
	          },
		  		'error': function(xhr, d, err){
		  			$('#errMsgText').html("Unable to search  \n Internal Error");
	      		$('#addErrorAlert').show();
	      		
		  		},complete: function(){
		  			$(".se-pre-con").fadeOut("slow");
				},

				data: angular.toJson(object)
			});
			
		};
});
