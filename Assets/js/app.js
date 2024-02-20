var app = angular.module("forumApp", ["ngRoute", "ui.bootstrap"])

app.run(function($rootScope){
    $rootScope.title = "Fórum"


})

app.config(function($routeProvider){
    $routeProvider
    .when("/login", {
        templateUrl: "Views/login.html",
    })
    .when("/reg", {
        templateUrl: "Views/registration.html",
    })
    .otherwise(
        {redirecTo: "/login"}
    )
})