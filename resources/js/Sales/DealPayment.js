var app = angular.module('myApp',[]);

app.controller('productCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgProductSetup = {};
	$scope.soPayment = {};
	$scope.editProductComponent = {};
	
	$scope.lstSO={};
	$scope.lstProductCategory={};
	$scope.lstBrand={};
	$scope.lstProduct={};
	$scope.lstPacking={};
	 $scope.total_qty=0;
	 $scope.total_count=0;
	$scope.lstPayments=[];
	
	$scope.soPayment.numPaymentReceived = 0;
	$scope.soPayment.txtWithheld = 0;
	$scope.soPayment.txtStampDuty = 0;
	$scope.soPayment.txtLateDelivery = 0;
	$scope.soPayment.numNetPayment = 0;
	
	$scope.init = function(){

		var pathArray = location.pathname.split('/');
		var appPath = "";// "/";
		for (var i = 1; i < pathArray.length - 1; i++) {
			appPath += pathArray[i];
			// + "/";
		}
		project_name = appPath;
		$scope.getProduct();
		};
	
	
	$scope.getProduct = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		

	     
	     	$http.get('/' + project_name + '/getAllDeal').success(function(data) {
			 
			 
						$scope.lstSO = data;
						
						});
	     	
	     
       	
	
	};
	
	

	
	$scope.showRecipe = function(){

  	  var object = $scope.soPayment;
		$.ajax({
			url: '/' + project_name + '/searchSaleOrderPayments',
			type: 'post',
          'headers': {
  			'Content-Type': 'application/json'
  		},
          dataType: 'json',
			success: function (data) {
				
				$scope.lstPayments=data;
//				$scope.keydownforQty();
          	if(data=='Failure'){
          		$('#errMsgText').html("Unable to search Recipe");
          		$('#addErrorAlert').show();
          	}
          	else if(data=='Success'){
          		
          		$('#successMsgText').html("Recipe search successfully");
          		$('#successAlert').show();
          		$scope.calculate();
          		window.setTimeout($scope.refreshProductComponent,1000);
          	}
          },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to search Recipe \n Internal Error");
      		$('#addErrorAlert').show();
      		
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
//			data:object
			data: angular.toJson(object)
		});
		
	};
		
	$scope.calculate = function(){
		/*if(isEmpty($scope.newCfgProductComponent.cfgTblProductParent))
		{
			alert(" Please Select Set.");
			return;
		}
		
		if(isEmpty($scope.newCfgProductComponent.cfgTblProductChild))
		{
			alert(" Please Select Component.");
			return;
		}*/
		
//		if(!($scope.newCfgProductComponent.numQuantity >= 0))
//		{
//		alert(" Please Enter Valid  Quantity.");
//		return;
//		}
		
		$scope.total_qty =0;
		 $scope.total_count=$scope.lstPayments.length;
		
		 for (let i = 0; i < $scope.lstPayments.length; i++)

			{

				$scope.total_qty = $scope.total_qty
						+ new Number(
								$scope.lstPayments[i].numPaymentReceived);

			
			}
	};

	$scope.calculateNet = function(){
	
		
		$scope.soPayment.numPaymentReceived  = new Number($scope.soPayment.numNetPayment - $scope.soPayment.txtWithheld-$scope.soPayment.txtStampDuty-$scope.soPayment.txtLateDelivery);
		
	};
	$scope.addProduct = function (){
		debugger;
		
				
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		$scope.soPayment.dteDate =$("#date1").val().split("-").reverse().join("-");
//		var object = JSON.stringify($scope.lstPayments);
		var object = $scope.soPayment;
		
		$.ajax({
            url: '/' + project_name + '/addNewSaleOrderPayment',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Payment");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Payment added successfully");
            		$('#successAlert').show();
//            		$scope.lstPayments=[];
            		$scope.newSlsTblSo = $scope.soPayment.slsTblSaleOrder;
            		$scope.soPayment={};
            		$scope.soPayment.slsTblSaleOrder=$scope.newSlsTblSo;
            		$scope.soPayment.numPaymentReceived = 0;
            		$scope.soPayment.txtWithheld = 0;
            		$scope.soPayment.txtStampDuty = 0;
            		$scope.soPayment.txtLateDelivery = 0;
            		$scope.soPayment.numNetPayment = 0;
            		$scope.showRecipe();
            		window
					.setTimeout(
						$scope.refreshProductComponent,
						2000);
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Payment \n due to duplication of  Product");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Payment \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
			data: angular.toJson(object)
//            data: object
        });
	};
	
/*	$scope.updateProduct = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//
		
		var object = JSON.stringify($scope.editProduct);
		$.ajax({
			url: '/' + project_name + '/updateProduct',
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
            		$('#successMsgText').html("Product edit successfully");
            		$('#successAlert').show();
            		$scope.init();
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
			data:object
		});
	};*/
	
	$scope.populateEditDialog = function(txtProductCodeforEdit){
		
			
		$scope.getCandidateDocuments(txtProductCodeforEdit);
		$scope.editCandidate = $filter("filter")($scope.lstPayments, {serSoPaymentId:txtProductCodeforEdit})[0];
		$scope.editCandidate.paymentDocuments=$scope.candidateDocs;
		
//		$scope.preVoId = $scope.editCandidate.fkVoOfficerId;
	};
	
	$scope.getCandidateDocuments = function (candidate_id){
		$(".se-pre-con").fadeIn("slow");
		$('#documentUploadAddErrorAlert').hide();
		$('#documentUploadSuccessAlert').hide();
		
		debugger;
		$.ajax({
            url:  '/' + project_name + '/getCandidateDocument',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
           
        		$scope.candidateDocs=data;
        		$scope.editCandidate.paymentDocument=data;
        		$scope.populateDataTable(data);
            },
	  		'error': function(xhr, d, err){
	  			$('#documentUploadErrMsgText').html("Unable to Remove Document \n Internal Error");
        		$('#documentUploadAddErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
            data: JSON.stringify(candidate_id)
        });
	};
	
$scope.refreshProductComponent = function(){
	
	
		debugger;
		$(".se-pre-con").fadeIn("slow");
		
		var ids="";
		$scope.calculate();
		$(".se-pre-con").fadeOut("slow");
}
	
	$scope.deleteProductComponent = function(){
		
		$(".se-pre-con").fadeIn("slow");
		
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/' + project_name + '/deleteProductComponent',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Product Component");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Product Component removed successfully");
            		$('#successAlert').show();
            		$scope.showRecipe();
//            		$scope.newCfgProductSetup = {};
//            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Product Component to remove error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify(ids)
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
	

	$scope.removeEmployeeDocument = function (documentId,serSoPaymentId){
		
		$(".se-pre-con").fadeIn("slow");
		$('#documentUploadAddErrorAlert').hide();
		$('#documentUploadSuccessAlert').hide();
		$.ajax({
            url: '/' + project_name + '/removeCandidateDocument',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#documentUploadErrMsgText').html("Unable to remove Document");
            		$('#documentUploadAddErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#documentUploadSuccessMsgText').html("Document removed successfully");
            		$('#documentUploadSuccessAlert').show();
//            		var index = $scope.editCandidate.paymentDocuments.indexOf(document);
//            		$scope.editCandidate.paymentDocuments.splice(index, 1);
            		debugger;
            		$scope.getCandidateDocuments(serSoPaymentId);
            		$scope.$apply();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#documentUploadErrMsgText').html("Unable to Remove Document \n Internal Error");
        		$('#documentUploadAddErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
            data: JSON.stringify(documentId)
        });
	};
	
	
	// Download File
	
	 $scope.downloadDocument = function(documentId) {
		 
//		 alert("Doload Document--------");
//		 alert("-----id-----"+document.documentId);
		 
			$('#documentUploadAddErrorAlert').hide();
			$('#documentUploadSuccessAlert').hide();
	      $http.post('/' + project_name + '/downloadDocument',documentId, {
	          responseType: "arraybuffer"
	        })
	        .success(function(data) {
				debugger;
	          var anchor = angular.element('<a/>');
	          var blob = new Blob([data], {type: 'application/pdf'});
	          anchor.attr({
	            href: window.URL.createObjectURL(blob),
	            target: '_blank',
	            download: 'fileName.pdf'
	          })[0].click();
	        }).error(function() {
				$('#documentUploadErrMsgText').html("Unable to Download Document...");
	    		$('#documentUploadAddErrorAlert').show();
	    		$(".se-pre-con").fadeOut("slow");
			});
	    };
	
	$scope.uploadDocument = function() {
		
		
		$(".se-pre-con").fadeIn("slow");
		var file = $scope.myFile;
		 console.log('file is ' );
		console.dir(file);
		var uploadUrl = '/' + project_name + '/uploadCandidateDocument';
		var fd = new FormData();
		fd.append('file', file);
		
		$scope.newDocument.slsTblSoPayments={serSoPaymentId:$scope.editCandidate.serSoPaymentId};
		fd.append('newDocument', JSON.stringify($scope.newDocument));
		$http.post(uploadUrl, fd, {
		transformRequest : angular.identity,
		headers : {
		'Content-Type' : undefined
		}
		}).success(function(data) {
			if(data=='Failure'){
        		$('#documentUploadErrMsgText').html("Document Uploading Failed...");
        		$('#documentUploadAddErrorAlert').show();
        	}
        	else if(data=='Success'){
        		debugger;
        		$('#documentUploadSuccessMsgText').html("Document Uploaded Successfully");
        		$('#documentUploadSuccessAlert').show();
        		//$scope.getCandidates($scope.editCandidate.serSoPaymentId);
        		$scope.newDocument = {};
        		//$scope.init();
        		$scope.getCandidateDocuments($scope.editCandidate.serSoPaymentId);
        		$scope.editCandidate.paymentDocuments=$scope.candidateDocs;
        	}
			$(".se-pre-con").fadeOut("slow");
		}).error(function() {
			$('#documentUploadErrMsgText').html("Document Uploading Failed...");
    		$('#documentUploadAddErrorAlert').show();
    		$(".se-pre-con").fadeOut("slow");
		});
		}
	
	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		debugger;
		var table = $('#data-table-new').DataTable();
  	  	table.clear();
  	  $.each(dataTable, function(index, product) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+product.serProductId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+product.serProductId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+product.serProductId+');angular.element(this).scope().$apply();" data-target="#editProductForm">Edit Product</a></li>'+
							  		  '</ul>';
  		removeColumn = '<a class="btn btn-danger"   data-toggle="modal" onclick="angular.element(this).scope().removeEmployeeDocument('
			+ product.documentId
			+ ','+product.slsTblSoPayments.serSoPaymentId+');angular.element(this).scope().$apply();" >Remove  </a>';
  		
  		downlod = '<a class="btn btn-success"   data-toggle="modal" onclick="angular.element(this).scope().downloadDocument('
			+ product.documentId
			+ ');angular.element(this).scope().$apply();" >Download  </a>';

//  		  
//  		'<div <input type="button" class="btn btn-danger"
//			ng-click='removeEmployeeDocument(document)' value="Remove" />'
			
			
//			&nbsp; <input type="button" class="btn btn-success"
//			ng-click='downloadDocument(document)' value="Download" >/>'
  		
	      table.row.add([++index,
	    	  product.documentName ,
	    	  removeColumn+'   '+downlod ]).draw(); 
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