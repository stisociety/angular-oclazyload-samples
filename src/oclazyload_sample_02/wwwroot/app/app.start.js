/// <reference path="../../scripts/_references.js" />
(function () {
    'use strict';
    angular.module('app.start', ['ui.router', 'oc.lazyLoad', 'common.router', 'app.package2']);

    angular.module('app.start').config(configApp);
    function configApp($stateProvider, $urlRouterProvider, $locationProvider, routehelperConfigProvider) {
        console.log('App main config');

        $urlRouterProvider.deferIntercept();
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        $locationProvider.html5Mode({ enabled: false });
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('/', { url: '/' });
    }


    angular.module('app.start').run(executeStateApp);
    function executeStateApp($rootScope, $state, $stateParams) {
        console.log('App core running states');
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.log('opaa');
            console.log(fromState.name + ' -> ' + toState.name);
        });
    }

    angular.module('app.start').run(executeApp);
    function executeApp($q, $state, $http, $ocLazyLoad, $urlRouter, routehelper) {
        console.log('App core running routes');
        var packages = [];
        var queue = [];
        $http.get('app/data/packages.json').success(function (data) {
            packages = data;

            angular.forEach(packages, function (packageItem) {
                loadPackage(packageItem.Name, packageItem.Dependencies);
                routehelper.configureRoute(packageItem.Route);
            });

            routehelper.configureRoute(
               {
                   Name: 'package2',
                   Url: '/package2',
                   TemplateUrl: 'app/package2/main.html',
                   Controller: 'package2.main',
                   ControllerAs: 'vm'
               });
            $q.all(queue)
                .then(function (results) {
                    $urlRouter.sync();
                    $urlRouter.listen();
                    console.log('App core routes loaded');
                });
        });
        console.log('App core routes finish');

        function loadPackage(name, files) {
            var ocConfig = [{
                "name": name,
                "files": files,
                "serie": true
            }];
            queue.push($ocLazyLoad.load(ocConfig));
        }
    }

    angular.module('app.start').controller('main', ShowController);
    /* ngInject */
    function ShowController($state) {
        var vm = this;
    }
})();