import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';

/**
 * Plots a svg bar chart using d3. Data is input as a point array of { x, y[], label }.
 * Example:
 * 
 * const data = [{x:1,y:[1,3]},{x:2,y:[2,2]},{x:3,y:[3,1]}]
 * 
 * < DualChart width={500} height={500} data={data} />
 * @param {{width, height, data}} props { width, height, data } 
 */
const DualChart = (props) => {
    
    const self = useRef({ svg: null });
    const d3Container = useRef(null);
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const barColor = '#69b3a2';
    const hoverColor = '#6797A9';
    const lineColor = '#ffab00'; 
    const duration = 500;
    const delay = 100;

    // Get margin adjusted width and height
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    useEffect(() => {
        const data = props.data.map((item) => ({ x: item.x, y: item.y[0] }));
        const data2 = props.data.map((item) => ({ x: item.x, y: item.y[1] }));

        initChart();
        updateSize();
        updateChart(data);
        updateChart2(data2);
        updateTooltip(data);
    }, [props.data, props.width]);

    const initChart = () => { 
        if (self.current.svg) return;

        const svg = d3.select(d3Container.current);

        const g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        const g2 = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Min and Max Values
        const xmin = d3.min(props.data, (d) => d.x);
		const xmax = d3.max(props.data, (d) => d.x);
		const ymin = 0;
		const ymax = d3.max(props.data, (d) => d.y[0]);
        const ymax2 = d3.max(props.data, (d) => d.y[1]);

        // Get x scale
		const x = d3.scaleBand()
			.domain(props.data.map((d) => d.x))
            .range([0, width])
            .padding(0.2);
        const xLine = d3.scaleLinear()
			.domain([xmin, xmax])
            .range([0, width]);

        // Get y scale 
		const y = d3.scaleLinear()
			.domain([ymin, ymax])
			.range([height, 0]);
        const y2 = d3.scaleLinear()
            .domain([ymin, ymax2])
            .range([height, 0]);

        // Create an axis component with d3.axisBottom
        let xAxis;
        const xDataisTypeDate = props.data[0].x instanceof Date;
        if (!xDataisTypeDate) {
            xAxis = svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
                .call(d3.axisBottom(x)); 
        }
        else { 
            const skip = Math.ceil(props.data.length / 30.0); // Add skip to enforce max 30 points 
            xAxis = svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
                .call(d3.axisBottom(x)
                    .tickFormat(d3.timeFormat('%m-%d'))
                    .tickValues(x.domain().filter((d, i) => !(i % skip))))
                .selectAll('text')	
                    .style('text-anchor', 'end')
                    .attr('dx', '-.8em')
                    .attr('dy', '.15em')
                    .attr('transform', 'rotate(-65)');
        }

        // Create an axis component with d3.axisLeft       
        const yAxis = svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (margin.left) + ', ' + margin.top + ')')
            .call(d3.axisLeft(y)); 

        // Define tooltip
        const tooltip = d3.select('body')
            .append('div')	
            .attr('class', 'charts-d3-tooltip')				
            .style('opacity', 0)
            .text('');

        self.current = { svg, g, g2, x, xLine, y, y2, xAxis, yAxis, tooltip };

    };

    const updateSize = () => { 
        const { x, xLine, y, y2, xAxis, yAxis } = self.current;
                
        // Get x scale
		x.range([0, width]);
        xLine.range([0, width]);

        // Get y scale 
		y.range([height, 0]);
		y2.range([height, 0]);

        // Create an axis component with d3.axisBottom
        xAxis.call(d3.axisBottom(x)); 
        
        // Create an axis component with d3.axisLeft       
        yAxis.call(d3.axisLeft(y)); 
    };

    const updateChart = (data) => { 

        const { g, x, xLine, y, y2 } = self.current;

        // Min and Max Values
        const xmin = d3.min(props.data, (d) => d.x);
		const xmax = d3.max(props.data, (d) => d.x);
		const ymin = 0;
		const ymax = d3.max(props.data, (d) => d.y[0]);
        const ymax2 = d3.max(props.data, (d) => d.y[1]);

        // Update x, y  scale
		x.domain(props.data.map((d) => d.x));
        xLine.domain([xmin, xmax]);
        y.domain([ymin, ymax]);
        y2.domain([ymin, ymax2]);

        g.selectAll('rect')
        .data(data)
        .join('rect')
            .attr('x', (d) => x(d.x))
            .attr('width', x.bandwidth())
            .attr('fill', barColor)
            // no bar at the beginning thus:
            .attr('height', () => height - y(0)) // always equal to 0
            .attr('y', () => y(0));
        
        // Animation
        g.selectAll('rect')
        .data(data)
        .transition()
        .duration(duration)
        .attr('y', (d) => y(d.y))
        .attr('height', (d) => height - y(d.y))
        .delay((d, i) => (i * delay / data.length));
    };
 
    const updateChart2 = (data) => { 

        const { g2, x, xLine, y, y2 } = self.current;

        // Min and Max Values
        const xmin = d3.min(props.data, (d) => d.x);
		const xmax = d3.max(props.data, (d) => d.x);
		const ymin = 0;
		const ymax = d3.max(props.data, (d) => d.y[0]);
        const ymax2 = d3.max(props.data, (d) => d.y[1]);

        if (ymax2 === undefined) return;

        // Update x, y  scale
		x.domain(props.data.map((d) => d.x));
        xLine.domain([xmin, xmax]);
        y.domain([ymin, ymax]);
        y2.domain([ymin, ymax2]);

        const line = d3.line()
        .x((d) => x(d.x))
        .y((d) => y(d.y))
        .curve(d3.curveMonotoneX);

        // Create line chart
        g2.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('stroke', lineColor)
            .attr('stroke-width', 2)
            .attr('fill', 'none')				    
            .attr('opacity', '0')
            .attr('d', line)
            .transition()
            .duration(delay)
            .attr('opacity', '0.8')
            //.attr("d", line)
            .delay(() => (delay));
        
        g2.selectAll('.dot')
            .data(data)
            .enter().append('circle') // Uses the enter().append() method
            .attr('class', 'dot') // Assign a class for styling
            .attr('fill', lineColor)	
            .attr('cx', (d) => x(d.x))
            .attr('cy', () => height)
            .attr('r', 4)
            .transition()
            .duration(delay)
            .attr('cy', (d) => y(d.y))
            .delay((d, i) => (i * delay / props.data.length));
        };

        const updateTooltip = (data) => {

            const { svg, tooltip } = self.current;
    
            svg.selectAll('rect')
                .data(data)
                .on('mouseover', function (e, d) {
                    d3.select(this).style('fill', hoverColor);
                    
                    tooltip.style('left', (e.pageX) + 'px')		
                        .style('top', (e.pageY - 28) + 'px')
                        .transition()		
                        .duration(200)		
                        .style('opacity', 0.9);		
    
                    tooltip.text(d.y);	
                }) 
                .on('mouseout', function () {
                    d3.select(this).style('fill', barColor);
                    
                    tooltip.transition()		
                        .duration(200)		
                        .style('opacity', 0); 
                });
        };

    return (
        <div> 
            <svg ref={d3Container} width={props.width} height={props.height}>
            </svg>
        </div>
    );
};

DualChart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
  };

export default DualChart;