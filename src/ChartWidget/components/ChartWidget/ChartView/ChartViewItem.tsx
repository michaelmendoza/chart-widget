/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import ChartState from '../../../state/ChartState';
import { ChartTypes } from '../../../models/ChartEnums';
import { ChartViewItemControls } from './ChartViewItemControls';
import LoadingSpinner from '../../libraries/Loading/LoadingSpinner';

import BarChart from '../../libraries/D3Charts/BarChart.jsx';
import BarComparsionChart from '../../libraries/D3Charts/BarComparsionChart.jsx';
import DualChart from '../../libraries/D3Charts/DualChart';
import LineAreaChart from '../../libraries/D3Charts/LineAreaChart';
import PieChart from '../../libraries/D3Charts/PieChart.jsx';
import ScatterPlot from '../../libraries/D3Charts/ScatterPlot.jsx';

import DataMap from '../../libraries/D3Charts/Map/DataMap';
import DataTableChartItem from '../../libraries/Tables/DataTableChartItem';
import { MapOptions } from '../../../models/MapConstants';
import { ChartItem } from '../../../models/ChartItem';

interface Props {
    item: ChartItem,
    index: number
}

/**
 * Contain a single chart and it's associated controls, for use with ChartView
 */
export const ChartViewItem: React.FC<Props> = (props : Props) => {

    const { state } = useContext(ChartState.ChartContext);
    const [data, setData] = useState<any>([]);

    useEffect(() => {

        const fetchData = async () => {
            const fetchPromise = props.item.fetchData(state.chartFilters);
            const result = await fetchPromise;
            setData(result);
            //console.log(result);
        };
        fetchData();

    }, [props.item, state.chartFilters, state.chartConfig.updateCounter]);
    
    const renderChartByChartType = () => {
        const paddingWidth = 28 * 2;
        const width = state.chartConfig.size.width - paddingWidth;
        const height = 250;

        const data = props.item.dataSource.cache;
        const labels = { y: props.item.attributes[0], x: props.item.dataMetric };
        const attributes = props.item.attributes.filter(item => item !== '');

        const editor = state.chartConfig.editor;
        const currentFeed = editor.availableFeeds.find(item => item.name === editor.feedName);
        const columns = currentFeed.attr;

        if (!data) {
            return <div className='layout-center' style={{ width: width + 'px', height: '500px' }}>
                <div>
                    <LoadingSpinner></LoadingSpinner>
                    <div>Loading</div>
                </div>
            </div>;
        }
        
        if (data.length === 0) return <ChartViewItemNoDataInView></ChartViewItemNoDataInView>;

        switch (props.item.type) {
            case ChartTypes.Number:
                return <NumberChartItem width={width} height={100} data={data}></NumberChartItem>;
            case ChartTypes.Stats:
                return <StatsChartItem width={width} height={height} data={data}></StatsChartItem>;
            case ChartTypes.Bar:
                if (attributes.length === 1) { // Simple Bar Chart 
                    return <BarChart width={width} height={height} data={data} labels={labels}/>;
                } 
                else { // Muliple Bar Chart 
                    return <BarComparsionChart width={width} height={height} data={data} />;
                } 
            case ChartTypes.Pie:
                return <PieChart width={width} height={height} data={data} />;
            case ChartTypes.LineArea:
                return <LineAreaChart width={width} height={height} data={data} />;
            case ChartTypes.ScatterPlot:
                return <ScatterPlot width={width} height={height} data={data} />;
            case ChartTypes.TimeSeries:
                return <DualChart width={width} height={height} data={data} />;
            case ChartTypes.HeatMap:
                return <DataMap map={MapOptions.USAStates} width={width} height={500} entityData={data}></DataMap>;
            case ChartTypes.Table:
                return <DataTableChartItem data={data} columns={columns}></DataTableChartItem>;
            default:
                return null;
        }
    };

    return (
        <li className='chart-view-item'>
            <ChartViewItemControls index={props.index} item={props.item}></ChartViewItemControls>
            <div className='chart-view-item-title'> {props.item.name} </div>
            {renderChartByChartType()}
        </li>
    );
};

/**
 * No Data - Chart View Item
 */
export const ChartViewItemNoData = () => <div className="chart-view-item-no-data"> Please Add Chart </div>;

/**
 * No Data In View - Chart View Item
 */
export const ChartViewItemNoDataInView = () => <div className="chart-view-item-no-data-in-view"> No data in view </div>;

/**
 * Number Chart - Chart View Item
 */
export const NumberChartItem = ({ data, width, height }: any) => (
        <div className='number-chart-item layout-center' style={{ width, height }}>
            <div className="flex-50">
                <label>Count:</label>
                <div className='stats-item'>{data}</div>
            </div>
        </div>
    );

/**
 * Stats Chart - Chart View Item
 */
export const StatsChartItem = ({ data, width, height }: any) => (
        <div className='stats-chart-item layout-row-center flex-wrap' style={{ width, height }}>
            <div className="flex-50">
                <label>Count:</label>
                <div className='stats-item'>{data.count} </div>
            </div>
            <div className="flex-50">
                <label>Mean:</label>
                <div className='stats-item'>{data.mean.toFixed(4)}</div>
            </div>
            <div className="flex-50">
                <label>Median:</label>
                <div className='stats-item'>{data.median.toFixed(4)}</div>
            </div>
            <div className="flex-50">
                <label>Sum:</label>
                <div className='stats-item'>{data.sum.toFixed(4)}</div>
            </div>
            <div className="flex-50">
                <label>Std Dev:</label>
                <div className='stats-item'>{data.stddev.toFixed(4)}</div>
            </div>
        </div>
    );