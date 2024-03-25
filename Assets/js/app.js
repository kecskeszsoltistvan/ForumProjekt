var app = angular.module("forumApp", ["ngRoute", "ui.bootstrap", "ngNotify"])

app.run(function($rootScope){
    $rootScope.title = "Fórum"
  
    $rootScope.serverUrl = "http://localhost:3000"
   
})

app.config(function($routeProvider){
    $routeProvider

    .when("/",{
        templateUrl: "Views/main.html"
    })
    .when("/rolunk", {
        templateUrl: "Views/rolunk.html",
    })
    .when("/gyak", {
        templateUrl: "Views/GYAK.html",
    })
    .when("/legutobbi", {
        templateUrl: "Views/legutobbi.html",
        controller: "../"
    })
    .when("/szabalyzat", {
        templateUrl: "Views/szabalyzat.html",
    })
    .when("/main", {
        templateUrl: "Views/main.html",
    })
    .when("/postalada", {
        templateUrl: "Views/postalada.html",
    })
    .otherwise(
        {redirecTo: "/main"}
    )
})
/*
var listElement = document.getElementById('myList');
let teszt = getChildren(document.getElementById('legutobbi'));

if (window.getComputedStyle(listElement).display === 'none') {
  listElement.style.display = 'none';
} else {
  listElement.style.display = 'block';
}

for (let index = 0; index < teszt.length; index++) {
    if (index % 2 == 1) {
        teszt[index].setAttribute("onClick", `test(${index + 1})`)
    }
}

function getChildren(n, skipMe){
    var r = [];
    for ( ; n; n = n.nextSibling ) 
       if ( n.nodeType == 1 && n != skipMe)
          r.push( n );        
    return r;
};

function getSiblings(n) {
    return getChildren(n.parentNode.firstChild, n);
    
}

function test(x){
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





*/
app.controller("regUserCtrl",  function($scope, ngNotify, $rootScope){
    $scope.user = {}

    $scope.registration = function(){
        if($scope.user.username == null || $scope.user.email == null || $scope.user.password == null || $scope.user.confirm == null){
            ngNotify.set("Nem adtál meg minden adatot!", "error");
        }else{
            if($scope.user.password != $scope.user.confirm){
                ngNotify.set("Nem egyeznek meg a jelszavak!", "error")
            }else{
                let data = {
                    name: $scope.user.username,
                    email: $scope.user.email,
                    password: CryptoJS.SHA1($scope.user.password).toString()
                }
                console.log(data)
                axios.post($rootScope.serverUrl + `/users/`, data).then(res => {
                    ngNotify.set("Sikeres regisztráció!", "success")
                })
                
            }
        }
    }
})

app.controller("loginUserCtrl",  function($scope, ngNotify, $rootScope){
    $scope.user = {}

    $scope.login = function(){
        if($scope.user.email == null || $scope.user.password == null){
            ngNotify.set("Nem adtál meg minden adatot!", "error");
        }else{
            axios.get(`${$rootScope.serverUrl}/login/${$scope.user.email}`).then(res => {
                console.log(res.data)
                if(res.data.length != 0){
                    console.log("Van ilyen felhasználó!")
                    console.log(`${res.data[0].password}\n${CryptoJS.SHA1($scope.user.password).toString()}`)
                    if (res.data[0].password == CryptoJS.SHA1($scope.user.password).toString()) {
                        ngNotify.set(`Bejelentkezve, mint ${res.data[0].name}`, "success");
                        if(document.querySelector("#marad-e").checked) {
                            localStorage.setItem = {loggedUser : res.data[0]};
                        }
                        else{
                            sessionStorage.setItem = {loggedUser : res.data[0]};
                        }
                    }
                    else {
                        ngNotify.set(`Helytelen jelszó!`, "error");
                    }
                }
                else{
                    ngNotify.set(`Ez az e-mail nincs regisztrálva!`, "error");
                }
            })
        }
    }
})

/*
document.getElementById("rolunkBTN").onclick = function () {
    location.href = "Views/rolunk.html";
};
*/