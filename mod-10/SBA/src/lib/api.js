const BASE = 'https://www.themealdb.com/api/json/v1/1';

export const api = {
  categories: () => fetch(`${BASE}/categories.php`).then((r) => r.json()),
  filterByCategory: (categoryName) =>
    fetch(`${BASE}/filter.php?c=${encodeURIComponent(categoryName)}`).then((r) => r.json()),
  lookup: (mealId) =>
    fetch(`${BASE}/lookup.php?i=${encodeURIComponent(mealId)}`).then((r) => r.json()),
  search: (query) =>
    fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`).then((r) => r.json()),
};
