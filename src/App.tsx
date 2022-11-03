import {useState} from 'react';
import 'normalize.css';
import './App.scss';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import { ChartWidget } from './ChartWidget';
import Playground from './ChartPlayground/components/Playground';
import EntityPointMap from './DataMap/EntityPointMap';

enum AppModes {
  StartScreen, WidgetScreen, PlaygroundScreen
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
          <header className="nav">
            <div className="nav-title"> Chart Playground </div>
            <button className={navClass(AppModes.WidgetScreen)} onClick={()=>handleNavClick(AppModes.WidgetScreen)}>Widget</button>
            <button className={navClass(AppModes.PlaygroundScreen)} onClick={()=>handleNavClick(AppModes.PlaygroundScreen)}>Playground</button>
          </header>
          <section className="viewport">
            { appMode === AppModes.PlaygroundScreen ? <Playground/> : null }
            { appMode === AppModes.WidgetScreen ? 
              <div>
                <div className="layout-row layout-space-between" style={{ position:'relative', margin: "2em" }}> 
                  <EntityPointMap></EntityPointMap>

                  <div className='widget-container'>
                    <ChartWidget></ChartWidget>
                  </div>
                </div>
                
              </div> : null
            }
          </section>
    </div>
  );
}

export default App;