'use strict';

(function () {
    angular
        .module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            restrict: 'E',
            scope: {
                items: '<',
                onRemove: '&'
            },
            template: `
                <ul>
                    <li ng-repeat="item in items">
                        {{ item.name }} ({{ item.short_name }}): {{ item.description }}
                        <button ng-click="onRemove({index: $index})">Don't want this one!</button>
                    </li>
                </ul>
            `
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = "";
        ctrl.found = [];
        ctrl.nothingFound = false;

        ctrl.narrowItDown = function () {
            if (!ctrl.searchTerm) {
                ctrl.found = [];
                ctrl.nothingFound = true;
                return;
            }

            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                .then(function (foundItems) {
                    ctrl.found = foundItems;
                    ctrl.nothingFound = (ctrl.found.length === 0);
                }, function (error) {
                    ctrl.found = [];
                    ctrl.nothingFound = true;
                });
        };

        ctrl.removeItem = function (index) {
            ctrl.found.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
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

                return foundItems;
            }, function (error) {
                console.error("Error fetching menu items:", error);
                return [];
            });
        };
    }

})();
