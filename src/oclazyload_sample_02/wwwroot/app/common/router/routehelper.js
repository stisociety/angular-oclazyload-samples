(function () {
    'use strict';

    angular
        .module('common.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$location', '$rootScope', '$state', 'routehelperConfig'];

    function routehelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, $state, routehelperConfig) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var $stateProvider = routehelperConfig.config.$stateProvider;

        var service = {
            configureRoutes: configureRoutes,
            routeCounts: routeCounts,
            configureRoute: configureRoute,
            configureRouteFix: configureRouteFix
        };

        init();

        return service;
        ///////////////

        function configureRoute(route) {

            var routeConfig = {
                url: route.Url,
                templateUrl: route.TemplateUrl,
                controller: route.Controller,
                controllerAs: route.ControllerAs
            };            
            $stateProvider.state(route.Name, routeConfig);            
            //console.log(angular.toJson($state.get()));
        }

        function configureRouteFix() {

            //var routeConfig = {
            //    url: route.Url,
            //    templateUrl: route.TemplateUrl,
            //    controller: route.Controller,
            //    controllerAs: route.ControllerAs
            //};
            var routeConfig = {
                url: "/teste",
                templateUrl: 'app/package1/main.html',
                controller: 'package1.home',
                controllerAs: 'vm'
            };

            $stateProvider.state('teste', routeConfig);
            console.log('route teste executed in state provider');
            console.log(angular.toJson($state.get()));
        }

        function configureRoutes(routes) {
            routes.forEach(function (route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
                $stateProvider.state(route.name, route.config);
                console.log('route ' + route.name + ' executed in state provider');
                console.log(angular.toJson($state.get()));
            });            
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function (event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    logger.warning(msg, [current]);
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function (event, current, previous) {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }
    }
})();
