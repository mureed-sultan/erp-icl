var app = angular.module('myApp', []);
app.controller('rptCtrl', function($scope, $http, $sce) {
	
	/**
	 * This method will be executed after page load
	 */
	
	// $scope.searchVisit={};
	   $scope.content;
	   $scope.file;
	   $scope.Searchcomplaint={};
	   $scope.ReportDTO={};
	   $scope.lstProductCategory={};
	   
	 $scope.init = function (){
		 
		 $(".datepicker").datepicker({ "setDate": new Date(), dateFormat: "dd-mm-yy" });
		 
			$http.get('/OPAL/getAllProductCategory').success(function(data) {
				 
				 debugger;
							$scope.lstProductCategory = data;
							
							});
			
			$http.get('/OPAL/getAllProduct').success(function(data) {
				 
				
				$scope.lstProducts = data;
				
				});
			$http.get('/OPAL/getAllProductDesign').success(function(data) {
				 
				 debugger;
							$scope.lstProductDesign = data;
							
							});
			

	     	$http.get('/OPAL/getAllProductQuality').success(function(data) {
				 
				 debugger;
							$scope.lstProductQuality = data;
							
							});
	     
	 };
	 
	 function isEmpty(val){
		    return (val === undefined || val == null || val.length <= 0) ? true : false;
		}
	 
	$scope.getDisptachReportCustomerWise = function(id){
		
		$scope.ReportDTO.dte_date_from=$("#dateFrom").val();
		
		$scope.ReportDTO.dte_date_to=$("#dateTo").val();
		
		if(isEmpty($scope.ReportDTO.dte_date_from))
			{
			alert("1");
			$scope.ReportDTO.dte_date_from='';
			}
		
		if(isEmpty($scope.ReportDTO.dte_date_to))
		{
			alert("2");
		$scope.ReportDTO.dte_date_to='';
		}
		
		debugger;
		$(".se-pre-con").fadeIn("slow");
		if(isEmpty($scope.ReportDTO.txt_product_name))
			{
			$scope.ReportDTO.txt_product_name='';
			}
		
		if(isEmpty($scope.ReportDTO.ser_product_category_id))
		{
		$scope.ReportDTO.ser_product_category_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_product_id))
		{
		$scope.ReportDTO.ser_product_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_product_quality_id))
		{
		$scope.ReportDTO.ser_product_quality_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_product_design_id))
		{
		$scope.ReportDTO.ser_product_design_id=0;
		}
		
		
		$scope.ReportDTO.ser_Process_Id = id;
		
		
		window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getDisptachReportCustomerWise?txt_product_name="+$scope.ReportDTO.txt_product_name+
																		"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+
																		"&ser_product_id="+$scope.ReportDTO.ser_product_id+
																		"&ser_product_design_id="+$scope.ReportDTO.ser_product_design_id+
																		"&dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to+
																		"&ser_product_quality_id="+$scope.ReportDTO.ser_product_quality_id+
																		"&Report_name=Product_dispatch_customer_wise.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

		/*
		$http.get(
				'/OPAL/getStockLedgerReportatProcess?ser_process_id='
						+ $scope.ReportDTO.ser_Process_Id
						+ '&txt_product_name='
						+ $scope.ReportDTO.txt_product_name
						+ '&ser_product_category_id='
						+ $scope.ReportDTO.ser_product_category_id
						+ '&ser_product_id='
						+ $scope.ReportDTO.ser_product_id
						+ '&ser_product_design_id='
						+ $scope.ReportDTO.ser_product_design_id
						+ '&dte_date_from='
						+ $scope.ReportDTO.dte_date_from
						+ '&dte_date_to='
						+ $scope.ReportDTO.dte_date_to
						+ '&ser_product_quality_id='
						+ $scope.ReportDTO.ser_product_quality_id
						+ '&Report_name=productStockLedger.jasper', {
					responseType : 'arraybuffer'
				}).success(function(data) {

				$scope.file = new Blob([(data)], {type: 'application/pdf'});
				var fileURL = URL.createObjectURL($scope.file);
			    $scope.content = $sce.trustAsResourceUrl(fileURL);
//			    $("#downloadLink").show();
			    $(".se-pre-con").fadeOut("slow");
				}).error(function(){
					$(".se-pre-con").fadeOut("slow");
				}); */
	};
	
	
	
});