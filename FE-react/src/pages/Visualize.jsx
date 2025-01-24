import React from 'react'
import DefaultLayout from '@layouts/DefaultLayout'
import Header from '@mods/common/Header'
import ConfusionMatrix from '@mods/KNNPage/ConfusionMatrix'

const Visualize = () => {
    return (
        <DefaultLayout>
            <Header title="K-Nearest Neighbor Model" />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                    <ConfusionMatrix />
                </main>
            </main>
        </DefaultLayout>
    )
}

export default Visualize