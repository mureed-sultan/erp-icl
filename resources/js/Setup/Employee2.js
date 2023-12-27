var app = angular.module('myApp',[]);

app.controller('employeeCtrl', function($scope, $http, $filter){
	

    $scope.salaryData = [
        {
            SNo: 1,
            Department: "EMP01",
            EmployeeCode: "My name is Mureed Sultan and i belong to Mankera city I work in JackTech Solution Lahore",
            EmployeeName: "June 2020",
            FatherName: "12",
            Designation: "18",
            PresentDays: 20,
            AbsentDays: "sick leave",
            LeaveDays: "underprocess",
            Holidays: 1,
            WeeklyOffDays: 2,
            TotalDays: 30,
            LateTimeMinutes: 15,
            ShortLeaveMinutes: 5,
            BasicPay: 5000,
            HouseRent: 1500,
            UtilityAllowances: 200,
            MedicalAllowances: 300,
    
            Deductions: {
                Advance: 50,
                Loan: 30,
                Canteen: 20,
                IncomeTax: 100,
                EOBI: 50,
                LateTime: 10,
                ShortLeave: 5,
                LeaveWithoutPay: 30,
                OtherDeduction: 160,
            },
    
            TotalDeduction: 455,
            NetPayableSalary: 4750,
        },        {
            SNo: 2,
            Department: "EMP02",
            EmployeeCode: "Sultan",
            EmployeeName: "August 2020",
            FatherName: "12",
            Designation: "18",
            PresentDays: 20,
            AbsentDays: "Urgent leave",
            LeaveDays: "Assign",
            Holidays: 1,
            WeeklyOffDays: 2,
            TotalDays: 30,
            LateTimeMinutes: 15,
            ShortLeaveMinutes: 5,
            BasicPay: 5000,
            HouseRent: 1500,
            UtilityAllowances: 200,
            MedicalAllowances: 300,
    
            Deductions: {
                Advance: 50,
                Loan: 30,
                Canteen: 20,
                IncomeTax: 100,
                EOBI: 50,
                LateTime: 10,
                ShortLeave: 5,
                LeaveWithoutPay: 30,
                OtherDeduction: 160,
            },
    
            TotalDeduction: 455,
            NetPayableSalary: 4750,
        },
       
        // Add more data as needed
    ];
    
    
      
  

    $scope.init = function () {
        $scope.populateDataTable($scope.salaryData, "#data-table");
    };
	
	


    $scope.populateDataTable = function (dataTable) {
        var table = $("#data-table").DataTable(); // Assuming the table ID is "data-table"
        table.clear();
    
        $.each(dataTable, function (index, salary) {
            console.log(salary);
            var editDeleteColumn =
                '<div class="dropdown" id="dropdown' + salary.SNo + '">' +
                '<a href="" data-toggle="dropdown" ng-click="populateEditDialog(' + salary.SNo + ')"><i class="glyphicon glyphicon-pencil"></i>' +
                '<ul class="dropdown-menu">' +
                '<li><a href="" data-toggle="modal" ng-click="populateEditDialog(' + salary.SNo + ')" data-target="#editSalaryForm">Edit Salary</a></li>' +
                '</ul>' +
                '</a><input type="checkbox" id="' + salary.SNo + '"/>';
    
            var deductions = salary.Deductions;
            var totalDeduction =
                deductions.Advance +
                deductions.Loan +
                deductions.Canteen +
                deductions.IncomeTax +
                deductions.EOBI +
                deductions.LateTime +
                deductions.ShortLeave +
                deductions.LeaveWithoutPay +
                deductions.OtherDeduction;
    
            table.row.add([
                editDeleteColumn,
                salary.SNo,
                salary.Department,
                salary.EmployeeCode,
                salary.EmployeeName,
                salary.FatherName,
                salary.Designation,
                salary.PresentDays,
                salary.AbsentDays,
                salary.LeaveDays,
                salary.Holidays,
                salary.WeeklyOffDays,
                salary.TotalDays,
                salary.LateTimeMinutes,
                salary.ShortLeaveMinutes,
                salary.BasicPay,
                salary.HouseRent,
                salary.UtilityAllowances,
                salary.MedicalAllowances,
                deductions.Advance,
                deductions.Loan,
                deductions.Canteen,
                deductions.IncomeTax,
                deductions.EOBI,
                deductions.LateTime,
                deductions.ShortLeave,
                deductions.LeaveWithoutPay,
                deductions.OtherDeduction,
                totalDeduction,
                salary.NetPayableSalary,
            ]).draw();
        });
    
        $scope.$apply();
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