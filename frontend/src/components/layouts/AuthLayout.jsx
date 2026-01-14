import React from 'react';
import Card2 from '../../assets/images/Card2.png';
import { LuTrendingUp } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen transition-colors duration-300">
      
      {/* Left Side - Form Area */}
      <div className="flex-1 w-full md:w-[60vw] px-12 pt-8 pb-12 flex flex-col bg-white dark:bg-stormy-100 transition-colors">
        <h2 className="text-lg font-bold text-stormy-500 dark:text-alice-500 mb-6">
            Xpense Tracker
        </h2>
        <div className="flex-grow flex flex-col justify-center">
            {children}
        </div>
      </div>

      {/* Right Side - Visuals */}
      <div className="hidden md:flex relative w-[40vw] h-screen bg-alice-600 dark:bg-stormy-200 items-center justify-center overflow-hidden transition-colors">
        
        {/* Decorative Shapes (Updated Colors) */}
        {/* Top Left: Stormy Teal */}
        <div className="w-48 h-48 rounded-[40px] bg-stormy-500 absolute -top-10 -left-10 opacity-20 dark:opacity-30"></div>
        
        {/* Middle Right: Royal Indigo (Pop Color) */}
        <div className="w-52 h-60 rounded-[60px] border-[18px] border-indigo-500 absolute top-[25%] -right-12 opacity-30 dark:opacity-40"></div>
        
        {/* Bottom Right: Pearl Aqua */}
        <div className="w-48 h-48 rounded-[40px] bg-pearl-500 absolute -bottom-10 -right-10 opacity-30 dark:opacity-40"></div>

        {/* Stats Card + Image */}
        <div className="relative z-20 flex flex-col items-center gap-8">
          <StatsInfoCard
            icon={<LuTrendingUp />}
            label="Track Your Income & Expense"
            value="430,000"
            color="bg-indigo-600" // Updated to Indigo
          />

          <img
            src={Card2}
            alt="Card"
            className="w-64 lg:w-[75%] object-contain rounded-3xl shadow-2xl shadow-stormy-500/20 dark:shadow-black/30 transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

// Local Component (Updated Styles)
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="
        flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300
        bg-white border-alice-200 shadow-xl shadow-stormy-200/10
        hover:shadow-2xl hover:shadow-stormy-200/20 hover:-translate-y-1
        dark:bg-stormy-300 dark:border-stormy-400 dark:shadow-none
    ">
      {/* Icon Circle (Now Squircle) */}
      <div
        className={`flex items-center justify-center w-14 h-14 text-[28px] text-white ${color} rounded-2xl drop-shadow-md shrink-0`}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center">
        <h6 className="text-sm font-medium text-stormy-300 dark:text-pearl-600">
            {label}
        </h6>
        <span className="text-2xl font-bold text-stormy-500 dark:text-alice-500 mt-1">
            ${value}
        </span>
      </div>
    </div>
  );
};