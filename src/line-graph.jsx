import { Line } from "react-chartjs-2";
import {lineGraphData} from "./App"

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineGraph = () => {
  const options = {};
  
  console.log(lineGraphData);
  return <Line options={options} data={lineGraphData} />;
};
