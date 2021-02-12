import React from 'react';

/**
 * Component contains filter controls for filtering chart data by radius and 
 * shapes. All charts in the chart view are filtered by the status of this component. 
 */
const ChartFilters = () => {
    return (
        <div className="chart-filters layout-row layout-space-between">  
            <span> Filter by </span>
            <span>
            <button>Radius</button>
            <button>Shapes</button>
            </span>

        </div>
    )
}

export default ChartFilters;