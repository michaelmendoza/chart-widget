import React, {useEffect, useState} from 'react';
import 'normalize.css';
import './App.scss';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import ChartWidget from './Chart/components/ChartWidget';
import ChartState from './Chart/states/ChartState';
import ChartStateDebugger from './Chart/states/ChartStateDebuger';
import Playground from './ChartPlayground/components/Playground';
import ChartDataService from './Chart/services/ChartDataService';
import { MockConfig } from './Chart/services/ChartMockData';
import { MapOptions } from './DataMap/components/MapSelect';
import PointMap from './DataMap/components/PointMap';
import Loading from './Chart/components/Loading/Loading';
import { GeoAdapter } from './Chart/services/DataAdapter';

enum AppModes {
  StartScreen, WidgetScreen, PlaygroundScreen
}

const EntityPointMap = () => {

  const [ready, setReady] = useState(false);
  const [feedName, setFeedName] = useState('');
  const [availableFeeds, setAvailableFeeds] = useState([]);
  const [entityData, setEntityData] = useState([]);

  useEffect(()=> {
    updateFeeds();
  }, [])

  const updateFeeds = () => {
    const fetch = async () => {
      let availableCharts = await ChartDataService.fetchAvailableCharts();
      setFeedName('')
      setAvailableFeeds(availableCharts);
    }
    fetch();
  }
  
  const updateMap = (feedName : string) => {
    if(!feedName) return;

    const fetch = async () => {
      let entityData = await ChartDataService.fetchEntityDataByFeed(feedName);
      entityData = GeoAdapter(entityData); 
      //const entityData: any = ChartDataService.getEntityDataByFeed('Lightning');
      
      setReady(true);
      setEntityData(entityData);
    }
    fetch();
  }

  const handleFeedNameChange = (event : any) => {
    setFeedName(event.target.value);
    updateMap(event.target.value);
  }

  const handleEntityCountChange = (event : any) => {
    
  }

  return (
    <div style={{margin:'2em'}}>

      <label>Entity Events</label>

      <div className='entity-controls'>
          <label>Data Source</label>
          <select onChange={handleFeedNameChange} value={feedName}> 
            <option value={''}>--</option>
            {
              availableFeeds.map((item:any) => <option key={item.name} value={item.name}>{item.name}</option>)
            }
          </select>
      </div>
            
      <div className='entity-controls'>
        <label>Entity Event Count</label>
        <input type="text" name="entitycount" value={entityData.length} onChange={handleEntityCountChange} />
      </div>

        
      {
        ready ? <PointMap map={MapOptions.USAStates} entityData={entityData} max={100000} width={500} height={500}></PointMap> : <Loading></Loading>
      }
      
    </div>
  )
}


function App() {

  const [appMode, setAppMode] = useState(AppModes.WidgetScreen);

  const handleNavClick = (appMode : AppModes) => {
    setAppMode(appMode);
  }

  const navClass = (mode : AppModes) => {
    return mode === appMode ? 'active' : '';
  }
  
  return (
    <div className="app">
      <ChartState.ChartStateProvider>
          <header className="nav">
            <div className="nav-title"> Chart Playground </div>
            <button className={navClass(AppModes.WidgetScreen)} onClick={()=>handleNavClick(AppModes.WidgetScreen)}>Widget</button>
            <button className={navClass(AppModes.PlaygroundScreen)} onClick={()=>handleNavClick(AppModes.PlaygroundScreen)}>Playground</button>
          </header>
          <section className="viewport">
            { appMode === AppModes.PlaygroundScreen ? <Playground/> : null }
            { appMode === AppModes.WidgetScreen ? 
              <div>
                <div className="layout-row layout-space-between"> 
                  <ChartWidget></ChartWidget>
                  <EntityPointMap></EntityPointMap>
                </div>
                <ChartStateDebugger></ChartStateDebugger>
              </div> : null
            }
          </section>
      </ChartState.ChartStateProvider>
    </div>
  );
}

export default App;