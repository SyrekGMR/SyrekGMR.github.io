export const barRender = (selection, props) => {

    const {
        data,
        width,
        height,
        selected_country,
        circle,
        div_bar
    } = props;


    const xValue = d => d.Name;
    const yValue = d => d.Value;
    const margin = {top: 20, bottom: 40, left: 100, right: 20}
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;



    let tmp_foot = {"Left": 0, "Right": 0}
    let foot = [{"Name": "Left", "Value": 0}, {"Name": "Right", "Value": 0}];
    data.forEach( d => {
        if (selected_country == "null" || selected_country == d.nationality) {
            tmp_foot[d.preferred_foot] ++}
        });
    foot[0]['Value'] = tmp_foot['Left']
    foot[1]['Value'] = tmp_foot['Right']

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(foot, yValue) + 1])
    .range([0, innerHeight]);
    
    // Used for displaying ordinal attributes, in this case seperates each bar in the plot
    // Domain maps each country (ordinal) from dataset, with range setting the maximum dimensions according to SVG element
    const xScale = d3.scaleBand()
        .domain(foot.map(xValue))
        .range([0, innerWidth])
        .padding(0.1);

    // Group element onto which the svg is appended allowing for translation of the entire group across the screen
    const g = selection

    if (!circle) {
        const xAxisG = g.append('g').call(d3.axisBottom(xScale))
        xAxisG
            .attr('transform', `translate(${0}, ${innerHeight})`);
        xAxisG.append('text')
            .attr('class', 'axis_label')
            .attr('fill', 'black')
            .attr('x', innerWidth/2)
            .attr('y', 35)
            .attr('font-size', '2em')
            .text("Preferred Foot");
    }

    // Append the y-axis labels onto the group element, taking the y-scaling as input

    const nyScale = d3.scaleLinear()
        .domain([0, d3.max(foot, yValue) + 1].reverse())
        .range([0, innerHeight]);

    const yAxisG = g.append('g').call(d3.axisLeft(nyScale))
    yAxisG
        .attr('class', 'bars');

    yAxisG.append('text')
        .attr('class', 'axis_label')
        .attr('fill', 'black')
        .attr('x', -innerHeight /2)
        .attr('y', -60)
        .attr('font-size', '2em')
        .attr('text-anchor', 'middle')
        .attr('transform', "rotate(-90)")
        .text("Count");



    // Append the x-axis labels onto the group element, taking the x-scaling as input
    // A further translation is applied to move from the top of plot to the bottom
    

    // Creates rectangle (bar) for each datapoint, with dimensions according to the above mentioned scalings
    // sets position according to the scaling values described above
    const bars = g.selectAll('rect').data(foot)
    const barsEnter = bars
        .enter().append('rect')
            .attr('x', d => xScale(xValue(d))) 
            .attr('height', d => yScale(yValue(d)))
            .attr('width', xScale.bandwidth())
            .attr('fill', 'steelblue')
            .attr('class', 'bars')
            .attr('y', d => (innerHeight - yScale(yValue(d))))
            .on('mouseover', (i, d) => {
                div_bar.transition()
                    .style('opacity', 1)
                div_bar.html(`Foot: ${d.Name.toString().bold()} Count: ${d.Value.toString().bold()}`)
                    .style("left", (i.pageX) + 10 + "px")		
                    .style("top", (i.pageY) + 20 + "px");
            })
            .on('mouseout', () => {
                div_bar.transition()
                    .style('opacity', 0)
            })
    bars.merge(barsEnter)
    bars.exit().remove();

}