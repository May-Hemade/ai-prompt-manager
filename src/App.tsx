import PromptHistory from "./lib/components/PromptHistory";
import PromptInput from "./lib/components/PromptInput";
import PromptResponse from "./lib/components/PropmtResponse";

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>AiReduxPromptManager</h1>
      <PromptInput />
      <PromptResponse />
      <PromptHistory />
    </div>
  );
}

export default App;
