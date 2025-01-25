import React from 'react'
import DefaultLayout from '@layouts/DefaultLayout'
import Header from '@mods/common/Header'
import DataTable from '@mods/GaussianNBPage/DataTable'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"

const GaussianNB = () => {
    return (
        <DefaultLayout>
            <ToastContainer position='top-center' theme='dark' autoClose={2000} />
            <Header title="Gaussian Naive Bayes Model" />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <DataTable />
            </main>
        </DefaultLayout>
    )
}

export default GaussianNB