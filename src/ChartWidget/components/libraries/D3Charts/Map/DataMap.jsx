import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import MetricSelect from '../../Selectors/MetricSelect';
import LoadingSpinner from '../../Loading/LoadingSpinner';
import { createDataMapData } from '../../../../libraries/GeoMapData';
import { MapConstants, MapOptions } from '../../../../models/MapConstants';
import { DataMetrics } from '../../../../models/ChartEnums';

const DataMap = (props) => {

    const [metric, setMetric] = useState(DataMetrics.Count);
    const [mapData, setMapData] = useState(null);
    const [svgReady, setSvgReady] = useState(false);
    
    useEffect(() => {
        updateMap();
    }, [metric, props]);
    
    const updateMap = () => {
        setSvgReady(false);

        const fetch = async () => {
            const result = await fetchMapData(metric);
            setMapData(result);
            setSvgReady(true);
        };
        fetch();
    };

    const fetchMapData = async (metric) => new Promise((resolve) => {
            resolve(createDataMapData(100000, props.entityData, props.map, props.filter, metric));
        });

    return (
        <div className='data-map'> 
            <MetricSelect metric={metric} setMetric={setMetric}></MetricSelect> 
            { 
                svgReady ? <MapSVG {...props} data={mapData}></MapSVG> : <LoadingSpinner></LoadingSpinner>
            }
        </div>
    );
};

DataMap.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    entityData: PropTypes.array,
    map: PropTypes.array,
    filter: PropTypes.array
  };

const MapSVG = (props) => {
    const d3Container = useRef(null);
    const fillColor = '#4682b4'; //'#69b3a2'; 
    const fillColor2 = '#69b3a2'; //'#DB6F68'; //"#4682b4"; // #DB6F68

    useEffect(() => {
        drawMap();
    });

    const drawMap = () => {
        const {geoData, pointsInPolygons} = props.data;

        const svg = d3.select(d3Container.current);
        let max = 0;
        const keys = Object.keys(pointsInPolygons);
        keys.forEach((key) => {
            max = max > pointsInPolygons[key] ? max : pointsInPolygons[key];
        });
        const color = d3.scaleLinear().domain([0, max])
            .range([fillColor, fillColor2]);

        // Define the div for the tooltip
        const tooltip = d3.select('body')
            .append('div')	
            .attr('class', 'charts-d3-tooltip')				
            .style('opacity', 0)
            .text('a simple tooltip');

        //Define map projection
        let projection = d3.geoMercator()
            .translate([props.width / 2, props.height / 2])
            .center(MapConstants[props.map].center)
            .rotate(MapConstants[props.map].rotate)
            .scale(MapConstants[props.map].scale);

        if (props.map === MapOptions.USAStates || props.map === MapOptions.USACounties) {
            projection = d3.geoAlbers()
                .scale(700)
                .center([24, 38.7]);    
        }

        //Define path generator
        const path = d3.geoPath()
            .projection(projection);
        
        const mapG = svg.append('g');
        mapG.selectAll('path')
            .data(geoData.features)
            .enter()
            .append('path')
            .attr('d', path)
            .style('stroke-dasharray', ('3, 3'))
            .style('fill', (d) => color(pointsInPolygons[d.properties.name])) //"steelblue")
            .style('stroke', 'white')
            .style('stroke-width', 0.1)
            .style('opacity', 0.8)
            .on('mouseover', function (e, d) {
                d3.select(this)
                .style('fill', 'gray');
                
                tooltip
                .style('left', (e.pageX) + 'px')		
                .style('top', (e.pageY - 28) + 'px')
                .transition()		
                .duration(200)		
                .style('opacity', 0.9);		

                tooltip.text(d.properties.name + ' ' + pointsInPolygons[d.properties.name]);	
            }) 
            .on('mouseout', function () {
                d3.select(this)
                .style('fill', (d) => color(pointsInPolygons[d.properties.name]));

                tooltip.transition()		
                .duration(500)		
                .style('opacity', 0); 
            });

    };

    return (
        <svg ref={d3Container} width={props.width} height={props.height}></svg>
    );
};

MapSVG.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    entityData: PropTypes.array,
    map: PropTypes.array,
    filter: PropTypes.array
  };

export default DataMap;