// init
let body = d3.select('body');
let content = body.append('div')
    .style('border', '1px solid blue')
    .style('width', '100%')
    .classed('parent', true);

// container for svg
let svgDiv = content.append('div')
    .style('border', '1px dashed black')
    .style('width', '80%')
    .classed('svg-container', true);
svgDiv.classed('align', true);

let sideBar = content.append('div')
    .style('border', '1px solid black')
    .style('padding-left', '15px')
    .style('overflow-y', 'scroll');
sideBar.classed('align', true);

// responsive svg
let svg = svgDiv
    .append('svg');
svg.attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '0 0 3840 2160')
    .classed('svg-content-responsive', true);

 // returns the combined horizontal margin, border, and padding of a DOM element
let getHorizontalOffsets = (el) => {
    let slct = d3.select(el);
    let margin = parseInt(slct.style('margin-left')) + parseInt(slct.style('margin-right'));
    let border = parseInt(slct.style('border-left')) + parseInt(slct.style('border-right'));
    let padding = parseInt(slct.style('padding-left')) + parseInt(slct.style('padding-right'));
    return margin + border + padding;
}

 // returns the combined horizontal margin, border, and padding of a DOM element
 let getVerticalOffsets = (el) => {
    let slct = d3.select(el);
    let margin = parseInt(slct.style('margin-top')) + parseInt(slct.style('margin-bottom'));
    let border = parseInt(slct.style('border-top')) + parseInt(slct.style('border-bottom'));
    let padding = parseInt(slct.style('padding-top')) + parseInt(slct.style('padding-bottom'));
    return margin + border + padding;
}

let redraw = () => { // deals with window resize
    sideBar.style('height', svgDiv.node().clientHeight + 'px');
    // extra 1 for good measure
    let offsets = 1 + getHorizontalOffsets(d3.select('body').node()) + getHorizontalOffsets(content.node()) +
        getHorizontalOffsets(sideBar.node()) + 
        parseInt(svgDiv.style('margin-left')) + parseInt(svgDiv.style('margin-right'));
    sideBar.style('width', (document.documentElement.clientWidth - svgDiv.node().clientWidth - offsets) + 'px')
}


redraw();
window.addEventListener('resize', redraw);

let type_space = {
    'encounter_mjr': 80,
    'encounter': 40,
    'shrine': 80,
    'key': 30
};

let phase_colors = [
    'forestgreen',
    'gold',
    'orangered'
];

let image_dir = 'images/';
let item_icons = {
    ako: "ako.png", //
    azurite: "azurite.png", //
    bead: "bead.png", // 
    bead_hug: "bead_hug.png", // 
    gaichiin: "gaichiin.png", //
    gokan: "gokan.png", //
    malcontent: "malcontent.png", //
    scroll: "scroll.png", //
    seed: "seed.png", //
    tanto: "tanto.png", // 
    ungo: "ungo.png", //
    yashi: "yashi.png" //
};

// which phases to show initially
let showing = 3;

let drawMap = () => {
    //clear old images
    svg.html('');
    // begin drawing updated map
    // background
    svg.append('image')
        .attr('xlink:href', 'images/background.jpg');
    // add an arrowpoint marker def for later
    let defs = svg.append('defs');
    let arrowMarker = defs.append('marker');
    arrowMarker.attr('id', 'arrow')
        .attr('markerWidth', 20)
        .attr('markerHeight', 40)
        .attr('refX', 0)
        .attr('refY', 3)
        .attr('orient', 'auto')
        .attr('markerUnits', 'strokeWidth')
        .attr('viewBox', '0 0 20 20');
    let arrowMarkerPath = arrowMarker.append('path');
    arrowMarkerPath.attr('d', 'M0,0 L0,6 L9,3 z')
        .attr('fill', 'forestgreen'); // color is static b/c there happens to be only one phase where there are 1-way paths. if this changes, need to update


    for(let i = 0; i < connections.length; i++){
        for(let j = 0; j < connections[i].length; j++){
            let c = connections[i][j];
            let n1 = nodes[i];
            let n2 = nodes[c.id];
            if(showing < n1.phase || showing < n2.phase){
                continue;
            }
            // shrink the lines towards the center to free up space near nodes
            let x1 = n1.x;
            let y1 = n1.y;
            let x2 = n2.x;
            let y2 = n2.y;
            let dx = (x2 - x1) == 0 ? 0.00001 : (x2 - x1);
            let dy = y2 - y1;
            let m = dy/dx;
            let a = (Math.atan(m) % (2*Math.PI));
            a = a < 0 ? 2*Math.PI + a : a;
            let ld1 = n1.space ? n1.space : type_space[n1.type];
            let ld2 = (n2.space ? n2.space : type_space[n2.type]) + (c.t == 1 ? 50 : 0);
            let x1_d = Math.cos(a)*ld1;
            let y1_d = Math.sin(a)*ld1;
            let x2_d = Math.cos(a)*ld2;
            let y2_d = Math.sin(a)*ld2;
            if(y1 > y2){ // corrects longer lines
                m = -m;
            }
            let x1n = m > 0 ? x1 + x1_d : x1 - x1_d;
            let y1n = m > 0 ? y1 + y1_d : y1 - y1_d;
            let x2n = m > 0 ? x2 - x2_d : x2 + x2_d;
            let y2n = m > 0 ? y2 - y2_d :y2 + y2_d;
            // done shrinking, now draw them
            let line = svg.append('line')
                .attr('x1', x1n)
                .attr('y1', y1n)
                .attr('x2', x2n)
                .attr('y2', y2n)
                .style('stroke', phase_colors[Math.max(n1.phase, n2.phase)-1])
                .style('stroke-width', 5);
            // if not the default 2-way line type
            if(c.t == 1 || c.t == 2){
                line.attr('stroke-dasharray', '5, 5');
                if(c.t == 1){
                    line.attr('marker-end', 'url(#arrow)');
                }
            }
        }
    }
    for(let i = 0; i < nodes.length; i++){
        let n = nodes[i];
        let type = n.type;
        let phase = n.phase;
        let x = n.x;
        let y = n.y;
        let name = n.name;
        if(showing < phase){
            continue;
        }
        if(type == 'shrine'){
            let img = new Image();
            img.onload = () => {
                let height = img.height;
                let width = img.width;
                svg.append('image')
                    .attr('x', x - width/2)
                    .attr('y', y - height/2 - 25) // 25 is an arbitrary offset for style
                    .attr('xlink:href', img.src);
            };
            img.src = image_dir + 'shrine_discovered.png';
            svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', type_space['shrine'])
                .attr('fill', 'none')
                .attr('stroke-width', 5)
                .attr('stroke', 'LightBlue');
        }else if(type == 'encounter'){
            svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 40)
                .attr('opacity', 0.5)
                .attr('fill', phase_colors[phase - 1]);
            if(n.items && n.items.length > 0 && (true || n.name == 'KNIGHT' || n.name == 'O\'RIN')){
                let item_div = svg.append('g');
                let total_width = 0;
                for(let imd = 0; imd < n.items.length; imd++){
                    let item = n.items[imd];
                    let url = image_dir + item_icons[item];
                    let img = new Image();
                    img.onload = () => {
                        let width = parseInt(img.width);
                        item_div.append('image')
                            .attr('xlink:href', url)
                            .attr('x', total_width);
                        total_width = total_width + width;
                        item_div.attr('transform', 'translate(' + (x - 0.5*total_width) + ',' + (y - 5) + ')');
                    };
                    img.src = url;
                }
            }
        }else if(type == 'encounter_mjr'){
            svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 80)
                .attr('opacity', 0.5)
                .attr('fill', phase_colors[phase - 1]);
        }else if(type == 'key'){
            let img = new Image();
            img.onload = () => {
                let height = img.height;
                let width = img.width;
                svg.append('image')
                    .attr('x', x - width/2)
                    .attr('y', y - height/2) // 25 is an arbitrary offset for style
                    .attr('xlink:href', img.src);
            };
            img.src = image_dir + 'key.png';
        }
        // create the labels
        let text = svg.append('text')
            .attr('x', x - 100)
            // calculate x and y offsets based on node type and other attributes
            .attr('y', y + (type == 'shrine' ? 20 : (type == 'encounter' ? - (5 + 30*(name.length/10)) : 0)))
            .attr('font-size', 25);
        text.text(name);
        let wrap = d3.textwrap().bounds({height: 200, width: 200});
        text.call(wrap);
    }
}

drawMap();

// build the side bar
sideBar.style('background', 'lightgray');
let controls = sideBar.append('div');
controls.append('h1').text('Phases:');
let phase_form = controls.append("form");
let p1cb = phase_form.append('input')
    .attr('type', 'radio')
    .attr('name', 'phase')
    .property('checked', showing == 1);
    p1cb.on('change', () => {
        showing = 1;
        drawMap();
    });
    phase_form.append('label').text('Phase 1');
let p2cb = phase_form.append('input')
    .attr('type', 'radio')
    .attr('name', 'phase')
    .property('checked', showing == 2);
    p2cb.text('Phase 2');
    p2cb.on('change', () => {
        showing = 2;
        drawMap();
    });
    phase_form.append('label').text('Phase 2');
let p3cb = phase_form.append('input')
    .attr('type', 'radio')
    .attr('name', 'phase')
    .property('checked', showing == 3);
    p3cb.text('Phase 3');
    p3cb.on('change', () => {
        showing = 3;
        drawMap();
    });
    phase_form.append('label').text('Phase 3');
controls.append('h1').text('Discovered:');
let index = {
    'Ashina Outskirts': [24, 22, 21, 16, 14, 13, 12],
    'Ashina Castle': [39, 36, 32, 31, 26, 40, 68, 29, 55, 42],
    'Abandoned Dungeon': [72, 56],
    'Senpou Temple, Mt. Kongo': [67, 64, 63, 58, 59, 61, 57],
    'Sunken Valley': [44, 46, 48, 51, 52, 54],
    'Ashina Depths': [74, 75, 79, 83, 84, 87],
    'Fountainhead Palace': [88, 90, 91, 93, 94, 98, 99, 100, 101],
    'Hirata Estate': [11, 10, 7, 6, 3, 0]
};
let shrine_div = controls.append('div');
for(let key in index){
    let val = index[key];
    let zone = shrine_div.append('div');
    zone.append('text').text(key).style('font-weight', '900');
    for(let i = 0; i < val.length; i++){
        let n = nodes[val[i]];
        zone.append('p').text(n.name)
    }
}