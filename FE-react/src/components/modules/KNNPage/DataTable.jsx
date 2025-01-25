import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const DataTable = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // Getting data from Flask backend
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/knn')
                setData(response.data) // Save data to state
            } catch (err) {
                setError('Failed to fetch data from the server')
            }
        };

        fetchData();
    }, []);

    const handleTruncate = async () => {
        try {
            await axios.delete('http://127.0.0.1:5000/knn')
            setData([])
            toast('Data truncated successfully')
        } catch (err) {
            toast(err.message)
        }
    }

    const handleKNN = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await axios.get('http://127.0.0.1:5000/knn/run')
            setData([])
            toast('Model executed successfully')
            setTimeout(() => {
                setIsLoading(false)
                window.location.reload();
            }, 2000)
        } catch (err) {
            setIsLoading(false)
            toast(err.message)
        }
    }

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg overflow-hidden border border-gray-700 rounded-xl p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='overflow-x-auto overflow-y-auto max-h-96'>
                <table className='table w-full'>
                    <thead className='table-header-group'>
                        <tr className='table-row'>
                            <th className='table-cell'>id</th>
                            <th className='table-cell'>radius_mean</th>
                            <th className='table-cell'>texture_mean</th>
                            <th className='table-cell'>perimeter_mean</th>
                            <th className='table-cell'>area_mean</th>
                            <th className='table-cell'>smoothness_mean</th>
                            <th className='table-cell'>compactness_mean</th>
                            <th className='table-cell'>concavity_mean</th>
                            <th className='table-cell'>concave_points_mean</th>
                            <th className='table-cell'>symmetry_mean</th>
                            <th className='table-cell'>fractal_dimension_mean</th>
                            <th className='table-cell'>radius_se</th>
                            <th className='table-cell'>texture_se</th>
                            <th className='table-cell'>perimeter_se</th>
                            <th className='table-cell'>area_se</th>
                            <th className='table-cell'>smoothness_se</th>
                            <th className='table-cell'>compactness_se</th>
                            <th className='table-cell'>concavity_se</th>
                            <th className='table-cell'>concave_points_se</th>
                            <th className='table-cell'>symmetry_se</th>
                            <th className='table-cell'>fractal_dimension_se</th>
                            <th className='table-cell'>radius_worst</th>
                            <th className='table-cell'>texture_worst</th>
                            <th className='table-cell'>perimeter_worst</th>
                            <th className='table-cell'>area_worst</th>
                            <th className='table-cell'>smoothness_worst</th>
                            <th className='table-cell'>compactness_worst</th>
                            <th className='table-cell'>concave_points_worst</th>
                            <th className='table-cell'>symmetry_worst</th>
                            <th className='table-cell'>fractal_dimension_worst</th>
                            <th className='table-cell'>actual_label</th>
                            <th className='table-cell'>predicted_label</th>
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
                                <td>{row.actual_label}</td>
                                <td>{row.predicted_label}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {data.length > 0 && (
                <button
                    onClick={handleTruncate}
                    className='w-full mt-4 text-white p-2 rounded btn btn-outline btn-error'
                    disabled={isLoading}
                >
                    {isLoading ? "Mohon tunggu..." : "Truncate Data"}
                </button>
            )}
            {data.length === 0 && (
                <button
                    onClick={handleKNN}
                    disabled={isLoading}
                    className='w-full mt-4 text-white p-2 rounded btn btn-outline btn-primary'
                >
                    {isLoading ? "Mohon tunggu..." : "Execute K-Nearest Neighbors"}
                </button>
            )}
        </motion.div>
    );
};

export default DataTable;