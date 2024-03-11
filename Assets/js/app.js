var app = angular.module("forumApp", ["ngRoute", "ui.bootstrap", "ngNotify"])

app.run(function($rootScope){
    $rootScope.title = "Fórum"
    $rootScope.suerverUrl = "http://localhost:3000"
})

app.config(function($routeProvider){
    $routeProvider
    
    .when("/rolunk", {
        templateUrl: "Views/rolunk.html",
    })
    .when("/gyak", {
        templateUrl: "Views/GYAK.html",
    })
    .when("/legutobbi", {
        templateUrl: "Views/legutobbi.html",
    })
    .when("/szabalyzat", {
        templateUrl: "Views/szabalyzat.html",
    })
    .when("/main", {
        templateUrl: "Views/main.html",
    })
    .otherwise(
        {redirecTo: "/login"}
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
                console.log(data)
                axios.post("http://localhost:3000/users", data).then(res => {
                    alert(res.data[0].msg);
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
            if($scope.user.password != $scope.user.password){
                ngNotify.set("Nem egyeznek meg a jelszavak!", "error")
            }else{
                let data = {
                    email: $scope.user.email,
                    password: CryptoJS.SHA1($scope.user.password).toString()
                }
                
                axios.get($rootScope.serverUrl + `/users/${data.email}`, data).then(res => {
                    //alert(res.data[0].msg);
                    alert(siker)
                })                
            }
        }
    }
})

/*
document.getElementById("rolunkBTN").onclick = function () {
    location.href = "Views/rolunk.html";
};
*/
