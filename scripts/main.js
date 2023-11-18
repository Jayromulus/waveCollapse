//* Declaring Variables for the App
const container = document.querySelector('.grid');
const grid = [];
let tracker = 0;
// import neighborList from './neighbors.json';

const tileset = ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'];
//* Figuring out how to Limit the Neighbors of a Given Tile
const neighbors = {
  'empty': {
    north: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    east: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    west: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left']
  },
  'center': {
    north: ['center', 'up-down', 'up-right-down', 'up-down-left', 'right-down', 'right-down-left', 'down-left'],
    east: ['center', 'up-left', 'up-right-left', 'up-down-left', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left'],
    west: ['center', 'up-left', 'up-right-left', 'up-down-left', 'right-left', 'right-down-left', 'down-left']
  },
  'down-left': {
    north: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    east: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    west: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left']
  },
  'right-down-left': {
    north: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    east: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    west: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left']
  },
  'right-down': {
    north: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    east: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    west: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left']
  },
  'right-left': {
    north: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    east: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    west: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left']
  },
  'up-down-left': {
    north: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    east: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    west: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left']
  },
  'up-down': {
    north: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    east: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    west: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left']
  },
  'up-left': {
    north: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    east: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    west: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left']
  },
  'up-right-down': {
    north: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    east: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    west: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left']
  },
  'up-right-left': {
    north: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    east: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    west: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left']
  },
  'up-right': {
    north: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    east: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    south: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left'],
    west: ['center', 'up-right', 'up-down', 'up-left', 'up-right-down', 'up-right-left', 'up-down-left', 'right-down', 'right-left', 'right-down-left', 'down-left']
  }
}
//* Initialize the Board/Map to a given number of tiles
function init(totalTiles, rowLength) {
  // 850 fits near perfect on the macbook screen when safari is fullscreen with tabs, 875 if no tabs
  for (let i = 0; i < totalTiles; i++) {
    const newItem = document.createElement('div');
    // creating an item, "empty" class will represent an unknown tile
    newItem.classList.add('item', 'empty');
    newItem.innerText = findNeighbors(newItem).north.length;
    container.appendChild(newItem);

    // this section exists to allow each row to contain it's own items
    if (!grid[tracker])
      grid[tracker] = []
    grid[tracker].push(newItem);
    tracker++;
    if (tracker > rowLength)
      tracker = 0;
  }
}

//* Standard Function to get Random Number
function random(limit) {
  return Math.floor((Math.random() * limit));
}

//* Generate a new Seed Tile for the cases in which there is no current action
function seedTile() {
  const randomX = random(grid.length);
  const randomY = random(grid[randomX].length);
  return { element: grid[randomX][randomY], x: randomX, y: randomY }
}

//* 
function formatTile(tile) {
  let row, col;
  grid.forEach((r, i) => r.includes(tile) ? row = i : null)
  // console.log('row', row)
  grid[row].forEach((c, i) => c === tile ? col = i : null)
  console.log({ element: tile, x: row, y: col });
  return { element: tile, x: row, y: col };
}

// look for neighbors in a given element might need expanded or removed if it doesnt help legibility
function findNeighbors(element) {
  // console.log(element)
  if(element.classList.length > 0)
    return neighbors[element.classList[1] ? element.classList[1] : 'empty']
}

function limitSwitch(tile, axis, direction) {
  if(axis === 'x') {
    if(direction === 'left') {
      return tile.x - 1 < 0 ? 500 : tile.x - 1;
    } else if(direction === 'right') {
      return tile.x + 1 > grid.length - 1 ? 500 : tile.x + 1;
    }
  } else if (axis === 'y') {
    if(direction === 'up') {
      return tile.y - 1 < 0 ? 500 : tile.y - 1;
    } else if (direction === 'down') {
      return tile.y + 1 > grid[tile.x].length - 1 ? 500 : tile.y + 1;
    }
  }
  return 500;
}

function start(tile) {
  const tileType = tileset[random(tileset.length)];

  // this section will change in order to more efficiently change not only the starter tile but also each generatively created tile
  tile.element.innerText = 0;
  tile.element.classList.add(tileType);
  tile.element.classList.remove('empty');

  //! clump all of this together and make it so that this runs in order of each tile affected, and updated each tile to only contain the allotted items for a given tile. probably instead of having a given tile reference a database maybe each tile should instead inherently contain a list of all allowed tiles and when one is changed near it we just reduce the options until either the last remaining item exists within that updated tile or if there is a standstill then we select randomly one of the tiles with the lowest "evaluation" score and decide randomly what it is that tile should be and then re-evaluate the tiles from there. ideally the "wave" of checks should fizzle out fairly quickly, within one or two tiles, before it has not enough information to update a tile again. this might also only need to affect or check tiles that are adjacent to currently filled tiles if that makes it easier to calculate and reduce load times
  const validNeighbors = findNeighbors(tile.element);

  Object.keys(validNeighbors).forEach(direction => {
    updateValidOptions(direction, tile, validNeighbors);
  })
}

//! why does this need to be in it's own function, cant i just add all of this into the same function instead of needing to loop over the items 4 times and just run and check each direction in a single function call without needing a switch statement since i will realistically be updateing all 4 at the same time most likely (citation needed)
function updateValidOptions(direction, starterTile, validNeighbors) {
  let selectedTile, selectedX, selectedY;
    switch(direction) {
      case 'north':
        selectedY = limitSwitch(starterTile, 'y', 'up');
        if(selectedY === 500)
          break;
        selectedTile = grid[starterTile.x][selectedY]
        selectedTile.innerText = validNeighbors['north'].length;
        updateValidOptions('east', formatTile(selectedTile), findNeighbors(selectedTile))
        break;
      case 'east':
        selectedX = limitSwitch(starterTile, 'x', 'right');
        if(selectedX === 500)
          break;
        selectedTile = grid[selectedX][starterTile.y];
        selectedTile.innerText = validNeighbors['east'].length;
        break;
      case 'south':
        selectedY = limitSwitch(starterTile, 'y', 'down');
        if(selectedY === 500)
          break;
        selectedTile = grid[starterTile.x][selectedY];
        selectedTile.innerText = validNeighbors['south'].length;
        break;
      case 'west':
        selectedX = limitSwitch(starterTile, 'x', 'left');
        if(selectedX === 500)
          break;
        selectedTile = grid[selectedX][starterTile.y];
        selectedTile.innerText = validNeighbors['west'].length;
        break;
    }
}

//* Load the Page
function load(totalTiles, rowLength) {
  //! edit these parameters to effect the total number of tiles and the row length
  init(totalTiles, rowLength);
  console.log(grid);
  // console.log(random(grid[0].length))
  // items are currently being stored in the order of [column][row]
  // can also think of it as reading the 'x' position before 'y'
  const starterTile = seedTile();
  start(starterTile);
  // start();
  // start();
  // start();
  // start();
  // start();
  // start();
  // start();
}

window.onload = () => load(875, 24);

window.addEventListener('keyup', e => {
  e.preventDefault()
  // console.log(e.code)
  switch(e.code) {
    case 'KeyR':
      container.innerHTML = '';
      while(grid[0])
        grid.pop();
      load(875, 24);
      break;
    case 'KeyC':
      console.log('continue the collapse');
      break;
  }
});

/*
  TODO
  - add buttons to undo and redo movements of the starter tile, this will be useful for debugging corners and edges
  - should just be an array of positions to cycle between and index
*/