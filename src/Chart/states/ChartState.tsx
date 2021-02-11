import React, { createContext, useReducer } from 'react';
import { IChartState } from '../models/ChartModels';
import { Actions, ChartReducer } from '../reducers/ChartReducers';
import { ChartModes, ChartTypes } from '../models/ChartTypes';
import ChartDataService from '../services/ChartDataService';

const initialState = {
    chartList:[
        { type:ChartTypes.Bar, 
          properties:{ id:0, name:'Chart 1' }, 
          data:ChartDataService.getChartDataItem(0) }
    ], 
    chartFilters: {},
    chartView: { index: 0, mode: ChartModes.ShowCharts }
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