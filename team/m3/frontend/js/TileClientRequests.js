//POST: Request for creating a new tile object - SYNCED
export async function createTile(tileObject){
    try {
        const response = await fetch('/tiles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tileObject),
        });

        if (!response.ok) {
            throw new Error('Failed to create tile');
        }

        const newTileObject = await response.json();
        console.log('tile created:', newTileObject);
        return newTileObject;
    } catch (error) {
        console.log(error, "something went wrong");
    }
}

//GET: Request for getting all tile types
export async function getAllTiles(){
    try {
        const response = await fetch('/tiles', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to get all tiles');
        }

        const allTiles = await response.json();
        console.log('all the tiles:', allTiles);
        return allTiles;
    } catch (error) {
        console.log('something went wrong: ', error);
    }
}

//GET: Request for getting a single tile type
export async function getTileById(tileId) {
    try {
        const response = await fetch(`/tiles/${tileId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to get tile');
        }

        const tile = await response.json();
        console.log(`Tile fetched with ${tileID}:`, tile);
        return tile;
    } catch (error) {
        console.log('something went wrong: ', error);
    }
}

//PUT: Request to update a single tile type - SYNCED
export async function updateTile(tileId, updatedData) {
    try {
        const response = await fetch(`/tiles/${tileId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update tile');
        }

        const updatedTile = await response.json();
        console.log(`TileID ${tileId} updated:`, updatedTile);
        return updatedTile;
    } catch (error) {
        console.log('something went wrong: ', error);
    }
}

//DELETE: deletes a tile type - SYNCED
export async function deleteTile(tileId) {
    try {
        const response = await fetch(`/tiles/${tileId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete tile');
        }

        const message = await response.json();
        console.log(`TileID ${tileId} deleted:`, message);
    } catch (error) {
        console.log('something went wrong: ', error);
    }
}

//PUT: Create a placed tile coordinate
export async function addTileCoordinate(tileID, x, y) {
    try {
        const response = await fetch('/tileCoordinates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tileID, x, y }),
        });

        if (!response.ok) {
            throw new Error('Failed to add tile coordinate');
        }

        const newCoordinate = await response.json();
        console.log('Tile coordinate added:', newCoordinate);
        return newCoordinate;
    } catch (error) {
        console.log('something went wrong: ', error);
    }
}

//DELETE: Delete a placed tile coordinate object based off x and y axis
export async function deleteTileCoordinate(tileID, x, y) {
    try {
        const response = await fetch('/tileCoordinates', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tileID, x, y }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete tile coordinate');
        }

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.log('something went wrong: ', error);
    }
}

//TODO:create a render function to render all of this stuff on the board



