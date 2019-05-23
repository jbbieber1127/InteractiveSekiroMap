// initialize some variables
let show_undiscovered = false;
// init - check for url parameters
// todo shelter stone state is not saved
let bool_arr_to_hex = (arr) => {
    let str = "";
    for(let i = 0; i < arr.length; i+=4){
        let tmp = arr.slice(i, i + 4);
        let temp_limit = 4 - tmp.length;
        for(let t = 0; t < temp_limit; t++){
            tmp.push('0');
        }
        let b = tmp.reduce((res, x) => res << 1 | x);
        str += (b == false ? 0 : (b == true ? 1 : b)).toString(16);
    }
    return str;
}

let hex_to_bool_arr = (str, len) => {
    let out = [];
    for(let i = 0; i < str.length; i++){
        let val = parseInt(str[i], 16).toString(2);
        for(let b = 0; b < 4 - val.length; b ++){
            out.push(false);
        }
        
        for(let b = 0; b < val.length; b ++){
            out.push(val[b] == '1');
        }
    }
    for(let i = 0; i < len - out.length; i++){
        out.push(false);
    }
    return out.slice(0, len);
}

let updateURLParameter = (url, param, paramVal) => {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

let updateURL = () => {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "state", bool_arr_to_hex(discovered)));
    window.history.replaceState('', '', updateURLParameter(window.location.href, "showAll", show_undiscovered));
}

let updateState = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const stateParam = urlParams.get('state');
    const showAllParam = urlParams.get('showAll');
    if(stateParam){
        discovered = hex_to_bool_arr(stateParam, nodes.length);
    }else{
        console.log("State parameter not specified.");
    }
    if(showAllParam){
        if(showAllParam == 'true'){
            show_undiscovered = true;
        }
    }else{
        console.log("Show all parameter not specified.");
    }
}
updateState();

// start doing stuff
let body = d3.select('body');
let content = body.append('div')
    .style('width', '100%')
    .style('display', 'inline-block');

// container for svg
let svgDiv = content.append('div')
    .style('width', '100%')
    .classed('svg-container', true);

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

let toggleNodeDiscovered = (index) => {
    if(index == 0){ // dont allow dilapidated temple to be disabled
        return;
    }
    if((discovered[37] || discovered[30]) && !(index == 37 || index == 30)){
        return;
    }
    discovered[index] = !discovered[index];
}
let check = undefined;
let showAllTxt = undefined;
let redraw = () => { // deals with window resize
    // svgDiv.style('width', d3.select('body').node().getBoundingClientRect().width + "px")
    //     .style('height', d3.select('body').node().getBoundingClientRect().height + "px");
    svgDiv.style('max-height', window.innerHeight - 4 + 'px');
    svg.style('height', window.innerHeight - 4 + 'px');
    if(check){
        check.remove();
    }
    check = d3.select("body").append('input')
        .attr('type','checkbox')
        .style('position', 'absolute')
        .property('checked', show_undiscovered)
        .style('left', (svg.node().getBoundingClientRect().x + svg.node().getBoundingClientRect().width - 26) + 'px')
        .style('top', (svg.node().getBoundingClientRect().y + svg.node().getBoundingClientRect().height + window.scrollY - 26) + 'px')
        .on('change', ()=>{
            show_undiscovered = !show_undiscovered;
            updateURL();
            drawMap();
        });
    if(showAllTxt){
        showAllTxt.remove();
    }
    showAllTxt = d3.select("body").append('p')
        .style('margin', 0)
        .style('padding', 0)
        .style('position', 'absolute')
        .style('left', check.node().getBoundingClientRect().x - 70 + 'px')
        .style('top', check.node().getBoundingClientRect().y - 3 + 'px')
        .text('Show All')
}


redraw();
window.addEventListener('resize', redraw);


let type_space = {
    'encounter_mjr_big': 114.5,
    'encounter_mjr': 87.5,
    'encounter': 40,
    'shrine': 80,
    'key': 30,
    'item': 30,
    'merchant': 10,
    'choice_obey': 30,
    'choice_break': 30
};

let phase_colors = [
    '#0C481A',
    '#5D56FF',
    '#FFC107'
];

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
};

let should_display = (id) => {
    // if this node is hidden by a discovered node, then do not display this node
    let hidden_by = nodes[id].hidden_by;
    if(hidden_by){
        for(let r = 0; r < hidden_by.length; r++){
            if(discovered[hidden_by[r]]){
                return false;
            }
        }
    }
    // if this node is hidden by all required nodes, then do not display this node
    let hidden_by_and = nodes[id].hidden_by_and;
    if(hidden_by_and){
        let all_true = true;
        for(let r = 0; r < hidden_by_and.length; r++){
            if(!discovered[hidden_by_and[r]]){
                all_true = false;
                break;
            }
        }
        if(all_true){
            return false;
        }
    }
        
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
            return false;
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
            return false;
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
    // append the help icon
    svg.append('image')
        .attr('xlink:href', 'images/help.png')
        .attr('x', 3665)
        .attr('y', -25)
        .on('mouseover', function(){

        })
        .on('mouseout', function(){
            
        });
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
            if(!show_undiscovered && (!should_display(i) || !should_display(c.id))){
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
        if(!show_undiscovered && !should_display(i)){
            continue;
        }

        let click = () => {
            toggleNodeDiscovered(i);
            console.log(i);
            // buildSideBar();
            drawMap();
            updateURL();
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
                let tmp = svg.append('image')
                    .attr('x', x - width/2)
                    .attr('y', y - height/2)
                    .attr('xlink:href', img.src)
                    .style('cursor', 'pointer')
                    .on('click', click);
                if(discovered[i]){
                    tmp.style('opacity', 0.35);
                }
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
        }else if(type == 'choice_obey'){
            let img = new Image();
            img.onload = () => {
                let height = img.height;
                let width = img.width;
                let tmp = svg.append('image')
                    .attr('x', x - width/2)
                    .attr('y', y - height/2)
                    .attr('xlink:href', img.src)
                    .style('cursor', 'pointer')
                    .on('click', click);
                if(discovered[i]){
                    tmp.style('opacity', 0.35);
                }
            };
            img.src = image_dir + 'obey.png';
        }else if(type == 'choice_break'){
            let img = new Image();
            img.onload = () => {
                let height = img.height;
                let width = img.width;
                let tmp = svg.append('image')
                    .attr('x', x - width/2)
                    .attr('y', y - height/2)
                    .attr('xlink:href', img.src)
                    .style('cursor', 'pointer')
                    .on('click', click);
                if(discovered[i]){
                    tmp.style('opacity', 0.35);
                }
            };
            img.src = image_dir + 'break.png';
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
