import React from 'react';

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