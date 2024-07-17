import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation';
import { TypewriterEffectSmooth } from './components/ui/typewriter';
import { words } from './utils/utils';

const Home = () => {
  const navigate = useNavigate();

  return (
    <BackgroundGradientAnimation>
      <div className='flex flex-col absolute z-10 h-screen w-screen justify-center items-center text-white text-center bg-black bg-opacity-40'>
        <img src='https://diamanteblockchain.com/wp-content/uploads/2021/01/diam-icon-new.png' alt='Diamante' className='w-52' />
        <TypewriterEffectSmooth words={words} />
        <p className="mt-4 text-2xl font-semibold">We have created a bridge for USDC from CodeDao Testnet to Diamante Testnet</p>
        <button className="px-4 py-2 my-10 mt-10 w-40 h-14 backdrop-blur-sm border bg-blue-600/25 z-10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative" onClick={() => {
          navigate("/login")
        }}>
          <span>Get Started →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>

      </div>
    </BackgroundGradientAnimation>
  )
}

export default Home
