import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import * as Points from '../../services/Points';

/**
 * Plots a svg pie chart using d3. Data can be input as a point array {data} or simple array {data_values}
 * 
 * example:
 * <PieChart width={500} height={500} data_simple={[46, 28, 26]}></PieChart>
 * @param {{width, height, data}} props { width, height, data } 
 */
const PieChart = (props) => {
    
    const d3Container = useRef(null);
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const colors = ['#41718C', '#7AB98C', '#C1D773', '#C5895E', '#BE5C5B', '#845ACE', '#5FA1C8']; //['#FE3701', '#FFB600', '#7DCC00'];
    const padAngle = 0.001;
    const duration = 500;
    const delay = 1000;

    useEffect(() => {
		var data = props.data ? Points.toXYArray(props.data).y : props.data_values;

		// Get Scale
		var width = props.width - margin.left - margin.right;
        var height = props.height - margin.top - margin.bottom;
        
        // Add margins to graph     
        var g = d3.select(d3Container.current).append("g")
            .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");
        
        var pie = d3.pie()
			.padAngle(padAngle)
			.sort(null);
		var arc = d3.arc()
			.innerRadius(0)
			.outerRadius(height/2);
        
        // Define tooltip
        var tooltip = d3.select("body")
        .append("div")	
        .attr("class", "charts-d3-tooltip")				
        .style("opacity", 0)
        .text("");

        g.selectAll("path")
			.data(pie(data))
			.enter()
			.append("path")
			.attr("fill", function(d,i) { return colors[i%colors.length]; })
			.on("mouseover",function(e, d) {                
                tooltip
                .style("left", (e.pageX) + "px")		
                .style("top", (e.pageY - 28) + "px")
                .transition()		
                .duration(100)		
                .style("opacity", .8)		
                tooltip.text(d.data);	
            }) 
            .on("mouseout",function(d){
                tooltip.transition()		
                .duration(100)		
                .style("opacity", 0); 
            })
			.transition()
			.delay(function(d, i) { return i * delay / data.length; })
			.duration(duration)
			.attrTween('d', function(d) {
				var i = d3.interpolate(d.startAngle, d.endAngle);
				return function(t) {
					d.endAngle = i(t);
					return arc(d);
				}
			})
    }, [])

    return (
        <div> 
            <svg ref={d3Container} width={props.width} height={props.height}>
            </svg>
        </div>
    )
}

export default PieChart;