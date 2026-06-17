export const filterData = (data, filters) => {
  if (!Array.isArray(data)) return [];

  const { category, startDate, endDate } = filters ?? {};
  let filtered = [...data];

  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    filtered = filtered.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });
  }

  return filtered;
};