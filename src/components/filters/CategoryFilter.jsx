import React from 'react';

function CategoryFilter({ value, onChange }) {
  const handleChange = (event) => {
    onChange?.(event.target.value || '');
  };

  return (
    <div className="filter-group">
      <label htmlFor="category-filter" className="filter-label">
        Category
      </label>
      <select
        id="category-filter"
        className="filter-control"
        aria-label="Filter by category"
        value={value || ''}
        onChange={handleChange}
      >
        <option value="">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="Clothing">Clothing</option>
      </select>
    </div>
  );
}

export default CategoryFilter;