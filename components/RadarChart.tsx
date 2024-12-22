"use client";
import React from "react";
import { motion } from "framer-motion";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ players }: { players: playerPerGame[] }) => {
  const top5Players = players
    .sort((a, b) => b.pointsPerGame - a.pointsPerGame)
    .slice(0, 5); // Get top 5 players by points per game
  const colors = [
    { background: "rgba(255, 99, 132, 0.2)", border: "rgba(255, 99, 132, 1)" },
    { background: "rgba(54, 162, 235, 0.2)", border: "rgba(54, 162, 235, 1)" },
    { background: "rgba(75, 192, 192, 0.2)", border: "rgba(75, 192, 192, 1)" },
    {
      background: "rgba(153, 102, 255, 0.2)",
      border: "rgba(153, 102, 255, 1)",
    },
    { background: "rgba(255, 159, 64, 0.2)", border: "rgba(255, 159, 64, 1)" },
  ];
  const data = {
    labels: ["Points", "Assists", "Rebounds", "Steals", "Blocks"],
    datasets: top5Players.map((player, index) => ({
      label: player.name,
      data: [
        player.pointsPerGame || 0,
        player.assistsPerGame || 0,
        player.reboundsPerGame || 0,
        player.stealsPerGame || 0,
        player.blocksPerGame || 0,
      ],
      backgroundColor: colors[index % colors.length].background,
      borderColor: colors[index % colors.length].border,
      borderWidth: 2,
    })),
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          display: true,
          color: "#000000", // Color of the tick labels
          backdropColor: "rgba(0, 0, 0, 0)", // Remove background behind ticks
          font: {
            family: "Arial", // Change font family
            size: 12, // Change font size
          },
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.3)", // Lines radiating from the center
        },
        grid: {
          color: "rgba(255, 255, 255, 0.8)", // Circular gridlines
        },
        pointLabels: {
          color: "#fff", // Color of labels around the chart (e.g., Points, Assists)
          font: {
            family: "Arial", // Change font family
            size: 14, // Change font size
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,

        labels: {
          color: "#fff", // Color of legend text
          font: {
            family: "Arial", // Font family for legend
            size: 14, // Font size for legend
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Tooltip background color
        titleColor: "#fff", // Tooltip title color
        bodyColor: "#fff", // Tooltip body color
        cornerRadius: 5, // Tooltip corner radius
        bodyFont: {
          family: "Arial", // Font family for tooltip text
          size: 13, // Font size for tooltip text
        },
      },
    },
  };

  return (
    <motion.div
      initial={{
        x: 300,
        opacity: 0,
      }}
      animate={{
        transition: { delay: 2, duration: 1.5 },
        x: 0,
        opacity: 1,
      }}
      whileHover={{
        scale: 1.2,
        y: -50,
        transition: { duration: 0.2 },
        background: "rgba(0, 0, 0, 0.50)",
      }}
      className="flex flex-col rounded-xl p-3 justify-start gap-y-12 items-center  w-full h-full "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.20)" }}
    >
      <h1 className="text-xl font-semibold text-white">Top 5 Players</h1>
      <Radar
        className=" bg-opacity-10 rounded-xl p-2"
        data={data}
        options={options}
      />
    </motion.div>
  );
};

export default RadarChart;
