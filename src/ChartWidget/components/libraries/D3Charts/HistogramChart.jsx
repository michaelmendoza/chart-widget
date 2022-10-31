import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';

/**
 * Takes an array of data and histogram bins the data, then plots a svg bar 
 * chart using d3. Data is input as a array of number. 
 * 
 * example:
 * <HistogramChart width={500} height={500} data={[2,2,2,2,2,4,6,7,3,4]}></HistogramChart>
 * @param {{width, height, data}} props { width, height, data } 
 */
const HistogramChart = (props) => {
    
    const d3Container = useRef(null);
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const fillColor = '#89D7F9'; 
    const textColor = '#222222';
    const binMax = 10;
    const binCount = 10;

    useEffect(() => {
        const data = props.data;
        
		// Get Scale
		const width = props.width - margin.left - margin.right;
        const height = props.height - margin.top - margin.bottom;
 
        // Add margins to graph     
        const svg = d3.select(d3Container.current);
        const g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
                
        // Get x scale
        const xmax = binMax;
		const x = d3.scaleLinear()
			.domain([0, xmax])
            .range([0, width]);
        
        const histogram = d3.histogram()
            .value((d) => d - 0.1)
            .domain(x.domain())
            .thresholds(x.ticks(binCount - 1));

        const bins = histogram(data);
        //console.log(bins);

        // Get y scale 
        const ymax = d3.max(bins, (d) => d.length);
		const y = d3.scaleLinear()
			.domain([0, ymax])
			.range([height, 0]);

        // Create an axis component with d3.axisBottom
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            .call(d3.axisBottom(x)); 
        
        // Create an axis component with d3.axisLeft       
        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (margin.left) + ', ' + margin.top + ')')
            .call(d3.axisLeft(y)); 

        // Create histogram
        const bar = g.selectAll('rect')
            .data(bins)
            .enter()
            .append('rect')
                .attr('x', 1)
                .attr('y', () => height - y(0))
                .attr('transform', (d) => 'translate(' + x(d.x0) + ',' + y(d.length) + ')')
                .attr('width', (d) => x(d.x1) - x(d.x0) - 1)
                .attr('height', () => height - y(0))
                .style('fill', fillColor);
        
        // Animate histogram 
        bar.data(bins)
            .transition()
            .duration(1000)
            .attr('x', 1)
            .attr('transform', (d) => 'translate(' + x(d.x0) + ',' + y(d.length) + ')')
            .attr('width', (d) => x(d.x1) - x(d.x0) - 1)
            .attr('height', (d) => height - y(d.length));

        const formatCount = d3.format(',.0f'); 
        g.selectAll('text') 
            .data(bins)
            .enter()
            .append('text')
                .attr('dy', '1.5em')
                .attr('y', (d) => y(d.length))
                .attr('x', (d) => x(d.x0 + 0.5))
                .attr('text-anchor', 'middle')
                .style('fill', textColor)
                .style('font-size', 10)
                .style('opacity', (d, i) => (i >= bins.length - 1 ? 0 : 1))
                .text((d) => formatCount(d.length));

        // Label for the x axis
        g.append('text')             
        .attr('transform',
                'translate(' + (width / 2) + ' ,' + 
                            (height + margin.top) + ')')
        .style('text-anchor', 'middle')
        .text('Score');

        // Label for the y axis
        g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Count'); 
    }, []);

    return (
        <div> HistogramChart 
            <svg ref={d3Container} width={props.width} height={props.height}>
            </svg>
        </div>
    );
};

HistogramChart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array
  };

export default HistogramChart;