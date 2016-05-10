(function () {
    'use strict';
    angular.module('app.package1')
        .controller('package1.home', ShowController);

    /* @ngInject */
    function ShowController()
    {
        var vm = this;
        vm.Title = "Package 1";
    }

})();