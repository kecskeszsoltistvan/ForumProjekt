app.controller('profil', function($scope, ngNotify, $rootScope, $location){

    if (sessionStorage.getItem('loggedUser') == null) {
        $location.path('/main')
      }

    $scope.logout = function(){
        sessionStorage.removeItem('loggedUser');
        localStorage.removeItem('loggedUser');
        $rootScope.currentUser = null;
        $location.path('/main');
        ngNotify.set("Sikeres kijelentkezés", 'success');
    }
    
  })