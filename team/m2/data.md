# Application Data

## Overview

### 1. Character generation

 - **Description**: record the information/data they created for the character on the battle map
     - "character_id"(string): a unique identifier for each character created
     - "image"(image): the image of each character
     - "name" (string): The name for the character
     - "health" (string): The amount of health the character has
     - "attack" (string): The stat for attack 
     - "defense" (string): The stat for defense
     - "description" (string): A short description for the character they created  
     - "character_color" (string): sets the color that it will appear on the map
     - "character_size" (number): the size of the character(how much tile it occupies)
     - "character_image"(image): the image for the character

 - **Data Source**: User-Data input via enemy/npc creation form

### 2. Object generation

 - **Description**: Tracks the creation of object
     - "object_id"(string): a unique identifier for each object created and placed
     - "object_tag" (string): shows the object type(wall castle etc.) for the object
     - "object_size" (number): the size of the object(how much tile it occupies)
     - "object_image"(image): the image for the object
 - **Data Source**: User data input via object creation.

### 3. Dice Roll

 - **Description**: tracks dice roll condition for the generation of dice
     - "number_of_dice"(number): the amount of dice for each roll
     - "dice_type"(string): a type(class) for each type of dice(d6, d10, d20 etc.)
     - "condition"(number): the extra number added onto each dice roll at the end(like +2, +1)
 - **Data Source**: User data whenever they submit in the dice generation box

### 4. Map generation

 - **Description**: records the information for map generation
     - "map_id"(string): the unique identifier for each map created
     - "map_area" (number): how big the map is
     - "background" (image): the image applied to the entirety of the map
     - "grid-size" (number): the size of each tile in the grid
     - "terrain_tag" (string): shows the terrain for the tile(s)
     - "tile_color"(string): sets the color of the tile(s)
     - "tile_size"(number): the numbers of tile the user wants to group together with terrain tag
 - **Data Source**: User input and system generated, the application will have a default and the user can input their own image and grid sie if they want.

### 5. Map placement

 - **Description**: records and store the information for object placement on map
     - "tile_cord"(object): record the placement of the tile on the map
     - "object_cord"(object): record the placement of the objects on the map
     - "character_cord"(object): record the placement of the character on the map
 - **Data Source**: User input when they drag and drop objects via the main battle map, will probably use API

### 6. Drawing

### comments and question for reviewers
 - I'm not sure what input will go in drawing since I'm not really familiar with the drawing interface.
 - do we want to include the size attribute so that each character and object can be bigger then a 1x1(1 tile)
 - any input or input type I should add