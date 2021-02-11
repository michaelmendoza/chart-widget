import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

/**
 * Plots a svg line/area chart using d3. Data is input as a point array. 
 * 
 * example: 
 * const _data = Points.gaussianModel(-3, 3, 100, 1, 0.5);
 * <LineAreaChart width={500} height={500} data={_data}></LineAreaChart>
 * @param {{width, height, data}} props { width, height, data } 
 */ 
const LineAreaChart = (props) => {
    
    const d3Container = useRef(null);
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const colors = ['#FE3701', '#FFB600', '#7DCC00'];
    const areaColor = '#C7EBFE';
    const lineColor = '#89D7F9';

    useEffect(() => {

		// Min and Max Values
		var xmin = d3.min(props.data, function (d) { return d.x; });
		var xmax = d3.max(props.data, function(d) { return d.x; });
		var ymin = d3.min(props.data, function (d) { return d.y; });
		var ymax = d3.max(props.data, function(d) { return d.y; });

		// Get Scale
		var width = props.width - margin.left - margin.right;
        var height = props.height - margin.top - margin.bottom;
 
        // Add margins to graph   
        var svg = d3.select(d3Container.current);  
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
        // Get x scale
		var x = d3.scaleLinear()
			.domain([xmin, xmax])
            .range([0, width]);

        // Get y scale 
		var y = d3.scaleLinear()
			.domain([ymin , ymax])
			.range([height, 0]);
        
		// Create area, and line chart objects
		var line = d3.line()
			.x(function(d) { return x(d.x); })
			.y(function(d) { return y(d.y); })

        // Line for start of animation 
		var lineStart = d3.line() 
			.x(function(d) { return x(d.x); })
			.y(0)

		var area = d3.area()
			.x(function(d) { return x(d.x); })
			.y0(height)
			.y1(function(d) { return y(d.y); })

        // Area for start of animation 
		var areaStart = d3.area() 
			.x(function(d) { return x(d.x); })
			.y0(height)
			.y1(height)

        // Create an axis component with d3.axisBottom
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
            .call(d3.axisBottom(x)); 
        
        // Create an axis component with d3.axisLeft       
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (margin.left) + ", " + margin.top + ")")
            .call(d3.axisLeft(y)); 

		// Create line chart
		g.append("path")
			.datum(props.data)
			.attr("class", "line")
			.attr("stroke", lineColor)
			.attr('stroke-width', 1)
			.attr("fill", 'none')				    
			.attr("opacity", "0.8")
			.attr("d", lineStart)
			.transition()
			.duration(500)
			.attr("d", line)

		// Create area chart
		g.append("path")
			.datum(props.data)
			.attr("class", "area")
			.attr("fill", areaColor)	
			.attr("opacity", "0.75")
			.attr("d", areaStart)
			.transition()
			.duration(500)
            .attr("d", area)

 
    }, [])

    return (
        <div> 
            <svg ref={d3Container} width={props.width} height={props.height}>
            </svg>
        </div>
    )
}

export default LineAreaChart;