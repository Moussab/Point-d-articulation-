

     var time = 0;

     function APUtil( u , visited , disc ,low , parent , ap)
     {

         // Count of children in DFS Tree
         var children = 0;

         // Mark the current node as visited
         visited[u] = true;

         // Initialize discovery time and low value
         disc[u] = low[u] = ++time;

         for (var v = u+1; v <= $matrixValue.length; v++) {

           if ($matrixValue[u][v]==1){

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
         }
     }
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
         var disc = [V];
         var low = [V] ;
         var  parent = [V];
         var  ap = createTable(V) ; // To store articulation points

         // Initialize parent and visited, and ap(articulation point)
         // arrays
         for (var i = 0; i < V; i++)
         {
             parent[i] = -1;
             visited[i] = false;
             ap[i] = false;
         }

         // Call the recursive helper function to find articulation
         // points in DFS tree rooted with vertex 'i'
         for (var i = 0; i < V; i++)
             if (visited[i] == false)
                 APUtil(i, visited, disc, low, parent, ap);

         // Now ap[] contains articulation points, print them
         for (var i = 0; i < V; i++)
             if (ap[i] == true){
               cy.$('#noued'+i).addClass('articulatPoints') ;
                   console.log(i+' ');
             }

     }
