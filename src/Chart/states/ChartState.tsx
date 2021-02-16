import React, { createContext, useReducer } from 'react';
import { IChartState } from '../models/ChartModels';
import { Actions, ChartReducer } from '../reducers/ChartReducers';
import { ChartModes, ChartTypes } from '../models/ChartTypes';
import ChartDataService from '../services/ChartDataService';

/**
 * Inital state for ChartState (implements IChartState)
 */
const initialState : IChartState = {
    chartList:[
        { id: 0,
          type:ChartTypes.Bar, 
          properties:{ id:0, name:'Chart 1', dataFeed: 'Population', dataAttr: 'a' }, 
          data:ChartDataService.getChartData('Population', 'a').data }
    ], 
    chartFilters: {},
    chartView: { index: 0, mode: ChartModes.ShowCharts } // active information
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