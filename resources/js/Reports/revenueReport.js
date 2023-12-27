var app = angular.module('myApp', []);
app.controller('rptCtrl', function($scope, $http, $sce) {
	
	/**
	 * This method will be executed after page load
	 */
	
	// $scope.searchVisit={};
	   $scope.content;
	   $scope.file;
	   $scope.Searchcomplaint={};
	   $scope.areas={};
	 $scope.init = function (){
		 
		 $http.get('/CIT/getAllArea').success(function(data){
			  $scope.areas = data; });
		//alert("hiuh");
	 };
	$scope.generateReport = function(){
		debugger;
	//	alert("hello");
//		$("#downloadLink").hide();
		
			    //$http.get('/CIT/generateReport?complaintId='+$scope.Searchcomplaint.complaintId+'&status='+$scope.Searchcomplaint.status,{responseType: 'arraybuffer' }).success(function(data) {
	    		$http.get('/CIT/generateReportRevenue?year='+$scope.Searchcomplaint.year+'&area='+$scope.Searchcomplaint.area,{responseType: 'arraybuffer' }).success(function(data) {
				$scope.file = new Blob([(data)], {type: 'application/pdf'});
				var fileURL = URL.createObjectURL($scope.file);
			    $scope.content = $sce.trustAsResourceUrl(fileURL);
//			    $("#downloadLink").show();
			    $(".se-pre-con").fadeOut("slow");
				}).error(function(){
					$(".se-pre-con").fadeOut("slow");
				}); 
	};
	
	/*$scope.downloadFile = function(){
		var url = URL.createObjectURL($scope.file);
	      var a = document.createElement('a');
	      a.href = url;
	      a.download = 'complaintReport.pdf';
	      a.target = '_blank';
	      a.click();
	};*/
	
	/*$("#checkIn").on("dp.change", function() {
        $scope.searchVisit.checkInDate = $("#checkIn").val();
    });
	$("#checkOutDateTime").on("dp.change", function() {
        $scope.searchVisit.checkOutDateTime = $("#checkOutDateTime").val();
    });*/
});