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

$rootScope.user = ""

$rootScope.registration = function(){
    console.log("$rootScope.user.username")
}