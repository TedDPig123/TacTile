//POST: Request for creating a new tile object - SYNCED
export async function createTile(tileObject) {
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
        console.log('Tile created:', newTileObject);
        return newTileObject;
    } catch (error) {
        console.error("Error creating tile:", error);
        alert("Error creating tile on the server.");
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
            const errorResponse = await response.json();
            throw new Error("Failed to update tile");
        }
        const updatedTile = await response.json();
        console.log(`TileID ${tileId} updated:`, updatedTile);
        return updatedTile;
    } catch (error) {
        console.error("Failed to update tile:", error);
        alert(`Error updating tile: ${error.message}`);
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

//PUT: Request to change the IDBtileID of a tile
export async function changeTileID(tileId, newIDBtileID) {
    try {
        const response = await fetch(`/tiles/${tileId}/change-id`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newIDBtileID }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Failed to change IDBtileID: ${errorResponse.message}`);
        }

        const updatedTile = await response.json();
        console.log(`TileID ${tileId} updated with new IDBtileID ${newIDBtileID}:`, updatedTile);
        return updatedTile;
    } catch (error) {
        console.error("Failed to change IDBtileID:", error);
        alert(`Error changing IDBtileID: ${error.message}`);
    }
}

// DELETE: Request to clear all tiles
export async function clearAllTiles() {
    try {
        const response = await fetch('/tiles/clear', {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Failed to clear all tiles: ${errorResponse.message}`);
        }

        const message = await response.json();
        console.log('All tiles cleared:', message);
        alert("All tiles have been cleared.");
    } catch (error) {
        console.error("Failed to clear all tiles:", error);
        alert("Error clearing all tiles.");
    }
}
