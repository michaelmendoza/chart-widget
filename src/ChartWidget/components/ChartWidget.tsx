import React, { useContext, useEffect, useState } from 'react';
import ChartFilters from './ChartFilters';
import ChartView from './ChartView/ChartView';
import ChartEditor from './ChartEditor/ChartEditor';
import ChartHeader from './ChartHeader';
import ChartState from '../states/ChartState';
import { ChartModes } from '../models/ChartTypes';
import ChartControls from './ChartControls';
import ChartStateDebugger from '../states/ChartStateDebuger';
import '../styles/chart-widget.scss';
import { ActionTypes } from '../reducers/ChartActionsTypes';

/**
 * Container component for ChartHeader, ChartFilters, ChartControls and ChartView.
 * Depends on chartView.mode to switch modes from showing chart and chart editor. 
 */
const ChartWidgetComponent = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);

    const showChartEditor = state.chartConfig.mode === ChartModes.ShowChartEditor 
                            || state.chartConfig.mode === ChartModes.ShowChartCreator;
    const showCharts = state.chartConfig.mode === ChartModes.ShowCharts;
    
    const updateSize = (size : { width:number, height: number}) => {
        dispatch({ type:ActionTypes.UPDATE_CHART_SIZE, size: size });

    }

    return ( 
        <div className="chart-widget"> 
            <WidgetResizer size={state.chartConfig.size} updateSize={updateSize}>
                <ChartHeader></ChartHeader>
                { showCharts ? <ChartControls></ChartControls> :  null } 
                { showCharts ? <ChartFilters></ChartFilters> : null } 
                { showChartEditor ? <ChartEditor></ChartEditor> : null }
                { showCharts ? <ChartView></ChartView> : null }
            </WidgetResizer>
        </div>
    )
}

const WidgetResizer = (props : any) => {

    let debounceStart : any = new Date();
    const debounceTime = 10; // time in ms
    const minWidth = 400;
    const minHeight = 400;
    const [size, setSize] = useState({ width:props.size.width, height:props.size.height });

    useEffect(()=>  {
        setSize(props.size);
    }, [props.size])

    const updateSize = (updatedSize : { width:number, height: number}) => {
        setSize(updatedSize);

        let debounceNow : any = new Date();
        if(debounceNow - debounceStart > debounceTime) {
            debounceStart = new Date();
            props.updateSize(updatedSize);
        }
    }

    const handleDrag = (event : any) => {
        event.preventDefault();
        const dx = event.pageX - 28;
        if(dx > minWidth) {
            updateSize({width:dx, height:size.height});
        }
    }

    const handleDragExit = () => {
        console.log("test");
    }

    const resizerStyle : any = { 
        position:"absolute", 
        width: 10, 
        height: size.height, 
        top:0, 
        right: -5, 
        opacity:0, 
        cursor:"col-resize"}

    return ( 
        <div style={{ width:size.width }} > 
            {props.children}

            <div draggable style={resizerStyle} onDrag={handleDrag}></div>
        </div>
    )
}

/**
 * Top Chart Widget Component. Connects ChartState to ChartWidget component. 
 */
const ChartWidget = () => {
    return (
        <ChartState.ChartStateProvider>
            <ChartWidgetComponent></ChartWidgetComponent>
            <ChartStateDebugger></ChartStateDebugger>
        </ChartState.ChartStateProvider>
    )
}

export default ChartWidget;