'use strict';

angular.module('data')
  .service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', '$q'];
function MenuDataService($http, $q) {
  var service = this;

  service.getMenuItem = function (searchTerm) {
    console.log('searchTerm', searchTerm);
    return $http({
      method: "GET",
      url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
    }).then(function (response) {
      var allCategories = response.data;
      console.log('allCategories', response.data);
      var allItems = Object.values(allCategories).reduce((acc, category) => {
        return acc.concat(category.menu_items);
      }, []);
      console.log('allItems', allItems);

      var foundItems = [];

      for (var i = 0; i < allItems.length; i++) {
        var description = allItems[i].description || '';
        var name = allItems[i].name || '';

        if (description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          name.toLowerCase().includes(searchTerm.toLowerCase())) {
          foundItems.push(allItems[i]);
        }
      }
      console.log('foundItems', foundItems);

      return foundItems[0];
    }, function (error) {
      console.error("Error fetching menu items:", error);
      // return [];
      return '';
    });
  };

  // service.getMenuItem = function (shortName) {
  //   return $http({
  //     method: 'GET',
  //     url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
  //   }).then(function (response) {
  //     // Buscar en todas las categorías
  //     console.log('response getMenuItem', response.data);
  //     for (var category in response.data) {
  //       if (response.data.hasOwnProperty(category)) {
  //         var items = response.data[category].menu_items;
  //         for (var i = 0; i < items.length; i++) {
  //           if (items[i].short_name === shortName) {
  //             return items[i];
  //           }
  //         }
  //       }
  //     }
  //     return $q.reject('Item not found');
  //   });
  // };

  service.getAllCategories = function () {
    return $http({
      method: 'GET',
      url: 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json'
    }).then(function (response) {
      console.log('response all categories', response.data);
      return response.data;
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: 'GET',
      url: `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryShortName}.json`
    }).then(function (response) {
      return response.data;
    });
  };
}