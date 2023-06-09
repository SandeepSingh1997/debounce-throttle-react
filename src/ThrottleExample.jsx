import { useEffect, useRef } from "react";

const ballStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "15px",
  backgroundColor: "red",
  position: "absolute",
  //   transition: "top 0.1s, left 0.1s",
};

export default function ThrottleExample() {
  const ballRef = useRef(null);

  //USING DEBOUNCING ALGORITHM
  const updateBallPostion = debounceBall((positionX, positionY) => {
    ballRef.current.style.top = `${positionY}px`;
    ballRef.current.style.left = `${positionX}px`;
  });

  //USING THROTTLE ALGORITHM
  //   const updateBallPostion = throttleBall((positionX, positionY) => {
  //     ballRef.current.style.top = `${positionY}px`;
  //     ballRef.current.style.left = `${positionX}px`;
  //   });

  function debounceBall(callback, delay = 100) {
    let timeout;
    return (x, y) => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        callback(x, y);
      }, delay);
    };
  }

  function throttleBall(callback, delay = 100) {
    let coordinates = { x: 0, y: 0 };
    let limitExceeded = true;
    return (x, y) => {
      coordinates = { x, y };
      if (limitExceeded) {
        setTimeout(() => {
          callback(coordinates.x, coordinates.y);
          limitExceeded = true;
        }, delay);
        limitExceeded = false;
      }
    };
  }
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      updateBallPostion(e.clientX, e.clientY);
    });
  }, []);
  return (
    <div>
      <div ref={ballRef} style={ballStyle}></div>
    </div>
  );
}
