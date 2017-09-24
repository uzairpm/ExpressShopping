var myApp = angular.module('myApp');

myApp.controller('cartCtrl', ['$scope', '$location', '$http', 'productService', function($scope, $location, $http, productService) {
    var postUrl = "/order";
    $scope.shippingCharges = 500;
    $scope.total = 0;

    var selectedProducts = productService.get();
    angular.forEach(selectedProducts, function(value, key) {
        value.quantity = 1;
        $scope.total += value.price * value.quantity;
    });
    $scope.total += $scope.shippingCharges;
    $scope.selectedProducts = selectedProducts;

    $scope.incrementCount = function(product) {
        if(product.quantity < 10) {
            product.quantity++;
            this.updateTotal();
        }
    }
    $scope.decrementCount = function(product) {
        if(product.quantity > 1) {
            product.quantity--;
            this.updateTotal();
        }
    }
    $scope.updateTotal = function() {
        $scope.total = 0;
        angular.forEach(this.selectedProducts, function(value, key) {
            $scope.total += value.price * value.quantity;
        });
        $scope.total += $scope.shippingCharges;
    }

    $scope.placeOrder = function() {
        var params = {
            products: $scope.selectedProducts,
            total: $scope.total
        };
        $http.post(postUrl, params).then(function(response) {
            alert(response.data.message);
            $location.path("/");
        });
    }
}]);