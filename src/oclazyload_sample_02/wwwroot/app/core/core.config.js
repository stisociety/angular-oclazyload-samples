/// <reference path="../../../scripts/_references.js" />
(function () {
    'use strict';

    var core = angular.module('ssmart.core');

    // config base 
    core.config(ConfigCoreApp);
    // Running configs    
    core.run(ExecuteDefaults);

    /* @ngInject */
    function ConfigCoreApp($logProvider, $stateProvider, $urlRouterProvider, $locationProvider, routehelperConfigProvider) {
        console.log('App core init config');

        if ($logProvider.debugEnabled)
            $logProvider.debugEnabled(true);

        $urlRouterProvider.deferIntercept();
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        $locationProvider.html5Mode({ enabled: false });
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('/', { url: '/' });
        console.log('App core finished config');
    }   

    /* @ngInject */
    function ExecuteDefaults($q, $state, $http, $ocLazyLoad, $urlRouter, routehelper) {
        console.log('App core init run');
        var packages = [];
        var queue = [];
        $http.get('app/data/packages.json').success(function (data) {
            packages = data;

            angular.forEach(packages, function (packageItem) {
                loadPackage(packageItem.Name, packageItem.Dependencies);
                if (!packageItem.UseRouteFile)
                    routehelper.configureRoute(packageItem.Route);
            });

            $q.all(queue)
                .then(function (results) {
                    $urlRouter.sync();
                    $urlRouter.listen();
                    console.log('App core routes loaded');
                });
            console.log('App core finished run');
        });        

        function loadPackage(name, files) {
            var ocConfig = [{
                "name": name,
                "files": files,
                "serie": true
            }];
            queue.push($ocLazyLoad.load(ocConfig));
        }
    }


})();