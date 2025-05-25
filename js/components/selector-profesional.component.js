(function() {
  'use strict';

  angular
    .module('miApp.components')
    .component('selectorProfesional', {
      bindings: {
        profesionales: '<',
        cargando: '<',
        modelo: '='
      },
      template: `
      <div ng-if="$ctrl.profesionales.length" class="form-group">
  <label for="profesional" class="col-sm-3 control-label">Profesional</label>
  <div class="col-sm-9">
    <select id="profesional" class="form-control"
            ng-model="$ctrl.modelo"
            ng-options="prof.nombre + ' - ' + prof.horario for prof in $ctrl.profesionales track by prof.id"
            ng-disabled="$ctrl.cargando || !$ctrl.profesionales.length"
            required>
      <option value="">Seleccione un profesional</option>
    </select>
    <div class="help-block" ng-if="$ctrl.cargando">
      <i class="fa fa-spinner fa-spin"></i> Cargando profesionales...
    </div>
  </div>
</div>
      `

    });

})();