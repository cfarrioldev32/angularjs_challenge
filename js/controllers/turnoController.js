(function () {
  'use strict';

  angular
    .module('miApp.controllers')
    .controller('TurnoController', TurnoController);

  TurnoController.$inject = ['TurnoService'];

  function TurnoController(TurnoService) {
    const vm = this;
    vm.turno = {
      especialidad: undefined,
      profesional: undefined
    };
    vm.estadoFormulario = 'formulario';
    vm.resultado = {};
    vm.especialidades = [];
    vm.profesionales = [];
    vm.cargandoProfesionales = false;

    TurnoService.obtenerEspecialidades().then(data => {
      vm.especialidades = data;
    });

    vm.cargarProfesionalesYHorarios = function () {
      vm.turno.profesional = null;
      vm.profesionales = []; 

      if (vm.turno.especialidad) {
        vm.cargandoProfesionales = true;

        TurnoService.obtenerProfesionales(vm.turno.especialidad)
          .then(data => {
            vm.profesionales = data || [];
            vm.cargandoProfesionales = false;
          })
          .catch(error => {
            console.error('Error cargando profesionales', error);
            vm.profesionales = [];
            vm.cargandoProfesionales = false;
          });
      } else {
        vm.profesionales = [];
        vm.cargandoProfesionales = false;
      }
    };

    vm.enviarFormulario = function () {
      if (!vm.turno.especialidad || !vm.turno.profesional) {
        alert('Por favor complete todos los campos');
        return;
      }

      TurnoService.enviarTurno(vm.turno)
        .then(res => {
          vm.resultado = res;
          vm.estadoFormulario = 'resultado';
        });
    };

    vm.volverAlFormulario = function () {
      vm.estadoFormulario = 'formulario';
      vm.turno = { especialidad: undefined, profesional: undefined };
      vm.profesionales = [];
    };
  }
})();