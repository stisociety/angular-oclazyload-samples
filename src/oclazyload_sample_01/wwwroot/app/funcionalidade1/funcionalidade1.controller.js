(function () {
    'use strict';
    angular.module('app.modulo.inicial.func1')
        .controller('Funcionalidade', MostrarDadosFuncionalidade);

    /* @ngInject */
    function MostrarDadosFuncionalidade()
    {
        var vm = this;
        vm.Titulo = "Funcionalidade 1";
    }

})();