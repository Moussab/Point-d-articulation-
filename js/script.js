
var $matrixValue = [];

var $matrixLength;

var $adjacent = [];


var V;

 function adjacent(size) {
         var matrice =[];
               for (var i = 0; i <size; i++) {
                   matrice[i] =[];

               }
               return matrice;
       }


 function matrice(size) {
         var matrice =[];
               for (var i = 0; i <size; i++) {
                   matrice[i] =[];
                  
                   for (var j = 0; j < size;j++) {
                       matrice[i][j]=0;
                   }
               }
               return matrice;
       }


var updateGraphMatrix = function () {

    var Length = $('#node-number-input').val();

      $matrixLength = V = parseInt(Length);

      $matrixValue = matrice($matrixLength);

      $adjacent = adjacent($matrixLength);


    var tableHeader = $('#table-header');tableHeader.empty();

    var tableBody = $('#table-body');tableBody.empty();

    var trTableHeaderNumber = tableHeader.children().length;
    //Create a Matrix of matrixLength

    var trHeader = '<th></th>';

    var trBody;

    var thToAdd = $matrixLength-trTableHeaderNumber;

    for(var i=1 ; i <= $matrixLength ; i++ ){

        trHeader += '<th>'+(trTableHeaderNumber+i)+'</th>';

        trBody += '<tr><th>'+(trTableHeaderNumber+i)+'</th>';

        for(var j=1;j<=$matrixLength;j++){

            trBody += '<td>'  + "<input id=\""+(i).toString()+(j).toString()+"\" type=\"checkbox\" onclick=\"updateCell()\" class=\"form-control\"";

            if(i==j) trBody += 'disabled';

            trBody += '/>'+
                      '</td>' ;
        }
        trBody += '</tr>' ;
    }
    tableHeader.append(trHeader);
    tableBody.append(trBody);
}



var updateCell = function(){

    var ii;

    var ji,t;

    var x = document.activeElement.getAttribute('id').charAt(0);

    var y = document.activeElement.getAttribute('id').charAt(1);

    if($('#'+x+y).prop('checked')){

        $('#'+y+x).prop('checked',true);

        //Create a boolean matrix

        $matrixValue[parseInt(x)-1][parseInt(y)-1] = 1;

        $adjacent[parseInt(x)-1].push(parseInt(y)-1);

        $matrixValue[parseInt(y)-1][parseInt(x)-1] = 1;

        $adjacent[parseInt(y)-1].push(parseInt(x)-1);

    }
    else{
        $('#'+y+x).prop('checked',false);

        //Create a boolean matrix

        $matrixValue[parseInt(x)-1][parseInt(y)-1] = 0;

        $matrixValue[parseInt(y)-1][parseInt(x)-1] = 0;
    }

  console.log($matrixValue);

}

function drawGraph1(){

for(var i = 0; i <= $matrixLength-1; i++){
var eles = cy.add([
  { group: 'nodes', data: { id: 'noued'+i }},

]);
//cy.$('#noued'+i).addClass('articulatPoints') ;
}
      for(var i = 0; i < $matrixLength; i++){

      for(var j = i+1; j < $matrixLength; j++){
          if($matrixValue[i][j]==1)
          {
            var eles = cy.add([
            { group: 'edges', data: { id: 'arc'+i+''+j, source: 'noued'+i, target: 'noued'+j } }
            ]);
          }

        }

   }
   var layout = cy.makeLayout({
  name: 'random'
});

layout.run();


}

var time = 0;

function APUtil( u , visited , disc ,low , parent , ap)
{

    // Count of children in DFS Tree
    var children = 0;

    // Mark the current node as visited
    visited[u] = true;

    // Initialize discovery time and low value
    disc[u] = low[u] = ++time;

    arr=$adjacent[u];

      	arr.forEach(function(v){
        
        // If v is not visited yet, then make it a child of u
        // in DFS tree and recur for it
        if (!visited[v])
        {
            children++;

            parent[v] = u;

            APUtil(v, visited, disc, low, parent, ap);

            // Check if the subtree rooted with v has a connection to
            // one of the ancestors of u

            low[u]  = Math.min(low[u], low[v]);

            // u is an articulation point in following cases

            // (1) u is root of DFS tree and has two or more chilren.

            if (parent[u] == -1 && children > 1)
                ap[u] = true;

            // (2) If u is not root and low value of one of its child
            // is more than discovery value of u.

            if (parent[u] != -1 && low[v] >= disc[u])
                ap[u] = true;
        }

        // Update low value of u for parent function calls.
        else if (v != parent[u])
            low[u]  = Math.min(low[u], disc[v]);
      	});

}

function createTable(size){
 var arr=[];
 for (var i = 0; i < size; i++) {
   arr[i]=false;
 }
 return arr;
}
// The function to do DFS traversal. It uses recursive function APUtil()
function AP()
{

    // Mark all the vertices as not visited
    var visited = createTable(V);
    
    console.log(visited);
    
    var disc = [V];
    
    console.log(disc);
    
    var low = [V] ;
    
    console.log(low);
    
    var  parent = [V];
    
    console.log(parent);

    var  ap = createTable(V) ; // To store articulation points

    // Initialize parent and visited, and ap(articulation point)
    // arrays
    for (var i = 0; i < V; i++)
    {
        parent[i] = -1;
        visited[i] = false;
        ap[i] = false;
    }
    console.log('after boucle..');
console.log(parent);
console.log(ap);

    // Call the recursive helper function to find articulation
    // points in DFS tree rooted with vertex 'i'
    for (var i = 0; i < V; i++)
        if (visited[i] == false)
        {
            APUtil(i, visited, disc, low, parent, ap);
            console.log('after'+i+'iteration');
            console.log(visited);
            console.log(disc);
            console.log(low);
            console.log(parent);
            console.log(ap);
        }

    // Now ap[] contains articulation points, print them
    for (var i = 0; i < V; i++)
        if (ap[i] == true){
          cy.$('#noued'+i).addClass('articulatPoints') ;
              console.log(i+' ');
        }
         visited.length = 0;
         disc.length=0;
         low.length=0 ;
          parent.length=0;
       ap.length=0;

}
