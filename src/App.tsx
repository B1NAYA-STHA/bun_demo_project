import { useState } from "react";

export function App() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const takeScreenshot = async () => {
    if (!url) return setMessage("Please enter a URL");

    try {
      const res = await fetch("/screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (res.ok) setMessage(`Screenshot saved: ${data.path}`);
      else setMessage(`Error: ${data.error}`);
    } catch (err) {
      setMessage(`Error: ${err}`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>URL Screenshot Tool</h1>
      <input
        type="text"
        value={url}
        placeholder="Enter URL"
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "300px", padding: "5px" }}
      />
      <button onClick={takeScreenshot} style={{ marginLeft: "10px" }}>
        Take Screenshot
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;