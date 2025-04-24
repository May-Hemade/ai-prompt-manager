import { PromptConsole } from "../lib";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <PromptConsole
        title="Prompt Playground"
        placeholder="Ask me anything..."
        onSubmitPrompt={async (prompt) => {
          return `Echo: ${prompt}`;
        }}
      />
    </div>
  );
};

export default App;
