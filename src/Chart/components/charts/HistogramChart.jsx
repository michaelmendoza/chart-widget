import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

const HistogramChart = (props) => {
    
    const d3Container = useRef(null);
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const colors = ['#FE3701', '#FFB600', '#7DCC00'];
    const fillColor = '#89D7F9'; 
    const textColor = '#222222';
    const binMax = 10;
    const binCount = 10;

    useEffect(() => {
        var data = props.data;
        
		// Get Scale
		var width = props.width - margin.left - margin.right;
        var height = props.height - margin.top - margin.bottom;
 
        // Add margins to graph     
        var svg = d3.select(d3Container.current);
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
        // Get x scale
        var xmax = binMax;
		var x = d3.scaleLinear()
			.domain([0, xmax])
            .range([0, width]);
        
        var histogram = d3.histogram()
            .value(function(d) { return d - 0.1; })
            .domain(x.domain())
            .thresholds(x.ticks(binCount - 1))

        var bins = histogram(data);
        //console.log(bins);

        // Get y scale 
        var ymax = d3.max(bins, function(d) { return d.length; });
		var y = d3.scaleLinear()
			.domain([0 , ymax])
			.range([height, 0]);

        // Create an axis component with d3.axisBottom
        var xAxis = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
            .call(d3.axisBottom(x)); 
        
        // Create an axis component with d3.axisLeft       
        var yAxis = svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (margin.left) + ", " + margin.top + ")")
            .call(d3.axisLeft(y)); 

        // Create histogram
        var bar = g.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
                .attr("x", 1)
                .attr("y", function(d) { return height - y(0); })
                .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
                .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
                .attr("height", function(d) { return height - y(0); })
                .style("fill", fillColor)
        
        // Animate histogram 
        bar.data(bins)
            .transition()
            .duration(1000)
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })

        var format_count = d3.format(",.0f"); 
        var text = g.selectAll("text") 
            .data(bins)
            .enter()
            .append("text")
                .attr("dy", "1.5em")
                .attr("y", function(d) { return y(d.length); })
                .attr("x", function(d) { return  x(d.x0 + 0.5) ; })
                .attr("text-anchor", "middle")
                .style("fill", textColor)
                .style("font-size", 10)
                .style("opacity", function(d, i) { return i >= bins.length - 1 ? 0 : 1})
                .text(function(d) {
                    return format_count(d.length);
                });

        // Label for the x axis
        g.append("text")             
        .attr("transform",
                "translate(" + (width/2) + " ," + 
                            (height + margin.top) + ")")
        .style("text-anchor", "middle")
        .text("Score");

        // Label for the y axis
        g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Count"); 
    }, [])

    return (
        <div> HistogramChart 
            <svg ref={d3Container} width={props.width} height={props.height}>
            </svg>
        </div>
    )
}

export default HistogramChart;