
var app = angular.module('myApp', []);


app.controller('rptCtrl', function($scope, $http, $filter,$location,$rootScope, $sce) {
	
	 var pathArray = location.pathname.split('/');
	    var appPath = "";//"/";
	    for(var i=1; i<pathArray.length-1; i++) {
	        appPath += pathArray[i] ;
	        //+ "/";
	    }
	    project_name=appPath;
	
	/**
	 * This method will be executed after page load
	 */
	
	// $scope.searchVisit={};
	   $scope.content;
	   $scope.file;
	   $scope.Searchcomplaint={};
	   $scope.ReportDTO={};
	   $scope.blIsProfit=false;
	   $scope.lstDepartments=[];
	   $scope.lstSites=[];
	   $scope.blIsProfit=false;
	   
		 $scope.lstDesignations=[];
	//   $scope.ReportDTO.txtType="DineIn";
	 $scope.init = function (){
	

	alert();
		 
		 $(".datepicker").datepicker({ "setDate": new Date(), dateFormat: "dd-mm-yy" });
		 
		 var d = new Date();
		    var curr_date = d.getDate();
		    if(curr_date <10)
		    	curr_date='0'+curr_date;
		    var curr_month = d.getMonth() + 1;
		    if(curr_month < 10)
		    	curr_month='0'+curr_month;
		    var curr_year = d.getFullYear();
		    d=curr_date + "-" + curr_month + "-" + curr_year;
		    $scope.ReportDTO.dte_date_from=d;
		    $scope.ReportDTO.dte_date_to=d;
		
		 $http.get('/'+project_name+'/getAllDepartments').success(function(data) {
				$scope.lstDepartments = data;
				
						
		 	});
			
		 $http.get('/'+project_name+'/getActiveSite').success(function(data) {
				$scope.lstSites = data;
			
						
		 	});
		
		 $http.get('/'+project_name+'/getAllDesignations').success(function(data) {
				$scope.lstDesignations = data;
			
										
				})
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

		
		if(isEmpty($scope.ReportDTO.ser_customer_id))
		{
		$scope.ReportDTO.ser_customer_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.ser_table_id))
		{
		$scope.ReportDTO.ser_table_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.department))
		{
		$scope.ReportDTO.department='';
		}
		
		if(isEmpty($scope.ReportDTO.designation))
		{
		$scope.ReportDTO.designation='';
		}
		
		if(isEmpty($scope.ReportDTO.code))
		{
		$scope.ReportDTO.code='';
		}
		
		if(isEmpty($scope.ReportDTO.name))
		{
		$scope.ReportDTO.name='';
		}
		
		if(isEmpty($scope.ReportDTO.department))
		{
		$scope.ReportDTO.department='';
		}
		
		if(isEmpty($scope.ReportDTO.ser_user_id))
		{
		$scope.ReportDTO.ser_user_id=0;
		}
		
		if(isEmpty($scope.ReportDTO.txtType))
		{
		$scope.ReportDTO.txtType='';
		}
		
		if(isEmpty($scope.ReportDTO.txtStatus))
		{
		$scope.ReportDTO.txtStatus='';
		}
		
		if(isEmpty($scope.ReportDTO.txtSaleType))
		{
		$scope.ReportDTO.txtSaleType='';
		}
		
		if(isEmpty($scope.ReportDTO.txt_user_name))
		{
		$scope.ReportDTO.txt_user_name='';
		}
		
		if(isEmpty($scope.ReportDTO.txt_product_name))
		{
		$scope.ReportDTO.txt_product_name='';
		}

		$scope.ReportDTO.txtStatus='Paid';
		var Report_name='Sales_Date.jasper';
		if(id==='Category')
			{
			if($scope.blIsProfit)
			{
			Report_name='Sales_Category.jasper';
			$scope.ReportDTO.txt_report_type='Category';
			}
		else
			{
			Report_name='Sales_Category_woProfit.jasper';
			$scope.ReportDTO.txt_report_type='CategoryWO';
			}
			}
		else  if(id==='Date')
		{

			if($scope.blIsProfit)
				{
				Report_name='Sales_Date.jasper';
				$scope.ReportDTO.txt_report_type='Date';
				}
			else
				{
				Report_name='Sales_Date_woProfit.jasper';
				$scope.ReportDTO.txt_report_type='DateWO';
				}
		}
		else  if(id==='TSP')
		{

			if($scope.blIsProfit)
				{
				Report_name='Top_Selling_Product.jasper';
				$scope.ReportDTO.txt_report_type='TSPQ';
				}
			else
				{
				Report_name='Top_Selling_Product.jasper';
				$scope.ReportDTO.txt_report_type='TSPA';
				}
		}
		else  if(id==='StockProduct')
		{

			if($scope.blIsProfit)
				{
				Report_name='Stock_Product.jasper';
				$scope.ReportDTO.txt_report_type='StockProduct';
				$scope.ReportDTO.txtStatus='zero'
				}
			else
				{
				Report_name='Stock_Product.jasper';
				$scope.ReportDTO.txt_report_type='StockProduct';
				}
		}
		else  if(id==='StockCategory')
		{

			if($scope.blIsProfit)
			{
			Report_name='Stock_Category.jasper';
			$scope.ReportDTO.txt_report_type='StockCategory';
			$scope.ReportDTO.txtStatus='zero'
			}
		else
			{
			Report_name='Stock_Category.jasper';
			$scope.ReportDTO.txt_report_type='StockCategory';
			}
		}
		else  if(id==='Sale_Product')
		{

			if($scope.blIsProfit)
				{
				Report_name='Sales_Product_wise.jasper';
				$scope.ReportDTO.txt_report_type='Sale_Product';
				}
			else
				{
				Report_name='Sales_Product_wise.jasper';
				$scope.ReportDTO.txt_report_type='Sale_Product';
				}
		}
		else  if(id==='Dep')
		{
				Report_name='attendance_dept.jasper';
				$scope.ReportDTO.txt_report_type='dept';
		}
		else  if(id==='emp')
		{
				Report_name='attendance_employee.jasper';
				$scope.ReportDTO.txt_report_type='dept';
		}
		else  if(id==='sum')
		{
				Report_name='Attendence.jasper';
				$scope.ReportDTO.txt_report_type='sum';
		}
		
		else
			$scope.ReportDTO.txt_report_type='all';
		
		
		debugger;
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getAttendenceReport?dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to+
																		"&txt_report_type="+$scope.ReportDTO.txt_report_type+
																		"&txt_category="+$scope.ReportDTO.txt_user_name+
																		"&department="+$scope.ReportDTO.department+
																		"&designation="+$scope.ReportDTO.designation+
																		"&code="+$scope.ReportDTO.code+
																		"&name="+$scope.ReportDTO.name+
																		"&product="+$scope.blIsProfit+
																		"&Status="+$scope.ReportDTO.txtStatus+
																		"&Report_name="+Report_name,"_blank");
		 $(".se-pre-con").fadeOut("slow");

		
	};
	
	
$scope.generateAttendenceReportExcel = function(){
	
	
		
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

	
	if(isEmpty($scope.ReportDTO.ser_customer_id))
	{
	$scope.ReportDTO.ser_customer_id=0;
	}
	
	if(isEmpty($scope.ReportDTO.ser_table_id))
	{
	$scope.ReportDTO.ser_table_id=0;
	}
	
	if(isEmpty($scope.ReportDTO.department))
	{
	$scope.ReportDTO.department='';
	}
	
	if(isEmpty($scope.ReportDTO.designation))
	{
	$scope.ReportDTO.designation='';
	}
	
	if(isEmpty($scope.ReportDTO.code))
	{
	$scope.ReportDTO.code='';
	}
	
	if(isEmpty($scope.ReportDTO.name))
	{
	$scope.ReportDTO.name='';
	}
	
	if(isEmpty($scope.ReportDTO.department))
	{
	$scope.ReportDTO.department='';
	}
	
	if(isEmpty($scope.ReportDTO.ser_user_id))
	{
	$scope.ReportDTO.ser_user_id=0;
	}
	
	if(isEmpty($scope.ReportDTO.txtType))
	{
	$scope.ReportDTO.txtType='';
	}
	
	if(isEmpty($scope.ReportDTO.txtStatus))
	{
	$scope.ReportDTO.txtStatus='';
	}
	
	if(isEmpty($scope.ReportDTO.txtSaleType))
	{
	$scope.ReportDTO.txtSaleType='';
	}
	
	if(isEmpty($scope.ReportDTO.txt_user_name))
	{
	$scope.ReportDTO.txt_user_name='';
	}
	
	if(isEmpty($scope.ReportDTO.txt_product_name))
	{
	$scope.ReportDTO.txt_product_name='';
	}

	$scope.ReportDTO.txtStatus='Paid';
	var Report_name='Sales_Date.jasper';
	
	
	
	{
			Report_name='attendance_dept.jasper';
			$scope.ReportDTO.txt_report_type='dept';
	}
	
		debugger;

//			    $http.get('/CIT/generateBillingReportExcel?dateFrom='+$scope.Searchcomplaint.dateFrom+'&dateTo='+$scope.Searchcomplaint.dateTo+'&customer='+$scope.Searchcomplaint.customer.serCustomerId+'&branch='+$scope.Searchcomplaint.branch,{responseType: 'arraybuffer' }).success(function(data) {
//	    		$http.get("'"+project_name+"/generateAttendenceReportExcel?dte_date_from="+$scope.ReportDTO.dte_date_from+
//						"&dte_date_to="+$scope.ReportDTO.dte_date_to+
//						"&txt_report_type="+$scope.ReportDTO.txt_report_type+
//						"&txt_category="+$scope.ReportDTO.txt_user_name+
//						"&department="+$scope.ReportDTO.department+
//						"&designation="+$scope.ReportDTO.designation+
//						"&code="+$scope.ReportDTO.code+
//						"&name="+$scope.ReportDTO.name+
//						"&product="+$scope.ReportDTO.txt_product_name+
//						"&Status="+$scope.ReportDTO.txtStatus+
//						"&Report_name="+Report_name,{responseType: 'arraybuffer' }).success(function(data) {
		
		  $http.get('/App/generateAttendenceReportExcel?dte_date_from='+$scope.ReportDTO.dte_date_from+
				  '&dte_date_to='+$scope.ReportDTO.dte_date_to+
				  '&txt_report_type='+$scope.ReportDTO.txt_report_type+
				  '&txt_category='+$scope.ReportDTO.txt_user_name+
				  '&department='+$scope.ReportDTO.department+
				  '&designation='+$scope.ReportDTO.designation+
				  '&code='+$scope.ReportDTO.code+
				  '&name='+$scope.ReportDTO.name+
				  '&product='+$scope.ReportDTO.txt_product_name+
				  '&Status='+$scope.ReportDTO.txtStatus,
				  {responseType: 'arraybuffer' }).success(function(data) {
				
	    		
	    		//alert();
	    		debugger;
			    	$scope.file = new Blob([(data)], {type: 'application/csv'});
					var url = URL.createObjectURL($scope.file);
		    	      var a = document.createElement('a');
		    	      a.href = url;
		    	      a.download = 'Services.csv';
		    	      a.target = '_blank';
		    	      a.click();
				    $(".se-pre-con").fadeOut("slow");
					}).error(function(){
						$(".se-pre-con").fadeOut("slow");
					
			    	/*$scope.file = new Blob([(data)], {type: 'application/vnd.ms-excel'});
				var fileURL = URL.createObjectURL($scope.file);
			    $scope.content = $sce.trustAsResourceUrl(fileURL);
//			    $("#downloadLink").show();
			    $scope.downloadFileExcel();
			    $(".se-pre-con").fadeOut("slow");
				}).error(function(){
					$(".se-pre-con").fadeOut("slow");*/
				}); 
	};	
	
	
	$scope.downloadFile = function(){
		var url = URL.createObjectURL($scope.file);
	      var a = document.createElement('a');
	      a.href = url;
	      a.download = 'Report.pdf';
	      a.target = '_blank';
	      a.click();
	};
	
	
	$scope.downloadFileExcel = function(){
		var url = URL.createObjectURL($scope.file);
	      var a = document.createElement('a');
	      a.href = url;
	      a.download = 'Report.xls';
	      a.target = '_blank';
	      a.click();
	};
	
	$scope.getConsolidatedSalesSummaryReport = function(id){
		
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
		
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getConsolidatedSalesSummaryReport?txt_product_name="+$scope.ReportDTO.txt_product_name+
																		"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+
																		"&ser_product_id="+$scope.ReportDTO.ser_product_id+
																		"&ser_product_design_id="+$scope.ReportDTO.ser_product_design_id+
																		"&dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to+
																		"&ser_product_quality_id="+$scope.ReportDTO.ser_product_quality_id+
																		"&ser_customer_id="+$scope.ReportDTO.ser_customer_id+
																		"&Report_name=consolidated_sales_summary.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

		
	};
	
	 
	$scope.getSaleDetailReport = function(){
		
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
		
		if(isEmpty($scope.ReportDTO.ser_product_design_id))
		{
		$scope.ReportDTO.ser_product_design_id=0;
		}
		
		
		if(isEmpty($scope.ReportDTO.ser_customer_id))
		{
		$scope.ReportDTO.ser_customer_id=0;
		}
		
		
		if(isEmpty($scope.ReportDTO.ser_product_quality_id))
		{
		$scope.ReportDTO.ser_product_quality_id=0;
		}
		
		window.open(window.location.protocol+"//"+window.location.host+"/App/getSaleDetailReport?ser_customer_id="+$scope.ReportDTO.ser_customer_id+
																		"&txt_sale_order_code="+$scope.ReportDTO.txt_sale_order_code+
																		"&txt_product_name="+$scope.ReportDTO.txt_product_name+
																		"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+
																		"&ser_product_id="+$scope.ReportDTO.ser_product_id+
																		"&ser_product_design_id="+$scope.ReportDTO.ser_product_design_id+
																		"&dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to+
																		"&ser_product_quality_id="+$scope.ReportDTO.ser_product_quality_id+
																		"&Report_name=Sales_Order_Detail.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");


	};
	
$scope.getSaleDetailReportSummary = function(){
		
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
		
		
		if(isEmpty($scope.ReportDTO.txt_product_quality_name))
		{
		$scope.ReportDTO.txt_product_quality_name='';
		}
		
		window.open(window.location.protocol+"//"+window.location.host+"/App/getSaleDetailReportSummary?txt_product_name="+$scope.ReportDTO.txt_product_name+
																		"&txt_product_quality_name="+$scope.ReportDTO.txt_product_quality_name+
																		"&dte_date_from="+$scope.ReportDTO.dte_date_from+
																		"&dte_date_to="+$scope.ReportDTO.dte_date_to+
																		"&Report_name=Top_selling_product.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");


	};
	
});