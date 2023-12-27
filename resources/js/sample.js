var app = angular.module('myApp',[]);

app.controller('contractCtrl', function($scope, $http, $filter,$rootScope){
	
	//$scope.branches = {};
	
	$scope.filteredCustomers = {};
	$scope.newBranch = {};
	$scope.editBranch = {};
	$scope.isBank = "";
	$scope.custId = "";
	$scope.myVar="true";
	$scope.beenAdded=true;
	
	$scope.duplications = {
			txtBranchName: false,
			txtBranchCode: false,
	      };	
	
	///////////////////////////////////
	$scope.branches = {};
	$scope.contracts = {};
	$scope.customers = {};
	$scope.newContract = {};
	$scope.newContractCode={};
	$scope.newContractGrid={}
	$scope.checkedCit;
	$scope.checkedAtmr;
	$scope.editContract = {};
	$rootScope.dateEnd='';
	$scope.selected = [];
	$scope.copyRow={};
	
	
	
	$scope.getAllContracts = function(){ 
		$(".se-pre-con").fadeIn("slow");
		$http.get('/CIT/getAllContracts').success(function(data){
			  //debugger;
			$scope.contract = data;
		//	$scope.newContractGrid
			debugger;
			$scope.populateDataTable(data);
			//$scope.populateCitDataTable();
			//$scope.populateAtmrDataTable();
			$http.get('/CIT/getContractsCode').success(function(data) {
				$scope.newContractCode = data;
            }); 
			
		}).error(function(data, status) {
			// debugger;
		     console.error('Repos error', status, data);
		  })
		  .finally(function() {
			 // debugger;
		    console.log("finally finished repos");
		    $(".se-pre-con").fadeOut("slow");
		  });;
	};
		
	$scope.init = function(){
		
		$scope.list = [1,2,3,4,5]
		$scope.list1 = [1,2,3,4,5,6]
	//	alert("hhh");
		$http.get('/CIT/getAllBranches').success(function(data){
			$scope.branches = data;});
		$http.get('/CIT/getNewContract').success(function(data) {
			//debugger;
			$scope.newContract = data;
			});
		/* $scope.beenAdded = function(){
		        return $scope.beenAdded;
		    };*/
		$http.get('/CIT/getAllCustomers').success(function(data) {
			$scope.customers = data;});
		// debugger;
			$scope.getAllContracts();
			$scope.showCustomer(true);
			$scope.getValue = function(dateEnd) {
				
				$rootScope.dateEnd= dateEnd;
				
			};	
	};	

	$scope.checkDuplicate = function(mode,property){
		//debugger;
		var value = mode == "Add"?$scope.newBranch[property]:$scope.editBranch[property];
		if(value && value!=""){
		
		$("input[name="+property+"]").addClass('ajaxLoader');
		// debugger;
		$.ajax({
			url: '/CIT/branchExistByProperty',
			type: 'post',
			success: function (data) {
				// debugger;
            	if(data=='true'){
            		//debugger;
            		$scope.duplications[property] = true;
            		(mode == "Add")?$scope.addBranchForm[property].$setValidity("duplicate", false):$scope.editBranchForm[property].$setValidity("duplicate", false);
            	}
            	else{
            		//debugger;
            		$scope.duplications[property] = false;
            		$("input[name="+property+"]").removeClass('ajaxLoader');
            		(mode == "Add")?$scope.addBranchForm[property].$setValidity("duplicate", true):$scope.editBranchForm[property].$setValidity("duplicate", true);
            		/*var myElement = angular.element( document.querySelector( '#'+property+'DupErr' ) );
            		myElement.innerHTML;*/
            	}
            },
			data: {
				'property' :property ,
				'value'  :value,
				'mode' : mode,
				'oldValue':mode =="Edit"?$scope.editBranch.serBranchId:0
			}
		});
		}
	};

	
      
      $scope.OptionsSelected = function (item) {
    	  debugger;
    	
      var idx = item.serSerivceType;
  
      if(idx>1)
    	  {
    	
    	  if(idx===2){
    		  debugger;
    		  item.baseCharges=$scope.editContract.citServices[0].baseCharges;
    	      item.cashLimit=$scope.editContract.citServices[0].cashLimit;
    	      item.surcharge=$scope.editContract.citServices[0].surcharge;
    	      item.vaultCharges=$scope.editContract.citServices[0].vaultCharges;
    	      item.sealCharges=$scope.editContract.citServices[0].sealCharges;
    	      item.waitingCharges=$scope.editContract.citServices[0].waitingCharges;
    	      item.distance=$scope.editContract.citServices[0].distance;
    	      debugger;
    	   }
    	  if(idx===3){
    		  debugger;
    		  item.baseCharges=$scope.editContract.citServices[1].baseCharges;
    	      item.cashLimit=$scope.editContract.citServices[1].cashLimit;
    	      item.surcharge=$scope.editContract.citServices[1].surcharge;
    	      item.vaultCharges=$scope.editContract.citServices[1].vaultCharges;
    	      item.sealCharges=$scope.editContract.citServices[1].sealCharges;
    	      item.waitingCharges=$scope.editContract.citServices[1].waitingCharges;
    	      item.distance=$scope.editContract.citServices[1].distance;
    	      debugger;
    	   }
    	  if(idx===4){
    		  debugger;
    		  item.baseCharges=$scope.editContract.citServices[2].baseCharges;
    	      item.cashLimit=$scope.editContract.citServices[2].cashLimit;
    	      item.surcharge=$scope.editContract.citServices[2].surcharge;
    	      item.vaultCharges=$scope.editContract.citServices[2].vaultCharges;
    	      item.sealCharges=$scope.editContract.citServices[2].sealCharges;
    	      item.waitingCharges=$scope.editContract.citServices[2].waitingCharges;
    	      item.distance=$scope.editContract.citServices[2].distance;
    	      debugger;
    	   }
    	  }
      if (idx > -1)
        $scope.selected.splice(idx, 1);
      else
        $scope.selected.push(item);
   };


   $scope.OptionsSelectedATMR = function (item) {
 	  debugger;

   var idx = item.serSerivceType;
  
   if(idx>5)
 	  {
 	
 	  if(idx===6){
 		  debugger;
 		  item.baseCharges=$scope.editContract.atmrServices[0].baseCharges;
 	      item.cashLimit=$scope.editContract.atmrServices[0].cashLimit;
 	      item.surcharge=$scope.editContract.atmrServices[0].surcharge;
 	      item.vaultCharges=$scope.editContract.atmrServices[0].vaultCharges;
 	      item.numbVisitCharges=$scope.editContract.atmrServices[0].numbVisitCharges;
 	      item.sealCharges=$scope.editContract.atmrServices[0].sealCharges;
 	      item.waitingCharges=$scope.editContract.atmrServices[0].waitingCharges;
 	      item.distance=$scope.editContract.atmrServices[0].distance;
 	      debugger;
 	   }
 	  if(idx===7){
 		  debugger;
 		  item.baseCharges=$scope.editContract.atmrServices[1].baseCharges;
 	      item.cashLimit=$scope.editContract.atmrServices[1].cashLimit;
 	      item.surcharge=$scope.editContract.atmrServices[1].surcharge;
 	      item.vaultCharges=$scope.editContract.atmrServices[1].vaultCharges;
 	      item.sealCharges=$scope.editContract.atmrServices[1].sealCharges;
 	      item.waitingCharges=$scope.editContract.atmrServices[1].waitingCharges;
 	      item.distance=$scope.editContract.atmrServices[1].distance;
 	      item.numbVisitCharges=$scope.editContract.atmrServices[1].numbVisitCharges;
 	      debugger;
 	   }
 	  
 	  }
   if (idx > -1)
     $scope.selected.splice(idx, 1);
   else
     $scope.selected.push(item);
};

$scope.OptionsSelectedNew = function (item) {
	  debugger;
	
var idx = item.serSerivceType;

if(idx>1)
	  {
	
	  if(idx===2){
		  debugger;
		  item.baseCharges=$scope.newContract.citServices[0].baseCharges;
	      item.cashLimit=$scope.newContract.citServices[0].cashLimit;
	      item.surcharge=$scope.newContract.citServices[0].surcharge;
	      item.vaultCharges=$scope.newContract.citServices[0].vaultCharges;
	      item.sealCharges=$scope.newContract.citServices[0].sealCharges;
	      item.waitingCharges=$scope.newContract.citServices[0].waitingCharges;
	      item.distance=$scope.newContract.citServices[0].distance;
	      debugger;
	   }
	  if(idx===3){
		  debugger;
		  item.baseCharges=$scope.newContract.citServices[1].baseCharges;
	      item.cashLimit=$scope.newContract.citServices[1].cashLimit;
	      item.surcharge=$scope.newContract.citServices[1].surcharge;
	      item.vaultCharges=$scope.newContract.citServices[1].vaultCharges;
	      item.sealCharges=$scope.newContract.citServices[1].sealCharges;
	      item.waitingCharges=$scope.newContract.citServices[1].waitingCharges;
	      item.distance=$scope.newContract.citServices[1].distance;
	      debugger;
	   }
	  if(idx===4){
		  debugger;
		  item.baseCharges=$scope.newContract.citServices[2].baseCharges;
	      item.cashLimit=$scope.newContract.citServices[2].cashLimit;
	      item.surcharge=$scope.newContract.citServices[2].surcharge;
	      item.vaultCharges=$scope.newContract.citServices[2].vaultCharges;
	      item.sealCharges=$scope.newContract.citServices[2].sealCharges;
	      item.waitingCharges=$scope.newContract.citServices[2].waitingCharges;
	      item.distance=$scope.newContract.citServices[2].distance;
	      debugger;
	   }
	  }
if (idx > -1)
  $scope.selected.splice(idx, 1);
else
  $scope.selected.push(item);
};


$scope.OptionsSelectedATMRNew = function (item) {
 debugger;

var idx = item.serSerivceType;

if(idx>5)
 {

 if(idx===6){
	  debugger;
	  item.baseCharges=$scope.newContract.atmrServices[0].baseCharges;
     item.cashLimit=$scope.newContract.atmrServices[0].cashLimit;
     item.surcharge=$scope.newContract.atmrServices[0].surcharge;
     item.vaultCharges=$scope.newContract.atmrServices[0].vaultCharges;
     item.numbVisitCharges=$scope.newContract.atmrServices[0].numbVisitCharges;
     item.sealCharges=$scope.newContract.atmrServices[0].sealCharges;
     item.waitingCharges=$scope.newContract.atmrServices[0].waitingCharges;
     item.distance=$scope.editContract.atmrServices[0].distance;
     debugger;
  }
 if(idx===7){
	  debugger;
	  item.baseCharges=$scope.newContract.atmrServices[1].baseCharges;
     item.cashLimit=$scope.newContract.atmrServices[1].cashLimit;
     item.surcharge=$scope.newContract.atmrServices[1].surcharge;
     item.vaultCharges=$scope.newContract.atmrServices[1].vaultCharges;
     item.sealCharges=$scope.newContract.atmrServices[1].sealCharges;
     item.waitingCharges=$scope.newContract.atmrServices[1].waitingCharges;
     item.distance=$scope.newContract.atmrServices[1].distance;
     item.numbVisitCharges=$scope.newContract.atmrServices[1].numbVisitCharges;
     debugger;
  }
 
 }
if (idx > -1)
$scope.selected.splice(idx, 1);
else
$scope.selected.push(item);
};



$scope.focusfn = function () {
	$scope.focus = true;
	$scope.ftxt='Focused'
	}
	$scope.blurfn = function () {
	$scope.focus = false;
	$scope.ftxt = ''
	}
   
   
   
	$scope.clearForm = function (form){
		$scope.isBank = "";
		form.$setPristine();
		form.$setUntouched();
	}
	
	$scope.addContract = function (){
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		var object = angular.toJson($scope.newContract);
		var contractId=$('#contractNo').val();
		var contractDate=$('#contractDate').val();
		var contractExpireDate=$('#contractExpiryDate').val();
		debugger;
		$.ajax({
            url: '/CIT/addNewContract?contractId='+contractId+'&contractDate='+contractDate+'&contractExpireDate='+contractExpireDate,
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	debugger;
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Contract");
            		$('#addErrorAlert').show();
            		$scope.clearForm($scope.addContractForm);
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Contract added successfully");
            		$('#successAlert').show();
            		$scope.clearForm($scope.addContractForm);
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			debugger;
	  			$('#errMsgText').html("Unable to add Contract \n Internal Error");
        		$('#addErrorAlert').show();
        		$scope.clearForm($scope.addContractForm);
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			//$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	
	
	
	
	$scope.showCustomer = function(update){
		$scope.filteredCustomers = {};
		 debugger;
			$(".se-pre-con").fadeIn("slow");
			$scope.filteredCustomers = $filter('filter')($scope.customers, function(customer){
				if($scope.newContract.clientType=="1"){
					return customer.boolIsBank ;
				}
				else if($scope.newContract.clientType=="0") {
					return !customer.boolIsBank ;
				}
	        });
			debugger;
			$(".se-pre-con").fadeOut("slow");
	};
	
	$scope.updateContract = function(){
		$("#cit-data-table").focus();
		
		
	//	$('selector').unbind('focusout');
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
	//	$scope.editContract.endDate=$scope.dateEnd;
	//	alert(""+$scope.dateEnd);
	//	alert(""+$rootScope.dateEnd);
		var date=$('#contractExpiryDate').val();
		var dateStart=$('#contractDate').val();
	//	alert(date);
		$scope.editContract.startDate=dateStart;
		$scope.editContract.endDate=date;
		var object = angular.toJson($scope.editContract);
		debugger;
	
			//JSON.stringify($scope.contracts);
	//	alert(object);
		$.ajax({
			url: '/CIT/updateContract',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Contract");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            	
            		debugger;
            		$('#successMsgText').html("Contract edited successfully");
            		$('#successAlert').show();
            	//	$('#editContractDialog').close();
            		$('#editContractDialog').modal('hide');
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to edit Contract \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	
	$scope.updateContractStatus = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		var object = angular.toJson($scope.contracts)
			//JSON.stringify($scope.contracts);
	//	alert(object);
		$.ajax({
			url: '/CIT/updateContractStatus',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Contract");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Contract edited successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to edit Contract \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.activateStatus = function(ser_Contract_id){
	//	alert(ser_Contract_id);
		$scope.contracts = $filter("filter")($scope.contract, {contractSerialId:ser_Contract_id})[0];
		debugger;
	//	alert($scope.contracts)
		if($scope.contracts.status ===0)
			$scope.contracts.status = 1;
		else if($scope.contracts.status ===1)
			$scope.contracts.status = 0;	
		$scope.updateContractStatus();
	};
	
	$scope.activateStatusApproved = function(ser_Contract_id){
//		alert(ser_Contract_id);
		$scope.contracts = $filter("filter")($scope.contract, {contractSerialId:ser_Contract_id})[0];
		debugger;
//		alert($scope.contracts)
			
		$scope.updateContractStatusApproved();
	};
	
	$scope.updateContractStatusApproved = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		var object = angular.toJson($scope.contracts)
			//JSON.stringify($scope.contracts);
	//	alert(object);
		$.ajax({
			url: '/CIT/updateContractStatusApproved',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Contract");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Contract edited successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to edit Contract \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.activateStatusReject = function(ser_Contract_id){
	//	alert(ser_Contract_id);
		$scope.contracts = $filter("filter")($scope.contract, {contractSerialId:ser_Contract_id})[0];
		debugger;
	//	alert($scope.contracts);
		
			
		$scope.updateContractStatusRejected();
	};
	
	$scope.updateContractStatusRejected = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		var object = angular.toJson($scope.contracts)
			//JSON.stringify($scope.contracts);
	//	alert(object);
		$.ajax({
			url: '/CIT/updateContractStatusRejected',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Contract");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Contract edited successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to edit Contract \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	
	$scope.populateEditDialog = function(ser_Contract_id,status){
	//	alert("alert"+ser_Contract_id)
		$scope.editContract = $filter("filter")($scope.contract, {contractSerialId:ser_Contract_id})[0];
		
		
		
		if($scope.editContract.cit)
			$scope.editContract.cit=1;
		else
			$scope.editContract.cit=0;
		if($scope.editContract.atmr)
			$scope.editContract.atmr=1;
		else
			$scope.editContract.atmr=0;
		if($scope.editContract.adc)
			$scope.editContract.adc=1;
		else
			$scope.editContract.adc=0;
		
		if($scope.editContract.citTableCustomer.boolIsBank==0){
	//	alert($scope.editContract.citTableCustomer.txtCustomerName);
		$scope.myVar=true;
		}else{
			$scope.myVar=false;
		}
		//alert(status);
		debugger;
		// window.location = "/region_setup";
		
	};
	
	
	$scope.deleteContracts = function(){
		debugger;
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/CIT/deleteContracts',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Contract");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Contract removed successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Contract to remove error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify(ids)
        });
	};
	
	function days_between(date1, date2) {

	    // The number of milliseconds in one day
	    var ONE_DAY = 1000 * 60 * 60 * 24
	    
	    var startDate = new Date(date1);
	    var endDate = new Date(date2);

	    // Convert both dates to milliseconds
	 var date1_ms = startDate.getTime();
	   var date2_ms = endDate.getTime();
      debugger;
	    // Calculate the difference in milliseconds
	    var difference_ms = Math.abs(date2_ms - date1_ms);
	//    alert(difference_ms);
	    // Convert back to days and return
	    return Math.round(difference_ms/ONE_DAY);

	}
	
	
	$scope.selectUnselectAll=function(){
		$('tbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked);
        });
	};	
	
	$scope.selectUnselectAtmr=function(){
		$('#atmrTbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checkedAtmr);
        });
	};
	$scope.selectUnselectCit=function(){
		$('#citTbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checkedCit);
        });
	};

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  $.each(dataTable, function(index,contract) {
  		/*var editDeleteColumn="";*/
  		/* editDeleteColumn ='<div class="dropdown" id="dropdown'+contract.contractNo+'">'+
									'<a href="" data-toggle="dropdown" ng-click="angular.element(this).scope().populateEditDialog('+contract.contractNo+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
								//	'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+region.serRegionId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+

							  		  '<ul class="dropdown-menu">'+  
						  		'<li><a href="" data-toggle="modal" ng-click="angular.element(this).scope().populateEditDialog('+contract.contractNo+');angular.element(this).scope().$apply();"data-target="#editContractDialog">Edit Contract </a></li>'+
						  			 '</ul>';
  		 */
  		 
  	//	  alert(contract.contractSerialId);
  		var editDeleteColumn ='<div class="dropdown" id="dropdown'+contract.contractSerialId+'">'+
			'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+contract.contractSerialId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
	  		  '<ul class="dropdown-menu">'+  
	  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+contract.contractSerialId+');angular.element(this).scope().$apply();" data-target="#editContractDialog">Edit Contract</a></li>'+
	  		  '</ul>';
/*	  		'</a><input type="checkbox" id="'+contract.contractSerialId+'"/>';
*/  	/*	editDeleteColumn += '</a><input type="checkbox" id="'+contract.contractNo+'"/>';*/

  		 debugger;
  		
         if(contract.status == 0){

  			activateColumn ='<button class="btn btn-success" id="'+contract.contractSerialId+'" onclick="angular.element(this).scope().activateStatus('+contract.contractSerialId+');angular.element(this).scope().$apply();">DeActivate</button>';
  		      
         }
  		  else if(contract.status == 1){
  
  			activateColumn ='<button class="btn btn-success" id="'+contract.contractSerialId+'" onclick="angular.element(this).scope().activateStatus('+contract.contractSerialId+');angular.element(this).scope().$apply();">Activate</button>';
  		  }
     
       
          if(contract.txtStatus=='Reject'){
        	  ApprovedColumn="";
        	  RejectColumn=""
        	  $scope.beenAdded=false;
          }else if(contract.txtStatus=='Approved'){
        	  ApprovedColumn="";
        	  RejectColumn="";
        	  $scope.beenAdded=false;
        	//  RejectColumn ='<button class="btn btn-success" id="'+contract.contractSerialId+'" onclick="angular.element(this).scope().activateStatusReject('+contract.contractSerialId+');angular.element(this).scope().$apply();">Reject</button>';  
          }
          else{
   			ApprovedColumn ='<button class="btn btn-success" id="'+contract.contractSerialId+'" onclick="angular.element(this).scope().activateStatusApproved('+contract.contractSerialId+');angular.element(this).scope().$apply();">Approved</button>';
   			RejectColumn ='<button class="btn btn-success" id="'+contract.contractSerialId+'" onclick="angular.element(this).scope().activateStatusReject('+contract.contractSerialId+');angular.element(this).scope().$apply();">Reject</button>';  
   			$scope.beenAdded=true;
          }
   		 if(contract.txtStatus=="Pending"){
   	//		alert(contract.txtStatus);
   			 $("#modalFooter").show();
   		 }else{
   			$("#modalFooter").hide();
   		 }
//   		 alert("contract.cit-------"+contract.contractNo+"------"+contract.cit);
         
          debugger;
	      table.row.add([editDeleteColumn,
	    	//  index+1,
	    	  index+1,
	    	  contract.contractNo,
	    	  contract.clientType,
	    	  days_between(toDate(contract.startDate), toDate(contract.endDate)),
	    	  contract.startDate,
	    	  contract.endDate,
	    	  contract.citTableCustomer.boolIsBank?"Bank":"Company",
	    	  contract.cit?"Yes":"No",
	    	  contract.atmr?"Yes":"No",
	    	  contract.adc?"Yes":"No",
	    	  activateColumn,
	    	  contract.status=="1"?"InActive":ApprovedColumn,
	    	  contract.status=="1"?"InActive":RejectColumn,
	    	  contract.txtStatus
	    	  ]).draw();
  		 
  	  });
	};
	
	function toDate(dateStr) {
	    const [day, month, year] = dateStr.split("-")
	    return new Date(year, month - 1, day)
	}
	
	
	/*// Populate ATMR Data Table
	$scope.populateAtmrDataTable=function(){
		var table = $('#atmr-data-table').DataTable();
		
		 
  	  	table.clear();
  	  $.each($scope.newContract.atmrServices, function(index, atmrService) {
    		var editDeleteColumn=""; 
    		 editDeleteColumn ='<div class="dropdown" id="dropdown'+atmrService.serSerivceType+'">'+
  									'<a href="" data-toggle="dropdown" ><i class="glyphicon glyphicon-pencil"></i>'+
  							  		  '<ul class="dropdown-menu">'+  
  						  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+atmrService.serSerivceType+');angular.element(this).scope().$apply();" data-target="#editBranchDialog">Edit Branch </a></li>'+
  							  		  '</ul>';
    			editDeleteColumn += '<input type="checkbox" id="'+atmrService.serSerivceType+'"/>';
    		// debugger;
  	      table.row.add([editDeleteColumn,
  	    	  index+1,
  	    	  //atmrService.serviceTypeName,
  	    	 // atmrService.baseCharges,
  	    	  //atmrService.surcharge,
  	    	  //atmrService.cashLimit,
  	    	  //atmrService.waitingCharges,
  	    	 // atmrService.sealCharges,
  	    	 // atmrService.vaultCharges,
  	    	 // atmrService.distance,
  	    	  ]).draw();
  		 
  	  });
	};
	
	// Populate CIT Data Table
	$scope.populateCitDataTable=function(){
		var table = $('#cit-data-table').DataTable();
		
		 
  	  	table.clear();
  	  $.each(dataTable, function(index, branch) {
  		var editDeleteColumn=""; 
  		 editDeleteColumn ='<div class="dropdown" id="dropdown'+branch.serBranchId+'">'+
									'<a href="" data-toggle="dropdown" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
						  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+branch.serBranchId+');angular.element(this).scope().$apply();" data-target="#editBranchDialog">Edit Branch </a></li>'+
							  		  '</ul>';
  			editDeleteColumn += '</a><input type="checkbox" id="'+branch.serBranchId+'"/>';
  		// debugger;
	      table.row.add([editDeleteColumn,
	    	  index+1,
	    	  branch.txtBranchCode,
	    	  branch.txtBranchName,
	    	  branch.citTableCustomer1.boolIsBank?"Bank":"Company",
	    	  branch.txtContactPerson,
	    	  branch.txtEmail,
	    	  branch.boolStatus?"Active":"Not Active",
	    	  branch.txt_Address,
	    	  ]).draw();
  		 
  	  });
	};*/

	
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