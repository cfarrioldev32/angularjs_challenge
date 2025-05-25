(function () {
    'use strict';

    angular
        .module('miApp.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state'];

    function NavbarController($scope, $state) {
        var vm = this;
    }
})();