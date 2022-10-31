import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';

/**
 * Plots a svg bar chart using d3. Data is input as a point array supports y values for a 2 elemnt array. 
 * 
 * example: 
 * <BarComparsionChart width={500} height={500} data={[{x:'One',y:1},{x:'Two',y:2},{x:"Three",y:3}]}></BarComparsionChart>
 * @param {{width, height, data}} props { width, height, data } 
 */
const BarComparsionChart = (props) => {
    
    const d3Container = useRef(null);
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const fillColors = ['#69b3a2', '#5482B0'];

    // Get margin adjusted width and height
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
    
    useEffect(() => {
        
        // Add margins to graph    
        const svg = d3.select(d3Container.current);

		// Min and Max Values
		const ymin = 0;
		const ymax1 = d3.max(props.data, (d) => d.y[0]);
        const ymax2 = d3.max(props.data, (d) => d.y[1]);
        const ymax = Math.max(ymax1, ymax2);

        // Get x scale
		const x = d3.scaleBand()
			.domain(props.data.map((d) => d.x))
            .range([0, width])
            .padding(0.2);

        // Get y scale 
		const y = d3.scaleLinear()
			.domain([ymin, ymax])
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

        const data = props.data.map((d) => ({ x: d.x, y: d.y[0] }));
        const data2 = props.data.map((d) => ({ x: d.x, y: d.y[1] }));

        drawBars(svg, data, x, y, fillColors[0], 0);
        drawBars(svg, data2, x, y, fillColors[1], 1);

    }, []);

    const drawBars = (svg, data, x, y, fillColor, index) => {

        // Bars
        const g = svg.append('g')
            .attr('transform', 'translate(' + (margin.left + index * x.bandwidth() / 2) + ',' + margin.top + ')');
        
        g.selectAll('mybar')
        .data(data)
        .enter()
        .append('rect')
            .attr('x', (d) => x(d.x))
            .attr('width', x.bandwidth() / 2)
            .attr('fill', fillColor)
            // no bar at the beginning thus:
            .attr('height', () => height - y(0)) // always equal to 0
            .attr('y', () => y(0));

        // Animation
        svg.selectAll('rect')
        .transition()
        .duration(800)
        .attr('y', (d) => y(d.y))
        .attr('height', (d) => height - y(d.y))
        .delay((d, i) => (i * 100));
    };

    return (
        <div> 
            <svg ref={d3Container} width={props.width} height={props.height}>
            </svg>
        </div>
    );
};

BarComparsionChart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
  };

export default BarComparsionChart;