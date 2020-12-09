'use strict';

function DomElement(selector, height, width, bg, fontSize, text){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;

    this.creatElem = function(){
        selector.trim();
        if(this.selector[0] === '.'){
            let div = document.createElement('div');
            div.className = this.selector;
            div.textContent = this.text;
            div.style.height = this.height + 'px';
            div.style.width = this.width + 'px';
            div.style.background = this.bg;
            div.style.fontSize = this.fontSize + 'px';
            div.innerHTML = text;
            document.body.append(div);

        } else if(this.selector[0] === '#'){
            let p = document.createElement('p');
            p.id = this.selector;
            p.textContent = this.text;
            p.style.height = this.height + 'px';
            p.style.width = this.width + 'px';
            p.style.background = this.bg;
            p.style.fontSize = this.fontSize + 'px';
            p.innerHTML = text;
            document.body.append(p);
        }

    };
}


let crElClass = new DomElement('.elClass', '25', '500', '#99ffcc', '15', 'Привет Мир!!!');
crElClass.creatElem();

let crElID = new DomElement('#elID', '40', '400', '#ff0000', '30', 'Как дела???');
crElID.creatElem();
