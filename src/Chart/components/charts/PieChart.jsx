import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import Points from '../../modules/points';

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
    const colors = ['#FE3701', '#FFB600', '#7DCC00'];

    useEffect(() => {
		var data = props.data ? Points.toXYArray(props.data).y : props.data_values;

        var delay = 0;
        
		// Get Scale
		var width = props.width - margin.left - margin.right;
        var height = props.height - margin.top - margin.bottom;
 
        // Add margins to graph     
        var g = d3.select(d3Container.current).append("g")
            .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");
                
        var pie = d3.pie()
			.padAngle(.02)
			.sort(null);
		var arc = d3.arc()
			.innerRadius(0)
			.outerRadius(height/2);
        
        g.selectAll("path")
			.data(pie(data))
			.enter()
			.append("path")
			.attr("fill", function(d,i) { return colors[i%3]; })
			.transition()
			.delay(function(d, i) { return i * 200 + delay; })
			.duration(200)
			.attrTween('d', function(d) {
				var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
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