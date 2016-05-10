/// <reference path="../../../scripts/_references.js" />
(function () {
    'use strict';

    var core = angular.module('ssmart.core');
    core.config(ConfigurarAplicativo);
    core.run(staleSates);
    core.run(ExecutarConfifuracoesPadroes);

    /* @ngInject */
    function ConfigurarAplicativo($logProvider, $stateProvider, $urlRouterProvider, $locationProvider, routehelperConfigProvider) {
        console.log('App core config');

        if ($logProvider.debugEnabled)
            $logProvider.debugEnabled(true);

        //$urlRouterProvider.deferIntercept();
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        $locationProvider.html5Mode({ enabled: false });
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('/', {
            url: '/'
        });     
    }

    function staleSates($rootScope, $state, $stateParams) {
        console.log('App core running states');
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        
    }


    /* @ngInject */
    function ExecutarConfifuracoesPadroes($state, $http, $ocLazyLoad, $urlRouter, routehelper) {
        console.log('App core running routes');
        var packages = [];
        $http.get('app/data/packages.json').success(function (data) {
            packages = data;

            angular.forEach(packages, function (packageItem) {
                loadPackage(packageItem.Name, packageItem.Dependencies);
                routehelper.configureRoute(packageItem.Route);
            });
            //$urlRouter.sync();
            //$urlRouter.listen();
            console.log('App core routes loaded');
        });        

        console.log('App core routes finish');

        function loadPackage(name, files) {
            var ocConfig = [{
                "name": name,
                "files": files,
                "serie": true
            }];
            $ocLazyLoad.load(ocConfig).then(console.log('file ' + name + ' loaded'));
        }
    }


})();