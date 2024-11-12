// temp code for the battle grid to store information of what is on the tiles
//not sure how to implement it so far into my grid but will try to do it later? 

class Tile {
    constructor() {
        this.terrain = null;
        this.tokens = [];
    }

    setTerrain(terrain) {
        this.terrain = terrain;
    }

    addToken(token) {
        this.tokens.push(token);
    }

    removeToken(token) {
        const index = this.tokens.indexOf(token);
        if (index > -1) {
            this.tokens.splice(index, 1);
        }
    }

    getTerrain() {
        return this.terrain;
    }

    getTokens() {
        return this.tokens;
    }
}

export default Tile;