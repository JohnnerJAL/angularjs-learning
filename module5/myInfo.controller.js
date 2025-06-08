(function() {
  'use strict';
  
  angular.module('MenuApp')
  .controller('MyInfoController', MyInfoController);
  
  MyInfoController.$inject = ['UserService', 'MenuDataService'];
  function MyInfoController(UserService, MenuDataService) {
    var $ctrl = this;
    $ctrl.user = UserService.getUser();
    
    if ($ctrl.user && $ctrl.user.favoriteItem) {
      // Si ya tenemos el item favorito (de la sesión anterior)
      $ctrl.menuItem = $ctrl.user.favoriteItem;
    } else if ($ctrl.user && $ctrl.user.favoriteDish) {
      // Si necesitamos cargar el item favorito
      MenuDataService.getMenuItem($ctrl.user.favoriteDish)
        .then(function(item) {
          $ctrl.menuItem = item;
        })
        .catch(function(error) {
          console.error('Error loading menu item:', error);
        });
    }
  }
})();