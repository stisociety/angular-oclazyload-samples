(function () {
    'use strict';

    angular.module('app.modulo.inicial.func2')
        .factory('usuarioDataService', DataService);

    /* ngInject */
    function DataService($http) {
        return {
            getUsuarios: getUsuarios            
        };

        function getUsuarios() {
            return $http.get('app/dados/usuarios.json');
        }        
    }

})();