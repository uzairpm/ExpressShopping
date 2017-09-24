var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  	.when('/', {
      controller: 'homeCtrl',
      templateUrl: 'template/home.html'
    })
    .when('/cart', {
      controller: 'cartCtrl',
      templateUrl: 'template/cart.html'
    })
}]);