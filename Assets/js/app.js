var app = angular.module("forumApp", ["ngRoute", "ui.bootstrap"])

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

app.controller("regUserCtrl", ["$scope", function($scope){
    $scope.user = {}

    $scope.registration = function(){
        if($scope.user.username == null || $scope.user.email == null || $scope.user.password == null || $scope.user.confirm == null){
            alert("Nem adtál meg minden adatot!")
        }else{
            if($scope.user.password != $scope.user.confirm){
                alert("Nem egyeznek meg a jelszavak!")
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
}])