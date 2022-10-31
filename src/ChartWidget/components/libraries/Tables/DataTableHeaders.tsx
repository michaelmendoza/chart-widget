import React, { } from 'react';

interface Props {
    columns: string[]
}

/**
 * Data Table Headers Component 
 */
const DataTableHeaders: React.FC<Props> = (props : Props) => {

    const handleSortUp = () => { };

    const handleSortDown = () => { };

    return (
        <div className="data-table-headers layout-row-center">
            {
                props.columns.map((header) => 
                    <div className={'data-table-header ' + header + ' flex'} key={header}>
                        {header}
                    </div>)
            }
        </div>
    );
};

export default DataTableHeaders;