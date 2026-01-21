import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentIncome = ({ data = [], onSeeMore }) => {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between border-b border-alice-200 dark:border-stormy-400 pb-3 mb-4">
        <h5 className="text-lg font-bold text-stormy-500 dark:text-alice-500">
            Recent Income
        </h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-2">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 opacity-60">
            <p className="text-sm text-stormy-300 dark:text-pearl-600 text-center">
              No income recorded recently
            </p>
          </div>
        ) : (
          data.slice(0, 5).map((income, index) => (
            <TransactionInfoCard
              key={income._id || index}
              type="income"
              title={income.category || 'Uncategorized'}
              icon={income.icon}
              amount={income.amount}
              date={moment(income.date).format('DD MMM, YYYY')}
              hideDeleteBtn
            />
          ))
        )}
      </div>
    </div>
  )
}

export default RecentIncome