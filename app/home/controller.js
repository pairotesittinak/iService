// (function AppCtrl($scope) {
//     'use strict';

//     console.log("hello world")

//     person1 = {
//     	Num: '1',
//     	name: 'ไพโรจน์',
//     	status: 'ผู้ใช้งานทั่วไป',
//     	type: 'นักศึกษา',
//     	fac: 'ครุศาสตร์',
//     	year: '4'


//     };
//     person2 = {
//     	Num: '2',
//     	name: 'ภานุพงศ์',
//     	status: 'ผู้ใช้งานทั่วไป',
//     	type: 'นักศึกษา',
//     	fac: 'ครุศาสตร์',
//     	year: '4'
//     };

//     var contactlist = [person1, person2];
//     $scope.contactlist = contactlist;
// });

var mongoose = require('mongoose'),
    _ = require('lodash'); 
var Schema = mongoose.Schema;
var usersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    Status: String,
    typeUser: String,
    faculty: String,
    year: String
}, 
{collection: 'users'}
);
var Users = mongoose.model('Users', usersSchema);




exports.getUser = function(req, res, next) {
// res.render('home', { title: 'The index page!' })

Users.find({}, function(err, response) {
        if (err) {
            return next(err);
        } else {
            // res.render('home', {items: response});
          return  res.render('home', { title: response });
          // res.json(users);
            // console.log("OK");
        }
    });

};

exports.showuser = function(req, res, next) {
    res.render('home');
    console.log("OK");
    // Users.find({}, function(err, response) {
    //     if (err) {
    //         return next(err);
    //     } else {
    //         res.render('home', {items: response});
    //         // res.json(users);
    //         // console.log("OK");
    //     }
    // });
    next();
};