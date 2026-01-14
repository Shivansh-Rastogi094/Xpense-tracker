import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

// Palette: Stormy (Primary), Pearl (Secondary), Tangerine (Expense/Action)
const COLORS = ["#006d77", "#83c5be", "#e29578"]

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Income", amount: totalIncome },
        { name: "Total Expense", amount: totalExpense }
    ]

    return (
        <div className='card h-full'>
            <div className="flex items-center justify-between border-b border-alice-200 dark:border-stormy-400 pb-3 mb-4">
                <h5 className="text-lg font-bold text-stormy-500 dark:text-alice-500">
                    Financial Overview
                </h5>
            </div>
            
            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`₹${totalBalance}`}
                color={COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview