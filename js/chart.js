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
console.log(connections)

svg.selectAll('circle').data(nodes).enter().append('circle')
    .attr('cx', function(d){ return d.x; })
    .attr('cy', function(d){ return d.y; })
    .attr('r', 35);

for(let i = 0; i < connections.length; i++){
    for(let j = 0; j < connections[i].length; j++){
        // svg.append()
    }
}