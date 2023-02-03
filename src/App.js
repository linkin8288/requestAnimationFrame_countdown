import React, { useState, useEffect, useRef } from 'react';

// requestAnimationFrame()
// useEffect function is to call the requestAnimationFrame() method 
// while the browser renders only once in the beginning.
// Then requestAnimationFrame() repair around 60 times every seconds,
// In the startAnimation function, we first set the timeDiff, 
// then use setTimeRemaining to check the new time in every seconds using getSeconds() method
// and check if the oldTime is equal to timeDiff, if not update,
// call the requestId = requestAnimationFrame(animate) and return it
// In the end of useEffect, return the cancelAnimationFrame(requestId)

function App() {

  const [timeRemaining, setTimeRemaining] = useState(0);

  const endDate = new Date("2030-02-15T09:00:00");
  let requestId;
  
  function startAnimation(){
    function animate(){
      const startDate = new Date();
      const timeDiff = endDate.getTime() - startDate.getTime();
      setTimeRemaining(oldTime => new Date(timeDiff).getSeconds() == new Date(oldTime).getSeconds() ? oldTime : timeDiff)
      requestId = requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }
  
  useEffect(() => {
    /** 
    const intervalId = setInterval(() => {
      const timeDiff = endDate.getTime() - startDate.getTime();
      setTimeRemaining(timeDiff);
    }, 100);*/

    startAnimation()
    
    return () => cancelAnimationFrame(requestId)
  }, []);
  
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  return (
    <div className="w-full mx-auto flex flex-col items-center my-auto 
      justify-center py-12 bg-blue-700 text-white h-screen">
      <div className='backdrop-blur-md bg-white/30 py-6 px-4 rounded-md'>
        <div className='grid grid-cols-4 gap-8 '>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-8xl'>{days}</p>
            <p className='text-xl'>Days</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-8xl'>{hours}</p>
            <p className='text-xl'>Hours</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-8xl'>{minutes}</p>
            <p className='text-xl'>Minutes</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-8xl'>{seconds}</p>
            <p className='text-xl'>Seconds</p>
          </div>        
        </div>
      </div>
    </div>
  )
}

export default App