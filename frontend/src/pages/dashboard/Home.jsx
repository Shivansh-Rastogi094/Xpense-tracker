import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/UseUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import Infocard from "../../components/Cards/Infocard";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandSeparators } from "../../utils/helper";

// Components
import RecentTransaction from "../../components/Dashboard/RecentTransaction";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransations from "../../components/Dashboard/ExpenseTransations";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Charts/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto space-y-6">
        
        {/* 1. TOP STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Infocard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparators(dashboardData?.totalBalance || 0)}
            color="bg-stormy-500" // Primary Teal
          />

          <Infocard
            icon={<LuHandCoins />}
            label="Total Income"
            value={addThousandSeparators(dashboardData?.totalIncome || 0)}
            color="bg-pearl-500" // Secondary Aqua
          />

          <Infocard
            icon={<LuWalletMinimal />}
            label="Total Expenses"
            value={addThousandSeparators(dashboardData?.totalExpense || 0)}
            color="bg-tangerine-500" // Action Orange
          />
        </div>

        {/* 2. GRID SECTIONS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Row 1: Transactions & Overview */}
          <RecentTransaction
            transaction={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          {/* Row 2: Expense Data */}
          <ExpenseTransations
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          {/* Row 3: Income Data */}
          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncomes?.transactions.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome}
          />
          <RecentIncome
            data={dashboardData?.last60DaysIncomes?.transactions.slice(0, 4) || []}
            onSeeMore={() => navigate("/income")}
          />
          
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;