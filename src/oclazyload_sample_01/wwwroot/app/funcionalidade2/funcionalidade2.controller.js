(function () {
    'use strict';
    angular.module('app.modulo.inicial.func2')
        .controller('Funcionalidade2', MostrarDadosFuncionalidade);

    /* @ngInject */
    function MostrarDadosFuncionalidade(usuarioDataService)
    {
        var vm = this;
        vm.Titulo = "Funcionalidade 2";
        vm.usuarios = [];

        activate();

        function activate()
        {
            return usuarioDataService.getUsuarios().then(function (response) {
                vm.usuarios = response.data;
                return vm.usuarios;
            });            
        }
    }

})();