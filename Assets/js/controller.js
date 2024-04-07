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

app.controller('forum-renderer', function($rootScope, $location){
  $rootScope.category = function(id){
    $rootScope.act_cat_id = id
    localStorage.setItem('act_cat_id', $rootScope.act_cat_id)
    $location.path('/post')
  }

  
})

// Posts
app.controller('posts', function($scope, $rootScope, ngNotify, $location){

  axios.get(`${$rootScope.serverUrl}/categories/ID/eq/${$rootScope.act_cat_id}`).then(res=>{
    localStorage.setItem('currentCategory', JSON.stringify(res.data[0]));
    $rootScope.currentCategory = JSON.parse(localStorage.getItem('currentCategory'));
  })

  axios.get(`${$rootScope.serverUrl}/posts/category_id/eq/${$rootScope.act_cat_id}`).then(res=>{
    $rootScope.posts = res.data;
    res.data.forEach(item => {
      axios.get(`${$rootScope.serverUrl}/users/ID/eq/${item.user_id}`).then(res=>{
        item.user_name = res.data[0].name
        $rootScope.$apply();
      })

      axios.get(`${$rootScope.serverUrl}/comments/post_id/eq/${item.ID}`).then(res=>{
        item.comments = res.data.length
      })

    });    
  })
  $scope.go_post = function(post_id){
    $rootScope.act_post_id = post_id
    localStorage.setItem('act_post_id', $rootScope.act_post_id)
    $location.path('/comment')
  }

  
  $scope.patchpost = {}
  $scope.patch_id = 0
  $scope.access = false

  $scope.post_id = function(id, title, text){
    $scope.patch_id = id
    $scope.patchpost.title = title
    $scope.patchpost.text = text

    axios.get(`${$rootScope.serverUrl}/posts/ID/eq/${id}`).then(res=>{
      console.log(res.data)
      if($rootScope.currentUser.ID == res.data[0].user_id){
        $scope.access = true
        ngNotify.set(`Nyugodtan szerkesztheted ezt a posztot.`, "alert");
      }else{
        $scope.access = false
        ngNotify.set(`Nem te vagy a létrehozó.`, "error");
      }
    })
  }

  $scope.changePost = function(){
    if($scope.access){
      if($scope.patchpost.text == null || $scope.patchpost.title == null || $scope.patchpost.text == "" || $scope.patchpost.title == ""){
        ngNotify.set(`Nem adtál meg címet vagy tartalmat.`, "error");
      }else{
        if(confirm("Biztosan módosítja ezt a posztot?")){
          axios.patch(`${$rootScope.serverUrl}/posts/${$scope.patch_id}`, $scope.patchpost).then(() => {
            ngNotify.set("Sikeres módosítás!", "success")
          });
          location.reload();
        }
      }
    }else{
      ngNotify.set("Még mindig nincs jogosultságod.", "error")
    }
  }
  
  $scope.deletePost = function(){
    if($scope.access){
      if(confirm("Biztosan törli ezt a posztot?")){
        axios.delete(`${$rootScope.serverUrl}/comments/post_id/${$scope.patch_id}`).then(() => {
          axios.delete(`${$rootScope.serverUrl}/posts/${$scope.patch_id}`).then(() => {
            ngNotify.set("Sikeres törlés!", "success")
            location.reload();
          });
        })
      }
    }else{
      ngNotify.set("Még mindig nincs jogosultságod.", "error")
    }
  }
  
  
  
  $scope.newpost = {}

  $scope.newPost = function(){

    if($rootScope.currentUser != null){
      if($scope.newpost.text == null || $scope.newpost.title == null || $scope.newpost.text == "" || $scope.newpost.title == ""){
        ngNotify.set(`Nem adtál meg címet vagy tartalmat.`, "error");
      }else{
        $scope.newpost.user_id = $rootScope.currentUser.ID
        $scope.newpost.created_at = $rootScope.currentDate

        axios.post(`${$rootScope.serverUrl}/posts/category/${$rootScope.act_cat_id}`, $scope.newpost).then(() => {
          ngNotify.set("Sikeres posztolás!", "success")
        });
        location.reload();
      }
    }else{
      ngNotify.set(`Nem vagy bejelentkezve.`, "error");
    }
  }
})


// Comments
app.controller('comments', function($scope, $rootScope, ngNotify, $location){

  axios.get(`${$rootScope.serverUrl}/posts/ID/eq/${$rootScope.act_post_id}`).then(res=>{
    localStorage.setItem('currentPost', JSON.stringify(res.data[0]));
    $rootScope.currentCategory = JSON.parse(localStorage.getItem('currentPost'));
  })

  axios.get(`${$rootScope.serverUrl}/posts/id/eq/${$rootScope.act_post_id}`).then(res=>{
    $rootScope.posts = res.data;
    res.data.forEach(item => {
        axios.get(`${$rootScope.serverUrl}/users/ID/eq/${item.user_id}`).then(res=>{
            item.user_name = res.data[0].name
            $rootScope.$apply();
        })
    });
  })

  axios.get(`${$rootScope.serverUrl}/comments/post_id/eq/${$rootScope.act_post_id}`).then(res=>{
    $rootScope.comments = res.data;
    res.data.forEach(item => {
        axios.get(`${$rootScope.serverUrl}/users/ID/eq/${item.user_id}`).then(res=>{
            item.user_name = res.data[0].name
            $rootScope.$apply();
        })
    });
  })

  

  $scope.newcomment = {}

  $scope.newComment = function(){
    
    if($rootScope.currentUser != null){
      if($scope.newcomment.text == null ||  $scope.newcomment.text == ""){
        ngNotify.set(`Nem adtál meg tartalmat.`, "error");
      }else{
        $scope.newcomment.user_id = $rootScope.currentUser.ID
        $scope.newcomment.created_at = $rootScope.currentDate
        
        axios.post(`${$rootScope.serverUrl}/comments/post/${$rootScope.act_post_id}`, $scope.newcomment).then(() => {
          ngNotify.set("Sikeres kommentelés!", "success")
        });
        
        axios.get(`${$rootScope.serverUrl}/comments/post_id/eq/${$rootScope.act_post_id}`).then(res=>{
          $rootScope.comments = res.data;
          res.data.forEach(item => {
            axios.get(`${$rootScope.serverUrl}/users/ID/eq/${item.user_id}`).then(res=>{
              item.user_name = res.data[0].name;
              $rootScope.$apply();
            })
          });
        })
        console.log($rootScope.comments)

        location.reload();
      }
    }else{
      ngNotify.set(`Nem vagy bejelentkezve.`, "error");
    }
  }

  $scope.patchcomment = {}
  $scope.patch_id = 0
  $scope.access = false

  $scope.comment_id = function(id, text){
    $scope.patch_id = id
    $scope.patchcomment.text = text


    axios.get(`${$rootScope.serverUrl}/comments/ID/eq/${id}`).then(res=>{

      if($rootScope.currentUser.ID == res.data[0].user_id){
        $scope.access = true
        ngNotify.set(`Nyugodtan szerkesztheted ezt a posztot.`, "alert");
      }else{
        $scope.access = false
        ngNotify.set(`Nem te vagy a létrehozó.`, "error");
      }
    })
  }

  $scope.changeComment = function(){
    if($scope.access){
      if($scope.patchcomment.text == null ||  $scope.patchcomment.text == "" ){
        ngNotify.set(`Nem adtál meg címet vagy tartalmat.`, "error");
      }else{
        if(confirm("Biztosan módosítja ezt a posztot?")){
          axios.patch(`${$rootScope.serverUrl}/comments/${$scope.patch_id}`, $scope.patchcomment).then(() => {
            ngNotify.set("Sikeres módosítás!", "success")
          });
          location.reload();
        }
      }
    }else{
      ngNotify.set("Még mindig nincs jogosultságod.", "error")
    }
  }
  
  $scope.deleteComment = function(){
    if($scope.access){
      if(confirm("Biztosan törli ezt a posztot?")){
        axios.delete(`${$rootScope.serverUrl}/comments/${$scope.patch_id}`).then(() => {
          ngNotify.set("Sikeres törlés!", "success")
        });
        location.reload();
      }
    }else{
      ngNotify.set("Még mindig nincs jogosultságod.", "error")
    }
  }
})