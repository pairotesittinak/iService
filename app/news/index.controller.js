
(function () {
    'use strict';

    angular
        .module('app')
        .controller('news.IndexController', Controller);

    function Controller(UserService, $http, $scope) {
        // var vm = this;

        // vm.user = null;

        // initController();

        // function initController() {
        //     // get current user
        //     UserService.GetCurrent().then(function (user) {
        //         vm.user = user;
        //     });
        // }

var urlShowJson = "http://192.168.2.163:3000/showJson";
$http.get(urlShowJson).success( function(data) {
   $scope.ALL =  data;
   // console.log("Review get  Opject: ", response, status);
  console.log(data);
});



    }

})();



// .controller('PlaylistsCtrl', function($scope,  $ionicPopover, $http) {
// var urlShowJson = "http://localhost:3000/showJson";
// $http.get(urlShowJson).success( function(data) {
//    $scope.ALL =  data;
//    // console.log("Review get  Opject: ", response, status);
//   console.log(data);
// });

// }
// .controller('news.IndexController', function($scope, $stateParams) {
// });
