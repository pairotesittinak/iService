// var mongoose = require('mongoose');
// var usersSchema = mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     username: String,
//     Status: String,
//     typeUser: String,
//     faculty: String,
//     year: String
// }, 
// {collection: 'users'}
// );
// var Users = mongoose.model('Users', usersSchema);


// exports.getUser = function(req, res, next) {

// // console.log("1234");


// Users
// .find()
// .populate('File')
// .sort({date: -1})
// .exec(function (err, users) {
//   if (err) return handleError(err);
//   console.log('The creator is %s', users);
//   // prints "The creator is Aaron"
//   res.json({item: users});
// });

// };



(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
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