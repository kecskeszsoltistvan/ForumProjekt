app.controller('posta', function($scope, ngNotify, $rootScope, $location){
    if (sessionStorage.getItem('loggedUser') == null) {
      $location.path('/main')
      ngNotify.set("Ehhez előbb be kell jelentkezned!", 'error')
    }
  })