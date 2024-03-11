var app = angular.module("forumApp", ["ngRoute"])

app.run(function($rootScope){
    $rootScope.title = "Fórum"


})

/*
document.getElementById("rolunkBTN").onclick = function () {
    location.href = "Views/rolunk.html";
};
*/
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
    .otherwise(
        {redirecTo: "/login"}
    )
})