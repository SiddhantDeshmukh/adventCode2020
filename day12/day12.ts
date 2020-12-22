const fs = require('fs');
const nj = require('numjs');

// Read in a set of instructions of the form 'CXX' where C is a character
// and X is a digit. Move the ship appropriately and calculate the
// Manahattan distance from its origin
/*
  IDs: - F = forward; number is units to move
       - N, E, S, W = north, east, south, west; number is units to move
       - R, L = turn right, left; number is degrees
*/

type Ship = { facing: string, positionX: number, positionY: number }
type Waypoint = { positionX: number, positionY: number }

// Define: N, E > 0; S, W < 0

function makeShip(facing: string, positionX: number, positionY: number) {
  let ship: Ship = { facing, positionX, positionY };

  return ship;
}

function readInstructions(filepath: string) {
  let data: Array <string>;
  try {
    data = fs.readFileSync(filepath, 'utf-8').split('\n');
  } catch (error) {
    console.log(error);
  }

  return data;
}

function manahattanDistance(ship: Ship) {
  let distance: number = Math.abs(ship.positionX) + Math.abs(ship.positionY);

  return distance;
}

function rotateShip(ship: Ship, degrees: number) {
  const directions: Array <string> = ["N", "E", "S", "W"];
  let amount: number = degrees / 90;

  let facingIdx: number = directions.indexOf(ship.facing) + amount;

  // 'periodic' boundary conditions to map compass directions back around
  if (facingIdx < 0) {
    facingIdx += directions.length;
  }

  if (facingIdx >= directions.length) {
    facingIdx -= directions.length;
  }

  ship.facing = directions[facingIdx];

  return ship;
}

// Why not just do this with linear algebra and matrix transformations?
function rotateWaypoint(waypoint: Waypoint, degrees: number) {
  // Cast negative (turn left) to positive (turn right)
  if (degrees < 0) {
    degrees += 360;
  }

  // Rotate waypoint about ship
  if (degrees == 90) {
    [waypoint.positionX, waypoint.positionY] = [waypoint.positionY, -waypoint.positionX];
  } else if (degrees == 180) {
    [waypoint.positionX, waypoint.positionY] = [-waypoint.positionX, -waypoint.positionY];
  } else if (degrees == 270) {
    [waypoint.positionX, waypoint.positionY] = [-waypoint.positionY, waypoint.positionX];
  }

  return waypoint;
}

function moveShip(ship: Ship, distance: number, direction: string) {
  // 'axis' is either 'x' or 'y'
  if (direction == 'E') {
    ship.positionX += distance;
  } else if (direction == 'W') {
    ship.positionX -= distance;
  } else if (direction == 'N') {
    ship.positionY += distance;
  } else if (direction == 'S') {
    ship.positionY -= distance;
  } else {
      console.log(`Warning: "${direction}" is not valid. Valid options are "E", "W", "N" or "S".`);
  }

  return ship;
}

function moveWaypoint(waypoint: Waypoint, distance: number, direction: string) {
  // 'axis' is either 'x' or 'y'
  if (direction == 'E') {
    waypoint.positionX += distance;
  } else if (direction == 'W') {
    waypoint.positionX -= distance;
  } else if (direction == 'N') {
    waypoint.positionY += distance;
  } else if (direction == 'S') {
    waypoint.positionY -= distance;
  } else {
      console.log(`Warning: "${direction}" is not valid. Valid options are "E", "W", "N" or "S".`);
  }

  return waypoint;
}

function moveShipTowardsWaypoint(ship: Ship, waypoint: Waypoint, value: number) {
  // Move ship towards waypoint 'value' times
  ship.positionX += value * waypoint.positionX;
  ship.positionY += value * waypoint.positionY;

  return ship;
}

function executeInstruction(line: string, ship: Ship) {
  // Parse instruction
  let pattern: RegExp = /(\d+\.|\d+)+/g;
  let splitLine: Array <string> = line.split(pattern);
  let character: string = splitLine[0], value: number = parseInt(splitLine[1]);

  // Update ship position and facing
  // Check for rotation
  switch (character) {
    case 'R':
      // Rotate right
      ship = rotateShip(ship, value);
      break;
    
    case 'L':
      // Rotate left
      ship = rotateShip(ship, -value);
      break;

    case 'F':
      // Move forward
      ship = moveShip(ship, value, ship.facing);
      break;
    
    default:
      // One of 'N', 'S', 'E', 'W'
      ship = moveShip(ship, value, character);
  }

  return ship;
}

function executeWaypointInstructions(line: string, ship: Ship, waypoint: Waypoint) {
  // Parse instruction
  let pattern: RegExp = /(\d+\.|\d+)+/g;
  let splitLine: Array <string> = line.split(pattern);
  let character: string = splitLine[0], value: number = parseInt(splitLine[1]);

  // Check for rotation
  switch (character) {
    case 'R':
      // Rotate waypoint right
      waypoint = rotateWaypoint(waypoint, value);
      break;
    
    case 'L':
      // Rotate waypoint left
      waypoint = rotateWaypoint(waypoint, -value);
      break;

    case 'F':
      // Move forward
      ship = moveShipTowardsWaypoint(ship, waypoint, value);
      break;
    
    default:
      // One of 'N', 'S', 'E', 'W'
      waypoint = moveWaypoint(waypoint, value, character);
  }

  return ship;
}

let instructionsFile: string = './day12.txt';

// Initial conditions
// Ship
let ship: Ship = makeShip('E', 0, 0);

// Waypoint
let positionX = 10;
let positionY = 1;

let waypoint: Waypoint = { positionX, positionY }; 

let instructions: Array <string> = readInstructions(instructionsFile);

// puzzle 1: manhattan distance with moving ship
instructions.forEach(((instruction: string) => {
  ship = executeInstruction(instruction, ship);
}));

console.log(`P1: Manhattan distance is ${manahattanDistance(ship)}`);

// Reset ship
ship = makeShip('E', 0, 0);

// puzzle 2: manhattan distance with moving waypoint
instructions.forEach(((instruction: string) => {
  ship = executeWaypointInstructions(instruction, ship, waypoint);
}));

console.log(`P2: Manhattan distance is ${manahattanDistance(ship)}`);
