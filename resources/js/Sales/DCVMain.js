

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
			
		    templateUrl: '/' + project_name + '/DCVView',
			controller: 'DCCtrl'
				
		})
		.when('/editIssueForm', {
			templateUrl: '/' + project_name + '/DCVViewEdit',
			controller: 'editDCCtrl'
		})
			
		.otherwise({
			
			
		    templateUrl: '/' + project_name + '/DCVView',
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
	$scope.newInvTblIssueDetail = {};
	$scope.editProductComponent = {};
	
	$scope.newInvTblIssue = {};
	$scope.newInvTblIssueDetail = {};
	
	$scope.lstProductCategory={};
	$scope.lstBrand={};
	$scope.lstProduct={};
	$scope.lstPacking={};
	$scope.lstCustomer={};
	
	$scope.lstDCDetails=[];
	$scope.lstSO={};
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
				}, 1000);
	
		
		

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
	     	
	     	/*$http.get('/' + project_name + '/getAllIssue').success(function(data) {
	     		
				 
				 debugger;
							$scope.lstDCAll = data;
							$scope.lstSO = $filter('filter')($scope.lstDCAll, function(branch){
								return branch.txtStatus == 'Approve';
					       });	
							$scope.populateDataTable($scope.lstDCAll);
							
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
				
				$scope.populateDataTable(data);
				
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
	
	/*$scope.addBookingDetail = function(){
		debugger;
		$scope.lstDCDetails.push(angular.copy($scope.newInvTblIssueDetail));
	};
	
	$scope.removeBookingDetail = function(){
		$scope.lstDCDetails.pop(angular.copy($scope.newInvTblIssueDetail));
		$scope.lstDCDetails
	};
	*/


	$scope.populateEditDialog = function(txtProductCodeforEdit){
		//alert(txtProductCodeforEdit);
		
		debugger;
//		$rootScope.editIssue = $filter("filter")($scope.lstDCAll, {serIssueId:txtProductCodeforEdit})[0];
		
		$rootScope.editIssue = $filter('filter')
		(
				$scope.lstDCAll,
				function(issue) {
					return (issue.serIssueId==txtProductCodeforEdit)
				})[0];
		
	
		
	};
	$scope.populateEditDialogApprove = function(txtProductCodeforEdit){

//		$rootScope.editIssue = $filter("filter")($scope.lstDCAll, {serIssueId:txtProductCodeforEdit})[0];
		$rootScope.editIssue = $filter('filter')
		(
				$scope.lstDCAll,
				function(issue) {
					return (issue.serIssueId==txtProductCodeforEdit)
				})[0];
		$scope.editIssue.txtStatus='Approve';
		$scope.editIssue.blnIsApproved=true;
		$scope.updateIssue();
	};
	
	$scope.updateIssue = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
	/*	if(!(isEmpty($scope.lstSODetails)))
		$rootScope.editSaleOrder.slsTblSoDetails= $scope.lstSODetails*/
//	 	  var object = $scope.newSlsTblSoDetail;
		
		
		/*if(!(isEmpty($scope.lstIssueDetails)))
			$rootScope.editIssue.invTblIssueDetails= $scope.lstIssueDetails;*/
		
			 var object = $rootScope.editIssue;
		
		$.ajax({
			url: '/' + project_name + '/updateIssue',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit DC");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("DC Updated successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	else if(data=='QNA'){
            		alert("Stock not Available");
            		$('#errMsgText').html("Stock not Available");
            		$('#addErrorAlert').show();
            		
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit DC \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data: angular.toJson(object)
		});
	};
	
	$scope.populateEditDialogforGP = function(txtProductCodeforEdit){

//		$rootScope.editIssue = $filter("filter")($scope.lstDCAll, {serIssueId:txtProductCodeforEdit})[0];
		
		$rootScope.editIssue = $filter('filter')
		(
				$scope.lstDCAll,
				function(issue) {
					return (issue.serIssueId==txtProductCodeforEdit)
				})[0];

		$scope.AssignGatePassNumber();
	};
	
	
	$scope.populateEditDialogReport = function(txtProductCodeforEdit){

		window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getDCReport?ser_issue_id="+txtProductCodeforEdit+
								"&Report_name=DeliveryChalan.jasper","_blank");

	};
	
	$scope.populateEditDialogReportgp = function(txtProductCodeforEdit){
debugger;
//		$rootScope.editIssue = $filter("filter")($scope.lstDCAll, {serIssueId:txtProductCodeforEdit})[0];

		$(".se-pre-con").fadeIn("slow");
		window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getDCReport?ser_issue_id="+txtProductCodeforEdit+
								"&Report_name=Outward_Gate_pss_dispatch.jasper","_blank");
$(".se-pre-con").fadeOut("slow");
	};
	
	$scope.populateEditDialogReport_so = function(serSaleOrderId){

	
		$(".se-pre-con").fadeIn("slow");
		window.open(window.location.protocol+"//"+window.location.host+"/OPAL/getSaleOrderReport?ser_sale_order_id="+serSaleOrderId+
								"&Report_name=Sale_order.jasper","_blank");
$(".se-pre-con").fadeOut("slow");

	};
	
	$scope.AssignGatePassNumber = function(){
		
//		$(".se-pre-con").fadeIn("slow");
	
		
		$.ajax({
            url: '/' + project_name + '/AssignGatePassNumber',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            
            	if(data=='Failure'){
            	
            		$('#errMsgText').html("Unable to Assign Gate Pass No.");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		alert("Gate Pass Number Generated Successfully.");
            		$scope.getProduct();
            	}
            },
	  		'error': function(xhr, d, err){
	  			
	  			$('#errMsgText').html("error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify($rootScope.editIssue)
        });
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
//  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+dc.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'

  		editColumn	 ='<a class="btn btn-success" href="#/editIssueForm"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+dc.serIssueId+');angular.element(this).scope().$apply();" >Details  </a>';
  		ApproveColumn	 ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogApprove('+dc.serIssueId+');angular.element(this).scope().$apply();" >Approve  </a>';
  		
  		gpColumn	     ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogforGP('+dc.serIssueId+');angular.element(this).scope().$apply();" >Gate Pass  </a>';

  		printColumn	     ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogReport('+dc.serIssueId+');angular.element(this).scope().$apply();" >Print DC </a>';
  		printColumn_so	 ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogReport_so('+dc.slsTblSaleOrder.serSaleOrderId+');angular.element(this).scope().$apply();" >Print SO  </a>';

  		printColumngp	 ='<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().populateEditDialogReportgp('+dc.serIssueId+');angular.element(this).scope().$apply();" >Print GP </a>';

  		//  		editDeleteColumn,
	      table.row.add([++index,
	    	  dc.txtIssueCode,
	    	  isEmpty(dc.slsTblSaleOrder.cfgTblDealer)?"":dc.slsTblSaleOrder.cfgTblDealer.txtCustomerName,
	    	  isEmpty(dc.slsTblSaleOrder.cfgTblCustomer)?"":dc.slsTblSaleOrder.cfgTblCustomer.txtCustomerName,
	    	  $filter('date')(new Date(dc.dteDate), 'dd-MM-yyyy'),
	    	  
	    	  isEmpty(dc.slsTblSaleOrder.cfgTblDealer)?"":dc.slsTblSaleOrder.cfgTblDealer.cfgTblCity.txtCityName,
	    			  dc.numQuantity,
	    			  dc.numTareWeight,
	    			  dc.numNetWeight,
	    			  dc.numGrossWeight,
	    			  dc.txtStatus,
	    	    	  dc.slsTblSaleOrder.txtSapNo, 
	    	    	  $filter('date')(new Date(dc.slsTblSaleOrder.dteDate), 'dd-MM-yyyy'),
	    	    	  dc.txtINVNo, 
	    	    	  dc.txtInvoiceStatus
//	    	    	  $filter('date')(new Date(dc.dteInvoiceDate), 'dd-MM-yyyy')
	    	    	  
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
		$scope.newInvTblIssueDetail = {};
		$scope.editProductComponent = {};
		
		$scope.newInvTblIssue = {};
		$scope.newInvTblIssueDetail = {};
		
		$scope.lstProductCategory={};
		$scope.lstBrand={};
		$scope.lstProduct={};
		$scope.lstPacking={};
		$scope.lstSupplier={};
		
		$scope.lstDCDetails=[];
		$scope.lstSO={};
		
		$scope.lstissueDetails=[];
		$scope.editSaleOrder={};
		
		$scope.newInvTblIssue = {};
		$scope.newInvTblIssueDetail = {};
		$scope.lstIssueDetails={};
		$scope.total_qty=0;
		$scope.total_units=0;
		$scope.total_wt=0;
		$scope.total_issue_qty=0;
		
		$scope.init = function(){
		$(".datepicker").datepicker({ "setDate": new Date(), dateFormat: "yy-mm-dd" });
		$scope.editIssue.dteDate=$filter('date')(new Date($scope.editIssue.dteDate), 'yyyy-MM-dd');
		
		$scope.editSaleOrder=$scope.editIssue.slsTblSaleOrder;
		
		$scope.editSaleOrder.dteDate=$filter('date')(new Date($scope.editSaleOrder.dteDate), 'yyyy-MM-dd');
		$scope.supplier={};
		
		
		var d = new Date();
	    var curr_date = d.getDate();
	    if(curr_date <10)
	    	curr_date='0'+curr_date;
	    var curr_month = d.getMonth() + 1;
	    if(curr_month < 10)
	    	curr_month='0'+curr_month;
	    var curr_year = d.getFullYear();
	    d=curr_year + "-" + curr_month + "-" + curr_date;
	    $scope.newInvTblIssue.dteDate=d;


		
	    
	    $scope.searchIssueDetail($rootScope.editIssue.serIssueId);
        
		$http.get('/' + project_name + '/generateIssueNo').success(function(data) {
			$scope.newInvTblIssue.txtIssueCode = data;
			
			});
		
		$http.get('/' + project_name + '/getAllSupplier').success(function(data) {
			 
			 debugger;
						$scope.lstSupplier= data;
						
						/*$scope.supplier = $filter("filter")($scope.lstSupplier, {serSupplierId:$scope.newInvTblIssue.cfgTblSupplier.serSupplierId})[0];
						
						$scope.newInvTblIssue.cfgTblSupplier=$scope.supplier;*/
						});
		
//	    newInvTblIssue.cfgTblSupplier
		
			};
			
			$scope.keydownforQty = function() {
				$scope.total_issue_qty = 0;
				$scope.total_units = 0;
				$scope.total_wt = 0;

				for (i = 0; i < $scope.lstIssueDetails.length; i++) {

					$scope.total_units=$scope.total_units+($scope.lstIssueDetails[i].numQuantity*$scope.lstIssueDetails[i].cfgTblProduct.numUnitsInMasterPack);
            		
            		$scope.total_wt=$scope.total_wt+($scope.lstIssueDetails[i].numQuantity*$scope.lstIssueDetails[i].cfgTblProduct.numProductWeight);
            		
//            		$scope.lstSODetails[i].numIssueQty=$scope.lstIssueDetails[i].numQuantity;
            		
            		$scope.total_issue_qty=$scope.total_issue_qty+new Number($scope.lstIssueDetails[i].numQuantity);

				}

			}
		
			$scope.searchIssueDetail = function(id){
				
//				$(".se-pre-con").fadeIn("slow");
			
				
				$.ajax({
		            url: '/' + project_name + '/searchIssueDetail',
		            type: 'post',
		            'headers': {
		    			'Content-Type': 'application/json'
		    		},
		            dataType: 'json',
		            success: function (data) {
		            	
		            	 debugger;
		            	 $scope.lstIssueDetails=data;
		            	 for (i = 0; i < $scope.lstIssueDetails.length; i++) {
		                		
		                		$scope.total_qty=$scope.total_qty+$scope.lstIssueDetails[i].slsTblSoDetail.numQuantity;
		                		
		                		$scope.total_units=$scope.total_units+($scope.lstIssueDetails[i].numQuantity*$scope.lstIssueDetails[i].cfgTblProduct.numUnitsInMasterPack);
		                		
		                		$scope.total_wt=$scope.total_wt+($scope.lstIssueDetails[i].numQuantity*$scope.lstIssueDetails[i].cfgTblProduct.numProductWeight);
		                		
//		                		$scope.lstSODetails[i].numIssueQty=$scope.lstIssueDetails[i].numQuantity;
		                		
		                		$scope.total_issue_qty=$scope.total_issue_qty+$scope.lstIssueDetails[i].numQuantity;
		        				
		        			}

//		                	$scope.populateDataTable(data);
		            /*	setTimeout(function () {
							  $(function () {
							
							    $('#data-table').DataTable().draw();
							    alert("Loading Components--------"+$scope.lstDCDetails.length);
							  });
							}, 3000);*/

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

		
		
		$scope.addBookingDetail = function(){
			debugger;
			$scope.lstDCDetails.push(angular.copy($scope.newInvTblIssueDetail));
		};
		
		$scope.removeBookingDetail = function(){
			$scope.lstDCDetails.pop(angular.copy($scope.newInvTblIssueDetail));
			$scope.lstDCDetails
		};
		


		$scope.updateIssue = function(){
	

									
			for (i = 0; i < $scope.lstIssueDetails.length; i++) {

							if ($scope.lstIssueDetails[i].numQuantity > $scope.lstIssueDetails[i].slsTblSoDetail.numQuantity) {
								alert("Please enter Valid Quantity");

								return;
								// break;
							}

							/*else if ($scope.lstIssueDetails[i].numQuantity > $scope.lstIssueDetails[i].numStockAvailabe) {
								alert("Stock is not Avaialble");

								return;
								// break;
							}*/
						}
			

				$(".se-pre-con").fadeIn("slow");
				$('#addErrorAlert').hide();
				$('#successAlert').hide();
				
				$scope.editIssue.numTotalCartont=$scope.total_issue_qty;
			if(!(isEmpty($scope.lstIssueDetails)))
				$rootScope.editIssue.invTblIssueDetails= $scope.lstIssueDetails;
			$scope.editIssue.dteDate=$("#date").val();
				 var object = $rootScope.editIssue;
			
			$.ajax({
				url: '/' + project_name + '/updateIssue',
				type: 'post',
	            'headers': {
	    			'Content-Type': 'application/json'
	    		},
	            dataType: 'json',
				success: function (data) {
	            	if(data=='Failure'){
	            		$('#errMsgText').html("Unable to edit DC");
	            		$('#addErrorAlert').show();
	            	}
	            	else if(data=='Success'){
	            		$('#successMsgText').html("DC Updated successfully");
	            		$('#successAlert').show();
	            		alert("Dc Updated Sucessfully.");
	            		window.location.href = "#/View";
	            	}
	            	
	            },
		  		'error': function(xhr, d, err){
		  			//alert();
		  			$('#errMsgText').html("Unable to edit DC \n Internal Error");
	        		$('#addErrorAlert').show();
		  		},complete: function(){
		  			$(".se-pre-con").fadeOut("slow");
		  			$('#editCloseButton').click();
				},
				data: angular.toJson(object)
			});
				
		};
		


		$scope.populateEditDialog = function(txtProductCodeforEdit){

//			$rootScope.editIssue = $filter("filter")($scope.lstSO, {serIssueId:txtProductCodeforEdit})[0];
			$rootScope.editIssue = $filter('filter')
			(
					$scope.lstSO,
					function(issue) {
						return (issue.serIssueId==txtProductCodeforEdit)
					})[0];
			$scope.searchIssueDetail($rootScope.editIssue.serIssueId)
		};
		
	
		

		

		
		function isEmpty(val){
		    return (val === undefined || val == null || val.length <= 0) ? true : false;
		}
		$scope.selectUnselectAll=function(){
			$('tbody tr td input[type="checkbox"]').each(function(){
	            $(this).prop('checked', $scope.checked);
	        });
		};	
		
		$scope.populateDataTable=function(dataTable){
			var table = $('#data-table-edit').DataTable();
	  	  	table.clear();

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
		      table.row.add([++index,
		    	  component.cfgTblProduct.txtProductName,
		    	  isEmpty(component.cfgTblProductDesign)?"":component.cfgTblProductDesign.txtProductDesignName,
		    	  isEmpty(component.cfgTblProductQuality)?"":component.cfgTblProductQuality.txtProductQualityName,
		    	  component.cfgTblProduct.txtMasterPack,
		    	  component.slsTblSoDetail.numQuantity,
		    	  component.numQuantity,
		    	  component.numQuantity*component.cfgTblProduct.numUnitsInMasterPack,
		    	  component.numUnitWt*component.numQuantity
		    			 ]).draw(); 
		      
		     
		     

			  // This is how you can use the plugin in your jQuery app
		      $(".excel-table").exceltable();
	  	  });
		};
		
		$scope.refreshProductComponent = function(){
			
			$(".se-pre-con").fadeIn("slow");
			debugger;
			var ids="";
			$(".se-pre-con").fadeOut("slow");
	}
		
	/*	
		$scope.GetAvailabeQty=function(ser_product_id,ser_product_design_id,ser_product_quality_id,index){
			
//			alert("----");
//			ser_product_id,ser_product_design_id,ser_product_quality_id
			$http.get(
					'/' + project_name + '/getProductAvailableQty?ser_product_id='
							+ ser_product_id
							+ '&ser_product_design_id='
							+ ser_product_design_id
							+ '&ser_product_quality_id='
							+ ser_product_quality_id ).success(function(data) {

					alert("----"+data);
//				    $("#downloadLink").show();
				    $(".se-pre-con").fadeOut("slow");
					}).error(function(){
						$(".se-pre-con").fadeOut("slow");
					}); 
//			alert("----ava");
		}*/
		
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