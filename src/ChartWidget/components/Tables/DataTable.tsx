import React, { } from 'react';
import * as Random from '../../services/Random';
import DataTableHeaders from './DataTableHeaders';
import DataTableRow from './DataTableRow';
import './data-table.scss';

/**
 * Mock Data for DataTable
 * @returns Mock data
 */
export const getMockTableData = () => {
    const data = [];
    for (var i = 0; i < 10; i++) {
        data.push({ x: Random.random(0, 100), y: Random.random(0, 100) });
    }
    const keys = ['x', 'y'];
    return { data: data, keys: keys }
}

interface Props {
    data: any[],
    columns: string[]
}

/**
 * Data Table Component 
 */
const DataTable: React.FC<Props> = (props) => {

    const data = props.data.filter( (item, index )=> { return index < 10; } )

    return (
        <div className="data-table">
            <DataTableHeaders columns={props.columns}></DataTableHeaders>
            {
                data.map((row: any, index) => {
                    return <DataTableRow row={row} columns={props.columns} key={index}></DataTableRow>
                })
            }

        </div>
    )
}

export default DataTable;