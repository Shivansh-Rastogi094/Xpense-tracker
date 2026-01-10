const Expense = require("../models/Expense");
const xlsx = require("xlsx");

// ===============================
// ADD EXPENSE
// ===============================
exports.addExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, category, amount, date } = req.body;

    // ✅ validate only true required fields
    if (!category || amount === undefined) {
      return res
        .status(400)
        .json({ message: "Category and amount are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      // ✅ use client date ONLY if provided, else fallback to now
      date: date ? new Date(date) : new Date(),
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ===============================
// GET ALL EXPENSES
// ===============================
exports.getAllExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ===============================
// DELETE EXPENSE
// ===============================
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ===============================
// DOWNLOAD EXPENSE EXCEL
// ===============================
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    const excelData = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], // ✅ clean date
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(excelData);

    xlsx.utils.book_append_sheet(wb, ws, "Expenses");

    const filePath = "Expense_details.xlsx";
    xlsx.writeFile(wb, filePath);

    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
