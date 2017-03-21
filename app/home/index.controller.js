(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);


    function Controller($window, UserService, FlashService, $scope, $http, $state) {

        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;

        initController();

$scope.ButtonAdd = function(){
$("#div-table").hide("show");
$("#div-editAdd").show("show");
}
$scope.cancelAdd = function(){
$("#div-table").show("show");
$("#div-editAdd").hide("show");
}

$scope.calcelGetUser = function(){
        $("#div-getUserBox").hide("show");
$("#div-table").show("show");
}


/////////////BUTTON Search/////////////////////
$scope.GetDataUser = {};
$scope.getUser = function(){
//     $("#div-table").hide("show");
// $("#div-getUserBox").show("show");
var urls = "http://localhost:3000/g/" + $scope.SearchGet.username;
$http.get(urls).then( function(response) {
  $scope.GetDataUser = response.data;
  console.log($scope.GetDataUser);
  console.log($scope.GetDataUser.username+$scope.GetDataUser.lastname+$scope.GetDataUser.faculty)
});
}


$scope.addData = function(){

var urlNewsCnn = "http://localhost:3000/postUsers";
$http.post(urlNewsCnn,{
    'username':$scope.username, 'password':$scope.password,
    'firstname':$scope.firstname, 'lastname':$scope.lastname,
    'faculty':$scope.faculty, 'year':$scope.year,
    'userType':$scope.userType

}).success( function(response) {
  console.log('OK');
  // console.log($scope.username);
  alert('เพิ่มข้อมูลของ User' +  $scope.username + 'สำเร็จ' );
    $("#div-table").show("show");
    $("#div-editAdd").hide("show");
});

}

////////////////////////////Get Users////////////////
// ButtonUpdateGetUser(GetDataUser)
$scope.ButtonUpdateGetUser = function(GetDataUser){
//     $scope.IndexData = $scope.ShowUsersIonic.indexOf(test);
//     $scope.IndexData = $scope.GetDataUser.indexOf(GetDataUser);
// console.log("Index "+ $scope.IndexData);
console.log(GetDataUserGet.username);
 console.log(GetDataUserGet);
// $scope.buttonUpdateUserGet = [];
$scope.buttonUpdateUserGet.username = GetDataUser.username;
$scope.buttonUpdateUserGet.firstname = GetDataUser.firstname;
$scope.buttonUpdateUserGet.lastname = GetDataUser.lastname;
console.log($scope.buttonUpdateUserGet.firstname);
$scope.buttonUpdateUserGet.faculty = GetDataUser.faculty;
$scope.buttonUpdateUserGet.year = GetDataUser.year;
$scope.buttonUpdateUserGet.userType = GetDataUser.userType;
$("#div-table").hide("show");
$("#div-editbox").show("show");
}


$scope.saveData = function(){

var urlUpdate = "http://localhost:3000/g/update/" + $scope.buttonUpdateUserGet.username;
$http.post(urlUpdate,{
   
    'firstname':$scope.buttonUpdateUserGet.firstname, 'lastname':$scope.buttonUpdateUserGet.lastname,
    'faculty':$scope.buttonUpdateUserGet.faculty, 'year':$scope.buttonUpdateUserGet.year,
    'userType':$scope.buttonUpdateUserGet.userType

}).success( function(response) {

    alert("Success");
    console.log('OK');
    $("#div-table").show("show");
    $("#div-editbox").hide("show");
  // $state.go('home');
});
    alert("Success");
    console.log('OK');
    $("#div-table").show("show");
    $("#div-editbox").hide("show");
};





$scope.ButtonUpdateUser = function(test){
// $scope.IndexData = {};
$scope.IndexData = $scope.ShowUsersIonic.indexOf(test);
console.log("Index "+ $scope.IndexData);
console.log(test.username);
 console.log(test);
$scope.buttonUpdateUser = [];
$scope.buttonUpdateUser.username = test.username;
$scope.buttonUpdateUser.firstname = test.firstname;
$scope.buttonUpdateUser.lastname = test.lastname;
console.log($scope.buttonUpdateUser.firstname);
$scope.buttonUpdateUser.faculty = test.faculty;
$scope.buttonUpdateUser.year = test.year;
$scope.buttonUpdateUser.userType = test.userType;
$("#div-table").hide("show");
$("#div-editbox").show("show");
};

$scope.cancelData = function(){

    $("#div-table").show("show");
$("#div-editbox").hide("show");
}

$scope.saveData = function(){

var urlUpdate = "http://localhost:3000/g/update/" + $scope.buttonUpdateUser.username;
$http.post(urlUpdate,{
   
    'firstname':$scope.buttonUpdateUser.firstname, 'lastname':$scope.buttonUpdateUser.lastname,
    'faculty':$scope.buttonUpdateUser.faculty, 'year':$scope.buttonUpdateUser.year,
    'userType':$scope.buttonUpdateUser.userType

}).success( function(response) {

    alert("Success");
    console.log('OK');
    $("#div-table").show("show");
    $("#div-editbox").hide("show");
  // $state.go('home');
});
    alert("Success");
    console.log('OK');
    $("#div-table").show("show");
    $("#div-editbox").hide("show");
};
//     $("#div-table").show("show");
// $("#div-editbox").hide("show");


var urlShowJson = "http://localhost:3000/all/users";
$http.get(urlShowJson).success( function(data) {
   $scope.ShowUsersIonic =  data;
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