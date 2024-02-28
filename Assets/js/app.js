var app = angular.module("forumApp", ["ngRoute", "ui.bootstrap", "ngNotify"])

app.run(function($rootScope){
    $rootScope.title = "Fórum"


})

app.config(function($routeProvider){
    $routeProvider
    /*
    .when("/login", {
        templateUrl: "Views/login.html",
    })
    */
    .otherwise(
        {redirecTo: "/login"}
    )
})

app.controller("regUserCtrl",  function($scope,ngNotify){
    $scope.user = {}

    $scope.registration = function(){
        if($scope.user.username == null || $scope.user.email == null || $scope.user.password == null || $scope.user.confirm == null){
            ngNotify.set("Nem adtál meg minden adatot!", "error");
        }else{
            if($scope.user.password != $scope.user.confirm){
                ngNotify.set("Nem egyeznek meg a jelszavak!", "error")
            }else{
                let data = {
                    table: "users",
                    email: $scope.user.email,
                    name: $scope.user.name,
                    password: CryptoJS.SHA1($scope.user.password).toString()
                }

                /*
                axios.post($rootScope.serverUrl + "/db/registration", data).then(res => {
                    alert(res.data[0].msg);
                })
                */
            }
        }
    }
})

app.controller("loginUserCtrl",  function($scope,ngNotify){
    $scope.user = {}

    $scope.login = function(){
        if($scope.user.email == null || $scope.user.password == null){
            ngNotify.set("Nem adtál meg minden adatot!", "error");
        }else{
            if($scope.user.password != $scope.user.confirm){
                ngNotify.set("Nem egyeznek meg a jelszavak!", "error")
            }else{
                let data = {
                    table: "users",
                    email: $scope.user.email,
                    password: CryptoJS.SHA1($scope.user.password).toString()
                }

                /*
                axios.post($rootScope.serverUrl + "/db/registration", data).then(res => {
                    alert(res.data[0].msg);
                })
                */
            }
        }
    }
})