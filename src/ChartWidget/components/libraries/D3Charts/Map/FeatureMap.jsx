import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import LoadingSpinner from '../../Loading/LoadingSpinner';
import { fetchGeoJson } from '../../../../libraries/GeoJson';
import { MapConstants, MapOptions } from '../../../../models/MapConstants';

const FeatureMap = (props) => {

    const [mapData, setMapData] = useState(null);
    const [svgReady, setSvgReady] = useState(false);

    useEffect(() => {
        updateMap();
    }, [props]);
    
    const updateMap = () => {
        setSvgReady(false);

        const fetch = async () => {
            const result = await fetchMapData();
            setMapData(result);
            setSvgReady(true);
        };
        fetch();
    };
    
    const fetchMapData = async () => new Promise((resolve) => {
            resolve({geoData: fetchGeoJson(props.map)});
        });
    
    return (
        
        <div className='point-map'> 
            { 
                svgReady ? <MapSVG {...props} data={mapData}></MapSVG> : <LoadingSpinner></LoadingSpinner>
            }
        </div>
    );
};

FeatureMap.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    features: PropTypes.array,
    map: PropTypes.array
};

const MapSVG = (props) => {
    const d3Container = useRef(null);
    const mapContainer = useRef(null);
    const fillColor = '#4682b4'; //'#69b3a2'; 
    const featureColor = '#f2564b';

    useEffect(() => {
        drawMap();
    });

    const drawMap = () => {
        const {geoData} = props.data;

        const svg = d3.select(d3Container.current);

        // Define the div for the tooltip
        const tooltip = d3.select('body')
            .append('div')	
            .attr('class', 'charts-d3-tooltip')				
            .style('opacity', 0)
            .text('');

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
            .style('fill', () => fillColor) 
            .style('stroke', 'white');

        const mapF = svg.append('g');
        mapF.selectAll('path')
            .data(props.features)
            .enter()
            .append('path')
            .attr('d', path)
            .style('stroke-dasharray', ('3, 3'))
            .style('fill', () => featureColor) 
            .style('stroke', 'white')
            .on('mouseover', function (e, d) {
                d3.select(this)
                .style('fill', 'gray');
                
                tooltip
                .style('left', (e.pageX) + 'px')		
                .style('top', (e.pageY - 28) + 'px')
                .transition()		
                .duration(200)		
                .style('opacity', 0.9);		

                tooltip.text(d.properties.name);	
            }) 
            .on('mouseout', function () {
                d3.select(this)
                .style('fill', () => featureColor);

                tooltip.transition()		
                .duration(500)		
                .style('opacity', 0); 
            });
    };

    return (
        <div ref={mapContainer}>
            <svg ref={d3Container} width={props.width} height={props.height}></svg>
        </div>
    );
};

MapSVG.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    features: PropTypes.array,
    map: PropTypes.array
};

export default FeatureMap;