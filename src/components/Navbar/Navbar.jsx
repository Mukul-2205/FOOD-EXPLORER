import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout as authSliceLogout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [productQuery, setProductQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) setName(user.name);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(authSliceLogout());
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleProductSearch = (e) => {
    e.preventDefault();
    if (productQuery.trim()) {
      navigate(`/search/${encodeURIComponent(productQuery.trim())}`);
      setProductQuery('');
    }
  };

  const handleBarcodeSearch = (e) => {
    e.preventDefault();
    if (barcodeQuery.trim()) {
      navigate(`/productlist/${barcodeQuery.trim()}`);
      setBarcodeQuery('');
    }
  };

  return (
    <nav className="w-full bg-zinc-50 py-4 shadow-md dark:bg-neutral-700">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 gap-4 flex-wrap">
        {/* Welcome Message */}
        <span className="text-xl font-semibold text-black dark:text-white">
          Welcome, {name}
        </span>

        {/* Search By Name */}
        <form onSubmit={handleProductSearch} className="flex items-center space-x-2 w-full sm:w-auto">
          <input
            type="text"
            value={productQuery}
            onChange={(e) => setProductQuery(e.target.value)}
            placeholder="Search by name"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm text-black placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400"
          />
          <button type="submit" className="text-gray-700 dark:text-white">
            🔍
          </button>
        </form>

        {/* Search By Barcode */}
        <form onSubmit={handleBarcodeSearch} className="flex items-center space-x-2 w-full sm:w-auto">
          <input
            type="text"
            value={barcodeQuery}
            onChange={(e) => setBarcodeQuery(e.target.value)}
            placeholder="Search by barcode"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm text-black placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400"
          />
          <button type="submit" className="text-gray-700 dark:text-white">
            🔍
          </button>
        </form>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="rounded bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600 transition"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
