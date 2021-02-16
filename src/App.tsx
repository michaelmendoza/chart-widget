import React, {useState} from 'react';
import 'normalize.css';
import './App.scss';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import ChartWidget from './Chart/components/ChartWidget';
import ChartState from './Chart/states/ChartState';
import ChartStateDebugger from './Chart/states/ChartStateDebuger';
import Playground from './ChartPlayground/components/Playground';

enum AppModes {
  StartScreen, WidgetScreen, PlaygroundScreen
}

function App() {

  const [appMode, setAppMode] = useState(AppModes.WidgetScreen);

  const handleNavClick = (appMode : AppModes) => {
    setAppMode(appMode);
  }

  return (
    <div className="app">
      <ChartState.ChartStateProvider>
          <header className="nav">
            <div className="nav-title"> Chart Playground </div>
            <button onClick={()=>handleNavClick(AppModes.WidgetScreen)}>Widget</button>
            <button onClick={()=>handleNavClick(AppModes.PlaygroundScreen)}>Playground</button>
          </header>
          <section className="viewport">
            { appMode == AppModes.PlaygroundScreen ? <Playground/> : null }
            { appMode == AppModes.WidgetScreen ? 
              <div>
                <ChartWidget></ChartWidget>
                <ChartStateDebugger></ChartStateDebugger>
              </div> : null
            }
          </section>
      </ChartState.ChartStateProvider>
    </div>
  );
}

export default App;