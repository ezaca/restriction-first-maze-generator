var DOM = {
    /**
     * Usage:
     *   var element = newElement('div#myDivID.class1.class2.class3');
     */
    create(parent, pattern){
        let m, rgx = /([-\w]+)|#([-\w]+)|\.([-\w]+)|\[([-\w]+)="((?:\\.|[^"\\\n\r])+)"\]/y;
        let el;
        while(m = rgx.exec(pattern))
            if (m[1]) el = document.createElement(m[1].toUpperCase());
            else if (m[2]) el.setAttribute('id', m[2]);
            else if (m[3]) el.classList.add(m[3]);
            else if (m[4]) el.setAttribute(m[4],m[5]);
        if (el && parent)
            parent.appendChild(el);
        return el || $throw('invalid pattern "'+pattern);
    },

    byID(id){
        return document.getElementById(id);
    },

    cssVar(name, value){
        if (value === undefined)
            return getComputedStyle(document.documentElement).getPropertyValue(name);
        document.documentElement.style.setProperty(name, value);
    },

    getPosition(el){
        let top = 0, left = 0;
        do {
            top += el.offsetTop  || 0;
            left += el.offsetLeft || 0;
            el = el.offsetParent;
        } while(el);
        return {top,left};
    },

    setPosition(el, pos){
        if(pos.top !== undefined) el.style.top = (pos.top|0) + 'px';
        if(pos.left !== undefined) el.style.left = (pos.left|0) + 'px';
        if(pos.width !== undefined) el.style.width = (pos.width|0) + 'px';
        if(pos.height !== undefined) el.style.height = (pos.height|0) + 'px';
        if(pos.bottom !== undefined) el.style.bottom = (pos.bottom|0) + 'px';
        if(pos.right !== undefined) el.style.right = (pos.right|0) + 'px';
    },

    findStyle(selector){
        for(var stylesheet of document.styleSheets){
            for(var rule of stylesheet.rules){
                if(rule.selectorText === selector)
                    return rule;
            }
        }
    }

};