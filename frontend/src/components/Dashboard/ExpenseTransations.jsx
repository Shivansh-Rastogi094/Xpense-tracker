import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseTransations = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between border-b border-alice-200 dark:border-stormy-400 pb-3 mb-4">
        <h5 className="text-lg font-bold text-stormy-500 dark:text-alice-500">
          Expenses (Last 30 Days)
        </h5>
        <button className="card-btn" onClick={onSeeMore}>
          See More <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-2">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 opacity-60">
            <p className="text-sm text-stormy-300 dark:text-pearl-600 text-center">
              No expenses recorded recently.
            </p>
          </div>
        ) : (
          transactions.slice(0, 5).map((expense, index) => (
            <TransactionInfoCard
              key={expense._id || index}
              type="expense"
              title={expense.category || "Uncategorized"}
              icon={expense.icon}
              amount={expense.amount}
              date={moment(expense.date).format("DD MMM, YYYY")}
              hideDeleteBtn
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseTransations;