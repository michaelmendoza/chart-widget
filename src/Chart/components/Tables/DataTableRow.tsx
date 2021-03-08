import React, { } from 'react';
import Utils from '../../modules/utils';

interface Props {
    row: any,
    columns: string[]
}

/**
 * Data TableRow Component 
 */
const DataTableRow: React.FC<Props> = (props) => {

    return (
        <div className="data-table-row layout-row-center">
            {
                props.columns.map((column: string, index: number) => {
                    var key = column;
                    var cell = props.row[key];
                    cell = Utils.isNumber(cell) ? (Number.isInteger(cell) ? cell : cell.toFixed(4)) : cell;
                    cell = cell instanceof Date ? cell.toDateString() : cell;

                    return <div className={'data-table-cell flex ' + key} key={key}>{cell}</div>
                })
            }
        </div>
    )
}

export default DataTableRow;