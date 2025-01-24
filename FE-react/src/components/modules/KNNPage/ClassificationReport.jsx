import React from 'react'

import { motion } from 'framer-motion'

const ClassificationReport = () => {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg overflow-hidden border border-gray-700 rounded-xl p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >

        </motion.div>
    )
}

export default ClassificationReport