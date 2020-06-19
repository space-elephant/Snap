Morph.prototype.developersMenu = function () {
    // 'name' is not an official property of a function, hence:
    var world = this.world instanceof Function ? this.world() : this.world,
        userMenu = this.userMenu() ||
            (this.parent && this.parent.userMenu()),
        menu = new MenuMorph(this, this.constructor.name ||
            this.constructor.toString().split(' ')[1].split('(')[0]);
    if (userMenu) {
        menu.addMenu('user features', userMenu);
        menu.addLine();
    }
    menu.addItem(
        "color...",
        () => {
            this.pickColor(
                menu.title + localize('\ncolor:'),
                this.setColor,
                this,
                this.color
            );
        },
        'choose another color \nfor this morph'
    );
    menu.addItem(
        "transparency...",
        () => {
            this.prompt(
                menu.title + localize('\nalpha\nvalue:'),
                this.setAlphaScaled,
                this,
                (this.alpha * 100).toString(),
                null,
                1,
                100,
                true
            );
        },
        'set this morph\'s\nalpha value'
    );
    menu.addItem(
        "resize...",
        'resize',
        'show a handle\nwhich can be dragged\nto change this morph\'s' +
            ' extent'
    );
    menu.addLine();
    menu.addItem(
        "duplicate",
        () =>  this.fullCopy().pickUp(this.world()),
        'make a copy\nand pick it up'
    );
    menu.addItem(
        "pick up",
        'pickUp',
        'detach and put \ninto the hand'
    );
    menu.addItem(
        "attach...",
        'attach',
        'stick this morph\nto another one'
    );
    menu.addItem(
        "move...",
        'move',
        'show a handle\nwhich can be dragged\nto move this morph'
    );
    menu.addItem(
        "inspect...",
        'inspect',
        'open a window\non all properties'
    );
    menu.addItem(
        "pic...",
        () => window.open(this.fullImage().toDataURL()),
        'open a new window\nwith a picture of this morph'
    );
    menu.addItem(
        "svg pic...",
        () => saveString(saveMorph(this), 'morph.svg'),
        'saves the morph as an svg'
    );
    menu.addItem(
        "outline svg pic...",
        () => saveString(saveMorphOutline(this), 'outline.svg'),
        'saves the morph without\nany of its children'
    );
    menu.addLine();
    if (this.isDraggable) {
        menu.addItem(
            "lock",
            'toggleIsDraggable',
            'make this morph\nunmovable'
        );
    } else {
        menu.addItem(
            "unlock",
            'toggleIsDraggable',
            'make this morph\nmovable'
        );
    }
    menu.addItem("hide", 'hide');
    menu.addItem("delete", 'destroy');
    if (!(this instanceof WorldMorph)) {
        menu.addLine();
        menu.addItem(
            "World...",
            () => world.contextMenu().popUpAtHand(world),
            'show the\nWorld\'s menu'
        );
    }
    return menu;
};
