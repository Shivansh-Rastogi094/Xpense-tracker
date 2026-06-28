import React, { useContext } from 'react'
import Navbar from './Navbar'
import SideMenu from './SideMenu'
import { UserContext } from '../../context/UserContext'

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext)

  return (
    <div className="flex min-h-screen relative z-10">
      {user && (
        <>
          {/* Desktop Sidebar - fixed left */}
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <main className="flex-1 lg:ml-64 min-h-screen relative w-full">
            <Navbar activeMenu={activeMenu} />
            
            <div className="pt-24 pb-12 px-container-padding max-w-[1280px] mx-auto space-y-section-margin">
              {children}
            </div>
          </main>
        </>
      )}
    </div>
  )
}

export default DashboardLayout