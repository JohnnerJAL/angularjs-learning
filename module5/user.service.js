(function() {
  'use strict';
  
  angular.module('data')
  .service('UserService', UserService);
  
  function UserService() {
    var service = this;
    var user = null;
    
    service.saveUser = function(userData) {
      user = userData;
    };
    
    service.getUser = function() {
      return user;
    };
  }
})();