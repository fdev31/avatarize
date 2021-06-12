function serieMaker(seed) {
    if (!seed) seed = 42;
    if (seed < 1000) {
        seed *= 1000;
    }
    r = [];
    r.push(seed + Math.floor(seed * 0.5) );
    r.push(Math.floor(seed * 0.5) );
    let s = Math.floor(Math.sqrt(seed));
    r.push(s);
    let strseed = seed.toString();
    let v = parseInt(strseed.substr(strseed.length/2) + strseed.substr(null, strseed.length/2));
    let x = parseInt(strseed.charCodeAt(3) + seed + strseed.charCodeAt(0));
    let z = Math.floor(seed + seed/0.33 + seed*seed);
    r.push(v);
    r.push(x);
    r.push(x+v);
    r.push(Math.floor(x/2)+v);
    r.push(x+s);
    r.push(v+s);
    r.push(Math.floor(seed/s));
    r.push(z);
    r.push(z-s);
    r.push(z-x);
    r.push(z+x+s);
    r.push(z+x+s+v);
    return r;
}

function getMagicIndex(array) {
    return array[Math.floor(Math.random()*array.length)];
}

class Avatar {
    constructor(domRef) {
        this._ref = domRef;
        this.random();
    }
    asObject() {
        let r = {};
        for (let k of Object.keys(this)) {
            if (k[0] != '_') r[k] = this[k];
        }
        return r;
    }
    asArray() {
        return Object.values(this.asObject())
    }
    asString() {
        return this.asArray().join(':');
    }
    fromName(name) {
        let seed = [];
        for (let i=0; i<name.length; i++)
            seed.push(name.charCodeAt(i));
        seed = parseInt(seed.join(''));
        let serie = serieMaker(seed);

        this.skincolor        = skins[serie[0]%(skins.length)];
        this.eyes             = eyes[serie[1]%(eyes.length)];
        this.eyebrows         = eyebrows[serie[2]%(eyebrows.length)];
        this.mouth            = mouths[serie[3]%(mouths.length)];
        this.hairstyle        = hairstyles[serie[4]%(hairstyles.length)];
        this.haircolor        = haircolors[serie[5]%(haircolors.length)];
        this.facialhair       = facialhair[serie[6]%(facialhair.length)];
        this.clothes          = clothes[serie[7]%(clothes.length)];
        this.glasses          = glasses[serie[9]%(glasses.length)];
        this.glassopacity     = 0.1*(serie[10]%10);
        this.tatoos           = tattoos[serie[11]%(tattoos.length)];
        this.accesories       = accesories[serie[12]%(accesories.length)];
        this.fabriccolors     = fabriccolors[serie[13]%(fabriccolors.length)];
        this.update();
    }
    debug() {
       console.log('skins',  this.skincolor );
       console.log('eyes',  this.eyes );
       console.log('eyebrows',  this.eyebrows );
       console.log('mouths',  this.mouth );
       console.log('hairstyles',  this.hairstyle );
       console.log('haircolors',  this.haircolor );
       console.log('facialhair',  this.facialhair );
       console.log('clothes',  this.clothes );
       console.log('glasses',  this.glasses );
       console.log('glassOp', this.glassopacity);
       console.log('tattoos',  this.tatoos );
       console.log('accesories',  this.accesories );
       console.log('fabriccolors',  this.fabriccolors );
    }
    random() {
        this.skincolor = getMagicIndex(skins);
        this.eyes = getMagicIndex(eyes);
        this.eyebrows = getMagicIndex(eyebrows);
        this.mouth = getMagicIndex(mouths);
        this.hairstyle = getMagicIndex(hairstyles);
        this.haircolor = getMagicIndex(haircolors);
        this.facialhair = getMagicIndex(facialhair);
        this.clothes = getMagicIndex(clothes);
        this.glasses = getMagicIndex(glasses);
        this.glassopacity = Math.random();
        this.tatoos = getMagicIndex(tattoos);
        this.accesories = getMagicIndex(accesories);
        this.fabriccolors = getMagicIndex(fabriccolors);
        this.update();
        return this;
    }
    update() {
        let o = document.querySelector(this._ref);
        setAttr(o.querySelectorAll(".skin #body"), "fill","#"+this.skincolor);
        hide(o.querySelectorAll("#eyes g"));
        show(o.querySelectorAll("#eyes g."+this.eyes));
        hide(o.querySelectorAll("#eyebrows g"));
        show(o.querySelectorAll("#eyebrows ."+this.eyebrows));
        hide(o.querySelectorAll("#mouths g"));
        show(o.querySelectorAll("#mouths g."+this.mouth));
        hide(o.querySelectorAll("#hair_front g"));
        hide(o.querySelectorAll("#hair_back g"));
        show(o.querySelectorAll("#hair_front g."+this.hairstyle));
        show(o.querySelectorAll("#hair_back g."+this.hairstyle));
        let color = this.haircolor.split('_');
        setAttr( o.querySelectorAll("#hair_front ."+this.hairstyle+" .tinted"), "fill","#"+color[0]);
        setAttr( o.querySelectorAll("#hair_back ."+this.hairstyle+" .tinted"), "fill","#"+color[1]);
        setAttr( o.querySelectorAll("#facialhair g .tinted"), "fill","#"+color[2]);
        hide(o.querySelectorAll("#facialhair g"));
        show(o.querySelectorAll("#facialhair g."+this.facialhair));
        hide(o.querySelectorAll("#clothes g"));
        show(o.querySelectorAll("#clothes g."+this.clothes));
        hide(o.querySelectorAll("#glasses g"));
        show(o.querySelectorAll("#glasses g."+this.glasses));
        setAttr(o.querySelectorAll(".glass"), "fill-opacity",this.glassopacity);
        setAttr(o.querySelectorAll("#clothes g .tinted", "fill","#"+this.fabriccolors));
        hide(o.querySelectorAll("#tattoos g"));
        show(o.querySelectorAll("#tattoos g."+this.tatoos));
        hide(o.querySelectorAll("#accesories g"));
        show(o.querySelectorAll("#accesories g."+this.accessories));
    }
}

