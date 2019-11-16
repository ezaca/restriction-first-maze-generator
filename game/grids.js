(function(){

    var floors = [];

    class FloorManager
    {
        constructor(num){
            this.id = num|0;
            this.element = $('#floor'+this.id);
            this.cells = new Map();
            this.width = 0;
            this.height = 0;
            this.cellPrefix = 'floor'+this.id+'-';
            $$('#floor'+this.id+' .cell')(el => {
                let cell = new Cell(el);
                this.cells.set(el.id, cell);
                this.width = Math.max(this.width, cell.x+1);
                this.height = Math.max(this.height, cell.x+1);
            });
        }

        get above(){
            return floors[this.id + 1] || null;
        }

        get below(){
            return floors[this.id - 1] || null;
        }

        cell(x,y){
            if(x instanceof HTMLElement)
                return this.cells.get(x.id);
            if(x instanceof Cell)
                return x;
            if((typeof x === 'string') && y === undefined)
                return this.cells.get(x);
            return this.cells.get(this.cellPrefix+(x|0)+'-'+(y|0));
        }

        openPath(cell1,cell2){
            cell1.openBetween(cell2);
        }

        directionTo(cell1,cell2){
            cell1.directionTo(cell2);
        }

        randomCell(){
            return this.cell(rand(0,this.width), rand(0,this.height));
        }
    }

    class Cell
    {
        constructor(el){
            this.el = el;
        }

        get x(){ return this.el.dataset.x|0; }
        get y(){ return this.el.dataset.y|0; }
        get z(){ return this.el.dataset.floor|0; }
        get floor(){ return floors[this.el.dataset.floor|0]; }

        get north(){ return this.floor.cell(this.x, this.y-1); }
        get east(){ return this.floor.cell(this.x+1, this.y); }
        get south(){ return this.floor.cell(this.x, this.y+1); }
        get west(){ return this.floor.cell(this.x-1, this.y); }
        get above(){ return this.floor.above.cell(this.x,this.y); }
        get below(){ return this.floor.below.cell(this.x,this.y); }
        get neighbours(){ return [this.north, this.east, this.south, this.west]; }

        get isNorthOpen(){ return this.el.classList.contains('open-n'); }
        get isEastOpen(){ return this.el.classList.contains('open-e'); }
        get isSouthOpen(){ return this.el.classList.contains('open-s'); }
        get isWestOpen(){ return this.el.classList.contains('open-w'); }
        get isOpen() { return this.el.classList.contains('open'); }
        get dontOpen() { return this.el.classList.contains('dont-open'); }
        get canOpen() { return ! this.dontOpen; }

        isOpenTo(dir){
            switch(dir){
                case 'n': case 0: return this.isNorthOpen;
                case 'e': case 1: return this.isEastOpen;
                case 's': case 2: return this.isSouthOpen;
                case 'w': case 3: return this.isWestOpen;
                default: throw new Error('invalid neighbour direction: '+dir);
            }
        }

        neighbour(dir){
            switch(dir){
                case 'n': case 0: return this.north;
                case 'e': case 1: return this.east;
                case 's': case 2: return this.south;
                case 'w': case 3: return this.west;
                default: throw new Error('invalid neighbour direction: '+dir);
            }
        }

        open(dir){
            this.el.classList.add('open');
            switch(dir){
                case undefined: break;
                case 'n': case 0: this.el.classList.add('open-n'); break;
                case 'e': case 1: this.el.classList.add('open-e'); break;
                case 's': case 2: this.el.classList.add('open-s'); break;
                case 'w': case 3: this.el.classList.add('open-w'); break;
                default: throw new Error('invalid neighbour direction: '+dir);
            }
        }

        directionTo(cell){
            let c = this.floor.cell(...arguments);
            if (! c)
                throw new Error('cell '+this+' and '+cell+' are not neighbour');
            if (c === this.north) return 'n';
            if (c === this.east) return 'e';
            if (c === this.south) return 's';
            if (c === this.west) return 'w';
            throw new Error('cell '+this+' and '+cell+' are not neighbour');
        }

        openBetween(anotherCell){
            let another = this.floor.cell(...arguments);
            let dir = this.directionTo(another);
            let opdir = Direction.mirror(dir);
            this.open(dir);
            another.open(opdir);
        }

        toString(){
            return `Cell(f=${this.z}, x=${this.x}, y=${this.y})`;
        }
    }

    window.Grids = {
        get floors(){ return floors; },
        get floorCount(){ return floors.length; },
        get currentFloor(){ return this.floor($('.floor.center').dataset.floor); },
        get currentBelow(){ return this.floor($('.floor.left1').dataset.floor); },
        get currentAbove(){ return this.floor($('.floor.right1').dataset.floor); },

        get playerCell(){
            let playerEl = $('.player');
            return this.cell(playerEl.dataset.floor, playerEl.dataset.x, playerEl.dataset.y)
        },

        reset(floorCount){
            floors = [];
            for(var num of range(0,floorCount)){
                floors[num] = new FloorManager(num);
            }
        },

        eachFloor(lambda){
            for(var [index,item] of floors.entries())
                lambda(item,index,floors);
        },

        floor(index){
            return floors[index|0];
        },

        cell(z, x, y){
            return floors[z|0].cell(x|0, y|0);
        }
    };

})();