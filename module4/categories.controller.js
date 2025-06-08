'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['categories'];
function CategoriesController(categories) {
  var $ctrl = this;
  console.log('CategoriesController', categories);
  $ctrl.categories = categories;
}