import React from 'react';
import Card2 from '../../assets/images/Card2.png';
import { LuTrendingUp } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Side */}
      <div className="flex-1 w-full md:w-[60vw] px-12 pt-8 pb-12 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Xpense Tracker</h2>
        <div className="flex-grow">{children}</div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex relative w-[40vw] h-screen bg-violet-50 items-center justify-center overflow-hidden">
        {/* Decorative Shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-10 -left-10 opacity-80"></div>
        <div className="w-52 h-60 rounded-[60px] border-[18px] border-fuchsia-600 absolute top-[25%] -right-12 opacity-90"></div>
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-10 -right-10 opacity-80"></div>

        {/* Stats Card + Image */}
        <div className="relative z-20 flex flex-col items-center gap-8">
          <StatsInfoCard
            icon={<LuTrendingUp />}
            label="Track Your Income & Expense"
            value="430,000"
            color="bg-purple-600"
          />

          <img
            src={Card2}
            alt="Card"
            className="w-64 lg:w-[75%] object-contain rounded-2xl shadow-lg shadow-purple-300/30"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-md shadow-purple-400/20 border border-gray-200/20 hover:shadow-purple-300/30 transition-all duration-200">
      {/* Icon Circle */}
      <div
        className={`flex items-center justify-center w-14 h-14 text-[28px] text-white ${color} rounded-full drop-shadow-lg shrink-0`}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center">
        <h6 className="text-sm text-gray-500 font-medium">{label}</h6>
        <span className="text-2xl font-semibold text-gray-800 mt-1">${value}</span>
      </div>
    </div>
  );
};
