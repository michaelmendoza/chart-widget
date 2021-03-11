import React, {useState} from 'react';
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

enum AppModes {
  StartScreen, WidgetScreen, PlaygroundScreen
}

function App() {

  const [appMode, setAppMode] = useState(AppModes.WidgetScreen);

  const handleNavClick = (appMode : AppModes) => {
    setAppMode(appMode);
  }

  const handleEntityCountChange = () => {
    
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
                  <div style={{margin:'2em'}}>

                    <label>Entity Events</label>
                    <div className='entity-controls'>
                      <label>Entity Event Count</label>
                      <input type="text" name="entitycount" value={MockConfig.entityCount} onChange={handleEntityCountChange} />
                    </div>

                    <PointMap map={MapOptions.USAStates} entityData={ChartDataService.getEntityDataByFeed('Lightning')} max={2000} width={500} height={500}></PointMap>
                  </div>
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