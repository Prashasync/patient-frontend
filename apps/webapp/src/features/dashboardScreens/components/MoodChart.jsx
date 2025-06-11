import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const MoodChart = ({ userData , patient}) => {
  const [selectedView, setSelectedView] = useState("Week");

  if (!userData || userData.length === 0) {
    return <div>No mood data available</div>;
  }

  const groupByView = (data) => {
    const sorted = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const dayData = sorted.slice(-10).map((d) => d.score);
    const dayLabels = sorted.slice(-10).map((d) => d.date);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekData = daysOfWeek.map((day) => {
      const dayEntries = sorted.filter((d) => d.day === day);
      const avg = dayEntries.length
        ? dayEntries.reduce((sum, d) => sum + d.score, 0) / dayEntries.length
        : 0;
      return parseFloat(avg.toFixed(2));
    });

    const monthData = [];
    const monthLabels = [];
    for (let i = 0; i < sorted.length; i += 7) {
      const weekChunk = sorted.slice(i, i + 7);
      const avg = weekChunk.length
        ? weekChunk.reduce((sum, d) => sum + d.score, 0) / weekChunk.length
        : 0;
      monthData.push(parseFloat(avg.toFixed(2)));
      monthLabels.push(`Week ${Math.floor(i / 7) + 1}`);
    }

    const yearData = new Array(12)
      .fill(0)
      .map((_, i) => (i < monthData.length ? monthData[i] : 0));
    const yearLabels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return {
      dataSets: {
        Day: dayData,
        Week: weekData,
        Month: monthData,
        Year: yearData,
      },
      labels: {
        Day: dayLabels,
        Week: daysOfWeek,
        Month: monthLabels,
        Year: yearLabels,
      },
    };
  };

  const { dataSets, labels } = groupByView(userData);

  const chartData = {
    labels: labels[selectedView],
    datasets: [
      {
        label: "Mood Level",
        data: dataSets[selectedView],
        fill: true,
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#7C3AED",
        pointBorderColor: "#7C3AED",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: "#333" },
      },
      x: {
        ticks: { color: "#333" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#7C3AED",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  const views = ["Day", "Week", "Month", "Year"];

  return (
    <div className="mood-chart-container">
      <div className="mood-chart-header">
        <h2 className="mood-chart-title">Mood Chart</h2>
        <div className="mood-chart-buttons">
          {views.map((view) => (
            <button
              key={view}
              className={`mood-chart-button ${
                selectedView === view ? "active" : ""
              }`}
              onClick={() => setSelectedView(view)}
            >
              {view}
            </button>
          ))}
        </div>
      </div>
      <div className="mood-chart-graph">
        <Line key={selectedView} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MoodChart;
