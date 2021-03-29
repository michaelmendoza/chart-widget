import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

/**
 * Plots a svg bar chart using d3. Data is input as a point array. 
 * 
 * example: 
 * <BarChart width={500} height={500} data={[{x:'One',y:1},{x:'Two',y:2},{x:"Three",y:3}]}></BarChart>
 * @param {{width, height, data, labels? }} props { width, height, data, labels } 
 */
const BarChart = (props) => {
    
    const self = useRef({ svg: null }); 
    const d3Container = useRef(null);
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const fillColor = "#69b3a2";
    const hoverColor = "#6797A9";
    const duration = 500;
    const delay = 100;

    // Get margin adjusted width and height
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
        
    useEffect(() => {
        initChart();
        updateChart(props.data);
        updateTooltip(props.data);
    }, [props.data])

    const initChart = () => {
        if(self.current.svg) return;

        // Add margins to graph    
        var svg = d3.select(d3Container.current);

        // Bars Group
        var g = svg.append("g")
            .attr("class", "barchart")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
        var xAxis = svg.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
            .call(d3.axisBottom(x)); 
        
        // Create an axis component with d3.axisLeft       
        var yAxis = svg.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(" + (margin.left) + ", " + margin.top + ")")
            .call(d3.axisLeft(y)); 

        // xAxis Labels
        var xLabelText = props.labels?.x ? props.labels.x : "";
        xAxis.append("text")
            .attr("class", "axis-title")
            .attr("transform", "translate(" + ( width / 2 ) + ", 0)")
            .attr("y", (margin.bottom - 5))
            .attr("text-anchor", "middle")
            .style("fill", "#444444")
            .text(xLabelText)

        // yAxis Labels
        var yLabelText = props.labels?.y ? props.labels.y : "";
        yAxis.append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)translate(" + ( -width / 2 ) + ", 0)")
            .attr("y", - (margin.left - 10))
            .attr("text-anchor", "middle")
            .style("fill", "#444444")
            .text(yLabelText);

        // Define tooltip
        var tooltip = d3.select("body")
            .append("div")	
            .attr("class", "charts-d3-tooltip")				
            .style("opacity", 0)
            .text("");

        self.current = { svg, g, x, y, xAxis, yAxis, tooltip }
    }
    
    const updateChart = (data) => {

        const { svg, g, x, y, xAxis, yAxis } = self.current

		// Min and Max Values
		var ymin = 0;
		var ymax = d3.max(props.data, function(d) { return d.y; });

        // Update x, y scale
		x.domain(props.data.map((d) => d.x))
		y.domain([ymin , ymax])

        // Update x,y axis
        xAxis.transition().duration(800).call(d3.axisBottom(x))
        yAxis.transition().duration(800).call(d3.axisLeft(y))

        // Update and Draw Bars 
        var bars  = g.selectAll("rect").data(data);
        bars.exit()                                                     // Update bars that are removed
            .transition().duration(duration)
            .attr("height", function(d) { return height - y(0); }) 
            .attr("y", function(d) { return y(0); })
            .attr("fill-opacity", 1)
            .remove()
        bars.transition().duration(duration)                                 // Update bars that aren't removed 
            .attr("y", function(d) { return y(d.y); })
            .attr("height", function(d) { return height - y(d.y); })  
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.bandwidth())
            .delay(function(d,i){ return(i * 50)})
        bars.enter().append("rect")                                     // Initialize new bars
            .attr("height", function(d) { return height - y(0); }) 
            .attr("y", function(d) { return y(0); })
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.bandwidth())
            .attr("fill", fillColor)
            .attr("fill-opacity", 1)        
        .transition().duration(duration)                                     // Update new bars
            .attr("y", function(d) { return y(d.y); })
            .attr("height", function(d) { return height - y(d.y); })
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.bandwidth())
            .attr("fill-opacity", 1)
            .delay(function(d,i){ return(i * delay / data.length)})

        /*
        // Draw bars
        g.selectAll("rect")
        .data(data)
        .join("rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.bandwidth())
            .attr("fill", fillColor)
            // no bar at the beginning thus:
            .attr("height", function(d) { return height - y(0); }) // always equal to 0
            .attr("y", function(d) { return y(0); })

        // Animation
        svg.selectAll("rect")
        .data(data)
        .transition()
        .duration(800)
        .attr("y", function(d) { return y(d.y); })
        .attr("height", function(d) { return height - y(d.y); })
        .delay(function(d,i){ return(i * 100)})
        */
    }

    const updateTooltip = (data) => {

        const { svg, tooltip } = self.current

        svg.selectAll("rect")
            .data(data)
            .on("mouseover",function(e, d) {
                d3.select(this).style("fill", hoverColor)
                
                tooltip.style("left", (e.pageX) + "px")		
                    .style("top", (e.pageY - 28) + "px")
                    .transition()		
                    .duration(200)		
                    .style("opacity", .9)		

                tooltip.text(d.y);	
            }) 
            .on("mouseout",function(d){
                d3.select(this).style("fill", fillColor);
                
                tooltip.transition()		
                    .duration(200)		
                    .style("opacity", 0); 
            })
    }

    return (
        <div> 
            <svg ref={d3Container} width={props.width} height={props.height}>
            </svg>
        </div>
    )
}

export default BarChart;