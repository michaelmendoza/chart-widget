import { ChartModes, ChartTypes, DataMetrics } from './ChartEnums';
import { IChartConfig } from './ChartInterfaces';


export class ChartConfig implements IChartConfig {
    index: number = 0;
    mode: ChartModes = ChartModes.ShowCharts;
    mock: any = { entityCount: 10000 };
    editor: any = {
        chartType: ChartTypes.Bar,
        name: 'New Chart',
        feed: { name: '', id: '', attr: [] },
        feedId: '',
        feedName: 'Population',
        attributes: ['', ''],
        metric: DataMetrics.Count,
        history: 30,
        multiChartTypes: [ChartTypes.Bar, ChartTypes.LineArea],
        availableFeeds: [{ name: 'Population', attr: ['a', 'b', 'c', 'd'] }, { name: 'Lightning', attr: ['a', 'b'] }],
    };
    size = {
        width: 600,
        height: 1200
    };
    updateCounter = 0;
}
