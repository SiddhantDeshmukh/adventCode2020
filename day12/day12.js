const fs = require('fs');
const nj = require('numjs');
function makeShip(facing, positionX, positionY) {
    let ship = { facing, positionX, positionY };
    return ship;
}
function readInstructions(filepath) {
    let data;
    try {
        data = fs.readFileSync(filepath, 'utf-8').split('\n');
    }
    catch (error) {
        console.log(error);
    }
    return data;
}
function manahattanDistance(ship) {
    let distance = Math.abs(ship.positionX) + Math.abs(ship.positionY);
    return distance;
}
function rotateShip(ship, degrees) {
    const directions = ["N", "E", "S", "W"];
    let amount = degrees / 90;
    let facingIdx = directions.indexOf(ship.facing) + amount;
    if (facingIdx < 0) {
        facingIdx += directions.length;
    }
    if (facingIdx >= directions.length) {
        facingIdx -= directions.length;
    }
    ship.facing = directions[facingIdx];
    return ship;
}
function rotateWaypoint(waypoint, degrees) {
    if (degrees < 0) {
        degrees += 360;
    }
    if (degrees == 90) {
        [waypoint.positionX, waypoint.positionY] = [waypoint.positionY, -waypoint.positionX];
    }
    else if (degrees == 180) {
        [waypoint.positionX, waypoint.positionY] = [-waypoint.positionX, -waypoint.positionY];
    }
    else if (degrees == 270) {
        [waypoint.positionX, waypoint.positionY] = [-waypoint.positionY, waypoint.positionX];
    }
    return waypoint;
}
function moveShip(ship, distance, direction) {
    if (direction == 'E') {
        ship.positionX += distance;
    }
    else if (direction == 'W') {
        ship.positionX -= distance;
    }
    else if (direction == 'N') {
        ship.positionY += distance;
    }
    else if (direction == 'S') {
        ship.positionY -= distance;
    }
    else {
        console.log(`Warning: "${direction}" is not valid. Valid options are "E", "W", "N" or "S".`);
    }
    return ship;
}
function moveWaypoint(waypoint, distance, direction) {
    if (direction == 'E') {
        waypoint.positionX += distance;
    }
    else if (direction == 'W') {
        waypoint.positionX -= distance;
    }
    else if (direction == 'N') {
        waypoint.positionY += distance;
    }
    else if (direction == 'S') {
        waypoint.positionY -= distance;
    }
    else {
        console.log(`Warning: "${direction}" is not valid. Valid options are "E", "W", "N" or "S".`);
    }
    return waypoint;
}
function moveShipTowardsWaypoint(ship, waypoint, value) {
    ship.positionX += value * waypoint.positionX;
    ship.positionY += value * waypoint.positionY;
    return ship;
}
function executeInstruction(line, ship) {
    let pattern = /(\d+\.|\d+)+/g;
    let splitLine = line.split(pattern);
    let character = splitLine[0], value = parseInt(splitLine[1]);
    switch (character) {
        case 'R':
            ship = rotateShip(ship, value);
            break;
        case 'L':
            ship = rotateShip(ship, -value);
            break;
        case 'F':
            ship = moveShip(ship, value, ship.facing);
            break;
        default:
            ship = moveShip(ship, value, character);
    }
    return ship;
}
function executeWaypointInstructions(line, ship, waypoint) {
    let pattern = /(\d+\.|\d+)+/g;
    let splitLine = line.split(pattern);
    let character = splitLine[0], value = parseInt(splitLine[1]);
    switch (character) {
        case 'R':
            waypoint = rotateWaypoint(waypoint, value);
            break;
        case 'L':
            waypoint = rotateWaypoint(waypoint, -value);
            break;
        case 'F':
            ship = moveShipTowardsWaypoint(ship, waypoint, value);
            break;
        default:
            waypoint = moveWaypoint(waypoint, value, character);
    }
    return ship;
}
let instructionsFile = './day12.txt';
let ship = makeShip('E', 0, 0);
let positionX = 10;
let positionY = 1;
let waypoint = { positionX, positionY };
let instructions = readInstructions(instructionsFile);
instructions.forEach(((instruction) => {
    ship = executeInstruction(instruction, ship);
}));
console.log(`P1: Manhattan distance is ${manahattanDistance(ship)}`);
ship = makeShip('E', 0, 0);
instructions.forEach(((instruction) => {
    ship = executeWaypointInstructions(instruction, ship, waypoint);
}));
console.log(`P2: Manhattan distance is ${manahattanDistance(ship)}`);
//# sourceMappingURL=day12.js.map