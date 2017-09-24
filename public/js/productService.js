var myApp = angular.module('myApp');

myApp.service('productService', function() {
    var savedData = {}
    function set(data) {
        this.savedData = data;
    }
    function get() {
        return this.savedData;
    }
    return {
        set: set,
        get: get
    }
});