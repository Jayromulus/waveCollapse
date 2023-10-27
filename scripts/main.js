//* Declaring Variables for the App
const container = document.querySelector('.grid');
const grid = [];
let tracker = 0;

const input = document.querySelector('input');

//* Figuring out how to Limit the Neighbors of a Given Tile
const neighbors = {
  'full-grass': {
    north: ['north-coast-grass', 'north-desert-grass', 'north-forest-grass'],
    east: ['east-grass-coast', 'east-forest-grass'],
    south: ['south-coast-grass', 'south-desert-grass', 'south forest-grass'],
    west: ['west-grass-coast'],
  },
  'north-coast': {
    north: [],
    east: [],
    south: [],
    west: [],
  },
  'east-coast': {
    north: [],
    east: [],
    south: [],
    west: [],
  },
  'south-coast': {
    north: [],
    east: [],
    south: [],
    west: [],
  },
  'west-coast': {
    north: [],
    east: [],
    south: [],
    west: [],
  },
}

//* Initialize the Board/Map to a given number of tiles
function init(totalTiles, rowLength) {
  // 850 fits near perfect on the macbook screen when safari is fullscreen with tabs, 875 if no tabs
  for (let i = 0; i < totalTiles; i++) {
    const newItem = document.createElement('div');
    // creating an item, "empty" class will represent an unknown tile
    newItem.classList.add('item', 'empty');
    newItem.innerText = 87;
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

// look for neighbors in a given element might need expanded or removed if it doesnt help legibility
function findNeighbors(element) {
  return neighbors[element.classList[1]]
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

//* Load the Page
function load(totalTiles, rowLength) {
  //! edit these parameters to effect the total number of tiles and the row length
  init(totalTiles, rowLength);
  console.log(grid);
  console.log(random(grid[0].length))
  // items are currently being stored in the order of [column][row]
  // can also think of it as reading the 'x' position before 'y'
  const starterTile = seedTile();

  // this section will change in order to more efficiently change not only the starter tile but also each generatively created tile
  starterTile.element.innerText = 0;
  starterTile.element.classList.add('full-grass');
  starterTile.element.classList.remove('empty');


  //! clump all of this together and make it so that this runs in order of each tile affected, and updated each tile to only contain the allotted items for a given tile. probably instead of having a given tile reference a database maybe each tile should instead inherently contain a list of all allowed tiles and when one is changed near it we just reduce the options until either the last remaining item exists within that updated tile or if there is a standstill then we select randomly one of the tiles with the lowest "evaluation" score and decide randomly what it is that tile should be and then re-evaluate the tiles from there. ideally the "wave" of checks should fizzle out fairly quickly, within one or two tiles, before it has not enough information to update a tile again. this might also only need to affect or check tiles that are adjacent to currently filled tiles if that makes it easier to calculate and reduce load times
  const validNeighbors = findNeighbors(starterTile.element);
  console.log(validNeighbors);

  Object.keys(validNeighbors).forEach(direction => {
    let selectedTile, selectedX, selectedY;
    switch(direction) {
      case 'north':
        selectedY = limitSwitch(starterTile, 'y', 'up');
        if(selectedY === 500)
          break;
        selectedTile = grid[starterTile.x][selectedY]
        selectedTile.innerText = validNeighbors['north'].length;
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
  })
}

window.onload = () => load(875, 24);

window.addEventListener('keyup', e => {
  e.preventDefault()
  container.innerHTML = '';
  while(grid[0])
    grid.pop();
  load(875, 24);
});