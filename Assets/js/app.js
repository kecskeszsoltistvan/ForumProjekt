var app = angular.module("forumApp", [])

app.run(function($rootScope){
    $rootScope.title = "Fórum"


})


document.getElementById("rolunkBTN").onclick = function () {
    location.href = "Views/rolunk.html";
};