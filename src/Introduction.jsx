import { useRef, useState } from "react";

export default function Introduction() {
  const [defaultCount, setDefaultCount] = useState(0);
  const [debounceCount, setDebounceCount] = useState(0);
  const [throttleCount, setThrottleCount] = useState(0);

  const defaultTextRef = useRef(null);
  const debounceTextRef = useRef(null);
  const throttleTextRef = useRef(null);

  // 1) DEBOUNCE CODE BELOW
  /******************** 
     Debounce: A technique to delay call to a callback for a certain
     period of time AFTER THE INACTIVITY, so that after the delay the callback is executed 
     with the latest state/change.
     *********************/

  const updateDebounceText = debounce((text) => {
    setDebounceCount(debounceCount + 1);
    debounceTextRef.current.textContent = ` (${debounceCount + 1}) : ` + text;
  });

  function debounce(callback, delay = 1000) {
    let timeout;
    return (text) => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        callback(text);
      }, delay);
    };
  }

  /******
   2) DEBOUNCE IF WE DON'T WANT TO USE CALLBACK
   let timeout;
   
   function updateDebounceText(text, delay = 1000) {
     clearTimeout(timeout);
     timeout = setTimeout(() => {
       debounceTextRef.current.textContent = text;
      }, delay);
    }*/

  //THROTTLE CODE BELOW
  /******************** 
     Throttle: A technique similar to debounce but instead of executing the
      callback after delay, starting from the time of inactivity, the callback
      is executed in a specific interval, calling with the latest state/change.
      *********************/

  const updateThrottleText = throttle((text) => {
    console.log("hello");
    throttleTextRef.current.textContent = ` (${throttleCount + 1}) : ` + text;
  });

  function throttle(callback, delay = 1000) {
    let currText = "";
    let timeComplete = true;
    return (text) => {
      currText = text;
      if (timeComplete) {
        setTimeout(() => {
          setThrottleCount(throttleCount + 1);
          callback(currText);
          timeComplete = true;
        }, delay);
        timeComplete = false;
      }
    };
  }

  //DEFAULT
  function updateDefaultText(text) {
    setDefaultCount(defaultCount + 1);
    defaultTextRef.current.textContent = ` (${defaultCount + 1}) : ` + text;
  }

  function handleInputChange(e) {
    const currValue = e.target.value;
    // updateDefaultText(currValue);
    // updateDebounceText(currValue);
    updateThrottleText(currValue);
  }

  return (
    <>
      <input
        type="text"
        style={{ height: "30px", width: "200px" }}
        placeholder="type..."
        onChange={handleInputChange}
      />
      <h2>
        Default: <span ref={defaultTextRef}></span>
      </h2>

      <h2>
        Debounce:
        <span ref={debounceTextRef}></span>
      </h2>
      <h2>
        Throttle:
        <span ref={throttleTextRef}></span>
      </h2>
    </>
  );
}
