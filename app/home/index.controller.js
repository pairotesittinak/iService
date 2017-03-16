(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);


    function Controller($window, UserService, FlashService, $scope, $http) {

        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;

        initController();


        // $http.get('/all/users')
        // .success(function(data) {
        //     $scope.ShowUsersIonic = data;
        //     console.log($scope.ShowUsersIonic[0]);
        // })
        // .error(function(data) {
        //     console.log('Error: ' + data);
        // });









var urlShowJson = "http://localhost:3000/all/users";
$http.get(urlShowJson).success( function(data) {
   $scope.ShowUsersIonic =  data;
   // console.log("Review get  Opject: ", response, status);
  console.log($scope.ShowUsersIonic);
});



        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                // $scope.User = vm.user;
                // console.log($scope.User);
            });
        }

        function saveUser() {
            UserService.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();