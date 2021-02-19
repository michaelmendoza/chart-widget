import React, { } from 'react';
import Utils from '../../modules/utils';
import DataTableHeaders from './DataTableHeaders';
import DataTableRow from './DataTableRow';
import './data-table.scss';

export const getMockTableData = () =>{ 
    const data = [];
    for(var i = 0; i < 10; i++) {
        data.push({ x: Utils.random(0,100), y:Utils.random(0,100) });
    }
    const keys = ['x','y'];
    return { data:data, keys:keys }
}

interface Props {
    data: any [],
    columns: string []
}

const DataTable: React.FC<Props> = (props) => {

    return (
        <div className="data-table"> 
            <DataTableHeaders columns={props.columns}></DataTableHeaders>
           {
                props.data.map((row : any)=> {
                    return <DataTableRow row={row} columns={props.columns}></DataTableRow>
                }) 
           } 
            
        </div>
    )
}

export default DataTable;