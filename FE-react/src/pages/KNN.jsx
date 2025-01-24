import React from 'react'
import DefaultLayout from '@layouts/DefaultLayout'
import Header from '@mods/common/Header'
import DataTable from '@mods/GaussianNBPage/DataTable'

const GaussianNB = () => {
    return (
        <DefaultLayout>
            <Header title="K-Nearest Neighbor Model" />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <DataTable />
            </main>
        </DefaultLayout>
    )
}

export default GaussianNB