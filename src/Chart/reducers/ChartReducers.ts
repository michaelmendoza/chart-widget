import { IChart, IChartState } from '../models/ChartModels';
import { Actions, ActionTypes } from './ChartActions';

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
