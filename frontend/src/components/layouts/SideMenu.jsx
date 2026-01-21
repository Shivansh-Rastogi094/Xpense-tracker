import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
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
      className="
        flex flex-col w-full h-[calc(100vh-120px)]
        rounded-2xl border shadow-sm overflow-hidden
        transition-colors duration-300
        bg-white border-alice-200
        dark:bg-stormy-200 dark:border-stormy-300
      "
    >
      {/* ===== User Profile Section ===== */}
      <div className="flex flex-col items-center justify-center py-8 px-4 border-b border-alice-200 dark:border-stormy-300">
        <div className="relative">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl || ""}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-alice-500 dark:border-stormy-300 shadow-md"
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-2xl"
            />
          )}
        </div>

        <h5 className="mt-4 text-lg font-bold text-stormy-500 dark:text-alice-500">
          {user?.fullName || "User"}
        </h5>
        <p className="text-xs font-medium text-stormy-300 dark:text-pearl-600 uppercase tracking-wider">
          Pro Member
        </p>
      </div>

      {/* ===== Menu Items ===== */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.label || location.pathname === item.path;

          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-xl 
                text-[15px] font-medium transition-all duration-300
                ${isActive 
                  ? "bg-stormy-500 text-white shadow-lg shadow-stormy-500/30 dark:bg-pearl-500 dark:text-stormy-200" 
                  : "text-stormy-400 hover:bg-alice-600 hover:text-stormy-600 dark:text-pearl-600 dark:hover:bg-stormy-300 dark:hover:text-pearl-400"
                }
              `}
            >
              <item.icon
                className={`text-xl shrink-0 transition-colors ${
                  isActive ? "text-white dark:text-stormy-200" : ""
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===== Footer ===== */}
      <div className="px-6 py-4 border-t border-alice-200 dark:border-stormy-300">
        <p className="text-xs text-center text-stormy-300 dark:text-pearl-800">
          © {new Date().getFullYear()} Xpense Tracker
        </p>
      </div>
    </aside>
  );
};

export default SideMenu;