app.controller('legutobbi', function($scope){

  $scope.getChildren = function(n, skipMe){
    var r = [];
    for ( ; n; n = n.nextSibling ) 
       if ( n.nodeType == 1 && n != skipMe)
          r.push( n );        
    return r;
  }

  $scope.getSiblings = function(n) {
    return $scope.getChildren(n.parentNode.firstChild, n);
  }

  megnyit = function(x){
    
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

  let listElement = document.getElementById('myList');
  let teszt = $scope.getChildren(document.getElementById('legutobbi'));

  if (window.getComputedStyle(listElement).display === 'none') {
    listElement.style.display = 'none';
  } else {
    listElement.style.display = 'block';
  }

for (let index = 0; index < teszt.length; index++) {
    if (index % 2 == 1) {
        teszt[index].setAttribute("onClick", `megnyit(${index + 1})`)
    }
}


  
  
})