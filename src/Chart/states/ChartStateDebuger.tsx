import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../components/Tables/DataTable';
import ChartState from '../states/ChartState';
import { DataSource } from '../services/ChartDataPipeline';

interface Props {
    item: any
}

const DataSourceTable: React.FC<Props> = (props) => {

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState(['x','y']);

    useEffect(()=> {
        let cache = props.item.dataSource.cache;
        setData(cache);
        if(cache && Array.isArray(cache))
            setColumns(Object.keys(cache[0]))
    }, [props.item]) 
    
    return (
        <div style={{marginTop:"1em"}}>
            { data ? <DataTable data = {data} columns = {columns}></DataTable> : null }
        </div>
    )
}

const ChartStateDebugger = () => {

    const { state } = useContext(ChartState.ChartContext);

    return (
        <div className='chart-state-debugger'> 

            <header> Chart State Debugger </header>
            <label> ChartConfig </label>
            <div> { JSON.stringify(state.chartConfig) } </div>
            <label> ChartFilters </label>
            <div> { JSON.stringify(state.chartFilters) } </div>
            <label> ChartList </label>
            <ol> 
                { 
                    state.chartList.map((item, index)=> { 
                        const { id,name,type,feedName,attributes,dataMetric,historyLength } = item;
                        return <li key={index}> 
                            <div> { JSON.stringify({ id,name,type,feedName,attributes,dataMetric,historyLength }, null, 1) }  </div>
                            <DataSourceTable item={item}></DataSourceTable>
                        </li>
                    })
                } 
             </ol>
        </div>
    )
}

export default ChartStateDebugger;