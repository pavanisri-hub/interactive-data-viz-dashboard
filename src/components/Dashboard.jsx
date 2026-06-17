import React, { useState, useEffect, useMemo } from 'react';
import LineChartComponent from './charts/LineChart.jsx';
import BarChartComponent from './charts/BarChart.jsx';
import PieChartComponent from './charts/PieChart.jsx';
import CategoryFilter from './filters/CategoryFilter.jsx';
import DateRangeFilter from './filters/DateRangeFilter.jsx';
import LoadingSpinner from './common/LoadingSpinner.jsx';
import mockData from '../data/mockData.json';
import { filterData } from '../utils/dataTransformers.js';

function Dashboard() {
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(mockData);

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category
    }));
  };

  const handleDateRangeChange = ({ startDate, endDate }) => {
    setFilters((prev) => ({
      ...prev,
      startDate,
      endDate
    }));
  };

  useEffect(() => {
    let isCancelled = false;

    const runFilter = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const nextData = filterData(mockData, filters);

        if (!isCancelled) {
          if (nextData.length === 0) {
            setFilteredData([]);
          } else {
            setFilteredData(nextData);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Error filtering data', err);
          setError('Something went wrong while processing the data.');
          setFilteredData([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    runFilter();

    return () => {
      isCancelled = true;
    };
  }, [filters]);

  const hasEmptyState = useMemo(
    () => !isLoading && !error && filteredData.length === 0,
    [isLoading, error, filteredData.length]
  );

  const filterSummary = useMemo(() => {
    const parts = [];

    if (filters.category) {
      parts.push(`Category: ${filters.category}`);
    } else {
      parts.push('Category: All');
    }

    if (filters.startDate && filters.endDate) {
      parts.push(`Date: ${filters.startDate} → ${filters.endDate}`);
    } else {
      parts.push('Date: Full range');
    }

    return parts.join(' · ');
  }, [filters.category, filters.startDate, filters.endDate]);

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
        <p
          className="dashboard-subtitle"
          aria-live="polite"
          style={{ marginTop: '0.4rem', fontSize: '0.8rem', opacity: 0.9 }}
        >
          {filterSummary}
        </p>
      </header>

      <section
        className="dashboard-filters"
        aria-label="Dashboard filters"
      >
        <CategoryFilter
          value={filters.category}
          onChange={handleCategoryChange}
        />
        <DateRangeFilter
          startDate={filters.startDate}
          endDate={filters.endDate}
          onChange={handleDateRangeChange}
        />
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

      {hasEmptyState && (
        <div className="dashboard-error" role="status">
          No data matches the selected filters. Try adjusting your selection.
        </div>
      )}

      {!isLoading && !error && filteredData.length > 0 && (
        <section
          className="dashboard-charts"
          aria-label="Dashboard charts"
        >
          <LineChartComponent data={filteredData} />
          <BarChartComponent data={filteredData} />
          <PieChartComponent data={filteredData} />
        </section>
      )}
    </section>
  );
}

export default Dashboard;