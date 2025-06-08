(function() {
  'use strict';
  
  angular.module('MenuApp')
  .controller('SignUpController', SignUpController);
  
  SignUpController.$inject = ['UserService', 'MenuDataService'];
  function SignUpController(UserService, MenuDataService) {
    console.log('SignUpController initialized');
    var $ctrl = this;
    $ctrl.user = {};
    $ctrl.completed = false;
    $ctrl.invalidMenuItem = false;
    
    $ctrl.submit = function() {
      MenuDataService.getMenuItem($ctrl.user.favoriteDish)
        .then(function(item) {
          $ctrl.user.favoriteItem = item;
          UserService.saveUser($ctrl.user);
          $ctrl.completed = true;
          $ctrl.invalidMenuItem = false;
        })
        .catch(function(error) {
          $ctrl.invalidMenuItem = true;
          $ctrl.completed = false;
        });
    };
    
    // Bonus: Validación en tiempo real
    $ctrl.checkMenuItem = function() {
      if ($ctrl.user.favoriteDish) {
        console.log('entering checkMenuItem', $ctrl.user.favoriteDish);
        MenuDataService.getMenuItem($ctrl.user.favoriteDish)
          .then(function() {
            $ctrl.invalidMenuItem = false;
          })
          .catch(function() {
            $ctrl.invalidMenuItem = true;
          });
      }
    };
  }
})();