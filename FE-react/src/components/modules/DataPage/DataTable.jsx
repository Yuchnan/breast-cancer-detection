import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const DataTable = () => {
    const [isShow, setIsShow] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [error, setError] = useState('');
    const [sortOrder, setSortOrder] = useState({ column: '', order: 'asc' });

    useEffect(() => {
        // Mengambil data dari backend Flask
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/data'); // URL Flask
                setData(response.data); // Menyimpan data ke state
                setOriginalData(response.data); // Simpan data asli
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const handleTruncate = async () => {
        try {
            await axios.delete('http://127.0.0.1:5000/data'); // URL untuk men-truncate data
            setData([]); // Mengosongkan data setelah truncate
            toast('Data truncated successfully')
        } catch (err) {
            toast(err.message)
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === "") {
            setData(originalData); // Kembalikan data ke keadaan semula jika query kosong
        } else {
            const filteredData = originalData.filter(row =>
                row.id.toString().includes(query) ||
                row.diagnosis.toLowerCase().includes(query)
            );
            setData(filteredData);
        }
    }

    const handleSort = (column) => {
        const order = sortOrder.column === column && sortOrder.order === 'asc' ? 'desc' : 'asc';
        const sortedData = [...data].sort((a, b) => {
            if (order === 'asc') {
                return a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
            } else {
                return a[column] > b[column] ? -1 : a[column] < b[column] ? 1 : 0;
            }
        });
        setData(sortedData);
        setSortOrder({ column, order });
    };

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg overflow-hidden border border-gray-700 rounded-xl p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-lg font-medium text-gray-100'>Parameters</h2>
                <div className='relative'>
                    <motion.input
                        initial={{ translateX: -20 }}
                        animate={{ translateX: isShow ? 0 : -20 }}
                        style={{ display: isShow ? "block" : "none" }}
                        placeholder='Cari produk...'
                        className='bg-gray-900/50 text-white pl-10 pr-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onChange={handleSearch}
                        value={searchQuery}
                    />
                    <Search
                        onClick={() => setIsShow(!isShow)}
                        className={isShow
                            ? "absolute top-1/2 -translate-y-1/2 left-3 z-10" : null}
                        size={18}
                    />
                </div>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='overflow-x-auto overflow-y-auto max-h-96'>
                <table className='table w-full'>
                    <thead className='table-header-group font-bold text-white bg-gray-700'>
                        <tr className='table-row'>
                            {/* Ganti kolom sesuai tabel MySQL Anda */}
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('id')}>id</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('diagnosis')}>diagnosis</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('radius_mean')}>radius_mean</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('texture_mean')}>texture_mean</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('perimeter_mean')}>perimeter_mean</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('area_mean')}>area_mean</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('smoothness_mean')}>smoothness_mean</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('compactness_mean')}>compactness_mean</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('concavity_mean')}>concavity_mean</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('concave_points_mean')}>concave_points_mean</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('symmetry_mean')}>symmetry_mean</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('fractal_dimension_mean')}>fractal_dimension_mean</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('radius_se')}>radius_se</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('texture_se')}>texture_se</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('perimeter_se')}>perimeter_se</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('area_se')}>area_se</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('smoothness_se')}>smoothness_se</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('compactness_se')}>compactness_se</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('concavity_se')}>concavity_se</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('concave_points_se')}>concave_points_se</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('symmetry_se')}>symmetry_se</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('fractal_dimension_se')}>fractal_dimension_se</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('radius_worst')}>radius_worst</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('texture_worst')}>texture_worst</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('perimeter_worst')}>perimeter_worst</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('area_worst')}>area_worst</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('smoothness_worst')}>smoothness_worst</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('compactness_worst')}>compactness_worst</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('concave_points_worst')}>concave_points_worst</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('symmetry_worst')}>symmetry_worst</th>
                            <th className='table-cell cursor-pointer' onClick={() => handleSort('fractal_dimension_worst')}>fractal_dimension_worst</th>
                        </tr>
                    </thead>
                    <tbody className='table-row-group'>
                        {data.map(row => (
                            <motion.tr key={row.id}
                                className='table-row'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <td>{row.id}</td>
                                <td>{row.diagnosis}</td>
                                <td>{row.radius_mean}</td>
                                <td>{row.texture_mean}</td>
                                <td>{row.perimeter_mean}</td>
                                <td>{row.area_mean}</td>
                                <td>{row.smoothness_mean}</td>
                                <td>{row.compactness_mean}</td>
                                <td>{row.concavity_mean}</td>
                                <td>{row.concave_points_mean}</td>
                                <td>{row.symmetry_mean}</td>
                                <td>{row.fractal_dimension_mean}</td>
                                <td>{row.radius_se}</td>
                                <td>{row.texture_se}</td>
                                <td>{row.perimeter_se}</td>
                                <td>{row.area_se}</td>
                                <td>{row.smoothness_se}</td>
                                <td>{row.compactness_se}</td>
                                <td>{row.concavity_se}</td>
                                <td>{row.concave_points_se}</td>
                                <td>{row.symmetry_se}</td>
                                <td>{row.fractal_dimension_se}</td>
                                <td>{row.radius_worst}</td>
                                <td>{row.texture_worst}</td>
                                <td>{row.perimeter_worst}</td>
                                <td>{row.area_worst}</td>
                                <td>{row.smoothness_worst}</td>
                                <td>{row.compactness_worst}</td>
                                <td>{row.concave_points_worst}</td>
                                <td>{row.symmetry_worst}</td>
                                <td>{row.fractal_dimension_worst}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {data.length > 0 && (
                <button onClick={handleTruncate} className='w-full mt-4 text-white p-2 rounded btn btn-outline btn-error'>
                    Truncate Data
                </button>
            )}
        </motion.div>
    );
};

export default DataTable;