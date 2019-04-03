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

// responsive svg
let svg = svgDiv
    .append('svg');
svg.attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '0 0 3840 2160')
    .classed('svg-content-responsive');
// add an arrowpoint marker def for later
let defs = svg.append('defs');
let arrowMarker = defs.append('marker');
arrowMarker.attr('id', 'arrow')
    .attr('markerWidth', 50)
    .attr('markerHeight', 100)
    .attr('refX', 0)
    .attr('refY', 3)
    .attr('orient', 'auto')
    .attr('markerUnits', 'strokeWidth')
    .attr('viewBox', '0 0 20 20');
let arrowMarkerPath = arrowMarker.append('path');
arrowMarkerPath.attr('d', 'M0,0 L0,6 L9,3 z')
    .attr('fill', 'black');

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
        parseInt(sideBar.style('border-left')) + parseInt(sideBar.style('border-right')) + 
        parseInt(sideBar.style('margin-left')) + parseInt(sideBar.style('margin-right')) + 
        parseInt(svgDiv.style('margin-left')) + parseInt(svgDiv.style('margin-right'));
    sideBar.style('width', (document.documentElement.clientWidth - svgDiv.node().clientWidth - offsets) + 'px')
}

let sideBar = content.append('div')
    .style('border', '1px solid black');

redraw();
window.addEventListener('resize', redraw);

// begin drawing
console.log(nodes); // data object
console.log(connections);

svg.append('image')
    .attr('xlink:href', 'images/background.jpg');


let type_space = {
    'encounter_mjr': 80,
    'encounter': 40,
    'shrine': 80,
    'key': 0
}

for(let i = 0; i < connections.length; i++){
    for(let j = 0; j < connections[i].length; j++){
        let c = connections[i][j];
        let n1 = nodes[i];
        let n2 = nodes[c.id];
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
        // done shrinking
        let line = svg.append('line')
            .attr('x1', x1n)
            .attr('y1', y1n)
            .attr('x2', x2n)
            .attr('y2', y2n)
            .style('stroke', 'black')
            .style('stroke-width', 2);
        if(c.t == 1 || c.t == 2){
            line.attr('stroke-dasharray', '5, 5');
            if(c.t == 1){
                line.attr('marker-end', 'url(#arrow)');
            }
        }
    }
}

let phase_colors = [
    'green',
    'yellow',
    'red'
];

for(let i = 0; i < nodes.length; i++){
    let n = nodes[i];
    let type = n.type;
    let phase = n.phase;
    let x = n.x;
    let y = n.y;
    let name = n.name;
    if(type == 'shrine'){
        svg.append('image')
            .attr('x', x - 18) // 18 is half the image width
            .attr('y', y - 41 - 25) // 41 is half the image height
            .attr('xlink:href', 'images/shrine_discovered.png');
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
    }else if(type == 'encounter_mjr'){
        svg.append('circle')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', 80)
            .attr('opacity', 0.5)
            .attr('fill', phase_colors[phase - 1]);
    }
    // create the labels
    let text = svg.append('text')
        .attr('x', x - 100)
        .attr('y', y + (type == 'shrine' ? 20 : 0))
        .attr('font-size', 25);
    text.text(name);
    let wrap = d3.textwrap().bounds({height: 200, width: 200});
    text.call(wrap);
}