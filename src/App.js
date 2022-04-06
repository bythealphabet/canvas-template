import React, { useRef, useEffect, useState } from "react";
import { init, draw, startdragging, dropit } from "./canvas/canvas";

function App(props) {

  const canvasRef = useRef(null);
  useEffect(() => {
    const ctx = canvasRef.current;
    init(ctx);
  }, []);

  return (
    <>
      <div className="go">
        <h3 className="title">test</h3>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startdragging}
        onMouseUp={dropit}
        id="canvas"
        width="800"
        height="600"
      >
        Your browser doesn't recognize the canvas element
      </canvas>
    
    </>
  );
}

export default App;
