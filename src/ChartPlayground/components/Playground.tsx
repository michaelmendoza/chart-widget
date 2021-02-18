import React, { useState, useContext } from 'react';
import BarChart from '../../Chart/components/Charts/BarChart';
import DualChart from '../../Chart/components/Charts/DualChart';
import LineAreaChart from '../../Chart/components/Charts/LineAreaChart';
import PieChart from '../../Chart/components/Charts/PieChart';
import ScatterPlot from '../../Chart/components/Charts/ScatterPlot';

const Playground = () => {

    const data = [{x:1,y:1,y2:3},{x:2,y:2,y2:2},{x:3,y:3,y2:1}]
    const data2 = [{x:1,y:[1,3]},{x:2,y:[2,2]},{x:3,y:[3,1]}]

    return ( 
        <div className="layout-row"> 
            <BarChart width={200} height={200} data={data}/>
            <PieChart width={200} height={200} data={data}/>
            <LineAreaChart width={200} height={200} data={data}/>
            <DualChart width={200} height={200} data={data2}/>
            <ScatterPlot width={200} height={200} data={data}/>
        </div>
    )
}

export default Playground;