import React, { useEffect, useState } from "react"
import axios from "axios"

import { motion } from "framer-motion"

const ConfusionMatrix = () => {
    const [confusionMatrix, setConfusionMatrix] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch confusion matrix
        axios.get("http://127.0.0.1:5000/confusion-matrix")
            .then((response) => {
                setConfusionMatrix(response.data);
            })
            .catch((error) => {
                setError("Gagal mengambil confusion matrix: " + error.message);
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg overflow-hidden border border-gray-700 rounded-xl p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'>Confusion Matrix Gaussian NB</h2>
            <table border="1" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th></th>
                        {Object.keys(confusionMatrix.gnb || {}).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(confusionMatrix.gnb || {}).map((rowKey) => (
                        <tr key={rowKey}>
                            <th>{rowKey}</th>
                            {Object.keys(confusionMatrix.gnb[rowKey] || {}).map((colKey) => (
                                <td key={colKey}>{confusionMatrix.gnb[rowKey][colKey]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    )
}

export default ConfusionMatrix