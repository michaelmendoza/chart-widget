import { IChart, IChartState } from '../models/ChartModels';
import { ChartModes } from '../models/ChartTypes';

export enum ActionTypes {
    ADD, 
    DELETE, 
    CLEAR,
    UPDATE, 
    FILTER
}

export type ChartListActions = 
| { type: ActionTypes.ADD; item: any }
| { type: ActionTypes.DELETE; index: number }
| { type: ActionTypes.CLEAR; }

export type ChartFilterActions = 
    | { type: ActionTypes.FILTER; filter: any }

export type ChartViewActions = 
    | { type: ActionTypes.UPDATE; mode: ChartModes }

export type Actions =
    | ChartListActions
    | ChartFilterActions
    | ChartViewActions

export const ChartListReducer = (state: IChart[], action: Actions) => {
    switch(action.type) { 
        case ActionTypes.ADD: 
            return [...state, action.item]
        case ActionTypes.DELETE:
            return state.filter( (item, index) => index != action.index)
        case  ActionTypes.CLEAR:
            return [];
        default:
            return state;
    }
}

export const ChartFilterReducer = (state: any, action: Actions) => {
    switch(action.type) { 
        default:
            return state;
    }
}

export const ChartViewReducer = (state:any, action: Actions) => {
    switch(action.type) { 
        case ActionTypes.UPDATE:
            return {...state, mode:action.mode}
        default:
            return state;
    }
}

export const ChartReducer = (state: IChartState , action: Actions) => {
    console.log("Chart Action: " + action.type + ' ' + action);
    
    let updatedState = { 
        chartList: ChartListReducer(state.chartList, action), 
        chartFilters: ChartFilterReducer(state.chartFilters, action),
        chartView: ChartViewReducer(state.chartView, action)
    }

    return updatedState;
}
