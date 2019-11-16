var GUI = {

    stage: null,
    floors: null,
    width: 0,
    height: 0,

    init(){
        this.stage = document.getElementById('stage');
        this.floors = document.querySelectorAll('.floor');
    },

    clearAll(){
        this.stage.innerHTML = "";
        this.floors = [];
    },

    createFloors(count){
        let floors = array(count).map((i,j)=>DOM.create(this.stage, `div#floor${j}.floor[data-floor="${j}"]`));
        floors.forEach((floor, i) => GUI.setFloorPosition(floor, i - (count/2|0)));
        this.floors = document.querySelectorAll('.floor');
    },

    createGrids(width, height){
        this.width = width|0;
        this.height = height|0;
        let floorWidth = 480;
        let floorHeight = 480;
        DOM.cssVar('--width', floorWidth+"px");
        DOM.cssVar('--height', floorHeight+"px");
        DOM.cssVar('--cell-width', (floorWidth/this.width)+"px");
        DOM.cssVar('--cell-height', (floorHeight/this.height)+"px");

        this.floors.forEach((floor,fi)=>{
            let lines = array(this.height).map(i=>DOM.create(floor, 'div.line'));
            lines.forEach((div,line)=>{
                array(this.width).map((v,col)=>DOM.create(div, `div#floor${fi}-${col}-${line}.cell[data-floor="${fi}"][data-x="${col}"][data-y="${line}"]`));
            });
        });
    },

    setFloorPosition(floor, distance){
        let addClass;
        ['leftn','left2','left1','center','right1','right2','rightn'].forEach(cls=>floor.classList.remove(cls));
        if (distance <= -3) addClass = 'leftn';
        if (distance == -2) addClass = 'left2';
        if (distance == -1) addClass = 'left1';
        if (distance == 0) addClass = 'center';
        if (distance == 1) addClass = 'right1';
        if (distance == 2) addClass = 'right2';
        if (distance >= 3) addClass = 'rightn';
        floor.classList.add(addClass);
    },

    showFloor(floorID){
        GUI.floors.forEach((floor,index)=>{
            GUI.setFloorPosition(floor, index - (floorID));
        });
    },

    setPlayerPosition({floor, x, y}){
        $$('.player').removeClass('player');
        $(`#floor${floor}-${x}-${y}`).classList.add('player');
    },

    getPlayerPosition(){
        let player = $('.player');
        return {
            element: player,
            floor: player.dataset.floor|0,
            x: player.dataset.x|0,
            y: player.dataset.y|0,
        };
    },

};