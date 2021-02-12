import React, { createContext, useReducer } from 'react';
import { IChartState } from '../models/ChartModels';
import { ChartReducer } from '../reducers/ChartReducers';
import { Actions } from "../reducers/ChartActions";
import { ChartModes, ChartTypes } from '../models/ChartTypes';
import ChartDataService from '../services/ChartDataService';

/**
 * Inital state for ChartState (implements IChartState)
 */
const initialState : IChartState = {
    chartList:[
        { type:ChartTypes.Bar, 
          properties:{ id:0, name:'Chart 1' }, 
          data:ChartDataService.getChartDataItem(0) }
    ], 
    chartFilters: {},
    chartView: { index: 0, mode: ChartModes.ShowCharts }
}

/**
 * ChartContext using React context api
 */
const ChartContext = createContext<{state: IChartState; dispatch: React.Dispatch<Actions>;}>({
    state: initialState,
    dispatch: () => null
  });

/**
 * ChartState Provider allows consuming components to subscribe to context changes in ChartState
 */
const ChartStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(ChartReducer, initialState);

    return (
        <ChartContext.Provider value={{state, dispatch}}>
            { children }
        </ChartContext.Provider>
    )
}

export default { ChartStateProvider, ChartContext };