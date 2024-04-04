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
    let holder = document.getElementById('category-holder')
    console.log("Fórumok oldal");
    axios.get(`${$rootScope.serverUrl}/categories`).then(res => {
      console.log(res.data);
      res.data.forEach(cat => {
        let c_body = document.createElement('div');
        c_body.classList.add('kategoriak');
        let c_header = document.createElement('div');
        c_header.classList.add('header');
        let c_title = document.createElement('h2');
        c_title.classList.add('cim');
        c_title.innerHTML = `${cat.title}`;
        c_header.appendChild(c_title);
        c_body.appendChild(c_header);
        c_body.appendChild(document.createElement('hr'));
        let c_desc = document.createElement('p');
        c_desc.innerHTML = `${cat.body}`;
        c_body.appendChild(c_desc);
        let c_date = document.createElement('p');
        c_date.classList.add('datum')
        c_date.innerHTML = `${cat.created_at.split('T')[0]}`
        c_body.appendChild(c_date);
        holder.appendChild(c_body);
        console.log(`${cat.title}`);
      });
  }) 
})