const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // ===============================
    // TOTAL INCOME
    // ===============================
    const totalIncome = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // ===============================
    // TOTAL EXPENSE
    // ===============================
    const totalExpense = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // ===============================
    // DATE RANGES (FIXED)
    // ===============================
    const now = new Date();

    // ✅ Last 30 days (expenses)
    const last30DaysStart = new Date(now);
    last30DaysStart.setDate(last30DaysStart.getDate() - 30);
    last30DaysStart.setHours(0, 0, 0, 0);

    // ✅ Last 60 days (income)
    const last60DaysStart = new Date(now);
    last60DaysStart.setDate(last60DaysStart.getDate() - 60);
    last60DaysStart.setHours(0, 0, 0, 0);

    // ===============================
    // LAST 30 DAYS EXPENSES
    // ===============================
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: last30DaysStart },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // ===============================
    // LAST 60 DAYS INCOME
    // ===============================
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: last60DaysStart },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // ===============================
    // RECENT TRANSACTIONS (LAST 5)
    // ===============================
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // ===============================
    // RESPONSE
    // ===============================
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncomes: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
