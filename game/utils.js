function array(length, fill){
    return (new Array(length)).fill(fill);
}

function $throw(message){
    throw new Error(message);
}

function* range(minInclusive, maxExclusive){
    let i;
    for(i=minInclusive; i<maxExclusive; i++)
        yield i;
}

function* irange(maxInclusive, minInclusive){
    let i;
    for(i=maxInclusive; i>=minInclusive; i--)
        yield i;
}

function rand(minInclusive, maxExclusive){
    return Math.random() * (maxExclusive - minInclusive) + minInclusive | 0;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function $(selector, parent){
    return (parent || document).querySelector(selector);
}

function $$(selector, parent){
    let items = (parent || document).querySelectorAll(selector);
    let func = lambda=>items.forEach(lambda);
    func.array = items;
    func.length = items.length;
    func.addClass = (name)=>items.forEach(i=>i.classList.add(name)),func;
    func.removeClass = (name)=>items.forEach(i=>i.classList.remove(name)),func;
    return func;
}