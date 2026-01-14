import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/UseUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import toast from 'react-hot-toast'

// Components
import IncomeOverview from '../../components/Income/IncomeOverview'
import IncomeList from '../../components/Income/IncomeList'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import Modal from '../../components/Modal'
import DeleteAlert from '../../components/DeleteAlert'

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)
      if (response.data) setIncomeData(response.data)
    } catch (error) {
      toast.error("Failed to fetch income data")
    } finally {
      setLoading(false)
    }
  }

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source.trim()) return toast.error("Source is required.")
    if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Valid amount required.")
    if (!date) return toast.error("Date is required.")

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { source, amount, date, icon })
      setOpenAddIncomeModal(false)
      toast.success("Income added Successfully")
      fetchIncomeDetails()
    } catch (error) {
      toast.error("Failed to add income")
    }
  }

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Income Deleted")
      fetchIncomeDetails()
    } catch (error) {
      toast.error("Failed to delete income")
    }
  }

  const downloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME, { responseType: "blob" })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click()
      link.parentNode.removeChild(link);
    } catch (error) {
      toast.error("Failed to download income sheet")
    }
  }

  useEffect(() => {
    fetchIncomeDetails()
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto space-y-6">
        
        {/* Overview Chart */}
        <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModal(true)}
        />

        {/* Income List Grid */}
        <IncomeList
          transactions={incomeData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={downloadIncomeDetails}
        />

        {/* Modals */}
        <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add Income">
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null })} title="Delete Income">
          <DeleteAlert
            content="Are you sure you want to delete this income record?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income