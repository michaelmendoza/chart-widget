import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

/**
 * Plots a svg scatterplot chart using d3. Data is input as a point array. 
 * 
 * example: 
 * <ScatterPlot width={500} height={500} data={[{x:1,y:1},{x:1,y:2},{x:1,y:3}]}></ScatterPlot>
 * @param {{width, height, data}} props { width, height, data } 
 */
const ScatterPlot = (props) => {
    
    const d3Container = useRef(null);
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const fillColor = '#69b3a2'; 
    const strokeColor = '#222222';
    const pointRadius = 3;
    
    useEffect(() => {

		// Get margin adjusted width and height
		var width = props.width - margin.left - margin.right;
        var height = props.height - margin.top - margin.bottom;
 
        // Add margins to graph    
        var svg = d3.select(d3Container.current);
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
		// Min and Max Values
		var xmin = d3.min(props.data, function (d) { return d.x; });
		var xmax = d3.max(props.data, function(d) { return d.x; });
		var ymin = d3.min(props.data, function (d) { return d.y; });
		var ymax = d3.max(props.data, function(d) { return d.y; });

        // Get x scale
		var x = d3.scaleLinear()
			.domain([xmin, xmax])
            .range([0, width]);

        // Get y scale 
		var y = d3.scaleLinear()
			.domain([ymin , ymax])
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
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
                .call(d3.axisBottom(x)
                    .tickFormat(d3.timeFormat("%m-%d")))
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


        const delay = 500 / props.data.length;

        // Dots   
        g.selectAll("dot")
            .data(props.data)
            .enter()
            .append("circle")
              .attr("cx", function (d) { return x(d.x); } )
              .attr("cy", height)
              .attr("r", 0)
              .style("fill", fillColor)
              .style("stroke", strokeColor)

         // Animation
              .transition()        
              .duration(800)
              .attr("cx", function (d) { return x(d.x); } )
              .attr("cy", function (d) { return y(d.y); } )
              .attr("r", pointRadius)
              .delay(function(d,i){ return(i * delay)})
                      
    }, [])

    return (
        <div> 
            <svg ref={d3Container} width={props.width} height={props.height}>
            </svg>
        </div>
    )
}

export default ScatterPlot;