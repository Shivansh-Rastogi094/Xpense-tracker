import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card h-full'>  
        <div className='flex items-center justify-between border-b border-alice-200 dark:border-stormy-400 pb-3 mb-4'>
            <h5 className='text-lg font-bold text-stormy-500 dark:text-alice-500'>
                Income Sources
            </h5>
            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base'/> Download
            </button>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {transactions?.length > 0 ? (
                transactions.map((income)=>(
                    <TransactionInfoCard
                        key={income._id}
                        title={income.source}
                        icon={income.icon}
                        date={moment(income.date).format("DD MMM, YYYY")}
                        amount={income.amount}
                        type="income"
                        onDelete={()=>onDelete(income._id)}
                    />
                ))
            ) : (
                <div className="col-span-full py-10 text-center text-stormy-300 dark:text-pearl-600 opacity-60">
                    No income records found.
                </div>
            )}
        </div>
    </div>
  )
}

export default IncomeList