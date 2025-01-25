import React from 'react'
import DefaultLayout from '@layouts/DefaultLayout'
import Header from '@mods/common/Header'

import { motion } from 'framer-motion'

const Overview = () => {
    return (
        <DefaultLayout>
            <Header title="Overview" />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    Overview is not available yet.
                </motion.div>
            </main>
        </DefaultLayout>
    )
}

export default Overview