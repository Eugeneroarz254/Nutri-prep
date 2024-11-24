import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Clock = () => {

const [days, setDays] = useState()
const [hours, setHours] = useState()
const [minutes, setMinutes] = useState()
const [seconds, setSeconds] = useState()

let interval;

const countDown = () =>{
    const destination = new Date('Feburuary 10, 2025').getTime()

    interval = setInterval(() =>{
        const now = new Date().getTime()
        const different = destination - now
        const days = Math.floor(different/ (1000 * 60 * 60 * 24))

        const hours = Math.floor(different % (1000 * 60 * 60 * 24) /
        (1000*60*60))

        const minutes = Math.floor(different % (1000 * 60 * 60) /
        (1000*60))

        const seconds = Math.floor(different % (1000 * 60) / 1000)

    if(destination < 0) clearInterval(interval.current)
    else{
        setDays(days)
        setHours(hours)
        setMinutes(minutes)
        setSeconds(seconds)
    }
    })
}

useEffect(()=>{
    countDown()
})

  return (
    <div className='clock-main-wrapper'>
      <span>Time Left :</span>  
    <div className="clock-wrapper d-flex align-items-center justify-content-center">
    <div className="clock-data">
      <div className="clock-circle">
        <div className="time-content">
          <h2>{hours}</h2>
          <p>HOURS</p>
        </div>
      </div>
    </div>

    <div className="clock-data">
      <div className="clock-circle">
        <div className="time-content">
          <h2>{minutes}</h2>
          <p>MINS</p>
        </div>
      </div>
    </div>

    <div className="clock-data">
      <div className="clock-circle">
        <div className="time-content">
          <h2>{seconds}</h2>
          <p>SECS</p>
        </div>
      </div>
    </div>
  </div>
    </div>

  )
}

export default Clock