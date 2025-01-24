import React from 'react'
import Sidebar from '../modules/common/Sidebar'

const DefaultLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">

            {/* Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-700 to-teal-900 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>

            {/* Content */}
            <Sidebar />

            <div className='flex-1 overflow-auto relative z-10'>
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout