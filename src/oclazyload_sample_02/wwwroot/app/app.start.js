/// <reference path="../../scripts/_references.js" />
(function () {

    'use strict';
    angular.module('app.start', ['ssmart.core']);

    angular.module('app.start').controller('main', ShowController);
    /* ngInject */
    function ShowController($state) {
        var vm = this;
    }
})();