import {loadData} from "./loadData.js"
import {plotRender} from "./plotRender.js"
import {barRender} from "./barRender.js"
import { plotRenderSelect } from "./plotRenderSelect.js";

const svg_scatter = d3.select('#plot');
const svg_bar = d3.select(".bar");
const svg_select = d3.select(".plotSelect");

// Grab the width and height from the SVG element in HTML
const width = parseFloat(svg_scatter.attr('width'));
const height = parseFloat(svg_scatter.attr('height'));
let selected_country = "null";

var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);

var div_bar = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .attr('id', 'bars')
        .style("opacity", 0);
var div_select = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .attr('id', 'select')
        .style("opacity", 0);

const xValue = d => d.Age;
const yValue = d => d.Overall;
const margin = {top: 20, bottom: 60, left: 100, right: 20}
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const circleRadius = 4;
const xLabel = 'Age';
const yLabel = 'Overall';
const title = `${xLabel} vs ${yLabel}`

const plotG = svg_scatter.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

const plotB = svg_bar.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

const plotS = svg_select.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

let selectX = document.getElementById("xAttribute").value;
let selectY = document.getElementById("yAttribute").value;

const render = (data, circle) => {

    plotG
        .call(plotRender, {
            data,
            xValue,
            yValue,
            xLabel,
            yLabel,
            innerHeight,
            innerWidth,
            circleRadius,
            title,
            selected_country,
            div,
            circle
        })
    
    plotB
        .call(barRender, {
            data,
            width,
            height,
            selected_country,
            circle,
            div_bar
        })
    


    plotS
        .call(plotRenderSelect, {
            data,
            selectX,
            selectY,
            innerHeight,
            innerWidth,
            circleRadius,
            title,
            selected_country,
            div_select,
            circle
        })

    }

let submit = document.getElementById('submit_button')
submit.onclick = () =>{
    selected_country = document.getElementById("countries").value;
    selectX = document.getElementById("xAttribute").value;
    selectY = document.getElementById("yAttribute").value;

    d3.selectAll('.points').remove();
    d3.selectAll('.bars').remove();
    d3.selectAll('#plotSelect').remove();
    d3.selectAll('.selectAxis').remove();
    
    loadData(false).then( data => {   
        render(data, true);
        })
    
    }

// D3 loads csv data as a promise, then it is passed into the render function defined above
// producing the SVG bar plot.
loadData(true).then( data => {   
    render(data, false);
    })
