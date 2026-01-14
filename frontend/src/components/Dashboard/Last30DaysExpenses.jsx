import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  return (
    <div className="card col-span-1 h-full">
      <div className="flex items-center justify-between border-b border-alice-200 dark:border-stormy-400 pb-3">
        <h5 className="text-lg font-bold text-stormy-500 dark:text-alice-500">
            Last 30 Days Expenses
        </h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;