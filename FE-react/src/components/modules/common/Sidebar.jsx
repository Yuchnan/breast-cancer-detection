import React, { useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import { BarChart2, FileCode2, Database, ChartArea, Trash2, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SIDEBAR_ITEMS = [
    { name: 'Overview', icon: BarChart2, color: "#6366f1", path: "/" },
    { name: 'Data', icon: FileCode2, color: "#885CF6", path: "/data" },
    { name: 'KNN Model', icon: Database, color: "#F59E08", path: "/knn" },
    { name: 'GaussianNB Model', icon: Database, color: "#F59E08", path: "/gaussian_nb" },
    { name: 'Visualization', icon: ChartArea, color: "#108981", path: "/visualize" },
]

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [, setData] = useState([])

    const handleTruncate = async (event) => {
        event.preventDefault(); // Mencegah navigasi ke halaman lain
        const confirmDelete = window.confirm("Want to delete all datas?"); // Konfirmasi penghapusan
        if (!confirmDelete) return; // Jika tidak dikonfirmasi, keluar dari fungsi

        try {
            const response = await axios.delete('http://127.0.0.1:5000/truncate_all');
            console.log(response.data); // Menambahkan logging untuk respons
            setData([]);
            toast("All data has been truncated successfully!");
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        } catch (err) {
            console.log(err); // Menambahkan logging untuk kesalahan
            toast(err.message);
        }
    };
    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div className='h-full bg-gray-800/50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
                >
                    <Menu size={24} />
                </motion.button>
                <nav className='mt-8 flex-grow'>
                    {SIDEBAR_ITEMS.map((item, index) => (
                        <Link key={index} to={item.path}>
                            <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
                                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            className='ml-4 whitespace-nowrap'
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    ))}
                    <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer' onClick={handleTruncate}>
                        <Trash2 size={20} style={{ color: "#EC4899", minWidth: "20px" }} />
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    className='ml-4 whitespace-nowrap'
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Delete All Data
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </nav>
            </div>
        </motion.div>
    )
}

export default Sidebar