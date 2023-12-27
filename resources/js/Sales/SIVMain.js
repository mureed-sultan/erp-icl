

var app = angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
	debugger;

	 $routeProvider
	 .when('/View', {
			
		    templateUrl: '/OPAL/SIVView',
			controller: 'DCCtrl'
				
		})
		.when('/editInvoiceForm', {
			templateUrl: '/OPAL/SIVViewEdit',
			controller: 'editDCCtrl'
		})
	
	
		.otherwise({
			 templateUrl: '/OPAL/SIVView',
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
	
	$scope.editInvoice = {};
	$scope.newSlsTblSoDetail = {};
	
	$scope.lstProductCategory={};
	$scope.lstBrand={};
	$scope.lstProduct={};
	$scope.lstPacking={};
	$scope.lstCustomer={};
	
	$scope.lstInvoiceDetails=[];
	$scope.lstInvoice={};
	$scope.lstInvoiceAll={};
	$rootScope.editInvoice={};
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
	   
		
	

	     
	     	$http.get('/OPAL/getAllProductCategory').success(function(data) {
			 
			 debugger;
						$scope.lstProductCategory = data;
						
						});
	     	
	    
 
 
	     	$http.get('/OPAL/getAllProduct').success(function(data) {
				 
				 debugger;
							$scope.lstProduct = data;
							
							});
	     	
	     	$http.get('/OPAL/getAllCustomer').success(function(data) {
				 
				 debugger;
							$scope.lstCustomer = data;
							
							});
	    	$http.get('/OPAL/getAllProductDesign').success(function(data) {
				 
				 debugger;
							$scope.lstProductDesign = data;
							
							});
			

	     	$http.get('/OPAL/getAllProductQuality').success(function(data) {
				 
				 debugger;
							$scope.lstProductQuality = data;
							
							});
	     	
	     	
	     	/*
	     	$http.get('/OPAL/getAllSupplierInvoice').success(function(data) {
	     		
				 debugger;
							$scope.lstInvoiceAll = data;
							$scope.lstInvoice =$scope.lstInvoiceAll;
							$scope.lstInvoice = $filter('filter')($scope.lstInvoiceAll, function(branch){
								return branch.txtStatus == 'Approve';
					       });	
							$scope.populateDataTable($scope.lstInvoice);
							
							});
	     	*/
	     	
	     	$scope.searchSupplierInvoice();
	};
	
	$scope.searchSupplierInvoice = function(){
		
		debugger;
		var table = $('#data-table').DataTable();
		
  	  	table.clear().draw();
  	  	
  	    $scope.searchDTO.dte_date_from=$("#dateFrom").val();
		
		$scope.searchDTO.dte_date_to=$("#dateTo").val();
		
  	  
  	//  var object = JSON.stringify($scope.searchDTO);
		var object = $scope.searchDTO;
		$.ajax({
			url: '/OPAL/searchSupplierInvoice',
			type: 'post',
          'headers': {
  			'Content-Type': 'application/json'
  		},
          dataType: 'json',
			success: function (data) {
				$scope.lstInvoiceAll = data;
				$scope.lstInvoice =$scope.lstInvoiceAll;
				
				$scope.populateDataTable($scope.lstInvoiceAll);
				
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
	


	$scope.populateEditDialog = function(txtProductCodeforEdit){
		//alert(txtProductCodeforEdit);
		
		debugger;
//		$rootScope.editInvoice = $filter("filter")($scope.lstInvoice, {serSupplierInvoiceId:txtProductCodeforEdit})[0];
		
		$rootScope.editInvoice = $filter('filter')
		(
				$scope.lstInvoice,
				function(invoice) {
					return (invoice.serSupplierInvoiceId==txtProductCodeforEdit)
				})[0];
			
	};
	
	$scope.populateEditDialogApprove = function(txtProductCodeforEdit){
debugger;
//		$scope.editInvoice = $filter("filter")($scope.lstInvoice, {serSupplierInvoiceId:txtProductCodeforEdit})[0];

	$rootScope.editInvoice = $filter('filter')
	(
		$scope.lstInvoice,
		function(invoice) {
			return (invoice.serSupplierInvoiceId==txtProductCodeforEdit)
		})[0];

		$scope.editInvoice.txtInvoiceStatus='Approve';
		$scope.updateSupplierInvoice();
	};
	
	$scope.populateEditDialogReport = function(ser_supplier_invoice_id){
		//alert(txtProductCodeforEdit);
		
		debugger;
		window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getInvoiceReport?ser_supplier_invoice_id="+ser_supplier_invoice_id+
								"&Report_name=salestax_invoice.jasper","_blank");
		};
		
		$scope.populateEditDialogReportci = function(ser_supplier_invoice_id){
			//alert(txtProductCodeforEdit);
			
			debugger;
			window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getInvoiceReport?ser_supplier_invoice_id="+ser_supplier_invoice_id+
									"&Report_name=commercial_invoice.jasper","_blank");
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
  	  $.each(dataTable, function(index, invoice) {
  		  debugger;
  		
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+invoice.serSupplierInvoiceId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+invoice.serSupplierInvoiceId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+invoice.serSupplierInvoiceId+');angular.element(this).scope().$apply();" data-target=""#/editInvoiceForm">Edit Sale Order</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
*/  		 // debugger;
//  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+so.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'

  		editColumn	 ='<a class="btn btn-success" href="#/editInvoiceForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+invoice.serSupplierInvoiceId+');angular.element(this).scope().$apply();" >Details  </a>';
  		ApproveColumn	 ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogApprove('+invoice.serSupplierInvoiceId+');angular.element(this).scope().$apply();" >Approve  </a>';
  	 
  		printColumnsales_taxt	 ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogReport('+invoice.serSupplierInvoiceId+');angular.element(this).scope().$apply();" >Print STI </a>';

  		printColumncomm_inv	 ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogReportci('+invoice.serSupplierInvoiceId+');angular.element(this).scope().$apply();" >Print CI </a>';

  		table.row.add([++index,
  			invoice.txtInvoiceCode,
  			$filter('date')(new Date(invoice.dteDate), 'dd-MM-yyyy'),
    	  isEmpty(invoice.cfgTblCustomer)?"":invoice.cfgTblCustomer.txtCustomerName,
    	  
    	  isEmpty(invoice.cfgTblCustomer)?"":invoice.cfgTblCustomer.cfgTblCity.txtCityName,
    			  invoice.numInvoiceAmountAftFreight,
    			  invoice.invTblIssue.slsTblSaleOrder.txtSaleOrderNo, 
    			  isEmpty(invoice.invTblIssue)?"":$filter('date')(new Date(invoice.invTblIssue.slsTblSaleOrder.dteDate), 'dd-MM-yyyy'),
    	    	  isEmpty(invoice.invTblIssue)?"":invoice.invTblIssue.txtIssueCode,
    	    	  isEmpty(invoice.invTblIssue)?"":$filter('date')(new Date(invoice.invTblIssue.dteDate), 'dd-MM-yyyy'),
    	    	  (isEmpty(invoice.txtInvoiceStatus) || invoice.txtInvoiceStatus=='Pending')?ApproveColumn:"Approved",	  
    	    	  editColumn+' '+printColumnsales_taxt+' '+printColumncomm_inv
    			 ]).draw();
  	  });
	};
	
	
	$scope.updateSupplierInvoice = function(){
//		alert("---------issue------update-----------");
		
		
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
//	 	  var object = $scope.newSlsTblSoDetail;
			 var object = $scope.editInvoice;
		
		$.ajax({
			url: '/OPAL/updateSupplierInvoice',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Ivoice");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Invoice Approved successfully");
            		$('#successAlert').show();
//            		alert("Invoice Updated Successfully.");
//            		window.location.href = "#/View";
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Invoice \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data: angular.toJson(object)
		});
	};
	
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
		
//		$scope.editInvoice = {};
		$scope.newSlsTblSoDetail = {};
		
		$scope.lstProductCategory={};
		$scope.lstBrand={};
		$scope.lstProduct={};
		$scope.lstPacking={};
		$scope.lstSupplier={};
		
		$scope.lstInvoiceDetails=[];
		$scope.lstInvoice={};
		
		$scope.lstinvoiceDetails=[];
//		$scope.editInvoice={};
//		$scope.editInvoice = {};
		$scope.editInvoiceDetail = {};
		
		
		
		
	/*	$scope.editInvoice={};
		$scope.editInvoice.invTblIssue={};
		$scope.editInvoice.invTblIssue.slsTblSaleOrder={};
		*/
		
		$scope.init = function(){
			
		$(".datepicker").datepicker({ "setDate": new Date(), dateFormat: "yyyy-MM-dd" });
		$scope.editInvoice.dteDate=$filter('date')(new Date($scope.editInvoice.dteDate), 'yyyy-MM-dd');
		$scope.editInvoice.invTblIssue.dteDate=$filter('date')(new Date($scope.editInvoice.dteDate), 'yyyy-MM-dd');
		$scope.editInvoice.invTblIssue.slsTblSaleOrder.dteDate=$filter('date')(new Date($scope.editInvoice.invTblIssue.slsTblSaleOrder.dteDate), 'yyyy-MM-dd');
		
//		$scope.editInvoice.numFreightAmount=$scope.editInvoice.numFreight;
		
/*		var d = new Date();
	    var curr_date = d.getDate();
	    if(curr_date <10)
	    	curr_date='0'+curr_date;
	    var curr_month = d.getMonth() + 1;
	    if(curr_month < 10)
	    	curr_month='0'+curr_month;
	    var curr_year = d.getFullYear();
	    d=curr_year + "-" + curr_month + "-" + curr_date;
	    $scope.editInvoice.dteDate=d;*/

debugger;
		$scope.searchIssueDetail($rootScope.editInvoice.serSupplierInvoiceId);
        
	/*	$http.get('/OPAL/generateSupplierInvoiceNo').success(function(data) {
			$scope.editInvoice.txtInvoiceCode = data;
			
			});*/
		
		$http.get('/OPAL/getAllSupplier').success(function(data) {
			 
			
						$scope.lstSupplier= data;
						
						});
		

		
			};
			
			
			

		$scope.calculate = function() {

						debugger;
						var qty = 0;
						var amount = 0;
						for (i = 0; i < $scope.lstInvoiceDetails.length; i++) {
							
							qty = qty + $scope.lstInvoiceDetails[i].numQuantity;
							if(!( isEmpty($scope.lstInvoiceDetails[i].numItemPrice)))
							amount = amount
									+ ($scope.lstInvoiceDetails[i].numQuantity * $scope.lstInvoiceDetails[i].numItemPrice);
						}
				        if(qty > 0 )
						$scope.editInvoice.numTotalQty = qty;
			
				        if(amount > 0 )
						$scope.editInvoice.numTotalAmount = amount;
						
						$scope.editInvoice.numDiscountAmount=$scope.editInvoice.numTotalAmount*($scope.editInvoice.numDiscount/100);
						
						$scope.editInvoice.numAmountAfterDiscount=$scope.editInvoice.numTotalAmount-$scope.editInvoice.numDiscountAmount;
						
						$scope.editInvoice.numSalesTax=$scope.editInvoice.numAmountAfterDiscount*($scope.editInvoice.numSalesTaxPerc/100);
						
						$scope.editInvoice.numSpecialSalestax=$scope.editInvoice.numAmountAfterDiscount*($scope.editInvoice.numStaxTaxPerc/100);
						
						$scope.editInvoice.numTotalAmountAfterStax=$scope.editInvoice.numAmountAfterDiscount+$scope.editInvoice.numSalesTax+$scope.editInvoice.numSpecialSalestax;
						
						$scope.editInvoice.numTotalAdvanceTaxAmount=$scope.editInvoice.numTotalAmountAfterStax*($scope.editInvoice.numAdvanceTaxPerc/100);

						$scope.editInvoice.numInvoiceAmount=$scope.editInvoice.numTotalAmountAfterStax+$scope.editInvoice.numTotalAdvanceTaxAmount;
						
						$scope.editInvoice.numInvoiceAmountAftFreight=$scope.editInvoice.numInvoiceAmount-$scope.editInvoice.numFreightAmount;
						
						$('button').click(function(){
						    var input = $('input');
						    input.val('xxx');
						    input.trigger('input'); // Use for Chrome/Firefox/Edge
						    input.trigger('change'); // Use for Chrome/Firefox/Edge + IE11
						});

					}
		
			$scope.searchIssueDetail = function(id){
				
				$(".se-pre-con").fadeIn("slow");
	
				
				$.ajax({
		            url: '/OPAL/searchSupplierInvoiceDetail',
		            type: 'post',
		            'headers': {
		    			'Content-Type': 'application/json'
		    		},
		            dataType: 'json',
		            success: function (data) {
		            	
		                	$scope.lstInvoiceDetails= data;
		                	$scope.populateDataTable(data);
		                	
		                	
		          /*  	setTimeout(function () {
							  $(function () {
//								  $scope.calculate();
//								  alert();
							    $('#data-table').DataTable().draw();
//							    alert("Loading Components--------"+$scope.lstInvoiceDetails.length);
							  });
							}, 1000);*/
//		                	$scope.refreshProductComponent();
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
		
		
	
		



		
		$scope.updateSupplierInvoice = function(){
		//	alert("---------issue------update-----------");
			
			
			
			$(".se-pre-con").fadeIn("slow");
			$('#addErrorAlert').hide();
			$('#successAlert').hide();
			//debugger;
			
			 if(isEmpty($scope.lstInvoiceDetails) || ($scope.lstInvoiceDetails.length <=0))
			 {
			 alert(" There is no Component to Save.");
				return;
			 }
			for (i = 0; i < $scope.lstInvoiceDetails.length; i++) {
				$scope.editInvoiceDetail.cfgTblProduct=$scope.lstInvoiceDetails[i].cfgTblProduct;
				$scope.editInvoiceDetail.cfgTblProductDesign=$scope.lstInvoiceDetails[i].cfgTblProductDesign;
				$scope.editInvoiceDetail.cfgTblProductQuality=$scope.lstInvoiceDetails[i].cfgTblProductQuality;
//				$scope.editInvoiceDetail.invTblIssueDetail=$scope.lstInvoiceDetails[i];
				$scope.editInvoiceDetail.numQuantity=$scope.lstInvoiceDetails[i].numQuantity;
				$scope.editInvoiceDetail.numUnitWt=$scope.lstInvoiceDetails[i].numUnitWt;
			
				  $scope.lstinvoiceDetails.push(angular.copy($scope.editInvoiceDetail));
			}
			debugger;
			$scope.editInvoice=$rootScope.editInvoice;
			if(!(isEmpty($scope.lstinvoiceDetails)))
				$scope.editInvoice.slsTblInvoiceDetails= $scope.lstinvoiceDetails;
			
			
			
//		 	  var object = $scope.newSlsTblSoDetail;
				 var object = $scope.editInvoice;
			
			$.ajax({
				url: '/OPAL/updateSupplierInvoice',
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
	            		alert("Invoice Updated Successfully.");
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

//			$rootScope.editInvoice = $filter("filter")($scope.lstInvoice, {serSupplierInvoiceId:txtProductCodeforEdit})[0];
			$rootScope.editInvoice = $filter('filter')
			(
					$scope.lstInvoice,
					function(invoice) {
						return (invoice.serSupplierInvoiceId==txtProductCodeforEdit)
					})[0];
			$scope.searchIsuueDetail($rootScope.editInvoice.serSupplierInvoiceId)
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
		
		function isEmpty(val){
		    return (val === undefined || val == null || val.length <= 0) ? true : false;
		}
		$scope.selectUnselectAll=function(){
			$('tbody tr td input[type="checkbox"]').each(function(){
	            $(this).prop('checked', $scope.checked);
	        });
		};	
		
		$scope.total_qty= 0;
  		$scope.total_amount= 0;
  		$scope.total_unit=0;
  		$scope.total_pieces=0;
		$scope.populateDataTable=function(dataTable){
			var table = $('#data-table-edit').DataTable();
	  	  	table.clear();
	  	  	
	  	    $scope.total_qty=0;
		  	$scope.total_amount=0;
		  	$scope.total_unit=0;
		  	$scope.total_pieces=0;
	  	  $.each(dataTable, function(index, component) {
	  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+component.serInvoiceDetailId+'">'+
										'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+component.serInvoiceDetailId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
								  		  '<ul class="dropdown-menu">'+  
								  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+component.serInvoiceDetailId+');angular.element(this).scope().$apply();" data-target=""#/editInvoiceForm">Edit Sale Order</a></li>'+
								  		  '</ul>';
	/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
	*/  		 // debugger;
//	  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+dc.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'

	  		editColumn	 ='<a class="btn btn-success" href="#/editInvoiceForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+component.serInvoiceDetailId+');angular.element(this).scope().$apply();" >Show Details  </a>';


	  		$scope.total_qty= $scope.total_qty+component.numQuantity;
	  		$scope.total_amount= $scope.total_amount+(component.numPerPiecePrice*component.numQuantity);
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
		    	  $scope.addCommas(component.numPerPiecePrice),
		    	  $scope.addCommas(component.numPerPiecePrice*component.numQuantity)
		    			 ]).draw(); 
		      
		     
		     

			  // This is how you can use the plugin in your jQuery app
		     
	  	  });
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