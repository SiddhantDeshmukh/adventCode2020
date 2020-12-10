const fs = require('fs');
class DirectedGraph {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.adjacencyList = new Map();
    }
    addVertex(v) {
        this.adjacencyList.set(v.colour, []);
    }
    addEdge(v, w) {
        this.adjacencyList.get(v.colour).push(w);
    }
    printGraph() {
        let keys = this.adjacencyList.keys();
        for (let key of keys) {
            let values = this.adjacencyList.get(key);
            let adjacencyList = "";
            for (let value of values) {
                adjacencyList += `${value}\t`;
            }
            console.log(`Vertex ${key} -> ` + adjacencyList);
        }
        console.log(`Adjacency list map size: ${this.adjacencyList.size}.`);
        console.log(`Adjacency list keys length: ${[...this.adjacencyList.keys()].length}.`);
    }
}
function searchForColour(graph, vertex, searchColour, verbose) {
    let stack = [vertex];
    let visited = [vertex];
    while (stack.length > 0) {
        const current = stack.pop();
        if (current === searchColour) {
            if (verbose) {
                console.log(`Found ${searchColour} when starting from ${vertex}.`);
            }
            return visited;
        }
        let neighbours = graph.adjacencyList.get(current);
        neighbours.forEach((neighbour) => {
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
function tallyBags(graph, vertex) {
    let tally = 0;
    let childBags = graph.adjacencyList.get(vertex.colour);
    childBags.forEach((childBag) => {
        if (childBag.colour != 'no other') {
            tally += childBag.amount;
            const tempParentAmount = childBag.amount;
            let subTally = tallyBags(graph, childBag);
            if (subTally > 0) {
                subTally *= tempParentAmount;
                tally += subTally;
            }
        }
    });
    return tally;
}
const rulesFile = './day7.txt';
function splitRuleIntoBags(rule) {
    let ruleBags = [];
    let colour, childBagString;
    [colour, childBagString] = rule.split('bags contain ');
    colour = colour.trim();
    let amount = 1;
    let parentBag = { amount, colour };
    ruleBags.push(parentBag);
    let childBags = childBagString.replace(/bags/g, '').replace(/bag/g, '').split(/,|\./);
    childBags = childBags.slice(0, childBags.length - 1);
    childBags.forEach((containedBag) => {
        let amount = parseInt(containedBag);
        let colour = containedBag.replace(/\d/, '').trim();
        let bag = { amount, colour };
        ruleBags.push(bag);
    });
    return ruleBags;
}
function getUniqueColours(rulesList) {
    let uniqueColours = [];
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
let rulesList = fs.readFileSync(rulesFile, 'utf-8').split('\n');
let uniqueColours = getUniqueColours(rulesList);
let numUniqueBags = uniqueColours.length;
let graph = new DirectedGraph(numUniqueBags);
rulesList.forEach((rule) => {
    let bags = splitRuleIntoBags(rule);
    graph.addVertex(bags[0]);
    let edges = bags.slice(1);
    edges.forEach(edge => {
        for (let i = 0; i < 1; i++) {
            graph.addEdge(bags[0], edge);
        }
    });
});
let searchColour = "shiny gold";
console.log("Depth first");
let numFound = 0;
uniqueColours.forEach((colour) => {
    if (colour != searchColour) {
        let verbose = false;
        let nodes = searchForColour(graph, colour, searchColour, verbose);
        if (nodes.length > 0) {
            numFound++;
        }
    }
});
console.log(`${numFound} ${searchColour} bags found.`);
let amount = 1, colour = "shiny gold";
let parentBag = { amount, colour };
let tally = tallyBags(graph, parentBag);
console.log(`Starting from ${parentBag.colour}, there are ${tally} bags.`);
//# sourceMappingURL=day7.js.map