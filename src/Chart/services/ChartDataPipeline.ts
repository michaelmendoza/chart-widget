
import { DataArrayToBinnedXYArray } from '../modules/Histogram';
import ChartDataService from './ChartDataService';
export enum DataIOTypes {
    Entity, 
    AttributeArray, 
    XYArray, 
    XYPointArray, 
    XTwoYPointArray, 
    XMultiYPointArray
}

export class DataSource {
    feedName: string;
    attribute: string;
    
    constructor(feedName:string, attribute:string = '') {
        this.feedName = feedName;
        this.attribute = attribute;
    }

    toString() : string {
        return 'DataSource: feedName: ' + this.feedName + ', attribute: ' + this.attribute;
    }
    
    fetch() {
        return ChartDataService.fetchChartData(this.feedName, this.attribute)
    }
}

/** DataPipeline for single feed */
export class DataPipeline {
    inputData: any;
    attributes: string[];
    filters: string[] = [];
    inputType : DataIOTypes;
    outputType : DataIOTypes;

    constructor(inputData: any, attributes: string[], inputType: DataIOTypes, outputType: DataIOTypes) {
        this.inputData = inputData;
        this.attributes = attributes;
        this.inputType = inputType;
        this.outputType = outputType;
    }

    getOutputData() {
        switch(this.inputType) {
            case DataIOTypes.Entity:
                return this.transformEntity();
        }
    }

    transformEntity() {
        switch(this.outputType) {
            case DataIOTypes.XYPointArray:
                // TODO: Check for propery data input     

                // Transform EntityData array to an array of attibute values 
                const data = new Array();
                this.inputData.forEach((item : any)=> {  
                    data.push(item.attr[this.attributes[0]]);
                })
                
                // Transform rawData to binned histogram data
                return DataArrayToBinnedXYArray(data);
        }
    }
}

const ChartDataPipeline = () => {
    
}

const ChartDataAdaptor = () => {

}

const ChartDataFilters = () => {

}

const ChartDataTransform = () => {
    
}

export default ChartDataPipeline; 