import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/UseUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import toast from 'react-hot-toast'
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data:null
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

   // fetch all expense details
  const fetchExpenseDetails = async ()=> {
    if(loading)
      setLoading(true)

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      )

      if(response.data)
        setExpenseData(response.data)
    }catch(error){
      console.log("Something went wrong, Try again later",error)
    }finally{
      setLoading(false)
    }
  }
  // handle add Expense 
  const handleAddExpense = async (expense) => {
    const {category, amount, date, icon} = expense;
    // validation checks
    
    if(!category.trim()){
      toast.error("Category is required.")
      return ;
    }
    
    if(!amount || isNaN(amount) || Number(amount) <=0) {
      toast.error("Amount is required and should be a proper number.")
      return;
    }
    
    if(!date){
      toast.error("Date is required.")
      return ;
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category,amount,date,icon})
      setOpenAddExpenseModal(false)
      toast.success("Expense added Successfully")
      fetchExpenseDetails()
    }catch (error){
      console.error(
        "Error in adding Expense:",
        error.response?.data?.message || error.message
      )
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
  
    return () => {}
  }, [])
  

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className=''>
          <div className=''>
            <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={()=>setOpenAddExpenseModal(true)}
            />
          </div>
        </div>
      </div>
      </DashboardLayout>
  )
}

export default Expense