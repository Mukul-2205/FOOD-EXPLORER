// src/services/api.js
const API_BASE = 'https://world.openfoodfacts.org/api/v2';

export const getProducts = async (page = 1, pageSize = 24) => {
  const response = await fetch(`${API_BASE}/search?page=${page}&page_size=${pageSize}`);
  return response.json();
};

export const searchProducts = async (query, page = 1, category = null) => {
  let url = `${API_BASE}/search?page=${page}`;
  if (query) {
    url += `&search_terms=${encodeURIComponent(query)}`;
  }
  if (category) {
    url += `&categories_tags=${encodeURIComponent(category)}`;
  }
  const response = await fetch(url);
  return response.json();
};

export const getProductByBarcode = async (barcode) => {
  const response = await fetch(`${API_BASE}/product/${barcode}.json`);
  return response.json();
};

export const getCategories = async () => {
  const response = await fetch('https://world.openfoodfacts.org/categories.json');
  return response.json();
};