import { FilterTypes } from './ChartEnums';
import { MockFilterData } from '../services/data/MockFilterData';
import { IChartFilter } from './ChartInterfaces';


export class ChartFilter implements IChartFilter {
    filterType: FilterTypes = FilterTypes.None;
    circle: any = MockFilterData().circle;
    shapes: any = MockFilterData().geoJson;
}
