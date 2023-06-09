import { useRef, useState } from "react";
import "./App.css";

function App() {
  const defaultTextRef = useRef(null);
  const debounceTextRef = useRef(null);
  const throttleTextRef = useRef(null);

  //DEBOUNCE CODE BELOW

  const updateDebounceText = debounce((text) => {
    debounceTextRef.current.textContent = text;
  });

  function debounce(callback, delay = 1000) {
    //we declare this timeout variable to be able to hold the
    //reference to the pervious timeout object so as to be able to clear it.
    let timeout;
    return (text) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(text);
      }, delay);
    };
  }

  /******ANOTHER WAY TO DO DEBOUNCE IF WE DON'T WANT TO USE CALLBACK
   let timeout;
   
   function updateDebounceText(text, delay = 1000) {
     clearTimeout(timeout);
     timeout = setTimeout(() => {
       debounceTextRef.current.textContent = text;
      }, delay);
    }*/

  function handleInputChange(e) {
    const currValue = e.target.value;
    updateDefaultText(currValue);
    updateDebounceText(currValue);
  }

  function updateDefaultText(text) {
    defaultTextRef.current.textContent = text;
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

export default App;
