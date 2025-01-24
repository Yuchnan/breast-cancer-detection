import React, { useEffect, useState } from "react"
import axios from "axios"

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const ClassificationReport = () => {
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
                setError("Gagal mengambil confusion matrix: " + error.message);
            });

        // Fetch classification report
        axios.get("http://127.0.0.1:5000/classification-report")
            .then((response) => {
                const knnReport = Object.keys(response.data.knn)
                    .filter(key => key !== "accuracy")
                    .map((key) => ({
                        model: "KNN",
                        class: key,
                        precision: response.data.knn[key].precision,
                        recall: response.data.knn[key].recall,
                        f1_score: response.data.knn[key]["f1-score"]
                    }));

                const gnbReport = Object.keys(response.data.gnb)
                    .filter(key => key !== "accuracy")
                    .map((key) => ({
                        model: "GNB",
                        class: key,
                        precision: response.data.gnb[key].precision,
                        recall: response.data.gnb[key].recall,
                        f1_score: response.data.gnb[key]["f1-score"]
                    }));

                setClassificationReport([...knnReport, ...gnbReport]);
            })
            .catch((error) => {
                setError("Gagal mengambil classification report: " + error.message);
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg overflow-hidden border border-gray-700 rounded-xl p-6 mb-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'>Classification Report</h2>
            <div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={classificationReport}>
                        <CartesianGrid strokeDasharray="3 3" stroke='#374151' />
                        <XAxis dataKey="class" stroke='#9CA3AF' />
                        <YAxis stroke='#9CA3AF' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31,41,55,0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                        <Bar dataKey="precision" stackId='a' fill='#6366F1' />
                        <Bar dataKey="recall" stackId='b' fill='#EC4899' />
                        <Bar dataKey="f1_score" stackId='c' fill='#F59E0B' />
                    </BarChart>

                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}

export default ClassificationReport