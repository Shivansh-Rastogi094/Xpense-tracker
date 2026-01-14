import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/UseUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import toast from 'react-hot-toast'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';

// Components
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)
      if (response.data) setExpenseData(response.data)
    } catch (error) {
      toast.error("Failed to fetch expenses")
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category.trim()) return toast.error("Category is required.")
    if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Valid amount required.")
    if (!date) return toast.error("Date is required.")

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, amount, date, icon })
      setOpenAddExpenseModal(false)
      toast.success("Expense added Successfully")
      fetchExpenseDetails()
    } catch (error) {
      toast.error("Failed to add expense")
    }
  }

  const downloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, { responseType: "blob" })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click()
      link.parentNode.removeChild(link);
    } catch (error) {
      toast.error("Failed to download expense sheet")
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Expense Deleted")
      fetchExpenseDetails()
    } catch (error) {
      toast.error("Failed to delete expense")
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
  }, [])

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto space-y-6">
        
        {/* Top Overview Chart */}
        <ExpenseOverview
          transactions={expenseData}
          onExpenseIncome={() => setOpenAddExpenseModal(true)}
        />

        {/* Transactions Grid */}
        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={downloadExpenseDetails}
        />

        {/* Modals */}
        <Modal isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(false)} title="Add Expense">
          <AddExpenseForm openAddExpense={handleAddExpense} />
        </Modal>

        <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null })} title="Delete Expense">
          <DeleteAlert
            content="Are you sure you want to delete this expense record?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense