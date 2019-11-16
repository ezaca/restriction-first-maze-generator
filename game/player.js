var Player = {

    teleportTo(floorID, x, y){
        GUI.setPlayerPosition({floor: floorID, x, y});
        GUI.showFloor(floorID);
    },

    moveNorth(){
        if (Grids.playerCell.isNorthOpen)
            this.$incPosition(0, -1);
    },

    moveEast(){
        if (Grids.playerCell.isEastOpen)
            this.$incPosition(1, 0);
    },

    moveSouth(){
        if (Grids.playerCell.isSouthOpen)
            this.$incPosition(0, 1);
    },

    moveWest(){
        if (Grids.playerCell.isWestOpen)
            this.$incPosition(-1, 0);
    },

    move(dir){
        switch(dir){
            case 'n': case 0: this.moveNorth(); break;
            case 'e': case 1: this.moveEast(); break;
            case 's': case 2: this.moveSout(); break;
            case 'w': case 3: this.moveWest(); break;
            default: throw new Error('invalid neighbour direction: '+dir);
        }
    },

    $incPosition(x, y){
        let pos = GUI.getPlayerPosition();
        pos.x += x;
        pos.y += y;
        GUI.setPlayerPosition(pos);
        this.$checkStairs();
    },

    $incFloor(floorID){
        let pos = GUI.getPlayerPosition();
        pos.floor += floorID;
        GUI.setPlayerPosition(pos);
    },

    $checkStairs(){
        let cell = Grids.playerCell;
        if (cell.el.classList.contains('stair-up'))
        {
            this.$incFloor(1);
            GUI.showFloor(cell.floor.above.id);
        } else
        if (cell.el.classList.contains('stair-down'))
        {
            this.$incFloor(-1);
            GUI.showFloor(cell.floor.below.id);
        }
    }

};