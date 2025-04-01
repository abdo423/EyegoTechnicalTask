"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  sortProductsByPrice,
  sortProductsByTitle,
  sortProductsByCategory,
  sortProductsByStock,
  setSortOption,
  setIsDropdownOpen,
  setFilter,
} from "@/Store/Reducers/productsSlice";
import { AppDispatch } from "@/Store/store";

const DashboardTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { products, loading, error, isDropdownOpen, sortOption, filter } =
    useSelector((state: any) => state.products);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleSort = (option: string) => {
    dispatch(setSortOption(option));
    if (option === "Title") {
      dispatch(sortProductsByTitle());
    } else if (option === "Price") {
      dispatch(sortProductsByPrice());
    } else if (option === "Category") {
      dispatch(sortProductsByCategory());
    } else if (option === "Stock") {
      dispatch(sortProductsByStock());
    }
    dispatch(setIsDropdownOpen(false));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  
  const filteredProducts = products.filter((product: any) => {
    return (
      product.title.toLowerCase().includes(filter.toLowerCase()) ||
      product.category.toLowerCase().includes(filter.toLowerCase()) ||
      product.price.toString().includes(filter) ||
      product.stock.toString().includes(filter)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="overflow-x-auto p-4">
      <input
        type="text"
        placeholder="Search by title, category, or price"
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
      />
      
      <div className="relative mb-4 inline-block">
        <button
          onClick={() => dispatch(setIsDropdownOpen(!isDropdownOpen))}
          className="flex items-center justify-between w-40 px-4 py-2 bg-blue-500 my-4 text-white rounded-md hover:bg-blue-600"
        >
          <span>Sort by: {sortOption}</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 w-40 bg-white rounded-md shadow-lg">
            <ul className="py-1">
              {['Title', 'Price', 'Category', 'Stock'].map((option) => (
                <li
                  key={option}
                  onClick={() => handleSort(option)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product: any) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{product.title}</td>
              <td className="border border-gray-300 px-4 py-2">{product.category}</td>
              <td className="border border-gray-300 px-4 py-2">${product.price}</td>
              <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 mx-1 border rounded-md ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardTable;