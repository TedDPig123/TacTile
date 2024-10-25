# Application Features - Updated: October 24th, 2024
---
## Customizable Battle Grid and Tiles

This feature allows the users to input the dimensions of their desired grid and display a "battle grid" to provide a visual supplement to the world of the players' Dungeons &amp Dragons campaign. Each tile in the grid will be a square, and the user will have the option to select what type of terrain each tile will represent (i.e. grass, stone, castle, etc.) as well as choose its color. The user would also be able to drag and drop the tiles onto their desired spots, updating the grid in real-time.
- Actually making the grid itself **(Feature size: Large, Assigned to: Shanzay)**
  - You can set it to be size x and y (from the choosing size of grid) and it will create squares of that size and grid. 
  - Text input to choose the size of the grid (x and y)
  - Each tile will be its own object to keep track of current terrain and current token objects on them
- Creating a list of tile types user can choose from **(Feature size: Large, Assigned to: Geri)**
  - Tile types are determined by user text input, and these inputs are then saved as tags, so they can be chosen from a drop down list for ease of access
  - By default, have empty terrain tag so we can erase it
  - Color picker required for the terrain 

## Dynamic Token/Character Positioning and Stats

A token is an object that can be placed on a single tile of the battle grid. It is represented by an image superimposed on a tile, and it houses customizable stats that can be viewed when the user's mouse is hovered over it. The user can choose what these tokens represent in the context of game-play, such as a playable character, NPCs, enemies, or obstacles. Its position on the battle grid can be changed by simply dragging and dropping the tokens onto a desired tile.

- Creating character **(Feature size: Medium, Assigned to: Geri)**
  - Being able to edit it
  - Have stats, just use text box
  - Display information when you hove
  - (optional) - make different size
  - Being able to delete characters
- Creating object **(Feature size: Medium, Assigned to: Emily)**
  - Display information when you hove
  - Information are like rock or etc
  - May create multiple copy of same object
  - Delete object
- Dropping and dragging features **(Feature size: Large, Assigned to: Emily)**
  - The dragging and dropping interface
  - Select item
  - Save their new coordinate

## Image Import

This feature allows users to import images into the web application, giving them the freedom to choose any image they want to represent any tiles or any tokens on the battle grid. 
- Importing map background image **(Feature size: Medium, Assigned to: Geri)**
  - (size restriction? Ex: you need a 2000 x 2000 px image minimum) 
- Import image for tokens **(Feature size: Medium, Assigned to: Emily)**

## Drawing 

In order to facilitate the discussion of strategies amidst a campaign, users will be able to enter a specific mode where they can use their mouse to draw over the battle grid with a virtual pen. This virtual pen will be adjustable by the user in both size and color. The user will also be able to erase their drawing either with an eraser tool or via a "clear all" option.

- Create layer on top of grid for drawing **(Feature size: Small, Assigned to: Casey)**
- Color picker **(Feature size: Small, Assigned to: Casey)**
- Pencil tool (click and drag to draw in current color) **(Feature size: Large, Assigned to: Casey)**
  - Shape of pen nib will be circle
- Select pencil width using drop down **(Feature size: Small, Assigned to: Casey)**
- Eraser tool that removes drawing **(Feature size: Large, Assigned to: Beatrice)**
  - (large but like probably same logic as pencil)
- Rectangle **(Feature size: Medium, Assigned to: Rudy)**
  - Do pencil first
- Circle **(Feature size: Medium, Assigned to: Beatrice)**
  - Do pencil first

## Customizable Dice Roller

The web application will provide the users with an option to use virtual dice. The dice will be fully customizable, as the user will be able to adjust the number of sides on the dice as well as if they want to add in custom numbers. The user will be able to roll the dice at any point in the campaign.

- Customizing dice number range with a form, max 20 **(Feature size: Small, Assigned to: Emily + Shanzay)**
- Customize number of dice from a range, max 20 **(Feature size: Small, Assigned to: Shanzay)**
- Text input for modifiers that add/subtract from each individual dice **(Feature size: Small, Assigned to: Beatrice)**
- (Add video to represent dice throwing - random) **(Feature size: Small, Assigned to: Shanzay)**
- Use a random number generator for the dice throws **(Feature size: Small, Assigned to: Shanzay)**
  - We run the random num gen for each dice and add up the final number

## User Interface
Alina Actual UI LARGE **(Feature size: Large, Assigned to: Alina)**
- Big feature
- Make the grid and all the overlay where the tool are, and when you click on it it brings you to the individual box
- Every button can be made into a small feature for whoever is working on that feature to add 
  - Edit grid button: Alina **(Feature size: Small, Assigned to: Alina)**
  - Add terrain button: Alina **(Feature size: Small, Assigned to: Alina)**
  - Draw button: Alina **(Feature size: Small, Assigned to: Alina)**
  - Add token button: Alina **(Feature size: Small, Assigned to: Alina)**
  - Roll dice button: Alina **(Feature size: Small, Assigned to: Alina)**
- Zoom In/Out and Drag to View **(Feature size: Large, Assigned to: Rudy)**
While keeping the size of the menu static, the user should be able to zoom in and out of the battle grid using toggle-able +- buttons
the user can drag the screen to show which part of the battle map they want to view


## Data Tracking/Saving

This web application will save user data in local storage, so that information like the grid layout, tokens, characters, stats, token/character positions, dice settings, imported images, and drawings are all saved so that when the user leaves the web application and returns to it on their browser, all of this information will be restored. However, the user will have the option to completely wipe this data to start over from a clean slate. This is important as there is a lot of data players need to keep track of between campaign sessions.
- Local storage stuff 
  - Save the map itself:
    - Map Size
    - Save each square as its own object, which has data on terrain type, position, and color
    - Save each token as their own object, complete with image (if not imported by user), type, and position
