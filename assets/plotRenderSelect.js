export const plotRenderSelect = (selection, props) => {
    const {
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
    } = props;

    const xLabel = selectX;
    const yLabel = selectY;

    const xValue = d => +d[selectX];
    const yValue = d => (selected_country == "null" || d.nationality == selected_country) ? +d[selectY] : 0;

    

    const gUpdate = selection.selectAll('g').data([null]);
    const gEnter = gUpdate.enter().append('g');
    const g = gUpdate.merge(gEnter)


    let xExtent = d3.extent(data, xValue);
    (xExtent[0] === 0) ? xExtent[0] = 10 : xExtent[0] = +(xExtent[0] - 5);
    xExtent[1] = +(xExtent[1]) + 2;

    data.forEach( d => yValue(d))
    const xScale = d3.scaleLinear()
        .domain(xExtent)
        .range([0, innerWidth])
        .nice();
    
    let yExtent = d3.extent(data, yValue);
    console.log(yExtent);

    (yExtent[0] === 0) ? yExtent[0] = 10 : yExtent[0] = +(yExtent[0] - 5);
    yExtent[1] = +(yExtent[1]) + 5;



    const yScale = d3.scaleLinear()
        .domain(yExtent.reverse())
        .range([0, innerHeight])
        .nice();
    

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        
    
    const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(10)



    const xAxisG = g.append('g')
        .call(xAxis)
        .attr('transform', `translate(${0}, ${innerHeight})`)
        .attr('class', 'selectAxis')
    xAxisG.selectAll('.domain').remove();

    const yAxisG = g.append('g')
        .call(yAxis)
        .attr('class', 'selectAxis');
    yAxisG.selectAll('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis_label')
        .attr('fill', 'black')
        .attr('x', innerWidth/2)
        .attr('y', 45)
        .attr('font-size', '2em')
        .text(xLabel);

    yAxisG.append('text')
        .attr('class', 'axis_label')
        .attr('fill', 'black')
        .attr('x', -innerHeight /2)
        .attr('y', -60)
        .attr('font-size', '2em')
        .attr('text-anchor', 'middle')
        .attr('transform', "rotate(-90)")
        .text(yLabel);


    // Creates circles for each datapoint, with dimensions according to the above mentioned scalings
    // sets position according to the scaling values described above
    

    const points = g.selectAll('.points').data(data)
    const pointsEnter = points
        .enter().append('circle')
            .attr('cy', d => (yValue(d) === 0 || xValue(d) === 0) ? -400 : yScale(yValue(d))) 
            .attr('cx', d => (selected_country == "null" || d.nationality == selected_country) ? xScale(xValue(d)) : -400)
            .attr('r', circleRadius)
            .attr('fill', 'steelblue')
            .attr('stroke', 'black')
            .attr('class', 'points')
            .style('opacity', d => (selected_country == "null" || selected_country == d.nationality) ? 0.7 : 0)
            .on('mouseover', (i, d) => {
                
                let w = 7 * ( Math.max(selectX.length, selectY.length) + Math.max(yValue(d), xValue(d)).toString().length );
                
                console.log(w)

                w = (w < 50) ? w * 1.5 : w;

                document.getElementById("select").style.width = w + "px";

                div_select.transition()
                    .style('opacity', 1)
                div_select.html(`${selectX}: ${xValue(d).toString().bold()} <br> ${selectY}: ${yValue(d).toString().bold()}`)  
                    .style("left", (i.pageX) + 10 + "px")		
                    .style("top", (i.pageY) + 20 + "px");
            })
            .on('mouseout', () => {
                div_select.transition()
                    .style('opacity', 0)
            })
            
    points.merge(pointsEnter)
            //.style('opacity', (i, d) => { (selected_country == "null" || selected_country == i.nationality) ? 0.2 : 0;})
            //.style('stroke-opacity', (i, d) => { (selected_country == "null" || selected_country == i.nationality) ? 0.2 : 0})
    points.exit().remove();  

    // Adding a title is as simple as appending a text element

};