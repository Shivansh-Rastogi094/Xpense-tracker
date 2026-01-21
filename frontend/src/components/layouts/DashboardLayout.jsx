import React, { useContext } from 'react'
import Navbar from './Navbar'
import SideMenu from './SideMenu'
import { UserContext } from '../../context/UserContext'

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext)

  return (
    // Main Canvas: Applies the Global Background Color (Light vs Dark)
    <div className="min-h-screen transition-colors duration-300 bg-alice-500 dark:bg-stormy-100">
      
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex pt-4 md:pt-6 max-w-[1600px] mx-auto">
          {/* Sidebar: Hidden on Mobile, Fixed on Desktop */}
          <div className="hidden lg:block w-64 shrink-0 px-4">
             {/* Sticky container for Sidebar so it doesn't scroll away */}
            <div className="sticky top-28">
               <SideMenu activeMenu={activeMenu} />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grow px-4 md:px-6 pb-10 overflow-x-hidden">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout