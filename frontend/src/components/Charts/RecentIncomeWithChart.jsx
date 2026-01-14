import React, { useEffect, useState } from 'react'
import CustomPieChart from './CustomPieChart';

// Palette: Stormy, Pearl, Tangerine, Alice-Dark
const COLORS = ["#006d77", "#83c5be", "#e29578", "#00b4c4"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount
        }));
        setChartData(dataArr);
    }

    useEffect(() => {
        prepareChartData();
        return () => { };
    }, [data]);

    return (
        <div className="card h-full">
            <div className="flex items-center justify-between border-b border-alice-200 dark:border-stormy-400 pb-3 mb-4">
                <h5 className="text-lg font-bold text-stormy-500 dark:text-alice-500">
                    Last 60 Days Income
                </h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`₹${totalIncome}`}
                showTextAnchor
                color={COLORS}
            />
        </div>
    )
}

export default RecentIncomeWithChart