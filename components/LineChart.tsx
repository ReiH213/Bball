"use client";
import { formatLineChartData } from "@/lib/utils";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { color } from "framer-motion";

// Register required components and scales
ChartJS.register(
  CategoryScale, // Register the x-axis category scale
  LinearScale, // Register the y-axis linear scale
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const LineChart = ({ teams }: { teams: TeamPerformance[] }) => {
  const data = formatLineChartData(teams);

  const options = {
    responsive: true,

    scales: {
      x: {
        title: {
          display: true,
          text: "Games",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          color: "000000",
          text: "Performance (1 = Win, 0 = Loss)",
        },
      },
    },
  };

  return (
    <div className="flex  min-w-[30vw]">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
