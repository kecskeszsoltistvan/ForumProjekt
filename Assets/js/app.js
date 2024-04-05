var app = angular.module("forumApp", ["ngRoute", "ui.bootstrap", "ngNotify"])

app.run(function($rootScope){
    if(localStorage.getItem("loggedUser") != null){
        sessionStorage.setItem('loggedUser', localStorage.getItem("loggedUser"));
    }
    $rootScope.currentUser= sessionStorage.getItem('loggedUser');
    $rootScope.serverUrl = "http://localhost:3000"
    
    $rootScope.title = "Fórum";

    $rootScope.categories = [];

    axios.get(`${$rootScope.serverUrl}/categories`).then(res=>{
        $rootScope.categories = res.data;
    })

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
        controller: 'legutobbi'
    })
    .when("/szabalyzat", {
        templateUrl: "Views/szabalyzat.html",
    })
    .when("/main", {
        templateUrl: "Views/main.html",
    })
    .when("/postalada", {
        templateUrl: "Views/postalada.html",
        controller: 'posta'
    })
    .when("/profil", {
        templateUrl: "Views/profil.html",
        controller: 'profil'
    })
    .when("/forum", {
        templateUrl: "Views/forum.html",
        controller: 'forum-renderer'
    })
    .otherwise(
        {redirecTo: "/main"}
    )
})

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
                axios.post($rootScope.serverUrl + `/users/`, data).then(res => {
                    ngNotify.set("Sikeres regisztráció!", "success")
                })
                
            }
        }
    }
})

app.controller("loginUserCtrl",  function($scope, ngNotify, $rootScope){
    $scope.user = {}
    localStorage.clear();
    sessionStorage.clear();
    $scope.login = function(){
        if($scope.user.email == null || $scope.user.password == null){
            ngNotify.set("Nem adtál meg minden adatot!", "error");
        }else{
            axios.get(`${$rootScope.serverUrl}/login/${$scope.user.email}`).then(res => {
                console.log(res.data)
                if(res.data.length != 0){
                    if (res.data[0].password == CryptoJS.SHA1($scope.user.password).toString()) {
                        ngNotify.set(`Bejelentkezve, mint ${res.data[0].name}`, "success");
                        if(document.querySelector("#marad-e").checked) {
                            localStorage.setItem('loggedUser', JSON.stringify(res.data[0]));
                            sessionStorage.setItem('loggedUser', JSON.stringify(res.data[0]));
                        }
                        else{
                            sessionStorage.setItem('loggedUser', JSON.stringify(res.data[0]));
                        }
                        $rootScope.currentUser= sessionStorage.getItem('loggedUser');
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

app.user = function(){
    
}