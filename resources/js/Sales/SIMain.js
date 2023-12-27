

var app = angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
	debugger;
	var pathArray = location.pathname.split('/');
	var appPath = "";// "/";
	for (var i = 1; i < pathArray.length - 1; i++) {
		appPath += pathArray[i];
		// + "/";
	}
	project_name = appPath;
	 $routeProvider
	 .when('/View', {
			
		 templateUrl: '/' + project_name + '/SIView',
			controller: 'DCCtrl'
				
		})
		.when('/editIssueForm', {
			templateUrl: '/' + project_name + '/SIViewEdit',
			controller: 'editDCCtrl'
		})
	
	
		.otherwise({
			templateUrl: '/' + project_name + '/SIView',
				controller: 'DCCtrl'
				
		});
	   


});
app.run(function($rootScope) {
	

    
});

app.controller('productCtrl', function($scope, $http, $filter,$rootScope,$window,$sce){	
	
	$scope.init = function(){
		
	
			window.location.href = "#/View";
			};
		
	
});

//app.controller('DCCtrl', function($scope, $http, $filter){
	app.controller('DCCtrl', function($scope, $http, $filter,$rootScope,$window,$sce){	
	
	
	
	// /////////////////////////////////
	$scope.CfgProductSetup = {};
	$scope.newSlsTblSoDetail = {};
	$scope.editProductComponent = {};
	
	$scope.newSlsTblSI = {};
	$scope.newSlsTblSoDetail = {};
	
	$scope.lstProductCategory={};
	$scope.lstBrand={};
	$scope.lstProduct={};
	$scope.lstPacking={};
	$scope.lstCustomer={};
	
	$scope.lstDCDetails=[];
	$scope.lstDC={};
	$scope.lstDCAll={};
	$scope.searchDTO={};
	$scope.init = function(){
	
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
	debugger;
		    $scope.searchDTO.dte_date_from=d;
		    $scope.searchDTO.dte_date_to=d;
		    setTimeout(function () {
				  $(function () {
				
					  $scope.getProduct();
				   
				  });
				}, 500);

		};
	
	
	$scope.getProduct = function(){
//		$(".se-pre-con").fadeIn("slow");
	   
		
	

	     
	     	$http.get('/' + project_name + '/getAllProductCategory').success(function(data) {
			 
			 debugger;
						$scope.lstProductCategory = data;
						
						});
	     	
	    
 
 
	     	$http.get('/' + project_name + '/getAllProduct').success(function(data) {
				 
				 debugger;
							$scope.lstProduct = data;
							
							});
	     	
	     	$http.get('/' + project_name + '/getAllCustomer').success(function(data) {
				 
				 debugger;
							$scope.lstCustomer = data;
							
							});
	    	$http.get('/' + project_name + '/getAllProductDesign').success(function(data) {
				 
				 debugger;
							$scope.lstProductDesign = data;
							
							});
			

	     	$http.get('/' + project_name + '/getAllProductQuality').success(function(data) {
				 
				 debugger;
							$scope.lstProductQuality = data;
							
							});
	     	
	     	
	     	
	     /*	$http.get('/' + project_name + '/getAllIssue').success(function(data) {
	     		
				 debugger;
							$scope.lstDCAll = data;
							$scope.lstDC =$scope.lstDCAll;
							$scope.lstDC = $filter('filter')($scope.lstDCAll, function(branch){
								return branch.txtStatus == 'Approve';
					       });	
							$scope.populateDataTable($scope.lstDC);
							
							});*/
	     	$scope.searchIssue();
	};
	
$scope.searchIssue = function(){
	
		debugger;
		var table = $('#data-table').DataTable();
		
  	  	table.clear().draw();
  	  	
  	  $scope.searchDTO.dte_date_from=$("#dateFrom").val();
		
		$scope.searchDTO.dte_date_to=$("#dateTo").val();
		
  	  
  	//  var object = JSON.stringify($scope.searchDTO);
		var object = $scope.searchDTO;
		$.ajax({
			url: '/' + project_name + '/searchIssue',
			type: 'post',
          'headers': {
  			'Content-Type': 'application/json'
  		},
          dataType: 'json',
			success: function (data) {
				$scope.lstDCAll = data;
//				$scope.lstDC =$scope.lstDCAll;
				$scope.lstDC = $filter('filter')($scope.lstDCAll, function(branch){
					return branch.txtStatus == 'Approve';
		       });	
				$scope.populateDataTable($scope.lstDC);
				
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
	
	$scope.addBookingDetail = function(){
		debugger;
		$scope.lstDCDetails.push(angular.copy($scope.newSlsTblSoDetail));
	};
	
	$scope.removeBookingDetail = function(){
		$scope.lstDCDetails.pop(angular.copy($scope.newSlsTblSoDetail));
		$scope.lstDCDetails
	};
	


	$scope.populateEditDialog = function(txtProductCodeforEdit){
		//alert(txtProductCodeforEdit);
		
		debugger;
//		$rootScope.editIssue = $filter("filter")($scope.lstDC, {serIssueId:txtProductCodeforEdit})[0];
		
		$rootScope.editIssue = $filter('filter')
		(
				$scope.lstDC,
				function(issue) {
					return (issue.serIssueId==txtProductCodeforEdit)
				})[0];
		
	
		
	};
	$scope.populateEditDialogApprove = function(txtProductCodeforEdit){

//		$rootScope.editIssue = $filter("filter")($scope.lstDC, {serIssueId:txtProductCodeforEdit})[0];
		
		$rootScope.editIssue = $filter('filter')
		(
				$scope.lstDC,
				function(issue) {
					return (issue.serIssueId==txtProductCodeforEdit)
				})[0];
		
		$scope.editIssue.txtStatus='Approve';
		$scope.updateIsuue();
	};

	function isEmpty(val){
	    return (val === undefined || val == null || val.length <= 0) ? true : false;
	}
	$scope.selectUnselectAll=function(){
		$('tbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked);
        });
	};	
	

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
		
  	  	table.clear();
  	  $.each(dataTable, function(index, dc) {
  		  debugger;
  		
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+dc.serIssueId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+dc.serIssueId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+dc.serIssueId+');angular.element(this).scope().$apply();" data-target=""#/editIssueForm">Edit Sale Order</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
*/  		 // debugger;
//  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+so.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'

  		editColumn	 ='<a class="btn btn-success" href="#/editIssueForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+dc.serIssueId+');angular.element(this).scope().$apply();" >Create Invoice  </a>';
  		ApproveColumn	 ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogApprove('+dc.serIssueId+');angular.element(this).scope().$apply();" >Show Details  </a>';
  	 
  		table.row.add([++index,
    	  dc.txtIssueCode,
    	  isEmpty(dc.slsTblSaleOrder.cfgTblCustomer)?"":dc.slsTblSaleOrder.cfgTblCustomer.txtCustomerName,
    	  $filter('date')(new Date(dc.dteDate), 'dd-MM-yyyy'),
    	  isEmpty(dc.slsTblSaleOrder.cfgTblCustomer)?"":dc.slsTblSaleOrder.cfgTblCustomer.cfgTblCity.txtCityName,
    	    	  dc.txtVehicleNo,
    	    	  dc.txtDriverName,
    	    	  dc.txtDriverMobile,
//    	  (isEmpty(dc.txtStatus) || dc.txtStatus=='Pending')?"Pending":"Approved",
    	    	  dc.slsTblSaleOrder.txtSaleOrderNo, 
    	    	  $filter('date')(new Date(dc.slsTblSaleOrder.dteDate), 'dd-MM-yyyy'),
    	    	  dc.txtGatePassNo,
    	    	  isEmpty(dc.txtInvoiceStatus)?editColumn:dc.txtInvoiceStatus
    			 ]).draw();
  	  });
	};
	
	
	$scope.populateDataTable2=function(){
//		alert("----ava");
	}
	
}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

	


	//app.controller('DCCtrl', function($scope, $http, $filter){
		app.controller('editDCCtrl', function($scope, $http, $filter,$rootScope,$window,$sce){	
		
		
		
		// /////////////////////////////////
		$scope.CfgProductSetup = {};
		$scope.newSlsTblSoDetail = {};
		$scope.editProductComponent = {};
		
		$scope.newSlsTblSI = {};
		$scope.newSlsTblSoDetail = {};
		
		$scope.lstProductCategory={};
		$scope.lstBrand={};
		$scope.lstProduct={};
		$scope.lstPacking={};
		$scope.lstSupplier={};
		
		$scope.lstDCDetails=[];
		$scope.lstDC={};
		
		$scope.lstinvoiceDetails=[];
//		$scope.editIssue={};
		$scope.newSlsTblSI = {};
		$scope.newSlsTblSIDetail = {};
		
		
		$scope.newSlsTblSI.numTotalQty=0;
		$scope.newSlsTblSI.numTotalAmount=0;
		
		$scope.newSlsTblSI.numDiscount=0;
		$scope.newSlsTblSI.numDiscountAmount=0;
		$scope.newSlsTblSI.numAmountAfterDiscount=0;
		
		$scope.newSlsTblSI.numSalesTax=0;
		$scope.newSlsTblSI.numSalesTaxPerc=0
		
		$scope.newSlsTblSI.numSpecialSalestax=0;
		$scope.newSlsTblSI.numStaxTaxPerc=0;
		
		$scope.newSlsTblSI.numTotalAmountAfterStax=0;
		
		$scope.newSlsTblSI.numTotalAdvanceTaxAmount=0;
		$scope.newSlsTblSI.numAdvanceTaxPerc=0;
		$scope.newSlsTblSI.numInvoiceAmount=0;
		
		$scope.newSlsTblSI.numFreightAmount=0;
		$scope.newSlsTblSI.numInvoiceAmountAftFreight=0;
		
		$scope.total_qty=0;
		$scope.total_amount=0;
		$scope.total_unit=0;
		$scope.total_pieces=0;
		$scope.init = function(){
		$(".datepicker").datepicker({ "setDate": new Date(), dateFormat: "yyyy-MM-dd" });
		$scope.editIssue.dteDate=$filter('date')(new Date($scope.editIssue.dteDate), 'yyyy-MM-dd');
		$scope.editIssue.slsTblSaleOrder.dteDate=$filter('date')(new Date($scope.editIssue.slsTblSaleOrder.dteDate), 'yyyy-MM-dd');
		
		$scope.newSlsTblSI.numFreightAmount=$scope.editIssue.numFreight;
		
		var d = new Date();
	    var curr_date = d.getDate();
	    if(curr_date <10)
	    	curr_date='0'+curr_date;
	    var curr_month = d.getMonth() + 1;
	    if(curr_month < 10)
	    	curr_month='0'+curr_month;
	    var curr_year = d.getFullYear();
	    d=curr_year + "-" + curr_month + "-" + curr_date;
//	    $scope.newSlsTblSI.dteDate=d;
	    $scope.newSlsTblSI.dteDate=$scope.editIssue.dteDate;
	    
	    $scope.newSlsTblSI.numDiscount=$scope.editIssue.slsTblSaleOrder.cfgTblCustomer.numDiscount;
	    $scope.newSlsTblSI.numSalesTaxPerc=$scope.editIssue.slsTblSaleOrder.cfgTblCustomer.numSalesTax;
	    
	    /*$scope.newSlsTblSI.numStaxTaxPerc =;
	    $scope.newSlsTblSI.numTotalAmountAfterStax=;*/
	    
	    if($scope.editIssue.slsTblSaleOrder.cfgTblCustomer.blnIsGst===true)
	    	 $scope.newSlsTblSI.numStaxTaxPerc=0;
	    else
	    	{
	    	 $scope.newSlsTblSI.numStaxTaxPerc=3;
	    	}
	    if($scope.editIssue.slsTblSaleOrder.cfgTblCustomer.blnIsFiler===true)
            $scope.newSlsTblSI.numAdvanceTaxPerc=.1;
            else
           	 $scope.newSlsTblSI.numAdvanceTaxPerc=.2;
/*debugger;	alert();
debugger;*/
		$scope.searchIssueDetail($rootScope.editIssue.serIssueId);
		
		
        
		$http.get('/' + project_name + '/generateSupplierInvoiceNo').success(function(data) {
			$scope.newSlsTblSI.txtInvoiceCode = data;
			
			});
		
		$http.get('/' + project_name + '/getAllSupplier').success(function(data) {
			 
			
						$scope.lstSupplier= data;
						
						});
		

		
			};
			
			
			

		$scope.calculate = function() {
			
	
//						alert();
					/*	var qty = 0;
						var amount = 0;*/
						/*for (i = 0; i < $scope.lstDCDetails.length; i++) {
							
							qty = qty + $scope.lstDCDetails[i].numQuantity;
							amount = amount
									+ ($scope.lstDCDetails[i].numQuantity * $scope.lstDCDetails[i].slsTblSoDetail.numItemPrice);
						}
						
						$scope.newSlsTblSI.numTotalQty = qty;
			
						$scope.newSlsTblSI.numTotalAmount = amount;*/
						
//						alert();
					/*	debugger;
						amount=$scope.newSlsTblSI.numTotalAmount;
						qty=$scope.newSlsTblSI.numTotalQty */
						var numDiscountAmount=$scope.newSlsTblSI.numTotalAmount*($scope.newSlsTblSI.numDiscount/100);
						
						$scope.newSlsTblSI.numDiscountAmount=numDiscountAmount;
						
						var numAmountAfterDiscount=$scope.newSlsTblSI.numTotalAmount-$scope.newSlsTblSI.numDiscountAmount;;
						
						$scope.newSlsTblSI.numAmountAfterDiscount=numAmountAfterDiscount;
						
						var numSalesTax=$scope.newSlsTblSI.numAmountAfterDiscount*($scope.newSlsTblSI.numSalesTaxPerc/100);
						$scope.newSlsTblSI.numSalesTax=numSalesTax;
						
						var  numSpecialSalestax=$scope.newSlsTblSI.numAmountAfterDiscount*($scope.newSlsTblSI.numStaxTaxPerc/100);;
						$scope.newSlsTblSI.numSpecialSalestax=numSpecialSalestax;
						
						var numTotalAmountAfterStax=$scope.newSlsTblSI.numAmountAfterDiscount+$scope.newSlsTblSI.numSalesTax+$scope.newSlsTblSI.numSpecialSalestax;
						$scope.newSlsTblSI.numTotalAmountAfterStax=numTotalAmountAfterStax;
						
						var numTotalAdvanceTaxAmount =$scope.newSlsTblSI.numTotalAmountAfterStax*($scope.newSlsTblSI.numAdvanceTaxPerc/100);
						$scope.newSlsTblSI.numTotalAdvanceTaxAmount=numTotalAdvanceTaxAmount;

						var  numInvoiceAmount=$scope.newSlsTblSI.numTotalAmountAfterStax+$scope.newSlsTblSI.numTotalAdvanceTaxAmount;
						$scope.newSlsTblSI.numInvoiceAmount=numInvoiceAmount;
						
						var numInvoiceAmountAftFreight=$scope.newSlsTblSI.numInvoiceAmount-$scope.newSlsTblSI.numFreightAmount;;
						$scope.newSlsTblSI.numInvoiceAmountAftFreight=numInvoiceAmountAftFreight;
						
						refreshProductComponent();

					}
		
			$scope.searchIssueDetail = function(id){
				
				$(".se-pre-con").fadeIn("slow");
			
			debugger;
				
				$.ajax({
		            url: '/' + project_name + '/searchIssueDetail',
		            type: 'post',
		            'headers': {
		    			'Content-Type': 'application/json'
		    		},
		            dataType: 'json',
		            success: function (data) {
		            	
		            	 debugger;
		                	$scope.lstDCDetails= data;
		                
		                	  
		                	$scope.populateDataTable(data);
		                
		                	
		            	
		                	$scope.refreshProductComponent();
		            	if(data=='Failure'){
		            	
		            		$('#errMsgText').html("Unable to remove Product Component");
		            		$('#addErrorAlert').show();
		            	}
		            	else if(data=='Success'){

		            	}
		            },
			  		'error': function(xhr, d, err){
			  			
			  			$('#errMsgText').html("Product Component to remove error");
		        		$('#addErrorAlert').show();
			  		},complete: function(){
			  			
			  			$(".se-pre-con").fadeOut("slow");
					},
					data: JSON.stringify(id)
		        });
			};
			
			
			$scope.refreshProductComponent = function(){
					
					$(".se-pre-con").fadeIn("slow");
					debugger;
					var ids="";
					$(".se-pre-con").fadeOut("slow");
			}
		
		
		$scope.addBookingDetail = function(){
			debugger;
			$scope.lstDCDetails.push(angular.copy($scope.newSlsTblSoDetail));
		};
		
		$scope.removeBookingDetail = function(){
			$scope.lstDCDetails.pop(angular.copy($scope.newSlsTblSoDetail));
			$scope.lstDCDetails
		};
		


			
		

		$scope.addNewIsuue = function (){
			$(".se-pre-con").fadeIn("slow");
			$('#addErrorAlert').hide();
			$('#successAlert').hide();
			 debugger;
//			var object = JSON.stringify($scope.lstDCDetails);
			 $scope.newSlsTblSI.cfgTblCustomer=$scope.editIssue.slsTblSaleOrder.cfgTblCustomer;
			 
			 $scope.newSlsTblSI.slsTblSoDetails= $scope.lstDCDetails
//	 	  var object = $scope.newSlsTblSoDetail;
			 var object = $scope.newSlsTblSI;
			 
//			var object = $scope.lstDCDetails;
			
			$.ajax({
	            url: '/' + project_name + '/addNewIsuue',
	            type: 'post',
	            'headers': {
	    			'Content-Type': 'application/json'
	    		},
	            dataType: 'json',
	            success: function (data) {
	            	if(data=='Failure'){
	            		$('#errMsgText').html("Unable to add Product");
	            		$('#addErrorAlert').show();
	            	}
	            	else if(data=='Success'){
	            		$('#successMsgText').html("Product added successfully");
	            		$('#successAlert').show();
	            		$scope.newCfgProductSetup = {};
	            		$scope.init();
	            	}
	            	else if(data=='error'){
	            		$('#errMsgText').html("Unable to add Product \n due to duplication of  Product");
	            		$('#addErrorAlert').show();
	            	}
	            },
		  		'error': function(xhr, d, err){
		  			$('#errMsgText').html("Unable to add Product \n Internal Error");
	        		$('#addErrorAlert').show();
		  		},complete: function(){
		  			$(".se-pre-con").fadeOut("slow");
		  			$('#addCloseButton').click();
				},
				data: angular.toJson(object)
//	            data: object
	        });
		};
		
		$scope.addNewSupplierInvoice = function(){
		
			
			
			
			$(".se-pre-con").fadeIn("slow");
			$('#addErrorAlert').hide();
			$('#successAlert').hide();
			//debugger;
			
			 if(isEmpty($scope.lstDCDetails) || ($scope.lstDCDetails.length <=0))
			 {
			 alert(" There is no Component to Save.");
				return;
			 }
			for (i = 0; i < $scope.lstDCDetails.length; i++) {
				$scope.newSlsTblSIDetail.cfgTblProduct=$scope.lstDCDetails[i].cfgTblProduct;
				$scope.newSlsTblSIDetail.cfgTblProductDesign=$scope.lstDCDetails[i].cfgTblProductDesign;
				$scope.newSlsTblSIDetail.cfgTblProductQuality=$scope.lstDCDetails[i].cfgTblProductQuality;
				$scope.newSlsTblSIDetail.invTblIssueDetail=$scope.lstDCDetails[i];
				$scope.newSlsTblSIDetail.numQuantity=$scope.lstDCDetails[i].numQuantity;
				$scope.newSlsTblSIDetail.numUnitWt=$scope.lstDCDetails[i].numUnitWt;
				
				if(!(isEmpty($scope.lstDCDetails[i].numUnitWt)) && !(isEmpty($scope.lstDCDetails[i].numQuantity)))
				$scope.newSlsTblSIDetail.numTotalWt=$scope.lstDCDetails[i].numUnitWt * $scope.lstDCDetails[i].numQuantity;
				
				$scope.newSlsTblSIDetail.numPerPiecePrice=$scope.lstDCDetails[i].slsTblSoDetail.numItemPrice;
//				component.slsTblSoDetail.numItemPrice
			
				  $scope.lstinvoiceDetails.push(angular.copy($scope.newSlsTblSIDetail));
			}
			debugger;
			$scope.newSlsTblSI.invTblIssue=$rootScope.editIssue;
			$scope.newSlsTblSI.cfgTblCustomer=$rootScope.editIssue.slsTblSaleOrder.cfgTblCustomer;
			if(!(isEmpty($scope.lstinvoiceDetails)))
				$scope.newSlsTblSI.slsTblInvoiceDetails= $scope.lstinvoiceDetails;
			
			
			
//		 	  var object = $scope.newSlsTblSoDetail;
				 var object = $scope.newSlsTblSI;
			
			$.ajax({
				url: '/' + project_name + '/addNewSupplierInvoice',
				type: 'post',
	            'headers': {
	    			'Content-Type': 'application/json'
	    		},
	            dataType: 'json',
				success: function (data) {
	            	if(data=='Failure'){
	            		$('#errMsgText').html("Unable to edit Product");
	            		$('#addErrorAlert').show();
	            	}
	            	else if(data=='Success'){
	            		$('#successMsgText').html("Invoice Created successfully");
	            		$('#successAlert').show();
	            		alert("Invoice Created Sucessfully.");
	            		window.location.href = "#/View";
//	            		$scope.init();
	            	}
	            	
	            },
		  		'error': function(xhr, d, err){
		  			//alert();
		  			$('#errMsgText').html("Unable to edit Product \n Internal Error");
	        		$('#addErrorAlert').show();
		  		},complete: function(){
		  			$(".se-pre-con").fadeOut("slow");
		  			$('#editCloseButton').click();
				},
				data: angular.toJson(object)
			});
		};
		
		$scope.populateEditDialog = function(txtProductCodeforEdit){

//			$rootScope.editIssue = $filter("filter")($scope.lstDC, {serIssueId:txtProductCodeforEdit})[0];
			
			$rootScope.editIssue = $filter('filter')
			(
					$scope.lstDC,
					function(issue) {
						return (issue.serIssueId==txtProductCodeforEdit)
					})[0];
			
			$scope.searchIsuueDetail($rootScope.editIssue.serIssueId)
		};
		
	
		


		
		function isEmpty(val){
		    return (val === undefined || val == null || val.length <= 0) ? true : false;
		}
		$scope.selectUnselectAll=function(){
			$('tbody tr td input[type="checkbox"]').each(function(){
	            $(this).prop('checked', $scope.checked);
	        });
		};	
		

		$scope.addCommas=function (nStr)
		{
		    nStr += '';
		    x = nStr.split('.');
		    x1 = x[0];
		    x2 = x.length > 1 ? '.' + x[1] : '';
		    var rgx = /(\d+)(\d{3})/;
		    while (rgx.test(x1)) {
		        x1 = x1.replace(rgx, '$1' + ',' + '$2');
		    }
		    return x1 + x2;
		}
		$scope.populateDataTable=function(dataTable){
			var table = $('#data-table-edit').DataTable();
	  	  	table.clear();
	  	  $scope.total_qty=0;
	  	$scope.total_amount=0;
	  	$scope.total_unit=0;
	  	$scope.total_pieces=0;
	  	
	  	
	  	
	  	  $.each(dataTable, function(index, component) {
	  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+component.serIssueId+'">'+
										'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+component.serIssueId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
								  		  '<ul class="dropdown-menu">'+  
								  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+component.serIssueId+');angular.element(this).scope().$apply();" data-target=""#/editIssueForm">Edit Sale Order</a></li>'+
								  		  '</ul>';
	/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
	*/  		 // debugger;
//	  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+dc.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'

	  		editColumn	 ='<a class="btn btn-success" href="#/editIssueForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+component.serIssueId+');angular.element(this).scope().$apply();" >Show Details  </a>';

	  		//	  		,editDeleteColumn   
	  		 $scope.total_qty= $scope.total_qty+component.numQuantity;
	  		$scope.total_amount= $scope.total_amount+(component.slsTblSoDetail.numItemPrice*component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack);
	  		$scope.total_unit= $scope.total_unit+(component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack);
	  		$scope.total_pieces= $scope.total_pieces+(component.numQuantity*component.cfgTblProduct.numPiecesInMasterPack);
	 
		      table.row.add([++index,
		    	  component.cfgTblProduct.txtProductName,
		    	  isEmpty(component.cfgTblProductDesign)?"":component.cfgTblProductDesign.txtProductDesignName,
		    	  isEmpty(component.cfgTblProductQuality)?"":component.cfgTblProductQuality.txtProductQualityName,
		    	  component.cfgTblProduct.txtMasterPack,
		    	  $scope.addCommas(component.numQuantity),
		    	  $scope.addCommas(component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack),
		    	  $scope.addCommas(component.numQuantity*component.cfgTblProduct.numPiecesInMasterPack),
		    	  $scope.addCommas(component.slsTblSoDetail.numItemPrice),
		    	  $scope.addCommas(component.slsTblSoDetail.numItemPrice*component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack)
		    			 ]).draw(); 
		      
		     
		     

			  // This is how you can use the plugin in your jQuery app
		     
	  	  });
	  	  
	 		$scope.newSlsTblSI.numTotalQty= $scope.total_amount
	  		$scope.newSlsTblSI.numTotalAmount=	$scope.total_amount;
	 		
	 		window.setTimeout( $scope.calculate, 2000 );
	 		
		};
		
		$scope.refreshProductComponent = function(){
			
			$(".se-pre-con").fadeIn("slow");
			debugger;
			var ids="";
			$(".se-pre-con").fadeOut("slow");
	}
		
	
		
	}).directive('fileModel', ['$parse', function ($parse) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);