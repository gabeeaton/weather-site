import { Line, Doughnut, Bar } from "react-chartjs-2";
import { lineGraphData, DoughnutData, BarData } from "./App";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
  BarElement,
} from "chart.js/auto";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export function LineGraph({ forecastData }) {
  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return null;
  }
  if (forecastData !== null) {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {},
          ticks: {
            color: "white",
          },
        },
        y: {
          grid: {},
          ticks: {
            display: false,
          },
          border: {
            display: false,
          },
          max: 110,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
          },
        },
        chartArea: {
          backgroundColor: "darkgray",
        },
        datalabels: {
          color: "white",
          display: true,
          anchor: "end",
          align: "top",
          font: {
            weight: "bold",
            size: 12,
          },
          offset: 4,
          formatter: (value) => `${value}°`,
        },
      },
      elements: {
        line: {
          borderColor: "white",
          backgroundColor: "rgba(120, 120, 120, 0.5)",
          fill: true,
          tension: 0.3,
        },
        point: {
          backgroundColor: "white",
        },
      },
    };
    const data = lineGraphData(forecastData);
    return <Line options={options} data={data} />;
  }
}

export function DoughnutGauge({ humidity }) {
  if (!humidity || !humidity.main || humidity.main.length === 0) {
    return null;
  }

  if (humidity !== null) {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          display: false,
        },
      },
      cutout: "70%",
      elements: {
        bar: {
          borderColor: "white",
          backgroundColor: "rgba(120, 120, 120, 0.5)",
          fill: true,
          tension: 0.3,
        },
    }
  };

    const data = DoughnutData(humidity);
    return <Doughnut options={options} data={data} />;
  }
}

export function BarChart({ temps }) {
  if (!temps || !temps.main || temps.main.length === 0) {
    return null;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "white", // Set label color to white
        formatter: (value) => `${value}°`, // Add degree symbol
        font: {
          weight: "bold",
          size: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
    },
  };

  const data = BarData(temps);
  return <Bar options={options} data={data} />;
}