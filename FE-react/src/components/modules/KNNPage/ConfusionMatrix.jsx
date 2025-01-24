import React, { useEffect, useState } from "react"
import axios from "axios"

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"
import { motion } from "framer-motion"

const ConfusionMatrix = () => {
    const [confusionMatrix, setConfusionMatrix] = useState({});
    const [classificationReport, setClassificationReport] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch confusion matrix
        axios.get("http://127.0.0.1:5000/confusion-matrix")
            .then((response) => {
                setConfusionMatrix(response.data);
            })
            .catch((error) => {
                setError("Failed to fetch confusion matrix");
            });

        // Fetch classification report
        axios.get("http://127.0.0.1:5000/classification-report")
            .then((response) => {
                const report = Object.keys(response.data)
                    .filter(key => key !== "accuracy")
                    .map((key) => ({
                        class: key,
                        precision: response.data[key].precision,
                        recall: response.data[key].recall,
                        f1_score: response.data[key]["f1-score"]
                    }));
                setClassificationReport(report);
            })
            .catch((error) => {
                setError("Failed to fetch classification report");
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
            <h1>KNN Classification Results</h1>

            <h2>Classification Report</h2>
            <BarChart
                width={800}
                height={400}
                data={classificationReport}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="precision" fill="#8884d8" />
                <Bar dataKey="recall" fill="#82ca9d" />
                <Bar dataKey="f1_score" fill="#ffc658" />
            </BarChart>

            <h2>Confusion Matrix</h2>
            <table border="1" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th></th>
                        {Object.keys(confusionMatrix).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(confusionMatrix).map((rowKey) => (
                        <tr key={rowKey}>
                            <th>{rowKey}</th>
                            {Object.keys(confusionMatrix[rowKey]).map((colKey) => (
                                <td key={colKey}>{confusionMatrix[rowKey][colKey]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    )
}

export default ConfusionMatrix