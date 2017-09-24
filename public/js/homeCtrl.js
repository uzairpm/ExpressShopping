var myApp = angular.module('myApp');

myApp.controller('homeCtrl', ['$scope', '$location', '$http', 'productService', function($scope, $location, $http, productService) {
    // USE THE BELOW JSON IN CASE REST API IS NOT AVAILABLE
    // var url = "api/products.json";
    var url = "/products";
    var cartProductIds = [];
    $scope.cartProducts = [];
    
    $scope.message = "Choose from our range of products below. Hurry!";
    
    $http.get(url).then(function(response) {
        $scope.products = response.data;
    });

    $scope.addToCart = function(product) {
        if (cartProductIds.indexOf(product.id) === -1) {
            this.cartProducts.push(product);
            cartProductIds.push(product.id);
        }
    }

    $scope.checkout = function() {
        $location.path("cart");
        productService.set(this.cartProducts);
    }
}]);
