/**  List of Available Chart Types */
export enum ChartTypes { 
    Number = 'Number', 
    Stats = 'Stats',
    Bar = 'Bar', 
    LineArea = 'LineArea', 
    Pie = 'Pie', 
    Histogram = 'Histogram', 
    ScatterPlot = 'ScatterPlot',
    TimeSeries = 'TimeSeries',
    Table = 'Table',
    HeatMap = 'HeatMap'
}

/** List of mode designations for showing Charts vs ChartEditor */
export enum ChartModes { 
    ShowCharts = 'Charts', 
    ShowChartCreator = 'Add Chart',
    ShowChartEditor = 'Edit Chart'
}

/** Types of Chart DataTypes that are supported */
export enum DataTypes {
    ChartData = 'ChartData',
    EntityData = 'EntityData',
    EntityDataByAttribute = 'EntityDataByAttribute'
}

export enum DataMetrics {
    Count = 'Count',
    Sum = 'Sum', 
    Mean = 'Mean', 
    StdDev = 'StdDev', 
    Median = 'Median'
}

export enum FilterTypes {
    None = 'None',
    Circle = 'Circle',
    Shapes = 'Shapes',
    BBox = 'BBox'
}