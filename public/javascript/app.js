// app.js

angular
  .module("emailApp", [])
  .controller(
    "EmailController",
    function ($scope, $httpParamSerializer, $http, $window) {
      $scope.SendOTPcode = true;

      var storedData = sessionStorage.getItem("myEmail");
      $scope.studs = JSON.parse(storedData);
      // console.log("Data in sessionStorage:", $scope.studs.studs);

      $scope.sendEmail = function () {
        $scope.generatedOTP = $scope.generateOTPcode();
        var emailData = {
          email: $scope.studs.studs,
          subject: "OTP-Code",
          text: "Your OTP-Code is: " + $scope.generatedOTP,
        };

        $http
          .post("http://localhost:3001/send-email", emailData)
          .then(function (response) {
            alert("OTP-Code has been sent to your email");
          })
          .catch(function (error) {
            alert("Error sending OTP code");
            console.error(error);
          });
      };

      $scope.generateOTPcode = function () {
        const digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      };

      $scope.isValidOTP = function (otp) {
        var otpRegex = /^\d{6}$/;
        return otpRegex.test(otp);
      };

      $scope.CheckOTPcode = function () {
        // console.log("OTPP? " + $scope.otpcode);
        if (!$scope.isValidOTP($scope.otpcode)) {
          alert("Please enter a valid OTP-CODE (6 Digits OTP-Code)");
          return;
        } else if ($scope.otpcode == $scope.generatedOTP) {
          alert("OTP-Code is valid");
          $scope.ResetPassword = true;
          $scope.SendOTPcode = false;
        } else {
          alert("Invalid OTP-Code, Enter again!");
        }

        // Function to check if the password is strong
        $scope.isStrongPassword = function (password) {
          // Example: Password should be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character
          var passwordRegex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,|`\-=\\[\]\/])[A-Za-z\d!@#$%^&*()_+}{"':;?/>.<,|`\-=\\[\]\/]{8,}$/;

          return passwordRegex.test(password);
        };

        $scope.NewPassword = function () {
          if (!$scope.isStrongPassword($scope.NewPass)) {
            alert("Please enter a strong password.");
            return;
          }
          let pass = $httpParamSerializer({
            email: $scope.studs.studs,
            password: $scope.NewPass,
          });

          $http.get("http://localhost:3000/updatePassword?" + pass).then(
            function (response) {
              alert("Your Password has been updated, Try to LogIn again!");
              window.location.href = "SignIn&SignUp.html";
            },

            function (response) {
              alert("Error Update Password");
            }
          );
        };
      };
    }
  );
