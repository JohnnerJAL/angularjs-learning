'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: './categories.component.html',
  bindings: {
    categories: '<'
  },
  controller: function() {
    var $ctrl = this;
    console.log('Categories component initialized', $ctrl.categories);
  }
});