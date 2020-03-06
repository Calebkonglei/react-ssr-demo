import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const increament = () => {
    setCount(count + 1)
  }

  const decreament = () => {
    setCount(count - 1)
  }

  return (
    <div className="App">
      <div>{count}</div>
      <button onClick={decreament}>-</button>
      <button onClick={increament}>+</button>
    </div>
  );
}

export default App;
