(function () {
  'use strict';

  angular
    .module('miApp.components')
    .component('selectorEspecialidad', {
      bindings: {
        especialidades: '<',
        onSeleccion: '&',
        modelo: '='
      },
      controller: SelectorEspecialidadController,
      template: `
<div class="form-group">
  <label for="especialidad" class="col-sm-3 control-label">Especialidad</label>
  <div class="col-sm-9">
    <select id="especialidad" class="form-control" 
            ng-model="$ctrl.modelo"
            ng-options="esp for esp in $ctrl.especialidades"
            required>
      <option value="">Seleccione una especialidad</option>
    </select>
  </div>
</div>
      `
    });

  function SelectorEspecialidadController($scope) {
    const $ctrl = this;

    $scope.$watch(() => $ctrl.modelo, function (nuevoValor, anteriorValor) {
      if (nuevoValor !== anteriorValor && nuevoValor) {
        $ctrl.onSeleccion();
      }
    });
  }

})();
