# TacTile - Customizable Battle Grid

## Project Description

TacTile is a web application designed to help Dungeon Masters create customizable battle maps for Dungeons & Dragons (DND) sessions. The application allows users to create grids, add tokens, create specialized tiles, draw over the map, and use a built-in dice roller for gameplay.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating the Grid](#creating-the-grid)
  - [Using the Dice Roller](#using-the-dice-roller)
  - [Using Paint Mode](#using-paint-mode)
  - [User Controls](#user-controls)
  - [Token Controls](#token-controls)

## Installation

1. Clone the repository: 
```sh
git clone https://github.com/TedDPig123/326_Project.git 
```
2. Install dependencies with ```npm install```
3. Start the server by ensuring you're in team/m3/backend folder where the server.js file is, and run 
```sh 
node server.js
```

## Accessing the Nav Bar
To access TacTile's features, click the icon of the two clashing swords on the top right of the page and a sidebar will dramatically appear from the left. On this sidebar you will find all the features you need to get started.

## Creating the Grid
### Set Grid Dimensions
Enter the desired width and height for the grid in the input fields labeled "Grid Width" and "Grid Height".

Click the "Create Grid" button to generate the grid.
### Add Background Image (Optional)
Click the "Insert Background Image" button to upload an image that will be used as the background for the grid.
### Switch Between Grids:
Use the "Currently on Battle Grid" button to switch between the battle grid and the object grid.
### Clear Grid: 
Click the "Clear Grid" button to clear the grid of all tiles
### Zoom In/Out:
Use the "+" and "-" buttons to zoom in and out of the grid.

## Grid Features
### Dragging
When the battle grid is unlocked, you can click and drag the grid to any position you want for better visibility.
### Tile Tooltips
When tiles have been placed on the map, if you switch to the battle grid and hover over any placed tiles, a tooltip will appear with the tile type's name and description.

## Manipulating Tiles
In TacTile, tiles represent the terrain types of the map, so knowing how to manipulate them is key to holding a successful TacTile session! You can access the following features from the TILES section of the navbar.
### Lock Battle Grid
This button is in the top right corner. When you are on the battle grid, clicking this button will lock the grid in place. This will allow you to place tiles on the grid without having to worry about the grid moving around with the mouse.
### Selecting and Placing Tiles
This dropdown menu allows you to choose the type of tile you want to lay down onto the grid, including a delete tile option. **If you are logged in, this will also show all the tile types associated with your account.** Once you have chosen the tile you want, follow these steps closely to lay down your chosen tile onto the grid:
- On the Grid menu, ensure your grid view option is set to "Currently on Battle Grid"
- Lock the battle grid
- Click and/or drag your cursor on the squares in the grid you want to fill and your tile will appear on the selected squares
### Delete All Tile Types
Clicking on "Delete All Tile Types" deletes all the tile types saved so far. **If you are logged in, this will also delete all tile types associated with your account.**
### Create New Custom Tile Type
Once you click on "Create New Custom Tile," a popup form ge will emerge, and you can decide the following:
- **Tile Type Name:** Enter your desired tile name in the text box labelled "TYPE"
- **Tile Type Description:** Enter a description for your tile type in the text box labelled "DETAILS"
- **Tile Appearance:** You have two options for this: either type in a valid hexadecimal representation of a color into the "COLOR" textbox and see the preview update with your typed color OR upload an image from your computer and see the preview update to match this. The preview box will update with the last action you take, be it selecting a color or an image.
- **Saving the Tile:** Click on "ADD NEW TILE" to create and save your new tile type. It will be saved with your specified type, details, and the last image in the preview box. **If you are logged in, this will save the tile to your account.**
### Edit and Delete Existing Tile
Upon clicking "Edit Existing Tile," a popup form will emerge, and you can decide the following:
- **Choose Existing Tile:** Hover over the first box in the form. If a dropdown does not appear, it means there are no saved tile types yet. If there is, click on the one you want to edit.
- **Make Edits:** Edit the tile's description and appearance however you please. The process is identical to when you are making a new tile.
- **Save or Delete Tile:** Once you are finished making changes, you have the option to save or delete the tile. **If you are logged in, these changes will be reflected in your account.**

## Using the Dice Roller
### Set Dice Parameters:
Enter the number of dice in the "Number of Dice" input field.
Enter the number of sides for each die in the "Number of Sides for Dice" input field.
Enter any modifier to be added to each roll in the "Add modifier" input field.
### Roll the Dice:
Click the "Roll Dice" button to roll the dice.
The results of the dice roll will be displayed in the "Dice Result" section. If you refresh the webpage, your dice options should still be present.

## Using Paint Mode
### Entering Drawing Mode
Click the "Draw Mode" button in the top right to toggle between drawing mode and non drawing mode.
### Drawing Tools
Click the "Draw" button to reveal the drawing tools.
### Change Brush and Color
Click the "Color" field to select a desired color for tools.
Enter a desired width for brush stroke.

Click the "Pen" toggle to use the pen tool.
The pen tool draws paths following the cursor when the mouse is pressed down.

Click the "Eraser" toggle to use the eraser tool.
The pen tool erases anything in the path following the cursor when the mouse is pressed down.

Click the "Rect" toggle to use the rectangle tool.
Click and drag on the canvas to make a rectangle with your desired height and width.

Click the "Circle" toggle to use the circle tool.
Click and drag on the canvas to make a circle with your desired height and width.
### Clear Canvas
Click the "Clear" button to clear all markings created in paint mode.


## User Controls
### Register User
Click the "Register" button to create a new user account. Insert a username, email, and password to register. Email must be in proper format. 
### Login
Click the "Login" button to log in to an existing user account. Insert the email and password to log in. This will create a token that will be used to authorize the user. It is stored in local storage.
### Logout
Click the "Logout" button to log out of the current user account. This will invalidate a token that was being used to authorize the user.
### Save feature
Users will have their tiles and tokens created saved to their account. This will allow them to access their creations at a later time. It is connected to a specific user, which can then be placed into a grid as they see fit. Note: Grids are not saved, only the tiles and tokens created by the user.
### Delete User
Click the "Delete User" button to delete the current user account. This will delete all data related to the user, including saved tiles and tokens associated with the user. 

## Token Controls
### Create Token
click the Add Token Button, only name is a required field, all other field are optional. description is the description of the token, R is the row the token will take up and C is the column the token will take up. Number of Copy is the number of the same token created. And if you choose and image file it will be shown on the tokens.

### Move Token
Once Token is created it will all be show initially at the top left of the grid, you can move it by clicking and dragging the token(make sure "Currently on Token Grid" is the text on the button, you can see this button by clicking menu, then GRID and you will see it. And make sure the grids are unlocked.You should also move the grid a little to the right for easier dragging).

### Token Information
hover over the token to see name and description, you can click on token to update or delete them. Make sure you are in "Currently on Token Grid" and grids are unlocked. When you click on the token it will reopen the form with the token information filled in. And you can click on the token again to close the form or just click update without changing anything.

### Update token
you can click on token to update them, fill in the new information and click update(if name field is missing, the server will alert you to pick a new name). And if your token already had and image, you can select a new image or get rid of the image by either: clicking the cancel button or select a different image then unselect it. You can also change the size if the token by choosing new number for C(column) and R(row).

### Delete token
When you click on the button, you will see the token form reopen, you can click Delete to delete that token

### clear Form
to clear the token form just click cancel, this will clear all text in name and description, it will also clear your image choice in the form

### Delete all token
to delete all Token just click Delete All Token or create a new grid.
