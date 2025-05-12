import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { getProductByBarcode } from '../../apiService/api'; // ✅ use your service

function ProductDetails() {
  const { code } = useParams(); // barcode from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByBarcode(code);
        if (data.status === 1) {
          setProduct(data.product);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch product.');
      }
    };

    fetchProduct();
  }, [code]);

  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!product) return <p className="text-center mt-8 text-gray-500">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-8 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 md:py-16 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            {/* Product Image */}
            <div className="flex items-center justify-center h-full max-w-md lg:max-w-full mx-auto">
                <img
                    className="w-full max-w-lg rounded-xl shadow-lg"
                    src={product.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={product.product_name}
                />
            </div>


            {/* Product Info */}
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {product.product_name || 'Unnamed Product'}
              </h1>

              {product.brands && (
                <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                  Brand: <span className="font-medium">{product.brands}</span>
                </p>
              )}

              <p className="text-xl font-bold text-green-600 mt-4">
                {product.price ? `$${product.price}` : 'Price not available'}
              </p>

              {/* Add to Cart & Favorite */}
             

              <hr className="my-6 border-gray-300 dark:border-gray-700" />

              {/* Category */}
              {product.categories && (
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Category:</strong> {product.categories}
                </p>
              )}

              {/* Ingredients */}
              {product.ingredients_text && (
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Ingredients:</strong> {product.ingredients_text}
                </p>
              )}

              {/* Nutrition Grade */}
              {product.nutrition_grades && (
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Nutrition Grade:</strong>{' '}
                  <span className="uppercase font-semibold">{product.nutrition_grades}</span>
                </p>
              )}

              {/* Description */}
              {product.generic_name && (
                <p className="mt-4 text-gray-500 dark:text-gray-400">{product.generic_name}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
