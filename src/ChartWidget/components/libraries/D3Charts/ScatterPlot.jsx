import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';

/**
 * Plots a svg scatterplot chart using d3. Data is input as a point array. 
 * 
 * example: 
 * <ScatterPlot width={500} height={500} data={[{x:1,y:1},{x:1,y:2},{x:1,y:3}]}></ScatterPlot>
 * @param {{width, height, data}} props { width, height, data } 
 */
const ScatterPlot = (props) => {
    
    const self = useRef({ svg: null });
    const d3Container = useRef(null);
    const divContainer = useRef(null);
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const fillColor = '#69b3a2'; 
    const strokeColor = '#222222';
    const pointRadius = 3;
    
    // Get margin adjusted width and height
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    useEffect(() => {
        initChart();
        updateSize();
        updateChart(props.data);
    }, [props.data, props.width]);

    const initChart = () => { 
        if (self.current.svg) return;

        const svg = d3.select(d3Container.current);

        const divCanvas = d3.select(divContainer.current);
        const canvas = divCanvas.append('canvas')  
        .style('position', 'absolute')
        .style('top', margin.top + 'px')
        .style('left', margin.left + 'px')
        .style('pointer-events', 'none');

        const g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
        // Min and Max Values
        const xmin = d3.min(props.data, (d) => d.x);
        const xmax = d3.max(props.data, (d) => d.x);
        const ymin = d3.min(props.data, (d) => d.y);
        const ymax = d3.max(props.data, (d) => d.y);

        // Get x scale
        const x = d3.scaleLinear()
            .domain([xmin, xmax])
            .range([0, width]);

        // Get y scale 
        const y = d3.scaleLinear()
            .domain([ymin, ymax])
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
            xAxis = svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
                .call(d3.axisBottom(x)
                    .tickFormat(d3.timeFormat('%m-%d')))
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

        self.current = { svg, g, canvas, x, y, xAxis, yAxis }; 
    };

    const updateSize = () => {

        const { x, y, xAxis, yAxis } = self.current;

        // Get x scale
        x.range([0, width]);

        // Get y scale 
        y.range([height, 0]);

        // Create an axis component with d3.axisBottom
        xAxis.call(d3.axisBottom(x)); 

        // Create an axis component with d3.axisLeft       
        yAxis.call(d3.axisLeft(y)); 
     };

    const updateChart = (data) => { 

        const { canvas, x, y } = self.current;

        const drawPoints = (canvas, data) => {
            const scale = 2;
            const context = canvas.getContext('2d');
            canvas.height = props.height * scale;
            canvas.width = props.width * scale;
            canvas.style.width = props.width + 'px';
            canvas.style.height = props.height + 'px'; 
            context.clearRect(0, 0, props.width, props.height);
            context.globalAlpha = 0.8;
            context.setTransform(scale, 0, 0, scale, 0, 0);
            
            // Clear the canvas from previous drawing
            context.clearRect(0, 0, canvas.width, canvas.height);

            data.forEach((d) => {
                context.beginPath();
                
                const xPt = x(d.x); //projection(d.geo)[0];
                const yPt = y(d.y); //projection(d.geo)[1];
                context.arc(xPt, yPt, pointRadius, 0, 2 * Math.PI);
                context.fillStyle = fillColor;
                context.strokeStyle = strokeColor;
                context.lineWidth = 1;
                context.fill();
                context.stroke();
            });
        };
        
        drawPoints(canvas.node(), data);

        //const delay = 500 / data.length;

        /*
        // Dots   
        g.selectAll('dot')
            .data(data)
            .enter()
            .append('circle')
              .attr('cx', (d) => x(d.x))
              .attr('cy', height)
              .attr('r', 0)
              .style('fill', fillColor)
              .style('stroke', strokeColor)

              // Animation
              .transition()        
              .duration(800)
              .attr('cx', (d) => x(d.x))
              .attr('cy', (d) => y(d.y))
              .attr('r', pointRadius)
              .delay((d, i) => (i * delay));
        */
    };
    
    return (
        <div ref={divContainer} style={{position: 'relative'}}> 
            <svg ref={d3Container} width={props.width} height={props.height}>
            </svg>
        </div>
    );
};

ScatterPlot.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    data_values: PropTypes.array
};

export default ScatterPlot;