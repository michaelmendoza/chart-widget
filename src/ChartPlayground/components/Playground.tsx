import React from 'react';
import BarChart from '../../ChartWidget/components/D3Charts/BarChart';
import DualChart from '../../ChartWidget/components/D3Charts/DualChart';
import LineAreaChart from '../../ChartWidget/components/D3Charts/LineAreaChart';
import PieChart from '../../ChartWidget/components/D3Charts/PieChart';
import ScatterPlot from '../../ChartWidget/components/D3Charts/ScatterPlot';
import DataTable, { getMockTableData } from '../../ChartWidget/components/Tables/DataTable';

const Playground = () => {

    const data = [{x:1,y:1,y2:3},{x:2,y:2,y2:2},{x:3,y:3,y2:1}]
    const data2 = [{x:1,y:[1,3]},{x:2,y:[2,2]},{x:3,y:[3,1]}]
    const data3 = getMockTableData()

    return ( 
        <div>
            <div className="layout-row-center"> 
                <BarChart width={200} height={200} data={data}/>
                <PieChart width={200} height={200} data={data}/>
                <LineAreaChart width={200} height={200} data={data}/>
            </div>
            <div className="layout-row-center">
                <DualChart width={200} height={200} data={data2}/>
                <ScatterPlot width={200} height={200} data={data}/> 
            </div>
            <div style={{textAlign:"center", width:"600px", margin:"1em auto"}}>
                <DataTable data={data3.data} columns={data3.keys}></DataTable>
            </div>
            
        </div>
        
    )
}

export default Playground;