import React from 'react';
import { render, screen } from '@testing-library/react';
import LineChartComponent from './LineChart';

const data = [
  { id: '1', date: '2023-01-01', category: 'Electronics', value: 100, region: 'North' },
  { id: '2', date: '2023-01-02', category: 'Books', value: 50, region: 'South' }
];

describe('LineChartComponent', () => {
  it('renders chart container and title', () => {
    render(<LineChartComponent data={data} />);

    const heading = screen.getByRole('heading', { name: /sales trend over time/i });
    expect(heading).toBeInTheDocument();

    const region = screen.getByLabelText(/sales trend over time line chart/i);
    expect(region).toBeInTheDocument();
  });
});