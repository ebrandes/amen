'use strict';

/* Controllers */

function IndexCtrl($scope, $http, $location, $route, $routeParams) {
  $scope.form = {};

  // POST
  $scope.postItem = function () {
    $http.post('/api/item', $scope.form).
      success(function(data) {        
        $route.reload();
      });
  };

  // GET
  $scope.init = function () {
      $http.get('/api/itens').
        success(function(data, status, headers, config) {
          $scope.itens = data.itens;
      });
  };

  // PUT
  $scope.updateItem = function () {
    console.log('$routeParams.id : ' + $routeParams.id);
    $http.put('/api/item/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/');
      });
  };

  // DELETE
  $scope.deleteItem = function (id) {
    $http.delete('/api/item/' + id).
      success(function(data) {
        $route.reload();
      });
  };

  $scope.init();

}