# Application Features - Updated: November 15th, 2024
---
## Customizable Battle Grid and Tiles

This feature allows the users to input the dimensions of their desired grid and display a "battle grid" to provide a visual supplement to the world of the players' Dungeons &amp Dragons campaign. Each tile in the grid will be a square, and the user will have the option to select what type of terrain each tile will represent (i.e. grass, stone, castle, etc.) as well as choose its color. The user would also be able to drag and drop the tiles onto their desired spots, updating the grid in real-time.
- **[5 Points]** Actually making the grid itself **(Feature size: Large, Assigned to: Shanzay)**
  - You can set it to be size x and y (from the choosing size of grid) and it will create squares of that size and grid. 
  - Text input to choose the size of the grid (x and y)
  - Each tile will be its own object to keep track of current terrain and current token objects on them
- **[5 Points]** Creating a list of tile types user can choose from **(Feature size: Large, Assigned to: Gerindra)**
  - Tiles are squares that represent a terrain element on the battle grid, and they contain three pieces of information: tile type (its name), details, and appearance
    - The tile type is represented as text
    - The details are represented as text
    - The appearance is saved as an image url
  - The user is able to access two menus for tile type creation, editing, and deletion. When selected from the nav bar, these menus pop up in the middle of the screen.
    - 'Create New Custom Tile' Menu: This menu allows the user to create a new tile type by inputting the tile's type name, its details, and its visual appearance
      - Tile Appearance Preview: There is a window where the user can view how their tile will look like and it is updated when they input a valid hexadecimal representation of a color or upload an image
    - 'Edit Existing Tile' Menu: This menu allows the user to choose from a list of existing tiles and edit their details and appearances, using the same tile appearance preview feature as the previous menu. This menu also allows the user to delete the chosen tile type.
  - The program keeps track of these tiles using IndexedDB. When a tile is created, it is saved in IndexedDB and when it is deleted it is removed. When the user refreshes the page, their chosen tiles will still remain if they wish.
- **[3 Points]** Laying tiles on the battle grid **(Feature size: Medium, Assigned to: Gerindra)**
  - There are two different grid views: object grid view and battle grid view. In battle grid view, the user is able to place tiles on the battle grid.
    - The user can choose their desired tile from a drop down menu
    - Once chosen, the user can press a button to enter edit mode. This allows the user to place tiles on the board without dragging the entire board around.
    - The user can either click on a square on the grid to place it down, or click and drag their cursor across the grid to "paint" the tiles over the grid with broad strokes
    - In the same dropdown menu the user can choose a "Delete Tile" option, where the user can click or click and drag across the grid to delete the tiles they've placed down
  - Once laid down, the squares take on the appearance of the tile, and when hovering the cursor over the tiled square, a little tooltip appears and displays the square's tile type and details
- **[1 Point]** Delete all tile types **(Feature size: Small, Assigned to: Gerindra)**
  - User can press a button to clear all their tile type options

## Dynamic Token/Character Positioning and Stats

A token is an object that can be placed on a single tile of the battle grid. It is represented by an image superimposed on a tile, and it houses customizable stats that can be viewed when the user's mouse is hovered over it. The user can choose what these tokens represent in the context of game-play, such as a playable character, NPCs, enemies, or obstacles. Its position on the battle grid can be changed by simply dragging and dropping the tokens onto a desired tile.

- **[3 Points]** Creating object **(Feature size: Medium, Assigned to: Emily)**
  - Display information when you hover
  - Information are like rock or etc
  - May create multiple copy of same object
  - Delete object
- **[5 Points]** Dropping and dragging features **(Feature size: Large, Assigned to: Emily)**
  - The dragging and dropping interface
  - Select item
  - Save their new coordinate

## Image Import

This feature allows users to import images into the web application, giving them the freedom to choose any image they want to represent any tiles or any tokens on the battle grid. 
- **[1 Point]** Importing map background image **(Feature size: Small, Assigned to: Geri)**
  - The user can import an image that would be placed behind the grid, to add some visual texture to the battle grid
- **[3 Points]** Import image for tokens **(Feature size: Medium, Assigned to: Emily)**

## Drawing 

In order to facilitate the discussion of strategies amidst a campaign, users will be able to enter a specific mode where they can use their mouse to draw over the battle grid with a virtual pen. This virtual pen will be adjustable by the user in both size and color. The user will also be able to erase their drawing either with an eraser tool or via a "clear all" option.

- **[1 Point]** Create layer on top of grid for drawing **(Feature size: Small, Assigned to: Casey)**
- **[1 Point]** Color picker **(Feature size: Small, Assigned to: Casey)**
  - The user can use this to choose the color of their pencil
- **[5 Points]** Pencil tool (click and drag to draw in current color) **(Feature size: Large, Assigned to: Casey)**
  - The user can use a pencil tool to draw over their battle grid. The shape of the pen nib will be circle for smoothness.
- **[1 Point]** Select pencil width using drop down **(Feature size: Small, Assigned to: Casey)**
- **[4 Points]** Eraser tool that removes drawing **(Feature size: Large, Assigned to: Beatrice)**
- **[3 Points]** Rectangle **(Feature size: Medium, Assigned to: Rudy)**
  - Built off the pencil feature, allows the user to draw a rectangle
- **[3 Points]** Circle **(Feature size: Medium, Assigned to: Beatrice)**
  - Built off the pencil feature, allows the user to draw a circle
- **[1 Point]** Clear All **(Feature size: Small, Assigned to: Beatrice)**
  - Allows the user to clear entire canvas

## Customizable Dice Roller

The web application will provide the users with an option to use virtual dice. The dice will be fully customizable, as the user will be able to adjust the number of sides on the dice as well as if they want to add in custom numbers. The user will be able to roll the dice at any point in the campaign.

- **[1 Point]** Customizing dice number range with a form, max 20 **(Feature size: Small, Assigned to: Emily + Shanzay)**
- **[1 Point]** Customize number of dice from a range, max 20 **(Feature size: Small, Assigned to: Shanzay)**
- **[1 Point]** Text input for modifiers that add/subtract from each individual dice **(Feature size: Small, Assigned to: Beatrice)**
- **[1 Point]** Use a random number generator for the dice throws **(Feature size: Small, Assigned to: Shanzay)**
  - We run the random num gen for each dice and add up the final number

## User Interface
**[5 Points]** Overarching UI **(Feature size: Large, Assigned to: Alina)**
- Make the grid and all the overlay where the tool are, and when you click on it it brings you to the individual box
- Every button can be made into a small feature for whoever is working on that feature to add 
  - **[1 Point]** Edit grid button **(Feature size: Small, Assigned to: Alina)**
  - **[1 Point]** Add terrain button **(Feature size: Small, Assigned to: Alina)**
  - **[1 Point]** Draw button **(Feature size: Small, Assigned to: Alina)**
  - **[1 Point]** Add token button **(Feature size: Small, Assigned to: Alina)**
  - **[1 Point]** Roll dice button **(Feature size: Small, Assigned to: Alina)**
- **[5 Points]** Zoom In/Out and Drag to View **(Feature size: Large, Assigned to: Rudy)**
  - While keeping the size of the menu static, the user should be able to zoom in and out of the battle grid using toggle-able +- buttons
  - The user can drag the screen to show which part of the battle map they want to view

## Data Tracking/Saving

This web application will save user data in local storage, so that information like the tokens, characters, stats, token/character positions, dice settings, imported images, and drawings are all saved so that when the user leaves the web application and returns to it on their browser, all of this information will be restored. However, the user will have the option to completely wipe this data to start over from a clean slate. This is important as there is a lot of data players need to keep track of between campaign sessions.
  - **[2 Points]** Tile Type information is saved as objects in IndexedDB, complete with type name, details, and associated image **(Feature size: Medium, Assigned to: Gerindra)**
  - **[2 Points]** Object Token information is saved as objects in IndexedDB, complete with name, details, and associated image **(Feature size: Medium, Assigned to: Emily)**
