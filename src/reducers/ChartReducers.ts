import { IChart, IChartState } from '../models/ChartModels';

export enum ActionTypes {
    ADD, 
    DELETE, 
    CLEAR
}

export type Actions =
    | { type: ActionTypes.ADD; item: any }
    | { type: ActionTypes.DELETE; index: number }
    | { type: ActionTypes.CLEAR; }

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

export const ChartReducer = (state: IChartState , action: Actions) => {
    console.log("Chart Action: " + action.type + ' ' + action);
    
    return ({ 
        chartList: ChartListReducer(state.chartList, action), 
        chartFilters: ChartFilterReducer(state.chartFilters, action)
    })
}
