import React, { useContext } from 'react';
import ChartState from '../states/ChartState';

const ChartStateDebugger = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);

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
                    state.chartList.map((item)=> <li> { JSON.stringify(item, null, 1) } </li>)
                } 
             </ol>
        </div>
    )
}

export default ChartStateDebugger;