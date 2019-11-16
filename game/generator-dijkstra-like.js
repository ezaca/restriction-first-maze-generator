/**
 * RULES OF THE GENERATOR ALGORITHMS
 * 
 * Maze generator algorithms must be objects with a "generate" method receiving
 * a MazeManager object.
 *
 * The algorithm must fill the entire maze, allowing access from any cell to
 * any cell of the maze. If a cell is omitted and remains blocked, it must not
 * be a divisor for the rest of the maze, which must be entirely connected.
 *
 * It also must prefix any attribute or class required in the generation, trying
 * to not polute the maze and, better, removing the attributes and classes after
 * the generation.
 * 
 * The maze generation algorithm should be agnostic in relation to the floors,
 * amount of floors, link between floors or other restritions and links. It will
 * concetrate its efforts only in the current floor, as it was the only floor.
 *
 * The maze should observe the following classes and adapt its behaviour:
 *
 *      .dont-open      This cell must remain as is, and no wall should be added or removed from it.
 * 
 * The maze required classes (which are not prefixed), and must be set by the
 * algorithm are:
 *
 *      .open           Any open cell that has access to the rest of the maze.
 *      .open-n         A cell open to north (up).
 *      .open-e         A cell open to east (right).
 *      .open-s         A cell open to south (down).
 *      .open-w         A cell open to west (left).
 *
 * Blocked cells remain without any of these classes.
 */

var GeneratorDijkstraLike = {

    generate(floor){
        let openSet = []; // Cells we will visit
        let closed = new Set; // Cells already visited, to prevent visiting again
        openSet.push(floor.randomCell());
        openSet[0].open();
        openSet[0].generator = { parent: null };

        while(openSet.length > 0)
        {
            let current = openSet.pop();
            closed.add(current);

            if (current.generator.parent != null)
                floor.openPath(current, current.generator.parent);

            let neighbours = current.neighbours;
            for(var neighbour of neighbours)
            {
                if (! neighbour || neighbour.dontOpen)
                    continue;
                if (closed.has(neighbour))
                    continue;
                neighbour.generator = {parent: current};
                openSet.push(neighbour);
                shuffle(openSet);
            }
        }
    }

}