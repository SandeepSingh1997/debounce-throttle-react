import { useRef, useState } from "react";
import "./App.css";

function App() {
  const defaultTextRef = useRef(null);
  const debounceTextRef = useRef(null);
  const throttleTextRef = useRef(null);

  function handleInputChange(e) {
    const currValue = e.target.value;
    updateDefaultText(currValue);
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
