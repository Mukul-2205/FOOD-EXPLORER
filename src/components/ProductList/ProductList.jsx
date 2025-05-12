// src/components/ProductList.jsx
import { useState, useEffect } from 'react';
import { searchProducts } from '../../apiService/api.js';
import ProductCard from '../ProductCard/ProductCard.jsx';
import Navbar from '../Navbar/Navbar.jsx';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Major categories with OpenFoodFacts category IDs
  const majorCategories = [
    { id: null, name: 'All Categories' },
    { id: 'en:beverages', name: 'Beverages' },
    { id: 'en:dairy', name: 'Dairy' },
    { id: 'en:snacks', name: 'Snacks' },
    { id: 'en:meats', name: 'Meats' },
    { id: 'en:fruits-and-vegetables', name: 'Fruits & Vegetables' }
  ];

  // Load products when any filter changes
  useEffect(() => {
    const controller = new AbortController();
    loadProducts(controller.signal);
    return () => controller.abort();
  }, [page, searchQuery, sortOrder, selectedCategory]);

  const loadProducts = async (signal) => {
    setLoading(true);
    try {
      const data = await searchProducts(
        searchQuery, 
        page, 
        selectedCategory,
        { signal }
      );

      const newProducts = data.products || [];
      const totalProducts = data.count || 0;
      
      if (sortOrder) {
        setSorting(true);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      const sortedProducts = sortOrder
        ? [...newProducts].sort((a, b) => {
            const nameA = a.product_name?.toLowerCase() || '';
            const nameB = b.product_name?.toLowerCase() || '';
            return sortOrder === 'asc'
              ? nameA.localeCompare(nameB)
              : nameB.localeCompare(nameA);
          })
        : newProducts;

      setProducts(prev => page === 1 ? sortedProducts : [...prev, ...sortedProducts]);
      setHasMore(page * 24 < totalProducts); // Using 24 as default page size
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error loading products:', error);
      }
    } finally {
      setLoading(false);
      setSorting(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    if (!loading) setPage(prev => prev + 1);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    setPage(1);
    setHasMore(true);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
    setHasMore(true);
    setIsCategoryOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800">
      <Navbar onSearch={handleSearch} />

      <div className="container mx-auto px-4 py-8">
        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          {/* Category dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
            >
              <span>
                {majorCategories.find(c => c.id === selectedCategory)?.name || 'Filter by Category'}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isCategoryOpen && (
              <div className="absolute z-10 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-white/10">
                <div className="p-1">
                  {majorCategories.map((category) => (
                    <button
                      key={category.id || 'all'}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort button */}
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 self-end"
            disabled={sorting}
          >
            {sorting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sorting...
              </span>
            ) : (
              `Sort: ${sortOrder === 'asc' ? 'A → Z' : sortOrder === 'desc' ? 'Z → A' : 'None'}`
            )}
          </button>
        </div>

        {/* Product grid */}
        {loading && page === 1 ? (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={{
                    ...product,
                    // Map the API response to match your ProductCard expectations
                    code: product._id,
                    product_name: product.product_name || 'Unknown Product',
                    image_url: product.image_url || 'https://img.icons8.com/?size=100&id=122635&format=png&color=000000',
                    categories: product.categories || '',
                    ingredients_text: product.ingredients_text || '',
                    nutriscore_grade: product.nutriscore_grade || ''
                  }} 
                />
              ))}
            </div>

            {/* Load More button */}
            <div className="text-center my-12">
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    'Load More'
                  )}
                </button>
              ) : (
                <p className="text-white/70">No more products to load.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;