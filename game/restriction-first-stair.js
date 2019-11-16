var RestrictionFirstStair = {

    generateAll(amount){
        let center = Grids.floorCount / 2 |0;
        this.generate(Grids.floor(center), {goUp:true, goDown:true, amount});

        for(var i of irange(center-1, 0))
            this.generate(Grids.floor(i), {goUp:false, goDown:true, amount});
        
        for(var i of range(center+1, Grids.floorCount))
            this.generate(Grids.floor(i), {goUp:true, goDown:false, amount});
    },

    generate(floor, rules){
        if (rules.goUp && floor.above)
        {
            for(var i of range(0, rand(rules.amount[0]|0, rules.amount[1]|0)))
                this.randomStairUp(floor);
        }
        if (rules.goDown && floor.below)
        {
            for(var i of range(0, rand(rules.amount[0]|0, rules.amount[1]|0)))
                this.randomStairDown(floor);
        }
    },

    randomStairUp(floor){
        let dir, opdir;
        for(dir of Direction.shuffle())
        {
            opdir = Direction.mirror(dir);
            let trial, trials = 0;
            for(trial of range(0, 20))
            {
                let cell = floor.randomCell();
                cell.rfstair = cell.rfstair || { stairSpace: false };
                let backStair = cell.neighbour(opdir);
                let frontStair = cell.above.neighbour(dir);
                if (cell.rfstair.stairSpace)
                    continue;
                if (! cell.above || ! backStair || ! frontStair)
                    continue;
                if (cell.above.rfstair && cell.above.rfstair.stairSpace)
                    continue;
                if (backStair.rfstair && backStair.rfstair.stairSpace)
                    continue;
                if (frontStair.rfstair && frontStair.rfstair.stairSpace)
                    continue;
                cell.rfstair = { stairSpace: true };
                cell.above.rfstair = { stairSpace: true };
                frontStair.rfstair = { stairSpace: true };
                backStair.rfstair = { stairSpace: true };
                cell.el.classList.add('stair-up');
                cell.el.classList.add('stair-up-'+dir);
                cell.el.classList.add('dont-open');
                cell.above.el.classList.add('stair-down');
                cell.above.el.classList.add('stair-down-'+opdir);
                cell.above.el.classList.add('dont-open');
                backStair.openBetween(cell);
                frontStair.openBetween(cell.above);
                return;
            }
        }
        throw new Error('could not create the maze because after '+trial+' did not find any place for the stairs requirements');
    },

    randomStairDown(floor){
        let dir, opdir;
        for(dir of Direction.shuffle())
        {
            opdir = Direction.mirror(dir);
            let trial, trials = 0;
            for(trial of range(0, 20))
            {
                let cell = floor.randomCell();
                cell.rfstair = cell.rfstair || { stairSpace: false };
                let backStair = cell.neighbour(opdir);
                let frontStair = cell.below.neighbour(dir);
                if (cell.rfstair.stairSpace)
                    continue;
                if (! cell.below || ! backStair || ! frontStair)
                    continue;
                if (cell.below.rfstair && cell.below.rfstair.stairSpace)
                    continue;
                if (backStair.rfstair && backStair.rfstair.stairSpace)
                    continue;
                if (frontStair.rfstair && frontStair.rfstair.stairSpace)
                    continue;
                cell.rfstair = { stairSpace: true };
                cell.below.rfstair = { stairSpace: true };
                frontStair.rfstair = { stairSpace: true };
                backStair.rfstair = { stairSpace: true };
                cell.el.classList.add('stair-down');
                cell.el.classList.add('stair-down-'+dir);
                cell.el.classList.add('dont-open');
                cell.below.el.classList.add('stair-up');
                cell.below.el.classList.add('stair-up-'+opdir);
                cell.below.el.classList.add('dont-open');
                backStair.openBetween(cell);
                frontStair.openBetween(cell.below);
                return;
            }
        }
        throw new Error('could not create the maze because after '+trial+' did not find any place for the stairs requirements');
    },

};