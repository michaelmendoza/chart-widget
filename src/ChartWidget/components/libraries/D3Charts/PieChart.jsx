import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import * as Points from '../../../libraries/Points';

/**
 * Plots a svg pie chart using d3. Data can be input as a point array {data} or simple array {data_values}
 * 
 * example:
 * <PieChart width={500} height={500} data_simple={[46, 28, 26]}></PieChart>
 * @param {{width, height, data}} props { width, height, data } 
 */
const PieChart = (props) => {
    
    const self = useRef({ svg: null });
    const d3Container = useRef(null);
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const colors = ['#41718C', '#7AB98C', '#C1D773', '#C5895E', '#BE5C5B', '#845ACE', '#5FA1C8']; //['#FE3701', '#FFB600', '#7DCC00'];
    const padAngle = 0.001;
    const duration = 500;
    const delay = 100;

	// Get Scale
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    useEffect(() => {
		const data = props.data ? Points.toXYArray(props.data).y : props.data_values;
        initChart();
        updateSize();
        updateChart(data);
        updateTooltip(data);
    }, [props.data, props.width]);
    
    const initChart = () => {
        if (self.current.svg) return;

        const svg = d3.select(d3Container.current);

        // Create Pie Group 
        const g = d3.select(d3Container.current).append('g')
            .attr('transform', 'translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top) + ')');
        
        const pie = d3.pie()
			.padAngle(padAngle)
			.sort(null);
		const arc = d3.arc()
			.innerRadius(0)
			.outerRadius(height / 2);

        // Define tooltip
        const tooltip = d3.select('body')
        .append('div')	
        .attr('class', 'charts-d3-tooltip')				
        .style('opacity', 0)
        .text('');

        self.current = { svg, g, pie, arc, tooltip };
    };

    const updateSize = () => { 
        const { arc } = self.current;
        arc.outerRadius(height / 2);
    };

    const updateChart = (data) => { 
        const { g, pie, arc } = self.current;
        
        g.selectAll('path')
			.data(pie(data))
			.join('path')
			.attr('fill', (d, i) => colors[i % colors.length])
			.transition()
			.delay((d, i) => i * delay / data.length)
			.duration(duration)
			.attrTween('d', tween2);
        
        /*
        function tween(d) {
            const i = d3.interpolate(d.startAngle, d.endAngle);
            return function (t) {
                d.endAngle = i(t);
                return arc(d);
            };
        }
        */
       
        function tween2(d) {
            const interpolate = d3.interpolate(this._current, d);
            const _this = this;
            return function (t) {
                _this._current = interpolate(t);
                return arc(_this._current);
              };
          }
    };

    const updateTooltip = (data) => { 
        const { g, pie, tooltip } = self.current;

        g.selectAll('path')
        .data(pie(data))
        .on('mouseover', (e, d) => {                
            tooltip
            .style('left', (e.pageX) + 'px')		
            .style('top', (e.pageY - 28) + 'px')
            .transition()		
            .duration(100)		
            .style('opacity', 0.8);		
            tooltip.text(d.data);	
        }) 
        .on('mouseout', () => {
            tooltip.transition()		
            .duration(100)		
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

PieChart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    data_values: PropTypes.array
  };

export default PieChart;