import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../components/libraries/Tables/DataTable';
import ChartState from './ChartState';

interface Props {
    item: any
}

const DataSourceTable: React.FC<Props> = (props : Props) => {

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState(['x', 'y']);

    useEffect(() => {
        const cache = props.item.dataSource.cache;
        setData(cache);
        if (cache && Array.isArray(cache)) {
            setColumns(Object.keys(cache[0]));
        }
    }, [props.item]);
    
    return (
        <div style={{marginTop: '1em'}}>
            { data ? <DataTable data = {data} columns = {columns}></DataTable> : null }
        </div>
    );
};

const ChartStateDebugger = () => {

    const [show, setShow] = useState(false);
    const { state } = useContext(ChartState.ChartContext);

    const handleShowToggle = () => {
        setShow(!show);
    };
    
    return (
        <div className='chart-state-debugger' >  
            <button onClick={handleShowToggle}> Debug </button>
            <section className={show ? '' : 'hidden'}>
                <header> Chart State Debugger </header>
                <label> ChartConfig </label>
                <div> { JSON.stringify(state.chartConfig) } </div>
                <label> ChartFilters </label>
                <div> { JSON.stringify(state.chartFilters) } </div>
                <label> ChartList </label>
                <ol> 
                    { 
                        state.chartList.map((item, index) => { 
                            const { id, name, type, feedName, attributes, dataMetric, historyLength } = item;
                            return <li key={index}> 
                                <div> { JSON.stringify({ id, name, type, feedName, attributes, dataMetric, historyLength }, null, 1) }  </div>
                                <DataSourceTable item={item}></DataSourceTable>
                            </li>;
                        })
                    } 
                </ol>
            </section>
            
        </div>
    );
};

export default ChartStateDebugger;