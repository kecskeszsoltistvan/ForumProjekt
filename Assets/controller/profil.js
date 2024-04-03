app.controller('profil', function($scope, ngNotify, $rootScope, $location){

    $scope.logout = function(){
        sessionStorage.clear()
        localStorage.clear()
        //Dobjon vissza a főoldalra
    }
    
  })