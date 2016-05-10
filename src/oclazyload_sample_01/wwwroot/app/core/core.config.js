/// <reference path="../../../scripts/_references.js" />
(function () {
    'use strict';

    var core = angular.module('ssmart.core');
    core.config(ConfigurarAplicativo);
    core.run(ExecutarConfifuracoesPadroes)

    /* @ngInject */
    function ConfigurarAplicativo($logProvider, $stateProvider, $urlRouterProvider, routehelperConfigProvider) {
        if ($logProvider.debugEnabled)
            $logProvider.debugEnabled(true);
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('/', {
            url: '/'
        });
    }

    /* @ngInject */
    function ExecutarConfifuracoesPadroes($state, $http, $ocLazyLoad, routehelper) {
        var modulos = [];
        $http.get('app/dados/modulos.json').success(function (data) {
            modulos = data;
            angular.forEach(modulos, function (modulo) {                

                loadModule(modulo.Name,modulo.Dependencies);                

                if (modulo.Routes)
                    angular.forEach(modulo.Routes, function (route) {
                        routehelper.configureRoute(route);
                        console.log(angular.toJson($state.get()));
                    });
            });
        });

        function loadModule(name, files) {
            var ocConfig = [{
                "name": name,
                "files": files,
                "serie": true
            }];
            $ocLazyLoad.load(ocConfig).then(console.log('file ' + name + ' loaded'));
        }
    }

    
})();