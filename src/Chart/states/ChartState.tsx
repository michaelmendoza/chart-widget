import React, { createContext, useReducer } from 'react';
import { ChartConfig, IChartState, ChartItem } from '../models/ChartModels';
import { Actions, ChartReducer } from '../reducers/ChartReducers';
import { ChartTypes, DataTypes } from '../models/ChartTypes';
import ChartDataService from '../services/ChartDataService';

/**
 * Inital state for ChartState (implements IChartState)
 */
const initialState : IChartState = { 
    chartList:[ 
        new ChartItem('Chart 1', 
        ChartTypes.Bar, 
        'Population', 
        ['b'], 
        { type: DataTypes.ChartData, data:ChartDataService.getChartData('Population', 'a').data}) 
    ], 
    chartFilters: {},
    chartConfig: new ChartConfig() 
}

/** 
 * StateManager is a set of helper functions used to orhestrate the interaction between state properties.  
 * Note: As a general rule different state properties shouldn't directly interact with each other.
 */
const useStateManager = (state: IChartState) => {
    return {
        getEditChart: () => {
            return state.chartList[state.chartConfig.index];
        }
    }
}

/**
 * ChartContext using React context api
 */
const ChartContext = createContext<{state: IChartState; dispatch: React.Dispatch<Actions>; manager: any}>({
    state: initialState,
    dispatch: () => null,
    manager: {}
  });

/**
 * ChartState Provider allows consuming components to subscribe to context changes in ChartState
 */
const ChartStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(ChartReducer, initialState);
    const manager = useStateManager(state)

    return (
        <ChartContext.Provider value={{state, dispatch, manager}}>
            { children }
        </ChartContext.Provider>
    )
}

export default { ChartStateProvider, ChartContext };