import React, { } from 'react';

interface Props {
    row: any,
    columns: string []
}

const DataTableRow: React.FC<Props> = (props) => {

    return (
        <div className="data-table-row layout-row"> 
            {
                props.columns.map((column : string, index : number)=> {
                    var key = column;
                    var cell = props.row[key];

                    return <div className={'data-table-cell flex ' + key} key={key}>{cell}</div>
                })
            }
        </div>
    )
}

export default DataTableRow;