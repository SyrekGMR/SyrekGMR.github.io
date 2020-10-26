export const plotRender = (selection, props) => {
    const {
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
    } = props;

    const gUpdate = selection.selectAll('g').data([null]);
    const gEnter = gUpdate.enter().append('g');
    const g = gUpdate.merge(gEnter)

    let xExtent = d3.extent(data, xValue);
    xExtent[0] = +(xExtent[0] - 2);
    xExtent[1] = +(xExtent[1]) + 2;
    
    const xScale = d3.scaleLinear()
        .domain(xExtent)
        .range([0, innerWidth])
        .nice();
    
    let yExtent = d3.extent(data, yValue);
    yExtent[0] = +(yExtent[0] - 2);
    yExtent[1] = +(yExtent[1]) + 2;
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue).reverse())
        .range([0, innerHeight])
        .nice();
    

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
    
    const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(10);


    if (!circle) {

    const xAxisG = g.append('g')
        .call(xAxis)
        .attr('transform', `translate(${0}, ${innerHeight})`)
    xAxisG.selectAll('.domain').remove();

    const yAxisG = g.append('g')
        .call(yAxis);
    yAxisG.selectAll('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis_label')
        .attr('fill', 'black')
        .attr('x', innerWidth/2)
        .attr('y', 35)
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

    }
    // Creates circles for each datapoint, with dimensions according to the above mentioned scalings
    // sets position according to the scaling values described above
   
    const points = g.selectAll('.points').data(data)
    const pointsEnter = points
        .enter().append('circle')
            .attr('cy', d => (selected_country == "null" || d.nationality == selected_country) ? yScale(yValue(d)) : -200) 
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', circleRadius)
            .attr('fill', 'steelblue')
            .attr('stroke', 'black')
            .attr('class', 'points')
            .style('opacity', d => (selected_country == "null" || selected_country == d.nationality) ? 0.7 : 0)
            .on('mouseover', (i, d) => {
                div.transition()
                    .style('opacity', 1)
                div.html(`Age: ${d.Age.toString().bold()} Overall: ${d.Overall.toString().bold()}`)
                    .style("left", (i.pageX) + 10 + "px")		
                    .style("top", (i.pageY) + 20 + "px");
            })
            .on('mouseout', () => {
                div.transition()
                    .style('opacity', 0)
            })
            
    points.merge(pointsEnter)
            //.style('opacity', (i, d) => { (selected_country == "null" || selected_country == i.nationality) ? 0.2 : 0;})
            //.style('stroke-opacity', (i, d) => { (selected_country == "null" || selected_country == i.nationality) ? 0.2 : 0})
    points.exit().remove();  

    // Adding a title is as simple as appending a text element

};