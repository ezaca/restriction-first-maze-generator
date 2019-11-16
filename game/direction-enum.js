var Direction = ['n','e','s','w'];

Direction.toInt = function(dir){
    Direction.indexOf(dir);
}

Direction.fromInt = function(num){
    return Direction[num|0];
}

Direction.rand = function(){
    return Direction[rand(0,4)];
}

Direction.shuffle = function(){
    return shuffle([...Direction]);
}

Direction.mirror = function(dir){
    switch(dir){
        case 'n': return 's';
        case 's': return 'n';
        case 'w': return 'e';
        case 'e': return 'w';
        case 0: return 2;
        case 2: return 0;
        case 1: return 3;
        case 3: return 1;
        default: throw new TypeError('invalid direction: '+dir);
    }
}

Direction.fromCoord = function(x,y){
    if (! x && ! y)
        throw new Error('x=0 and y=0 has no relative direction, as it\'s the zero coordinate');
    if (y === 0)
    {
        if (x > 0) return 'e';
        if (x < 0) return 'w';
        throw new Error('diagonal directions are not supported');
    } else
    if (x === 0)
    {
        if (y > 0) return 's';
        if (y < 0) return 'n';
        throw new Error('diagonal directions are not supported');
    } else
        throw new Error('diagonal directions are not supported');
}