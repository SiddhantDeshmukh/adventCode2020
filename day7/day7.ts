const fs = require('fs');

// Custom type for Bag
type Bag = { amount: number, colour: string }

class DirectedGraph {
  numVertices: number;
  adjacencyList: Map<Bag, Array<Bag> >;

  constructor (numVertices: number) {
    // Each Graph has a number of vertices and an adjacencyList for
    // traversal
    this.numVertices = numVertices;
    this.adjacencyList = new Map();
  }

  addVertex(v: Bag) {
    // Add a vertex, initialising the adjacent list with an empty array
    this.adjacencyList.set(v, []);
  }

  addEdge(v: Bag, w: Bag) {
    // Get adjacent list for vertex 'v' and add the vertex 'w' to denote
    // an edge v -> w (assumes directed graph)
    this.adjacencyList.get(v).push(w);
  }

  printGraph() {
    // Get all vertices
    let keys = this.adjacencyList.keys();
    for (let key of keys) {
      let values = this.adjacencyList.get(key);
      let adjacencyList = ""

      for (let value of values) {
        adjacencyList += `${value.amount} ${value.colour}, `;
      }

      // Print vertex and adjacency list
      console.log(`Vertex ${key.colour} -> ` + adjacencyList);
    }
  }
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
  colour = colour.split(' ').join('')

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
    let colour: string = containedBag.replace(/\d/, '').split(' ').join('');
    
    let bag: Bag = {amount, colour};
    ruleBags.push(bag);
  });

  return ruleBags;
}

function countUniqueBags(rulesList: Array<string>) {
  // Check the number of unique colours in the input data
  let uniqueColours: Array<string> = []
  rulesList.forEach(rule => {
    let colour = rule.split('bags contain')[0].split(' ').slice(0, 3).join('');

    if (!uniqueColours.includes(colour)) {
      uniqueColours.push(colour);
    }
  });
  let numUniqueBags = uniqueColours.length;
  console.log(`Out of ${rulesList.length} rules, there are ${numUniqueBags} unique colours.`);

  return numUniqueBags;
}

// Read in data and parse each rule (line)
let rulesList = fs.readFileSync(rulesFile, 'utf-8').split('\n');

let numUniqueBags = countUniqueBags(rulesList);

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
    graph.addEdge(bags[0], edge);
  });
});

// Warning: BIG print
graph.printGraph();
