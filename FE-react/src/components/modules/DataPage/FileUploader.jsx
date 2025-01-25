import React, { useState } from 'react'
import axios from 'axios';

import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const FileUploader = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                toast(response.data.message)
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            }
        } catch (error) {
            toast(error.message)
        }
    };

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg overflow-hidden border border-gray-700 rounded-xl p-6 mb-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <h2 className='text-md font-medium mb-4 text-gray-100'>Upload CSV File</h2>
            <form
                className='flex'
                onSubmit={handleSubmit}
            >
                <input
                    type="file"
                    className="file-input file-input-bordered w-1/3 mr-3"
                    accept=".csv"
                    onChange={handleFileChange}
                />
                <button className="btn btn-outline btn-info w-30">Upload</button>
            </form>
            {/* {message && <p>{message}</p>} */}
        </motion.div>
    )
}

export default FileUploader