import { IChart, IChartState } from '../models/ChartModels';
import { ActionTypes } from './ChartActionsTypes';
import { ChartModes } from '../models/ChartTypes';

export type ChartListActions = 
{ type: ActionTypes.ADD_CHART; item: any; } |
{ type: ActionTypes.DELETE_CHART; index: number; } |
{ type: ActionTypes.CLEAR_ALL_CHARTS; } |
{ type: ActionTypes.UPDATE_CHART; index: number, updatedChart: any };

export const ChartListReducer = (state: IChart[], action: Actions) => {
    switch(action.type) { 
        case ActionTypes.ADD_CHART: 
            return [...state, action.item]
        case ActionTypes.DELETE_CHART:
            return state.filter( (item, index) => index != action.index)
        case  ActionTypes.CLEAR_ALL_CHARTS:
            return [];
        case ActionTypes.UPDATE_CHART:
            return state.map((chart) => (chart.id == action.index ? action.updatedChart : chart))
        default:
            return state;
    }
}

export type ChartFilterActions = { type: ActionTypes.FILTER_ALL_CHARTS; filter: any; };

export const ChartFilterReducer = (state: any, action: Actions) => {
    switch(action.type) { 
        default:
            return state;
    }
}

export type ChartViewActions = { type: ActionTypes.UPDATE_CHART_MODE; mode: ChartModes; };

export const ChartViewReducer = (state:any, action: Actions) => {
    switch(action.type) { 
        case ActionTypes.UPDATE_CHART_MODE:
            return {...state, mode:action.mode}
        default:
            return state;
    }
}

export type Actions = ChartListActions |
    ChartFilterActions |
    ChartViewActions;

export const ChartReducer = (state: IChartState , action: Actions) => {
    console.log("Chart Action: " + action.type + ' ' + action);
    
    let updatedState = { 
        chartList: ChartListReducer(state.chartList, action), 
        chartFilters: ChartFilterReducer(state.chartFilters, action),
        chartView: ChartViewReducer(state.chartView, action)
    }

    return updatedState;
}
