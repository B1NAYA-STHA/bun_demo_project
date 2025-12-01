import { useState, useEffect } from "react";
import "./index.css";

export function App() {
  const [count, setCount] = useState(0);

  // Fetch initial count from backend
  useEffect(() => {
    fetch("/api/counter")
      .then(res => res.json())
      .then(data => setCount(data.count));
  }, []);

  const updateCount = (action: string) => {
    fetch("/api/counter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    })
      .then(res => res.json())
      .then(data => setCount(data.count));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <button onClick={() => updateCount("increment")}>Increment</button>
      <button onClick={() => updateCount("decrement")}>Decrement</button>
      <button onClick={() => updateCount("reset")}>Reset</button>
    </div>
  );
}

export default App;