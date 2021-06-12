function isInvariant(text) {
    return (text[text.length-1] == 's' || text == 'facialhair')
}

function getMagicIndex(propname, db) {
    let collectionname = isInvariant(propname) ? propname : (propname + 's');
    return Math.floor(Math.random()*db[collectionname].length);
}

class Avatar {
    constructor(domRef) {
        this._ref = domRef;
        this.db = {skincolors, fabriccolors, haircolors, accessories,
            clothes , eyebrows , eyes , facialhair , glasses , hairstyles ,
            mouths , tattoos};
        this.random();
    }
    getKeys() {
        return [ 'skincolor', 'eyes', 'eyebrows', 'mouth', 'hairstyle', 'haircolor', 'facialhair',
            'clothes', 'glasses', 'glassopacity', 'tattoo', 'accessories', 'fabriccolor'];
    }
    asObject() {
        let r = {};
        for (let k of this.getKeys())
            r[k] = this.getValue(k);
        return r;
    }
    asArray() {
        return this.getKeys().map( (k) => this.getIndex(k))
    }
    asString() {
        return this.asArray().join(':');
    }
    fromName(name) {
        if (name == '') name = 'ouf';
        let vals = [];
        let src_idx = 0;
        for (let k of this.getKeys()) {
            let v = name.charCodeAt(src_idx);
            src_idx++;
            if (src_idx >= name.length) src_idx = 0;
            vals.push(v);
        }
        let total = Array.from(name).map((c) => c.charCodeAt(0)-60).reduce((a,b)=>a+b);
        for (let i=0; i<vals.length; i++) vals[i] += (total - i);
        let i=0;
        for (let k of this.getKeys()) {
            console.log(k, vals[i]);
            this[k] = vals[i++];
        }
        this.update();
    }
    getIndexValue(attrName) {
        if (attrName == 'glassopacity') return [this[attrName]%10, (this[attrName]%10)*0.1];
        let choiceName = isInvariant(attrName) ? attrName : (attrName + 's');
        let values = this.db[choiceName];
        let i = this[attrName]%values.length
        return [i, values[i]];
    }
    getIndex(attrName) {
        return this.getIndexValue(attrName)[0];
    }
    getValue(attrName) {
        return this.getIndexValue(attrName)[1];
    }
    debug() {
        let o = this.asObject();
        for (let k of Object.keys(o)) {
            console.log(k, this[k], this.getValue(k));
        }
    }
    random() {
        for (let k of this.getKeys())
            if (k != 'glassopacity')
                this[k] = getMagicIndex(k, this.db)
        this.glassopacity = Math.floor(Math.random() * 10);
        this.update();
        return this;
    }
    asCode() {
        return parseInt(this.asArray().join('')).toString(36);
    }
    fromCode(code) {
        code = parseInt(code, 36);
        let keys = this.getKeys();
        let i =0;
        for (let c of code.toString()) {
            console.log(c);
            this[keys[i]] = parseInt(c);
            i++;
        }
        this.update();
    }
    update() {
        let o = document.querySelector(this._ref);
        let d = this.asObject();
        setAttr(o.querySelectorAll(".skin #body"), "fill",`#${d.skincolor}`);
        hide(o.querySelectorAll("#eyes g"));
        show(o.querySelectorAll(`#eyes g.${d.eyes}`));
        hide(o.querySelectorAll("#eyebrows g"));
        show(o.querySelectorAll(`#eyebrows .${d.eyebrows}`));
        hide(o.querySelectorAll("#mouths g"));
        show(o.querySelectorAll(`#mouths g.${d.mouth}`));
        hide(o.querySelectorAll("#hair_front g"));
        hide(o.querySelectorAll("#hair_back g"));
        show(o.querySelectorAll(`#hair_front g.${d.hairstyle}`));
        show(o.querySelectorAll(`#hair_back g.${d.hairstyle}`));
        let color = d.haircolor.split('_');
        setAttr( o.querySelectorAll(`#hair_front .${d.hairstyle} .tinted`), "fill","#"+color[0]);
        setAttr( o.querySelectorAll(`#hair_back .${d.hairstyle} .tinted`), "fill","#"+color[1]);
        setAttr( o.querySelectorAll("#facialhair g .tinted"), "fill","#"+color[2]);
        hide(o.querySelectorAll("#facialhair g"));
        show(o.querySelectorAll(`#facialhair g.${d.facialhair}`));
        hide(o.querySelectorAll("#clothes g"));
        show(o.querySelectorAll(`#clothes g.${d.clothes}`));
        hide(o.querySelectorAll("#glasses g"));
        show(o.querySelectorAll(`#glasses g.${d.glasses}`));
        setAttr(o.querySelectorAll(".glass"), "fill-opacity", d.glassopacity);
        setAttr(o.querySelectorAll("#clothes g .tinted", "fill",`#${d.fabriccolors}`));
        hide(o.querySelectorAll("#tattoos g"));
        show(o.querySelectorAll("#tattoos g."+d.tatoos));
        hide(o.querySelectorAll("#accessories g"));
        show(o.querySelectorAll("#accessories g."+d.accessories));
    }
}

