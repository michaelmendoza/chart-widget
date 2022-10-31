import React, { useContext, useEffect } from 'react';
import WidgetResizer from './libraries/WidgetResizer';
import ChartFilters from './ChartWidget/ChartFilters';
import ChartView from './ChartWidget/ChartView/ChartView';
import ChartEditor from './ChartWidget/ChartEditor/ChartEditor';
import ChartHeader from './ChartWidget/ChartHeader';
import ChartState from '../state/ChartState';
import { ChartModes } from '../models/ChartEnums';
import ChartControls from './ChartWidget/ChartControls';
import ChartStateDebugger from '../state/ChartStateDebuger';
import { ActionTypes } from '../reducers/ChartActionsTypes';
import '../styles/chart-widget.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import DataServiceProvider from '../services/data/DataServiceProvider';

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
		dispatch({ type: ActionTypes.UPDATE_CHART_SIZE, size });

	};
    
	return ( 
		<div className="chart-widget"> 
			<WidgetResizer size={state.chartConfig.size} updateSize={updateSize}>
				<ChartHeader></ChartHeader>
				{ showCharts ? <ChartControls></ChartControls> : null } 
				{ showCharts ? <ChartFilters></ChartFilters> : null } 
				{ showChartEditor ? <ChartEditor></ChartEditor> : null }
				{ showCharts ? <ChartView></ChartView> : null }
			</WidgetResizer>
		</div>
	);
};

interface ChartWidgetProps {
	dataservice?: any
}

/**
 * Top Chart Widget Component. Connects ChartState to ChartWidget component. 
 */
const ChartWidget = (props : ChartWidgetProps) => {

	const useDebugger = false;

	useEffect(() => {
		if (props.dataservice) DataServiceProvider.setEntityDataService(props.dataservice);
	}, []);
	
	return (
		<ChartState.ChartStateProvider>
			<ChartWidgetComponent></ChartWidgetComponent>
			{ useDebugger ? <ChartStateDebugger></ChartStateDebugger> : null }
		</ChartState.ChartStateProvider>
	);
};

export default ChartWidget;