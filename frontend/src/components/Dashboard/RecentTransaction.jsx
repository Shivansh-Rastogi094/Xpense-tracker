import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentTransaction = ({ transaction = [], onSeeMore }) => {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between border-b border-alice-200 dark:border-stormy-400 pb-3 mb-4">
        <h5 className="text-lg font-bold text-stormy-500 dark:text-alice-500">
            Recent Transactions
        </h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-2">
        {transaction.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === 'expense' ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format('DD MMM, YYYY')}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default RecentTransaction