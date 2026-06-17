import { filterData } from './dataTransformers';

const sampleData = [
  { id: '1', date: '2023-01-01', category: 'Electronics', value: 100, region: 'North' },
  { id: '2', date: '2023-02-01', category: 'Books', value: 50, region: 'South' },
  { id: '3', date: '2023-03-01', category: 'Electronics', value: 150, region: 'East' }
];

describe('filterData', () => {
  it('returns all data when filters are empty', () => {
    const result = filterData(sampleData, {
      category: '',
      startDate: '',
      endDate: ''
    });
    expect(result).toHaveLength(3);
  });

  it('filters by category', () => {
    const result = filterData(sampleData, {
      category: 'Electronics',
      startDate: '',
      endDate: ''
    });
    expect(result).toHaveLength(2);
    expect(result.every((item) => item.category === 'Electronics')).toBe(true);
  });

  it('filters by date range', () => {
    const result = filterData(sampleData, {
      category: '',
      startDate: '2023-02-01',
      endDate: '2023-03-31'
    });
    expect(result).toHaveLength(2);
    expect(result.map((d) => d.id)).toEqual(['2', '3']);
  });

  it('combines category and date filters', () => {
    const result = filterData(sampleData, {
      category: 'Electronics',
      startDate: '2023-02-01',
      endDate: '2023-03-31'
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('3');
  });
});