# TacTile - Customizable Battle Grid

## Project Description

TacTile is a web application designed to help Dungeon Masters create customizable battle maps for Dungeons & Dragons (DND) sessions. The application allows users to create grids, add tokens, create specialized tiles, draw over the map, and use a built-in dice roller for gameplay.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating the Grid](#creating-the-grid)
  - [Using the Dice Roller](#using-the-dice-roller)
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

## Creating the Grid
### Set Grid Dimensions
Enter the desired width and height for the grid in the input fields labeled "Grid Width" and "Grid Height".

Click the "Create Grid" button to generate the grid.
### Add Background Image (Optional)
Click the "Insert Background Image" button to upload an image that will be used as the background for the grid.
### Switch Between Grids:
Use the "Currently on Battle Grid" button to switch between the battle grid and the object grid.
### Enable/Disable Edit Mode:
Click the "Enable Edit Mode" button to toggle edit mode, allowing you to drag and drop tokens on the grid.
### Zoom In/Out:
Use the "+" and "-" buttons to zoom in and out of the grid.

## Using the Dice Roller
### Set Dice Parameters:
Enter the number of dice in the "Number of Dice" input field.
Enter the number of sides for each die in the "Number of Sides for Dice" input field.
Enter any modifier to be added to each roll in the "Add modifier" input field.
### Roll the Dice:
Click the "Roll Dice" button to roll the dice.
The results of the dice roll will be displayed in the "Dice Result" section.

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
click the Add Token Button, only name is a required field, all other field are optional. Desertion is the description of the token, R is the row the token will take up and C is the column the token will take up. Number of Copy is the number of the same token created. And if you choose and image file it will be shown on the token.

### Move Token
Once TOken is created it will all be show initially at the top left of the grid, you can move then by clicking and dragging the token(make sure "Currently on Token Grid" and "Enable Edit Mode" is the text on the two button below Add Token).

### Token Information
hover over the token to see name and description, you can click on token to update or delete them

### Update token
you can click on token to update them, fill in the new information and click update

### Delete token
you can click on token to delete them, it will open the token form and you can click the delete button

### clear Form
to clear the token form just click cancel

### Delete all token
to delete all Token just click Delete All Token or create a new grid