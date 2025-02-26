"use strict";

angular.module("app", [])
    .controller("mainController", MainController)
    .controller("toBuyController", ToBuyController)
    .controller("alreadyBoughtController", AlreadyBoughtController)
    .service("mainService", MainService)
    .service("checkService", CheckService);

MainController.$inject = ['$scope', 'mainService'];
function MainController($scope, mainService) {
    const main = this;

    main.title = mainService.title;
    $scope.description = 'Bought check list'
}

ToBuyController.$inject = ['checkService'];
function ToBuyController(checkService) {
    const bCtrl = this;

    bCtrl.toBuy = checkService.getToBuy();
    console.log('bCtrl.toBuy', bCtrl.toBuy);

    bCtrl.buy = function (item) {
        checkService.buy(item);
    }
}

AlreadyBoughtController.$inject = ['checkService']
function AlreadyBoughtController(checkService) {
    const abCtrl = this;

    abCtrl.alreadyBougth = checkService.getAlreadyBought();
}

function CheckService() {
    const service = this;

    const toBuy = [
        { name: 'cookies', quantity: 10 },
        { name: 'chocolate', quantity: 5 },
        { name: 'chips', quantity: 3  },
    ];

    const alreadyBought = [];
    
    service.getToBuy = function () {
        return toBuy;
    }

    service.getAlreadyBought = function () {
        return alreadyBought;
    }

    service.buy = function (item) {
        const index = alreadyBought.findIndex((i) => i.name === item.name);
        console.log('index', index)

        if (index !== -1) {
            alreadyBought[index].quantity += 1;
        } else {
            alreadyBought.push({
                ...item,
                quantity: 1
            });
        }

        if (item.quantity > 1) {
            const index = toBuy.findIndex((i) => i.name === item.name);
            console.log('index 2', index)
            toBuy[index].quantity -= 1;
        } else {
            toBuy.splice(toBuy.findIndex((i) => i.name === item.name), 1);
        }
    }
}

function MainService() {
    const service = this;
    
    service.title = 'Check off list application'
}