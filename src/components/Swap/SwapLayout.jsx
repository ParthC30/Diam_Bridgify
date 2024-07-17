import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WidgetDiamtoBsc from './WidgetDiamtoBsc'
import WidgetBsctoDiam from './WidgetBsctoDiam'
import { BackgroundGradientAnimation } from '../ui/background-gradient-animation'

const SwapLayout = () => {
    return (
        <BackgroundGradientAnimation>
            <div className='h-screen w-screen absolute z-10 bg-black bg-opacity-50'>
            <Routes>
                <Route path='/diam_BSC' element={<WidgetDiamtoBsc />} />
                <Route path='/BSC_diam' element={<WidgetBsctoDiam />} />
            </Routes>
        </div>
        </BackgroundGradientAnimation>
    )
}

export default SwapLayout