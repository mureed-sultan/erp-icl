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
		 
		 $(".se-pre-con").fadeIn("slow");
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		    
		 
			$http.get('/'+project_name+'/getAllProductCategory').success(function(data) {
				 
				 debugger;
							$scope.lstProductCategory = data;
							
							});
	 };
	 
	 function isEmpty(val){
		    return (val === undefined || val == null || val.length <= 0) ? true : false;
		}
	 
	$scope.getStockReportatWH = function(){
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
		
		$scope.ReportDTO.ser_Process_Id=5;
//		$http.get('/'+project_name+'/getStockReportatProcess?ser_process_id='+$scope.ReportDTO.ser_Process_Id+'&txt_product_name='+$scope.ReportDTO.txt_product_name+'&ser_product_category_id='+$scope.ReportDTO.ser_product_category_id+'&Report_name=stock_list_forgings.jasper',{responseType: 'arraybuffer' }).success(function(data) {

//		window.open(window.location.protocol+"//"+window.location.host+"/rcs-presentation/generateReportKOTReport?toAddress="+masterId,"_blank");

			window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockReportatProcess?ser_process_id="+$scope.ReportDTO.ser_Process_Id+"&txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=stock_list_forgings.jasper","_blank");
			 $(".se-pre-con").fadeOut("slow");
//					"/OPAL/generateReportInvoiceforChef?toAddress="+masterId,"_blank");

				/*$scope.file = new Blob([(data)], {type: 'application/pdf'});
				var fileURL = URL.createObjectURL($scope.file);
			    $scope.content = $sce.trustAsResourceUrl(fileURL);*/
//			    $("#downloadLink").show();
//			    $(".se-pre-con").fadeOut("slow");
//				}).error(function(){
//					$(".se-pre-con").fadeOut("slow");
//				}); 
	};
	
	$scope.getStockReportatPR = function(){
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
		
		$scope.ReportDTO.ser_Process_Id=1;
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockReportatProcess?ser_process_id="+$scope.ReportDTO.ser_Process_Id+"&txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=stock_list_forgings.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

		 
	/*	$http.get('/'+project_name+'/getStockReportatProcess?ser_process_id='+$scope.ReportDTO.ser_Process_Id+'&txt_product_name='+$scope.ReportDTO.txt_product_name+'&ser_product_category_id='+$scope.ReportDTO.ser_product_category_id+'&Report_name=stock_list_production.jasper',{responseType: 'arraybuffer' }).success(function(data) {

				$scope.file = new Blob([(data)], {type: 'application/pdf'});
				var fileURL = URL.createObjectURL($scope.file);
			    $scope.content = $sce.trustAsResourceUrl(fileURL);
//			    $("#downloadLink").show();
			    $(".se-pre-con").fadeOut("slow");
				}).error(function(){
					$(".se-pre-con").fadeOut("slow");
				}); */
	};
	
	$scope.getStockReportatPT = function(){
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
		
		$scope.ReportDTO.ser_Process_Id=2;
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockReportatProcess?ser_process_id="+$scope.ReportDTO.ser_Process_Id+"&txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=stock_list_forgings.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

	/*	$http.get('/'+project_name+'/getStockReportatProcess?ser_process_id='+$scope.ReportDTO.ser_Process_Id+'&txt_product_name='+$scope.ReportDTO.txt_product_name+'&ser_product_category_id='+$scope.ReportDTO.ser_product_category_id+'&Report_name=stock_list_production.jasper',{responseType: 'arraybuffer' }).success(function(data) {

				$scope.file = new Blob([(data)], {type: 'application/pdf'});
				var fileURL = URL.createObjectURL($scope.file);
			    $scope.content = $sce.trustAsResourceUrl(fileURL);
//			    $("#downloadLink").show();
			    $(".se-pre-con").fadeOut("slow");
				}).error(function(){
					$(".se-pre-con").fadeOut("slow");
				}); */
	};
	
	$scope.getStockReportatTemper = function(){
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
		
		$scope.ReportDTO.ser_Process_Id=3;
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockReportatProcess?ser_process_id="+$scope.ReportDTO.ser_Process_Id+"&txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=stock_list_forgings.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

	/*	$http.get('/'+project_name+'/getStockReportatProcess?ser_process_id='+$scope.ReportDTO.ser_Process_Id+'&txt_product_name='+$scope.ReportDTO.txt_product_name+'&ser_product_category_id='+$scope.ReportDTO.ser_product_category_id+'&Report_name=stock_list_production.jasper',{responseType: 'arraybuffer' }).success(function(data) {

				$scope.file = new Blob([(data)], {type: 'application/pdf'});
				var fileURL = URL.createObjectURL($scope.file);
			    $scope.content = $sce.trustAsResourceUrl(fileURL);
//			    $("#downloadLink").show();
			    $(".se-pre-con").fadeOut("slow");
				}).error(function(){
					$(".se-pre-con").fadeOut("slow");
				}); */
	};
	
	$scope.getStockReportatPacking = function(){
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
		
		$scope.ReportDTO.ser_Process_Id=4;
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockReportatProcess?ser_process_id="+$scope.ReportDTO.ser_Process_Id+"&txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=stock_list_forgings.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

		 
		 
		 
		 
		
	};
	
	
	
	$scope.getStockReportatTechno = function(){
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
		
		$scope.ReportDTO.ser_Process_Id=6;
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockReportatProcess?ser_process_id="+$scope.ReportDTO.ser_Process_Id+"&txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=stock_list_forgings.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

	/*	$http.get('/'+project_name+'/getStockReportatProcess?ser_process_id='+$scope.ReportDTO.ser_Process_Id+'&txt_product_name='+$scope.ReportDTO.txt_product_name+'&ser_product_category_id='+$scope.ReportDTO.ser_product_category_id+'&Report_name=stock_list_production.jasper',{responseType: 'arraybuffer' }).success(function(data) {

				$scope.file = new Blob([(data)], {type: 'application/pdf'});
				var fileURL = URL.createObjectURL($scope.file);
			    $scope.content = $sce.trustAsResourceUrl(fileURL);
//			    $("#downloadLink").show();
			    $(".se-pre-con").fadeOut("slow");
				}).error(function(){
					$(".se-pre-con").fadeOut("slow");
				}); */
	};
	
	
	
	$scope.getStockDetailReport = function(){
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
		
		
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockDetailReport?txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=StockDetail.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

	/*	$http.get('/'+project_name+'/getStockReportatProcess?ser_process_id='+$scope.ReportDTO.ser_Process_Id+'&txt_product_name='+$scope.ReportDTO.txt_product_name+'&ser_product_category_id='+$scope.ReportDTO.ser_product_category_id+'&Report_name=stock_list_production.jasper',{responseType: 'arraybuffer' }).success(function(data) {

				$scope.file = new Blob([(data)], {type: 'application/pdf'});
				var fileURL = URL.createObjectURL($scope.file);
			    $scope.content = $sce.trustAsResourceUrl(fileURL);
//			    $("#downloadLink").show();
			    $(".se-pre-con").fadeOut("slow");
				}).error(function(){
					$(".se-pre-con").fadeOut("slow");
				}); */
	};
	
/*	$scope.showProductStockReport = function(){
		
		debugger;
		$scope.PackingDTO.ser_process_id=5;
	     var object =  $scope.PackingDTO;
		$.ajax({
			url: '/'+project_name+'/getStockReportatProcess',
			type: 'post',
			responseType: 'arraybuffer',
          'headers': {
  			'Content-Type': 'application/json'
  		},
          dataType: 'json',
			success: function (data) {
				debugger;
				alert("suc----------");
				$scope.file = new Blob([ (data) ], {
					type : 'application/pdf'
				});
				
				var fileURL = URL.createObjectURL($scope.file);
				$scope.content = $sce.trustAsResourceUrl(fileURL);
				// $("#downloadLink").show();
				$(".se-pre-con").fadeOut("slow");


				
          	if(data=='Failure'){
          		alert("---f");
          		$('#errMsgText').html("Unable to search Recipe");
          		$('#addErrorAlert').show();
          	}
          	else if(data=='Success'){
          		alert("---s");
          		$('#successMsgText').html("Recipe search successfully");
          		$('#successAlert').show();
          		
          	}
          },
	  		'error': function(xhr, d, err){
	  			
	  			$('#errMsgText').html("Unable to search Recipe \n Internal Error-"+xhr+"-"+d+"-"+err);
      		$('#addErrorAlert').show();
      		
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
//			data:object
			data: angular.toJson(object),
			
		});
		
	};
	*/
	
	
	
	$scope.getStockReportatPackingC = function(){
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
		
		$scope.ReportDTO.ser_Process_Id=9;
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockReportatProcess?ser_process_id="+$scope.ReportDTO.ser_Process_Id+"&txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=stock_list_forgings.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

		 
		 
		 
		 
		
	};
	
	$scope.getStockReportatTemperC = function(){
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
		
		$scope.ReportDTO.ser_Process_Id=8;
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockReportatProcess?ser_process_id="+$scope.ReportDTO.ser_Process_Id+"&txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=stock_list_forgings.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

		 
		 
		 
		 
		
	};
	
	$scope.getStockReportatPRC = function(){
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
		
		$scope.ReportDTO.ser_Process_Id=7;
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockReportatProcess?ser_process_id="+$scope.ReportDTO.ser_Process_Id+"&txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=stock_list_containers.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");

		 
		 
		 
		 
		
	};
	
	
	$scope.StockReportTemperC = function(){
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
		
		$scope.ReportDTO.ser_Process_Id=8;
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockReportatProcess?ser_process_id="+$scope.ReportDTO.ser_Process_Id+"&txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=stock_list_containers.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");
		
	};
	
	
	$scope.StockReportWHC = function(){
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
		
		$scope.ReportDTO.ser_Process_Id=9;
		
		window.open(window.location.protocol+"//"+window.location.host+"/"+project_name+"/getStockReportatProcess?ser_process_id="+$scope.ReportDTO.ser_Process_Id+"&txt_product_name="+$scope.ReportDTO.txt_product_name+"&ser_product_category_id="+$scope.ReportDTO.ser_product_category_id+"&Report_name=stock_list_containers.jasper","_blank");
		 $(".se-pre-con").fadeOut("slow");
		
	};
	
});