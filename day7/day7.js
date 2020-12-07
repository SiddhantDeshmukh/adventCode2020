const fs = require('fs');
class DirectedGraph {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.adjacencyList = new Map();
    }
    addVertex(v) {
        this.adjacencyList.set(v, []);
    }
    addEdge(v, w) {
        this.adjacencyList.get(v).push(w);
    }
    printGraph() {
        let keys = this.adjacencyList.keys();
        for (let key of keys) {
            let values = this.adjacencyList.get(key);
            let adjacencyList = "";
            for (let value of values) {
                adjacencyList += `${value.amount} ${value.colour}, `;
            }
            console.log(`Vertex ${key.colour} -> ` + adjacencyList);
        }
    }
}
const rulesFile = './day7.txt';
function splitRuleIntoBags(rule) {
    let ruleBags = [];
    let colour, childBagString;
    [colour, childBagString] = rule.split('bags contain ');
    colour = colour.split(' ').join('');
    let amount = 1;
    let parentBag = { amount, colour };
    ruleBags.push(parentBag);
    let childBags = childBagString.replace(/bags/g, '').replace(/bag/g, '').split(/,|\./);
    childBags = childBags.slice(0, childBags.length - 1);
    childBags.forEach((containedBag) => {
        let amount = parseInt(containedBag);
        let colour = containedBag.replace(/\d/, '').split(' ').join('');
        let bag = { amount, colour };
        ruleBags.push(bag);
    });
    return ruleBags;
}
function countUniqueBags(rulesList) {
    let uniqueColours = [];
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
let rulesList = fs.readFileSync(rulesFile, 'utf-8').split('\n');
let numUniqueBags = countUniqueBags(rulesList);
let graph = new DirectedGraph(numUniqueBags);
rulesList.forEach((rule) => {
    let bags = splitRuleIntoBags(rule);
    graph.addVertex(bags[0]);
    let edges = bags.slice(1);
    edges.forEach(edge => {
        graph.addEdge(bags[0], edge);
    });
});
graph.printGraph();
//# sourceMappingURL=day7.js.map