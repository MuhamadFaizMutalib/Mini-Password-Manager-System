var app = angular.module("LoginPage", []);

app.controller(
  "loginSys",
  function ($scope, $httpParamSerializer, $http, $window) {
    var storedData = sessionStorage.getItem("myData");
    $scope.studs = JSON.parse(storedData);
    console.log("Data in sessionStorage:", $scope.studs);

    $scope.logout = function () {
      // Clear session storage or perform logout actions
      sessionStorage.removeItem("myData"); // Remove the stored user data
      // Optionally, redirect the user to the login page or any other page
      $window.location.href = "/SignIn&SignUp.html"; // Redirect to the login page
    };
  }
);
