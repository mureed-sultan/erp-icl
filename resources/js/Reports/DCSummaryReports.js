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
	   $scope.lstCustomer={};
	   $scope.value=0;
	 $scope.init = function (){
		 
		
		 $(".datepicker").datepicker({ "setDate": new Date(), dateFormat: "dd-mm-yy" });
		 
			$http.get('/OPAL/getAllProductCategory').success(function(data) {
				 
				 debugger;
							$scope.lstProductCategory = data;
							
							});
			
			$http.get('/OPAL/getAllProduct').success(function(data) {
				 
				
				debugger;
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
	     	
	    	$http.get('/OPAL/getAllCustomer').success(function(data) {
				 
				 debugger;
							$scope.lstCustomer = data;
							
							});
	     
	 };
	 
	 function isEmpty(val){
		    return (val === undefined || val == null || val.length <= 0) ? true : false;
		}
	 
	$scope.getSaleInvoiceListReport = function(id){
		
		$scope.ReportDTO.dte_date_from=$("#dateFrom").val();
		
		$scope.ReportDTO.dte_date_to=$("#dateTo").val();
		
		if(isEmpty($scope.ReportDTO.dte_date_from))
			{
			
			$scope.ReportDTO.dte_date_from='';
			}
		
		if(isEmpty($scope.ReportDTO.dte_date_to))
		{
			
		$scope.ReportDTO.dte_date_to='';
		}
		
		debugger;
		$(".se-pre-con").fadeIn("slow");
		/*if(isEmpty($scope.ReportDTO.txt_product_name))
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
		}*/
		
		if(isEmpty($scope.ReportDTO.ser_customer_id))
		{
		$scope.ReportDTO.ser_customer_id=0;
		}
		
		$scope.ReportDTO.ser_Process_Id = id;
		
		
		window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getSaleInvoiceListReport?dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to+
																		"&ser_customer_id="+$scope.ReportDTO.ser_customer_id+
																		"&Report_name=sales_analysis.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

		
	};
	
	
	$scope.getDCSummaryReport = function(id){
		
		$scope.ReportDTO.dte_date_from=$("#dateFrom").val();
		
		$scope.ReportDTO.dte_date_to=$("#dateTo").val();
		
		if(isEmpty($scope.ReportDTO.dte_date_from))
			{
			
			$scope.ReportDTO.dte_date_from='';
			}
		
		if(isEmpty($scope.ReportDTO.dte_date_to))
		{
			
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
		
		if(isEmpty($scope.ReportDTO.ser_customer_id))
		{
		$scope.ReportDTO.ser_customer_id=0;
		}
		
		$scope.ReportDTO.ser_Process_Id = id;
		var Report_name='DR_DateWise.jasper';
		if(id == 10)
			Report_name='DR_Town_DesignWise.jasper';
		else if(id == 11)
			Report_name='Dispatch_Town_Design_WOP.jasper';
		
		
		
		/*window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getDCSummaryReport?ser_issue_id="+id+
			
				"&Report_name=DR_DateWise.jasper","_blank");*/
		
		window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getDCSummaryReport?txt_product_name="+$scope.ReportDTO.txt_product_name+
																		"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+
																		"&ser_product_id="+$scope.ReportDTO.ser_product_id+
																		"&ser_product_design_id="+$scope.ReportDTO.ser_product_design_id+
																		"&dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to+
																		"&ser_product_quality_id="+$scope.ReportDTO.ser_product_quality_id+
																		"&ser_customer_id="+$scope.ReportDTO.ser_customer_id+
																		"&Report_name="+Report_name+"","_blank");
		 $(".se-pre-con").fadeOut("slow");

		
	};
	
	

	$scope.getDCSummary_groupReport = function(id){
		
		$scope.ReportDTO.dte_date_from=$("#dateFrom").val();
		
		$scope.ReportDTO.dte_date_to=$("#dateTo").val();
		
		if(isEmpty($scope.ReportDTO.dte_date_from))
			{
			
			$scope.ReportDTO.dte_date_from='';
			}
		
		if(isEmpty($scope.ReportDTO.dte_date_to))
		{
			
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
		
		if(isEmpty($scope.ReportDTO.ser_customer_id))
		{
		$scope.ReportDTO.ser_customer_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.txt_mult_product_category))
		{
		$scope.ReportDTO.txt_mult_product_category='';
		}
		
		if(isEmpty($scope.ReportDTO.txt_mult_product))
		{
		$scope.ReportDTO.txt_mult_product='';
		}
		
		if(isEmpty($scope.ReportDTO.txt_mult_product_design))
		{
		$scope.ReportDTO.txt_mult_product_design='';
		}
		
		if(isEmpty($scope.ReportDTO.txt_mult_customer))
		{
		$scope.ReportDTO.txt_mult_customer='';
		}
		
		
		$scope.ReportDTO.ser_Process_Id = 5;
		var Report_name='MonthlyTruckReport.jasper';
		/*	if(id == 10)
			Report_name='DR_Town_DesignWise.jasper';
		else if(id == 11)
			Report_name='Dispatch_Town_Design_WOP.jasper';*/
		
		if($scope.value == 10)
			Report_name='DR_DateWise.jasper';
		if($scope.value == 12)
			Report_name='DR_Town_DesignWise.jasper';
		else if($scope.value == 11)
			Report_name='Dispatch_Town_Design_WOP.jasper';
		else if($scope.value == 13)
			Report_name='DR_Town_Date_ProductWise.jasper';
		
		else if($scope.value == 14)
			Report_name='Monthly_Town_MonthWise.jasper';
		
		else if($scope.value == 15)
			Report_name='Monthly_Town_Product_MonthWise.jasper';
		
		else if($scope.value == 16)
			Report_name='DR_Town_Date2_ProductWise.jasper';
		
		else if($scope.value == 21)
			Report_name='MonthlyTruckReport.jasper';
		
		/*window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getDCSummaryReport?ser_issue_id="+id+
			
				"&Report_name=DR_DateWise.jasper","_blank");*/
		if($scope.value == 21)
		window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getDCSummary_groupReport?txt_product_name="+$scope.ReportDTO.txt_product_name+
																		"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+
																		"&ser_product_id="+$scope.ReportDTO.ser_product_id+
																		"&ser_product_design_id="+$scope.ReportDTO.ser_product_design_id+
																		"&dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to+
																		"&ser_product_quality_id="+$scope.ReportDTO.ser_product_quality_id+
																		"&ser_customer_id="+$scope.ReportDTO.ser_customer_id+
																		"&txt_mult_product_design="+$scope.ReportDTO.txt_mult_product_design+
																		"&txt_mult_product="+$scope.ReportDTO.txt_mult_product+
																		"&txt_mult_product_category="+$scope.ReportDTO.txt_mult_product_category+
																		"&txt_mult_customer="+$scope.ReportDTO.txt_mult_customer+
																		"&Report_name="+Report_name+"","_blank");
		else
			window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getDCSummaryReport?txt_product_name="+$scope.ReportDTO.txt_product_name+
					"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+
					"&ser_product_id="+$scope.ReportDTO.ser_product_id+
					"&ser_product_design_id="+$scope.ReportDTO.ser_product_design_id+
					"&dte_date_from="+$scope.ReportDTO.dte_date_from+
					"&dte_date_to="+$scope.ReportDTO.dte_date_to+
					"&ser_product_quality_id="+$scope.ReportDTO.ser_product_quality_id+
					"&ser_customer_id="+$scope.ReportDTO.ser_customer_id+
					"&txt_mult_product_design="+$scope.ReportDTO.txt_mult_product_design+
					"&txt_mult_product="+$scope.ReportDTO.txt_mult_product+
					"&txt_mult_product_category="+$scope.ReportDTO.txt_mult_product_category+
					"&Report_name="+Report_name+"","_blank");
		 $(".se-pre-con").fadeOut("slow");

		
	};
	
});