// add an svg
let body = d3.select('body');
let content = body.append('div')
    .style('border', '1px solid blue')
    // .style('width', '96%')
    .classed('parent', true);

let svgDiv = content.append('div')
    .style('border', '1px dashed black')
    .style('width', '85%')
    .classed('svg-container', true);

let svg = svgDiv
    .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '0 0 1920 1080')
        .classed('svg-content-responsive');


let redraw = () => {
    sideBar.style('height', svgDiv.node().clientHeight + 'px')
    sideBar.style('width', (document.documentElement.clientWidth - content.node().clientWidth) + 'px')
}

let sideBar = content.append('div')
    .style('border', '1px solid black');

redraw();

window.addEventListener('resize', redraw);
