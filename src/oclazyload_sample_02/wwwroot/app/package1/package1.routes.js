(function () {
    'use strict';
    angular.module('app.package1')
    .run(LoadRoutes);

    /* ngInject */
    function LoadRoutes(routehelper) {
        console.log('package 1 routes executed ...');

        routehelper.configureRoute(
            {
                Name: 'package1',
                Url: '/package1',
                TemplateUrl: 'app/package1/main.html',
                Controller: 'package1.home',
                ControllerAs: 'vm'
            });
    }
})();