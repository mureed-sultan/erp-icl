var app = angular.module('myApp',[]);

app.controller('userCtrl', function($scope, $http, $filter){
	//$scope.regex = '/^(\d{5}-\d{8}-\d{1})$/g';
	// /////////////////////////////////
	$scope.Users = {};

	$scope.newUser = {};
	$scope.departments = {};
	$scope.designations = {};
	$scope.areas = {};
	$scope.lstPP = {};

	$scope.newUserNo = "";
	// $scope.generateNewUser={};
	$scope.editUser = {};
	$scope.uploadFile={};
	$scope.uploadFile_sign={};
	$scope.file_show;
	/*$scope.getAllocations = function(){ 
		$(".se-pre-con").fadeIn("slow");
		$http.get('/CIT/getAllAllocations').success(function(data){
			 // debugger;
			// alert("success");
			$scope.allocations = data;
		//	$scope.getUsers(0);
			if(serAllocationId !=0){
				$scope.populateEditDialog(serAllocationId);
			}
		}).error(function(data, status) {
			// debugger;
			// alert("error");
			    
		     console.error('Repos error', status, data);
		  })
		  .finally(function() {
			 // debugger;
		    console.log("finally finished repos");
		    $(".se-pre-con").fadeOut("slow");
		  });;
	};*/
	
	

$scope.getUsers = function(UserId){ 
	
	 var pathArray = location.pathname.split('/');
	    var appPath = "";//"/";
	    for(var i=1; i<pathArray.length-1; i++) {
	        appPath += pathArray[i] ;
	        //+ "/";
	    }
	    project_name=appPath;
		$(".se-pre-con").fadeIn("slow");
		$http.get('/'+project_name+'/getAllUser').success(function(data){
			$scope.Users = data;
			$scope.populateDataTable(data);
			if(UserId !=0){
				$scope.populateEditDialog(UserId);
			}
		}).error(function(data, status) {
			
		     console.error('Repos error', status, data);
		  })
		  .finally(function() {
			 // debugger;
		    console.log("finally finished repos");
		    $(".se-pre-con").fadeOut("slow");
		  });;
	};
		
	$scope.init = function(){
		
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		
		$http.get('/'+project_name+'/getActivePasswordPolicy').success(function(data){
			$scope.lstPP = data; });
	
		$http.get('/'+project_name+'/getActiveRole').success(function(data){
			  $scope.roles = data; });
	
		$http.get('/'+project_name+'/getAllUser').success(function(data) {
			$scope.Users = data;
			$scope.populateDataTable(data);
		});	
			// $scope.showAppNo();
		window.setTimeout( $scope.resetDropDown, 1000 );

	};
	$scope.resetDropDown=function()
		{
			$('.selectpicker').selectpicker('refresh');
		}

	$scope.keydown = function() {
	
		//alert("Hello");
		//alert("Hello");
		  //allow  backspace, tab, ctrl+A, escape, carriage return
		  if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) )
		      return;
		  if((event.keyCode < 48 || event.keyCode > 57))
		   event.preventDefault();
		
		  var length = $scope.newUser.txtCnic.length; 
		//  alert(length);          
		  if(length == 5 || length == 13)
			  
			  $scope.newUser.txtCnic=$scope.newUser.txtCnic+'-';
		
	};
	
	
	$scope.keydown1 = function() {
		
		//alert("Hello");
		//alert("Hello");
		  //allow  backspace, tab, ctrl+A, escape, carriage return
		  if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) )
		      return;
		  if((event.keyCode < 48 || event.keyCode > 57))
		   event.preventDefault();
		
		  var length = $scope.editUser.txtCnic.length; 
		//  alert(length);          
		  if(length == 5 || length == 13)
			  
			  $scope.editUser.txtCnic=$scope.editUser.txtCnic+'-';
		
	};
	/*
	 * $scope.showPersonCombo1 = function(){ // debugger;
	 * if($scope.newUser.type === 'Student'){ $scope.pendingUsers = {}; //
	 * debugger; $(".se-pre-con").fadeIn("slow"); $scope.pendingUsers =
	 * $scope.students; // var patt = new RegExp("/^"+$scope.newHostelId+"/g");
	 * $scope.pendingUsers = $filter('filter')($scope.Users,
	 * function(User){ // debugger; return (User.status == 'Pending') &&
	 * User.type == 'Student'; }); $(".se-pre-con").fadeOut("slow");
	 * 
	 * 
	 * 
	 * $('#facultyCombo').hide(); $('#studentCombo').show();
	 *  } else if($scope.newUser.type === 'Faculty'){ // debugger;
	 * $scope.pendingUsers = {}; // debugger;
	 * $(".se-pre-con").fadeIn("slow"); $scope.pendingUsers =
	 * $scope.facultys; // var patt = new RegExp("/^"+$scope.newHostelId+"/g");
	 * $scope.pendingUsers = $filter('filter')($scope.Users,
	 * function(User){ // debugger; return (User.status == 'Pending') &&
	 * User.type == 'Faculty'; });
	 * 
	 * $(".se-pre-con").fadeOut("slow");
	 * 
	 * $('#studentCombo').hide(); $('#facultyCombo').show();
	 *  } };
	 */
	
	
	
	/*
	 * $scope.showPersonCombo = function(){ $scope.currentRoom = ""; //
	 * debugger; if($scope.newUser.type === 'Student'){
	 * $scope.showAllotments = {}; debugger; $(".se-pre-con").fadeIn("slow"); //
	 * var patt = new RegExp("/^"+$scope.newHostelId+"/g");
	 * $scope.showAllotments = $filter('filter')($scope.allotments,
	 * function(allotment){ debugger; return allotment.personType == 'Student';
	 * }); $(".se-pre-con").fadeOut("slow");
	 * 
	 * 
	 * 
	 * $('#facultyCombo').hide(); $('#studentCombo').show();
	 *  } else if($scope.newUser.type === 'Faculty'){ debugger;
	 * $scope.showAllotments = {}; // debugger; $(".se-pre-con").fadeIn("slow"); //
	 * var patt = new RegExp("/^"+$scope.newHostelId+"/g");
	 * $scope.showAllotments = $filter('filter')($scope.allotments,
	 * function(allotment){ debugger; return allotment.personType == 'Faculty';
	 * });
	 * 
	 * $(".se-pre-con").fadeOut("slow");
	 * 
	 * $('#studentCombo').hide(); $('#facultyCombo').show();
	 *  } };
	 */
	
	
/*$scope.setFile=function(file){
		
		$scope.uploadFile=file.value;
		$scope.file_show = $("#uploadFile")[0].files[0];
		var filename = $scope.uploadFile.replace(/^.*[\\\/]/, '');
//        $scope.newGroup.fileExtension = filename.substr(filename.lastIndexOf('.')+1,filename.length);
		
		
		if (file.files && file.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            $('#blah')
	                .attr('src', e.target.result)
	                .width(150)
	                .height(200);
	        };

	        reader.readAsDataURL(input.files[0]);
	    }
	};*/
	
$scope.readUser_pic = function (input) {
		
   $scope.uploadFile=input.value;
	$scope.file_show = $("#uploadFile")[0].files[0];
	var filename = $scope.uploadFile.replace(/^.*[\\\/]/, '');
   if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $('#blah')
            .attr('src', e.target.result)
            .width(150)
            .height(200);
    };

    reader.readAsDataURL(input.files[0]);
}
} 

$scope.readUser_sign = function (input) {
	
	$scope.uploadFile_sign=input.value;
//	$scope.file_show = $("#uploadFile")[0].files[0];
//	var filename = $scope.uploadFile.replace(/^.*[\\\/]/, '');
//	alert("--------");
if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $('#blah_sign')
            .attr('src', e.target.result)
            .width(150)
            .height(200);
    };

    reader.readAsDataURL(input.files[0]);
}
} 

	
$scope.addUser = function (){
	$(".se-pre-con").fadeIn("slow");
	$('#addErrorAlert').hide();
	$('#successAlert').hide();
	
	debugger;
	
	
		/*var g=document.getElementById("desigcode");

			$scope.newRole.txtRoleCode = g.value;	*/



	var object = JSON.stringify($scope.newUser);
	debugger;
	$.ajax({
        url: '/'+project_name+'/addNewUser',
        type: 'post',
        'headers': {
			'Content-Type': 'application/json'
		},
        dataType: 'json',
        success: function (data) {
        	if(data=='Failure'){
        		$('#errMsgText').html("Unable to add User");
        		$('#addErrorAlert').show();
        	}
        	else if(data=='AX'){
        		$('#errMsgText').html("User Already Exist.");
        		$('#addErrorAlert').show();
        	}
        	else if(data=='Success'){
        		$('#successMsgText').html("User added successfully");
        		$('#successAlert').show();
        		$scope.init();
        		location.href = "User";
        	}
        },
  		'error': function(xhr, d, err){
  			$('#errMsgText').html("Unable to add User \n Internal Error");
    		$('#addErrorAlert').show();
  		},complete: function(){
  			$(".se-pre-con").fadeOut("slow");
  		//	location.href = "User";
  			 $('#addCloseButton').click();
		},
        data: object
    });
};
	
	
	
	$scope.updateUser = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		if(document.getElementById("empstat").checked===true)
			{
			$scope.editUser.blnStatus=true;
			}
		else if(document.getElementById("empstat").checked===false)
			{
			$scope.editUser.blnStatus=false;
			}
		/*$scope.editUser.dteLicenceExpiredDate = document.getElementById("led1").value;
		 $scope.editUser.dteRcsExpiredDate = document.getElementById("red1").value;
		 $scope.editUser.dteCnicExpiredDate = document.getElementById("ced1").value;
		 $scope.editUser.dteDob = document.getElementById("dob1").value;
		 $scope.editUser.txtMaritalStatus = document.getElementById("mstat1").value;*/

		
		
		
		var object = JSON.stringify($scope.editUser);
		$.ajax({
			url: '/'+project_name+'/updateUser',
	 	type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
				debugger;
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit User");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='AX'){
            		$('#errMsgText').html("User Already Exist.");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("User editted successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to edit User \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton1').click();
	  			$('#addCloseButton2').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(UserId){
		debugger;

//		$scope.editUser = $filter("filter")($scope.Users, {serUserId:UserId})[0];
		$scope.editUser = $filter('filter')
		(
				$scope.Users,
				function(PP) {
					return (PP.serUserId == UserId)
				})[0];
		if($scope.editUser.blnStatus===true)
			document.getElementById("empstat").checked=true;
		else if($scope.editUser.blnStatus===false)
			document.getElementById("empstat").checked=false;
	};
	
	$scope.populateEditLocationDialog = function(UserId){
		debugger;
			$scope.editUser = $filter('filter')
		(
				$scope.Users,
				function(PP) {
					return (PP.serUserId == UserId)
				})[0];
		
		window.setTimeout( $scope.resetDropDown2, 2000 );
	};
	
	$scope.resetDropDown2=function()
	
	{
		$('#editdept').selectpicker('refresh');
		$('#editdesig').selectpicker('refresh');
		$('#editbl').selectpicker('refresh');
		$('#editcl').selectpicker('refresh');
	}
	
/*	$scope.activateUser = function(UserId){
		$scope.editUser = $filter("filter")($scope.Users, {serUserId:UserId})[0];
		if($scope.editUser.boolStatus ===0)
		$scope.editUser.boolStatus = 1;
		else if($scope.editUser.boolStatus ===1)
			$scope.editUser.boolStatus = 0;	
		$scope.updateUser();
	};
	*/
	
/*
 * $scope.showCombo = function(){ if($scope.newUser.type==="Student"){
 * $('#sname').show(); $('#fname').hide(); $('#extra').hide();
 *  } else if($scope.newUser.type==="Faculty"){ $('#fname').show();
 * $('#sname').hide(); $('#extra').hide(); } // alert($scope.newUser.type); };
 */
  /*$scope.showAppNo = function(){ 
	  debugger; 
	  $(".se-pre-con").fadeIn("slow");
	  var g=document.getElementById("atype");
	  $.ajax({
          url: '/CIT/generateNewUser?type='+g.value,
          type: 'get',        
          success: function (data) {
        	  debugger;
        	  var e=document.getElementById("appNo");
        	  if(g.value==="1"){
        	 	  
        	   e.value=data;
        	   document.getElementById("code").innerHTML="Bank Code";
        	   document.getElementById("cname").innerHTML="Bank Name";

        	    } 
        	  else if(g.value==="0"){ 

        	 	 e.value=data;
        	 	  document.getElementById("code").innerHTML="Company Code";
        	 	  document.getElementById("cname").innerHTML="Company Name";

        	 	 }
          },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Application \n Internal Error");
      		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			}
      });*/

	/*
	 * $scope.showRoom=function(){ debugger; if($scope.newUser.type == "" ||
	 * $scope.personId==""){ $scope.currentRoom = ""; } else
	 * if($scope.newUser.type == "Student"){
	 * 
	 * var roomAllotment = $filter('filter')($scope.showAllotments,
	 * function(allotment){ debugger; return (allotment.personType == 'Student') &&
	 * allotment.hmsTableStudent.id == $scope.personId; }); $scope.currentRoom =
	 * roomAllotment[0].hmsTableRoom.roomNo;
	 *  } else if($scope.newUser.type == "Faculty"){ var roomAllotment =
	 * $filter('filter')($scope.showAllotments, function(allotment){ debugger;
	 * return (allotment.personType == 'Faculty') &&
	 * allotment.hmsTableFaculty.id == $scope.personId; }); $scope.currentRoom =
	 * roomAllotment[0].hmsTableRoom.roomNo; }
	 *  };
	 */
	
	$scope.deleteUsers = function(){
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
            url: '/'+project_name+'/deleteUsers',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove User");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("User removed successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("User to remove error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify(ids)
        });
	};
	
	$scope.selectUnselectAll=function(){
		$('tbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked);
        });
	};	
	

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
	 	table.clear();
  	  $.each(dataTable, function(index, User) {
  		/*var assignedUsers = $filter('filter')($scope.allocations, function(allocation){
			return (allocation.citTableUser1 !=null && allocation.citTableUser1 !=undefined &&  allocation.citTableUser1.serUserId  == User.serUserId)?allocation:null;
        });*/
  		//var activateColumn="";
  		  var changeLocation="";
  		var editDeleteColumn=""; 
  		
  		 editDeleteColumn ='<div class="dropdown" id="dropdown'+User.serUserId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+User.serUserId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
						  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+User.serUserId+');angular.element(this).scope().$apply();" data-target="#editUserForm">Edit User </a></li>'+
							  		  '</ul>';	
  		/* if(assignedUsers.length==0){
				editDeleteColumn +=	'</a><input type="checkbox" id="'+User.serUserId+'"/>';}*/
/*  		 		changeLocation ='<button class="btn btn-success" id="'+User.serUserId+'" onclick="angular.element(this).scope().populateEditDialog('+User.serUserId+');angular.element(this).scope().$apply();">Change Location</button>';
*/  		 		changeLocation='<button class="btn btn-success" data-toggle="modal" onclick="angular.element(this).scope().populateEditLocationDialog('+User.serUserId+');angular.element(this).scope().$apply();" data-target="#editLocationForm">Transfer</button>';
                    var image_profile ="";
                    //'<img width="50" height="50" src="getUserPicture?id='+User.serUserId+'"/>' ;
                    var image_sign ="";
                    //<img width="50" height="50" src="getUserSign?id='+User.serUserId+'"/>' ;


//'&type='+User.serUserId+'"/>' ;
  		
//?code="+$scope.newOrder.txtOrderCode+"&cust="+$scope.newOrder.txtInstructions+"&od="+$scope.newOrder.txtdate+"&dd="+$scope.newOrder.txtduedate+"&flavor="+$scope.newOrder.txtImage,"_blank");
var status="";
		  if(User.blnStatus===true)
			  {
			  status="Active";
			  }
		  else if(User.blnStatus===false){
			  status="InActive";
		  }
  		debugger;
	      table.row.add([editDeleteColumn,
	    	  ++index,
	    	  User.txtUserName,
	    	  User.txtCnic,
	    	  User.txtContactNo,
	    	  isEmpty(User.cfgTblRole)?"":User.cfgTblRole.txtRoleName,
   			  isEmpty(User.cfgTblPasswordPolicy)?"":User.cfgTblPasswordPolicy.txtCode,

	    	  User.txtAddress,
	    	  status
	    	 /* ,
	    	  User.txtAddress,
	    	  User.blIsTransfered=="1"?"Transfered":"",
	    	  changeLocation,
	    	  image_profile,
	    	  image_sign*/
	    	  
	    	  ]).draw();
  		 
  	  });
  	/*$scope.table = $('#data-table').DataTable();
  	$scope.tableRowIndexs = table.rows();*/
	};
	
	function isEmpty(val){
	    return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	$scope.checkErr = function(){
		var start = new Date($scope.startDate);
		 var end = new Date($scope.endDate);
		  $scope.errMessage = '';
		  $scope.cursDate = new Date();
		  if (end < start){
		   
		    $scope.errMessage = 'End Date should be greate than start date';
		    return false;
		  }

		  if (start < $scope.curDate){
			  $scope.errMessage = 'Start date should not be before today.';
		    return false;
		  }
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