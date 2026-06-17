import React from 'react';
import Dashboard from './components/Dashboard.jsx';
import './index.css';

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">Interactive Data Visualization Dashboard</h1>
      </header>
      <main className="app-main">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;