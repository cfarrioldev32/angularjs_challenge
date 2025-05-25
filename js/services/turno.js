(function () {
  'use strict';

  angular
    .module('miApp.services')
    .factory('TurnoService', TurnoService);

  TurnoService.$inject = ['$http'];

  function TurnoService($http) {
    var base = 'http://localhost:3000/data';

    return {
      obtenerEspecialidades: () => $http.get(base + '/especialidades').then(res => res.data),
      obtenerProfesionales: (especialidad) => $http.post(base + '/profesionales', { especialidad }).then(res => res.data),
      enviarTurno: (turno) => $http.post(base + '/turno', turno).then(res => res.data)
    };
  }
})();