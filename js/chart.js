// init
let body = d3.select('body');
let content = body.append('div')
    .style('width', '100%')
    .classed('parent', true);

// container for svg
let svgDiv = content.append('div')
    .style('width', '80%')
    .classed('svg-container', true);
svgDiv.classed('align', true);

let sideBar = content.append('div')
    .style('padding-left', '15px')
    .style('padding-right', '15px')
    .style('padding-top', '15px')
    .style('overflow-y', 'scroll');
sideBar.classed('align', true);

// responsive svg
let svg = svgDiv
    .append('svg');
svg.attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '0 0 3840 2160')
    .classed('svg-content-responsive', true);

// an outline for hovering over the index
let outline = svg.append('circle')
                .attr('r', 140)
                .style('fill', 'none')
                .style('stroke-width', 10)
                .style('stroke', 'black')
                .style('display', 'none');

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
    sideBar.style('height', (svgDiv.node().clientHeight - getVerticalOffsets(sideBar.node())) + 'px');
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
let showing = 1;

let should_display = (id) => {
    let display_self = discovered[id];
    // if this node is discovered, then display it
    if(!display_self){
        // if this node is revealed by a discovered node, then display this node
        let revealed_by = nodes[id].revealed_by;
        if(revealed_by){
            for(let r = 0; r < revealed_by.length; r++){
                if(discovered[revealed_by[r]]){
                    return true;
                }
            }
        }
        for(let d = 0; d < discovered.length; d++){
            // if we are on ourself or the node hasn't been discovered, then move on to the next node
            if(d == id || !discovered[d]){
                continue;
            }
            let cx = connections[d];
            for(let c = 0; c < cx.length; c++){
                if(cx[c].id == id){// if something that connects to this node is discovered, then display this node (depending on connection type)
                    if(cx[c].t <= 1){
                        return true;
                    }
                }
            }
        }
        let my_c = connections[id];
        for(let c = 0; c < my_c.length; c++){
            if(discovered[my_c[c].id]){
                //if we are connected to a discovered node, then display this node (depending on connection type)
                if(my_c[c].t == 0){
                    return true;
                }
            }
        }
    }else{
        return true;
    }
}

let drawMap = () => {
    // clear old images
    svg.html('');
    // begin drawing updated map
    // background
    svg.append('image')
        .attr('xlink:href', 'images/background.jpg');
    // make a new outline
    outline = svg.append('circle')
                .attr('r', 140)
                .style('fill', 'none')
                .style('stroke-width', 10)
                .style('stroke', 'black')
                .style('display', 'none');
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
            if((showing < n1.phase || showing < n2.phase) || !should_display(i) || !should_display(c.id)){
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
        // determine if we should display the node
        if(showing < phase || !should_display(i)){
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
let buildSideBar = () => {
    sideBar.html('');
    sideBar.style('background', 'lightgray');
    let show_all = sideBar.append('button');
    show_all.on('click', () => {
        showing = 3;
        for(let i = 0; i < discovered.length; i++){
            if(nodes[i].type == 'shrine'){
                discovered[i] = true;
            }
        }
        drawMap();
        buildSideBar();
    });
    show_all.text('Show All');
    let hide_all = sideBar.append('button');
    hide_all.on('click', () => {
        showing = 1;
        for(let i = 0; i < discovered.length; i++){
            discovered[i] = false;
        }
        discovered[12] = true;
        drawMap();
        buildSideBar();
    });
    hide_all.text('Hide All');
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
            buildSideBar();
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
            buildSideBar();
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
            buildSideBar();
        });
        phase_form.append('label').text('Phase 3');
    controls.append('h1').text('Discovered:');

    let shrine_div = controls.append('div');
    for(let key in index){
        let val = index[key];
        let display_header = false; // hide areas that are not in the current phase
        for(let i = 0; i < val.length; i++){
            let n = nodes[val[i]];
            if(n.phase <= showing){
                display_header = true;
                break;
            }
        }
        if(!display_header){
            continue;
        }
        let zone_header = shrine_div.append('p').text('+ ' + key)
            .style('font-weight', '900').style('cursor', 'pointer');
        let zone = shrine_div.append('div');
        zone.style('margin-bottom', '20px')
            .style('display', 'none');

        // toggle displaying a zone's shrine index on click
        zone_header.on('click', () => {
            let cur_disp = zone.style('display');
            let new_disp = cur_disp == 'none' ? '' : 'none';
            zone.style('display', new_disp);
            zone_header.text((new_disp == 'none' ? '+ ' : '- ') + key);
        });

        for(let i = 0; i < val.length; i++){
            let n = nodes[val[i]];
            let shrine = zone.append('div');
            shrine.style('padding-left', '10px');
            let img = shrine.append('img')
                .attr('src', image_dir + (discovered[val[i]] ? 'shrine_discovered.png' : 'shrine_undiscovered.png'))
                .attr('height', 30);
            img.style('cursor', 'pointer').style("pointer-events","visible");
            let txt = shrine.append('text')
                .text(n.name);
            txt.style('cursor', 'pointer').style("pointer-events","visible");

            let mouseover = () => {
                console.log('ya');
                outline.attr('cx', n.x)
                outline.attr('cy', n.y)
                outline.style('display', '');
            }

            let mouseout = () => {
                outline.style('display', 'none');
            }

            let click = () => {
                discovered[val[i]] = !discovered[val[i]];
                img.attr('src', image_dir + (discovered[val[i]] ? 'shrine_discovered.png' : 'shrine_undiscovered.png'));
                drawMap();
                save_to_clip.text('Save to Clipboard');
            };

            txt.on('click', click);
            img.on('click', click);
            txt.on('mouseover', mouseover);
            img.on('mouseover', mouseover);
            txt.on('mouseout', mouseout);
            img.on('mouseout', mouseout);
        }
    }

    controls.append('h1').text('Save/Load Data');
    let data = {
        'discovered': discovered,
        'phase': showing
    };
    controls.append('p').text('Copy to clipboard').style('font-weight', '900');
    let save_to_clip = controls.append('button');
    save_to_clip.style('width', '95%');
    save_to_clip.text('Save to Clipboard');
    save_to_clip.on('click', () => {
        const el = document.createElement('textarea');
        el.value = JSON.stringify(data);
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        save_to_clip.text('Saved!');
        redraw();redraw(); // call it twice as a temp workaround
    });
    controls.append('p').text('Load from clipboard').style('font-weight', '900');
    let load_from_clip = controls.append('input');
    load_from_clip.attr('type', 'text');
    let exe_load_clip = controls.append('button');
    exe_load_clip.text('Load');
    exe_load_clip.style('display', 'inline-block');
    exe_load_clip.on('click', () => {
        try{
            let parsed = JSON.parse(load_from_clip.property('value'));
            discovered = parsed.discovered;
            showing = parsed.phase;
            drawMap();
            buildSideBar();
        }catch(error){
            console.log("Bad json parse" + error);
        }
    });
}
buildSideBar();
