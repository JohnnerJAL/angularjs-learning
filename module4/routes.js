'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.template.html'
    })
    
    .state('categories', {
      url: '/categories',
      templateUrl: 'categories.template.html',
      controller: 'CategoriesController as $ctrl',
      resolve: {
        categories: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    
    .state('items', {
      url: '/items/{categoryShortName}',
      templateUrl: 'items.template.html',
      controller: 'ItemsController as $ctrl',
      resolve: {
        items: ['$stateParams', 'MenuDataService', 
                function($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    });
}