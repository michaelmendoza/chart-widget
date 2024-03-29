import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import LoadingSpinner from '../../Loading/LoadingSpinner';
import { createPointMapData } from '../../../../libraries/GeoMapData';
import { MapConstants, MapOptions } from '../../../../models/MapConstants';

const PointMap = (props) => {
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
            resolve(createPointMapData(100000, props.entityData, props.map, props.filter, props.max));
        });
    
    return (
        
        <div className='point-map'> 
            { 
                svgReady ? <MapSVG {...props} data={mapData}></MapSVG> : <LoadingSpinner></LoadingSpinner>
            }
        </div>
    );
};

PointMap.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    entityData: PropTypes.array,
    filter: PropTypes.array,
    map: PropTypes.array,
    max: PropTypes.number
};

const MapSVG = (props) => {
    const self = useRef({ svg: null });
    const d3Container = useRef(null);
    const mapContainer = useRef(null);
    const fillColor = '#4682b4'; //'#69b3a2'; 
    const fillColor2 = '#69b3a2'; //'#DB6F68'; //"#4682b4"; // #DB6F68
    const strokeColor = '#222222'; 
    const pointRadius = 3;

    useEffect(() => {
        initMap();
        updateMap();
    });

    const initMap = () => {
        if (self.current.svg) return;

        const svg = d3.select(d3Container.current);
        const divCanvas = d3.select(mapContainer.current);

        const canvas = divCanvas.append('canvas')  
            .style('position', 'absolute')
            .style('left', '0')
            .style('pointer-events', 'none');

        // Define the div for the tooltip
        const tooltip = d3.select('body')
            .append('div')	
            .attr('class', 'charts-d3-tooltip')				
            .style('opacity', 0)
            .text('');

        self.current = { svg, canvas, tooltip };
    };

    const updateMap = () => {
        const { svg, canvas, tooltip } = self.current;
        const { geoData, pointData } = props.data;

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
                .style('fill', () => fillColor);

                tooltip.transition()		
                .duration(500)		
                .style('opacity', 0); 
            });
        
            const drawPoints = (canvas, pointData) => {
                const scale = 2;
                const context = canvas.getContext('2d');
                canvas.height = props.height * scale;
                canvas.width = props.width * scale;
                canvas.style.width = props.width + 'px';
                canvas.style.height = props.height + 'px'; 
                context.clearRect(0, 0, props.width, props.height);
                context.globalAlpha = 0.8;
                context.setTransform(scale, 0, 0, scale, 0, 0);
                
                // Clear the canvas from previous drawing
                context.clearRect(0, 0, canvas.width, canvas.height);

                pointData.forEach((d) => {
                    context.beginPath();
                    
                    const x = projection(d.geo)[0];
                    const y = projection(d.geo)[1];
                    context.arc(x, y, pointRadius, 0, 2 * Math.PI);
                    context.fillStyle = fillColor2;
                    context.strokeStyle = strokeColor;
                    context.lineWidth = 1;
                    context.fill();
                    context.stroke();
                });
            };
            
            drawPoints(canvas.node(), pointData);
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
    entityData: PropTypes.array,
    filter: PropTypes.array,
    map: PropTypes.array,
    max: PropTypes.number,
    data: PropTypes.array
};

export default PointMap;