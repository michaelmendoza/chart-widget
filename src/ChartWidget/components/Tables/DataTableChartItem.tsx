import React, { } from 'react';
import DataTable from './DataTable';

interface Props {
    data: any[],
    columns: string[]
}

const DataTableChartItem: React.FC<Props> = (props) => {

    const width = props.columns.length * 100;

    return (
        <div className="data-table-chart-item" style={{width:"100%", "overflowX": "scroll"}} >
            <div style={{width}}>
                <DataTable {...props}></DataTable>
            </div>
        </div>
    )
}

export default DataTableChartItem;