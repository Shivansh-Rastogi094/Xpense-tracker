import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu, isMobile = false }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <aside
      className={`
        flex flex-col bg-surface/50 backdrop-blur-[32px] border-r border-white/10 shadow-2xl shadow-primary/5
        ${isMobile ? 'h-full w-full' : 'h-screen w-64 fixed left-0 top-0 py-base z-50'}
      `}
    >
      {!isMobile && (
        <div className="px-6 py-8">
          <h1 className="font-display-lg text-[28px] font-bold text-primary leading-tight">xpense-tracker</h1>
          <p className="text-on-surface-variant font-label-sm tracking-wider uppercase mt-1">Premium Plan</p>
        </div>
      )}

      {/* ===== Menu Items ===== */}
      <nav className="flex-1 px-2 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.label || location.pathname === item.path;

          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95
                ${isActive 
                  ? "bg-primary-container/20 text-primary border-r-2 border-secondary" 
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/50"
                }
              `}
            >
              <item.icon
                className={`text-xl shrink-0 ${isActive ? "text-primary" : ""}`}
              />
              <span className="font-body-md truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ===== Footer Actions ===== */}
      <div className="mt-auto px-6 py-6 border-t border-white/5">
        <button 
          onClick={() => navigate('/expense')}
          className="w-full py-4 px-4 bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 mb-6 hover:scale-[1.02] active:scale-95 transition-all neon-glow-primary"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Add Expense
        </button>

        <div className="space-y-4">
          <button className="w-full flex items-center gap-3 text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-xl">help</span>
            <span className="font-body-md">Help Center</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-error hover:text-tertiary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="font-body-md">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;