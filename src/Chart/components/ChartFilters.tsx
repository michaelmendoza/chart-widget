import React, { useState } from 'react';
import { MockFilterData } from '../../DataMap/services/MockFilterData';

export enum FilterTypes {
    None = 'None',
    Circle = 'Circle',
    Shapes = 'Shapes',
    BBox = 'BBox'
}

/**
 * Component contains filter controls for filtering chart data by radius and 
 * shapes. All charts in the chart view are filtered by the status of this component. 
 */
const ChartFilters = () => {
    const geoJson = MockFilterData().geoJson;
    const [state, setState] = useState({ filterType:FilterTypes.None, circle:{center:[-111.8408203125, 40.74725696280421], radius:100}, shapes: geoJson });
    const features = state.shapes.features[0].geometry.coordinates[0];

    const handleFilterTypeChange = (type: FilterTypes) => {
        (type == state.filterType) ? setState({ ...state, filterType:FilterTypes.None }) : setState({ ...state, filterType:type })
    }

    const handleRadiusChange = (event : any) => {
        setState({ ...state, circle:{ center:state.circle.center, radius: event.target.value} })
    }

    return (
        <div className="chart-filters">
            <div className="layout-row-center layout-space-between">
                <span> Filter by </span>
                <span>
                    <button onClick={() => handleFilterTypeChange(FilterTypes.Circle)}>Radius</button>
                    <button onClick={() => handleFilterTypeChange(FilterTypes.Shapes)}>Shapes</button>
                </span>
            </div>
                {
                    state.filterType === FilterTypes.Circle ? <div className="layout-row">
                        <div className='chart-filters-item' style={{ width: "50%"}}>
                            <label> Center: </label>
                            <span> { "[" + state.circle.center[0] + ", " + state.circle.center[1] + "]" }  </span>
                        </div>
                        <div className='chart-filters-item' style={{ width: "50%"}}>
                            <label>Radius</label>
                            <input type="text" name="radius" value={state.circle.radius} onChange={handleRadiusChange}/>
                        </div>
                    </div> : null
                }
                {
                    state.filterType === FilterTypes.Shapes ? <div className="layout-row">
                        <div className='chart-filters-item'>
                            <label> GeoJson Features: </label>
                            <div> { JSON.stringify(features) } </div>
                        </div>
                    </div> : null
                }
        </div>
    )
}

export default ChartFilters;