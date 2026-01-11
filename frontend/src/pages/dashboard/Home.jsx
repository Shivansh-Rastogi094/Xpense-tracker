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
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.GET_DASHBOARD_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error while fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const expenseTransactions =
    dashboardData?.last30DaysExpenses?.transactions || [];

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Infocard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparators(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <Infocard
            icon={<LuHandCoins />}
            label="Total Income"
            value={addThousandSeparators(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <Infocard
            icon={<LuWalletMinimal />}
            label="Total Expenses"
            value={addThousandSeparators(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        {/* DASHBOARD SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransaction
            transaction={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransations
            transactions={expenseTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
          data={dashboardData?.last60DaysIncomes?.transactions.slice(0,4) || []}
          totalIncome={dashboardData?.totalIncome}
          />

           <RecentIncome
          data={dashboardData?.last60DaysIncomes?.transactions.slice(0,4) || []}
          onSeeMore={() => navigate("/income")}
          />
          {/* Comments */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
