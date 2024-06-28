import React, { useState } from "react";
import Dropdown from "./DropDown";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CountChart from "./CountChart";
import NewsAnalyticsMonthlyCount from "./NewsAnalyticsMonthlyCount";
import NewsAnalyticsYearly from "./NewsAnalyticsYearly";
import YtNewsAnalyticsYearly from "./YtNewsAnalyticsYearly";
import YtNewsMonthlyAnalytics from "./YtNewsMonthlyAnalytics";

const Analytics = () => {
  return (
    <div className="grid grid-cols-1 1000px:grid-cols-2 grid-rows-4 1000px:grid-rows-2 w-full gap-4">
      <NewsAnalyticsYearly />
      <YtNewsAnalyticsYearly />
      <NewsAnalyticsMonthlyCount />
      <YtNewsMonthlyAnalytics />
    </div>
  );
};

export default Analytics;
