# TacTile - Customizable Battle Grid

## Project Description

TacTile is a web application designed to help Dungeon Masters create customizable battle maps for Dungeons & Dragons (DND) sessions. The application allows users to create grids, add tokens, create specialized tiles, draw over the map, and use a built-in dice roller for gameplay.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating the Grid](#creating-the-grid)
  - [Using the Dice Roller](#using-the-dice-roller)

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
