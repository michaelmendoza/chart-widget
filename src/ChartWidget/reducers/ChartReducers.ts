import { IChartItem, IChartState } from '../models/ChartInterfaces';
import { ActionTypes } from './ChartActionsTypes';
import { ChartModes, FilterTypes } from '../models/ChartEnums';

export type ChartListActions = 
{ type: ActionTypes.ADD_CHART; item: any; } |
{ type: ActionTypes.DELETE_CHART; item: IChartItem; } |
{ type: ActionTypes.UPDATE_CHART; id: string, updatedChart: any } |
{ type: ActionTypes.CLEAR_ALL_CHARTS; } |
{ type: ActionTypes.UPDATE_ALL_CHARTS; updatedCharts: IChartItem[] };

export const ChartListReducer = (state: IChartItem[], action: Actions) => {
    switch (action.type) { 
        case ActionTypes.ADD_CHART: 
            return [...state, action.item];
        case ActionTypes.DELETE_CHART:
            return state.filter((item, index) => item !== action.item);
        case ActionTypes.CLEAR_ALL_CHARTS:
            return [];
        case ActionTypes.UPDATE_CHART:
            return state.map((chart) => (chart.id === action.id ? action.updatedChart : chart));
        case ActionTypes.UPDATE_ALL_CHARTS:
            return action.updatedCharts;
        default:
            return state;
    }
};

export type ChartFilterActions = 
    { type: ActionTypes.UPDATE_FILTER_TYPE; filterType: FilterTypes; } | 
    { type: ActionTypes.UPDATE_FILTER_CIRCLE; circle: any } |
    { type: ActionTypes.UPDATE_FILTER_SHAPES; shapes: any }

export const ChartFilterReducer = (state: any, action: Actions) => {
    switch (action.type) { 
        case ActionTypes.UPDATE_FILTER_TYPE:
            return { ...state, filterType: action.filterType };
        case ActionTypes.UPDATE_FILTER_CIRCLE:
            return { ...state, circle: action.circle };
        case ActionTypes.UPDATE_FILTER_SHAPES:
            return { ...state, shapes: action.shapes };
        default:
            return state;
    }
};

export type ChartConfigActions = { type: ActionTypes.UPDATE_CHART_MODE; mode: ChartModes; } |
    { type: ActionTypes.UPDATE_CHART_EDITOR; editor: any } |
    { type: ActionTypes.UPDATE_CHART_SIZE; size: { width: number, height: number} } |
    { type: ActionTypes.INCREMENT_UPDATE_COUNTER; }

export const ChartConfigReducer = (state:any, action: Actions) => {
    switch (action.type) { 
        case ActionTypes.UPDATE_CHART_MODE:
            return {...state, mode: action.mode};
        case ActionTypes.UPDATE_CHART_EDITOR:
            return {...state, editor: action.editor};
        case ActionTypes.UPDATE_CHART_SIZE:
            return {...state, size: action.size};
        case ActionTypes.INCREMENT_UPDATE_COUNTER:
            return {...state, updateCounter: state.updateCounter + 1};
        default:
            return state;
    }
};

export type Actions = ChartListActions |
    ChartFilterActions |
    ChartConfigActions;

export const ChartReducer = (state: IChartState, action: Actions) => {
    //console.log('Chart Action: ' + action.type + ' ' + JSON.stringify(action));
    
    const updatedState = { 
        chartList: ChartListReducer(state.chartList, action), 
        chartFilters: ChartFilterReducer(state.chartFilters, action),
        chartConfig: ChartConfigReducer(state.chartConfig, action)
    };
    
    return updatedState;
};
