import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseTransations = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses in last 30 days</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See More <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            No expenses recorded in the last 30 days
          </p>
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
