import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

window.onload = () => {
  const rootElement = document.getElementById("ai-readiness");
  if (rootElement) {
    createRoot(document.getElementById("ai-readiness")).render(<App />);
  } else {
    console.error("The root element with id 'ai-readiness' was not found.");
  }
};
