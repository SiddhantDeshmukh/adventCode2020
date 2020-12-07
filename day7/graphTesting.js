class Graph {
  constructor (numVertices) {
    // Each Graph has a number of vertices and an adjacencyList for
    // traversal
    this.numVertices = numVertices;
    this.adjacencyList = new Map();
  }

  addVertex(v) {
    // Add a vertex, initialising the adjacent list with an empty array
    this.adjacencyList.set(v, []);
  }

  addEdge(v, w) {
    // Get adjacent list for vertex 'v' and add the vertex 'w' to denote
    // an edge v <-> w (assumes undirected graph)
    this.adjacencyList.get(v).push(w);
    this.adjacencyList.get(w).push(v);
  }

  printGraph() {
    // Get all vertices
    let keys = this.adjacencyList.keys();
    for (let key of keys) {
      let values = this.adjacencyList.get(key);
      let adjacencyList = ""

      for (let value of values) {
        adjacencyList += `${value} `;
      }

      // Print vertex and adjacency list
      console.log(`Vertex ${key} -> ` + adjacencyList);
    }
  }
}


// Using the above implemented graph class
var g = new Graph(6);
var vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];
 
// adding vertices
for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
}
 
// adding edges
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A', 'E');
g.addEdge('B', 'C');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('E', 'C');
g.addEdge('C', 'F');
 
// prints all vertex and
// its adjacency list
// A -> B D E
// B -> A C
// C -> B E F
// D -> A E
// E -> A D F C
// F -> E C
g.printGraph();