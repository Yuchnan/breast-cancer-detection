import React from 'react'
import DefaultLayout from '@layouts/DefaultLayout'
import Header from '@mods/common/Header'
import FileUploader from '@mods/DataPage/FileUploader'
import DataTable from '@mods/DataPage/DataTable'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"

const Data = () => {
    return (
        <DefaultLayout>
            <ToastContainer position='top-center' theme='dark' autoClose={2000} />
            <Header title="Datasets" />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <FileUploader />
                <DataTable />
            </main>
        </DefaultLayout>
    )
}

export default Data