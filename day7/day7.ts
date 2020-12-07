const fs = require('fs');

// Custom type for Bag
type Bag = { amount: number, colour: string }

// Remake to just use colour as the property
// Amount is the number of vertices to make
class DirectedGraph {
  numVertices: number;
  adjacencyList: Map <string, Array <Bag> >;

  constructor (numVertices: number) {
    // Each Graph has a number of vertices and an adjacencyList for
    // traversal
    this.numVertices = numVertices;
    this.adjacencyList = new Map();
  }

  addVertex(v: Bag) {
    // Add a vertex, initialising the adjacent list with an empty array
    this.adjacencyList.set(v.colour, []);
  }

  addEdge(v: Bag, w: Bag) {
    // Get adjacent list for vertex 'v' and add the vertex 'w' to denote
    // an edge v -> w (assumes directed graph)
    this.adjacencyList.get(v.colour).push(w);
  }

  printGraph() {
    // Get all vertices
    let keys = this.adjacencyList.keys();
    for (let key of keys) {
      let values = this.adjacencyList.get(key);
      let adjacencyList = ""

      for (let value of values) {
        adjacencyList += `${value}\t`;
      }

      // Print vertex and adjacency list
      console.log(`Vertex ${key} -> ` + adjacencyList);
    }

    console.log(`Adjacency list map size: ${this.adjacencyList.size}.`);
    console.log(`Adjacency list keys length: ${[...this.adjacencyList.keys()].length}.`);
  }
}

// Find a path to 'SearchColour' using DFS and return it
function searchForColour(graph: DirectedGraph, vertex: string,
    searchColour: string, verbose: boolean) {
  let stack: Array <string> = [vertex];  // LIFO
  let visited: Array <string> = [vertex];

  while (stack.length > 0) {
    const current: string = stack.pop();

    if (current === searchColour) {
      if (verbose) {
        console.log(`Found ${searchColour} when starting from ${vertex}.`);
      }

      return visited;
    }

    // Add neighbours
    let neighbours: Array <Bag> = graph.adjacencyList.get(current);

    neighbours.forEach((neighbour: Bag) => {
      if (!visited.includes(neighbour.colour) && (neighbour.colour != 'no other')) {
        visited.push(neighbour.colour);
        stack.push(neighbour.colour);
      }
    });
  }

  if (verbose) {
    console.log(`Did not find ${searchColour} when starting from ${vertex}.`);
  }

  return [];
}

// Traverse entire tree and tally up amounts
// Recursive function
function tallyBags(graph: DirectedGraph, vertex: Bag) {
  let tally: number = 0;
  let childBags: Array <Bag> = graph.adjacencyList.get(vertex.colour);

  childBags.forEach((childBag: Bag) => {
    if (childBag.colour != 'no other') {
      tally += childBag.amount;

      // Make this child the temporary parent in order to calculate future
      // amounts accurately
      const tempParentAmount: number = childBag.amount;
      
      // Recursively tally bags under this child node
      let subTally: number = tallyBags(graph, childBag);

      if (subTally > 0) {
        subTally *= tempParentAmount;
        tally += subTally;
      }
    }
  });

  return tally;
}

const rulesFile = './day7.txt'

function splitRuleIntoBags(rule: string) {
  // Create an array of bags from the rule. The first is the host, the
  // remainder are what are inside the host bag (with amounts)
  let ruleBags: Array <Bag> = [];

  // Splits rule using string 'bag contains', yielding the 'host bag' on
  // the left and the 'containedBags' on the right
  let colour: string, childBagString: string;
  [colour, childBagString] = rule.split('bags contain ')


  // Create host bag
  // Strip whitespace
  colour = colour.trim();

  let amount: number = 1;
  let parentBag: Bag = {amount, colour};

  ruleBags.push(parentBag);
  
  // Remove 'bags' string to leave just the amount and the colour
  // Split contained bags by ',' and '.' (which splits the different Bags)
  let childBags = childBagString.replace(/bags/g, '').replace(/bag/g, '').split(/,|\./);

  childBags = childBags.slice(0, childBags.length - 1);

  // Create a Bag object for each 'containedBag'
  childBags.forEach((containedBag: string) => {
    let amount: number = parseInt(containedBag);
    let colour: string = containedBag.replace(/\d/, '').trim();
    
    let bag: Bag = {amount, colour};
    ruleBags.push(bag);
  });

  return ruleBags;
}

function getUniqueColours(rulesList: Array<string>) {
  // Check the number of unique colours in the input data
  let uniqueColours: Array<string> = []
  rulesList.forEach(rule => {
    let colour = rule.split('bags contain')[0].split(' ').slice(0, 3).join(' ').trim();

    if (!uniqueColours.includes(colour)) {
      uniqueColours.push(colour);
    }
  });
  let numUniqueBags = uniqueColours.length;
  console.log(`Out of ${rulesList.length} rules, there are ${numUniqueBags} unique colours.`);

  return uniqueColours;
}

// Read in data and parse each rule (line)
let rulesList = fs.readFileSync(rulesFile, 'utf-8').split('\n');

let uniqueColours = getUniqueColours(rulesList);
let numUniqueBags = uniqueColours.length;

// Create Graph
let graph = new DirectedGraph(numUniqueBags);

// Parse through rules, creating vertex and unidirectional edges for each
rulesList.forEach((rule: string) => {
  let bags = splitRuleIntoBags(rule);

  // Host bag is the vertex
  graph.addVertex(bags[0])
  
  // All contained bags form one-way edges (host -> child)
  let edges = bags.slice(1);

  edges.forEach(edge => {
    for (let i = 0; i < 1; i++) {
      graph.addEdge(bags[0], edge);
    }
  });
});

// Warning: BIG print
// graph.printGraph();

// Puzzle 1: Traverse graph and find all unique 'shiny gold' bags
let searchColour: string = "shiny gold";
console.log("Depth first");

let numFound = 0;

uniqueColours.forEach((colour: string) => {
  if (colour != searchColour) {
    let verbose: boolean = false;
    let nodes: Array <string> = searchForColour(graph, colour, searchColour, verbose);
  
    if (nodes.length > 0) {
      numFound++;
    }
  }
});

console.log(`${numFound} ${searchColour} bags found.`);

// Puzzle 2: Start from a colour and count how many bags are contained
// within that one bag
let amount: number = 1, colour: string = "shiny gold";
let parentBag: Bag = { amount, colour };
let tally: number = tallyBags(graph, parentBag);

console.log(`Starting from ${parentBag.colour}, there are ${tally} bags.`);
