import React from 'react'
import RejectButton from '../Button/RejectButton'
import AcceptButton from '../Button/AcceptButton'

const LogoutDialog = ({isLogoutDialogOpen, setIsLogoutDialogOpen, logout}) => {
    if (!isLogoutDialogOpen) return null
  return (
    
        <div className="absolute top-12 right-6  bg-opacity-50 flex items-center rounded-lg justify-center z-10 w-96">
          <div className={`p-6 rounded-lg shadow-sm shadow-slate-300 dark:shadow-slate-600 dark:bg-gray-800 dark:text-white bg-slate-50 text-black`}>
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out? </h2>

            <div className="flex justify-end space-x-2">
              
              <RejectButton
                text="No"
                onClick={() => setIsLogoutDialogOpen(false)}/>
             <AcceptButton onClick={logout} text="Yes"/>
            </div>
          </div>
        </div>
      )}
  

export default LogoutDialog