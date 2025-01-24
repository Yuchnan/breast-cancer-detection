import React from 'react'
import DefaultLayout from '@layouts/DefaultLayout'
import Header from '@mods/common/Header'
import ClassificationReport from '@mods/VisualizePage/ClassificationReport'
import ClassificationReport2 from '@mods/VisualizePage/ClassificationReport2'
import ConfusionMatrix from '@mods/VisualizePage/ConfusionMatrix'
import ConfusionMatrix2 from '@mods/VisualizePage/ConfusionMatrix2'

const Visualize = () => {
    return (
        <DefaultLayout>
            <Header title="Visualization" />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <div className='grid grid-col-1 gap-8 lg:grid-cols-2'>
                    <ClassificationReport />
                    <ClassificationReport2 />
                </div>

                <div className='grid grid-col-1 gap-8 lg:grid-cols-2'>
                    <ConfusionMatrix />
                    <ConfusionMatrix2 />
                </div>
            </main>
        </DefaultLayout>
    )
}

export default Visualize