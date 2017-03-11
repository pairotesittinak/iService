﻿(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);


    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            
            .state('news', {
                url: '/news',
                templateUrl: 'news.ejs',
                controller: 'news.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'news' }
            })
            .state('pr', {
                url: '/pr',
                templateUrl: 'pr.ejs',
                controller: 'pr.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'pr' }
            })
            .state('home', {
                url: '/home',
                templateUrl: 'home.ejs',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            // .state('postUsers', {
            //     url: '/postUsers',
            //     templateUrl: 'postUsers.ejs',
            //     controller: 'postUsers.IndexController',
            //     controllerAs: 'vm',
            //     data: { activeTab: 'postUsers' }
            // })
            .state('account', {
                url: '/account',
                templateUrl: 'account.ejs',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            });


            
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();