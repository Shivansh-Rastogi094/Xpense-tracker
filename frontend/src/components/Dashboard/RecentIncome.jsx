import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentIncome = ({ data = [], onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {data.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            No income recorded in the last 30 days
          </p>
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
