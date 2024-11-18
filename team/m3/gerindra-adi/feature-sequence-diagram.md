This is the create new custom tile feature. This feature allows the user to determine the name, details, and appearance of a tile. All the tiles are saved in IndexDB

```mermaid
sequenceDiagram
    participant user as User
    participant web as Web Browser
    participant tile as TileLogic.js
    participant db as IndexDB

    user->>web: user clicks on 'create new custom tile'
    web->>tile: showCustom() is called
    tile->>web: pop up menu displayed for creating new custom tile
    user->>web: user inputs tile type name
    user->>web: user inputs detail
    user->>web: user inputs tile details

    alt user inputs a hexadecimal color representation
        user->>web: enters hexadecimal color representation
        web->>tile: changeTilePreviewColor() is called
        tile->>tile: changeTilePreviewColor() validates the hexadecimal code
        alt hex code is invalid
            tile->>web: changes hex text input background color to red 
        else hex code is valid
            tile->>web: changes color tile preview canvas element to match the one represented in the hex code
        end
    else user uploads image
            tile->>web: updates the tile preview canvas element to show the user's uploaded image
    end

    user->>web: user clicks on 'add new tile'
    web->>tile: addNewCustomTile() is called
    tile->>tile: getCanvasImageFromCustom() is called to retrieve the contents of the tile preview canvas element as an image URL
    tile->>tile: Creates a new tileObject with the user's inputted tile type, details, and the imageURL from getCanvasImageFromCustom()
    tile->>db: Calls addObject() to add new tileObject to dbTileObject database in IndexDB
    tile->>tile: Updates all the tile dropdown menus to reflect changes
    tile->>tile: hideCustom() is called
    tile->>tile: initializeAvailableTiles() is called
    tile->>tile: populateTileDropdown1() is called
    