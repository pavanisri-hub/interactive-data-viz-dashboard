import React from 'react';
import LineChartComponent from './charts/LineChart.jsx';
import BarChartComponent from './charts/BarChart.jsx';
import PieChartComponent from './charts/PieChart.jsx';
import CategoryFilter from './filters/CategoryFilter.jsx';
import DateRangeFilter from './filters/DateRangeFilter.jsx';
import LoadingSpinner from './common/LoadingSpinner.jsx';

function Dashboard() {
  // Real state & data will come in later steps
  const isLoading = false;
  const error = null;

  return (
    <section
      className="dashboard-container"
      aria-label="Interactive data visualization dashboard"
    >
      <header className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p className="dashboard-subtitle">
          Explore dataset insights using interactive filters and charts.
        </p>
      </header>

      <section
        className="dashboard-filters"
        aria-label="Dashboard filters"
      >
        <CategoryFilter />
        <DateRangeFilter />
      </section>

      {isLoading && (
        <div className="dashboard-loading" aria-live="polite">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="dashboard-error" role="alert">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <section
          className="dashboard-charts"
          aria-label="Dashboard charts"
        >
          <LineChartComponent data={[]} />
          <BarChartComponent data={[]} />
          <PieChartComponent data={[]} />
        </section>
      )}
    </section>
  );
}

export default Dashboard;