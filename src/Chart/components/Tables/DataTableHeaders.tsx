import React, { } from 'react';

interface Props {
    columns: string []
}

const DataTableHeaders: React.FC<Props> = (props) => {

    const handleSortUp = () => { }

    const handleSortDown = () => { }

    return (
        <div className="data-table-headers layout-row"> 
        {
            props.columns.map(function(header) {

            var buttonUp = 	<button className='sort-button sort-up'>
                <i className='fas fa-sort-up' onClick={handleSortUp}></i>
            </button>

            var buttonDown = <button className='sort-button sort-down'>
                <i className='fas fa-sort-down' onClick={handleSortDown}></i>
            </button> 

            //buttonUp = header.key == 'selected' ? null : buttonUp;
            //buttonDown = header.key == 'selected' ? null : buttonDown;
            
            return <div className={'data-table-header ' + header + ' flex'} key={header}>
                {header}
                {buttonUp}
                {buttonDown}
            </div>	
            })
        }
        </div>
    )
}

export default DataTableHeaders;