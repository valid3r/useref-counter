import React from 'react'
import { useState, useRef, useEffect } from 'react'

const Home = () => {

  const [text, setText] = useState('')
  // const [renders, setRenders] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [clicks, setClicks] = useState(0)

  // Rules:
  // - The value in the useRef persists (It stays the same between renders) 
  // - Updating the reference does not trigger a re-render

  const renders = useRef(0)
  const timer = useRef()

  const startTimer = () => {
    timer.current = setInterval(() => {
      // Increase renders 
      renders.current++
      setSeconds(prev => prev + 1)
    }, 1000);

  }

  const stopTimer = () => {
    clearInterval(timer.current)
  }

  const resetTimer  = () => {
    clearInterval(timer.current)
    timer.current = 0
    renders.current = 0
    setSeconds(0)
    setClicks(0)
    setText("")
  }

  const increase = () => {
    setClicks(clicks + 1)
    renders.current++
  }
  
  const decrease = () => {
    setClicks(clicks - 1)
    renders.current--
  }

  const handleChange = (e) => {
    // Because useState is called it will re-render 
    setText(e.target.value)

    // After the render, we increase the refs value
    renders.current = renders.current + 1
  }

  useEffect(() => {
    console.log('useEffect triggered')
  }, [])
  


  return (
    <div className='w-full  select-none'>
      <div className=' space-y-4 mx-auto w-96 p-8 text-center mt-16 h-96'>
        <input className='w-full p-2 rounded-md bg-white' onChange={handleChange} type="text" value={text} placeholder='Type and see what happens...'/>
        <div className='flex space-x-2 pt-6'>
          <div className='bg-white hover:bg-slate-300 p-4 w-full rounded-md cursor-pointer' onClick={startTimer}>Start</div>
          <div className='bg-white hover:bg-slate-300 p-4 w-full rounded-md cursor-pointer' onClick={stopTimer}>Stop</div>
          <div className='bg-white hover:bg-slate-300 p-4 w-full rounded-md cursor-pointer' onClick={resetTimer}>Reset</div>
        </div>
        <div className='flex space-x-2 pt-6'>
          <div className='bg-white hover:bg-slate-300 p-4 w-full rounded-md cursor-pointer font-bold text-3xl  ' onClick={decrease}>-</div>
          <div className='bg-white hover:bg-slate-300 p-4 w-full rounded-md cursor-pointer font-bold text-3xl  ' onClick={increase}>+</div>
        </div>

        <div className='text-white pt-6'>Seconds: <span>{seconds}</span></div>
        <div className='text-white'>Renders: <span>{renders.current}</span></div>
        <div className='text-white pt-6'> <span>{text}</span></div>
      </div>

    </div>
  )
}

export default Home