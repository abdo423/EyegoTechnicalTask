"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/Store/store";
import { getProducts } from "@/Store/Reducers/productsSlice";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const ChartComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  // Get products from Redux store
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Transform data for the chart
  const labels = products.map((product) => product.title); // Example: product names as labels
  const salesData = products.map((product) => product.price || 0); // Example: sales data

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: salesData,
        backgroundColor: chartType === "bar" ? "rgba(59, 130, 246, 0.7)" : "rgba(59, 130, 246, 0.3)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: chartType === "line" ? 2 : 0,
        fill: chartType === "line",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sales Overview</h2>
        <div className="space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${chartType === "bar" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setChartType("bar")}
          >
            Bar Chart
          </button>
          <button
            className={`px-4 py-2 rounded-md ${chartType === "line" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setChartType("line")}
          >
            Line Chart
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <>
          {chartType === "bar" ? <Bar data={chartData} options={chartOptions} /> : <Line data={chartData} options={chartOptions} />}
        </>
      )}
    </div>
  );
};

export default ChartComponent;
