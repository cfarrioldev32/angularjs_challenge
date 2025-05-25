(function() {
  'use strict';


//  angular.module('miApp.controllers', []);
//  angular.module('miApp.services', []);
  angular
    .module('miApp', ['miApp.components', 'miApp.controllers', 'miApp.services','ui.router'])
    .config(configure)
    .controller('MainController', MainController);

  configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function configure($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/inicio');

    $stateProvider
    .state('inicio', {
      url: '/inicio',
      templateUrl: 'pages/inicio.html',
      controller: 'InicioController as inicioCtrl',
      resolve: {
        contenidoInicio: ['InicioService', function(InicioService) {
          return InicioService.obtenerDatosInicio()
            .then(function(response) {
              return response;
            })
            .catch(function(error) {
              console.log('Error obteniendo datos de inicio');
              throw error;
            });
        }]
      }
    })
    .state('turno', {
      url: '/turno',
      templateUrl: 'pages/turno.html',
      controller: 'TurnoController as turnoCtrl'
    })
    
  }

  MainController.$inject = ['$scope'];
  function MainController($scope) {
    console.log("asdfasdfasdfadswf")
  }

})();