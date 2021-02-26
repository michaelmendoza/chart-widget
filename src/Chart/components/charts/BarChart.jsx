import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

/**
 * Plots a svg bar chart using d3. Data is input as a point array. 
 * 
 * example: 
 * <BarChart width={500} height={500} data={[{x:'One',y:1},{x:'Two',y:2},{x:"Three",y:3}]}></BarChart>
 * @param {{width, height, data}} props { width, height, data } 
 */
const BarChart = (props) => {
    
    const d3Container = useRef(null);
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const fillColor = "#69b3a2";
    const hoverColor = "#6797A9";

    // Get margin adjusted width and height
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
    
    useEffect(() => {
        
        // Add margins to graph    
        var svg = d3.select(d3Container.current);

		// Min and Max Values
		var ymin = 0;
		var ymax = d3.max(props.data, function(d) { return d.y; });

        // Get x scale
		var x = d3.scaleBand()
			.domain(props.data.map((d) => d.x))
            .range([0, width])
            .padding(0.2)

        // Get y scale 
		var y = d3.scaleLinear()
			.domain([ymin , ymax])
			.range([height, 0]);

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

        drawBars(svg, props.data, x, y);

    }, [])

    const drawBars = (svg, data, x, y) => {

        // Define tooltip
        var tooltip = d3.select("body")
        .append("div")	
        .attr("class", "charts-tooltip")				
        .style("opacity", 0)
        .text("");

        // Bars
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        g.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.bandwidth())
            .attr("fill", fillColor)
            // no bar at the beginning thus:
            .attr("height", function(d) { return height - y(0); }) // always equal to 0
            .attr("y", function(d) { return y(0); })
            .on("mouseover",function(e, d) {
                d3.select(this).style("fill", hoverColor)
                
                tooltip
                .style("left", (e.pageX) + "px")		
                .style("top", (e.pageY - 28) + "px")
                .transition()		
                .duration(200)		
                .style("opacity", .9)		

                tooltip.text(d.x);	
            }) 
            .on("mouseout",function(d){
                d3.select(this).style("fill", fillColor);

                tooltip.transition()		
                .duration(500)		
                .style("opacity", 0); 
            })

        // Animation
        svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return y(d.y); })
        .attr("height", function(d) { return height - y(d.y); })
        .delay(function(d,i){ return(i * 100)})
    }

    return (
        <div> 
            <svg ref={d3Container} width={props.width} height={props.height}>
            </svg>
        </div>
    )
}

export default BarChart;