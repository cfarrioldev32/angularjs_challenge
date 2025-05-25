(function () {
  'use strict';

  angular
    .module('miApp.components')
    .component('formularioPaciente', {
      bindings: {
        paciente: '=',
        onEnviar: '&'
      },
      template: `
            
<form ng-submit="$ctrl.onEnviar()" class="form-horizontal">
  <div class="form-group">
    <label class="col-sm-3 control-label">Nombre</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" ng-model="$ctrl.paciente.nombre" required>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Apellido</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" ng-model="$ctrl.paciente.apellido" required>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Dirección</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" ng-model="$ctrl.paciente.direccion" required>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Teléfono</label>
    <div class="col-sm-9">
      <input type="tel" class="form-control" ng-model="$ctrl.paciente.telefono" required>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Comentario (opcional)</label>
    <div class="col-sm-9">
      <textarea class="form-control" ng-model="$ctrl.paciente.comentario" rows="3"></textarea>
    </div>
  </div>

  <div class="form-group text-center">
    <button type="submit" class="btn btn-primary btn-lg">Solicitar turno</button>
  </div>
</form>

`
    });

})();