import { useEffect } from "react";
import PromptConsole from "./lib/components/PromptConsole";

function App() {
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <div>
      <PromptConsole title={"ChatPropmt"} placeholder="let's chat..." />
    </div>
  );
}

export default App;
