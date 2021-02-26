import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

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
    
    const d3Container = useRef(null);
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const barColor = '#69b3a2';
    const lineColor = '#ffab00'; //'#89D7F9';
    const delayPeriod = 1000;

    // Get margin adjusted width and height
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    useEffect(() => {

        // Add margins to graph    
        var svg = d3.select(d3Container.current);
        
        // Min and Max Values
        var xmin = d3.min(props.data, function (d) { return d.x; });
		var xmax = d3.max(props.data, function(d) { return d.x; });
		var ymin = 0;
		var ymax = d3.max(props.data, function(d) { return d.y[0]; });
        var ymax2 = d3.max(props.data, function(d) { return d.y[1]; });

        // Get x scale
		var x = d3.scaleBand()
			.domain(props.data.map((d) => d.x))
            .range([0, width])
            .padding(0.2);
        var xLine = d3.scaleLinear()
			.domain([xmin, xmax])
            .range([0, width]);

        // Get y scale 
		var y = d3.scaleLinear()
			.domain([ymin , ymax])
			.range([height, 0]);
        var y2 = d3.scaleLinear()
            .domain([ymin , ymax2])
            .range([height, 0]);

        // Create an axis component with d3.axisBottom
        const xDataisTypeDate = props.data[0].x instanceof Date;
        if(!xDataisTypeDate) {
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
                .call(d3.axisBottom(x)); 
        }
        else { 
            const skip = Math.ceil(props.data.length / 30.0 ); // Add skip to enforce max 30 points 
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
                .call(d3.axisBottom(x)
                    .tickFormat(d3.timeFormat("%m-%d"))
                    .tickValues(x.domain().filter(function(d,i){ return !(i % skip)})))
                .selectAll("text")	
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(-65)");
        }

        // Create an axis component with d3.axisLeft       
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (margin.left) + ", " + margin.top + ")")
            .call(d3.axisLeft(y)); 

        // Create first chart
        const data = props.data.map((item) => { 
            return { x:item.x, y:item.y[0] }  
        })
        createBarChart(svg, data, x, y);

        // Create second chart
        if(ymax2 > 0) { // Check for valid data 
            const data2 = props.data.map((item) => { 
                return { x:item.x, y:item.y[1] }  
            })
            createLineChart(svg, data2, xLine, y2);
        }

    }, [])

    const createBarChart = (svg, data, x, y) => {
        
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Bars
        g.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.bandwidth())
            .attr("fill", barColor)
            // no bar at the beginning thus:
            .attr("height", function(d) { return height - y(0); }) // always equal to 0
            .attr("y", function(d) { return y(0); })
            .attr("fill-opacity","0.5")

        // Animation
        g.selectAll("rect")
        .transition()
        .duration(delayPeriod)
        .attr("y", function(d) { return y(d.y); })
        .attr("height", function(d) { return height - y(d.y); })
        .delay(function(d,i){ return(i * delayPeriod / props.data.length)})
    }

    const createLineChart = (svg, data, x, y) => {
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
		// Create area, and line chart objects
		var line = d3.line()
			.x(function(d) { return x(d.x); })
			.y(function(d) { return y(d.y); })
            .curve(d3.curveMonotoneX)

        // Line for start of animation 
		var lineStart = d3.line() 
			.x(function(d) { return x(d.x); })
            .y(height)
            .curve(d3.curveMonotoneX)

		// Create line chart
		g.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("stroke", lineColor)
			.attr('stroke-width', 2)
			.attr("fill", 'none')				    
			.attr("opacity", "0")
			.attr("d", line)
			.transition()
			.duration(delayPeriod)
            .attr("opacity", "0.8")
            //.attr("d", line)
            .delay(function(d,i){ return(delayPeriod)})
        
        g.selectAll(".dot")
            .data(data)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("fill", lineColor)	
            .attr("cx", function(d, i) { return x(d.x) })
            .attr("cy", function(d) { return height })
            .attr("r", 4)
            .transition()
            .duration(delayPeriod)
            .attr("cy", function(d) { return y(d.y) })
            .delay(function(d,i){ return(i * delayPeriod / props.data.length)})
   
    }

    return (
        <div> 
            <svg ref={d3Container} width={props.width} height={props.height}>
            </svg>
        </div>
    )
}

export default DualChart;