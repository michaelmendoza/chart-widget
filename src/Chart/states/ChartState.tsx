import React, { createContext, useReducer } from 'react';
import { IChartState } from '../models/ChartModels';
import { Actions, ChartReducer } from '../reducers/ChartReducers';
import { ChartModes, ChartTypes } from '../models/ChartTypes';

const initialState = {
    chartList:[
        {type:ChartTypes.Bar, data:[{x:'One',y:1},{x:'Two',y:2},{x:"Three",y:3}]}
    ], 
    chartFilters: {},
    chartMode: ChartModes.ShowCharts
}

const ChartContext = createContext<{state: IChartState; dispatch: React.Dispatch<Actions>;}>({
    state: initialState,
    dispatch: () => null
  });

const ChartStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(ChartReducer, initialState);

    return (
        <ChartContext.Provider value={{state, dispatch}}>
            { children }
        </ChartContext.Provider>
    )
}

export default { ChartStateProvider, ChartContext };