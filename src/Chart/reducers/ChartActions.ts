import { ChartModes } from '../models/ChartTypes';

export enum ActionTypes {
    ADD,
    DELETE,
    CLEAR,
    UPDATE,
    FILTER
}

export type ChartListActions = 
{ type: ActionTypes.ADD; item: any; } |
{ type: ActionTypes.DELETE; index: number; } |
{ type: ActionTypes.CLEAR; };

export type ChartFilterActions = { type: ActionTypes.FILTER; filter: any; };

export type ChartViewActions = { type: ActionTypes.UPDATE; mode: ChartModes; };

export type Actions = ChartListActions |
    ChartFilterActions |
    ChartViewActions;
