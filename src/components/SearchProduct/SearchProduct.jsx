import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchProducts } from '../../apiService/api';
import Navbar from '../Navbar/Navbar';
import ProductCard from '../ProductCard/ProductCard';

function SearchProduct() {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    // Reset states when search query changes
    setProducts([]);
    setPage(1);
    setHasMore(false);
    setError(null);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchSearchResults = async () => {
      try {
        if (!query || query.trim().length === 0) {
          setProducts([]);
          setError('Please enter a search term');
          return;
        }

        setLoading(true);
        setError(null);

        const data = await searchProducts(query, page, null, { signal });

        if (data.status === 0) {
          throw new Error(data.status_verbose || 'Failed to fetch products');
        }

        if (!data.products || data.products.length === 0) {
          if (page === 1) {
            setError(`No products found matching "${query}"`);
          }
          setHasMore(false);
          return;
        }

        // Filter products by substring matching with query
        const matchedProducts = data.products.filter(product =>
          product.product_name &&
          product.product_name.toLowerCase().includes(query.toLowerCase())
        );

        if (page === 1 && matchedProducts.length === 0) {
          setError(`No products found with name matching "${query}"`);
        }

        const formattedProducts = matchedProducts.map(product => ({
          code: product._id || product.code,
          product_name: product.product_name || 'Unknown Product',
          image_url: product.image_url || 'https://img.icons8.com/?size=100&id=122635&format=png&color=000000',
          categories: product.categories || '',
          ingredients_text: product.ingredients_text || '',
          nutriscore_grade: product.nutriscore_grade || '',
          ...product
        }));

        setProducts(prev =>
          page === 1 ? formattedProducts : [...prev, ...formattedProducts]
        );
        setHasMore(data.products.length >= 24); // Assuming page size is 24
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Search error:', err);
          setError(err.message || 'Failed to fetch search results');
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();

    return () => controller.abort();
  }, [query, page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Search results for: <span className="text-blue-300">"{query}"</span>
        </h1>

        {loading && page === 1 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-red-400">{error}, Retry</p>
        ) : products.length === 0 ? (
          <p className="text-white/70">No products found matching your search</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.code} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
