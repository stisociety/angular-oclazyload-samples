(function () {
    'use strict';
    angular.module('app.package2')
    .run(LoadRoutes);

    /* ngInject */
    function LoadRoutes(routehelper) {
        console.log('package 2 routes executed ...');

        routehelper.configureRoute(
            {
                Name: 'package2',
                Url: '/package2',
                TemplateUrl: 'app/package2/main.html',
                Controller: 'package2.home',
                ControllerAs: 'vm'
            });
    }
})();