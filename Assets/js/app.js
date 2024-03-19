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
        controller: "../"
    })
    
    .otherwise(
        {redirecTo: "/login"}
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
  let s = teszt[x-1];
  let y = s.getElementsByTagName('img');
  for (let index = 0; index < teszt.length; index++) {
    if (index % 2 == 0) {
      teszt[index].style.display = 'none';
    }
    else {
      teszt[index].getElementsByTagName('img')[0].className = 'dropdown';
    }
  }


  if (teszt[x].style.display === 'block' && y[0].className == 'dropdown flipped'){
    teszt[x].style.display = 'none';
    y[0].className = 'dropdown';
  } else {
    teszt[x].style.display = 'block';
    y[0].className = 'dropdown flipped';
  }
}
*/




