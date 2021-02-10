import React from 'react';
import './App.scss';
import ChartWidget from './Chart/components/ChartWidget';
import ChartState from './Chart/states/ChartState';

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