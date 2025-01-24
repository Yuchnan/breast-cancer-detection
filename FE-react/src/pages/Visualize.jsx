import React from 'react'
import DefaultLayout from '@layouts/DefaultLayout'
import Header from '@mods/common/Header'
import ClassificationReport from '@mods/VisualizePage/ClassificationReport'
import ConfusionMatrix from '@mods/VisualizePage/ConfusionMatrix'

const Visualize = () => {
    return (
        <DefaultLayout>
            <Header title="Visualize Page" />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                    <ClassificationReport />
                    <ConfusionMatrix />
                </main>
            </main>
        </DefaultLayout>
    )
}

export default Visualize