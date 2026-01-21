import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const safeAmount = Number(
    typeof amount === "object" && amount?.$numberDecimal
      ? amount.$numberDecimal
      : amount
  );

  // Updated Logic: Uses Pearl (Teal) for Income, Tangerine (Orange) for Expense
  const getAmountStyles = () =>
    type === "income"
      ? "bg-pearl-500/10 text-stormy-500 border border-pearl-500/20 dark:bg-pearl-500/20 dark:text-pearl-500"
      : "bg-tangerine-500/10 text-tangerine-500 border border-tangerine-500/20 dark:bg-tangerine-500/20 dark:text-tangerine-500";

  return (
    <div className="group relative flex items-center gap-4 mt-3 p-3 rounded-2xl border border-transparent hover:border-alice-200 hover:bg-alice-600 transition-all dark:hover:bg-stormy-300 dark:hover:border-stormy-400">
      {/* ICON Container: Squircle Shape */}
      <div className="w-12 h-12 flex items-center justify-center rounded-xl text-xl bg-alice-500 text-stormy-500 dark:bg-stormy-400 dark:text-pearl-500">
        <LuUtensils />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-stormy-500 dark:text-alice-500">
            {title}
          </p>
          <p className="text-xs font-medium text-stormy-300 dark:text-pearl-600 mt-1">
            {date}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Delete Button - Only visible on hover */}
          {!hideDeleteBtn && (
            <button
              className="text-stormy-300 hover:text-tangerine-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          {/* Amount Tag */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-bold">
              {type === "income" ? "+" : "-"} ₹{safeAmount || 0}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;