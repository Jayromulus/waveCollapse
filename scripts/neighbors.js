const neighbors = {
  "center": {
    "north": ["down-left", "down-right", "down-up", "south-west-north", "south-east-north", "center"],
    "east": ["east-north", "east-west", "east-south", "east-north-west", "east-west-south"],
    "south": ["south-coast-grass", "south-desert-grass", "south forest-grass"],
    "west": ["west-grass-coast"]
  }
}

/*
  center (up-right-down-left)
  up-right
  up-down
  up-left
  up-right-down
  up-right-left
  up-down-left
  right-down
  right-left
  right-down-left
  down-left
*/