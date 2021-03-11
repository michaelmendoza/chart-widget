import React, { useState, useContext } from 'react';
import { FilterTypes } from '../models/ChartTypes';
import { ActionTypes } from '../reducers/ChartActionsTypes';
import ChartState from '../states/ChartState';

/**
 * Component contains filter controls for filtering chart data by radius and 
 * shapes. All charts in the chart view are filtered by the status of this component. 
 */
const ChartFilters = () => {
    const { state, dispatch } = useContext(ChartState.ChartContext);

    const handleFilterTypeChange = (filterType: FilterTypes) => {
        const type = (filterType == filterState.filterType) ? FilterTypes.None : filterType;
        dispatch({ type:ActionTypes.UPDATE_FILTER_TYPE, filterType: type });
    }
    
    const handleRadiusChange = (event : any) => {
        dispatch({ type:ActionTypes.UPDATE_FILTER_CIRCLE, circle:{ center:state.chartFilters.circle.center, radius: event.target.value } })
    }
    
    const filterState = state.chartFilters;
    const features = filterState.shapes.features[0].geometry.coordinates[0];

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
                    filterState.filterType === FilterTypes.Circle ? <div className="layout-row">
                        <div className='chart-filters-item' style={{ width: "50%"}}>
                            <label> Center: </label>
                            <span> { "[" + filterState.circle.center[0] + ", " + filterState.circle.center[1] + "]" }  </span>
                        </div>
                        <div className='chart-filters-item' style={{ width: "50%"}}>
                            <label>Radius</label>
                            <input type="text" name="radius" value={filterState.circle.radius} onChange={handleRadiusChange}/>
                        </div>
                    </div> : null
                }
                {
                    filterState.filterType === FilterTypes.Shapes ? <div className="layout-row">
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