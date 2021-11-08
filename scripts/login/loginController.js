var app = angular.module("myApp", []);


app.controller('LoginController', function ($scope, $http) {
    $scope.userName="";
    $scope.passWord="";
    $scope.Login = function () {
        // $http.get("user.json")
        //     .success(function (response) {
        //         alert("success");
        //     })
        //     .error(function(response) {
        //         alert("Usser name or Password Error!!!")
        //     });
        if ($scope.userName=="user" && $scope.passWord=="user") {
            window.location.href = "pages/main.html";
        }
        else{
            alert("User name or password incorrect!!");
            
        }
    }
});