import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = ({ transactions, onExpenseIncome}) => {
    const [chartData, setChartData] = useState()
    
    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions)
        setChartData(result)  
        return () => {}
    }, [transactions])
    
  return (
    <div className='card h-full'>
        <div className='flex items-center justify-between border-b border-alice-200 dark:border-stormy-400 pb-3 mb-4'>
            <div>
                <h5 className='text-lg font-bold text-stormy-500 dark:text-alice-500'>
                    Expense Overview
                </h5>
                <p className='text-xs font-medium text-stormy-300 dark:text-pearl-600 mt-0.5'>
                    Track your spending trends over time
                </p>
            </div>
            <button className='add-btn h-10 w-10 !p-0 flex items-center justify-center rounded-xl' onClick={onExpenseIncome}>
                <LuPlus className='text-lg'/>
            </button>
        </div>
        
        <div className='mt-6'>
            <CustomLineChart data={chartData}/>
        </div>
    </div>
  )
}

export default ExpenseOverview