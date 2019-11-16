# Restriction-first Maze Generator
A Restriction-first approach to generate multi-floor mazes.

## Play now

Use arrow keys or ASDW to walk in the maze. No objective is set by now, but try to go towards the first floor and reach the last from there! :)

Select a theme to play:

- [No theme](https://ezaca.github.io/restriction-first-maze-generator/game.html)
- [Ocean](https://ezaca.github.io/restriction-first-maze-generator/game.html#ezaca/ocean)

-----

## Restriction First Multi-Level Maze Generator Algorithm

This repository presents a method for generating multi-level mazes interconnected through stairs, portals or other types of connections.

It features an unfinished browser game in HTML/CSS/Javascript, without any backend code, which can run directly through the repository.

For ease of code, multiple functions and auxiliary objects were created, and the code is divided into files by subjects.

### Maze generation

The maze is generated with the following steps:

1. Initially, the maze environment is prepared by constructing a table-like structure with the walls fully closed. This structure ensures that we will open only what interests us, while the rest remains inaccessible.

2. The constraint algorithm runs first, placing the stairs that descend from the central floor to the first, and the stairs that rise from the central floor to the last. Whenever a stair is placed on one floor, the opposite is placed on the floor it connects.

    1. Before inserting the stair, the entire region it will occupy (two blocks on each connected floor) is checked. If another stair has already occupied any of those blocks, another position must be randomized.

    2. When placing the stair, the entire region it occupies is marked so that no other stairs intersect there.

    3. The blocks containing the stairs are marked "don't open" so that the maze never opens them, and the walls are removed from the front of the stairs, allowing entry.

3. After setting the constraints, an ordinary maze generation algorithm begins to open the walls. In our case, we use a modification of Dijkstra's algorithm that randomizes the open list. We start the algorithm in a random position. The algorithm opens all floor cells except those marked "don't open".

4. When the player moves against a stair, it is taken to the floor it connects.

### Current state and future works

* The game has no objective right now! It is demonstrative only and allows a pointless walk.

* For now, once you are on the floor you have access to the whole floor. It may require some extra effort to limit access to all areas on each floor, requiring navigation through the stairs.

* There is only one maze generator algorithm, and restriction-first is focused on stairs.

* Only one layout is available right now, more can be implemented!

* There is a limited set of themes, which can be increased.

-----

Thank you for your interest in the project! Feel free to download, fork and discuss the project. Are you having any problem? Contact me on the Issues tab.
