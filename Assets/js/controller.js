app.controller('legutobbi', function($scope){

    $scope.getChildren = function(n, skipMe){
      var r = [];
      for ( ; n; n = n.nextSibling ) 
         if ( n.nodeType == 1 && n != skipMe)
            r.push( n );        
      return r;
    }
  
    $scope.getSiblings = function(n) {
      return $scope.getChildren(n.parentNode.firstChild, n);
    }
  
    megnyit = function(x){
      
      let s = teszt[x].style.display;
      console.clear();
      for (let index = 0; index < teszt.length; index++) {
        if (index % 2 == 0) {
          console.log('Páros');
          teszt[index].style.display = 'none';
        }
        else {
          teszt[index].getElementsByTagName('img')[0].className = 'dropdown';
        }
      }
      if (s == 'block'){
        teszt[x-1].getElementsByTagName('img')[0].className = 'dropdown';
        teszt[x].style.display = 'none';
      } else {
        teszt[x].style.display = 'block';
        teszt[x-1].getElementsByTagName('img')[0].className = 'dropdown flipped';
      }
    }
  
    let listElement = document.getElementById('myList');
    let teszt = $scope.getChildren(document.getElementById('legutobbi'));
  
    if (window.getComputedStyle(listElement).display === 'none') {
      listElement.style.display = 'none';
    } else {
      listElement.style.display = 'block';
    }
  
  for (let index = 0; index < teszt.length; index++) {
      if (index % 2 == 1) {
          teszt[index].setAttribute("onClick", `megnyit(${index + 1})`)
      }
  }
  })

  app.controller('posta', function($scope, ngNotify, $rootScope, $location){
    if (sessionStorage.getItem('loggedUser') == null) {
      $location.path('/main')
      ngNotify.set("Ehhez előbb be kell jelentkezned!", 'error')
    }
  })

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

app.controller('forum-renderer', function($scope, ngNotify, $rootScope, $location){
  $scope.category = function(id){
    axios.get(`${$rootScope.serverUrl}/posts/category_id/eq/${id}`).then(res=>{
      $rootScope.posts = res.data;
      res.data.forEach(item => {
          axios.get(`${$rootScope.serverUrl}/users/ID/eq/${item.user_id}`).then(res=>{
              item.user_name = res.data[0].name
              $rootScope.$apply();
          })
      });
  })
    $location.path('/post')
  }
})

app.controller('posts', function($scope, $rootScope){
  $scope.postRender = function(id){
    console.log(id)
  }

  $scope.newPost = function(){
    $scope.newpost = {}
    console.log("ASD")
  }
})