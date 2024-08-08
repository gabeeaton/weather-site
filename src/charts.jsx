import { Line } from "react-chartjs-2";
import { lineGraphData, DoughnutData } from "./App";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
} from "chart.js/auto";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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
          max: 100,
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
      cutout: '60%',

  }
};
    const data = DoughnutData(humidity);
    return <Doughnut options={options} data={data} />;
  }
};
