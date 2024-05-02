var app = angular.module("user", []);

app.controller(
  "userCtrl",
  function ($scope, $http, $httpParamSerializer, $window) {
    $scope.oprSignUp = false;
    $scope.oprSignIn = true;

    $scope.emailauth = "???";
    $scope.passwordauth = "???";

    $scope.user = {
      username: "",
      email: "",
      password: "",
    };

    $scope.createUser = function () {
      var serializedData = $httpParamSerializer($scope.user);
      // console.log(serializedData);

      $http.get("http://localhost:3000/createUser?" + serializedData).then(
        function (response) {
          $scope.NewRegister();
          $scope.oprSignUp = false;
          $scope.oprSignIn = true;
        },

        function (response) {
          alert("Ajax connection error!");
        }
      );
    };

    $scope.NewRegister = function () {
      var emailData = {
        email: $scope.user.email,
        subject: "Registration",
        text: "Congratulations, Registration Successful",
      };

      $http
        .post("http://localhost:3001/send-email", emailData)
        .then(function (response) {
          alert("Check Your Email");
        })
        .catch(function (error) {
          alert("Error registration");
          console.error(error);
        });
    };

    $scope.SignIn = function () {
      let authData = $httpParamSerializer({
        username: $scope.user.username,
        password: $scope.user.passwordauth,
      });

      $http.get("http://localhost:3000/read?" + authData).then(
        function (response) {
          $scope.studs = response.data;

          var dataToPass = { studs: $scope.studs };

          // Store data in sessionStorage
          sessionStorage.setItem("myData", JSON.stringify(dataToPass));

          // console.log("Username:", $scope.user.username);
          // console.log("Response Data:", $scope.studs.username);

          $window.location.href = "/Profile.html";
        },

        function (response) {
          // 2nd function to handle connection error
          alert("Wrong Username or Password!!!");
        }
      );
    };

    $scope.CheckUsersz = function () {
      let Dats = $httpParamSerializer({
        username: $scope.user.username,
        email: $scope.user.email,
      });

      $http.get("http://localhost:3000/checkUser?" + Dats).then(
        function (response) {
          $scope.mew = response.data;
          // console.log("How many? " + $scope.mew);
          if ($scope.mew >= 1) {
            alert("Username or Email already exists");
          } else {
            $scope.createUser();
          }
        },

        function (response) {
          alert("Invalid User");
        }
      );
    };

    // Function to check if the password is strong
    $scope.isStrongPassword = function (password) {
      // Example: Password should be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character
      var passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,|`\-=\\[\]\/])[A-Za-z\d!@#$%^&*()_+}{"':;?/>.<,|`\-=\\[\]\/]{8,}$/;

      return passwordRegex.test(password);
    };

    // Function to check if the email is valid
    $scope.isValidEmail = function (email) {
      // Example: Using a simple regex for email validation
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Function to check if the username contains only characters
    $scope.isValidUsername = function (username) {
      // Allow only alphabetical characters
      var usernameRegex = /^[A-Za-z]+$/;
      return usernameRegex.test(username);
    };

    $scope.CheckUsers = function () {
      if (!$scope.isValidUsername($scope.user.username)) {
        alert("Please enter a username with only characters.");
        return;
      } else if (!$scope.isValidEmail($scope.user.email)) {
        alert("Please enter a valid email address.");
        return;
      } else if (!$scope.isStrongPassword($scope.user.password)) {
        alert("Please enter a strong password.");
        return;
      } else {
        $scope.CheckUsersz();
      }
    };

    $scope.CheckEmail = function () {
      if (!$scope.isValidEmail($scope.user.resetEmail)) {
        alert("Please enter a valid email address.");
        return;
      }
      let Dots = $httpParamSerializer({
        email: $scope.user.resetEmail,
      });

      $http.get("http://localhost:3000/resetPassword?" + Dots).then(
        function (response) {
          $scope.net = response.data;
          // console.log("How many? " + $scope.net);
          if ($scope.net >= 1) {
            var passemail = { studs: $scope.user.resetEmail };
            // console.log("test? " + $scope.user.resetEmail);

            // Store data in sessionStorage
            sessionStorage.setItem("myEmail", JSON.stringify(passemail));
            window.location.href = "PasswordRecovery.html";
          } else {
            alert("Email does not exist");
          }
        },

        function (response) {
          alert("Error sending reset link.");
        }
      );
    };
  }
);
