import React, { createContext, useReducer } from 'react';
import { ChartConfig, IChartState, ChartItem, IChartItem, ChartFilter } from '../models/ChartModels';
import { Actions, ChartReducer } from '../reducers/ChartReducers';
import { ChartTypes } from '../models/ChartTypes';

/**
 * Inital state for ChartState (implements IChartState)
 */
const initialState : IChartState = { 
    chartList:[], 
    chartFilters: new ChartFilter(),
    chartConfig: new ChartConfig() 
}

/** Interface for StateManager - Contains State helper functions  */
interface IChartStateManager {
    getChartToEdit: () => IChartItem
}

/** 
 * StateManager is a set of helper functions used to orhestrate the interaction between state properties.  
 * Note: As a general rule different state properties shouldn't directly interact with each other.
 */
const stateManagerFactory = (state: IChartState) => {
    return {
        getChartToEdit: () => {
            return state.chartList[state.chartConfig.index];
        }
    }
}

/**
 * ChartContext using React context api
 */
const ChartContext = createContext<{state: IChartState; dispatch: React.Dispatch<Actions>; manager: IChartStateManager}>({
    state: initialState,
    dispatch: () => null,
    manager: stateManagerFactory(initialState)
  });

/**
 * ChartState Provider allows consuming components to subscribe to context changes in ChartState
 */
const ChartStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(ChartReducer, initialState);
    const manager = stateManagerFactory(state)

    return (
        <ChartContext.Provider value={{state, dispatch, manager}}>
            { children }
        </ChartContext.Provider>
    )
}

const ChartState = { ChartStateProvider, ChartContext };
export default ChartState;