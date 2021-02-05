import React from 'react';
import './App.scss';
import Chart from './components/Chart';
import ChartWidget from './components/ChartWidget';
import ChartState from './states/ChartState';

function App() {
  return (
    <div className="app">
      <ChartState.ChartStateProvider>
          <header className="nav">
            Chart Playground
          </header>
          <section className="viewport">
            <ChartWidget></ChartWidget>
          </section>
      </ChartState.ChartStateProvider>
    </div>
  );
}

export default App;