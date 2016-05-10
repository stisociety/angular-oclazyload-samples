(function () {
    'use strict';
    angular.module('app.package2').controller('package2.main', MostrarDadosFuncionalidade);

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