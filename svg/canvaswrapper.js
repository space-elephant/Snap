function saveMorph(morph, width, height) {
    var ctx = new C2S();
    width = width || 500;
    height = height || 500;
    morph.fullDrawOn(ctx, new Rectangle(0, 0, width, height));
    return ctx.getSerializedSvg(true);
}

function saveMorphOutline(morph, width, height) {
    var ctx = new C2S();
    width = width || 500;
    height = height || 500;
    morph.drawOn(ctx, new Rectangle(0, 0, width, height));
    return ctx.getSerializedSvg(true);
}

function saveString(string, file) {
    saveAs(new Blob([string]), file);
}

function example() {
    block = new HatBlockMorph();
    block.setSelector('receiveGo');
    saveString(saveMorph(block), 'receiveGo.svg');
}
