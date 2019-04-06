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

let show_undiscovered = false;

let type_space = {
    'encounter_mjr_big': 114.5,
    'encounter_mjr': 87.5,
    'encounter': 40,
    'shrine': 80,
    'key': 30,
    'item': 30,
    'merchant': 10
};

// let accessability = d3.select('#accessability');
// let colors = accessability.append('input');
// let choices = ['Normal']
// colors.

let phase_colors = [
    '#0C481A',
    '#5D56FF',
    '#FFC107'
]

// let phase_colors = [
//     'forestgreen',
//     'gold',
//     'orangered'
// ];

let image_dir = 'images/';
let item_icons = {
    '2az_6ea': '2az_6ea.png',
    '2x_azurite': '2x_azurite.png',
    'ako': "ako.png",
    'axe': 'axe.png',
    'azurite': "azurite.png",
    'bead': "bead.png",
    'bead_1400': 'bead_1400.png',
    'bead_hug': "bead_hug.png",
    'bead_indoor': 'bead_indoor.png',
    'bead_statue': 'bead_statue.png',
    'bead_submerged': 'bead_submerged.png',
    'cracker_500': 'cracker_500.png',
    'fan': 'fan.png',
    'fan_1600': 'fan_1600.png',
    'feather': 'feather.png',
    'finger': 'finger.png',
    'fire': 'fire.png',
    'gaichiin': "gaichiin.png",
    'gokan': "gokan.png",
    'key': 'key_icon.png',
    'malcontent': "malcontent.png",
    'mask_5k': 'mask_5k.png',
    'mask_12': 'mask_12.png',
    'mask_7': 'mask_7.png',
    'sabimaru': 'sabimaru.png',
    'scroll': "scroll.png",
    'scroll_1200': 'scroll_1200.png',
    'seed': "seed.png",
    'seed_1k': 'seed_1k.png',
    'seed_2k': 'seed_2k.png',
    'seed_indoor': 'seed_indoor.png',
    'seed_tree': 'seed_tree.png',
    'shuriken': 'shuriken.png',
    'snake_dry': 'snake_dry.png',
    'snake_fresh': 'snake_fresh.png',
    'spear': 'spear.png',
    'tanto': "tanto.png",
    'ungo': "ungo.png",
    'yashi': "yashi.png",
    'aromatic_branch': 'aromatic_branch.png',
    'shelter_stone': 'shelter_stone.png',
    'palace_lotus': 'divine_lotus.png',
    'fountainhead_incense': 'fountainhead_incense.png'
}

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
        // if this node is revealed by all required nodes, then display this node
        let revealed_by_and = nodes[id].revealed_by_and;
        if(revealed_by_and){
            let all_true = true;
            for(let r = 0; r < revealed_by_and.length; r++){
                if(!discovered[revealed_by_and[r]]){
                    all_true = false;
                    break;
                }
            }
            if(all_true){
                return true;
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
        .attr('fill', phase_colors[0]); // color is static b/c there happens to be only one phase where there are 1-way paths. if this changes, need to update


    for(let i = 0; i < connections.length; i++){
        for(let j = 0; j < connections[i].length; j++){
            let c = connections[i][j];
            let n1 = nodes[i];
            let n2 = nodes[c.id];
            if(!show_undiscovered && ((showing < n1.phase || showing < n2.phase) || !should_display(i) || !should_display(c.id))){
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
            if(discovered[i] && discovered[c.id]){
                line.style('opacity', 0.5);
            }
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
        if(!show_undiscovered && (showing < phase || !should_display(i))){
            continue;
        }

        let click = () => {
            discovered[i] = !discovered[i];
            buildSideBar();
            drawMap();
        };

        if(type == 'shrine'){
            let img = new Image();
            img.onload = () => {
                let height = img.height;
                let width = img.width;
                svg.append('image')
                    .attr('x', x - width/2)
                    .attr('y', y - height/2 - 25) // 25 is an arbitrary offset for style
                    .attr('xlink:href', img.src)
                    .style('cursor', 'pointer')
                    .on('click', click);
            };
            let outln = svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', type_space['shrine'])
                .attr('fill', 'none')
                .attr('stroke-width', 5);
            if(discovered[i]){
                img.src = image_dir + 'shrine_discovered.png';
                outln.style('stroke', 'lightblue');
            }else{
                img.src = image_dir + 'shrine_undiscovered.png';
                outln.style('stroke', 'gray');

            }
        }else if(type == 'encounter'){
            let el = svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', type_space['encounter'])
                .attr('opacity', 0.75)
                .attr('fill', phase_colors[phase - 1])
                .style('cursor', 'pointer')
                .on('click', click);
            if(discovered[i]){
                el.style('opacity', 0.35);
            }
            if(n.items && n.items.length > 0){
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
                            .attr('x', total_width)
                            .style('cursor', 'pointer')
                            .on('click', click);
                        total_width = total_width + width;
                        item_div.attr('transform', 'translate(' + (x - 0.5*total_width) + ',' + (y - 5) + ')');
                    };
                    img.src = url;
                }
                if(discovered[i]){
                    item_div.style('opacity', 0.35);
                }
            }
        }else if(type == 'encounter_mjr_big'){
            let el = svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', type_space['encounter_mjr_big'] - 14.5)
                .attr('opacity', 0.75)
                .attr('fill', phase_colors[phase - 1])
                .style('cursor', 'pointer')
                .on('click', click);
            let el2 = svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', type_space['encounter_mjr_big'] - 4)
                .attr('opacity', 0.75)
                .attr('fill', 'none')
                .attr('pointer-events', 'none')
                .style('stroke', phase_colors[phase - 1])
                .style('stroke-width', 6.5);
            let img = new Image();
            img.onload = () => {
                let height = img.height;
                let width = img.width;
                let tmp = svg.append('image')
                    .attr('x', x - width/2)
                    .attr('y', y - height/2 - 35)
                    .attr('xlink:href', img.src)
                    .attr('pointer-events', 'none');
                if(discovered[i]){
                    tmp.style('opacity', 0.5)
                }
            };
            img.src = image_dir + n.icon;
            if(discovered[i]){
                let img = new Image();
                img.onload = () => {
                    let height = img.height;
                    let width = img.width;
                    svg.append('image')
                        .attr('x', x - width/2)
                        .attr('y', y - height/2)
                        .attr('xlink:href', img.src)
                        .attr('pointer-events', 'none');
                };
                img.src = image_dir + 'execution.png';
                el.style('opacity', 0.35);
                el2.style('opacity', 0.35);
            }
        }else if(type == 'encounter_mjr'){
            let el = svg.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', type_space['encounter_mjr'])
                .attr('opacity', 0.75)
                .attr('fill', phase_colors[phase - 1])
                .style('cursor', 'pointer')
                .on('click', click);
            
            let img = new Image();
            img.onload = () => {
                let height = img.height;
                let width = img.width;
                let tmp = svg.append('image')
                    .attr('x', x - width/2)
                    .attr('y', y - height/2 - 45)
                    .attr('xlink:href', img.src)
                    .attr('pointer-events', 'none');
                if(discovered[i]){
                    tmp.style('opacity', 0.5)
                }
            };
            img.src = image_dir + n.icon;
            if(discovered[i]){
                let img = new Image();
                img.onload = () => {
                    let height = img.height;
                    let width = img.width;
                    svg.append('image')
                        .attr('x', x - width/2)
                        .attr('y', y - height/2)
                        .attr('xlink:href', img.src)
                        .attr('pointer-events', 'none');
                };
                img.src = image_dir + 'execution.png';
                el.style('opacity', 0.35);
            }
        }else if(type == 'key'){
            let img = new Image();
            img.onload = () => {
                let height = img.height;
                let width = img.width;
                svg.append('image')
                    .attr('x', x - width/2)
                    .attr('y', y - height/2)
                    .attr('xlink:href', img.src)
                    .style('cursor', 'pointer')
                    .on('click', click);
            };
            img.src = image_dir + 'key.png';
        }else if(type == 'item'){
            let img = new Image();
            img.onload = () => {
                let height = img.height;
                let width = img.width;
                let el = svg.append('image')
                    .attr('x', x - width/2)
                    .attr('y', y - height/2)
                    .attr('xlink:href', img.src)
                    .style('cursor', 'pointer')
                    .on('click', click);
                if(discovered[i]){
                    el.style('opacity', 0.35);
                }
            };
            img.src = image_dir + item_icons[n.items[0]];
        }else if(type == 'merchant'){
            let merch = svg.append('text');
            merch.attr('x', x - 18.75).attr('y', y);
            merch.text('$$$');
            merch.style('font-size', 25)
            .style('cursor', 'pointer')
            .on('click', click);
            if(discovered[i]){
                let img = new Image();
                img.onload = () => {
                    let height = img.height;
                    let width = img.width;
                    svg.append('image')
                        .attr('x', x - width/2)
                        .attr('y', y - height/2 -10)
                        .attr('xlink:href', img.src)
                        .attr('pointer-events', 'none')
                        .style('opacity', 0.35);
                };
                img.src = image_dir + 'met.png';
                merch.style('opacity', 0.35);
            }
        }
        // create the labels
        let t = undefined;
        if(type != 'item' && type != 'merchant'){
            let fObj = svg.append('foreignObject')
                .attr('x', x - 100)
                .attr('y', y + (type == 'shrine' ? 20 : (type == 'encounter' ? - (5 + 30*(name.length/10)) : (type == 'encounter_mjr_big' ? 65 : (type == 'encounter_mjr' ? 40 : 0)))))
                .attr('width', 200)
                .attr('height', 200)
                .attr('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility')
                .style('pointer-events', 'none');
            t = fObj.append('xhtml:div')
                .append('p')
                    .style('margin', 0)
                    .style('padding', 0)
                    .style('cursor', 'pointer')
                    .text(name);
        }
        if(type == 'encounter_mjr' && n.items){
            let img = new Image();
            img.onload = () => {
                let height = img.height;
                let width = img.width;
                let tmp = svg.append('image')
                    .attr('x', x - width/2)
                    .attr('y', y + 40 + t.node().clientHeight)
                    .attr('xlink:href', img.src)
                    .attr('pointer-events', 'none');
                    if(discovered[i]){
                        tmp.style('opacity', 0.35);
                    }
            };
            img.src = image_dir + item_icons[n.items[0]];
        }
    }
}

drawMap();

// build the side bar
let buildSideBar = () => {
    sideBar.html('');
    sideBar.style('background', 'lightgray');
    let show_all_box = sideBar.append('input').property('checked', show_undiscovered).attr('type', 'checkbox').on('change', ()=>{
        show_undiscovered = show_all_box.property('checked');
        console.log(show_all_box.property('checked'))
        drawMap();
    });
    sideBar.append('text').text(' Show Undiscovered');
    sideBar.append('br');
    sideBar.append('br');
    let show_all = sideBar.append('button');
    show_all.on('click', () => {
        showing = 3;
        for(let i = 0; i < discovered.length; i++){
            discovered[i] = true;
        }
        drawMap();
        buildSideBar();
    });
    show_all.text('Complete All');
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
    hide_all.text('Uncomplete All');
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
    load_from_clip.attr('type', 'text')
        .style('width', '45%');
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
