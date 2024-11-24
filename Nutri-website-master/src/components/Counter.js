import React, { useEffect, useState, useRef } from 'react';
 import { IoIosAdd } from "react-icons/io";
import Container from './Container';

const Counter = () => {
    const countersRef = useRef(null);
    const [activated, setActivated] = useState(false);
    const duration = 3000; // Desired duration in milliseconds (e.g., 3 seconds)

    useEffect(() => {
        const handleScroll = () => {
            if (!countersRef.current) return;

            const container = countersRef.current;
            const containerTop = container.offsetTop;
            const containerHeight = container.offsetHeight;
            const scrollTop = window.pageYOffset;

            if (scrollTop > containerTop - containerHeight - 200 && !activated) {
                setActivated(true);
            } else if ((scrollTop < containerTop - containerHeight - 500 || scrollTop === 0) && activated) {
                setActivated(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [activated]);

    useEffect(() => {
        if (activated && countersRef.current) {
          const counters = countersRef.current.querySelectorAll(".counter span[data-count]");
      
          counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 3000; // Total duration for the count-up animation
            const stepTime = 20; // Time interval between updates
            const steps = duration / stepTime;
            const increment = target / steps;
      
            let count = 0;
            counter.innerText = 0;
      
            const counterInterval = setInterval(() => {
              count += increment;
              if (count < target) {
                counter.innerText = Math.ceil(count);
              } else {
                counter.innerText = target; // Ensure it ends exactly at the target
                clearInterval(counterInterval);
              }
            }, stepTime);
          });
        }
      }, [activated]);
      

    return (
        <div className="container-wrapper">
     <div ref={countersRef} className="counter-container">
          <div className="counter-box">
            <div className="counter">
              <h1>
                <span data-count="487" data-type="default">0</span>
                <IoIosAdd className='add-icon'/>
              </h1>
              <h3>Daily Space</h3>
            </div>
            <div className="counter">
              <h1>
                <span data-count="54" data-type="default">0</span>
                <IoIosAdd className='add-icon'/>
              </h1>
              <h3>City Branch</h3>
            </div>
            <div className="counter">
              <h1>
                <span data-count="25" data-type="default">0</span>
                <IoIosAdd className='add-icon'/>
              </h1>
              <h3>Our Programs</h3>
            </div>
            <div className="counter">
              <h1>
                <span data-count="1340" data-type="clients">0</span>
                <IoIosAdd className='add-icon'/>
              </h1>
              <h3>Client Totals</h3>
            </div>
          </div>
        </div>
        </div>
   
      );
      
};

export default Counter;
